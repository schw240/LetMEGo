import Axios from 'axios';
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import RealtimeExchangeRatePage from "./pages/RealtimeExchangeRatePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import { LoginPage, RegisterPage, } from "./pages";

import "tabler-react/dist/Tabler.css";

export const LoginContext = React.createContext({user:'', setUser:''});


function App() {

  const [user, setUser] = React.useState({
    id : null,
    pw : null,
  })


  return (
    <React.StrictMode>
      <LoginContext.Provider value={{user:user, setUser:setUser}}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/real-time" component={RealtimeExchangeRatePage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </Router>
      </LoginContext.Provider>
    </React.StrictMode>
  );
}

export default App;
