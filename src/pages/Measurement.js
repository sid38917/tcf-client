
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import { Row, Col, Image, Button, Modal, Select, Link, message } from 'antd';
import {  SetUser } from '../stores/action';
import {connect} from 'react-redux'
import { FixValueMeasurement } from '../stores/action';
import { SetMeasurement } from '../stores/action';
import { ConsoleSqlOutlined, HistoryOutlined } from '@ant-design/icons';
import { ManualMeasurement, StandardSizing, FormLogin } from '../components';
const {Option} = Select;

const Measurement = (props) => {
    
    const [viewModal, setViewModal] = useState(false) //false so that it doesnt pop up immediatelly
    const history = useHistory()
    const params = useParams();
    const {dataUser, SetUser, dataStore, SetMeasurement, FixValueMeasurement} = props;
    const [dataCustom, setDataCustom] = useState('')
    const [fit, setFit] = useState('')
    const [size, setSize] = useState('')
    const [active, setActive] = useState('measurement')

    const [modalLogin, setModalLogin] = useState(false)

    const [manualView, setManualView] = useState(false)
    const [modalValidation, setModalValidation] = useState(false)



    const onSave = () => {
        setManualView (false)
        setModalValidation(true)

        const status = validationMeasurement()
        if(status === 'next') {

           if(!dataUser.token) {
            setModalLogin(true)
            return console.log('cant save')

        } else {
            history.push('/checkout');
            return console.log('save')
        }
    } else if (status === 'modal') {
        setModalValidation(true)
    } else if (status === 'error') {
        error()
    }
    }

    const error = () => {
        return message.error("you haven't filled everything up")
    }

    

    const validationMeasurement = (() => {
        let status = true;
        let standard = false
        let manual = false

        dataCustom.measurement.map((item) => {
            
            if(item.name === 'FIT' || item.name === 'SIZE' ) {
                if(item.value) {
                    standard = true
                }
            } else {
                if(item.value){
                manual = true
                }
            }
        })

        if(!standard && !manual) {
            return status = 'error'
        } else if(standard && manual) {
            return status = 'modal'
        } else {
            return status = 'next'
        }

        console.log(standard, 'standard')
        console.log(manual, 'manual')
    }
    )


    
    
    
 
    function handleActive(status) {
        if(status === 'next') {
            if(active === 'measurement') {
            history.push(`/custom/${params.product}/checkout`)
            setActive('cart')
            }
        } else if (active === 'back') {
            if(active === 'measurement') {
                history.push(`/custom/${params.product}/customize`)
                setActive('customize')
            }
        }
    }

    useEffect(() => {
        
        const filterData = dataStore.find((item) => item.product === params.product)

        console.log(filterData, 'filter data')

        setDataCustom(filterData)

      

    }, [dataStore.length, params])

 
    if(manualView) {
        return <ManualMeasurement setManualView = {setManualView}/>
    }
   
    const fixOption = (option) => {
        console.log(option)
        if(option === 'standard' ) {
            FixValueMeasurement('standard', params)
        } else {
            FixValueMeasurement('manual', params)
        }

       onSave()

    }   

    return (
        <>
        
        <Modal visible = {modalValidation} onCancel = {() => setModalValidation(false)} footer = {null}>
        {JSON.stringify(dataStore)}
            <h3>CHOOSE MEASUREMENT OPTION </h3>
            <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '30vh', backgroundColor: 'red', alignItems: 'center'}}>
            <Button style = {{marginRight: 10}} onClick={() => fixOption('manual')}>
                Manual
            </Button>
            <Button onClick = {() => fixOption('standard') }>Standard Sizing</Button>
            </div>
        </Modal>
         <Modal visible = {modalLogin} onCancel = {() => setModalLogin(false)}>
            <FormLogin/>
        </Modal>
            <Row>
                <h2>Measurement Options</h2>
            </Row>
            <Row gutter = {5} justify = 'center'>
                <Col span = {6} style = {{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
                    <h3>Manual Input</h3>
                    <Image width = {200} src = 'https://i.ibb.co/9G0cDCG/image-1.png'/>
                        <Button style = {{backgroundColor: 'black', width: '100', color: 'white'}} onClick = {() => setManualView(true)}>
                            Choose
                        </Button>
                    
                </Col>
                <Col span = {6} style = {{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
                    <h3>STANDARD SIZING</h3>
                    <Image width = {200} src = 'https://i.ibb.co/m8XH3j2/image-2.png'/>
                        <Button style = {{backgroundColor: 'black', width: '100', color: 'white'}} onClick = {() => setViewModal(true)}>
                            Choose
                        </Button>
                    
                </Col>
            </Row>
            <Row justify = 'center style' style = {{marginTop: 20}}>

<Button style = {{width: 200}} onClick = {() => onSave()} className = 'button-primary'>CHECKOUT</Button>

</Row>
<StandardSizing viewModal = {viewModal} setViewModal = {setViewModal} dataCustom={dataCustom} params ={params} {...props} />
           
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
    SetUser,
    SetMeasurement,
    FixValueMeasurement
  };

export default connect(mapStateToProps, mapDispatchToProps)(Measurement)