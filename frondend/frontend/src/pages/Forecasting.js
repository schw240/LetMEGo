import { Form, Page, Grid, Card } from "tabler-react";
import SiteWrapper from "../SiteWrapper";
import Api from "../Api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from 'react';
import { LoginContext } from "../App";
import Account from '../Account'

export default function Forecasting({history}) {
  const country_list = [
    { value: "usd", label: "미국" },
    { value: "yen", label: "일본" },
    { value: "euro", label: "유럽" }]
  const [selectCountry, setSelectCountry] = React.useState("usd");
  const [xglstValue, setXGLstValue] = React.useState(99999);
  const [xglstdate, setXGLstDate] = React.useState();
  const [lstmlstValue, setLSTMLstValue] = React.useState(99999);
  const [lstmlstdate, setLSTMLstDate] = React.useState();
  const token = window.localStorage.getItem("token");
  const {user, setUser} = React.useContext(LoginContext)
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
        // name: 'USD환율',
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
        // name: 'USDKRW',
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

  const selectOption = (e) => {
    console.log(e.target.value);
    setSelectCountry(e.target.value);
  }
 

  React.useEffect(()=> {

    Api.get("xgboost_" + selectCountry, {
      headers: {
        Authorization: "JWT " + token
      }
    }).then((res) => {

              
      var api_time = []
      for(let i of res.data){
        api_time.push(i.date);
      }
      api_time.sort()
      var bp = []

      var check = 9999
      var check_date = '';

      for(let i of res.data){
        bp.push(Number(i.close));
        if (parseFloat(i.close) < check) {
            check = parseFloat(i.close)
            check_date = i.date
        }
      }

      setXGLstValue(prev=>check)
      setXGLstDate(prev=>check_date)

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
  
  
    Api.get("lstm_"+selectCountry, {
      headers: {
        Authorization: "JWT " + token
      }
    }).then((res) => {

    var api_time = []
    for(let i of res.data){
      api_time.push(i.date);
    }
    api_time.sort()
    var bp = []

    var check = 9999
    var check_date = '';

    for(let i of res.data){
      bp.push(Number(i.close));
      if (parseFloat(i.close) < check) {
        check = parseFloat(i.close)
        check_date = i.date
    }
    }

    setLSTMLstValue(prev=>check)
    setLSTMLstDate(prev=>check_date)

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
  },[selectCountry])


  useEffect(()=>{

    const token = window.localStorage.getItem("token")

    if (token===null){
      alert("로그인이 필요합니다.")
      history.push("/login")
    }

  },[]);


  return (
    <>
      <SiteWrapper>
        <Page.Content>
          <LoginContext.Provider value={{ user: user, setUser: setUser }}>
            <div style={{ marginLeft: "12px" }}>
              <Grid.Row>
                <Form.Group label="나라">
                  <Form.Select xl={4} onChange={selectOption} value={selectCountry}>
                    {
                        country_list.map((v) => 
                        <option value={v.value}>{v.label}</option>
                    )}
                  </Form.Select>
                </Form.Group>
                <Grid.Col>
                  <Card>
                    <Card.Body>
                      <div>XGBoost 알고리즘에 따라 {xglstdate}에 {xglstValue.toFixed(2)}가격으로 가장 저렴하게 환전할 수 있습니다.</div>
                      <div>LSTM 알고리즘에 따라 {lstmlstdate}에 {lstmlstValue.toFixed(2)}가격으로 가장 저렴하게 환전할 수 있습니다.</div>
                    </Card.Body>
                  </Card>
                </Grid.Col>
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
          </LoginContext.Provider>
        </Page.Content>
      </SiteWrapper>
    </>
  );
}
