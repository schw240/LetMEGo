import Axios from 'axios';
import React, { Component, useEffect } from 'react';

function App() {

  const [banks, setBanks] = React.useState([]);

  useEffect(()=>{
    Axios.get("http://127.0.0.1:8000/api/").then((data)=>{
    setBanks(data.data);
    console.log(data.data);
  })

  },[])
  
  return (
    <div className="App">
      {
        banks.map((data)=>{
          return <div>{data.bank_name}</div>
        })
      }
    </div>
  );
}

export default App;
