import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def malaysia_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.bnm.gov.my/?tpl=exchangerates")
    bs = BeautifulSoup(response.text, "html.parser")

    hour = now.hour
    minute = now.minute
    mytime = str(hour)+str(minute)
    mytime = int(mytime)

    if mytime < 900:
        myr_time = '0900'
    elif mytime > 900 and mytime < 1130:
        myr_time = '0900'
    elif mytime > 1130 and mytime < 1200:
        myr_time = '1130'
    elif mytime > 1200 and mytime < 1700:
        myr_time = '1200'
    elif mytime > 1700:
        myr_time = '1700'

    tr =  bs.select("#Content"+myr_time+" tr")

    td_list = []
    for i in tr[2:]:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)

    for i in td_list:
        if i[1] == 'JPY':
            JPY = i[2].replace(' ','')
        if i[1] == 'USD':
            USD = i[2].replace(' ','')


    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'MYR', USD, JPY, now)