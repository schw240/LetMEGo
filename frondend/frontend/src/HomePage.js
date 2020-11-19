// @flow

import React, { useEffect } from "react";

import { Page, Grid, Card, Form, Button } from "tabler-react";

import SiteWrapper from "./SiteWrapper";
import Api from "./Api";

function Home() {
  const [account, setAccount] = React.useState(0)
  const [state, setState] = React.useState(false)
  const [toCountry, setToCountry] = React.useState('USD')
  const [result, setResult] = React.useState()
  const [selected, setSelected] = React.useState({
    To : '',
    Acc : '',
  })

  useEffect(()=>{
    Api.get("navernews/").then((res)=>{
      console.log(res);
    })
  },[]);

  const showResult = () => {
    if (account > 0){
      setState(true)
      setSelected({
        To : toCountry,
        Acc : account
      })
      setResult((account / 1077.88).toFixed(6)) //여기에 돈 계산식 넣으면 됨 1077.88자리에 각 환율
    }else {
      alert('Account 값은 1 이상이여야 합니다')
    }
  };

  const selectTo = (e) => {
    setToCountry(e.target.value)
  }
  const inputAccount = (e) => {
    setAccount(e.target.value)
  }

  return (
    <SiteWrapper>
      <Page.Content>
        <Grid.Row>
          <Grid.Col>
            <Card title="Exchage Money" statusColor="blue">
              <Card.Body>
                <br/>
                <Grid.Row>
                  <Grid.Col lg={3}>
                    <Form.Group label="Account">
                        <Form.Input onChange={inputAccount}/>
                    </Form.Group>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <Form.Group label="From">
                      <Form.Input
                        name={'fromKor'}
                        disabled
                        value="KRW"
                      />
                    </Form.Group>
                  </Grid.Col>
                  <Grid.Col lg={1}>
                    <br/>
                    {/* Account 값이 1 이상일 때만 결과값 나오게, 0 이하를 입력하면 Modals 뜸 */}
                    <Button id="exchange" onClick={showResult} icon="arrow-right" />
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    {/* 여기가 나라명 출력할 곳 */}
                    <Form.Group label="To">
                      <Form.Select onChange={selectTo}> 
                        <option>
                          USD
                        </option>
                        <option>
                          JPY
                        </option>
                        <option>
                          CNY
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Grid.Col>
                </Grid.Row>
                <br/>
                <br/>
                {/* 이 부분은 입력값 누르고 exchange 버튼 눌렀을 때만 활성화 되게 */}
                {
                  (() => {
                    //함수
                    if(state)
                      return <Grid.Row>
                              <Grid.Col> </Grid.Col>
                              <Grid.Col>
                                <h1>{selected.Acc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KRW = {result} {selected.To}</h1>
                              </Grid.Col>
                              <Grid.Col> </Grid.Col>
                            </Grid.Row>
                  })()
                }
                </Card.Body>
                </Card>
              </Grid.Col>
            </Grid.Row>
        {/* 여기가 실시간 환율 차트 넣는 곳 */}
        <Grid.Row>
          <Grid.Col>
            <Card title="Real-time exchange rate" statusColor="blue">
              <Card.Body>
                <br/>
                실시간 환율 차트
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>

        {/* 환율 기사, 워드크라우드 넣는 곳 */}
        <Grid.Row>
          <Grid.Col lg={5}>
            <Card title="exchange rate news" statusColor="blue" statusSide>
              <Card.Body>
                <br/>
                기사
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col lg={7}>
            <Card title="exchange rate word cloud" statusColor="blue" statusSide>
              <Card.Body>
                <br/>
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
