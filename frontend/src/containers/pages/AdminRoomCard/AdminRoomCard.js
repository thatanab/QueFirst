import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import axios from '../../../config/axios'
import { useHistory } from 'react-router-dom';

function AdminRoomCard({ item, fetchRoom }) {
    const history = useHistory();
    const onFinish = (values) => {
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
    const onDelete = () => {
        console.log(item)
        axios.delete(`/rooms/${item.id}`)
            .then(res => {
                notification.success({
                    description: "Deleted successfully."
                })
                fetchRoom()
            })
            .catch(err => {

            })
    }

    return (
        <Col>
            <Row justify="center">
                <Col span={20} style={{ marginLeft: "10rem" }}>
                    <Row>
                        <Col>
                            <img alt="รูปห้อง" style={{ width: "100px", height: "100px" }} src={`${item.roomImage}`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Name: {item.roomName}
                        </Col>
                    </Row>
                    <Row>
                        <Button danger onClick={onDelete} >Delete</Button>
                    </Row>

                </Col>
            </Row>
        </Col>
    )
}

export default AdminRoomCard
