import * as React from "react";

import { Form, Card, Button } from "tabler-react";

function BankSelected() {

    //내 정보 수정 값(비밀번호 제외 기존 값 불러와서 화면에 보여줘야함)
    const [myinfo, setMyinfo] = React.useState({
        id : 'user',
        nowPw: '', //현재 비밀번호
        changePw: '', //바꿀 비밀번호
        changePwConfirm: '', //비밀번호 확인
        email: '', //이메일
        emailCheck: true, //이메일 수신 여부
    })

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

    const bankSubmit = () => {
        console.log(bankSelect.woori)
    }

  return (
    <Card.Body className="p-6">
        <Card.Title RootComponent="div">내 은행 설정</Card.Title>
        <Form.Group>
        <Form.Input icon="user" placeholder="id" name="id" value={myinfo.id}/>
        <br/>
        <br/>
        {/* map함수 써서 반복문 돌게~~ */}
        <Form.Group>
            <Form.Checkbox label={<img src="./demo/bank_logo/woori.png" alt="bank_logo" />} checked={bankSelect.woori} name="woori" onChange={bankClick}/>
            <Form.Checkbox label={<img src="./demo/bank_logo/shinhan.png" alt="bank_logo" />} checked={bankSelect.shinhan} name="shinhan" onChange={bankClick}/>
        </Form.Group>
        </Form.Group>

        <Form.Footer>
            <Button type="button" color="primary" onClick={bankSubmit} block={true}>저장</Button>
        </Form.Footer>
  </Card.Body>
  );
}

export default BankSelected;
