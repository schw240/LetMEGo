import Api from "../Api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useRef } from 'react';

export default function RealtimeGraph() {
  const [currency, setCurrency] = React.useState(0);

  const [options, setOptions] = React.useState({
    chart: {
      type: "line",
    },
    title: {
      text: "실시간 환율 그래프",
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
        name: '매매 기준율',
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
      const response = await Api.get(
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
      );

      Api.get("realtimeinfo/").then((res) => {
            var bp = []
            for(let i of res.data){
              bp.push(Number(i.basePrice));
            }
            var api_time = []
            for(let i of res.data){
              api_time.push(i.time);
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

      setCurrency(response.data);
    } catch (e) {
    }
  };

  useEffect(() => {
    apiCall();
  }, []);


  // useEffect(() => {
  //   setInterval(apiCall, 50000);
  // }, []);


  if (!currency) return null;

  return (
    <>
      <ul>
        {currency.map((currency) => (
          <>
            <li key={currency.time}>매매 기준율: {currency.basePrice}</li>
            <li>전일대비: {currency.changePrice}</li>
          </>
        ))}
        <HighchartsReact
          Highcharts={Highcharts}
          options={options}
        />
      </ul>
    </>
  );
} 