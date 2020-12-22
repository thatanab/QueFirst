import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';

function RoomCard({ item, fetchRoom }) {
    const history = useHistory();
    const onFinish =  (values) => {
        history.push(`/reserves/${item.id}`)
    };

    const onCancel = (values) => {
        axios.patch(`/reserves/cancel/${item.id}`)
        .then(res => {
            notification.success({
                description: "Reserve cancelled."
            })
            fetchRoom()
        })
        .catch(err => {

        })
    }

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
                {item.roomStatus==='Already reserved' ?
                <Row>
                    <Button danger onClick={onCancel}>Cancel</Button>
                </Row> : 
                <Row>
                    <Button type="primary" onClick={onFinish} >Reserve</Button>
                </Row>                
                }
            </Col>
        </Row>
    )
}

export default RoomCard
