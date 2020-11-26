import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def southafrica_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://wwwrs.resbank.co.za/webindicators/exchangerates.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select(".DataTable tr")

    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)
    
    for i in td_list[3:27]:
        if i[0].replace(' ','').split(':')[0] == 'RandperUSDollar':
            USD = i[1]
        if i[0].replace(' ','').split(':')[0] == 'Japan':
            JPY = i[1]
    
    JPY = 1 / float(JPY)
           
    foreignbank_info(conn, 'ZAR', USD, JPY, now)