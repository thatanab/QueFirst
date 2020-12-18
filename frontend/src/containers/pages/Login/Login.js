import React, { useContext, useState } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import axios from '../../../config/axios';
import jwtDecode from 'jwt-decode';
import LocalStorageService from '../../../services/localStorage'
import UserContext from '../../../context/UserContext';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 11,
        },
    },
};

function Login(props) {

    const { setUsername, username, setPayload } = useContext(UserContext)

    const [form] = Form.useForm();

    const [password, setPassword] = useState("")
    const onFinish = async (values) => {
        await axios.post("/users/login", { username, password })

            .then(res => {
                notification.success({
                    description: "Login successfully"
                });
                LocalStorageService.setToken(res.data.token);
                setPayload(jwtDecode(res.data.token));

                props.history.push("/showRoom");
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Username or Password is incorrect."
                });
            });
    };

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

            <Form
                {...formItemLayout}
                form={form}
                name="login"
                onFinish={onFinish}>
                <Row justify="center">
                    <Col style={{marginBottom: "2rem", fontSize: "2rem", fontWeight: "bold"}}>Welcome to Que First</Col>
                </Row>

                {/* Username */}
                <Form.Item
                    name="username"
                    label="Username:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in your username.'
                        }
                    ]}>
                    <Input onChange={usernameChange} />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    name="password"
                    label="Password:"
                    rules={[
                        {
                            required: true,
                            message: 'Please put in your password.'
                        }
                    ]}>
                    <Input.Password onChange={passwordChange} />
                </Form.Item>

                <Row justify="center">
                    <Col><Button type="primary" onClick={onFinish}  >Submit</Button></Col>
                    <Col><Button htmlType="button" onClick={onReset} style={{ marginLeft: "5rem" }}>Reset</Button></Col>
                </Row>

                <Row justify="center">
                    <Col style={{marginTop: "2rem"}}>New to Que First ? Please register <a href="http://localhost:3000/register" >here</a></Col>
                </Row>
            </Form>

        </div>
    )
}

export default Login
