import requests
import datetime
from bs4 import BeautifulSoup
from db_connect import bankgroup_info

def bankgroup_crawling(conn):

    now = datetime.datetime.now()
    usd_data = ['USD','JPY','EUR','GBP','CAD','HKD','AUD','CNY','SGD','NZD','THB','VND','TWD','PHP']
    headers = {
        "Accept": """text/html, */*; q=0.01""",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": """ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7""",
        "Connection": "keep-alive",
        "Content-Length": "7",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "PHPSESSID=bmloou8kaeg53pqata6coeac76",
        "Host": "exchange.kfb.or.kr",
        "Origin": "http://exchange.kfb.or.kr",
        "Referer": "http://exchange.kfb.or.kr/page/on_commission.php",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    for data in usd_data:
        bank_gourp = requests.post("http://exchange.kfb.or.kr/page/on_commission_list.php", headers=headers, data={'cur':data})
        html = bank_gourp.text
        soup = BeautifulSoup(html, 'html.parser')

        trs = soup.find_all('tr')
        for i in range(1,len(trs)):
            strong = (trs[i].find('strong'))
            bank_name = strong.text
        
            tds = trs[i].find_all('td')
            buy_fee_rate = tds[0].text
            std_pref_rate = tds[1].text
            max_pref_rate = tds[2].text
            treat_and_event = tds[3].text
            base_date = tds[4].text

            bankgroup_info(conn, bank_name, data, buy_fee_rate, std_pref_rate, max_pref_rate, treat_and_event, base_date, now)
            