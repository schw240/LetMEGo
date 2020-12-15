# 환율 정보를 알려주는 웹 서비스 LetMEGo!

> 아시아경제 교육센터 <h3> 팀 : 팀장: 김한주(본인), 팀원: 박하람 , 오호정

<hr/>

### 1. 프로젝트 개요
> 해외여행 갈 때 실시간으로 가져온 데이터들을 기반으로 가장 저렴한 환율을 제공하는 은행과 환전 방법, 환율 예측을 통한 30일 이내 최저 환율을 알려주는 웹 서비스 LetMEGo!(Let Money Exchange Go!)

### 2. 프로젝트 환경
![개발환경](https://user-images.githubusercontent.com/54871612/102206986-ba25d400-3f10-11eb-8212-830775889e4c.png)

### 3. 기능구현
<hr/>
#### 1) Crawling
* 국내 , 해외은행, 네이버 뉴스, 하나은행 API, Yahoo Finance API를 활용하여 각종 데이터 수집
* 달러, 유로, 엔화 데이터는 하루에 한번씩 XGBoost, LSTM 모델을 통해 30일뒤까지 가격 예측
* 수집한 데이터 MySQL에 저장
* APScheduler를 활용하여 정해진 시간마다 데이터 최신화
* AWS의 RDS에 MySQL 배포

#### 2) Frontend
* React.JS를 활용
* React UI library인 Tabler 사용하여 프론트 반응형으로 구축
* Highcharts를 사용해 그래프 구현
* Django RESTful API와 리액트를 연동하여 함수형 컴포넌트로 개발하였고, useState함수와 같이 사용하여 상태값이 계속 동적으로 변할 수 있도록 해주어 하나은행 API로 실시간 변하는 값, 로그인 시 변하는 값들 그리고 환전 정보를 비교해줄때의 값 등 동적으로 변할 필요가 있는 값들을 변할 수 있도록 해주었고 useEffect함수를 같이 활용하여 값이 변하거나 특정 버튼을 클릭할 때 다시 렌더링 해줌
* Router를 이용해 SPA로 개발
* AWS의 S3에 배포

#### 3) Backend
* Django를 활용하여 각 데이터 모델 수립
* REST API를 활용하여 데이터 serializer
* React와 연동하여 데이터 표현
* JWT 토큰을 활용하여 로그인 + 유지 구현

#### 4) Web Server
* Python으로 REST API 서비스를 위한 WAS(Web Application Server)구축 진행
* WSGI(Web Server Gateway Interface)미들웨어 Gunicorn, Nginx과 연동
![미들웨어](https://user-images.githubusercontent.com/54871612/102209913-d4fa4780-3f14-11eb-9c36-641769b9be9f.jpg)
* AWS의 EC2에 배포하여 http://letmego-react.s3-website.ap-northeast-2.amazonaws.com/ 로 접속가능


<hr/>
git을 활용한 프로젝트 관리 (git 에 push 할 때 주의할 점)​
✔️ git bash 접속해서 git pull을 먼저하기

✔️ master 권한으로 올리지 않기 → branch 생성해서 push 하기

✔️ branch 이름은 자신이 맡은 역할을 나타낼 수 있도록 만듦

오늘 calendar 작업을 했으면, branch 이름은 calendar

commit message에 날짜와 함께 작업 내용 상세하게 기록해주세요 😄

git branch 브랜치명 → branch 생성
git branch → 현재 접속 된 branch 확인
git checkout 브랜치명 → 해당하는 branch로 접속

git push origin 브랜치명
→ 접속된 `branch`로 push 하는 법 (저장소 이름인 'origin' 뒤에 branch 이름 써서 push 하기)
