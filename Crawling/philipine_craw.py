import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info



def php_crawling(conn):

    now = datetime.datetime.now()

    headers = {
        "Upgrade-Insecure-Requests" : "1",  
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
    }

    phili_bank = requests.get("https://www.dbp.ph/foreign-exchange-rates/", headers=headers)

    soup = BeautifulSoup(phili_bank.content,"html.parser")

    # 크롤링 예전 소스
    # trs = soup.select("#post-5035 > div > div:nth-child(3) > table tr")

    # contry_list = []
    # buy_list = []

    # for i in range(len(trs)):
    #     contry_list.append(trs[i].select("#post-5035 > div > div:nth-child(3) > table > tbody > tr:nth-child({}) > td.tbl-item-l".format(i)))
    #     buy_list.append(trs[i].select('#post-5035 > div > div:nth-child(3) > table > tbody > tr:nth-child({}) > td:nth-child(2)'.format(i)))

    # usd = buy_list[1][0].text
    # jpy = buy_list[2][0].text     

    trs = soup.select(".tbl.tbl--clean.tbl--res.tbl--size-2.tbl--75-t tbody tr")

    usd_list = []
    jpy_list = []

    for i in trs:
        if i.select("td")[0].text == 'USD':  
            usd_list.append(i.select("td")[1].text)
        if i.select("td")[0].text == 'JPY':  
            jpy_list.append(i.select("td")[1].text)

    usd = usd_list[0]
    jpy = jpy_list[0]

    foreignbank_info(conn, 'PHP', usd, jpy, now)