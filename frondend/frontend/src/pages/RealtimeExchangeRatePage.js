// @flow

import * as React from 'react';

import { Page, Grid, Card, Form, } from 'tabler-react';

import SiteWrapper from '../SiteWrapper';
import RealtimeCountry from './RealtimeCountry';
import RealtimeBank from './RealtimeBank';

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
                      return <RealtimeCountry />
                    else if(radioGroup.Bank)
                    return <RealtimeBank />
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
