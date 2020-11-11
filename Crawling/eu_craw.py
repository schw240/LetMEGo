import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def eu_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://www.eurobank.com.cy/en-us/contact-support/useful-tools/curency-rates")

    bs = BeautifulSoup(response.text,"html.parser")
    tmrow_table = bs.select(".tabsrow.tmrow")

    for i in tmrow_table:
        if i.find_all('p')[0].text == 'USD':
            USD = float(i.find_all('p')[2].text)
        elif i.find_all('p')[0].text == 'JPY':
            JPY = float(i.find_all('p')[2].text)
    
    # 현재 1EUR 기준으로 USD, JPY 값이 나오기 때문에 1USD, 1JPY 기준으로 바꿔줌
    USD = 1 / USD 
    JPY = 1 / JPY
    
    foreignbank_info(conn, 'EUR', USD, JPY, now)