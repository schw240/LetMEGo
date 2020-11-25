import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def kazakhstan_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://nationalbank.kz/en/exchangerates/ezhednevnye-oficialnye-rynochnye-kursy-valyut")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select("table tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[2].split('/')[0].replace(' ','') == 'JPY':
            JPY = i[3]
        if i[2].split('/')[0].replace(' ','') == 'USD':
            USD = i[3]
           
    foreignbank_info(conn, 'KZT', USD, JPY, now)