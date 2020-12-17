import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

function Reserved() {
    const { roomName } = useParams();
    const location = useLocation();
    return (
        <div style={{ display: "flex" ,flexDirection:"column", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            
            <div>You have successfully reserved {roomName} room on {location.state.reserveDate}.</div>
            
            <div>Back to the room page. Click  <a href="http://localhost:3000/showRoom" >here</a></div> 
           
            
        </div>
    )
}

export default Reserved
