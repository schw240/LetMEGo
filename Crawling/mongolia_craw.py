import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def mongolia_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://www.mongolbank.mn/eng/dblistofficialdailyrate.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select(".uk-comment-list li tr")

    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)
    
    for i in td_list:
        if i[1] == 'JPY':
            JPY = i[2]
        if i[1] == 'USD':
            USD = i[2].replace(',', '')
           
    foreignbank_info(conn, 'MNT', USD, JPY, now)