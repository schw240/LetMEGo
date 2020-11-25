import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def egypt_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/ExchangeRatesListing.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".table tbody tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[0].split()[0] == 'Japanese':
            JPY = i[1]
        if i[0].split()[0] == 'US':
            USD = i[1]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'EGP', USD, JPY, now)