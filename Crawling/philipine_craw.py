import requests
import datetime
import pymysql
from bs4 import BeautifulSoup
from helper_connect import NewConnect
import threading
import time

def exist_now(c_name):
    conn = NewConnect()
    cursor = conn.cursor()
    query = 'SELECT Country_name FROM foreign_bank WHERE Country_name = %s'
    cursor.execute(query, c_name)

    return cursor.fetchone() != None if True else False

def php_crawling():

    now = datetime.datetime.now()
    country = "PHP"
    usd, jpy = 0,0

    headers = {
        "Upgrade-Insecure-Requests" : "1",  
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
    }

    phili_bank = requests.get("https://www.dbp.ph/foreign-exchange-rates/", headers=headers)

    soup = BeautifulSoup(phili_bank.content,"html.parser")
    trs = soup.select("#post-5035 > div > div:nth-child(3) > table tr")

    contry_list = []
    buy_list = []
    for i in range(len(trs)):
        contry_list.append(trs[i].select("#post-5035 > div > div:nth-child(3) > table > tbody > tr:nth-child({}) > td.tbl-item-l".format(i)))
        buy_list.append(trs[i].select('#post-5035 > div > div:nth-child(3) > table > tbody > tr:nth-child({}) > td:nth-child(2)'.format(i)))

    usd = buy_list[1][0].text
    jpy = buy_list[2][0].text     


    print(country,usd, jpy, now)

    conn = NewConnect()
    cursor = conn.cursor()
    if exist_now('PHP'):
       sql = "UPDATE foreign_bank SET USD = %s, JPY = %s, UpdateDate = %s WHERE Country_name = %s;"
    else:
        sql = "insert into foreign_bank(USD, JPY, UpdateDate, Country_name) values(%s,%s,%s,%s);"
    cursor.execute(sql, (usd, jpy, now,"PHP"))
    conn.commit()
    #threading.Timer(60*60,php_crawling).start()


php_crawling()