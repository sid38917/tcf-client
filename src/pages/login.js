import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, Input, Button, Checkbox, Spin, message} from 'antd';
import { Link, useHistory } from 'react-router-dom'
// import {connect} from 'react-redux'
 import {SetUser} from '../stores/action'
import { useDispatch } from 'react-redux';

import axios from 'axios';

const Login = (props) => {
    const history = useHistory();
   
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const error = () => {
        return message.error('failed login')
    }

 






//the onFinish arrow function takes in the arguement values, with the purpose to determine whether the user is able to login
//the values is set as email and password, which is then taken as req.body from the backend, the email and password are obtained
//since they are the two fields of entry, and set as the values
//the data is then posted to the backend, where it is accessed through the req.body function
//dataUser stores the login data of the user, and the data is dispatched as
//a redux action to the redux store. This is to update the state with the user data
//this allows for determining that the user has logged in
//the data and validation is checked from the backend 
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
                    const dataUser= res.data.data  //thers two objects under res
                    console.log('result login', dataUser)
                    dispatch(SetUser(dataUser))
                    message.success('login success')
                    
                    history.push('/')
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
        console.log('Failed =>', errorInfo)
    }

    //modified from ant 
     
    return (
        <Row justify="center">
            <Card style={{ width: '16vw', height: '45vh' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2>Login</h2>
                </div>
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
                        // wrapperCol={{
                        //     offset: 8,
                        //     span: 16,
                        // }}
                    >
                        <Button style = {{width:"100%"}}className="button-primary" htmlType="submit" disabled={loading}> {loading ? <Spin tip = 'loading..'></Spin> : 'Submit' }
                        
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/register">Don't have an account register here</Link>
            </Card>
        </Row>
    )

}


export default Login