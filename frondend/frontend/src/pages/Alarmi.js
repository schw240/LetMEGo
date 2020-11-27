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
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
    <td>aaaa</td>
  </table>
  <table>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
  </table>
  <table>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
  </table>
  <table>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
  </table>
  <table>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
    <td>bbbbb</td>
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

