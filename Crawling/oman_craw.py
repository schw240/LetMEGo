import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def oman_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://cbo.gov.om/Pages/DFESearch.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select("table tr")
    
    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list[5:]:
        if i[0] == 'JPY':
            JPY = i[3]
        if i[0] == 'USD':
            USD = i[3]
           
    foreignbank_info(conn, 'OMR', USD, JPY, now)