import ReactDOM from 'react-dom';
import Api from "../Api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState, useInterval, useRef } from 'react';
import {
  Page,
  Grid,
  Text,
  Table,
  Card,
  Icon,
  Form,
  Button,
} from 'tabler-react';

export default function RealtimeGraph() {
  const [currency, setCurrency] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [delay, setDelay] = React.useState(500000);
  const [time, setTime] = React.useState(null);

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
          boundaryGap: true,
          data: (function (){
              var now = new Date();
              var res = [];
              var len = 400;
              while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                  now = new Date(now - 2000);
              }
              return res;
          })()
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
        name: "매매 기준율",
        colorByPoint: true,
        data: [{

        }],
      },
    ],
  });

  const [data, setData] = React.useState();
  const [axis, setAxis] = React.useState();

  const apiCall = async () => {
    try {
      console.log("실행실행");
      const response = await Api.get(
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
      );
      setCurrency(response.data);
    } catch (e) {
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    setInterval(apiCall, 5000);

    setInterval(() => {
      Api.get("realtimeinfo/").then((res) => {
        
        // 여기까지 baseprice 가져오기
        var bp = []
        for(let i of res.data){
          bp.push(Number(i.basePrice));
        }

        // time 가져오기
        var api_time = []
        for(let i of res.data){
          api_time.push(i.time);
        }

        //bp와 api_time 가장 왼쪽값을 제거하고 가장 오른쪽 값 추가하기
        bp.shift();
        api_time.shift();


        //x축에 실시간 데이터 생성
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        options.xAxis[0].data.shift();
        options.xAxis[0].data.push(axisData);

        setOptions((prev) => ({
          ...prev,
          series: [
            {
              data: bp,
            },
          ],
        }));

        console.log(options)
      });
    }, 5000);
  }, []);

    function handleDelayChange(e) {
      setDelay(Number(e.target.value));
    }
  
    function useInterval(callback, delay) {
      const savedCallback = useRef();
  
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);
  
      useEffect(() => {
        function calling() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(calling, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
    }

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
      {/* <input value={delay} onChange={handleDelayChange} /> */}
      {/* <button onClick={apiCall}>다시 불러오기</button> */}
    </>
  );
} 