import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def czech_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".currency-table tbody tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[3] == 'JPY':
            JPY = i[4]
        if i[3] == 'USD':
            USD = i[4]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'CZK', USD, JPY, now)