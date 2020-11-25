import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def arabemirates_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.centralbank.ae/en/fx-rates")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select("table tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[1:]:
        if i[0].split()[0] == 'Japanese':
            JPY = i[1]
        if i[0].split()[0] == 'US':
            USD = i[1]
           
    foreignbank_info(conn, 'AED', USD, JPY, now)