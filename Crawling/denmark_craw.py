import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def denmark_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.nationalbanken.dk/en/statistics/exchange_rates/Pages/Default.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".table.table-condensed.table-bordered tbody tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[1] == 'JPY':
            JPY = i[2]
        if i[1] == 'USD':
            USD = i[2]

    JPY = float(JPY) / 100
    USD = float(USD) / 100
           
    foreignbank_info(conn, 'DKK', USD, JPY, now)