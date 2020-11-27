import * as React from "react";
import { Form, Card, Button } from "tabler-react";
import Account from '../Account'
import jwt from 'jwt-decode';

function ModifyInfo() {
    const token = window.localStorage.getItem("token");
    //내 정보 수정 값(비밀번호 제외 기존 값 불러와서 화면에 보여줘야함)
    const [id, setId] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [passCf, setPassCf] = React.useState('')
    const [pwState, setPwState] = React.useState('')
    const [emailState, setEmailState] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [emailCheck, setEmailCheck] = React.useState()

    const [changeinfo, setChangeinfo] = React.useState({
        password: '', //바꿀 비밀번호
        email: '', //이메일
        user_emailcheck: false, //이메일 수신 여부
    })

    const passConfirm = (e) => {
        setPassCf(e.target.value)
        if(pass === e.target.value){
            setChangeinfo({...changeinfo, password: pass})
            setPwState('state-valid')
        }else{
            setPwState('state-invalid')
        }
    }
    
    const emailMatch = (e) => {
        setEmail(e.target.value)
        if(e.target.value.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i) != null){
            setEmailState('state-valid')
            setChangeinfo({...changeinfo, email: e.target.value})
        }else{
            setEmailState('state-invalid')
        }
    }

    const emailChecked = (e) => {
        setEmailCheck(!emailCheck)
        setChangeinfo({...changeinfo, user_emailcheck: !emailCheck})
    }

    const modifySubmit = () => {
        if(changeinfo.password.length < 4){
            alert('비밀번호는 4글자 이상이여야 합니다.')
        }else if(pwState === 'state-invalid'){
            alert('비밀번호 확인을 잘못 입력하셨습니다.')
        }else if(emailState === 'state-invalid'){
            alert('이메일을 확인하여 주세요.')
        }
        Account.post("update", changeinfo, {
            headers: {
                Authorization: "JWT " + token
            }
        })
        .then(response=>{
            const {data} = response
            if(data['result']){
              setPass('')
              setPassCf('')
              setPwState('')
              setEmailState('')
            }
        })
        .catch(error=>{
            console.error(error)
        })
    }

    React.useEffect(()=> {
        Account.get("onlyuserinfo", {
            headers: {
                Authorization: "JWT " + token
            }
        })
        .then(response=>{
          const {data} = response
          setId(data.username)
          setEmail(data.email)
          setEmailCheck(data.user_emailcheck)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])
    

  return (
    <Card.Body className="p-6">
        <Card.Title RootComponent="div">내 정보 수정</Card.Title>
        <Form.Group>
            <Form.Input readOnly icon="user" name="id" value={id}/>
        </Form.Group>
        <Form.Group>
            <Form.Input icon="lock" placeholder="changePassword" name="password" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
        </Form.Group>
        <Form.Group>
            <Form.Input icon="check-circle" placeholder="passwordConfirm" name="passwordConfirm" type="password" value={passCf} className={pwState} onChange={passConfirm}/>
        </Form.Group>
        <Form.Group>
            <Form.Input icon="at-sign" placeholder="e-mail" name="e-mail" value={email} className={emailState} onChange={emailMatch}/>
        </Form.Group>
        <Form.Checkbox label="이메일 수신 동의" name="email" checked={emailCheck} onChange={emailChecked}/>

        <Form.Footer>
            <Button type="button" color="primary" onClick={modifySubmit} block={true}>수정</Button>
        </Form.Footer>
    </Card.Body>
  );
}

export default ModifyInfo;
