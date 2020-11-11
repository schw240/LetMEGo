import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def brazil_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://ptax.bcb.gov.br/ptax_internet/consultarTodasAsMoedas.do?method=consultaTodasMoedas")

    bs = BeautifulSoup(response.text,"html.parser")

    tr =  bs.select("table tr")
    td_list = []

    for i in tr[1:]:
        td = []
        for j in i.select("td"):
            td.append(j.text.replace(',','.'))
        td_list.append(td)

        
    for i in td_list:
        if len(i) > 4:
            if i[2] == 'USD':
                USD = i[4]
            elif i[2] == 'JPY':
                JPY = i[4]
    
    foreignbank_info(conn, 'BRL', USD, JPY, now)