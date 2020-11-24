import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def bangladesh_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.bb.org.bd/econdata/exchangerate_dtl.php?loadmode=1&cboCurrency=&ddlYear=&UsersList=&SelectPeriod=,", verify=False)
    bs = BeautifulSoup(response.text, "html.parser")

    tr =  bs.select(".standardcellborder tr")

    td_list = []
    for i in tr[2:]:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if len(i) == 3:
            if i[0] == 'JPY':
                JPY = i[1]
            if i[0] == 'USD':
                USD = i[2]
           
    foreignbank_info(conn, 'BDT', USD, JPY, now)