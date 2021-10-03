import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import { Row, Col, Image, Button, Modal, Select, Link } from 'antd';
import { SetUser } from '../stores/action';
import {connect} from 'react-redux'

import { SetMeasurement } from '../stores/action';
import { HistoryOutlined } from '@ant-design/icons';

const {Option} = Select


const StandardSizing = (props) => {

    const [fit, setFit] = useState('')
    const [size, setSize] = useState('')
    const {dataUser, SetUser, dataStore, SetMeasurement, dataCustom, viewModal, setViewModal} = props;
    const params = useParams()

    useEffect(() => {

        if(dataCustom.measurement){
            const foundFit = dataCustom.measurement.find((item) => item.name === 'FIT')
            const foundSize = dataCustom.measurement.find((item) => item.name === 'SIZE')
            if(foundFit) {
                
                setFit(foundFit)
            } if (foundSize) {
                setSize(foundSize)
            }
          
        }
    }, [fit, size, dataCustom]) 
    return (
    <>

<Modal visible = {viewModal} footer  = {null} onCancel = {() => setViewModal(false)}>
                <h2>Standard Sizing</h2>
                <Row justify = 'center' style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center'}}>
                    <h3>CHOOSE A FIT</h3>
                    <Select value = {fit.value} onSelect={(value) => {
                const payload = {
                    name: "FIT",
                    value: value
                }
                SetMeasurement(payload, params)
                setFit(payload)
            }} placeholder = 'FIT' style = {{width: 200, marginRight: '5px'}}>
                        <Option value = 'tight'>TIGHT</Option>
                        <Option value = 'loose'>LOOSE</Option>
                        <Option value = 'fitted'>FITTED</Option>
                    </Select>
                </Row>
                <Row justify = 'center' style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center'}}>
                    <h3>CHOOSE A SIZE</h3>
                    <Select value = {size.value} onSelect={(value) => {
                const payload = {
                    name: "SIZE",
                    value: value
                }
                SetMeasurement(payload, params)
                setSize(payload)
            }} placeholder = 'SIZE' style = {{width: 200, marginRight: '5px'}}>
                        <Option value = 'XS'>XS</Option>
                        <Option value = 'S'>S</Option>
                        <Option value  = 'M'>M</Option>
                        <Option value = 'L'>L</Option>
                        <Option value = 'XL'>XL</Option>
                        <Option value = 'XXL'>XXL</Option>
                    </Select>
                </Row>
                <Row justify = 'center'>
                    <Button className = 'button-primary' onClick = {() => setViewModal(false)}>Save</Button>
                </Row>
            
</Modal>
    </>
    )
}

export default StandardSizing