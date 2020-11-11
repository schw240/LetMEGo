import requests
import datetime
import json
import re
from bs4 import BeautifulSoup
from db_connect import foreignbank_info


def cad_crawling(conn):

    now = datetime.datetime.now()

    cad_bank = requests.get("https://www.bmo.com/bmocda/templates/json_fx_include.jsp")
    page_source = cad_bank.text
    re_matched = re.search(r'var FXLong = (.+?);', page_source, re.S)
    json_string = re_matched.group(1)
    json_string = json_string.replace("'",'"')
    
    money_list = json.loads(json_string)

    usd = (money_list.get("USD").get("NA").get("BUY"))
    jpy = (money_list.get("JPY").get("NA").get("BUY"))

    foreignbank_info(conn, 'CAD', usd, jpy, now)