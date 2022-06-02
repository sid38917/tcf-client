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
//dataStore holds the customization data 
    
    const history = useHistory()
const [loading, setLoading] = useState(false) //loading 
    const [active, setActive] = useState('cart'); //active cart 
    const [viewCustom, setViewCustom] = useState(false) //viewing your customization 


useEffect(() => {
    const getTransaction = () => {
    if(!dataUser.token) {
        history.push('/')
    }
}
})


//menu 
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
    
//if a component is pressed then it will take the user to this page 
   const activeHandler = ()  => {
    
    
 
       if(active === 'cart'){
           return <Cart dataCustom = {dataStore}/>
       } else if (active === 'delivery') {
           return <Delivery dataCustom = {dataStore}/>
       } else if (active === 'payment') {
            return <Payment data = {dataStore} dataUser = {dataUser}/>
       }

   }

   //if the component is chosen the color will be white 

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

//error that returns if there is an error, 

const error = () => {
    return message.error("you haven't filled everything up")
}

//valudation will be true if all of this is inputted so this checks 

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


    


//if next is pressed it will go to the next page

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

//this is the cost that the user will have to pay, and the price is determined by the
//the price of the fabric, additionally if the user is not from jakarta
//they will have to pay extra determined price 


//the following code conveys how the price of the product is determined
//dataStore, which is passed as a prop through redux, by the mapStateToProps function
// includes the customization data taken from the current state. it then searches the state
//for the fabric price. It then checks dataUser, which holds the delivery information 
//of the user, to see if the city is jakarta. If it isn't the shipping costs gets added by 250000,
//and if it is, then the shipping cost is free. The total is utlimatley determined through the price of the fabric
//obtained from the fabric data stored in the state, plus the shipping cost. 
//the payload is then passed, which includes delivery, shippingcost, itemsTotal, total, and items.
//it is stored in this payload to be posted with the POST action to the backend
//in order to be stored in the database. 
const order = () => {

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



    //POST method, with the functiion of posting data to the backend. 
    //it posts the token of the user, which allows for accessing the id of the user
    //in order to determine which user's order it is placed under, through the customer objectId
    //Additionally, the customization data is passed 
    axios({
        method: 'post',
        url: 'http://localhost:4000/transaction',
        headers: {
            token: dataUser.token
        }, data: payload
    })
    .then((res) => {
        console.log(res.data) //the user data, this is where the userData gets pushed 
        message.success('order success')
        history.push('/')
    })
    .catch((err) => {
        console.log('error', err)
        message.error('order error')
    })
    .finally(() => {
        setLoading(false)
    })

    // axios.post('https://localhost:4000/transaction',  {
        
    //     delivery: dataUser.delivery,
    //     shipping: shippingCost,
    //     itemsTotal: itemsTotal,
    //     total: total,
    //     items: dataStore
    // })
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
      {/* {JSON.stringify(dataStore)} */}
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
