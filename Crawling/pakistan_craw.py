import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def pakistan_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.forex.pk/open_market_rates.asp")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select("table tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[10:]:
        if i[1] == 'JPY':
            JPY = i[2]
        if i[1] == 'USD':
            USD = i[2]
           
    foreignbank_info(conn, 'PKR', USD, JPY, now)