import Axios from 'axios';
import React, { Component, useEffect } from 'react';
import "tabler-react/dist/Tabler.css";
import 'antd/dist/antd.css';

import Header from './Layout/Header';

function App() {

  const [banks, setBanks] = React.useState([]);

  useEffect(()=>{
    Axios.get("http://127.0.0.1:8000/api/bankinfo/").then((data)=>{
    setBanks(data.data);
    console.log(data.data);
  })

  },[])
  
  return (
    <div className="App">
      {
        // banks.map((data)=>{
        //   return <div>{data.bank_name}</div>
        // })
        <Header></Header>
      }
    </div>
  );
}

export default App;
