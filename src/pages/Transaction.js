import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Skeleton, message, Card, Row, Button, Col} from 'antd'
import { useHistory } from 'react-router';

const TransactionPage = () => {
    const dataUser = useSelector((state) => state.User)
    const history = useHistory()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getTransaction = () => {
        if(!dataUser.token) {
            history.push('/')
        }
        setLoading(true)
        axios({
            method: 'get',
            url: 'http://localhost:4000/transaction',
            headers: {
                token: dataUser.token
            }, 
        })
        .then((res) => {
            console.log('data', res.data.data)
            message.success('order success')
            setData(res.data.data)
           
        })
        .catch((err) => {
            console.log('error', err)
            message.error('order error')
        })
        .finally(() => {
            setLoading(false)
        })
    
    }
//modified from midtrans
    useEffect(() => {
        
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
        
        const myMidtransClientKey = 'SB-Mid-client-HN18HEB1sE1GGts4'; 
       
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
       
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        }
      }, []);

      const getPayment =(id) => {
          console.log('id', id)
        setLoading(true)
        axios({
            method: 'get',
            url: `http://localhost:4000/transaction/pay/${id}`,
            headers: {
                token: dataUser.token
            }
        }).then((res) => {
            console.log('data,', res.data.data)
            const dataPayment = res.data.data
            //modified from midtrans
            window.snap.pay(dataPayment.token,  {
                onSuccess: function(result){
                 
                  getTransaction()
                  alert("payment success!");
                   console.log(result);
                },
                onPending: function(result){
                
                  getTransaction()
                 
                },
                onError: function(result){
                  
                  getTransaction()
    
                  
                },
                onClose: function(){
              
                  getTransaction()
    
                  
                }
              } )

        }).catch((err) => {
            console.log('eror', err)
        }).finally(() => {
            setLoading(false)
        })
      }



    useEffect(() => {
    
    getTransaction()

    }, [])

    if(loading) {
        return <Skeleton active/>
    }


    return (
        <>

        <h2>Transaction</h2>
        {
            data.map((t) => (
                <Row justify = 'center'>
                    <Card style = {{width: '50%', direction: 'flex'}}  title = {`OrderId = ${t._id}`}>
                        <Row justify = 'space-between'>
                        <Col>
                            <p>Shipping Cost: {t.shipping}</p>
                            <p>Items Total: {t.itemsTotal}</p>

                        </Col>
                        <Col>
                            <h4>
                                Total: {t.total}


                            </h4>
                            <p>
                                Status: {t.status}
                            </p>

                            <Button style = {{width: '200px'}} onClick = {() => getPayment(t._id)}>
                                Pay
                            </Button>
                        </Col>
                        </Row>
                
                    </Card>

                </Row>
            ))
}
            
        {/* {JSON.stringify(data)} */}


        </>
    )
}

export default TransactionPage
