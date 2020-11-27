import { Form, Page, Grid, Card } from "tabler-react";
import SiteWrapper from "../SiteWrapper";
import Api from "../Api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from 'react';

export default function Forecasting() {
  const [options, setOptions] = React.useState({
    chart: {
      type: "line",
    },
    title: {
      text: "XGBoost",
    },
    xAxis: 
      {
          type: 'category',
          categories: []
      },
    yAxis: {
      title: {
        text: "원/달러",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointPadding: 0.4,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
    },
    series: [
      {
        name: 'USDKRW',
        type: 'line',
        lineStyle:{
          color:'#2A265C' //line차트 색상 변경
        },
        smooth: true, //부드러운 line 표현
        yAxisIndex: 0, //yAxis 1번째 사용
        data: 
        {
        } 
      },
    ],
  });

  const [options2, setOptions2] = React.useState({
    chart: {
      type: "line",
    },
    title: {
      text: "LSTM",
    },
    xAxis: 
      {
          type: 'category',
          categories: []
      },
    yAxis: {
      title: {
        text: "원/달러",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointPadding: 0.4,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
    },
    series: [
      {
        name: 'USDKRW',
        type: 'line',
        lineStyle:{
          color:'#2A265C' //line차트 색상 변경
        },
        smooth: true, //부드러운 line 표현
        yAxisIndex: 0, //yAxis 1번째 사용
        data: 
        {
        } 
      },
    ],
  });

  const apiCall = async () => {
    try {
      
      Api.get("xgboostinfo/").then((res) => {
            
            var api_time = []
            for(let i of res.data){
              api_time.push(i.date);
            }
            api_time.sort()
            var bp = []
            for(let i of res.data){
              
              bp.push(Number(i.dollar_close));
            }
    
            setOptions((prev) => ({
              ...prev,
              xAxis: 
                {
                  categories: api_time
                },
              series: [
                {
                  data: (bp),
                },
              ],
            }));
    
          });

      Api.get("lstminfo/").then((res) => {
        
        var api_time = []
        for(let i of res.data){
          api_time.push(i.date);
        }
        api_time.sort()
        var bp = []
        for(let i of res.data){
          
          bp.push(Number(i.dollar_close));
        }

        setOptions2((prev) => ({
          ...prev,
          xAxis: 
            {
              categories: api_time
            },
          series: [
            {
              data: (bp),
            },
          ],
        }));

      });

    } catch (e) {
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <>
      <SiteWrapper>
        <Page.Content>
          <div style={{ marginLeft: "12px" }}>
            <Grid.Row>
              <Form.Group label="나라">
                <Form.Select>
                  <option>미국</option>
                  <option>중국</option>
                  <option>일본</option>
                  <option>유럽</option>
                </Form.Select>
              </Form.Group>
            </Grid.Row>
          </div>

          <Grid.Row>
            <Grid.Col>
              <Card title="미래 환율 예측 그래프(XGBoost)" statusColor="blue">
                <Card.Body>
                  <HighchartsReact
                    Highcharts={Highcharts}
                    options={options}
                  />
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col>
              <Card title="미래 환율 예측 그래프(LSTM)" statusColor="blue">
                <Card.Body>
                  <HighchartsReact
                    Highcharts={Highcharts}
                    options={options2}
                  />
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </SiteWrapper>
    </>
  );
}
