import React, { useState, useEffect } from 'react';
import Api from '../Api';
import SiteWrapper from '../SiteWrapper';
import {Page, Card, Tab, Tabs, Table, Button } from "tabler-react";  
import './Alarmi.css'
import AUD_round from '../assets/images/flag/AUD_round.png'
import CAD_round from '../assets/images/flag/CAD_round.png'
import CHF_round from '../assets/images/flag/CHF_round.png'
import CHY_round from '../assets/images/flag/CHY_round.png'
import EUR_round from '../assets/images/flag/EUR_round.png'
import GBP_round from '../assets/images/flag/GBP_round.png'
import HKD_round from '../assets/images/flag/HKD_round.png'
import JPY_round from '../assets/images/flag/JPY_round.png'
import NZD_round from '../assets/images/flag/NZD_round.png'
import PHP_round from '../assets/images/flag/PHP_round.png'
import SGD_round from '../assets/images/flag/SGD_round.png'
import THB_round from '../assets/images/flag/THB_round.png'
import TWD_round from '../assets/images/flag/TWD_round.png'
import USD_round from '../assets/images/flag/USD_round.png'
import VND_round from '../assets/images/flag/VND_round.png'

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

  const [alam, setAlam] = React.useState("USD")

  

  const [prom, setProm] = React.useState([]);

  useEffect(() => {
    console.log(alam)
    Api.get("bankgroup_list/?country_name="+alam).then((res) => {
      const {data} = res
      setProm(data)
      console.log(data)
    })
  },[alam])

  return <> 
  <table className="button">
    <tr>
     
      <td >
        <Button onClick={() => {setAlam("USD")}} outline color="secondary" pill color="primary">
        <span><img src={USD_round} width="50"/></span>
        <span style={{padding:"10px"}}>미국 USD</span>
        </Button>
      </td>
      
      <td>
        <Button onClick={() => {setAlam("JPY")}} outline color="secondary" pill color="primary"> 
        <span><img src={JPY_round} width="50"/></span>
        <span style={{padding:"10px"}}>일본 JPY</span>
        </Button>
      </td>

      <td>
        <Button onClick={() => {setAlam("EUR")}} outline color="secondary" pill color="primary">
        <span><img src={EUR_round} height="30" width="50"/></span>
        <span style={{padding:"10px"}}>유럽 EUR</span> 
        </Button>
      </td>

      <td>
        <Button  onClick={() => {setAlam("GBP")}} outline color="secondary" pill color="primary"> 
        <span><img src={GBP_round} width="50"/></span>
        <span style={{padding:"10px"}}>영국 GBP</span>
        </Button>
      </td>

      <td>
        <Button onClick={() => {setAlam("VND")}} outline color="secondary" pill color="primary">
        <span><img src={VND_round} height="30" width="50"/></span>
        <span style={{padding:"10px"}}>베트남 VND</span>
        </Button>
      </td>
    
    </tr>

    <tr>
      <td>
        <Button onClick={() => {setAlam("CAD")}} outline color="secondary" pill color="primary"> 
        <span><img src={CAD_round} width="50"/></span>
        <span style={{padding:"10px"}}>캐나다 CAD</span>
        </Button>
      </td>
  
      <td>
        <Button onClick={() => {setAlam("CHF")}} outline color="secondary" pill color="primary">
        <span><img src={CHF_round} height="30" width="50"/></span> 
        <span style={{padding:"10px"}}>스위스 CHF</span>
        </Button>
      </td>
      
      <td>
        <Button onClick={() => {setAlam("HKD")}} outline color="secondary" pill color="primary">
        <span><img src={HKD_round} height="30" width="50"/></span> 
        <span style={{padding:"10px"}}>홍콩 HKD</span>
        </Button>
      </td>
      
      <td>
        <Button onClick={() => {setAlam("AUD")}} outline color="secondary" pill color="primary">
          <span><img src={AUD_round} width="50"/></span> 
          <span style={{padding:"10px"}}>호주 AUD</span>
        </Button>
      </td>
      
      <td>
        <Button  onClick={() => {setAlam("TWD")}} outline color="secondary" pill color="primary"> 
        <span><img src={TWD_round} height="30" width="50"/></span>
        <span style={{padding:"10px"}}>대만 TWD</span>
        </Button>
      </td>    
    
    </tr>

    <tr>
      <td>
        <Button onClick={() => {setAlam("CNY")}} outline color="secondary" pill color="primary"> 
        <span><img src={CHY_round} height="30" width="50"/></span>
        <span style={{padding:"10px"}}>중국 CNY</span>
        </Button>
      </td>

      <td>
        <Button onClick={() => {setAlam("SGD")}} outline color="secondary" pill color="primary"> 
        <span><img src={SGD_round} height="30" width="50"/></span>
        <span style={{padding:"10px"}}>싱가폴 SGD</span>
        </Button>
      </td>
      
      <td>
        <Button onClick={() => {setAlam("NZD")}} outline color="secondary" pill color="primary"> 
        <span><img src={NZD_round} width="50"/></span>
        <span style={{padding:"10px"}}>뉴질랜드 NZD</span>
        </Button>
      </td>
      
      <td>
        <Button onClick={() => {setAlam("THB")}} outline color="secondary" pill color="primary"> 
        <span><img src={THB_round}  height="30" width="50"/></span>
        <span style={{padding:"10px"}}>태국 THB</span>
        </Button>
      </td>
      
      <td>
        <Button onClick={() => {setAlam("PHP")}} outline color="secondary" pill color="primary"> 
        <span><img src={PHP_round} width="50"/></span>
        <span style={{padding:"10px"}}>필리핀 PHP</span>
        </Button>
      </td>   
    
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
           
        <Card className="scrol" className="container"><ProMo/></Card>  
             
      </Tab>
           
    </Tabs>
      </Page.Content>
    </SiteWrapper>   
    
    )
}

export default AlarMie;

