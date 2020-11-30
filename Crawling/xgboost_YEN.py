import time
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
import warnings
from random import randrange
import itertools
from bayes_opt import BayesianOptimization
import xgboost as xgb
from yahoo_api import currency_craw
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, r2_score, mean_absolute_error, mean_squared_error
from db_connect import xgboost_YEN, xgboost_YEN_remove
from helper_connect import DBConnect  # 디비 연결

# VIZ AND DATA MANIPULATION LIBRARY
import pandas as pd
import numpy as np
warnings.filterwarnings('ignore')


def getDay(year, month, date_v):
    day = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    aday = date(year, month, date_v)
    bday = aday.weekday()
    return day[bday]


def xgboost_yen(conn, num, df):
    # 이거를 num만큼 반복
    for j in range(1, num+1):
        print("{}번째".format(j))
        df_xg = df
        # 1일 추가하고 주말제거하기
        today = date.today() + relativedelta(days=+j)
        if getDay(today.year, today.month, today.day) == 'Sat' or getDay(today.year, today.month, today.day) == 'Sun':
            continue
        else:
            df_xg = df_xg.append({"Date": pd.Timestamp(
                today), "yen_close": float('nan')}, ignore_index=True)

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
            df_xg['lag'+str(i)] = df_xg.yen_close.shift(i).fillna(0)

        X = df_xg.drop('yen_close', axis=1)
        y = df_xg.yen_close

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
        df_xg.yen_close[lenv_-1] = predictions
        df_xg = df_xg.drop(['day', 'dayofweek', 'dayofyear', 'week', 'month',
                            'year', 'day', 'lag1', 'lag2', 'lag3', 'lag4', 'lag5'], axis=1)
        if getDay(today.year, today.month, today.day) == 'Sat' or getDay(today.year, today.month, today.day) == 'Sun':
            continue
        else:
            df = df.append({"Date": pd.Timestamp(today),
                            "yen_close": predictions[0]}, ignore_index=True)
        yen_close = float(predictions[0])
        print(today)
        print(type(today))
        print(yen_close)
        print(type(yen_close))
        xgboost_YEN(conn, today, yen_close)
        xgboost_YEN_remove(conn)
    return


if __name__ == "__main__":
    df_xg = pd.DataFrame()
    df_notuse, df_xg, df_notuse2 = currency_craw()
    df_xg = df_xg.reset_index()
    conn = DBConnect()

    xgboost_yen(conn, 30, df_xg)
