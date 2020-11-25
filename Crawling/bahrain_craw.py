import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def bahrain_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.bfc.com.bh/personal/currency-exchange/")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select("table tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[1:]:
        if i[0].split('\n')[3] == 'USD':
            USD = i[1]


    response2 = session.get("https://www.bfc.com.bh/personal/currency-exchange/continent/asia-pacific/#rates")
    bs2 = BeautifulSoup(response2.text,"html.parser")

    tr2 = bs2.select("table tr")

    td2_list = []
    for i in tr2:
        tds2 = []
        for j in i.select("td"):
            tds2.append(j.text)
        td2_list.append(tds2)

    for i in td2_list[1:]:
        if i[0].split('\n')[3] == 'JPY':
            JPY = i[1]

    USD = 1/float(USD)
    JPY = 1/float(JPY)

           
    foreignbank_info(conn, 'BHD', USD, JPY, now)