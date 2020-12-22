import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Select, Upload, message, Button, Form, Row, Col, Input, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../../config/axios"


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

function CreateRoom() {

    const [roomName, setRoomName] = useState();
    const [roomStatus, setRoomStatus] = useState();
    const [fileName, setFileName] = useState();
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setFileName(info.file)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const roomNameChange = (e) => {
        setRoomName(e.target.value)
    }
    const roomStatusChange = (value) => {
        setRoomStatus(value)
    }
    const { Option } = Select;
    const history = useHistory()
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };

    const onFinish = () => {
        // console.log(fileName.originFileObj)
        const formData = new FormData();
        formData.append('roomName', roomName);
        formData.append('roomStatus', roomStatus);
        formData.append('roomImage', fileName.originFileObj);

        // ยิง axios
        axios.post("/rooms/upload",
            formData
        )
            .then(res => {
                notification.success({
                    description: "Created successfully"
                });
                history.push("/deleteroom");
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Something went wrong."
                });
            });
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div style={{ height: "100vh", }} >
            <Form
                {...formItemLayout}
                style={{ margin: "auto 0" }}
                form={form}
                name="register"
                onFinish={onFinish}>
                <Row justify="center">
                    <Col style={{ marginBottom: "2rem", fontSize: "1rem", fontWeight: "bold" }}>Please enter room information</Col>
                </Row>

                {/* Room Name */}
                <Form.Item
                    name="roomName"
                    label="Room Name:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in room name.'
                        }
                    ]}>
                    <Input onChange={roomNameChange} />
                </Form.Item>

                {/* Room Status */}
                <Form.Item
                    name="roomStatus"
                    label="Room Status:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in room status.'
                        }
                    ]}>
                    <Select defaultValue="Choose status" style={{ width: 120 }} onChange={roomStatusChange}>
                        <Option  value="Available">Available</Option>
                        <Option  value="Reserved">Reserved</Option>
                    </Select>

                </Form.Item>


                <Form.Item
                    name="roomImg"
                    label="Room Img:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in room Img.'
                        }
                    ]}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    </Form.Item>

                <Row justify="center">
                    <Col><Button type="primary" onClick={onFinish} >Create</Button></Col>
                    <Col><Button htmlType="button" onClick={onReset} style={{ marginLeft: "5rem" }}>Reset</Button></Col>
                </Row>
            </Form>
        </div>
    )
}

export default CreateRoom
