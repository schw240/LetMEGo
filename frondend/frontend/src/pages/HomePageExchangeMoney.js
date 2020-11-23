import * as React from "react";
import { Grid, Card, Form, Button, } from 'tabler-react';

import API from '../Api'

function HomePageExchangeMoney() {

    const [account, setAccount] = React.useState(0);
    const [state, setState] = React.useState(false);
    const [toCountry, setToCountry] = React.useState('AED');
    const [result, setResult] = React.useState();
    const [bankname, setBankname] = React.useState();

    const [countryGroup, setCountryGroup] = React.useState([]);
    const [mostCheap, setMostCheap] = React.useState({
        bank_name_nm: '',
        buy: '',
    })

    const [selected, setSelected] = React.useState({
        To: '',
        Acc: '',
    });

    const showResult = () => {
        if (account > 0) {
          setState(true);
          setSelected({
            To: toCountry,
            Acc: account,
          });
          setResult((account / mostCheap.buy).toFixed(6));
          setBankname(mostCheap.bank_name_nm)
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

    React.useEffect(()=> {
        API.get("countryinfo/")
        .then(response=>{
          const {data} = response
          setCountryGroup(data)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    React.useEffect(()=> {
        API.get("mostcheapbuy/"+toCountry)
        .then(response=>{
          const {data} = response
          for(var i=0; i<data.length; i++){
            if(data[i].buy != null){
                setMostCheap({
                    bank_name_nm: data[i].bank_name_nm,
                    buy: data[i].buy,
                })
                break;
            }
          }
        })
        .catch(error=>{
            console.error(error)
        })
    },[toCountry])


    return (
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
                            {countryGroup.map((v) =>
                            <option value={v.country_name}>{v.name_kor}({v.country_name})</option>
                            )}
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
                            <p>{bankname} 기준</p>
                            <h1>
                                {selected.Acc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',', )}{' '} KRW = {result} {selected.To}
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
    );
}

export default HomePageExchangeMoney;