from helper_connect import DBConnect # 디비 연결
from apscheduler.schedulers.blocking import BlockingScheduler # 스케줄러

from bankgroup_craw import bankgroup_crawling
from mybank_craw import mybank_craw

from austrailia_craw import aus_crawling
from brazil_craw import brazil_craw
from canada_craw import cad_crawling
from chile_craw import chile_craw
from england_craw import eng_crawling
from eu_craw import eu_craw
from hongkong_craw import hongkong_craw
from mexico_craw import mxp_craw
from newzealand_craw import nzd_craw
from philipine_craw import php_crawling
from singapore_craw import singapore_craw
from taiwan_craw import taiwan_craw
from thailand_craw import thailand_craw
from vietnam_craw import viet_crawling


#Schedulering
sched = BlockingScheduler()

def thirty_minute():
    conn = DBConnect()

    #마이뱅크 크롤링 (30분에 한 번)
    mybank_craw(conn)

    conn.close()


def one_hour():
    conn = DBConnect()

    # 해외은행 크롤링 (1시간에 한 번)
    aus_crawling(conn) # 호주
    brazil_craw(conn) # 브라질
    cad_crawling(conn) # 캐나다
    chile_craw(conn) # 칠레
    eng_crawling(conn) # 영국
    eu_craw(conn) # 유럽연합
    hongkong_craw(conn) # 홍콩
    mxp_craw(conn) # 멕시코
    nzd_craw(conn) # 뉴질랜드
    php_crawling(conn) # 필리핀
    singapore_craw(conn) # 싱가포르
    taiwan_craw(conn) # 대만
    thailand_craw(conn) # 태국
    viet_crawling(conn) # 베트남

    conn.close()


def one_day():
    conn = DBConnect()

    # 은행연합회 크롤링 (하루에 한 번)
    bankgroup_crawling(conn)
    
    # 네이버 뉴스 크롤링 (하루에 한 번)
    pageCrawl(conn)

    conn.close()

sched.add_job(thirty_minute, 'interval', seconds=1800) #1800초마다 돌아감(30분)
sched.add_job(one_hour, 'interval', seconds=3600) # 3600초마다 돌아감 (1시간)
sched.add_job(one_day, 'cron', hour=12) # 매일 정해진 hour에 돌아가게 함 # 테스트로 오전 11시에 돌아가게

sched.start()