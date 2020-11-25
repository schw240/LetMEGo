import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def israel_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.boi.org.il/en/Markets/ExchangeRates/Pages/Default.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select("table tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[1:]:
        if i[2] == 'Japan':
            JPY = i[3]
        if i[2] == 'USA':
            USD = i[3]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'ILS', USD, JPY, now)