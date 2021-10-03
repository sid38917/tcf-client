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

    // useEffect(() => {
    //     if(dataUser.token){
    //         history.push('/')
    //     }
    // }, [dataUser])

    const onFinish = (values) => {
        setLoading(true)
       // localStorage.setItem('username', values.email) //sets the item
        const {email, password} = values
        axios.post('http://localhost:4000/customer/login', {
             email, password
                }).then((res) => {
                
                    const dataUser= res.data.data
                    console.log('result register', dataUser)
                    dispatch(SetUser(dataUser))
                    message.success('login success')
                    
                    history.push('/')
                }).catch((err) => {
                    error(err)
                    console.log('error', err.data)
                }).finally(() => {
                    setLoading(false)
                })

        
        
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed =>', errorInfo)
    }

    //modified from ant 
    return (
        <Row justify="center">
            <Card style={{ width: '20vw', height: '35vh' }}>
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className="button-primary" htmlType="submit" disabled={loading}> {loading ? <Spin tip = 'loading..'></Spin> : 'Submit' }
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/register">Don't have an account register here</Link>
            </Card>
        </Row>
    )

}

// const mapStateToProps = state => {
//     const {User} = state;

//     return {
//         dataUser: User
//     }
// }

// const mapDispatchToProps = {
//     SetUser
// }

export default Login