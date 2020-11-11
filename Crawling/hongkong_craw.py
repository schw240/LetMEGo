import requests
import re
import datetime
import json
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def hongkong_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://rbwm-api.hsbc.com.hk/digital-pws-tools-investments-eapi-prod-proxy/v1/investments/exchange-rate?locale=en_HK")

    result = json.loads(response.text)

    for i in result['detailRates']:
        if i['ccy'] == 'USD':
            USD = i['bankBuyRt']
            # print(i['ccy'], i['bankBuyRt'])
        elif i['ccy'] == 'JPY':
            JPY = i['bankBuyRt']
            # print(i['ccy'], i['bankBuyRt'])
    
    foreignbank_info(conn, 'HKD', USD, JPY, now)