import React, { useContext, useState } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import axios from '../../../config/axios'
import { useForm } from 'antd/lib/form/Form';
import UserContext from '../../../context/UserContext';
import { useHistory } from 'react-router-dom';


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




function AdminRegister(props) {

    const history = useHistory();
    const { role, setRole } = useContext(UserContext)

    const [form] = Form.useForm();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    const onFinish = async (values) => {
        console.log(username,
            password,
            name,
            lastname,
            email
        );
        await axios.post("/users/adminregister", {

            username,
            password,
            name,
            lastname,
            email
        })

            .then(res => {
                notification.success({
                    description: "Signup successfully"
                });
                
                history.push("/adminlogin");
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Something went wrong."
                });
            });
    };

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
    };

    const nameChange = (e) => {
        setName(e.target.value);
    };

    const lastnameChange = (e) => {
        setLastname(e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };


    const onReset = () => {
        form.resetFields();
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Form
                {...formItemLayout}
                style={{ marginTop: "-4rem" }}
                form={form}
                name="register"
                onFinish={onFinish}>
                <Row justify="center">
                    <Col style={{ marginTop: "-4rem", marginBottom: "2rem", fontSize: "1rem", fontWeight: "bold" }}>Please enter Admin information</Col>
                </Row>

                {/* Name */}
                <Form.Item
                    name="name"
                    label="Name:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in your name.'
                        }
                    ]}>
                    <Input onChange={nameChange} />
                </Form.Item>

                {/* Lastname */}
                <Form.Item
                    name="lastname"
                    label="Lastname:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in your last name.'
                        }
                    ]}>
                    <Input onChange={lastnameChange} />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    name="email"
                    label="Email:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in your email.'
                        }
                    ]}>
                    <Input onChange={emailChange} />
                </Form.Item>

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
                    <Col><Button type="primary" onClick={onFinish} >Submit</Button></Col>
                    <Col><Button htmlType="button" onClick={onReset} style={{ marginLeft: "5rem" }}>Reset</Button></Col>
                </Row>
            </Form>

        </div>
    )
}

export default AdminRegister;
