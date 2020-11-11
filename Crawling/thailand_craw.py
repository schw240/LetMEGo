import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def thailand_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://www.bot.or.th/english/_layouts/application/exchangerate/exchangerate.aspx")

    bs = BeautifulSoup(response.text,"html.parser")
    tb_list = bs.select(".table tr")

    for tr in tb_list[3:]:
        if len(tr.select("td")) == 6:
            if tr.select("td")[2].text.replace(' ', '') == 'USD':
                USD = float(tr.select("td")[4].text)
            elif tr.select("td")[2].text.replace(' ', '') == 'JPY':
                JPY = float(tr.select("td")[4].text)
    
    # 100엔 기준으로 값이 나오기 때문에 1엔 기준으로 바꿈
    JPY = JPY / 100 
    foreignbank_info(conn, 'THB', USD, JPY, now)