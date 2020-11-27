from helper_connect import DBConnect  # 디비 연결
from apscheduler.schedulers.blocking import BlockingScheduler  # 스케줄러

from bankgroup_craw import bankgroup_crawling
from mybank_craw import mybank_craw

from arabemirates_craw import arabemirates_craw
from austrailia_craw import aus_crawling
from bahrain_craw import bahrain_craw
from bangladesh_craw import bangladesh_craw
from brazil_craw import brazil_craw
from brunei_craw import brunei_craw
from canada_craw import cad_crawling
from catarrh_craw import catarrh_craw
from chile_craw import chile_craw
from czech_craw import czech_craw
from denmark_craw import denmark_craw
from egypt_craw import egypt_craw
from england_craw import eng_crawling
from eu_craw import eu_craw
from hongkong_craw import hongkong_craw
from hungary_craw import hungary_craw
from india_craw import india_craw
from indonesia_craw import indonesia_craw
from israel_craw import israel_craw
from jordan_craw import jordan_craw
from kazakhstan_craw import kazakhstan_craw
from kuwait_craw import kuwait_craw
from malaysia_craw import malaysia_craw
from mexico_craw import mxp_craw
from mongolia_craw import mongolia_craw
from newzealand_craw import nzd_craw
from norway_craw import norway_craw
from oman_craw import oman_craw
from pakistan_craw import pakistan_craw
from philipine_craw import php_crawling
from poland_craw import poland_craw
from russia_craw import russia_craw
from saudiarabia_craw import saudiarabia_craw
from singapore_craw import singapore_craw
from southafrica_craw import southafrica_craw
from sweden_craw import sweden_craw
from swiss_craw import swiss_craw
from taiwan_craw import taiwan_craw
from thailand_craw import thailand_craw
from turkey_craw import turkey_craw
from vietnam_craw import viet_crawling

from naver_news_craw import pageCrawl
from realtime_info import realtime_info_craw
from xgboost_t import xgboost_forecast
from lstm_t import lstm_forecast
import pandas_datareader as web
from yahoo_api import currency_craw
import pandas as pd
import time
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta


# Schedulering
sched = BlockingScheduler()


def thirty_minute():
    conn = DBConnect()

    # 마이뱅크 크롤링 (30분에 한 번)
    mybank_craw(conn)

    conn.close()


def one_hour():
    conn = DBConnect()

    # 해외은행 크롤링 (1시간에 한 번)
    arabemirates_craw(conn)  # 아랍에미리트
    aus_crawling(conn)  # 호주
    bahrain_craw(conn)  # 바레인
    bangladesh_craw(conn)  # 방글라데시
    brazil_craw(conn)  # 브라질
    brunei_craw(conn)  # 브루나이
    cad_crawling(conn)  # 캐나다
    catarrh_craw(conn)  # 카타르
    chile_craw(conn)  # 칠레
    czech_craw(conn)  # 체코
    denmark_craw(conn)  # 덴마크
    egypt_craw(conn)  # 이집트
    eng_crawling(conn)  # 영국
    eu_craw(conn)  # 유럽연합
    hongkong_craw(conn)  # 홍콩
    hungary_craw(conn)  # 헝가리
    india_craw(conn)  # 인도
    indonesia_craw(conn)  # 인도네시아
    israel_craw(conn)  # 이스라엘
    jordan_craw(conn)  # 요르단
    kazakhstan_craw(conn)  # 카자흐스탄
    kuwait_craw(conn)  # 쿠웨이트
    malaysia_craw(conn)  # 말레이시아
    mxp_craw(conn)  # 멕시코
    mongolia_craw(conn)  # 몽골
    nzd_craw(conn)  # 뉴질랜드
    norway_craw(conn)  # 노르웨이
    oman_craw(conn)  # 오만
    pakistan_craw(conn)  # 파키스탄
    php_crawling(conn)  # 필리핀
    poland_craw(conn)  # 폴란드
    russia_craw(conn)  # 러시아
    saudiarabia_craw(conn)  # 사우디
    singapore_craw(conn)  # 싱가포르
    southafrica_craw(conn)  # 남아공
    sweden_craw(conn)  # 스웨덴
    swiss_craw(conn)  # 스위스
    taiwan_craw(conn)  # 대만
    thailand_craw(conn)  # 태국
    turkey_craw(conn)  # 터키
    viet_crawling(conn)  # 베트남

    conn.close()


def one_day():
    conn = DBConnect()

    # 은행연합회 크롤링 (하루에 한 번)
    bankgroup_crawling(conn)

    # 네이버 뉴스 크롤링 (하루에 한 번)
    pageCrawl(conn)

    # xgboost로 예측한 데이터 하루 한번 업데이트
    df_xg = pd.DataFrame()
    df_xg, df_notuse = currency_craw()
    df_xg = df_xg.reset_index()
    xgboost_forecast(conn, 30, df)

    df = web.DataReader('KRW=X', data_source='yahoo', start='2003-01-01')
    data = df.filter(['Close'])
    for i in range(1, 31):
        today = date.today() + relativedelta(days=+i)
        if getDay(today.year, today.month, today.day) == 'Sat' or getDay(today.year, today.month, today.day) == 'Sun':
            continue
        else:
            result = lstm_forecast(conn, data)
            print(result, "실행문 result")
            data = data.reset_index()
            print(data, "위")
            data = data.append({"Date": pd.Timestamp(
                today), "Close": float(result)}, ignore_index=True)
        data = data.set_index("Date")
        print(data, "아래")
        lstm_res(conn, today, result)
        lstm_res_remove(conn)
    conn.close()


def five_min():
    conn = DBConnect()

    realtime_info_craw(conn)
    conn.close()


sched.add_job(five_min, 'interval', seconds=300)  # 1분에 한번씩 저장
sched.add_job(thirty_minute, 'interval', seconds=1800)  # 1800초마다 돌아감(30분)
sched.add_job(one_hour, 'interval', seconds=3600)  # 3600초마다 돌아감 (1시간)
# 매일 정해진 hour에 돌아가게 함 # 테스트로 오전 11시에 돌아가게
sched.add_job(one_day, 'cron', hour=12)

sched.start()
