import * as React from "react";

import { Form, Card, Button } from "tabler-react";

function RemoveUser() {
    //탈퇴 이유
    const [reason, setReason] = React.useState('')

    const [radioGroup, setRadioGroup] = React.useState({
        service: true,
        benefits: false,
        protect: false,
        other: false,
    })

    const radioSelect = (e) => {
        console.log(e.target.value)
        if(e.target.value === 'service'){
          setRadioGroup({
            service: true,
            benefits: false,
            protect: false,
            other: false,
            })
        }else if(e.target.value === 'benefits'){
          setRadioGroup({
            service: false,
            benefits: true,
            protect: false,
            other: false,
            })
        }else if(e.target.value === 'protect'){
            setRadioGroup({
              service: false,
              benefits: false,
              protect: true,
              other: false,
            })
        }else if(e.target.value === 'other'){
            setRadioGroup({
              service: false,
              benefits: false,
              protect: false,
              other: true,
            })
        }
    }

    const otherReason = (e) => {
        setReason(e.target.value)
    }
    
    const removeSubmit = () => {
        console.log('탈퇴 이유 버튼~~')
        console.log(radioGroup)
        console.log(reason)

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
                <Form.Textarea disabled={!radioGroup.other} name="removeReason" placeholder="탈퇴 이유를 적어주세요.." rows={6} onChange={otherReason}/>
            </Form.Group>                
            <Form.Footer>
                <Button type="button" color="primary" onClick={removeSubmit} block={true}>확인</Button>
            </Form.Footer>
        </Card.Body>
    );
}

export default RemoveUser;
