import * as React from "react";

import { Form, Card, Button } from "tabler-react";
import Account from '../Account'

function RemoveUser({history}) {
    const token = window.localStorage.getItem("token");
    //탈퇴 이유
    const [reason, setReason] = React.useState('')
    const [radioGroup, setRadioGroup] = React.useState({
        service: true,
        benefits: false,
        protect: false,
        other: false,
    })

    const radioSelect = (e) => {
        if(e.target.value === 'service'){
            setRadioGroup({
                service: true,
                benefits: false,
                protect: false,
                other: false,
            })
            setReason(null)
        }else if(e.target.value === 'benefits'){
            setRadioGroup({
                service: false,
                benefits: true,
                protect: false,
                other: false,
            })
            setReason(null)
        }else if(e.target.value === 'protect'){
            setRadioGroup({
                service: false,
                benefits: false,
                protect: true,
                other: false,
            })
            setReason(null)
        }else if(e.target.value === 'other'){
            setRadioGroup({
                service: false,
                benefits: false,
                protect: false,
                other: true,
            })
        }
    }
    
    const removeSubmit = () => {
        Account.post("withdraw", [{
            "service": radioGroup.service,
            "benefits": radioGroup.benefits,
            "privacy": radioGroup.protect,
            "other": reason,
        }])
        .then(response=>{
            const {data} = response
            if(data.result){
                console.log(token)
                Account.post("deleteuser", {
                    headers: {
                        Authorization: "JWT " + token
                    }
                })
                .then(response=>{
                  const {data} = response
                  if(data.result){
                      alert('성공적으로 탈퇴가 완료되었습니다.')
                      if (token != null) {
                        window.localStorage.removeItem("token")
                      }
                      history.push('/login')
                  }
                })
                .catch(error=>{
                    console.error(error)
                })
            }
        })
        .catch(error=>{
            console.error(error)
        })   
    }

    return (
        <Card.Body className="p-6">  
            <Card.Title RootComponent="div">회원 탈퇴</Card.Title>
            <Form.Group>
                <Form.Radio label="서비스가 마음에 안들어서" value="service" checked={radioGroup.service} onChange={radioSelect} />
            </Form.Group>
            <Form.Group>
                <Form.Radio label="혜택이 없어서" value="benefits" checked={radioGroup.benefits} onChange={radioSelect} />
            </Form.Group>
            <Form.Group>
                <Form.Radio label="개인정보 노출이 싫어서" value="protect" checked={radioGroup.protect} onChange={radioSelect} />
            </Form.Group>

            <Form.Group>
                <Form.Radio label="기타" value="other" checked={radioGroup.other} onChange={radioSelect}/>
                <Form.Textarea disabled={!radioGroup.other} name="removeReason" placeholder="탈퇴 이유를 적어주세요.." rows={6} onChange={(e)=>{setReason(e.target.value)}}/>
            </Form.Group>                
            <Form.Footer>
                <Button type="button" color="primary" onClick={removeSubmit} block={true}>확인</Button>
            </Form.Footer>
        </Card.Body>
    );
}

export default RemoveUser;
