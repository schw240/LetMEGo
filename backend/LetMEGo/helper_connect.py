import pymysql

def NewConnect():

    conn = pymysql.connect(user='root',passwd='1q2w3e4r!@', host='127.0.0.1', db='LetMEGo', charset='utf8')
    return conn

def exist_now(c_name):
    conn = NewConnect()
    cursor = conn.cursor()
    query = 'SELECT Country_name FROM foreign_bank WHERE Country_name = %s'
    cursor.execute(query, c_name)

    return cursor.fetchone() != None if True else False

def exist_now_bankgroup(c_name,b_name):
    conn = NewConnect()
    cursor = conn.cursor()
    query = 'SELECT Country_name FROM bankgroup WHERE Country_name = %s and Bank_name = %s'
    cursor.execute(query, (c_name,b_name))

    return cursor.fetchone() != None if True else False