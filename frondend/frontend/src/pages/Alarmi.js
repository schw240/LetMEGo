import * as React from 'react';
import SiteWrapper from '../SiteWrapper';
import { Form, Page, Grid, Card, colors, Tab, Tabs } from "tabler-react";



function AlarMie() {
  return (

    <Tabs initialTab="Hello">
  <Tab title="야호1">뭐 넣어용?</Tab>
  <Tab title="야호2">여기는용?</Tab>
    <Grid.Row cards deck>
      <Grid.Col md={4}>
        <Card body="집에가고싶당" />
      </Grid.Col>
      <Grid.Col md={4}>
        <Card
          body="Extra long content of card. Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
      </Grid.Col>
      <Grid.Col md={4}>
        <Card body="왜 여기있지!?" />
      </Grid.Col>
    </Grid.Row>
</Tabs>
    
    )
}

export default AlarMie;

