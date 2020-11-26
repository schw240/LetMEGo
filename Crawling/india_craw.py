import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def india_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://mv.statebank/exchange-rate")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".table.table-bordered tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[4:]:
        if i[0].replace(' ','').split('/')[0] == 'JapaneseYen':
            JPY = i[1].replace('\t','').replace('\n','')
        if i[0].replace(' ','').split('/')[0] == 'USDollar':
            USD = i[1].replace('\t','').replace('\n','')

    JPY = 1 / (float(JPY) * 10)
    USD = 1 / (float(USD) / 1000)
           
    foreignbank_info(conn, 'INR', USD, JPY, now)