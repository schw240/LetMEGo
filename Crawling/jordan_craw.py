import requests
import datetime
import re
import json
from db_connect import foreignbank_info

def jordan_craw(conn):
    now = datetime.datetime.now()

    session = requests.session()
    response = session.get("https://alawnehexchange.com/en/currency_exchange")

    text = re.search('(?<=,"JOD":).+(?=},"nice_menus_options)', response.text)

    data = json.loads(text.group())

    USD = data['USD']['BUY']
    JPY = data['JPY']['BUY']
           
    foreignbank_info(conn, 'JOD', USD, JPY, now)