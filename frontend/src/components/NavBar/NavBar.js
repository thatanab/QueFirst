import React, { useContext } from 'react'
import "../NavBar/NavBar.css"
import { UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { notification } from 'antd';
import UserContext from '../../context/UserContext'
import localStorage from '../../services/localStorage'
import jwtDecode from 'jwt-decode'
import logo from '../../images/logo.png'

function NavBar() {

    const history = useHistory()

    const { change, setRole, setChange, payload, setPayload } = useContext(UserContext);
    // console.log(payload.username)
    const removeToken = () => {
        localStorage.clearToken();

        notification.success({
            description: "Logout success."
        });

        setChange(!change);
        history.replace("/");
        setPayload(null)
        setRole("GUEST");
        // window.location.reload();
    }

    return (
        <div className="NavRootDiv">
            <div><img style={{ width: "120px", height: "40px" }} src={logo} /></div>
            <div>{payload?.username ? <div onClick={removeToken} style={{ cursor: "pointer" }}>Logout </div> : null}</div>
        </div>
    )
}

export default NavBar
