import requests
import datetime
import pymysql
from bs4 import BeautifulSoup
from model_bank import ForeignBank
from helper_connect import NewConnect, exist_now
import threading
import time
import json
import re

def cad_crawling():

    now = datetime.datetime.now()
    country = "CAD"
    usd, jpy = 0,0
    update = now

    headers = {
        "authority": "www.bmo.com",
        "method": "GET",
        "path": "/bmocda/templates/json_fx_include.jsp",
        "scheme": "https",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": """ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7""",
        "cookie": "s_vi=[CS]v1|2FD10CCD85159A41-600007AE2678EE84[CE]; referrer=undefined; _abck=30AFFE1BD3C076C9B466FF8A5022C436~0~YAAQZJc7F5BHfYd1AQAAZgw0kQS/3lI48LrNo367Z2/xDHIMcHDl5X9jedpaUxWrXcOYKmR4vfyySJkYms0PsyYtB1di1PgIjH2yahcGFhb0sS4l+mMLd5PJHloDy5KWbDqPN7yFDvHCuwx/RYOMxCp1rtEPyqlU0OufvhcqEqvdQgrSeAPK2im5RtxWtJeOKkenl/MSlZqSGlnOuUk8JywHO4cgaL8GdZJtzIwO8fxh3TnmLBeE5pxdvumqmQcfes9gX95LzCOICskiiO3frhqdSjkjPrshnycZttQEaF3qxNLy18Le1pG/6DYswGHB7RoLmoA0qLf8t38uP+4gmxvYjA==~-1~||-1||~-1; check=true; AMCVS_121534B8527830F30A490D44%40AdobeOrg=1; AMCV_121534B8527830F30A490D44%40AdobeOrg=-330454231%7CMCAID%7C2FD10CCD85159A41-600007AE2678EE84%7CMCIDTS%7C18571%7CMCMID%7C22564183889122748281090447554568579575%7CMCAAMLH-1605066855%7C11%7CMCAAMB-1605066855%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1604469255s%7CNONE%7CvVersion%7C3.1.2; _gcl_au=1.1.819305518.1604462056; _ga=GA1.2.1918792341.1604462056; AAMC_bmofinancial_0=REGION%7C11; aam_sc=aamsc%3D8978581%7C11981780; aam_tnt=Cust%20did%20not%20sign%20in%20OLB%3D8978581%2CVisitorNoDar%3D11981780%2CHomepageVisit%3D4322904; aam_lme=seg%3D4322904; aam_uuid=22473012835698799461099547136450682865; mbox=session#4183a999a76f4560870f21d075c139e8#1604463916|PC#4183a999a76f4560870f21d075c139e8.38_0#1667706859; ak_bmsc=D22700EFFA292AC07D56E2D1B48FEB5C173B9764507A0000BEBCA45F61C9EB29~pl4cbWPSvR2MtvHKwtTxJU8U6TiT/ixRVbP/SqHs5msoEdfoizTKlvfkIH820OwpYM0gTBT8Hx4pwP6nxURg16EoAp0Zgtf+SQJvZXl3POpNjRIUhV7gG55QgQ6FOppoSi+5+k+19Vcd/LU5izQveRZ70O32Fi/cTyCKieVX63DA/k+dt/CL0hreYvgPxvFvZ+FLv/IVPjm3h99CFVLgsHp5e8s49enHkz+qdFSWqjNXM=; bm_sz=1931797684D68562741FB3277DB5097C~YAAQZJc7FwwiIpJ1AQAAJkmBmwkkNiK7j5z7srA4GPRTeyf1aUMtGZRDuPsoqT8rlkjitrcuZxdTO2LwSOUw6k5zqsVZ4KnIOAra5+dPeRrCHm+jptL2553go8vC10Dk6jX2YBA8NB9bluRIcwAjadEuYoEDl6jxzIEc7eImUSX88L3fUNUBCmdPfw6F; s_sess=%20s_cc%3Dtrue%3B%20s_sq%3D%3B%20s_ppvl%3DBMO%25253APERS%25253ARates%25253AForeign-Exchange%252C69%252C69%252C722%252C1536%252C722%252C1536%252C864%252C1.25%252CP%3B%20s_ppv%3DBMO%25253APERS%25253ARates%25253AForeign-Exchange%252C98%252C69%252C1022%252C974%252C722%252C1536%252C864%252C1.25%252CP%3B; s_pers=%20s_dfa%3Dbmofinancialgroupprod%252Cbmofinancialgroupcanadabankingprod%7C1604633544677%3B%20s_vmonthnum%3D1635998056449%2526vn%253D2%7C1635998056449%3B%20s_fid%3D7DA03BF500CE5450-3B4C369CFDACB029%7C1667703927733%3B%20s_nr%3D1604631927741-Repeat%7C1636167927741%3B%20s_yearvisit%3Dtrue%7C1604633727744%3B%20gpv_p5%3DBMO%253APERS%253ARates%253AForeign-Exchange%7C1604633727748%3B%20s_ppn%3DBMO%253APERS%253ARates%253AForeign-Exchange%7C1604633727751%3B; bm_sv=1599F8588381B5108F1FEADA7FE1D68B~VmhX4vHlXNg1CMR3UOpHnd5TSa2/jlSVTXiCinB82cdtGiEWFUSPvBOYfXx+SZdQfR6oVXdzDbF7sNMEv/TiFRBcexUyyMLFT+Z7IGtg2lZ36DnDDvZ6Hva3DT9SIiEujZL0eVHIGZnO6WRIOJjBIw==",
        "referer": "https://www.bmo.com/home/personal/banking/rates/foreign-exchange",
        "sec-fetch-dest": "script",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
    }

    cad_bank = requests.get("https://www.bmo.com/bmocda/templates/json_fx_include.jsp")
    page_source = cad_bank.text
    matched = re.search(r'var FXLong = (.+);',page_source, re.S)
    re_matched = re.search(r'var FXLong = (.+?);', page_source, re.S)
    json_string = re_matched.group(1)
    #money_list = json.loads(json_string)
    #print(money_list)
    #print(type(money_list))
    # print(json_string)
    # print(type(json_string))
    json_string = json_string.replace("'",'"')
    #print(json_string)
    
    money_list = json.loads(json_string)

    usd = (money_list.get("USD").get("NA").get("BUY"))
    jpy = (money_list.get("JPY").get("NA").get("BUY"))
    print(usd, jpy, now, country)
    conn = NewConnect()
    cursor = conn.cursor()
    if exist_now('CAD'):
       sql = "UPDATE foreign_bank SET USD = %s, JPY = %s, UpdateDate = %s WHERE Country_name = %s;"
    else:
        sql = "insert into foreign_bank(USD, JPY, UpdateDate, Country_name) values(%s,%s,%s,%s);"
    cursor.execute(sql, (usd.replace(',',''), jpy, now, country))
    conn.commit()
    # #threading.Timer(60*60,php_crawling).start()


cad_crawling()