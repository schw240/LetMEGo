import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def russia_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.cbr.ru/eng/currency_base/daily/")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".data tr")
    
    td_list = []
    for i in tr[1:]:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[1] == 'JPY':
            JPY = i[4]
        if i[1] == 'USD':
            USD = i[4]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'RUB', USD, JPY, now)