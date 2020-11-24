import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def swiss_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.snb.ch/en/iabout/stat/statrep/id/current_interest_exchange_rates#t3")
    bs = BeautifulSoup(response.text, "html.parser")

    li =  bs.select(".rates-values-item-container.col-md-6")

    li_list = []
    for i in li[4:]:
        span_list = []
        for j in i.select("span"):
            span_list.append(j.text)
        li_list.append(span_list)

    for i in li_list:
        if i[1].split(' ')[1] == 'JPY':
            JPY = i[2]
        if i[1].split(' ')[1] == 'USD':
            USD = i[2]

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'CHF', USD, JPY, now)