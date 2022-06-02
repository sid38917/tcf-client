import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import {Row, Col, Card, Form, Input, Button, Checkbox, Spin, message} from 'antd';
import {  SetUser } from '../stores/action';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { useDispatch } from 'react-redux';

import { ConsoleSqlOutlined, HistoryOutlined } from '@ant-design/icons';


import axios from 'axios';

const FormLogin = (props) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setModalLogin, onSuccess} = props


    const history = useHistory();
   
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const error = () => {
        return message.error('failed login')
    }

 
    const onFinish = (values) => {
        setLoading(true)
       // localStorage.setItem('username', values.email) //sets the item
        const {email, password} = values
        axios.post('http://localhost:4000/customer/login', {
             email, password
                }).then((res) => {
                //if the user is found, then the dataUser is set to res.data.data which is the data of the user, 
                //in the console, the data is posted, and then through thr dispatch function of redux
                //a user is set and then pushed to the home peage
                    const dataUser= res.data.data
                    console.log('result login', dataUser)
                    dispatch(SetUser(dataUser))
                    message.success('login success')
                    onSuccess()
                    setModalLogin(false)
                    
                }).catch((err) => {
                    //erorr
                    error(err)
                    console.log('error', err.data)
                }).finally(() => {
                    //at the end
                    setLoading(false)
                    
                })

        
        
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failedd', errorInfo)
    }

     //GUI
    return (
        <>
        <div>
            <h3>Login Form</h3>
            <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Email is not valid'
                            }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item

                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Password'/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className="button-primary" htmlType="submit" disabled={loading}> {loading ? <Spin tip = 'loading..'></Spin> : 'Submit' }
                        
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/register">Don't have an account register here</Link>
        </div>
        </>
    )
}

export default FormLogin