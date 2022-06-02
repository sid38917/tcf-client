import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { Layout, Menu, Image, Result } from 'antd';
import {
HomeOutlined,
MenuUnfoldOutlined,
MenuFoldOutlined,
UserOutlined,
VideoCameraOutlined,
UploadOutlined,
} from '@ant-design/icons';
import {
BrowserRouter as Router,
Switch,
Route
} from "react-router-dom";
import Login from './login'
import Checkout from './Checkout'
import Home from './home'
import CustomPage from './CustomPage'
import Measurement from './Measurement'
import Register from './Register'
import TransactionPage from './Transaction';
import { ResetUser } from '../stores/action/userAction';
import { ResetCustom } from '../stores/action';
import { Cart } from '../components';
import {connect} from 'react-redux';
import {SetUser} from '../stores/action'
// import DisplayOptions from './displayOptions';
const { Header, Content, Footer } = Layout;
const MainPage = (props) => {
const history = useHistory();
const {dataUser, ResetUser, ResetCustom} = props;
const [collapsed, setCollapsed] = useState(false)


//this is to log the user out, reset user is taken from redux, where the user name is cleared, and then 
//the user is pushed back to the home page 
function logout() {
    ResetUser()
    ResetCustom()
    history.push('/')
}
// function toggle() { 
// setCollapsed(!collapsed)
// }


 //GUI
return (
<Layout style={{ minHeight: '100vh' }}>
<Header className="header">
<div className="logo" >
    <Image src={"https://i.ibb.co/GCgpW7V/logo.png"} height={50}/>
    </div>
<Menu mode="horizontal" defaultSelectedKeys={['1']} className="menu">
    {/* This is for the items in the menu  */}
<Menu.Item key="1" icon={<HomeOutlined />}>
<Link to="/">
Home
</Link>
</Menu.Item>
<Menu.Item key="2" >
FAQ
</Menu.Item>
<Menu.Item key="3" >
About Us
</Menu.Item>
<Menu.Item key="4" >

{/* 
    if the dataUser is there, through the determination of the token, then when clicking
    log out the user is logged out, and when pressed the login button, the user is pushed to the login button  */}

    { 
        dataUser.token ?
        <Link onClick = {logout}>
            Logout
            </Link>:
            <Link to = '/login'>
                Login </Link>

    }


</Menu.Item>
<Menu.Item key = '5'>
 <Link to = '/Register'>Register</Link>
</Menu.Item>
<Menu.Item key = '6'>
    <Link to = '/checkout'>Cart</Link>
</Menu.Item>

</Menu>
</Header>
<Content
className="site-layout-background"
style={{
// margin: '24px 16px',
// padding: 24,
// minHeight: 280,
}}
>
{/* this is for the route paths */}
<Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                     <Route path="/register">
                        <Register />
                    </Route> 
                    <Route path="/custom/:product/:style">
                        <CustomPage />
                    </Route>
                    <Route path="/measurement/:product">
                        <Measurement />
                    </Route>

                 
                  
                    <Route path = '/checkout'>
                        <Checkout/>

 
                    </Route>
                    
                   
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>


</Content>
<Footer className="footer">Footer</Footer>
</Layout >
)


}

const mapStateToProps = state => {
    const {User} = state;

    return {
        dataUser: User
    }
}

const mapDispatchToProps = {
    SetUser, ResetUser, ResetCustom
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
