import smtplib
import datetime
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart

def sendMail(users):
    now = datetime.datetime.now()
    year = str(now.year)
    month = str(now.month)
    day = str(now.day)

    smtp = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp.login("letmego.notice@gmail.com", 'rsnfmvqmkldeesoc')

    pic_list = ['USD', 'JPY', 'EUR']

    
    for user in users:
        print('이메일 보내는중 :', user)

        msg = MIMEMultipart('alternative')

        msg['Subject'] = '[LetMEGo] 이번 주 환율 예측 정보 ('+year+'-'+month+'-'+day+')'

        for i in pic_list:
            # 이미지 파일 추가
            # with open(f"./email_images/{i}{year}-{month}-{day}.png", 'rb') as fp:
            with open(f"./email_images/{i}.png", 'rb') as fp:
                # Name은 메일 수신자에서 설정되는 파일 이름
                # img = MIMEImage(fp.read(), Name = f"{i}{year}-{month}-{day}.png")
                img = MIMEImage(fp.read(), Name = f"{i}.png")
                # 해더에 Content-ID 추가(본문 내용에서 cid로 링크를 걸 수 있다.)
                img.add_header('Content-ID', f'<{i}>')
                # img.add_header('Content-ID', f'<{i}{year}-{month}-{day}>')
                # Data 영역의 메시지에 바운더리 추가
                msg.attach(img)


                body = f"""
            <!DOCTYPE html>
            <html>
                <head>
                </head>
                <body>
                    <h1>미국</h1><img src='cid:USD'>
                    <h1>일본</h1><img src='cid:JPY'>
                    <h1>유럽</h1><img src='cid:EUR'>
                </body>
            </html>
            """

        msg.attach(MIMEText(body,'html'))

        smtp.sendmail("letmego.notice@gmail.com", user, msg.as_string())

    print('이메일 보내기 완료')
    smtp.quit()