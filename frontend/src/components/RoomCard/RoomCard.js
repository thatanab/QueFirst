import React from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';

function RoomCard({ item }) {
    const history = useHistory();
    const onFinish =  (values) => {
        history.push(`/reserves/${item.id}`)
    };
    return (

        <Row justify="center">
            <Col span={20} style={{ marginLeft: "10rem" }}>
                <Row>
                    <Col>
                        <img alt="รูปห้อง" style={{width: "100px", height: "100px"}} src={`${item.roomImage}`}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Name: {item.roomName}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Status: {item.roomStatus}
                    </Col>
                </Row>
                <Row>
                    <Button type="primary" onClick={onFinish} disabled={item.roomStatus==='Already reserved'}>Reserve</Button>
                </Row>
            </Col>
        </Row>
    )
}

export default RoomCard
