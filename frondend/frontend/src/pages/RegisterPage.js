// @flow

import * as React from "react";
import SiteWrapper from "../SiteWrapper";
import { Card, Form, Page, StandaloneFormPage, Button, } from "tabler-react";


// 회원가입 화면
function RegisterPage({history}) {
  const [userId, setUserId] = React.useState()
  const [userPw, setUserPw] = React.useState()
  const [userPwConfirm, setUserPwConfirm] = React.useState()
  const [userEmail, setUserEmail] = React.useState()
  const [userCheck, setUserCheck] = React.useState(false)

  const onSubmit = () => { //회원가입 정보 디비에 넣기
    var emailform = '/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i'
    console.log('회원가입 버튼 클릭!')
    console.log(userId)
    console.log(userCheck)

    if(userPw === userPwConfirm){
      console.log('비밀번호가 같습니다')
    }else{
      console.log('비밀번호를 확인하여주세요')
    }

    console.log(userEmail.match(emailform))
    // if(userEmail.match(emailform) != null){
    //   console.log('이메일 형식이 올바릅니다')
    // }else{
    //   console.log('이메일 형식이 올바르지 않습니다.')
    // }

    //회원가입 정보를 정확하게 다 입력했을 때
    // history.push('/login') //로그인으로 넘어가게 함
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
              <Card.Title RootComponent="div">Let me Join!</Card.Title>

              <Form.Group>
                <Form.Input icon="user" placeholder="id" name="id" onChange={(e)=>setUserId(e.target.value)}/>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="lock" placeholder="password" name="password" type="password" onChange={(e)=>setUserPw(e.target.value)}/>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="check-circle" placeholder="passwordConfirm" name="passwordConfirm" type="password" onChange={(e)=>setUserPwConfirm(e.target.value)}/>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="at-sign" placeholder="e-mail" name="e-mail" onChange={(e)=>setUserEmail(e.target.value)}/>
              </Form.Group>
              <Form.Checkbox label="이메일 수신 동의" name="email" onChange={(e)=>setUserCheck(true)}/>

              <Form.Footer>
                <Button type="button" color="primary" onClick={onSubmit} block={true}>회원가입</Button>
              </Form.Footer>
            </Card.Body>
          </Form>
        </StandaloneFormPage>
      </Page.Content>
    </SiteWrapper>
  );
  // return <TablerRegisterPage />;
}

export default RegisterPage;
