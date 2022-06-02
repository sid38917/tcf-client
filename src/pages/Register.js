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
    
   

    // const {dataUser} = props;

    const history = useHistory()

    const onSubmit = () => {
        history.push('/home')
    }

  //The three fields of input the user is required to fill out for the registration is their username, email and password. 
  //The dataUser variable is created to determine the data of the user, which is obtained through the res.data.data, 
  //which is the data of the user. Then, the action of registering is dispatched into the reducer, 
  //SetUser is an action that the user takes, which basically refers to logging in. The function takes in a parameter, 
  //which is the data of the user, as seen in the snippet above of SetUser from redux. The success message is then displayed on the screen,
  // and the user is pushed back to the homepage. However, if there is an error, the error will be printed in the console, 
  //and the .finally, basically ends the loading, based on whether the user register was successful or not. 
  //When the user presses the register button, there is a loading thing, 
  //and it stops after the user is successfully registered, or there is an error. 
    const onFinish = (values) => {
      
        const {username, email, password} = values
        console.log('Success =>', values)
        setLoading(true)
        //link
        axios.post('http://localhost:4000/customer/register', {
            username, email, password //posts the data 
        }).then((res) => {
        //adds the data into the express, and then dispatches rhe action, and then allows the user to register and is pushed to the home page 
            const dataUser= res.data.data
            console.log('result register', res.data)
            dispatch(SetUser(dataUser))
             message.success('success register')
            
         history.push('/')
        }).catch((err) => {
            error(err) //if there is an error 
            console.log('error', err.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo)
    }

  
//code from here obtained from ant design

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
                   <Form.Item 
                //    wrapperCol = {{offset: 8, span: 16}}
                   >

                  

            <Button style = {{width: "100%"}} className = 'button-primary' htmlType = 'submit' disabled={loading}> {loading ? <Spin tip = 'loading..'></Spin> : 'Submit' }
                    
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