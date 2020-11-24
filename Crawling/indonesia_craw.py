import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def indonesia_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.bi.go.id/en/moneter/informasi-kurs/transaksi-bi/Default.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".table1 tr")
    tr = tr[1:26]

    td_list = []
    for i in tr[1:]:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[0].replace(' ', '') == 'JPY':
            JPY = i[3].replace(',', '')
        if i[0].replace(' ', '') == 'USD':
            USD = i[3].replace(',', '')

    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'IDR', USD, JPY, now)