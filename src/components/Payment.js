import React, {useState, useEffect} from 'react';
import { Row, Card, Input, Col } from 'antd';

const Payment = (props) => {
    const {data, dataUser} = props
    const [itemsTotal, setItemsTotal] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        
        let itemTotal = 0
        let shippingCost = 0

        data.map((item) => {
            itemTotal += item.fabric.price
        })
        if(dataUser.delivery.city.toLowerCase() !== 'jakarta') {
            shippingCost += 250000
        } else {
            shippingCost += 0
        }

        let total = shippingCost + itemTotal


        setItemsTotal(itemTotal)
        setShipping(shippingCost)
        setTotal(total)
        
        

        
    }, [data])
    return (<>
        <Row justify = 'center' style = {{marginTop: '50vh', minWidth: '50vw'}}>

            <div style = {{minWidth: '50vw', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingLeft: 20}}>
                {JSON.stringify(data)}
                <Row justify = 'start' style = {{marginTop: 10, marginBottom: 10}}>
                    <Col span = {8}>
                    <h3>Items Total: </h3>
                    </Col>
                    <Col span = {16} style = {{display: 'flex'}}>
                        <h3>Rp. </h3>
                    <Input value = {itemsTotal} style = {{width:200, marginLeft: 10}} disabled />
                    </Col>
                </Row>

                <Row justify = 'start' style = {{marginTop: 10, marginBottom: 10}}>
                    <Col span = {8}>
                    <h3>Shipping </h3>
                    </Col>
                    <Col span = {16} style = {{display: 'flex'}}>
                        <h3>Rp. </h3>
                    <Input value = {shipping} style = {{width:200, marginLeft: 10}} disabled />
                    </Col>
                </Row>

                <Row justify = 'start' style = {{marginTop: 10, marginBottom: 10}}>
                    <Col span = {8}>
                    <h3>Total: </h3>
                    </Col>
                    <Col span = {16} style = {{display: 'flex'}}>
                        <h3>Rp. </h3>
                    <Input value = {total} style = {{width:200, marginLeft: 10}} disabled />
                    </Col>
                </Row>
             
            </div>
        </Row>

    </>)
}

export default Payment