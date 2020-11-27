import * as React from "react";

import { Form, Card, Button } from "tabler-react";
import API from '../Api'
import Account from '../Account'

function BankSelected() {
    const token = window.localStorage.getItem("token");
    const [bankGroup, setBankGroup] = React.useState([])
    const [bank, setBank] = React.useState(true)
    const [userid, setUserid] = React.useState()

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
    
    const bankSubmit = () => {
        console.log(bankSelect)
        Account.post("update", bankSelect, {
            headers: {
                Authorization: "JWT " + token
            }
        })
        .then(response=>{
            const {data} = response
            console.log(data)
        })
        .catch(error=>{
            console.error(error)
        })
    }

    React.useEffect(()=> {
        Account.get("onlybankinfo", {
            headers: {
                Authorization: "JWT " + token
            }
        })
        .then(response=>{
          const {data} = response
            console.log(data)
          setBankSelect({
            hana: data.hana,
            woori: data.woori,
            kookmin: data.kookmin,
            shinhan: data.shinhan,
            nonghyup: data.nonghyup,
            gieob: data.gieob,
            standard: data.standard,
            citi: data.citi,
            suhyup: data.suhyup,
            busan: data.busan,
            daegu: data.daegu,
            jeonbug: data.jeonbug,
            gyeongnam: data.gyeongnam,
            jeju: data.jeju,
          })
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

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


  return (
    <Card.Body className="p-6 bankstyle">
        <Card.Title RootComponent="div">내 은행 설정</Card.Title>
        {/* map함수 써서 반복문 돌게~~ */}
        {
                  (() => {
                    //함수
                    if(bank)
                      return <Form.Group>
                                {bankGroup.map((v) =>
                                    <>
                                    <Form.Checkbox 
                                        isInline 
                                        label={<img src={"./demo/bank_logo/"+v.bank_logo+".png"} 
                                        alt={"bank_"+v.bank_logo} />}
                                        checked={bankSelect[v.bank_logo]}
                                        name={v.bank_logo}
                                        onChange={bankClick}
                                    />
                                    </>
                                    )}
                            </Form.Group>
                  })()
                }
        

        <Form.Footer>
            <Button type="button" color="primary" onClick={bankSubmit} block={true}>저장</Button>
        </Form.Footer>
  </Card.Body>
  );
}

export default BankSelected;
