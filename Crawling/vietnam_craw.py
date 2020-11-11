import requests
import datetime
import pymysql
from bs4 import BeautifulSoup
from model_bank import ForeignBank
from helper_connect import NewConnect, exist_now
import threading
import time

def viet_crawling():

    now = datetime.datetime.now()
    country = "VND"
    usd, jpy = 0,0
    update = now

    headers = {
        "Accept": """text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9""",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": """ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7""",
        "Connection": "keep-alive",
        "Cookie": """_ga=GA1.3.1059086235.1604475947; _gid=GA1.3.142536416.1604475947; JSESSIONID=6u2XRahaSgyJdSodc1PEIP7lBtZDreWw9NiD1r8J6IJb3dHVVPaG!-2071201993; SBVCookie=!9d0DQ1hgntarX+yUIMoBicxUY/0sPWxUtsla4TgQNak54a2ajYffYTh9XeuUXsPUfscwrFrZUhpbwQ==""",
        "Host": "www.sbv.gov.vn",
        "Referer": "https://www.sbv.gov.vn/TyGia/faces/ExchangeRate.jspx?_adf.ctrl-state=189twepxym_4&_afrLoop=6492512555058297",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Upgrade-Insecure-Requests" : "1",  
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
    }

    viet_bank = requests.get("https://www.sbv.gov.vn/TyGia/faces/ExchangeRate.jspx?_adf.ctrl-state=189twepxym_4&_afrLoop=6492512555058297")
    soup = BeautifulSoup(viet_bank.content,"html.parser")
    table = soup.find_all("table", {"class":"jrPage"})
    trs = table[1].find_all("tr")
    usd_tr = trs[3]
    jpy_tr = trs[5]
    usd_td = usd_tr.find_all("td")
    jpy_td = jpy_tr.find_all("td")
    #usd 들어있는 td 
    #print(usd_td[2].text)
    #buy 값 들어있는 td 
    usd = usd_td[4].text
    jpy = jpy_td[4].text

    #print(usd, jpy, now, country)
    conn = NewConnect()
    cursor = conn.cursor()
    if exist_now('VND'):
       sql = "UPDATE foreign_bank SET USD = %s, JPY = %s, UpdateDate = %s WHERE Country_name = %s;"
    else:
        sql = "insert into foreign_bank(USD, JPY, UpdateDate, Country_name) values(%s,%s,%s,%s);"
    cursor.execute(sql, (usd.replace(',',''), jpy, now, country))
    conn.commit()
    #threading.Timer(60*60,php_crawling).start()


viet_crawling()