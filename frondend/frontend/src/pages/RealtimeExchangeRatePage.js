import * as React from 'react';
import { Page, Grid, Card, Form, Table, Button, Icon, Text, Tooltip } from 'tabler-react';
import { Modal, } from 'antd';

import SiteWrapper from '../SiteWrapper';
import API from '../Api'

function PricingCardsPage() {
  const [selectCountry, setSelectCountry] = React.useState('AED')
  const [selectBank, setSelectBank] = React.useState('003')
  const [selectBankNM, setSelectBankNM] = React.useState('IBK기업은행')
  const [modalState, setModalState] = React.useState(false)
  const [radioGroup, setRadioGroup] = React.useState({
    Country: true,
    Bank: false,
  })
  const [modalContents, setModalContents] = React.useState({
    bank_name: '',
    stdprefrate: '',
    maxprefrate: '',
    treatandevent: '',
  })
  const [bankGroup, setBankGroup] = React.useState([])
  const [countryGroup, setCountryGroup] = React.useState([])
  const [bankList, setBankList] = React.useState([])
  const [countryList, setCountryList] = React.useState([])

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
    if(radioGroup.Country){
      setSelectCountry(e.target.value)
    }else if(radioGroup.Bank){
      setSelectBankNM(e.target.selectedOptions[0].getAttribute('name'))
      setSelectBank(e.target.value)
    }
  }

  const btnShowModal = (v) => {
    API.get("bankgroup_list/?bank_name="+v+"&country_name="+selectCountry)
      .then(response=>{
        const {data} = response
        if(data.length !== 0){
          setModalState(true)
          setModalContents({
            bank_name: data[0].bank_name,
            stdprefrate: data[0].stdprefrate,
            maxprefrate: data[0].maxprefrate,
            treatandevent: data[0].treatandevent,
          })
        }else{
          alert('선택한 정보에 해당하는 우대사항이 존재하지 않습니다.')
        }
      })
      .catch(error=>{
          console.error(error)
    })
  }

  const btnShowModal2 = (v) => {   
    API.get("bankgroup_list/?bank_name="+selectBankNM+"&country_name="+v)
      .then(response=>{
        const {data} = response
        if(data.length !== 0){
          setModalState(true)
          setModalContents({
            bank_name: data[0].bank_name,
            stdprefrate: data[0].stdprefrate,
            maxprefrate: data[0].maxprefrate,
            treatandevent: data[0].treatandevent,
          })
        }else{
          alert('선택한 정보에 해당하는 우대사항이 존재하지 않습니다.')
        }
      })
      .catch(error=>{
          console.error(error)
    })
  }

  const handleOk = (e) => {
    setModalState(false)
  };

  const handleCancel = (e) => {
    setModalState(false)
  };

  React.useEffect(()=> {
      API.get("bankinfo/")
      .then(response=>{
        const {data} = response
        setBankGroup(data)
      })
      .catch(error=>{
          console.error(error)
      })
  },[])

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
    API.get("banklist/?bank_name="+selectBank)
    .then(response=>{
      const {data} = response
      setCountryList(data)
    })
    .catch(error=>{
        console.error(error)
    })
  },[selectBank])

  React.useEffect(()=> {
    API.get("banklist/?country_name="+selectCountry)
    .then(response=>{
      const {data} = response
      setBankList(data)
    })
    .catch(error=>{
        console.error(error)
    })
  },[selectCountry])


  return (
    <SiteWrapper>
      <Page.Content>
        {/* 우대사항 */}
        <Modal title={modalContents.bank_name} visible={modalState} onOk={handleOk} onCancel={handleCancel}>
          <p> <b>기본 우대율 :</b> {modalContents.stdprefrate}</p>
          <p> <b>최대 우대율 :</b> {modalContents.maxprefrate}</p>
          <p> <b>우대사항 및 이벤트 :</b> {modalContents.treatandevent}</p>
        </Modal>

        {/* 여기는 실시간 환율 표 참고할곳 */}
        <Form.Group className="real-time">
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
          <Form.Select xl={4} onChange={selectOption} >
            {/* 이 부분은 if, map 함수 돌리면 됨 */}
            {
              (() => {
                //함수
                if(radioGroup.Country)
                  return <>
                    {countryGroup.map((v) =>
                          <option value={v.country_name}>{v.name_kor}</option>
                    )}
                  </>
                else if(radioGroup.Bank)
                  return <>
                    {bankGroup.map((v) =>
                        <option value={v.bank_code} name={v.bank_name}>{v.bank_name}</option>
                    )}
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
                    return <Table
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
                                {bankList.map((v) =>
                                  <Table.Row>
                                      <Table.Col alignContent="center">
                                      <img src={"./demo/bank_logo/"+v.bank_logo+".png"} alt={"bank_"+v.bank_logo}/>
                                      </Table.Col>
                                      <Table.Col alignContent="center">{v.bank_name_nm}</Table.Col>
                                      <Table.Col alignContent="center"> {v.buy} </Table.Col>
                                      <Table.Col alignContent="center"> {v.buyfeerate}% </Table.Col>
                                      <Table.Col alignContent="center"> {v.sell} </Table.Col>
                                      <Table.Col alignContent="center"> {v.sellfeerate}% </Table.Col>
                                      <Table.Col alignContent="center"> {v.tradingrate} </Table.Col>
                                      <Table.Col alignContent="center">
                                      <Tooltip content="Tooltip" placement="top">
                                        <Button id="showmodal" color="indigo" onClick={()=>{btnShowModal(v.bank_name_nm)}}>
                                            <Icon prefix="fe" name="plus-circle" />
                                        </Button>
                                      </Tooltip>
                                      </Table.Col>
                                  </Table.Row>
                                )}
                              </Table.Body>
                              
                          </Table>
                  else if(radioGroup.Bank)
                    return <Table
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
                            {countryList.map((v) =>
                              <Table.Row>
                                <Table.Col alignContent="center"> <Icon prefix="flag" name={v.country_flag} /> </Table.Col>
                                <Table.Col alignContent="center">
                                    <div>{v.name_kor}</div>
                                    <Text size="sm" muted>
                                    ({v.country_name})
                                    </Text>
                                </Table.Col>
                                <Table.Col alignContent="center"> {v.buy} </Table.Col>
                                <Table.Col alignContent="center"> {v.buyfeerate}% </Table.Col>
                                <Table.Col alignContent="center"> {v.sell} </Table.Col>
                                <Table.Col alignContent="center"> {v.sellfeerate}% </Table.Col>
                                <Table.Col alignContent="center"> {v.tradingrate} </Table.Col>
                                <Table.Col alignContent="center">
                                    <Button id="showmodal" color="indigo" onClick={()=>{btnShowModal2(v.country_name)}}>
                                    <Icon prefix="fe" name="plus-circle" />
                                    </Button>
                                </Table.Col>
                              </Table.Row>
                            )}
                          </Table.Body>
                            
                      </Table>
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
