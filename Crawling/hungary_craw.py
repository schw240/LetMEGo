import requests
import datetime
import json
from db_connect import foreignbank_info

def hungary_craw(conn):
    now = datetime.datetime.now()

    year = str(now.year)
    month = str(now.month)
    day = str(now.day)

    session = requests.session()
    response = session.get("https://www.otpbank.hu/apps/exchangerate/api/exchangerate/offline/"+year+"-"+month+"-"+day)

    result = json.loads(response.text)
    result_data = result['dates'][0]['versions'][0]['exchangeRates']

    for i in result_data:
        if i['currencyCode'] == 'USD':
            USD = i['middleRate']
        if i['currencyCode'] == 'JPY':
            JPY = i['middleRate']
    
    # 100엔 기준으로 값이 나오기 때문에 1엔 기준으로 바꿈
    JPY = JPY / 100 

    foreignbank_info(conn, 'HUF', USD, JPY, now)