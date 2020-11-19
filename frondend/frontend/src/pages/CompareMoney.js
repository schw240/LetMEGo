// import React from 'react';
// import { Form } from "tabler-react";
// import './CompareMoney.css';
// import rgtArrow from '../images/rgt_arrow2.png'
// import SiteWrapper from "../SiteWrapper.react";

// // frondend\frontend\example\src\SiteWrapper.react.js
// // frondend\frontend\example\src\pages\CompareMoney.js
// export default function CompareMoney() {

//     return (
//         <SiteWrapper>
//             <Form.Group label="환전할 금액" className="test">
//                 <Form.Group label="환전 금액" className="please">
//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>
//                             KRW
//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>
//                             원
//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>
//                 </Form.Group>
//                 <div className="rgtArrow1">
//                     <img src={rgtArrow} />
//                 </div>
//                 <Form.Group label="도착지" className="arrival">
//                     <Form.Select>
//                         <option>
//                             미국
//                         </option>
//                         <option>
//                             영국
//                         </option>
//                         <option>
//                             독일
//                         </option>
//                         <option>
//                             캐나다
//                         </option>
//                         <option>
//                             일본
//                         </option>
//                         <option>
//                             중국
//                         </option>
//                     </Form.Select>
//                 </Form.Group>
//             </Form.Group>

//             <Form.Group label="거쳐서" className="test">
//                 <Form.Group label="통화" className="acrossMoney">
//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>
//                             USD
//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>
//                             $
//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>
//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>
//                             JPY
//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>
//                             ¥
//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>
//                 </Form.Group>
//                 <div className="rgtArrow2">
//                     <img src={rgtArrow} />
//                 </div>
//                 <Form.Group label="환전 결과" className="crossResult">
//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>
//                             USD
//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>
//                             $
//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>

//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>
//                             JPY
//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>
//                             ¥
//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>
//                 </Form.Group>
//             </Form.Group>
//             <Form.Group label="다이렉트" className="test">
//                 <Form.Group label="원화" className="amountMoney">
//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>
//                             KRW
//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>
//                             원
//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>
//                 </Form.Group>
//                 <div className="rgtArrow1">
//                     <img src={rgtArrow} />
//                 </div>
//                 <Form.Group label="결과" className="arrival">
//                     <Form.InputGroup>
//                         <Form.InputGroupPrepend>
//                         <Form.InputGroupText>

//                         </Form.InputGroupText>
//                         </Form.InputGroupPrepend>
//                         <Form.Input />
//                         <Form.InputGroupAppend>
//                         <Form.InputGroupText>

//                         </Form.InputGroupText>
//                         </Form.InputGroupAppend>
//                     </Form.InputGroup>
//                 </Form.Group>
//             </Form.Group>
//         </SiteWrapper>
//     );
// }

// @flow

import './CompareMoney.css';
import rgtArrow from './rgt_arrow2.png';
import SiteWrapper from '../SiteWrapper';
import * as React from 'react';
import { Page, Grid, Card, Button, Form, Dimmer } from 'tabler-react';

function CardsDesignPage(): React.Node {
  return (
    <SiteWrapper>
      <Page.Content>
        <div
          style={{
            border: '1px solid black',
            marginTop: '50px',
            overflow: 'hidden',
            padding: '30px',
          }}
        >
          <Grid.Row>
            <Grid.Col md={4} sm={4}>
              <Form.Group label="환전할 금액">
                <div style={{ marginTop: '8%', marginLeft: '25%' }}>
                  <Form.Group label="환전 금액">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input />
                      <Form.InputGroupAppend>
                        <Form.InputGroupText>원</Form.InputGroupText>
                      </Form.InputGroupAppend>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Form.Group>
            </Grid.Col>

            <Grid.Col md={4} sm={4}>
              <div
                style={{
                  width: '100px',
                  height: '60px',
                  marginTop: '17%',
                  marginLeft: '33%',
                }}
              >
                <img src={rgtArrow} />
              </div>
            </Grid.Col>
            <Grid.Col md={4} sm={4}>
              <div style={{ marginTop: '15%' }}>
                <Form.Group label="도착지">
                  <Form.Select>
                    <option>미국</option>
                    <option>영국</option>
                    <option>독일</option>
                    <option>캐나다</option>
                    <option>일본</option>
                    <option>중국</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>

        <br />
        <div
          style={{
            border: '1px solid black',
            marginTop: '20px',
            overflow: 'hidden',
            padding: '30px',
          }}
        >
          <Grid.Row>
            <Grid.Col md={4} sm={4}>
              <Form.Group label="거쳐서">
                <div style={{ marginTop: '8%', marginLeft: '25%' }}>
                  <Form.Group label="통화">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>USD</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input />
                      <Form.InputGroupAppend>
                        <Form.InputGroupText>$</Form.InputGroupText>
                      </Form.InputGroupAppend>
                    </Form.InputGroup>
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>JPY</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input />
                      <Form.InputGroupAppend>
                        <Form.InputGroupText>¥</Form.InputGroupText>
                      </Form.InputGroupAppend>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Form.Group>
            </Grid.Col>

            <Grid.Col md={4} sm={4}>
              <div
                style={{
                  width: '100px',
                  height: '60px',
                  marginTop: '21%',
                  marginLeft: '33%',
                }}
              >
                <img src={rgtArrow} />
              </div>
            </Grid.Col>
            <Grid.Col md={4} sm={4}>
              <div style={{ marginTop: '15%' }}>
                <Form.Group label="환전 결과">
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                      <Form.InputGroupText>USD</Form.InputGroupText>
                    </Form.InputGroupPrepend>
                    <Form.Input />
                    <Form.InputGroupAppend>
                      <Form.InputGroupText>$</Form.InputGroupText>
                    </Form.InputGroupAppend>
                  </Form.InputGroup>
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                      <Form.InputGroupText>JPY</Form.InputGroupText>
                    </Form.InputGroupPrepend>
                    <Form.Input />
                    <Form.InputGroupAppend>
                      <Form.InputGroupText>¥</Form.InputGroupText>
                    </Form.InputGroupAppend>
                  </Form.InputGroup>
                </Form.Group>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>

        <br />
        <div
          style={{
            border: '1px solid black',
            marginTop: '20px',
            overflow: 'hidden',
            padding: '30px',
          }}
        >
          <Grid.Row>
            <Grid.Col md={4} sm={4}>
              <Form.Group label="다이렉트">
                <div style={{ marginTop: '8%', marginLeft: '25%' }}>
                  <Form.Group label="원화">
                    <Form.InputGroup>
                      <Form.InputGroupPrepend>
                        <Form.InputGroupText>KRW</Form.InputGroupText>
                      </Form.InputGroupPrepend>
                      <Form.Input />
                      <Form.InputGroupAppend>
                        <Form.InputGroupText>원</Form.InputGroupText>
                      </Form.InputGroupAppend>
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </Form.Group>
            </Grid.Col>

            <Grid.Col md={4} sm={4}>
              <div
                style={{
                  width: '100px',
                  height: '60px',
                  marginTop: '17%',
                  marginLeft: '33%',
                }}
              >
                <img src={rgtArrow} />
              </div>
            </Grid.Col>
            <Grid.Col md={4} sm={4}>
              <div style={{ marginTop: '15%' }}>
                <Form.Group label="결과">
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                      <Form.InputGroupText />
                    </Form.InputGroupPrepend>
                    <Form.Input />
                    <Form.InputGroupAppend>
                      <Form.InputGroupText />
                    </Form.InputGroupAppend>
                  </Form.InputGroup>
                </Form.Group>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Page.Content>
    </SiteWrapper>
  );
}

export default CardsDesignPage;
