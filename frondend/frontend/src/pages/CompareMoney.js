import './CompareMoney.css';
import rgtArrow2 from './rgt_arrow2.png';
import rgtArrow from './rgt_arrow.png';
import SiteWrapper from '../SiteWrapper';
import * as React from 'react';
import { Page, Grid, Form, Card } from 'tabler-react';
import API from '../Api'
import './CompareMoney.css'

function CardsDesignPage() {
  const [account, setAccount] = React.useState();
  const [countryGroup, setCountryGroup] = React.useState([]);
  const [selectCountry, setSelectCountry] = React.useState('AED');
  const [KRWdirect, setKRWdirect] = React.useState();
  const [KRWtoUSD, setKRWtoUSD] = React.useState();
  const [KRWtoJPY, setKRWtoJPY] = React.useState();
  const [usdTo, setUsdTo] = React.useState();
  const [jpyTo, setJpyTo] = React.useState();
  const [select, setSelect] = React.useState();
  const [result, setResult] = React.useState({
    status : false,
    changeType: '',
    discount: '',
  });
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
    if(account > 0){
      setKRWtoUSD((account / mostCheapUSD.buy).toFixed(6));
      setKRWtoJPY((account / mostCheapJPY.buy).toFixed(6));

      var direct = (account / mostCheap.buy).toFixed(6);
      var usdto = (account / mostCheapUSD.buy) * throughMoney.usd
      var jpyto = (account / mostCheapJPY.buy) * throughMoney.jpy
      
      setKRWdirect(direct);
      setUsdTo(usdto);
      setJpyTo(jpyto);

      var acc_arr = [direct, usdto, jpyto]
      var type_arr = ["원화로", "달러를 통해서", "엔화를 통해서"]
      var min = direct
      var max = direct
      var max_num = 0

      for(var i=0; i<acc_arr.length; i++){
        if(min > acc_arr[i]){
          min = acc_arr[i]
        }
        if(max < acc_arr[i]){
          max = acc_arr[i]
          max_num = i
        }
      }
      setSelect(selectCountry)
      setResult({status:true, changeType:type_arr[max_num], discount:(max-min).toFixed(6)})
    }else{
      alert('환전 금액은 1 이상의 값이여야 합니다');
    }
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
          <Card title="환전할 금액" statusColor="blue">
            <Card.Body>
              <Grid.Row>
                <Grid.Col md={4} sm={4}>
                  <div style={{ marginTop: '8%', marginLeft: '15%', marginBottom: '13%' }}>
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
                </Grid.Col>
                <Grid.Col md={4} sm={4}>
                  <div
                    style={{
                      width: '35%',
                      height: '20%',
                      marginTop: '10%',
                      marginLeft: '33%',
                    }}
                    onClick={btnClick}
                  >
                    <img src={rgtArrow2} id="rgtArrow"/>
                  </div>
                </Grid.Col>
                <Grid.Col md={4} sm={4}>
                  <div style={{ marginTop: '8%', marginRight: '15%' }}>
                    <Form.Group label="도착지">
                      <Form.Select onChange={(e)=>{setSelectCountry(e.target.value)}}>
                        {countryGroup.map((v) =>
                          <option value={v.country_name}>{v.name_kor}({v.country_name})</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Grid.Col>
                {/* if문으로 버튼 눌렀을 때 결과 보여주는 곳 */}
                {
                  (() => {
                    //함수
                    if(result.status)
                      return <>
                        <Grid.Col md={12} sm={4}>
                          <div style={{ marginTop: '2%', textAlign: "center", marginBottom: '3%' }}>
                            <h1> {result.changeType} 환전하면 {result.discount}{select} 더 환전 가능합니다.</h1>
                            <h5>(최소 금액 기준)</h5>
                          </div>
                        </Grid.Col>
                      </>
                  })()
                }
                
              </Grid.Row>
            </Card.Body>
          </Card>

          <Card title="환전 비교" statusColor="blue">
            <Card.Body>
              <Grid.Row>
                <Grid.Col md={4} sm={4}>
                    <div style={{ marginTop: '5%', marginLeft: '15%', marginBottom: '13%' }}>
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
                </Grid.Col>

                <Grid.Col md={4} sm={4}>
                  <div
                    style={{
                      width: '35%',
                      height: '20%',
                      marginTop: '10%',
                      marginLeft: '33%',
                    }}
                  >
                    <img src={rgtArrow} />
                  </div>
                </Grid.Col>
                <Grid.Col md={4} sm={4}>
                  <div style={{ marginTop: '5%', marginRight: '15%' }}>
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
              <Grid.Row>
              <Grid.Col md={4} sm={4}>
                <div style={{ marginTop: '8%', marginLeft: '15%', marginBottom: '13%'  }}>
                  <Form.Group label="원화">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input readOnly value={account}/>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Grid.Col>

              <Grid.Col md={4} sm={4}>
                <div
                  style={{
                    width: '35%',
                    height: '20%',
                    marginTop: '10%',
                    marginLeft: '33%',
                  }}
                >
                  <img src={rgtArrow} />
                </div>
              </Grid.Col>
              <Grid.Col md={4} sm={4}>
                <div style={{ marginTop: '8%', marginRight: '15%' }}>
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
            </Card.Body>
          </Card>
      </Page.Content>
    </SiteWrapper>
  );
}

export default CardsDesignPage;
