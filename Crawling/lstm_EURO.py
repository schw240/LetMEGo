# Import the libraries
import math
import pandas_datareader as web
import time
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from db_connect import lstm_euro_res, lstm_euro_remove
from helper_connect import DBConnect  # 디비 연결


def getDay(year, month, date_v):
    day = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    aday = date(year, month, date_v)
    bday = aday.weekday()
    return day[bday]


def lstm_euro(conn, df):
    data = df
    dataset = data.values
    training_data_len = math.ceil(len(dataset) * .8)

    # Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)

    train_data = scaled_data[0:training_data_len, :]
    x_train = []
    y_train = []
    for i in range(60, len(train_data)):
        x_train.append(train_data[i-60:i, 0])
        y_train.append(train_data[i, 0])
    x_train, y_train = np.array(x_train), np.array(y_train)

    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True,
                   input_shape=(x_train.shape[1], 1)))
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dense(units=25))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')

    model.fit(x_train, y_train, batch_size=1, epochs=1)

    test_data = scaled_data[training_data_len - 60:, :]
    x_test = []
    y_test = dataset[training_data_len:, :]
    for i in range(60, len(test_data)):
        x_test.append(test_data[i-60:i, 0])
    x_test = np.array(x_test)

    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)

    rmse = np.sqrt(np.mean((predictions - y_test)**2))
    print(rmse)

    train = data[:training_data_len]
    valid = data[training_data_len:]
    valid['Predictions'] = predictions

    df = web.DataReader('EURKRW=X', data_source='yahoo', start='2003-01-01')
    new_df = df.filter(['Close'])
    last_60_days = new_df[-60:].values

    last_60_days_scaled = scaler.transform(last_60_days)

    X_test = []
    X_test.append(last_60_days_scaled)
    X_test = np.array(X_test)
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
    print(X_test.shape)
    pred_price = model.predict(X_test)
    pred_price = scaler.inverse_transform(pred_price)
    print(pred_price[0][0], "함수한 result")
    return pred_price[0][0]


if __name__ == "__main__":
    conn = DBConnect()
    df = web.DataReader('EURKRW=X', data_source='yahoo', start='2003-01-01')
    data = df.filter(['Close'])
    for i in range(1, 31):
        today = date.today() + relativedelta(days=+i)
        if getDay(today.year, today.month, today.day) == 'Sat' or getDay(today.year, today.month, today.day) == 'Sun':
            continue
        else:
            result = lstm_euro(conn, data)
            data = data.reset_index()
            data = data.append({"Date": pd.Timestamp(
                today), "Close": float(result)}, ignore_index=True)
        data = data.set_index("Date")
        lstm_euro_res(conn, today, result)
        lstm_euro_remove(conn)
