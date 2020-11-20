// @flow

import * as React from "react";

import { Page, Grid, Form, Card, Nav, Button, StandaloneFormPage } from "tabler-react";

import BankSetting from "./BankSetting"
import ModifyInfo from "./ModifyInfo"
import RemoveUser from "./RemoveUser"

import SiteWrapper from "../SiteWrapper";

function StoreCardsPage() {
  const [userPw, setUserPw] = React.useState()
  //비밀번호 통과 여부
  const [screenTF, setScreenTF] = React.useState(false)

  //메뉴 설정
  const [active, setActive] = React.useState({
    modify: true,
    mybank: false,
    remove: false, 
  })

  //화면 보여주기
  const [screen, setScreen] = React.useState({
    secret: true,
    modify: false,
    mybank: false,
    remove: false,
  })

  

  const navClick = (text) => {
    //메뉴 이동하면 screen.secret, setScreenTF(false)로 바꿔줌
    setScreenTF(false)
    setScreen({secret: true, modify: false, mybank: false, remove: false,})
    //setActive()도 선택에 따라 바뀌게 해야 함
    if(text === 'modify'){
      setActive({modify:true, mybank:false, remove:false})
    }else if(text === 'mybank'){
      setActive({modify:false, mybank:true, remove:false})
    }else if(text === 'remove'){
      setActive({modify:false, mybank:false, remove:true})
    }
  }
  
  const onSubmit = () => { 
    //로그인 정보랑 비밀번호 맞는지 확인하고 값 리턴 setScreenTF(true, false)
    // console.log(userPw)
    //테스트
    setScreenTF(true)
    if(active.modify){
      setScreen({secret: false, modify: true, mybank: false, remove: false,})
    }else if(active.mybank){
      setScreen({secret: false, modify: false, mybank: true, remove: false,})
    }else if(active.remove){
      setScreen({secret: false, modify: false, mybank: false, remove: true,})
    }
    //비밀번호랑 active 값 가져와서 화면 보여주기!!
  }
  
  return (
    <SiteWrapper>
      <Page.Content>
        <Grid.Row>
          <Grid.Col lg={2}>
          <Form.Group>
            <Nav>
              <Nav.Item value="내 정보 수정" icon= "scissors" active= {active.modify} onClick={()=>{navClick('modify')}}/>
              <Nav.Item value="내 은행 설정" icon= "dollar-sign" active= {active.mybank} onClick={()=>{navClick('mybank')}} />
              <Nav.Item value="회원 탈퇴" icon= "trash-2" active= {active.remove} onClick={()=>{navClick('remove')}} />
            </Nav>
            
          </Form.Group>
          </Grid.Col>
          <Grid.Col lg={10}>
            <StandaloneFormPage imageURL={"./demo/brand/LetMEGo_logo.png"}>
              <Form className="card">
          
                {
                  (() => {
                    //함수
                    if(screen.secret)
                      return <Card.Body className="p-6">
                                <p className="text-muted">비밀번호 확인</p>
                                <Form.Group>
                                  <Form.Input icon="lock" placeholder="password" name="password" type="password" onChange={(e)=>setUserPw(e.target.value)}/>
                                </Form.Group>                
                                <Form.Footer>
                                  <Button type="button" color="primary" onClick={onSubmit} block={true}>확인</Button>
                                </Form.Footer>
                              </Card.Body>
                    else if(screenTF && screen.modify)
                      return <ModifyInfo />
                    else if(screenTF && screen.mybank)
                      return <BankSetting />
                    else if(screenTF && screen.remove)
                      return <RemoveUser />
                  })()
                }

                </Form>
              </StandaloneFormPage>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default StoreCardsPage;
