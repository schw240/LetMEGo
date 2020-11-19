// @flow

import Axios from 'axios';
import React, { useEffect, useState, useInterval, useRef } from 'react';
import { Page, Grid, Card, Form, Button, colors } from 'tabler-react';
import ReactDOM from 'react-dom';
import C3Chart from 'react-c3js';
import SiteWrapper from './SiteWrapper';
import React, { useEffect } from 'react';
import Api from './Api';

function Home() {
  const [account, setAccount] = React.useState(0);
  const [state, setState] = React.useState(false);
  const [toCountry, setToCountry] = React.useState('USD');
  const [result, setResult] = React.useState();
  const [currency, setCurrency] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [delay, setDelay] = React.useState(500000);
  const [selected, setSelected] = React.useState({
    To: '',
    Acc: '',
  });
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

  const showResult = () => {
    if (account > 0) {
      setState(true);
      setSelected({
        To: toCountry,
        Acc: account,
      });
      setResult((account / 1077.88).toFixed(6)); //여기에 돈 계산식 넣으면 됨 1077.88자리에 각 환율
    } else {
      alert('Account 값은 1 이상이여야 합니다');
    }
  };

  const selectTo = (e) => {
    setToCountry(e.target.value);
  };
  const inputAccount = (e) => {
    setAccount(e.target.value);
  };

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
        <Grid.Row>
          <Grid.Col>
            <Card title="Exchage Money" statusColor="blue">
              <Card.Body>
                <br />
                <Grid.Row>
                  <Grid.Col lg={3}>
                    <Form.Group label="Account">
                      <Form.Input onChange={inputAccount} />
                    </Form.Group>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <Form.Group label="From">
                      <Form.Input name={'fromKor'} disabled value="KRW" />
                    </Form.Group>
                  </Grid.Col>
                  <Grid.Col lg={1}>
                    <br />
                    {/* Account 값이 1 이상일 때만 결과값 나오게, 0 이하를 입력하면 Modals 뜸 */}
                    <Button
                      id="exchange"
                      onClick={showResult}
                      icon="arrow-right"
                    />
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    {/* 여기가 나라명 출력할 곳 */}
                    <Form.Group label="To">
                      <Form.Select onChange={selectTo}>
                        <option>USD</option>
                        <option>JPY</option>
                        <option>CNY</option>
                      </Form.Select>
                    </Form.Group>
                  </Grid.Col>
                </Grid.Row>
                <br />
                <br />
                {/* 이 부분은 입력값 누르고 exchange 버튼 눌렀을 때만 활성화 되게 */}
                {(() => {
                  //함수
                  if (state)
                    return (
                      <Grid.Row>
                        <Grid.Col> </Grid.Col>
                        <Grid.Col>
                          <h1>
                            {selected.Acc.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ',',
                            )}{' '}
                            KRW = {result} {selected.To}
                          </h1>
                        </Grid.Col>
                        <Grid.Col> </Grid.Col>
                      </Grid.Row>
                    );
                })()}
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
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
