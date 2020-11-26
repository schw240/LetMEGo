import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info


def nzd_craw(conn):

    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://tools.anz.co.nz/foreign-exchange/fx-rates?")

    bs = BeautifulSoup(response.text,"html.parser")

    div =  bs.select(".cs-vertical-align-center")

    for i in range(0, len(div), 5): 
        if div[i].text.replace(' ','').replace('\n', '').strip() == 'USD':
            USD = div[i+2].text.replace(' ','').replace('\n', '').strip()
        if div[i].text.replace(' ','').replace('\n', '').strip() == 'JPY':
            JPY = div[i+2].text.replace(' ','').replace('\n', '').strip()

    USD = 1 / float(USD)
    JPY = 1 / float(JPY)

    foreignbank_info(conn, 'NZD', USD, JPY, now)