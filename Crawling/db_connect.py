import pymysql
from send_mail import sendMail

# 마이뱅크 크롤링해서 DB에 넣기


def mybank_info(conn, Bank_name, Country_name, BUY, BuyFeeRate, SELL, SellFeeRate, TradingRate, now):
    cursor = conn.cursor()

    sql = f"""
                SELECT Bank_name_id, Country_name_id
                FROM mybank
                WHERE Bank_name_id = '{Bank_name}' and Country_name_id = '{Country_name}'
            """
    cursor.execute(sql)
    results = cursor.fetchall()

    if results:
        sql = f"""
                UPDATE mybank
                SET BUY = {BUY}, BuyFeeRate = {BuyFeeRate}, SELL = {SELL}, SellFeeRate = {SellFeeRate}, 
                    TradingRate = {TradingRate}, UpdateDate = '{now}'
                WHERE Bank_name_id = '{Bank_name}' and Country_name_id = '{Country_name}'
            """
    else:
        sql = f"""
                INSERT INTO mybank(Bank_name_id, Country_name_id, BUY, BuyFeeRate, SELL, SellFeeRate, TradingRate, UpdateDate)
                VALUES ('{Bank_name}', '{Country_name}', {BUY}, {BuyFeeRate}, {SELL}, {SellFeeRate}, {TradingRate}, '{now}')
            """

    cursor.execute(sql)
    conn.commit()


# 은행연합회 크롤링해서 DB에 넣기
def bankgroup_info(conn, Bank_name, Country_name, BuyFeeRate, StdPrefRate, MaxPrefRate, TreatAndEvent, BaseDate, UpdateDate):
    cursor = conn.cursor()

    sql = f"""
                SELECT Country_name 
                FROM bankgroup 
                WHERE Country_name = '{Country_name}' and Bank_name = '{Bank_name}'
            """
    cursor.execute(sql)
    results = cursor.fetchone()

    if results:
        sql = f"""
                UPDATE bankgroup 
                SET BuyFeeRate = '{BuyFeeRate}', StdPrefRate = '{StdPrefRate}', MaxPrefRate = '{MaxPrefRate}',
                    TreatAndEvent = '{TreatAndEvent}', BaseDate = '{BaseDate}', UpdateDate = '{UpdateDate}'
                WHERE Country_name = '{Country_name}' and Bank_name = '{Bank_name}'
            """
    else:
        sql = f"""
                INSERT INTO bankgroup(Bank_name, Country_name, BuyFeeRate, StdPrefRate, MaxPrefRate, TreatAndEvent, BaseDate, UpdateDate) 
                VALUES ('{Bank_name}', '{Country_name}', '{BuyFeeRate}', '{StdPrefRate}', '{MaxPrefRate}', '{TreatAndEvent}', {BaseDate}, '{UpdateDate}')
            """

    cursor.execute(sql)
    conn.commit()


# 해외은행 크롤링해서 DB에 넣기
def foreignbank_info(conn, Country_name, USD, JPY, now):
    cursor = conn.cursor()
    sql = f"""
        SELECT Country_name
        FROM foreign_bank
        WHERE Country_name = '{Country_name}'
        """
    cursor.execute(sql)
    results = cursor.fetchall()

    if USD != 0 and JPY != 0:
        if results:
            sql = f"""
                    UPDATE foreign_bank
                    SET USD = {USD}, JPY = {JPY}, UpdateDate = '{now}'
                    WHERE Country_name = '{Country_name}'
                """
        else:
            sql = f"""
                    INSERT INTO foreign_bank(Country_name, USD, JPY, UpdateDate)
                    VALUES ('{Country_name}',{USD},{JPY},'{now}')
                """

        cursor.execute(sql)
        conn.commit()

    else:
        # 휴일 등의 이유로 환율 정보가 업데이트 되지 않았을 때는 디비에서 삽입/갱신 하지 않음
        print(f"환율 정보 없음 : {Country_name}, USD = {USD} JPY = {JPY}")


# 네이버 뉴스기사 크롤링해서 DB 넣기
def naver_news_info(conn, title, link, company, upload_date, content, words):
    cursor = conn.cursor()

    sql = "INSERT INTO NaverNews(title, link, company, upload_date, content, words) values(%s,%s,%s,%s,%s,%s);"
    cursor.execute(sql, (title, link, company, upload_date, content, words))
    conn.commit()


# 네이버 뉴스기사 100개 이외의 기사 삭제
def naver_news_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM NaverNews  
         ORDER BY seq DESC 
            limit 100"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM NaverNews
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()
    print('기사삭제완료')


# 실시간 환율정보 저장
def realtime(conn, datetime, basePrice, signedChangePrice, signedChangeRate):
    cursor = conn.cursor()

    sql = "INSERT INTO RealTime_Info(datetime, basePrice, signedChangePrice, signedChangeRate) values(%s,%s,%s,%s);"
    cursor.execute(sql, (datetime, basePrice,
                         signedChangePrice, signedChangeRate))
    conn.commit()


def realtime_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM RealTime_Info  
         ORDER BY seq DESC 
            limit 70"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM RealTime_Info
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def xgboost_USD(conn, date, dollar_close):
    cursor = conn.cursor()

    sql = "INSERT INTO XGBoost_USDInfo(date, close) values(%s,%s);"
    cursor.execute(sql, (date, dollar_close))
    conn.commit()


def xgboost_USD_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM XGBoost_USDInfo  
         ORDER BY seq DESC 
            limit 31"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM XGBoost_USDInfo
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def xgboost_YEN(conn, date, yen_close):
    cursor = conn.cursor()

    sql = "INSERT INTO XGBoost_YENInfo(date, close) values(%s,%s);"
    cursor.execute(sql, (date, yen_close))
    conn.commit()


def xgboost_YEN_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM XGBoost_YENInfo  
         ORDER BY seq DESC 
            limit 31"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM XGBoost_YENInfo
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def xgboost_EURO(conn, date, euro_close):
    cursor = conn.cursor()

    sql = "INSERT INTO XGBoost_EUROInfo(date, close) values(%s,%s);"
    cursor.execute(sql, (date, euro_close))
    conn.commit()


def xgboost_EURO_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM XGBoost_EUROInfo  
         ORDER BY seq DESC 
            limit 31"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM XGBoost_EUROInfo
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def lstm_usd_res(conn, date, dollar_close):
    cursor = conn.cursor()

    sql = "INSERT INTO LSTM_Info_USD(date, close) values(%s,%s);"
    cursor.execute(sql, (date, dollar_close))
    conn.commit()


def lstm_usd_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM LSTM_Info_USD
         ORDER BY seq DESC 
            limit 31"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM LSTM_Info_USD
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def lstm_yen_res(conn, date, yen_close):
    cursor = conn.cursor()

    sql = "INSERT INTO LSTM_Info_YEN(date, close) values(%s,%s);"
    cursor.execute(sql, (date, yen_close))
    conn.commit()


def lstm_yen_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM LSTM_Info_YEN
         ORDER BY seq DESC 
            limit 31"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM LSTM_Info_YEN
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def lstm_euro_res(conn, date, euro_close):
    cursor = conn.cursor()

    sql = "INSERT INTO LSTM_Info_EURO(date, close) values(%s,%s);"
    cursor.execute(sql, (date, euro_close))
    conn.commit()


def lstm_euro_remove(conn):
    cursor = conn.cursor()

    sql = """SELECT seq
             FROM LSTM_Info_EURO
         ORDER BY seq DESC 
            limit 31"""

    cursor.execute(sql)
    results = cursor.fetchall()

    print(results[-1][0])

    sql = f"""DELETE FROM LSTM_Info_EURO
              WHERE seq < {results[-1][0]}"""

    cursor.execute(sql)
    conn.commit()


def send_user_list(conn):
    cursor = conn.cursor()

    sql = f"""
                SELECT email
                FROM account_user
                WHERE user_emailcheck = 1
            """
    cursor.execute(sql)
    results = cursor.fetchone()

    email_list = []

    while results:
        user_email = results[0]

        email_list.append(user_email)

        results = cursor.fetchone()

    sendMail(email_list)
