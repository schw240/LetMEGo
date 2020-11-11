import requests
import datetime
import pymysql
from bs4 import BeautifulSoup
from helper_connect import NewConnect, exist_now
import threading
import time
import json

def eng_crawling():

    now = datetime.datetime.now()
    country = "GBP"
    usd, jpy = 0,0
    update = now

    headers = {
        "authority": "sy.v.liveperson.net",
        "method": "GET",
        "path": "/api/js/15532512?sid=KLYpcdECS9qs0tuJn3cVgQ&cb=lpCb22189x16711&t=ip&ts=1604567069120&pid=9238673736&tid=362327219&vid=YzZWM1OTMyM2RkMTU0YTYz",
        "scheme": "https",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": """ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7""",
        "referer": "https://www.hsbc.com.au/",
        "sec-fetch-dest": "script",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "cross-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    }

    eng_bank = requests.get("https://www5.trkd-hs.com/hsbcfxwidget/data/getFXList?token=0vg8cORxRLBsrWg9C9UboMT%2BkN2Ykze6vFnRV1nA8DE%3D&_=1604567448186")

    site_json = json.loads(eng_bank.text.replace('data', '"data"'))
    usd = (site_json.get('data').get('fxList')[0].get('buy'))
    jpy = (site_json.get('data').get('fxList')[7].get('buy'))
    jpy = float(jpy)/10000
    print(usd, jpy, now, country)
    conn = NewConnect()
    cursor = conn.cursor()
    if exist_now('GBP'):
       sql = "UPDATE foreign_bank SET USD = %s, JPY = %s, UpdateDate = %s WHERE Country_name = %s;"
    else:
        sql = "insert into foreign_bank(USD, JPY, UpdateDate, Country_name) values(%s,%s,%s,%s);"
    cursor.execute(sql, (usd.replace(',',''), jpy, now, country))
    conn.commit()
    #threading.Timer(60*60,php_crawling).start()


eng_crawling()