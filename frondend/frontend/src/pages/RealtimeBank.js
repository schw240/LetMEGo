import * as React from "react";

import { Table, Button, Icon, Text, } from "tabler-react";

function RealtimeBank() {

  return (
    <Table
        responsive
        highlightRowOnHover
        hasOutline
        verticalAlign="center"
        cards
        className="text-nowrap"
        >
        <Table.Header>
            <Table.Row>
            <Table.ColHeader alignContent="center" className="w-1"> <i className="country-flag" /> </Table.ColHeader>
            <Table.ColHeader alignContent="center">외화</Table.ColHeader>
            <Table.ColHeader alignContent="center">현찰 살 때</Table.ColHeader>
            <Table.ColHeader alignContent="center"> 수수료 </Table.ColHeader>
            <Table.ColHeader alignContent="center">현찰 팔 때</Table.ColHeader>
            <Table.ColHeader alignContent="center"> 수수료 </Table.ColHeader>
            <Table.ColHeader alignContent="center"> 매매 기준율 </Table.ColHeader>
            <Table.ColHeader alignContent="center"> 우대사항 </Table.ColHeader>
            </Table.Row>
        </Table.Header>
        
        {/* 여기서 map 함수 */}
        <Table.Body>
            <Table.Row>
            <Table.Col alignContent="center"> <Icon prefix="flag" name="us" /> </Table.Col>
            <Table.Col alignContent="center">
                <div>미국</div>
                <Text size="sm" muted>
                (USD)
                </Text>
            </Table.Col>
            <Table.Col alignContent="center"> 1126.06 </Table.Col>
            <Table.Col alignContent="center"> 1.75% </Table.Col>
            <Table.Col alignContent="center"> 1087.34 </Table.Col>
            <Table.Col alignContent="center"> 1.75% </Table.Col>
            <Table.Col alignContent="center"> 1106.70 </Table.Col>
            <Table.Col alignContent="center">
                <Button id="showmodal">
                <Icon prefix="fe" name="plus-circle" />
                </Button>
            </Table.Col>
            </Table.Row>
        </Table.Body>
    </Table>
  );
}

export default RealtimeBank;