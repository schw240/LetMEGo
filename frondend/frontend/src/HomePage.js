// @flow

import Axios from 'axios';
import React, { useEffect, useState, useInterval, useRef } from 'react';
import { Page, Grid, Card, colors, } from 'tabler-react';
import ReactDOM from 'react-dom';
import C3Chart from 'react-c3js';
import SiteWrapper from './SiteWrapper';
import HomePageExchangeMoney from './pages/HomePageExchangeMoney'
import Api from './Api';

function Home() {
  
  const [currency, setCurrency] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [delay, setDelay] = React.useState(500000);
  
  const cards = [
    {
      title: '실시간 환율 그래프',
      data: {
        columns: [
          // each columns data
          ['data1'],
        ],
        type: 'line', // default type of chart
        colors: {
          data1: colors['blue-dark'],
        },
        names: {
          // name of each serie
          data1: 'USDKRW',
        },
      },
      axis: {
        x: {
          type: 'category',
          // name of each category
          categories: [],
        },
      },
    },
  ];

  useEffect(() => {
    Api.get('navernews/').then((res) => {
      console.log(res);
    });
  }, []);

  

  const apiCall = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await Axios.get(
        'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD',
      );
      setCurrency(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    apiCall();
  }, []);

  useInterval(() => {
    apiCall();
  }, delay);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function calling() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(calling, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!currency) return null;

  return (
    <SiteWrapper>
      <Page.Content>
        {/* 환율 계산기 */}
        <HomePageExchangeMoney />
        {/* 여기가 실시간 환율 차트 넣는 곳 */}
        <Grid.Row>
          <Grid.Col>
            <Card title="Real-time exchange rate" statusColor="blue">
              <Card.Body>
                <br />
                <ul>
                  {currency.map((currency) => (
                    <>
                      <li key={currency.time}>
                        매매 기준율: {currency.basePrice}
                      </li>
                      <li>전일대비: {currency.changePrice}</li>
                    </>
                  ))}
                </ul>
                {cards.map((chart, i) => (
                  <Grid.Col key={i} md={6} xl={4}>
                    <Card title={chart.title}>
                      <Card.Body>
                        <C3Chart
                          data={chart.data}
                          axis={chart.axis}
                          legend={{
                            show: false, //hide legend
                          }}
                          padding={{
                            bottom: 0,
                            top: 0,
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Grid.Col>
                ))}
                {/* <input value={delay} onChange={handleDelayChange} /> */}
                <button onClick={apiCall}>다시 불러오기</button>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>

        {/* 환율 기사, 워드크라우드 넣는 곳 */}
        <Grid.Row>
          <Grid.Col lg={5}>
            <Card title="exchange rate news" statusColor="blue" statusSide>
              <Card.Body>
                <br />
                기사
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col lg={7}>
            <Card
              title="exchange rate word cloud"
              statusColor="blue"
              statusSide
            >
              <Card.Body>
                <br />
                워드크라우드
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default Home;
