import time
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, r2_score, mean_absolute_error, mean_squared_error
import warnings
from keras.models import Model, Sequential
from random import randrange
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.statespace import sarimax
from fbprophet import Prophet
import statsmodels.api as sm
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from scipy.stats import boxcox
import statsmodels
import scipy
import lightgbm as lgb
import itertools
from tensorflow.keras.utils import plot_model
from keras.layers import LSTM, Activation, Dense, Dropout, Input, Embedding
from keras.utils import np_utils, to_categorical
from bayes_opt import BayesianOptimization
import xgboost as xgb
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from scipy.stats import uniform
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn import feature_extraction, linear_model, model_selection, preprocessing
from yahoo_api import currency_craw
from db_connect import xgboost_res, xgboost_res_remove

# VIZ AND DATA MANIPULATION LIBRARY
import pandas as pd
import numpy as np
warnings.filterwarnings('ignore')


def getDay(year, month, date_v):
    day = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    aday = date(year, month, date_v)
    bday = aday.weekday()
    return day[bday]


def xgboost_forecast(conn, num, df):
    # 이거를 num만큼 반복
    for j in range(1, num+1):
        print("{}번째".format(j))
        df_xg = df
        # 1일 추가하고 주말제거하기
        today = date.today() + relativedelta(days=+j)
        # df_xg.dollar_close[-10:-5].mean(),
        if getDay(today.year, today.month, today.day) == 'Sat' or getDay(today.year, today.month, today.day) == 'Sun':
            continue
        else:
            df_xg = df_xg.append({"Date": pd.Timestamp(
                today), "dollar_close": float('nan')}, ignore_index=True)

        # 하루씩 추가하면서 예측하고 그 다음날을 추가해서 1주일, 2주일, 1달 이렇게 빼서 확인해보기

        # XGBOOST
        # extract the date feature
        df_xg['day'] = df_xg.Date.dt.day
        df_xg['dayofweek'] = df_xg.Date.dt.dayofweek
        df_xg['dayofyear'] = df_xg.Date.dt.dayofyear
        df_xg['week'] = df_xg.Date.dt.week
        df_xg['month'] = df_xg.Date.dt.month
        df_xg['year'] = df_xg.Date.dt.year
        df_xg = df_xg.drop('Date', axis=1)
        # 시계열 데이터에서 이전데이터를 현재 데이터에 넣으면 좀 더 정확한 학습이 가능
        # 이것을 lag(지연 데이터라고 표현)
        # lag 데이터를 만들어보도록 함
        for i in range(1, 6):
            df_xg['lag'+str(i)] = df_xg.dollar_close.shift(i).fillna(0)

        X = df_xg.drop('dollar_close', axis=1)
        y = df_xg.dollar_close

        X_train, X_test = X[:-1], X[-1:]
        y_train, y_test = y[:-1], y[-1:]

        # convert data to xgb matrix form
        dtrain = xgb.DMatrix(X_train, label=y_train)
        dtest = xgb.DMatrix(X_test)

        # bayesian hyper parameter tuning
        # define the params
        def xgb_evaluate(max_depth, gamma, colsample_bytree):
            params = {'eval_metric': 'rmse',
                      'max_depth': int(max_depth),
                      'subsample': 0.8,
                      'eta': 0.1,
                      'gamma': gamma,
                      'colsample_bytree': colsample_bytree}

            cv_result = xgb.cv(params, dtrain, num_boost_round=250, nfold=3)
            return -1.0 * cv_result['test-rmse-mean'].iloc[-1]

        # run optimizer
        xgb_bo = BayesianOptimization(xgb_evaluate, {'max_depth': (3, 7),
                                                     'gamma': (0, 1),
                                                     'colsample_bytree': (0.3, 0.9)})
        # define iter points
        xgb_bo.maximize(init_points=10, n_iter=15, acq='ei')

        # get the best parameters
        params = xgb_bo.max['params']
        params['max_depth'] = int(round(params['max_depth']))
        # train the data
        model = xgb.train(params, dtrain, num_boost_round=200)

        # predict the test data
        predictions = model.predict(dtest)

        lenv_ = len(df_xg)
        df_xg.dollar_close[lenv_-1] = predictions
        df_xg = df_xg.drop(['day', 'dayofweek', 'dayofyear', 'week','month', 'year', 'day', 'lag1', 'lag2', 'lag3', 'lag4', 'lag5'], axis=1)
        if getDay(today.year, today.month, today.day) == 'Sat' or getDay(today.year, today.month, today.day) == 'Sun':
            continue
        else:
            df = df.append({"Date": pd.Timestamp(today),
                            "dollar_close": predictions[0]}, ignore_index=True)
        dollar_close = predictions[0]
        basedate = today
        xgboost_res_remove(conn)
        xgboost_res(conn, basedate, dollar_close)
    return df


# df_xg = pd.DataFrame()
# df_xg, df_notuse = currency_craw()
# df_xg = df_xg.reset_index()

# # 일주일
# df_new = xgboost_forecast(30, df_xg)

# print("======================최종 결과========================")
# print(df_new)
# # 평가
# y_val = df_xg.dollar_close[-5:-1]
# xgb_mae = mean_absolute_error(y_val, predictions)
# xgb_mse = mean_squared_error(y_val, predictions)
# xgb_rmse = np.sqrt(mean_squared_error(y_val, predictions))

# print('Mean Absolute Error:   ', xgb_mae)
# print('Mean Squared Error:   ', xgb_mse)
# print('Root Mean Squared Error:   ', xgb_rmse)
# xgb_error_rate = abs(((y_val - predictions) / y_val).mean()) * 100
# print('MAPE:', round(xgb_error_rate, 2), '%')
# print('R2-SCORE: ', r2_score(y_val, predictions))