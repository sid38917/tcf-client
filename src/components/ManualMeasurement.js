
import React, {useState, useEffect} from 'react'
import {Row, Col, Image, Button, Modal, Select, Input} from 'antd'
import { CaretRightOutlined} from '@ant-design/icons';

import {connect} from 'react-redux';
import {setUser, SetMeasurement, SetUser} from '../stores/action'
import dataMeasurementShirt from '../data/dataMeasurementShirt'; 
import dataMeasurementSuit from '../data/dataMeasurementSuit';
import dataMeasurementTrouser from '../data/dataMeasurementTrouser';
import dataMeasurementJacket from '../data/dataMeasurementJacket';
import { useHistory, useParams} from 'react-router-dom';



const ManualMeasurement = (props) => {
    const {Option} = Select
    const [unit, setUnit] = useState('cm')
    const history = useHistory()
    const params = useParams();
    const [viewModal, setViewModal] = useState(false);
    const [option, setOption] = useState([]);
    const [units, setUnits] = useState('');
    const {dataUser, SetUser, dataStore, SetMeasurement, setManualView} = props;

    const data = ["NECK", "CHEST", "WAIST", "HIP", "SEAT", "SHIRT LENGTH", "SHOULDER WIDTH", "ARM LENGTH", "WRIST"]
    const [currentData, setCurrentData] = useState({
        name: '',
        url: '',
        value: ''
    }); //how the data will be stored 
    const [modalLogin, setModalLogin] = useState(false);
    const [input, setInput] = useState('')

    const [dataCustom, setDataCustom] = useState([])

  

   //starts the data from 0, and if one of the options is chosen then the dataoutputs
   //since everything is different 

    useEffect(() => {
      
        const {product} = params
        console.log(params, ' ')
        if(product === 'suits') {
            setOption(dataMeasurementSuit)
            setCurrentData(dataMeasurementSuit[0])
        } else if (product === 'shirt'){
            setOption(dataMeasurementShirt)
            setCurrentData(dataMeasurementShirt[0])
        } else if (product === 'trousers') {
            setOption(dataMeasurementTrouser)
            setCurrentData(dataMeasurementTrouser[0])
        } else if (product === 'jacket') {
            setOption(dataMeasurementJacket)
            setCurrentData(dataMeasurementJacket[0])
        }
    }, [params])

    
//to get the product 
    useEffect(() => {
        
        
        const filterData = dataStore.find((item) => item.product === params.product)

        console.log(filterData, 'filter data')

        setDataCustom(filterData)

    }, [dataStore.length, params])




useEffect(() => {
    if(dataCustom.measurement) {
        const newOptions =  option.map((item) => {
            const found = dataCustom.measurement.find((m) => m.name === item.name)
            if(found) {
                item.value = found.value
            }
            return item
        })
        setOption(newOptions)
    }
}, [dataCustom, currentData])

    const onSave = () => {
        setManualView( false)

       
       //     setModalLogin(true)
        

        
    }


    //for inputting data 
    const inputData = (e) => {
        console.log(e.target.value, currentData, params)
        const newOptions = option.map((item) => {
            if(item.name === currentData.name) {
                item.value = e.target.value
                item.unit = unit
                
            }
            return item;
        })
        setOption(newOptions)

        
        //this is the data that gets sent to the database, the currentData is spread, which allows the objects to appear, and then 
        //the value is what the user has chosen, and the name of it, and then the unit is the units 
        const payload = {
            ...currentData,
            value: e.target.value,
            unit: unit
        } 
        SetMeasurement(payload, params)
        console.log(payload, params)
    }

    const activeButton = (item) => {
        const found = dataCustom.measurement.find((c) => c.name === item.name)
        if(item.name === currentData.name) {
            return {
                backgroundColor: '#000',
                color: '#fff'
            }
        } else if(found) {
            return {
            backgroundColor: 'blue',
            color: '#fff'
            }
        }
    }
   
     //GUI
    return (
        <>
        <Modal visible = {modalLogin} onCancel= {() => setModalLogin(false)}>
            <h2>Login Test</h2>
        </Modal>
        <Row justify = 'center'>
            <h2>Manual Input Measurement</h2>

        </Row>
        <Row justify = 'center'>
            {/* For setting the units  */}
        <Select value = {unit} onChange = {(value) => setUnit(value)} placeholder = 'Units' style = {{width: '200px'}}>
            <Option value = 'cm'>Metric</Option>
            <Option value = 'in'>Imperial</Option>
        </Select>
        </Row>
         <Row justify = 'center' style = {{margin: 20}}>
            <Col span = {6}>
               <iframe width="100%" height="553" src= {currentData.url} allowfullscreen></iframe>
            </Col>
            <Col span = {4}>
                {
                     option.map((item) => (
                        <Button style = {{margin: '5px', backgroundColor: 'transparent', width: '100%', ...activeButton(item)}}  onClick={() => setCurrentData(item)}> 
                            <CaretRightOutlined/>{item.name}
                        </Button>
                    ))
                }
            </Col>   
         </Row>
         
         <Row justify = 'center'>
        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent:'center'}}>
            <h3>{currentData.name} - ({unit})</h3>
        <Input type = 'number' placeholder = 'Input Here' style = {{margin: 10}} value = {currentData.value} onChange = {inputData}/>
        <Button className = 'button-primary' onClick = {onSave} >
            Save
        </Button>
        
        </div>
        
       
        </Row>  
        </>
    )

  
    
    
}

const mapStateToProps = state => {
    const {User, Custom} = state;

    return {
        dataUser: User,
        dataStore: Custom.data
    }

}



const mapDispatchToProps = {
   SetUser, SetMeasurement
}

export default connect(mapStateToProps, mapDispatchToProps)(ManualMeasurement)
