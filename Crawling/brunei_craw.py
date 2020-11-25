import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def brunei_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("http://www.bibd.com.bn/resource-centre/rates/foreign-exchange")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select(".tab_content tbody tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if len(i) == 4 and len(i[0].split('(')) == 2:
            if i[0].split('(')[1].split(')')[0] == 'JPY':
                JPY = i[3]
            if i[0].split('(')[1].split(')')[0] == 'USD':
                USD = i[3]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'BND', USD, JPY, now)