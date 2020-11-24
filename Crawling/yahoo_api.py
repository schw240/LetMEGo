import pandas_datareader as pdr
from datetime import datetime
import numpy as np
import pandas as pd


def currency_craw():
    # 데이터 불러오기
    begin = datetime(2003, 12, 1)
    df_oil = pdr.DataReader('CL=F', 'yahoo', begin)
    df_dollar = pdr.DataReader('KRW=X', 'yahoo', begin)
    df_yen = pdr.DataReader('JPYKRW=X', 'yahoo', begin)
    df_euro = pdr.DataReader('EURKRW=X', 'yahoo', begin)
    # 데이터 정리 및 합치기
    df_oil.rename(columns={'Close': 'oil_close'}, inplace=True)
    df_dollar.rename(columns={'Close': 'dollar_close'}, inplace=True)
    df_yen.rename(columns={'Close': 'yen_close'}, inplace=True)
    df_euro.rename(columns={'Close': 'euro_close'}, inplace=True)
    df_oil = df_oil.reset_index()
    df_dollar = df_dollar.reset_index()
    df_yen = df_yen.reset_index()
    df_euro = df_euro.reset_index()
    df_oil = df_oil[['Date', 'oil_close']]
    df_dollar = df_dollar[['Date', 'dollar_close']]
    df_yen = df_yen[['Date', 'yen_close']]
    df_euro = df_euro[['Date', 'euro_close']]
    df_oil = df_oil.set_index('Date')
    df_dollar = df_dollar.set_index('Date')
    df_yen = df_yen.set_index('Date')
    df_euro = df_euro.set_index('Date')
    df_oil = df_oil.join(df_dollar)
    df_oil = df_oil.join(df_yen)
    df_oil = df_oil.join(df_euro)

    df_currency = df_oil
    return df_dollar, df_currency
