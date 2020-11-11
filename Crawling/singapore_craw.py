import requests
import re
import datetime
import json
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def singapore_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://www.dbs.com.sg/sg-rates-api/v1/api/sgrates/getSGFXRates?FETCH_LATEST=1604561463739")

    result = json.loads(response.text)
    result_data = result['results']['assets'][0]['recData'][0]['mainCurrencies']['rates']

    for i in result_data:
        if i['currency'] == 'USD':
            USD = float(i['amtLessThan50']['odBuy'])
        elif i['currency'] == 'JPY':
            JPY = float(i['amtLessThan50']['odBuy'])
    
    # 100엔 기준으로 값이 나오기 때문에 1엔 기준으로 바꿈
    JPY = JPY / 100 

    foreignbank_info(conn, 'SGD', USD, JPY, now)