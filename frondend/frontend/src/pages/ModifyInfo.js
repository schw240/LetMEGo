import * as React from "react";

import { Form, Card, Button } from "tabler-react";

function ModifyInfo() {
    //내 정보 수정 값(비밀번호 제외 기존 값 불러와서 화면에 보여줘야함)
    const [myinfo, setMyinfo] = React.useState({
        id : 'user',
        nowPw: '', //현재 비밀번호
        changePw: '', //바꿀 비밀번호
        changePwConfirm: '', //비밀번호 확인
        email: '', //이메일
        emailCheck: true, //이메일 수신 여부
    })

    const modifySubmit = () => {
        console.log('수정버튼~~')
    }
    

  return (
    <Card.Body className="p-6">
        <Card.Title RootComponent="div">내 정보 수정</Card.Title>
        <Form.Group>
            <Form.Input icon="user" placeholder="id" name="id" value={myinfo.id}/>
        </Form.Group>
        <Form.Group>
            <Form.Input icon="lock" placeholder="password" name="password" type="password"/>
        </Form.Group>
        <Form.Group>
            <Form.Input icon="check-circle" placeholder="passwordConfirm" name="passwordConfirm" type="password"/>
        </Form.Group>
        <Form.Group>
            <Form.Input icon="at-sign" placeholder="e-mail" name="e-mail"/>
        </Form.Group>
        <Form.Checkbox label="이메일 수신 동의" name="email" checked={myinfo.emailCheck}/>

        <Form.Footer>
            <Button type="button" color="primary" onClick={modifySubmit} block={true}>수정</Button>
        </Form.Footer>
    </Card.Body>
  );
}

export default ModifyInfo;
