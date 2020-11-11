import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import foreignbank_info


def mxp_craw(conn):

    now = datetime.datetime.now()
    
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'JSESSIONID=c7422415da2ffde8c6b8c8543ce6; TS018df36d=0189f484afa17e09eb8407d12480d8cfad2efb1fe58f2001c6af7639d5d054d32692eccf027228513a001dd926e1bfecbc175419bf13ca6ca8f9f30fd31782423cab32272a706e4ac52d51610dd929918d0b34e81c; ser9108090=3343861418.39455.0000; ser25268080=642664106.36895.0000; _ga=GA1.3.1837497598.1604641720; _gid=GA1.3.1948073149.1604641720; TS0175f232=0189f484aff9ef6bcd5ab8240c477a50dd4241ca86ec82b9b6b39e170134521d400c868644f7c0ecb6db0da71aede0df40079e386296dc611dc3cb14999a6c611ab49a4efe0f77b115cefc576d2d44c8018b6fdadb',
        'Host': 'www.banxico.org.mx',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
    }

    req = requests.get('https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadroAnalitico&idCuadro=CA113&sector=6&locale=en', headers=headers)
    
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find_all("table")
    trs = table[1].find_all("tr")
    
    usd_tr = trs[66]
    jpy_tr = trs[36]
    
    usd_td = usd_tr.find_all("td")
    jpy_td = jpy_tr.find_all("td")

    usd = usd_td[4].text.strip().replace("\n","")  # 쓸데없는 정보들이 붙어와서 없애주는 것.
    jpy = jpy_td[4].text.strip().replace("\n","")  # 쓸데없는 정보들이 붙어와서 없애주는 것.

    foreignbank_info(conn, 'MXN', usd, jpy, now)
    