import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, notification, DatePicker, TimePicker } from 'antd'
import axios from '../../../config/axios'
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

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

function Reserve(props) {
    console.log('reserve')
    const [form] = Form.useForm();
    const [date, setDate] = useState("");
    //const [time, setTime] = useState("");

    const { id } = useParams();
    const history = useHistory()
    console.log(id)

    const onFinish = async (values) => {
        console.log('clicked')
        console.log(values.date.toDate())
        //console.log(values.time.toDate())
        const dateSelected = values.date.toDate()
        //     time,
        //console.log(`${values.date.date()}/${values.date.month() + 1}/${values.date.year()}`)

        // const timeSelected = values.time.toDate()

        // console.log(`${values.time.hour()}:${values.time.minute()}`)

        await axios.post(`/reserves/${id}`, {
            date: `${values.date.date()}/${values.date.month() + 1}/${values.date.year()}`,
            //time: `${values.time.hour()}:${values.time.minute()}`
        }).then(res => {
            notification.success({
                description: "Reserve success."
            })
            console.log(res.data)
            history.push(`/reserved/${res.data.roomName}`, { reserveDate: `${values.date.date()}/${values.date.month() + 1}/${values.date.year()}` })
        })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Reserve failed."
                });
            });

        //ใส่หน้าที่หลังจากกด reserve 
        //history.push("/")


        // );
        // await axios.post("/reserves/1", {
        //     date: `${dateSelected.getDay()}/${dateSelected.getMonth()}/${$dateSelected.getYear()}`,
        //     time,
        // })
        //     .then(res => {
        //         notification.success({
        //             description: "Reserved successfully"
        //         });
        //         props.history.push("/");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         notification.error({
        //             description: "Something went wrong."
        //         });
        //     });
    };

    const dateChange = (e) => {
        setDate(e.target.value);
    };

    // const timeChange = (e) => {
    //     setTime(e.target.value);
    // };

    const onReset = () => {
        form.resetFields();
    };

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    function onChange2(time, timeString) {
        console.log(time, timeString);
    }

    function disabledDate(current) {
        const currentDay = new Date();
        let customDate = `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}`;
        return current && current < moment(customDate, "YYYY-MM-DD");
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Form
                {...formItemLayout}
                form={form}
                name="reserve"
                onFinish={onFinish}>

                {/* Date */}
                <Form.Item
                    name="date"
                    label="Date:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in date.'
                        }
                    ]}>
                    {/* <Input onChange={dateChange} /> */}
                    <DatePicker onChange={onChange} style={{ width: "150px" }} disabledDate={disabledDate}/>
                </Form.Item>

                {/* Time */}
                {/* <Form.Item
                    name="time"
                    label="Time:"
                    rules={[
                        {
                            required: false,
                            message: 'Please put in time.'
                        }
                    ]}> */}
                {/* <Input onChange={timeChange} /> */}
                {/* <TimePicker onChange={onChange2} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                </Form.Item> */}

                <Row justify="center">
                    <Col><Button htmlType="submit" type="primary">Submit</Button></Col>
                    <Col><Button htmlType="button" onClick={onReset} style={{ marginLeft: "5rem" }}>Reset</Button></Col>
                </Row>

            </Form>
        </div>
    )
}

export default Reserve
