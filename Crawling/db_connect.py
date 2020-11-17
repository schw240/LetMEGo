import pymysql

# 마이뱅크 크롤링해서 DB에 넣기
def mybank_info(conn, Bank_name, Country_name, BUY, BuyFeeRate, SELL, SellFeeRate, TradingRate, now):
    cursor = conn.cursor()

    sql = f"""
                SELECT Bank_name, Country_name
                FROM mybank
                WHERE Bank_name = '{Bank_name}' and Country_name = '{Country_name}'
            """
    cursor.execute(sql)
    results = cursor.fetchall()

    if results:
        sql = f"""
                UPDATE mybank
                SET BUY = {BUY}, BuyFeeRate = {BuyFeeRate}, SELL = {SELL}, SellFeeRate = {SellFeeRate}, 
                    TradingRate = {TradingRate}, UpdateDate = '{now}'
                WHERE Bank_name = '{Bank_name}' and Country_name = '{Country_name}'
            """
    else:
        sql = f"""
                INSERT INTO mybank(Bank_name, Country_name, BUY, BuyFeeRate, SELL, SellFeeRate, TradingRate, UpdateDate)
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