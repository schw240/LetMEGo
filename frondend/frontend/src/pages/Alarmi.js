import React, { useState, useEffect } from 'react';
import Api from '../Api';
import SiteWrapper from '../SiteWrapper';
import { Form, Page, Grid, Card, colors, Tab, Tabs } from "tabler-react";  

function MoreNews() {

  const style = {

    fontSize: '11px',

  }

  const [news, setNews] = React.useState([]);

  useEffect(() => {
    Api.get("navernews/").then((res) => {
      
      const data = []

      for(let i = 0; i < 14; i++) {
        data.push((res.data[i]))
      }

      setNews(data)
      console.log(data)
     })
  },[])

  return <> {
    news.map((value) => {
      return <div style={style}><a target = "_blank" href = {value.link}> [{value.company}] {value.title} {value.content} </a></div>
    })
  }  
  </>



}

function AlarMie() {
  
  return (
    <SiteWrapper>
       <Page.Content>

        <Tabs initialTab="Hello">
      <Tab title="News Detail">
        <Card className="container"><MoreNews/></Card>
      

      </Tab>

      <Tab title="ME Promotion">
        <Card className="container">환율우대사항!?</Card>
      
      
      </Tab>
      
    </Tabs>
    </Page.Content>
    </SiteWrapper>   
    
    )
}

export default AlarMie;

