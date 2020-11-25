import requests
import datetime
import json
from bs4 import BeautifulSoup
from db_connect import foreignbank_info

def norway_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://data.norges-bank.no/api/data/EXR/B..NOK.SP?format=sdmx-new-json&apisrc=nbi&lastNObservations=2&locale=en")

    result = json.loads(response.text)

    JPY = result['data']['dataSets'][0]['series']['0:17:0:0']['observations']['1'][0]
    USD = result['data']['dataSets'][0]['series']['0:33:0:0']['observations']['1'][0]
    
    # 100엔 기준으로 값이 나오기 때문에 1엔 기준으로 바꿈
    JPY = float(JPY) / 100

    foreignbank_info(conn, 'NOK', USD, JPY, now)