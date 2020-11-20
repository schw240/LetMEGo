import * as React from "react";
import SiteWrapper from "../SiteWrapper";
import { Card, Form, Page, StandaloneFormPage, Button, } from "tabler-react";
import './Pagestyle.css'


// 회원가입 화면
function RegisterPage({history}) {
  const [id, setId] = React.useState()
  const [pw, setPw] = React.useState()
  const [pwConfirm, setPwConfirm] = React.useState()
  const [pwState, setPwState] = React.useState('')
  const [email, setEmail] = React.useState()
  const [emailState, setEmailState] = React.useState('')

  const [emailCheck, setEmailCheck] = React.useState(false)

  const [pageState, setPageState] = React.useState(true)

  //선택한 은행 값
  const [bank, setBank] = React.useState({
      hana: false,
      woori: false,
      kookmin: false,
      shinhan: false,
      nonghyup: false,
      gieob: false,
      standard: false,
      citi: false,
      suhyup: false,
      busan: false,
      daegu: false,
      jeonbug: false,
      gyeongnam: false,
      jeju: false,
  })

  //변경시에는 기존 선택 정보 가져와서 저장해줘야함
  const [bankSelect, setBankSelect] = React.useState({
      hana: false,
      woori: false,
      kookmin: false,
      shinhan: false,
      nonghyup: false,
      gieob: false,
      standard: false,
      citi: false,
      suhyup: false,
      busan: false,
      daegu: false,
      jeonbug: false,
      gyeongnam: false,
      jeju: false,
  })

  const bankClick = (e) => {
      if(e.target.name === 'woori'){
      setBank({woori:!bank.woori})
      setBankSelect({woori:!bankSelect.woori})
      }else if(e.target.name === 'hana'){
      setBank({hana:!bank.hana})
      setBankSelect({hana:!bankSelect.hana})
      }else if(e.target.name === 'kookmin'){
      setBank({kookmin:!bank.kookmin})
      setBankSelect({kookmin:!bankSelect.kookmin})
      }else if(e.target.name === 'shinhan'){
      setBank({shinhan:!bank.shinhan})
      setBankSelect({shinhan:!bankSelect.shinhan})
      }else if(e.target.name === 'nonghyup'){
      setBank({nonghyup:!bank.nonghyup})
      setBankSelect({nonghyup:!bankSelect.nonghyup})
      }else if(e.target.name === 'gieob'){
      setBank({gieob:!bank.gieob})
      setBankSelect({gieob:!bankSelect.gieob})
      }else if(e.target.name === 'standard'){
      setBank({standard:!bank.standard})
      setBankSelect({standard:!bankSelect.standard})
      }else if(e.target.name === 'citi'){
      setBank({citi:!bank.citi})
      setBankSelect({citi:!bankSelect.citi})
      }else if(e.target.name === 'suhyup'){
      setBank({suhyup:!bank.suhyup})
      setBankSelect({suhyup:!bankSelect.suhyup})
      }else if(e.target.name === 'busan'){
      setBank({busan:!bank.busan})
      setBankSelect({busan:!bankSelect.busan})
      }else if(e.target.name === 'daegu'){
      setBank({daegu:!bank.daegu})
      setBankSelect({daegu:!bankSelect.daegu})
      }else if(e.target.name === 'jeonbug'){
      setBank({jeonbug:!bank.jeonbug})
      setBankSelect({jeonbug:!bankSelect.jeonbug})
      }else if(e.target.name === 'gyeongnam'){
      setBank({gyeongnam:!bank.gyeongnam})
      setBankSelect({gyeongnam:!bankSelect.gyeongnam})
      }else if(e.target.name === 'jeju'){
      setBank({jeju:!bank.jeju})
      setBankSelect({jeju:!bankSelect.jeju})
      }
  }

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

  const userSave = () => { //회원가입 정보 디비에 넣기

    //회원가입 정보를 정확하게 다 입력했을 때 디비에 넣고
    // history.push('/login') //로그인으로 넘어가게 함
  }

  const pushHome = () => {
    history.push('/')
  }


  return (
    <SiteWrapper>
      <Page.Content>
        <br/>
        <br/>
        <StandaloneFormPage imageURL={"./demo/brand/LetMEGo_logo.png"}>
          <Form className="card">
            {
              (() => {
                //함수
                if(pageState)
                  return <Card.Body className="p-6">
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
                              <Button.List align="center">
                                <Button type="button" color="gray"  onClick={pushHome}>메인으로</Button>
                                <Button type="button" color="primary" onClick={()=>{setPageState(false)}}>은행선택</Button>
                              </Button.List>
                            </Form.Footer>
                          </Card.Body>
                else
                return <Card.Body className="p-6 bankstyle">
                          <Card.Title RootComponent="div">Let me Bank Setting!</Card.Title>
                          <Form.Group>
                          <Form.Input icon="user" placeholder="id" name="id" value="userid"/>
                          <br/>
                          {/* map함수 써서 반복문 돌게~~ */}
                          <Form.Group>
                            <Form.Checkbox isInline label={<img src="./demo/bank_logo/woori.png" alt="bank_woori" />} checked={bankSelect.woori} name="woori" onChange={bankClick}/>
                            <Form.Checkbox isInline label={<img src="./demo/bank_logo/shinhan.png" alt="bank_shinhan" />} checked={bankSelect.shinhan} name="shinhan" onChange={bankClick}/>
                          </Form.Group>
                          </Form.Group>

                          <Form.Footer>
                              <Button.List align="center">
                                  <Button type="button" color="gray" onClick={()=>{setPageState(true)}}>이전으로</Button>
                                  <Button type="button" color="primary" onClick={userSave}>회원가입</Button>
                              </Button.List>
                          </Form.Footer>
                      </Card.Body>
                })()
              }
          </Form>
        </StandaloneFormPage>
      </Page.Content>
    </SiteWrapper>
  );
  // return <TablerRegisterPage />;
}

export default RegisterPage;
