import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def kuwait_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.nbk.com/kuwait/personal/investments/currency-rates.html")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select("table tr")

    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)
    
    for i in td_list[1:]:
        if i[1].replace(' ','') == 'USDOLLAR':
            USD = i[2]
        if i[1].replace(' ','') == 'JAPANESEYEN':
            JPY = i[2]
           
    foreignbank_info(conn, 'KWD', USD, JPY, now)