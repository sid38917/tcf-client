import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import { SetUser } from '../stores/action';
import { SetFabric } from '../stores/action';
import { SetCustomize } from '../stores/action';
import { Row, Col, Card, Image, Divider, Button, Empty, Modal, Message, message, Spin } from 'antd';
import Column from 'antd/lib/table/Column';
import { Cart, Delivery, EndCustomize, Payment } from '../components';

import axios from 'axios';
import {ResetCustom} from '../stores/action'
import { useHistory } from 'react-router';




const Checkout = ({dataStore, dataUser, ResetCustom}) => {

    
    const history = useHistory()
const [loading, setLoading] = useState(false)
    const [active, setActive] = useState('cart');
    const [viewCustom, setViewCustom] = useState(false)

useEffect(() => {
    const getTransaction = () => {
    if(!dataUser.token) {
        history.push('/')
    }
}
})

    const menu = [
        {
            title: 'CART',
            value:'cart'
        }, {
            title: 'DELIVERY', 
            value: 'delivery'
        },
        {
            title: 'PAYMENT',
            value: 'payment'
        }
    ]
    
   const activeHandler = ()  => {
    
    
 
       if(active === 'cart'){
           return <Cart dataCustom = {dataStore}/>
       } else if (active === 'delivery') {
           return <Delivery dataCustom = {dataStore}/>
       } else if (active === 'payment') {
            return <Payment data = {dataStore} dataUser = {dataUser}/>
       }

   }

   const styleActive = (item) => {
       if(active === item) {
           return {
               backgroundColor: 'white',
               color: 'black'
           }
       } else {
           return {
               backgroundColor: 'black',
               color: 'white'
           }
       }
   }

   if(dataStore.length === 0) {
    return (
        <>
        <Row justify = 'center' style = {{marginBottom: 20}}>
            Checkout Page
        </Row>
        <Divider/>
        <Empty/>
        <Divider/>
        </>
    )
}

const error = () => {
    return message.error("you haven't filled everything up")
}

const validationDelivery = () => {
    const delivery = dataUser.delivery
    const {
        firstName, 
        lastName, 
        mobileNumber, 
        state,
        city,
        country, 
        postCode, 
        address
    } = delivery

    console.log('data', delivery)


    if(!firstName || !lastName 
        || !mobileNumber || !state
         || !city || !country 
         || !postCode || !address) {
        console.log('delivery', delivery)
        return false
    } else { 
        return true
    }
}


    


const onNext = () => {


    
    

    if(active ===  'cart') {
        setActive('delivery')
    } else if (active === 'delivery') {
        let status = validationDelivery()
        console.log(status, 'status')
       if( status ) {
           setActive('payment')
       } else {
           error()
       }
        
    }


}

const order = () => {
    console.log('data user', dataUser)
    console.log('_________')
    console.log('dataStore', dataStore)

    let itemsTotal = 0
    let shippingCost = 0



    dataStore.map((item) => {
        itemsTotal += item.fabric.price
        return item
    })

    if(dataUser.delivery.city.toLowerCase() !== 'jakarta') {
        shippingCost += 250000
    } else {
        shippingCost += 0
    }

    let total = shippingCost + itemsTotal

    


    

    console.log(itemsTotal, shippingCost, total)

    let payload = {
        delivery: dataUser.delivery,
        shippingCost: shippingCost,
        itemsTotal: itemsTotal,
        total: total,
        items: dataStore
    }

    axios({
        method: 'post',
        url: 'http://localhost:4000/transaction',
        headers: {
            token: dataUser.token
        }, data: payload
    })
    .then((res) => {
        console.log(res.data)
        message.success('order success')
        history.push('/transaction')
    })
    .catch((err) => {
        console.log('error', err)
        message.error('order error')
    })
    .finally(() => {
        setLoading(false)
    })

    axios.post('https://localhost:4000/transaction',  {
        
        delivery: dataUser.delivery,
        shipping: shippingCost,
        itemsTotal: itemsTotal,
        total: total,
        items: dataStore
    })
}
  

return (
    <>
   
    <div style={{ paddingLeft: 100, paddingRight: 100 }}>
      <Divider />
      <Row justify='center' style={{ marginBottom: 20 }}>
        Checkout Page
      </Row>
      <Row gutter={8}>
        {menu.map((item) => (
          <Col
            className='flex-center button-div'
            onClick={() =>{ 
                if(item.value === 'payment') {let status = validationDelivery()
                     if(status) {
                         setActive('payment')
                     }else {
                            error()
                        } 
                    }else {
                        setActive(item.value)
                     }}}
            style={styleActive(item.value)}
            span={8}
          >
            <h3 className={active !== item.value && 'text-white'}>
              {item.title}
            </h3>
          </Col>
        ))}
      </Row>
      <div>{activeHandler()}</div>
      <Divider />
      {JSON.stringify(dataStore)}
      <Row
        justify='end'
        style={{
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <div>
          {active !== 'cart' && (
            <Button
              style={{
                backgroundColor: '#000',
                color: '#fff',
                marginRight: 10,
                width: 200,
              }}
              onClick={() => {
                if (active === 'delivery') {
                  setActive('cart');
                } else if (active === 'payment') {
                  setActive('delivery');
                }
              }}
            >
              Back
            </Button>
          )}
          {active !== 'payment' && (
            <Button
              style={{ backgroundColor: '#000', color: '#fff', width: 200 }}
              onClick={
               onNext
              }
              
            >
              Next
            </Button>
          )}
          {active === 'payment' && (
            <Button
            onClick={order}
              type='primary'
              style={{ color: '#fff', width: 200 }}
              disabled={loading}> { loading ? <Spin tip = 'loading..'></Spin> : 'Submit' }
              
              
             
            
              Order
            </Button>
          )}
        </div>
      </Row>
    </div>
    </>
  );


}

const mapStateToProps = (state)=> {
    const { User, Custom} = state;

    const filterData = Custom.data.filter((item) => item.fabric)
    return {
        dataUser: User,
        dataStore: filterData,
    
    }
  
}

const mapDispatchToProps = {
    ResetCustom
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
