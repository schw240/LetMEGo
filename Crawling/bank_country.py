import pandas as pd
import pymysql
from helper_connect import DBConnect


def bank_country_DB(conn, bank_code, bank_name, bank_logo):
    cursor = conn.cursor()
    sql = f"""
                INSERT INTO Bank_Info(bank_code, bank_name, bank_logo) 
                VALUES ('{bank_code}', '{bank_name}', '{bank_logo}')
            """
    cursor.execute(sql)
    conn.commit()


def country_DB(conn, country_name, country_flag, name_kor):
    cursor = conn.cursor()
    sql = f"""
                INSERT INTO Country_Info(country_name, country_flag, name_kor) 
                VALUES ('{country_name}', '{country_flag}', '{name_kor}')
            """
    cursor.execute(sql)
    conn.commit()


def bank_country(conn):
    xlsx = pd.read_excel('bank_info 테이블.xlsx')
    bank_code = xlsx.bank_code
    bank_name = xlsx.bank_name
    bank_logo = xlsx.bank_logo

    cxlsx = pd.read_excel('country_info 테이블.xlsx')
    country_name = cxlsx.country_name
    country_flag = cxlsx.country_flag
    name_kor = cxlsx.name_kor
    print(country_name, country_flag, name_kor)
    # for i in range(len(bank_code)):
    #     bank_country_DB(conn, bank_code[i], bank_name[i], bank_logo[i])

    for i in range(len(country_name)):
        country_DB(conn, country_name[i], country_flag[i], name_kor[i])


conn = DBConnect()
bank_country(conn)
