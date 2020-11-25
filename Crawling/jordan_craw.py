import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def jordan_craw(conn):
    now = datetime.datetime.now()

    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'visid_incap_542525=idoa8h+OT2WavE9fydPRHDnBvV8AAAAAQUIPAAAAAADKfbhiFYny+3lsxmbw0bz4; incap_ses_946_542525=Ws6tPavFQQPYNOzGO94gDTrBvV8AAAAAlMCZgHKP30IzZ1vKXIyz+w==; has_js=1; _ga=GA1.2.2076982942.1606271296; _gid=GA1.2.811259908.1606271296',
        'Host': 'www.jordanislamicbank.com',
        'If-None-Match':'1606271291-1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
    }

    session = requests.session()

    response = session.get("https://www.jordanislamicbank.com/en/currency-converter", headers=headers, verify=False)
    bs = BeautifulSoup(response.text, "html.parser")

    tr = bs.select(".views-table.cols-5.table.table-hover.table-striped tr")

    td_list = []
    for i in tr:
        tds = []
        for j in i.select("td"):
            tds.append(j.text)
        td_list.append(tds)
    
    for i in td_list[2:]:
        if i[0].split()[0] == 'Japanese':
            JPY = i[1]
        if i[0].split()[0] == 'United':
            USD = i[1]
    
    JPY = float(JPY) / 100
           
    foreignbank_info(conn, 'MNT', USD, JPY, now)