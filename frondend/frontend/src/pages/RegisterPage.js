// @flow

import * as React from "react";
import SiteWrapper from "../SiteWrapper";
import { Card, Form, Page, StandaloneFormPage, Button, } from "tabler-react";


// 회원가입 화면
function RegisterPage({history}) {
  const [id, setId] = React.useState()
  const [pw, setPw] = React.useState()
  const [pwConfirm, setPwConfirm] = React.useState()
  const [pwState, setPwState] = React.useState('')
  const [email, setEmail] = React.useState()
  const [emailState, setEmailState] = React.useState('')

  const [emailCheck, setEmailCheck] = React.useState(false)

  const idCheck = () => {
    // 디비에 값 있는지 조회
    alert('이미 등록된 아이디입니다')
    setId('')
  }

  const passConfirm = (e) => {
    if(pw === e.target.value){
      setPwState('state-valid')
      setPwConfirm(e.target.value)
    }else{
      setPwState('state-invalid')
    }
  }

  const emailMatch = (e) => {
    if(e.target.value.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i) != null){
      setEmailState('state-valid')
      setEmail(e.target.value)
    }else{
      setEmailState('state-invalid')
    }
  }

  const onSubmit = () => { //회원가입 정보 디비에 넣기

    //회원가입 정보를 정확하게 다 입력했을 때 디비에 넣고
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
                <Form.InputGroup append={<Button type="button" color="primary" onClick={idCheck}>중복체크</Button>}>
                  <Form.Input icon="user" placeholder="id" name="id" value={id} onChange={(e)=>setId(e.target.value)} />
                </Form.InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="lock" placeholder="password" name="password" type="password" onChange={(e)=>setPw(e.target.value)}/>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="check-circle" placeholder="passwordConfirm" name="passwordConfirm" type="password" className={pwState} onChange={passConfirm}/>
              </Form.Group>
              <Form.Group>
                <Form.Input icon="at-sign" placeholder="e-mail" name="e-mail" className={emailState}  onChange={emailMatch}/>
              </Form.Group>
              <Form.Checkbox label="이메일 수신 동의" name="email" checked={emailCheck} onChange={(e)=>setEmailCheck(!emailCheck)}/>

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
