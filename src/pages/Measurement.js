
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import { Row, Col, Image, Button, Modal, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import {  SetUser } from '../stores/action';
import {connect} from 'react-redux'
import { FixValueMeasurement } from '../stores/action';
import { SetMeasurement } from '../stores/action';
import { ConsoleSqlOutlined, HistoryOutlined } from '@ant-design/icons';
import { ManualMeasurement, StandardSizing, FormLogin, BodyType} from '../components';
import { SetBody } from '../stores/action/customAction';
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
    const [modalUnits, setModalUnits] = useState('')
    const [modalLogin, setModalLogin] = useState(false)

    const [manualView, setManualView] = useState(false)
    const [modalValidation, setModalValidation] = useState(false)


//checks if the user has logged in, if they haven't the modal login will appear 
    const onSave = () => {

        const status = validationMeasurement()

        if(status === 'next') {
            if(!dataUser.token) {
                setModalLogin(true)
            } else {
                history.push(`/checkout`)
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

    
//the following code uses has three variables, status, standard and manual
//with the dataCustom useState array of objects being mapped to find 
//the measurement data, and check if the user has selected a measurement option
//the two measurement options include standard sizing and manual input
//and if there is data for standard sizing option, standard is set as true
//same with the manual measurement data. If both remain false
//the stats returns error, and if both are chosen, a modal will appear that 
//requires the user to choose between those two
//otherwise the status is set as next to allow the user to move on to the next page. 
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

        // console.log(standard, 'standard')
        // console.log(manual, 'manual')
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

    //for determining the product 
    useEffect(() => {
        
        const filterData = dataStore.find((item) => item.product === params.product)

        console.log(filterData, 'filter data')

        setDataCustom(filterData)

      

    }, [dataStore.length, params])

 
    if(manualView) {
        return <ManualMeasurement setManualView = {setManualView}/>
    }
   


    //the purpose of this to taken an option, through the use of event handling
    //and takes in an id, standard or manual, for the two measurement options
    //as the user is required to pick one if both fields are chosen
    //this is determined through the validation measurement function
    //if an option is chosen, the FixValueMeasurement action from Redux
    //is called, and takes in the option, and the params 
    //the purpose of this redux action is to clear the data for one of the 
    //measurement data
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
        {/* {JSON.stringify(dataStore)} */}
            <h3>CHOOSE MEASUREMENT OPTION </h3>
            <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '30vh', backgroundColor: 'red', alignItems: 'center'}}>
            <Button style = {{marginRight: 10}} onClick={() => fixOption('manual')}>
                Manual
            </Button>
            <Button onClick = {() => fixOption('standard') }>Standard Sizing</Button>
            </div>
        </Modal>
         <Modal visible = {modalLogin} onCancel = {() => setModalLogin(false)}>
            <FormLogin setModalLogin = {setModalLogin} onSuccess = {() => history.push('/checkout')} />
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

            <BodyType  dataCustom = {dataCustom} params = {params} {...props}/>



<Button style = {{width: 100}} onClick = {() => onSave()} className = 'button-primary'>CHECKOUT</Button>

</Row>
<StandardSizing style = {{  flexDirection: 'row'}} viewModal = {viewModal} setViewModal = {setViewModal} dataCustom={dataCustom} params ={params} {...props} />
           
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
    FixValueMeasurement,
    SetBody
  };

export default connect(mapStateToProps, mapDispatchToProps)(Measurement)