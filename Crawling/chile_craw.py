import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def chile_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()

    response = session.get("https://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx")
    bs = BeautifulSoup(response.text, "html.parser")

    tb = bs.select("#wrapper > div > div.row > div > div > div:nth-of-type(1) > div:nth-of-type(10) > div")

    for i in tb:
        for j in i.select("li"):
            if j.select("label")[0].text.split()[0] == 'Dólar':
                if j.select("label")[1].text != 'ND':
                    USD = j.select("label")[1].text.replace(',','.')
                else:
                    USD = 0 #휴일이라(시차) 환율 업데이트 되지 않음

    jpylink = bs.select("#hypLnk1_8")


    response2 = session.get("https://si3.bcentral.cl/Indicadoressiete/secure/"+jpylink[0].attrs['href'])
    bs2 = BeautifulSoup(response2.text,"html.parser")

    table =  bs2.select(".table.table-sm tr")

    for i in table:
        if i.select("td")[0].text == 'Yen':
            if i.select("td")[1].text != 'ND':
                JPY = i.select("td")[1].text.replace(',','.')
            else:
                JPY = 0 #휴일이라(시차) 환율 업데이트 되지 않음

           
    foreignbank_info(conn, 'CLP', USD, JPY, now)