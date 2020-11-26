import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def saudiarabia_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.x-rates.com/table/?from=SAR&amount=1")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".ratesTable tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[12:]:
        if i[0].split()[0] == 'Japanese':
            JPY = i[2]
        if i[0].split()[0] == 'US':
            USD = i[2]
           
    foreignbank_info(conn, 'SAR', USD, JPY, now)