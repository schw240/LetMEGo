import './CompareMoney.css';
import rgtArrow from './rgt_arrow2.png';
import SiteWrapper from '../SiteWrapper';
import * as React from 'react';
import { Page, Grid, Form, } from 'tabler-react';
import API from '../Api'

function CardsDesignPage() {
  const [account, setAccount] = React.useState();
  const [countryGroup, setCountryGroup] = React.useState([]);
  const [selectCountry, setSelectCountry] = React.useState('AED');
  const [KRWdirect, setKRWdirect] = React.useState();
  const [KRWtoUSD, setKRWtoUSD] = React.useState();
  const [KRWtoJPY, setKRWtoJPY] = React.useState();
  const [usdTo, setUsdTo] = React.useState();
  const [jpyTo, setJpyTo] = React.useState();
  const [throughMoney, setThroughMoney] = React.useState({
    usd : '',
    jpy : ''
  })
  const [mostCheap, setMostCheap] = React.useState({
    bank_name_nm: '',
    buy: '',
  });
  const [mostCheapUSD, setMostCheapUSD] = React.useState({
    bank_name_nm: '',
    buy: '',
  });
  const [mostCheapJPY, setMostCheapJPY] = React.useState({
    bank_name_nm: '',
    buy: '',
  });


  const btnClick = () => {
    setKRWtoUSD((account / mostCheapUSD.buy).toFixed(6));
    setKRWtoJPY((account / mostCheapJPY.buy).toFixed(6));
    setKRWdirect((account / mostCheap.buy).toFixed(6));
    setUsdTo((account / mostCheapUSD.buy) * throughMoney.usd);
    setJpyTo((account / mostCheapJPY.buy) * throughMoney.jpy)
  }

  React.useEffect(()=> {
    API.get("countryinfo/?compare=compare")
    .then(response=>{
      const {data} = response;
      // console.log(data)
      setCountryGroup(data);
    })
    .catch(error=>{
        console.error(error);
    })
  },[])

  React.useEffect(()=> {
    setKRWtoUSD()
    setKRWtoJPY()
    setJpyTo()
    setUsdTo()
    setKRWdirect()
    API.get("mostcheapbuy/"+selectCountry)
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
  },[selectCountry])

  React.useEffect(()=> {
    API.get("foreignbank/"+selectCountry)
    .then(response=>{
      const {data} = response
      setThroughMoney({
        usd : data.usd,
        jpy : data.jpy 
      })
    })
    .catch(error=>{
        console.error(error)
    })
  },[selectCountry])

  React.useEffect(()=> {
    API.get("mostcheapbuy/USD")
    .then(response=>{
      const {data} = response
      for(var i=0; i<data.length; i++){
        if(data[i].buy != null){
            setMostCheapUSD({
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
  },[selectCountry])

  React.useEffect(()=> {
    API.get("mostcheapbuy/JPY")
    .then(response=>{
      const {data} = response
      for(var i=0; i<data.length; i++){
        if(data[i].buy != null){
            setMostCheapJPY({
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
  },[selectCountry])

  return (
    <SiteWrapper>
      <Page.Content>
        <div
          style={{
            backgroundColor: 'white',
            marginTop: '50px',
            overflow: 'hidden',
            padding: '30px',
          }}
        >
          <Grid.Row>
            <Grid.Col md={4} sm={4}>
              <Form.Group label="환전할 금액">
                <div style={{ marginTop: '8%', marginLeft: '25%' }}>
                  <Form.Group label="환전 금액">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input onChange={(e)=>{setAccount(e.target.value)}}/>
                      <Form.InputGroupAppend>
                        <Form.InputGroupText>원</Form.InputGroupText>
                      </Form.InputGroupAppend>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Form.Group>
            </Grid.Col>

            <Grid.Col md={4} sm={4}>
              <div
                style={{
                  width: '100px',
                  height: '60px',
                  marginTop: '17%',
                  marginLeft: '33%',
                }}
                onClick={btnClick}
              >
                <img src={rgtArrow} />
              </div>
            </Grid.Col>
            <Grid.Col md={4} sm={4}>
              <div style={{ marginTop: '15%' }}>
                <Form.Group label="도착지">
                  <Form.Select onChange={(e)=>{setSelectCountry(e.target.value)}}>
                    {countryGroup.map((v) =>
                      <option value={v.country_name}>{v.name_kor}({v.country_name})</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>

        <br />
        <div
          style={{
            backgroundColor: 'white',
            marginTop: '20px',
            overflow: 'hidden',
            padding: '30px',
          }}
        >
          <Grid.Row>
            <Grid.Col md={4} sm={4}>
              <Form.Group label="거쳐서">
                <div style={{ marginTop: '8%', marginLeft: '25%' }}>
                  <Form.Group label="통화">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW > USD</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input readOnly value={KRWtoUSD}/>
                    </Form.InputGroup>
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW > JPY</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input readOnly value={KRWtoJPY}/>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Form.Group>
            </Grid.Col>

            <Grid.Col md={4} sm={4}>
              <div
                style={{
                  width: '100px',
                  height: '60px',
                  marginTop: '21%',
                  marginLeft: '33%',
                }}
              >
                <img src={rgtArrow} />
              </div>
            </Grid.Col>
            <Grid.Col md={4} sm={4}>
              <div style={{ marginTop: '15%' }}>
                <Form.Group label="환전 결과">
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                      <Form.InputGroupText>USD > {selectCountry}</Form.InputGroupText>
                    </Form.InputGroupPrepend>
                    <Form.Input readOnly value={usdTo}/>
                  </Form.InputGroup>
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                    <Form.InputGroupText>JPY > {selectCountry}</Form.InputGroupText>
                    </Form.InputGroupPrepend>
                    <Form.Input readOnly value={jpyTo}/>
                  </Form.InputGroup>
                </Form.Group>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>

        <br />
        <div
          style={{
            backgroundColor: 'white',
            marginTop: '20px',
            overflow: 'hidden',
            padding: '30px',
          }}
        >
          <Grid.Row>
            <Grid.Col md={4} sm={4}>
              <Form.Group label="다이렉트">
                <div style={{ marginTop: '8%', marginLeft: '25%' }}>
                  <Form.Group label="원화">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input readOnly value={account}/>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Form.Group>
            </Grid.Col>

            <Grid.Col md={4} sm={4}>
              <div
                style={{
                  width: '100px',
                  height: '60px',
                  marginTop: '17%',
                  marginLeft: '33%',
                }}
              >
                <img src={rgtArrow} />
              </div>
            </Grid.Col>
            <Grid.Col md={4} sm={4}>
              <div style={{ marginTop: '15%' }}>
                <Form.Group label="결과">
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                    <Form.InputGroupText>KRW > {selectCountry}</Form.InputGroupText>
                    </Form.InputGroupPrepend>
                    <Form.Input readOnly value={KRWdirect}/>
                  </Form.InputGroup>
                </Form.Group>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Page.Content>
    </SiteWrapper>
  );
}

export default CardsDesignPage;
