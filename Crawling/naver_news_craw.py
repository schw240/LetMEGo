import urllib.request
import requests
from bs4 import BeautifulSoup
import re
from konlpy.tag import Twitter
from collections import Counter
from wordcloud.wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt 
import pymysql
from datetime import datetime
from db_connect import naver_news_info, naver_news_remove
from helper_connect import DBConnect # 디비 연결

def pageCrawl(conn):
    url_input = "환율"
    plus_url = urllib.parse.quote_plus(url_input, safe='/', encoding='utf-8', errors='strict')
    pageNum = 1
    
    print()
    
    morphs = []
    cnt = 0
    while True:
        url = f'https://search.naver.com/search.naver?&where=news&query={plus_url}&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:dd,p:all,a:all&mynews=0&start={pageNum}'
        html = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(html, 'html.parser')

        lis = soup.select('#main_pack > section > div > div.group_news > ul li')

        pageNum += 10
        

        for i in lis :
            new_tit = ''
            news_link = ''
            news_name = ''
            news_date = ''
            news_article = ''

            
            new_tit = i.select('div.news_wrap.api_ani_send > div > a')

            
            if len(new_tit) == 0:
                continue
            else:
                new_tit[0].attrs['title']
                new_tit[0].attrs['href']

        
                if len(i.select("a.info")) == 2:
                    
                    try:
                        
                        i.select("a.info")[1].attrs['href']
                        url2 = i.select("a.info")[1].attrs['href']
                        
                        headers = {
                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"
                        }
                        
                        html2 = requests.get(url2, headers=headers)
                        soup2 = BeautifulSoup(html2.text, 'html.parser')
                        
                        # 신문사 불러오기
                        news_name = soup2.select_one('div.press_logo > a.nclicks(atp_press) > img')

                        # 날짜 불러오기
                        news_date = soup2.find('span', {'class':'t11'})
                        
                        news_article = soup2.select_one('#articleBodyContents').text
                        if news_article is None:
                            continue
                        else:
                            news_article = soup2.select_one('#articleBodyContents').text
                            news_article = news_article.replace('// flash 오류를 우회하기 위한 함수 추가', '')
                            news_article = news_article.replace('function _flash_removeCallback() {}', '')
                            news_article = news_article.replace('동영상 뉴스', '')
                            news_article = news_article.replace('무단전재 및 재배포 금지', '') 
                            news_article = news_article.replace('\'', '')      
                            news_article = news_article.strip()
                            pretty_news_article = re.sub('[가-힣]{2,3} *기자|▶.*|[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\[[가-힣]{2,5} *|\[[가-힣].*\]]','', news_article) # idk 
                    
                        title = new_tit[0].attrs['title']
                        link = new_tit[0].attrs['href']
                        company = news_name.attrs['title']
                        upload_date = news_date.text
                        content = pretty_news_article

                        

                        twitter = Twitter()
                        sentence = twitter.pos(pretty_news_article)

                        noun_adj_adv_list=[]

                        for word, tag in sentence:
                            if tag in ["Noun"] and ("것" not in word) and ("내" not in word) and ("나" not in word) and ("수" not in word) and ("게" not in word) and ("말" not in word):
                                noun_adj_adv_list.append(word)
                        words = ",".join(noun_adj_adv_list)
                        
                        cnt += 1

                        if cnt > 100:
                            naver_news_remove(conn)
                            return
                        else:
                            print(str(cnt),'기사입력중 : ',title)
                            naver_news_info(conn, title, link, company, upload_date, content, words)

                    except:
                        print('기사입력오류')

    

if __name__== "__main__":
    conn = DBConnect()
    pageCrawl(conn)





