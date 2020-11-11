import requests
import re
import datetime
from bs4 import BeautifulSoup
from db_connect import mybank_info

def mybank_craw(conn):
    now = datetime.datetime.now()

    search_code = ['005', '020', '004', '088', '011', '003', '023', '027', '007', '032', '031', '037', '039', '035']

    session = requests.session()


    for name in search_code:
        response = session.get(f"https://www.mibank.me/exchange/bank/index.php?search_code={name}" )
        bs = BeautifulSoup(response.text,"html.parser")
        
        tr = bs.select(".table_style01.exchange_table tr")
        
        Bank_name = name
        
        for i in tr[1:]:
            Country_name = i.select("td")[1].find('a').attrs['href'].replace('/exchange/saving/index.php?currency=', '')
            BUY = i.select("td")[2].text
            BuyFeeRate = i.select("td")[3].text.replace('%', '')
            SELL = i.select("td")[4].text
            SellFeeRate = i.select("td")[5].text.replace('%', '')
            TradingRate = i.select("td")[8].text
            if BUY == '-':
                BUY = -1
            if BuyFeeRate == '-':
                BuyFeeRate = -1
            if SELL == '-':
                SELL = -1
            if SellFeeRate == '-':
                SellFeeRate = -1
            if TradingRate == '-':
                TradingRate = -1
            
            mybank_info(conn, Bank_name, Country_name, BUY, BuyFeeRate, SELL, SellFeeRate, TradingRate, now)
                
        
        
        
