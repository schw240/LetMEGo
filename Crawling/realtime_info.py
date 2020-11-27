import requests
import json
from db_connect import realtime, realtime_remove
from helper_connect import DBConnect


def realtime_info_craw(conn):
    # http://fx.kebhana.com/FER1101M.web
    # https://earthquake.kr:23490/USDKRW

    url = "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
    response = requests.get(url)
    page_source = response.text
    json_val = json.loads(page_source)

    date = json_val[0].get("date")
    time = json_val[0].get("time")
    basePrice = json_val[0].get("basePrice")
    openingPrice = json_val[0].get("openingPrice")
    change = json_val[0].get("change")
    changePrice = json_val[0].get("changePrice")
    cashBuyPrice = json_val[0].get("cashBuyPrice")
    changeRate = json_val[0].get("changeRate")
    signedChangePrice = json_val[0].get("signedChangePrice")
    signedChangeRate = json_val[0].get("signedChangeRate")
    provider = json_val[0].get("provider")

    if int(time[0:2]) > 18:
        return
    elif int(time[0:2]) < 9:
        return
    else:
        realtime(conn, time, basePrice, signedChangePrice, signedChangeRate)
        realtime_remove(conn)


if __name__ == "__main__":
    conn = DBConnect()
    realtime_info_craw(conn)
