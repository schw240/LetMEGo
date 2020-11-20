import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def chile_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://si3.bcentral.cl/Indicadoressiete/secure/ListaSerie.aspx?param=VQB3AE4ASwBDAHcAagBRACMALQBHAGEAUQBtAGkAaQBaAGEAbgA3AEwAdgAkAHIAcwBCAHkAVgB6AFYAbwB6AGwAXwBiAFcATgBSAFMAOABFAHQAaAAxAHIATgAtADgANwAtAGIARQBaAG0A")
    bs = BeautifulSoup(response.text,"html.parser")

    table =  bs.select(".table.table-sm tr")

    for i in table:
        if i.select("td")[0].text == 'Yen':
            JPY = i.select("td")[1].text.replace(',','.')

            
    response2 = session.get("https://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx")
    bs2 = BeautifulSoup(response2.text, "html.parser")

    tb = bs2.select("#wrapper > div > div.row > div > div > div:nth-child(1) > div:nth-child(10) > div")

    for i in tb:
        for j in i.select("li"):
            if j.select("label")[0].text.split()[0] == 'Dólar':
                USD = j.select("label")[1].text.replace(',','.')
        
    foreignbank_info(conn, 'CLP', USD, JPY, now)