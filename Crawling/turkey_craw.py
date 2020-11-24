import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def turkey_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("http://www.turkishliratoday.com/central-bank-of-turkey-exchange-rates.php")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".table.table-striped.table-bordered.table-hover tr")

    td_list = []
    for i in tr[1:]:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[1].split('/')[0].split(' ')[1] == 'JPY':
            JPY = i[4].replace(',', '.')
        if i[1].split('/')[0].split(' ')[1] == 'USD':
            USD = i[4].replace(',', '.')

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'TRY', USD, JPY, now)