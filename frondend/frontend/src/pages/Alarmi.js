import React, { useState, useEffect } from 'react';
import Api from '../Api';
import SiteWrapper from '../SiteWrapper';
import { Form, Page, Grid, Card, colors, Tab, Tabs, Table, Dropdown} from "tabler-react";  
import './Alarmi.css'

function MoreNews() {

  const [news, setNews] = React.useState([]);

  

  useEffect(() => {
    Api.get("navernews/").then((res) => {
      
      const data = []

      for(let i = 0; i < 50; i++) {
        data.push((res.data[i]))
      }

      setNews(data)
      console.log(data)
     })
  },[])

  return <> {
    news.map((value) => {
      return <div className="p">
        
      
        <div className="companyStyle"> [{value.company}] </div>
        <div className="titleStyle">{value.title} <div className="dateStyle">-{value.upload_date}</div></div>
        <div className="contentStyle">{(value.content).substring(1,205)}<a target = "_blank" href = {value.link}>....>>> 클릭</a></div>
        

        </div>
    })
  }  
  </>

}



function ProMo() {

  const [prom, setProm] = React.useState([]);

  

  useEffect(() => {
    Api.get("bankgroup_list/").then((res) => {

      const data = []

      for(let i = 0; i < 20; i++) {
        data.push((res.data[i]))
      }

      setProm(data)
      console.log(data)
    })
  },[])

  return <> 
  <table>
    <tr>
      <td>국기 미국(달러) USD</td>
      <td>국기 일본(엔) JPY</td>
      <td>국기 유럽(유로) EUR</td>
      <td>국기 영국(파운드) GBP</td>
    </tr>

    <tr>
      <td>국기 캐나다(캐나다 달러) CAD</td>
      <td>국기 홍콩(홍콩 달러) HKD</td>
      <td>국기 호주(호주 달러) AUD</td>
      <td>국기 중국(위안) CNY</td>
    </tr>

    <tr>
      <td>국기 싱가폴(싱가폴 달러) SGD</td>
      <td>국기 뉴질랜드(뉴질랜드 달러) NZD</td>
      <td>국기 태국(태국 바트) THB</td>
      <td>국기 베트남(베트남 동) VND</td>
    </tr>

    <tr>
      <td>국기 대만(대만 달러) TWD</td>
      <td>국기 필리핀(필리핀 페소) PHP</td>
    </tr>

  </table>

  
  
    <Table>
      <Table.Header>
        <Table.ColHeader>은행</Table.ColHeader>
        <Table.ColHeader>최대우대율</Table.ColHeader>
        <Table.ColHeader>우대사항</Table.ColHeader>
        <Table.ColHeader>기준일</Table.ColHeader>
      </Table.Header>
      <Table.Body>
        {
              prom.map((value) => {
                return (
                  <Table.Row>
                    <Table.Col className="tableProm">{value.bank_name}</Table.Col>
                    <Table.Col className="maxRate">{value.maxprefrate}</Table.Col>
                    <Table.Col>{value.treatandevent}</Table.Col>
                    <Table.Col className="baseDate">{value.basedate}</Table.Col>
                  </Table.Row>
                  )
            })
        }
      </Table.Body>
    </Table>
    </>
}


function NationList () {

  const [nation, setNation ] = React.useState([]);

  useEffect (() => {
    Api.get("bankgroup_list/").then((res) => {
      console.log(res.data)
      setNation(res.data)
      
      
    })
  },[])

  return <> 
  {
    nation.map((value) => {
      return <div>
        <div>{value.country_name}</div>

      </div>
    })

  }
  
  </>

}

  
function AlarMie() {
  
  return (
    <SiteWrapper>
       <Page.Content>
         
        <Tabs initialTab="News Detail">   
      <Tab title="News Detail">
        <Card className="scrol"><MoreNews/></Card>
      

      </Tab>

      <Tab title="ME Promotion">
        <Card><NationList/></Card>
      
        <Card className="container"><ProMo/></Card>
      
      
      </Tab>
      
    </Tabs>
    </Page.Content>
    </SiteWrapper>   
    
    )
}

export default AlarMie;

