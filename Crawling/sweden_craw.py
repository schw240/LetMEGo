import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def sweden_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.seb.ee/eng/exchange-rates")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".crc-row")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[0].replace(' ', '').replace('\n','').split('-')[0] == 'JPY':
            JPY = i[4].replace(',', '.')
        if i[0].replace(' ', '').replace('\n','').split('-')[0] == 'USD':
            USD = i[4].replace(',', '.')

    JPY = 1 / (float(JPY) / 10)
    USD = 1 / (float(USD) / 10)
           
    foreignbank_info(conn, 'SEK', USD, JPY, now)