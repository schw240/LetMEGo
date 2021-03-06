from helper_connect import DBConnect  # 디비 연결
import matplotlib.pyplot as plt
from datetime import date
import base64
from PIL import Image
from io import StringIO
from io import BytesIO


def send_email(conn):

    cursor = conn.cursor()

    sql = f"""
        SELECT date, close
        FROM XGBoost_USDInfo
        ORDER BY seq ASC
        """

    cursor.execute(sql)
    result_usd_xg = cursor.fetchall()

    sql = f"""
        SELECT date, close
        FROM XGBoost_YENInfo
        ORDER BY seq ASC
        """

    cursor.execute(sql)
    result_yen_xg = cursor.fetchall()

    sql = f"""
        SELECT date, close
        FROM XGBoost_EUROInfo
        ORDER BY seq ASC
        """

    cursor.execute(sql)
    result_euro_xg = cursor.fetchall()

    res_xg_usd = []
    times_xg_usd = []
    res_xg_yen = []
    times_xg_yen = []
    res_xg_euro = []
    times_xg_euro = []
    today = date.today()
    print(today)
    for i in range(7):
        times_xg_usd.append(str(result_usd_xg[i][0]))
        times_xg_yen.append(str(result_yen_xg[i][0]))
        times_xg_euro.append(str(result_euro_xg[i][0]))

    for i in range(7):
        res_xg_usd.append(round(result_usd_xg[i][1], 2))
        res_xg_yen.append(round(result_yen_xg[i][1], 2))
        res_xg_euro.append(round(result_euro_xg[i][1], 2))
        times_xg_usd[i] = times_xg_usd[i][5:]
        times_xg_yen[i] = times_xg_yen[i][5:]
        times_xg_euro[i] = times_xg_euro[i][5:]

    x = times_xg_usd
    y = res_xg_usd
    z = res_xg_usd

    fig, ax = plt.subplots()
    ax.plot(x, y, 'bo-', label="XGBoost")
    ax.legend()
    for X, Y, Z in zip(x, y, z):
        ax.annotate('{}'.format(Z), xy=(X, Y), xytext=(-7, 7), ha='right',
                    textcoords='offset points')
    plt.xlabel("2020")
    plt.savefig('./email_images/USD.png')
    # plt.savefig('./email_images/미국{}.png'.format(today))

    x = times_xg_yen
    y = res_xg_yen
    z = res_xg_yen

    fig, ax = plt.subplots()
    ax.plot(x, y, 'bo-', label="XGBoost")
    ax.legend()
    for X, Y, Z in zip(x, y, z):
        ax.annotate('{}'.format(Z), xy=(X, Y), xytext=(-7, 7), ha='right',
                    textcoords='offset points')
    plt.xlabel("2020")
    plt.savefig('./email_images/JPY.png')
    # plt.savefig('./email_images/일본{}.png'.format(today))

    x = times_xg_euro
    y = res_xg_euro
    z = res_xg_euro

    fig, ax = plt.subplots()
    ax.plot(x, y, 'bo-', label="XGBoost")
    ax.legend()
    for X, Y, Z in zip(x, y, z):
        ax.annotate('{}'.format(Z), xy=(X, Y), xytext=(-7, 7), ha='right',
                    textcoords='offset points')
    plt.xlabel("2020")
    plt.savefig('./email_images/EUR.png')
    # plt.savefig('./email_images/유럽{}.png'.format(today))
