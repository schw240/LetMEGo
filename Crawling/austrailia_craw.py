import requests
import datetime
import json
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def aus_crawling(conn):

    now = datetime.datetime.now()

    aus_bank = requests.get("https://www.commbank.com.au/content/data/forex-rates/AUD.json?path=1604630399626")
    site_json = json.loads(aus_bank.text)
    usd = (site_json.get('currencies')[0].get('bbfcash'))
    jpy = (site_json.get('currencies')[16].get('bbfcash'))
    usd = 1/float(usd)
    jpy = 1/float(jpy)
    # print(usd, jpy, now, country)

    foreignbank_info(conn, 'AUD', usd, jpy, now)