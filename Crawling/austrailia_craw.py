import requests
import datetime
import pymysql
from bs4 import BeautifulSoup
from helper_connect import NewConnect, exist_now
import threading
import time
import json

def aus_crawling():

    now = datetime.datetime.now()
    country = "AUD"
    usd, jpy = 0,0
    update = now

    headers = {
        "Accept": """application/json, text/javascript, */*; q=0.01""",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": """ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7""",
        "ADRUM": "isAjax:true",
        "Connection": "keep-alive",
        "Cookie": """AMCVS_FFF9306152D80A5C0A490D45%40AdobeOrg=1; c_m=undefinedsearch.naver.comsearch.naver.com; s_cc=true; aam_uuid=22473012835698799461099547136450682865; AMCV_FFF9306152D80A5C0A490D45%40AdobeOrg=2121618341%7CMCMID%7C22692659571752507941084357654833781521%7CMCAAMLH-1605062062%7C11%7CMCAAMB-1605233066%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1604635466s%7CNONE%7CMCAID%7CNONE; s_prop41=search.naver.com; ADRUM=s=1604628408121&r=https%3A%2F%2Fwww.commbank.com.au%2Finternational%2Fforeign-exchange-rates.html%3F0; mbox=PC#f2806f6825e24f3c899bcac3adfdde7c.36_0#1605838009|session#9eaee481816c43538aae8879ab83064d#1604630269|check#true#1604628469; s_cvp=%5B%5B%27search.naver.com%27%2C%271604457263909%27%5D%2C%5B%27Direct%27%2C%271604628408875%27%5D%5D; s_cpm=%5B%5B%27search.naver.com%27%2C%271604457263914%27%5D%2C%5B%27Direct%27%2C%271604628408878%27%5D%5D; gpv_p15=cba%3Ainternational%3Aforeign-exchange-rates; s_gnr=1604628408879-Repeat""",
        "Host": "www.commbank.com.au",
        "Referer": "https://www.commbank.com.au/international/foreign-exchange-rates.html",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }

    aus_bank = requests.get("https://www.commbank.com.au/content/data/forex-rates/AUD.json?path=1604630399626")
    site_json = json.loads(aus_bank.text)
    usd = (site_json.get('currencies')[0].get('bbfcash'))
    jpy = (site_json.get('currencies')[16].get('bbfcash'))

    print(usd, jpy, now, country)
    conn = NewConnect()
    cursor = conn.cursor()
    if exist_now('AUD'):
       sql = "UPDATE foreign_bank SET USD = %s, JPY = %s, UpdateDate = %s WHERE Country_name = %s;"
    else:
        sql = "insert into foreign_bank(USD, JPY, UpdateDate, Country_name) values(%s,%s,%s,%s);"
    cursor.execute(sql, (usd.replace(',',''), jpy, now, country))
    conn.commit()
    #threading.Timer(60*60,php_crawling).start()


aus_crawling()