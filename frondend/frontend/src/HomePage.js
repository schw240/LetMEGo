// @flow

import Axios from 'axios';
import React, { useEffect, useState, useInterval, useRef } from 'react';
import { Page, Grid, Card, colors, } from 'tabler-react';
import ReactDOM from 'react-dom';
import SiteWrapper from './SiteWrapper';
import HomePageExchangeMoney from './pages/HomePageExchangeMoney'
import Api from './Api';
import RealtimeGraph from './pages/RealtimeGraph';

function Home() {
  
  const [currency, setCurrency] = React.useState(0);
  const [delay, setDelay] = React.useState(500000);
  
  useEffect(() => {
    Api.get('navernews/').then((res) => {
      console.log(res);
    });
  }, []);

  

  const apiCall = async () => {
    try {
      const response = await Axios.get(
        'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD',
      );
      setCurrency(response.data);
    } catch (e) {
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

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
                <RealtimeGraph />
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
