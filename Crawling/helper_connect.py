import pymysql
import numpy as np


def DBConnect():
    pymysql.converters.encoders[np.float32] = pymysql.converters.escape_float
    pymysql.converters.conversions = pymysql.converters.encoders.copy()
    pymysql.converters.conversions.update(pymysql.converters.decoders)
    conn = pymysql.connect(user='admin', passwd='1q2w3e4r5t',
                           host='django-letmego.cuwex8kz3bin.ap-northeast-2.rds.amazonaws.com', db='LetMEGo', charset='utf8')
    return conn


def exist_now(c_name):
    conn = DBConnect()
    cursor = conn.cursor()
    query = 'SELECT Country_name FROM foreign_bank WHERE Country_name = %s'
    cursor.execute(query, c_name)

    return cursor.fetchone() != None if True else False


def exist_now_bankgroup(c_name, b_name):
    conn = DBConnect()
    cursor = conn.cursor()
    query = 'SELECT Country_name FROM bankgroup WHERE Country_name = %s and Bank_name = %s'
    cursor.execute(query, (c_name, b_name))

    return cursor.fetchone() != None if True else False
