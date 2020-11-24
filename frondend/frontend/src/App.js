import Axios from 'axios';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "antd/dist/antd.css";

import HomePage from './HomePage';
import RealtimeExchangeRatePage from './pages/RealtimeExchangeRatePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompareMoney from './pages/CompareMoney';
import Forecasting from './pages/Forecasting';
import UserSetting from './pages/UserSetting';
import AlarMi from './pages/Alarmi';
// import { LoginPage, RegisterPage, } from "./pages";

import 'tabler-react/dist/Tabler.css';

export const LoginContext = React.createContext({ user: '', setUser: '' });

function App() {
  const [user, setUser] = React.useState({
    id: null,
    pw: null,
  });

  return (
    <React.StrictMode>
      <LoginContext.Provider value={{ user: user, setUser: setUser }}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/real-time" component={RealtimeExchangeRatePage} />

            {/* setting page는 로그인 정보 있을 때만 들어올 수 있도록 해야함 */}
            <Route exact path="/setting" component={UserSetting} />
            
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/forecast" component={Forecasting} />
            <Route exact path="/compare" component={CompareMoney} />
            <Route exact path="/alarmie" component={AlarMi} />
          </Switch>
        </Router>
      </LoginContext.Provider>
    </React.StrictMode>
  );
}

export default App;
