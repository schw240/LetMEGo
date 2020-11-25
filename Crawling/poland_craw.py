import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def poland_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.nbp.pl/homen.aspx?f=/kursy/RatesA.html")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".pad5 tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if len(i) == 3:
            if i[1].split(' ')[1] == 'JPY':
                JPY = i[2]
            if i[1].split(' ')[1] == 'USD':
                USD = i[2]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'PLN', USD, JPY, now)