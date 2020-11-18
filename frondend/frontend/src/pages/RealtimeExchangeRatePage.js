// @flow

import * as React from "react";

import { Page, Grid, Text, Table, Card, Icon, Form, Button, } from "tabler-react";

import SiteWrapper from "../SiteWrapper";

function PricingCardsPage() {
  const [selectCountry, setSelectCountry] = React.useState('us')
  const [selectBank, setSelectBank] = React.useState('')
  const [radioGroup, setRadioGroup] = React.useState({
    Country: true,
    Bank: false,
  })

  const radioSelect = (e) => {
    if(e.target.value === 'Country'){
      setRadioGroup({
        Country: true,
        Bank: false,
      })
    }else if(e.target.value === 'Bank'){
      setRadioGroup({
        Country: false,
        Bank: true,
      })
    }
  }

  const selectOption = (e) => {
    console.dir(e.target)
    if(radioGroup.Country){
      console.dir(e.target.value)
      setSelectCountry(e.target.value)
    }else if(radioGroup.Bank){
      console.dir(e.target.value)
      setSelectBank(e.target.value)
    }
  }

  return (
    <SiteWrapper>
      <Page.Content>
        {/* 여기는 실시간 환율 표 참고할곳 */}
        <Form.Group >
          <Form.Radio
            checked={radioGroup.Country}
            isInline
            label="나라"
            name="example-radios"
            value="Country"
            onChange={radioSelect}
          />
          <Form.Radio
            checked={radioGroup.Bank}
            isInline
            label="은행"
            name="example-radios"
            value="Bank"
            onChange={radioSelect}
          />
          <Form.Select xl={4} onChange={selectOption}>
            {/* 이 부분은 if, map 함수 돌리면 됨 */}
            
            {
                  (() => {
                    //함수
                    if(radioGroup.Country)
                      return <>
                      <option value="us">
                        미국
                      </option>
                      <option value="jp">
                        일본
                      </option>
                      </>
                    else if(radioGroup.Bank)
                      return <>
                        <option value="kookmin">
                          국민은행
                        </option>
                        <option value="woori">
                          우리은행
                        </option>
                      </>
                  })()
                }
          </Form.Select>
        </Form.Group>
        <Grid.Row cards deck>
          <Grid.Col width={12}>
            <Card>
              {/* 나라, 은행별 테이블 보여주는 곳 if문 쓰기 */}
              {
                  (() => {
                    //함수
                    if(radioGroup.Country)
                      return <>
                      <Table
                          responsive
                          highlightRowOnHover
                          hasOutline
                          verticalAlign="center"
                          cards
                          className="text-nowrap"
                        >
                          <Table.Header>
                            <Table.Row>
                              <Table.ColHeader alignContent="center"></Table.ColHeader>
                              <Table.ColHeader alignContent="center">은행</Table.ColHeader>
                              <Table.ColHeader alignContent="center">현찰 살 때</Table.ColHeader>
                              <Table.ColHeader alignContent="center"> 수수료 </Table.ColHeader>
                              <Table.ColHeader alignContent="center">현찰 팔 때</Table.ColHeader>
                              <Table.ColHeader alignContent="center"> 수수료 </Table.ColHeader>
                              <Table.ColHeader alignContent="center"> 매매 기준율 </Table.ColHeader>
                              <Table.ColHeader alignContent="center"> 우대사항 </Table.ColHeader>
                            </Table.Row>
                          </Table.Header>
                          
                          {/* 여기서 map 함수 */}
                          <Table.Body>
                            <Table.Row>
                              <Table.Col alignContent="center">
                                <img src="./demo/bank_logo/woori.png" alt="bank_logo"/>
                              </Table.Col>
                              <Table.Col alignContent="center">우리은행</Table.Col>
                              <Table.Col alignContent="center"> 1126.06 </Table.Col>
                              <Table.Col alignContent="center"> 1.75% </Table.Col>
                              <Table.Col alignContent="center"> 1087.34 </Table.Col>
                              <Table.Col alignContent="center"> 1.75% </Table.Col>
                              <Table.Col alignContent="center"> 1106.70 </Table.Col>
                              <Table.Col alignContent="center">
                                <Button id="showmodal">
                                  <Icon prefix="fe" name="plus-circle" />
                                </Button>
                              </Table.Col>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </>
                    else if(radioGroup.Bank)
                    return <>
                    <Table
                        responsive
                        highlightRowOnHover
                        hasOutline
                        verticalAlign="center"
                        cards
                        className="text-nowrap"
                      >
                        <Table.Header>
                          <Table.Row>
                            <Table.ColHeader alignContent="center" className="w-1"> <i className="country-flag" /> </Table.ColHeader>
                            <Table.ColHeader alignContent="center">외화</Table.ColHeader>
                            <Table.ColHeader alignContent="center">현찰 살 때</Table.ColHeader>
                            <Table.ColHeader alignContent="center"> 수수료 </Table.ColHeader>
                            <Table.ColHeader alignContent="center">현찰 팔 때</Table.ColHeader>
                            <Table.ColHeader alignContent="center"> 수수료 </Table.ColHeader>
                            <Table.ColHeader alignContent="center"> 매매 기준율 </Table.ColHeader>
                            <Table.ColHeader alignContent="center"> 우대사항 </Table.ColHeader>
                          </Table.Row>
                        </Table.Header>
                        
                        {/* 여기서 map 함수 */}
                        <Table.Body>
                          <Table.Row>
                            <Table.Col alignContent="center"> <Icon prefix="flag" name="us" /> </Table.Col>
                            <Table.Col alignContent="center">
                              <div>미국</div>
                              <Text size="sm" muted>
                                (USD)
                              </Text>
                            </Table.Col>
                            <Table.Col alignContent="center"> 1126.06 </Table.Col>
                            <Table.Col alignContent="center"> 1.75% </Table.Col>
                            <Table.Col alignContent="center"> 1087.34 </Table.Col>
                            <Table.Col alignContent="center"> 1.75% </Table.Col>
                            <Table.Col alignContent="center"> 1106.70 </Table.Col>
                            <Table.Col alignContent="center">
                              <Button id="showmodal">
                                <Icon prefix="fe" name="plus-circle" />
                              </Button>
                            </Table.Col>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </>
                  })()
                }
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default PricingCardsPage;
