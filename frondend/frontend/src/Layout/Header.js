import React from 'react';
import { Nav, Avatar } from "tabler-react";
import 'antd/dist/antd.css';
import './Header.css';
import { PageHeader } from 'antd';

export default function Header() {

    return (
        <>
            <div id="header">
                <div class="logo">
                    LetMEGo
                </div>
                <Nav>
                    <Avatar imageURL="./demo/faces/male/21.jpg" />
                    <Nav.Item active icon="user" to="http://www.example.com">공지사항</Nav.Item>
                    <Nav.Item value="환율예측" />
                    <Nav.Item to="http://www.example.com">환전비교</Nav.Item>
                    <Nav.Item value="실시간"></Nav.Item>
                </Nav>
            </div>
            {/* <Nav>
                <Nav.Item value="실시간"></Nav.Item>
                <Nav.Item to="http://www.example.com">환전비교</Nav.Item>
                <Nav.Item value="환율예측" />
                <Nav.Item active icon="user" to="http://www.example.com">공지사항</Nav.Item>
                <Avatar imageURL="./demo/faces/male/21.jpg" />
            </Nav> */}
        </>
    );
}
