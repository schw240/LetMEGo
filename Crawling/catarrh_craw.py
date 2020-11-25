import requests
import datetime
import json
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def catarrh_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://www.qib.com.qa/currency_convertor_page.php")

    result = json.loads(response.text)

    for i in result:
        if i['currency'] == 'USD':
            USD = i['buyrate']
        elif i['currency'] == 'JPY':
            JPY = i['buyrate']

    foreignbank_info(conn, 'QAR', USD, JPY, now)