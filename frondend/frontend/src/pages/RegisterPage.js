import * as React from "react";
import SiteWrapper from "../SiteWrapper";
import { Card, Form, Page, StandaloneFormPage, Button, } from "tabler-react";
import API from '../Api'
import Account from '../Account'
import './Pagestyle.css'


// 회원가입 화면
function RegisterPage({history}) {
  // 입력한 유저 정보
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    email: '',
    user_emailcheck: false,
  })

  const [idState, setIdState] = React.useState(false)
  const [pwState, setPwState] = React.useState('')
  const [emailState, setEmailState] = React.useState('')
  const [pageState, setPageState] = React.useState(true)
  const [bankGroup, setBankGroup] = React.useState([])

  //선택한 은행 값
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
    setBankSelect({...bankSelect, [e.target.name]:!bankSelect[e.target.name]})
  }

  React.useEffect(()=> {
    API.get("bankinfo/")
    .then(response=>{
      const {data} = response
      setBankGroup(data)
    })
    .catch(error=>{
        console.error(error)
    })
  },[])

  const idCheck = () => {
    console.log(user.username.length)
    if(user.username.length < 6){
      alert('아이디는 6글자 이상이여야 합니다.')
    }else{
      Account.get("user/?username="+user.username)
      .then(response=>{
        const {data} = response
        if(data.length){
          alert('이미 등록된 아이디입니다.')
          setIdState(false)
          setUser({...user, username:''})
        }else{
          alert('사용 가능한 아이디입니다.')
          setIdState(true)
        }
      })
      .catch(error=>{
        console.error(error)
      })
    }
    
  }

  const passConfirm = (e) => {
    if(user.password === e.target.value){
      setPwState('state-valid')
    }else{
      setPwState('state-invalid')
    }
  }

  const emailMatch = (e) => {
    if(e.target.value.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i) != null){
      setEmailState('state-valid')
      setUser({...user, email:e.target.value})
    }else{
      setEmailState('state-invalid')
    }
  }

  const userSave = () => { //회원가입 정보 디비에 넣기
    Account.post("register", [
      user,
      bankSelect
    ])
    .then(response=>{
      const {data} = response
      if(data['result']){
        history.push('/login')
      }
    })
    .catch(error=>{
      console.log('회원가입 중 오류가 발생하였습니다.')
      console.error(error)
    })
  }

  const movePage = () => {
    console.log(user.password.length)
    if(!idState){
      alert('아이디 중복체크를 확인해야 합니다.')
    }else if(user.password.length < 4){
      alert('비밀번호는 4글자 이상이여야 합니다.')
    }else if(pwState === 'state-invalid'){
      alert('비밀번호 확인을 잘못 입력하셨습니다.')
    }else if(emailState === 'state-invalid'){
      alert('이메일을 확인하여 주세요.')
    }else{
      setPageState(false)
    }
  }

  const prevPage = () => {
    setPageState(true)
    setIdState(false)
    setPwState('state-invalid')
    setEmailState('state-invalid')
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
                                <Form.Input icon="user" placeholder="id" name="id" value={user.username} onChange={(e)=>setUser({...user, username:e.target.value})} />
                              </Form.InputGroup>
                            </Form.Group>
                            <Form.Group>
                              <Form.Input icon="lock" placeholder="password" name="password" type="password" onChange={(e)=>setUser({...user, password:e.target.value})}/>
                            </Form.Group>
                            <Form.Group>
                              <Form.Input icon="check-circle" placeholder="passwordConfirm" name="passwordConfirm" type="password" className={pwState} onChange={passConfirm}/>
                            </Form.Group>
                            <Form.Group>
                              <Form.Input icon="at-sign" placeholder="e-mail" name="e-mail" className={emailState}  onChange={emailMatch}/>
                            </Form.Group>
                            <Form.Checkbox label="이메일 수신 동의" name="email" checked={user.user_emailcheck} onChange={(e)=>setUser({...user, user_emailcheck:!user.user_emailcheck})}/>
              
                            <Form.Footer>
                              <Button.List align="center">
                                <Button type="button" color="gray"  onClick={pushHome}>메인으로</Button>
                                <Button type="button" color="primary" onClick={movePage}>은행선택</Button>
                              </Button.List>
                            </Form.Footer>
                          </Card.Body>
                else
                return <Card.Body className="p-6 bankstyle">
                          <Card.Title RootComponent="div">Let me Bank Setting!</Card.Title>
                          {/* map함수 써서 반복문 돌게~~ */}
                          <Form.Group>
                          {bankGroup.map((v) =>
                            <Form.Checkbox 
                              isInline 
                              label={<img src={"./demo/bank_logo/"+v.bank_logo+".png"} 
                              alt={"bank_"+v.bank_logo} />}
                              checked={bankSelect["'"+v.bank_logo+"'"]}
                              name={v.bank_logo}
                              onChange={bankClick}
                            />
                          )}
                          </Form.Group>

                          <Form.Footer>
                              <Button.List align="center">
                                  <Button type="button" color="gray" onClick={prevPage}>이전으로</Button>
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
