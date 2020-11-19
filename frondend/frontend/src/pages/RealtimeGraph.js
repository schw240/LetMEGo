import * as React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
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

  const apiCall = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await Axios.get(
        'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD',
      );
      setCurrency(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    apiCall();
  }, []);

  useInterval(() => {
    apiCall();
  }, delay);

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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
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
      </ul>
      {/* <input value={delay} onChange={handleDelayChange} /> */}
      <button onClick={apiCall}>다시 불러오기</button>
    </>
  );
}
