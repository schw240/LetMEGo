import * as React from "react";
import SiteWrapper from "../SiteWrapper";
import { LoginContext } from "../App";
import { Card, Button, StandaloneFormPage, Form, Page, } from "tabler-react";
import Account from '../Account'

function LoginPage({history}){
  const {user, setUser} = React.useContext(LoginContext)
  const token = window.localStorage.getItem("token");

  React.useEffect(() => {
    //로그아웃
    if (token != null) {
      window.localStorage.removeItem("token")
    }
  }, []);
  
  const onSubmit = () => { //로그인 토큰작업은 여기서!?
    Account.post("login", {
      "username" : user.id,
      "password" : user.pw,
    })
    .then(response=>{
      const {data} = response
      window.localStorage.setItem("token", data.token)
      history.push('/')
    })
    .catch(error=>{
      alert('아이디, 패스워드를 확인해주세요');
      console.error(error)
    })   
  }

  return (
    <SiteWrapper>
      <Page.Content>
        <br/>
        <br/>
        <br/>
        <StandaloneFormPage imageURL={"./demo/brand/LetMEGo_logo.png"}>
          <Form className="card">
            <Card.Body className="p-6">
              <Card.Title RootComponent="div">Let me Login!</Card.Title>

              <Form.Group>
                <Form.Input icon="user" placeholder="id" name="id" onChange={(e)=>setUser({...user, id:e.target.value})}/>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="lock" placeholder="password" name="password" type="password" onChange={(e)=>setUser({...user, pw:e.target.value})}/>
              </Form.Group>

              <Form.Footer>
                <Button type="button" color="primary" onClick={onSubmit} block={true}>로그인</Button>
                {/* 이 부분은 시간날 때 추가... */}
                {/* <br/>
                <div><a href='/'>아이디 찾기</a></div>
                <div><a href='/forgot-password'>비밀번호 찾기</a></div> */}
              </Form.Footer>
            </Card.Body>
          </Form>
        </StandaloneFormPage>
      </Page.Content>
    </SiteWrapper>
    
  );
}

export default LoginPage;
