import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Checkbox, Card, Row, Spin, Alert, message} from 'antd'
import {Link, useHistory} from 'react-router-dom'
import home from './home'
import {connect, useDispatch} from 'react-redux';
import { SetUser } from '../stores/action';
import axios from 'axios'
import { ConsoleSqlOutlined } from '@ant-design/icons';
import {userDispatch} from 'react-redux'

const Register = (props) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const error = () => {
        return message.error('failed register')
    }
    
   

    const {dataUser, SetUser} = props;

    const history = useHistory()

    const onSubmit = () => {
        history.push('/home')
    }
    const onFinish = (values) => {
      
        const {username, email, password} = values
        console.log('Success =>', values)
        setLoading(true)
        axios.post('http://localhost:4000/customer/register', {
            username, email, password
        }).then((res) => {
        
            const dataUser= res.data.data
            console.log('result register', res.data)
            dispatch(SetUser(dataUser))
            message.success('success register')
            
            history.push('/')
        }).catch((err) => {
            error(err)
            console.log('error', err.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo)
    }

  
//code from here obtained from ant designt
    return (
       <Row justify = 'center'>
           <Card>
               <div>
                   <h2>Register</h2>
               </div>

               <Form name = 'basic' initialValues = {{remember: true}} onFinish = {onFinish} onFinishFailed = {onFinishFailed}>
                   <Form.Item name = 'username' rules = {[{required: true, message: 'please input your name'}]}>
                       <Input placeholder= 'username'/>
                   </Form.Item>
                   <Form.Item name = 'email' rules = {[{required: true, message: 'please enter your email'}, {type: 'email', message: 'Email is not valid'}]}>
                       <Input placeholder = 'email'/>
                   </Form.Item>
                   <Form.Item name = 'password' rules = {[{required: true, message: 'please enter your password'}]}>
                       <Input.Password placeholder = 'password'/>
                   </Form.Item>
                   <Form.Item wrapperCol = {{offset: 8, span: 16}}>

                  

                   <Button className = 'button-primary' htmlType = 'submit' disabled={loading}> {loading ? <Spin tip = 'loading..'></Spin> : 'Submit' }
                       Submit
                   </Button>
                   </Form.Item>
                   </Form>
                   <Link to = '/login'>Have an Account? Login here</Link>
            


           </Card>
       </Row>

    )

    
}

const mapStateToProps = (state) => {
    const {User} = state;

    return {
        dataUser: User
    }
}

const mapDispatchToProps = {
    SetUser
}

export default Register 