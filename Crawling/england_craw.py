import requests
import datetime
import json
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def eng_crawling(conn):

    now = datetime.datetime.now()

    eng_bank = requests.get("https://www5.trkd-hs.com/hsbcfxwidget/data/getFXList?token=0vg8cORxRLBsrWg9C9UboMT%2BkN2Ykze6vFnRV1nA8DE%3D&_=1604567448186")

    site_json = json.loads(eng_bank.text.replace('data', '"data"'))

    usd = (site_json.get('data').get('fxList')[0].get('buy'))
    jpy = (site_json.get('data').get('fxList')[7].get('buy'))

    jpy = float(jpy)/10000
    
    foreignbank_info(conn, 'GBP', usd, jpy, now)