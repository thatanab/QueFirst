import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import axios from '../../../config/axios'
import UserContext from '../../../context/UserContext'
import AdminRoomCard from '../AdminRoomCard/AdminRoomCard'


function DeleteRoom() {
    const { card, setCard } = useContext(UserContext);


    const fetchPartners = async () => {
        const res = await axios.get("http://localhost:5555/rooms/");
        console.log(res.data)
        setCard(res.data);
        console.log(card);
    }

    useEffect(() => {
        fetchPartners();
    }, []);

    return (
        <>

            <Row align="middle" justify="center" style={{ height: "100vh", marginTop: "-4rem" }}>
                <Col >
                    <Row>
                        {card.map((item) => <AdminRoomCard item={item} fetchRoom={fetchPartners} />)}
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: "20px", fontWeight: "bold" }}>
                        Create new room ? Please click&nbsp;<a href="http://localhost:3000/createroom" >here</a>
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default DeleteRoom
