// @flow

import * as React from "react";

import { Page, Grid, Form, Nav, StandaloneFormPage } from "tabler-react";

import BankSetting from "./BankSetting"
import ModifyInfo from "./ModifyInfo"
import RemoveUser from "./RemoveUser"

import SiteWrapper from "../SiteWrapper";

function StoreCardsPage({history}) {
  //메뉴 설정
  const [active, setActive] = React.useState({
    modify: true,
    mybank: false,
    remove: false, 
  })

  //화면 보여주기
  const [screen, setScreen] = React.useState({
    modify: true,
    mybank: false,
    remove: false,
  })

  const navClick = (text) => {
    if(text === 'modify'){
      setActive({modify:true, mybank:false, remove:false})
      setScreen({modify:true, mybank:false, remove:false})
    }else if(text === 'mybank'){
      setActive({modify:false, mybank:true, remove:false})
      setScreen({modify:false, mybank:true, remove:false})
    }else if(text === 'remove'){
      setActive({modify:false, mybank:false, remove:true})
      setScreen({modify:false, mybank:false, remove:true})
    }
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
                    if(screen.modify)
                      return <ModifyInfo />
                    else if(screen.mybank)
                      return <BankSetting />
                    else if(screen.remove)
                      return <RemoveUser history={history}/>
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
