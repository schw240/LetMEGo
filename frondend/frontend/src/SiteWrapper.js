import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Site, Grid, Button, RouterContextProvider } from 'tabler-react';
import { LoginContext } from './App';

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};

const navBarItems: Array<navItem> = [
  {
    //메뉴바
    value: '메인',
    to: '/',
    icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: '실시간 환율',
    icon: 'clock',
    to: '/real-time',
    LinkComponent: withRouter(NavLink),
  },
  {
    value: '환전 비교',
    icon: 'percent',
    to: '/compare',
    LinkComponent: withRouter(NavLink),
  },
  {
    value: '환율 예측',
    icon: 'trending-up',
    to: '/forecast',
    LinkComponent: withRouter(NavLink),
  },
  {
    value: '알리미',
    to: '/',
    icon: 'check-square',
    LinkComponent: withRouter(NavLink),
  },
];

const loginAccountDropdownProps = { // 유저정보 나와있는 곳
  avatarURL: "./demo/faces/userLogin.png", //로그인 했을 때
  options: [
    { icon: "settings", value: "설정", to: "/setting", LinkComponent: withRouter(NavLink), },
    { isDivider: true },
    { icon: "log-out", value: "로그아웃", to: "/", LinkComponent: withRouter(NavLink), },
  ],
};

const logoutAccountDropdownProps = { // 유저정보 나와있는 곳
  avatarURL: "./demo/faces/userLogout.png", //로그인 안했을 때
  options: [
    { icon: "log-in", value: "로그인", to: "/login", LinkComponent: withRouter(NavLink), },
    { icon: "user-plus", value: "회원가입", to: "/register", LinkComponent: withRouter(NavLink), },
  ],
};

function SiteWrapper(props) {
  const [isLogin, setIsLogin] = React.useState(logoutAccountDropdownProps);
  const { user, setUser } = React.useContext(LoginContext);

  React.useEffect(() => {
    //여기는 토큰 정보에 따라 바뀔 수 있도록 수정해야 함
    if (user.id == null || user.pw == null) {
      //지금은 새로고침하면 정보가 날라가기 때문에 어떻게 바뀌는지만 보기~
      setIsLogin(logoutAccountDropdownProps);
    } else {
      setIsLogin(loginAccountDropdownProps);
    }
  }, []); //아마 []에는 token이 들어가겠지...

  return (
    <Site.Wrapper
      headerProps={{
        href: '/',
        alt: 'Let ME Go!',
        imageURL: './demo/brand/LetMEGo_logo.png', //여기가 메인 로고

        accountDropdown: isLogin,
      }}
      navProps={{ itemsObjects: navBarItems }}
      routerContextComponentType={withRouter(RouterContextProvider)}
      footerProps={{
        //푸터
        copyright: (
          <React.Fragment>
            Copyright © 2020 Let ME Go! [h3] Kim-Hanju & Park-Haram & Oh-Hojeong
          </React.Fragment>
        ),
        nav: (
          <React.Fragment>
            <Grid.Col auto={true}>
              <Button
                href="https://github.com/TeamProject-LetMEGo/LetMEGo"
                size="sm"
                outline
                color="primary"
                RootComponent="a"
              >
                h3 Let ME Go!
              </Button>
            </Grid.Col>
          </React.Fragment>
        ),
      }}
    >
      {props.children}
    </Site.Wrapper>
  );
}

export default SiteWrapper;
