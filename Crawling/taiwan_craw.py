import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def taiwan_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    retry = True

    while retry:
        try:
            response = session.get("https://rate.bot.com.tw/xrt?Lang=en-US")
            retry = False
        except:
            pass


    bs = BeautifulSoup(response.text,"html.parser")

    currencys = bs.select("tbody tr")

    for i in currencys:
        for j in i.select(".hidden-phone.print_show"):
            if re.search(r'\((.*?)\)',j.text).group(1) == 'USD':
                USD = i.select(".rate-content-sight.text-right.print_hide")[0].text
            elif re.search(r'\((.*?)\)',j.text).group(1) == 'JPY':
                JPY = i.select(".rate-content-sight.text-right.print_hide")[0].text
    
    foreignbank_info(conn, 'TWD', USD, JPY, now)