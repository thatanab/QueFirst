import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button, Row, Col,notification } from 'antd'
import axios from '../../../config/axios'
import UserContext from '../../../context/UserContext'
import RoomCard from '../../../../src/components/RoomCard/RoomCard'


function ShowRoom() {
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
        <Row align="middle" justify="center" style={{height: "80vh"}}>
            {card.map((item) => <RoomCard item={item} /> )}
        </Row>    
        </>
    )
}

export default ShowRoom
