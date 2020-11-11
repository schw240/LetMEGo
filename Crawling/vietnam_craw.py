import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def viet_crawling(conn):

    now = datetime.datetime.now()

    viet_bank = requests.get("https://www.sbv.gov.vn/TyGia/faces/ExchangeRate.jspx?_adf.ctrl-state=189twepxym_4&_afrLoop=6492512555058297")
    soup = BeautifulSoup(viet_bank.content,"html.parser")
    table = soup.find_all("table", {"class":"jrPage"})
    trs = table[1].find_all("tr")

    usd_tr = trs[3]
    jpy_tr = trs[5]

    usd_td = usd_tr.find_all("td")
    jpy_td = jpy_tr.find_all("td")

    usd = usd_td[4].text.replace(',','')
    jpy = jpy_td[4].text

    foreignbank_info(conn, 'VND', usd, jpy, now)