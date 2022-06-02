import {useState} from 'react'
import { Row,  Image, Space, Button, Typography, Modal } from "antd";
import { EndCustomize, MeasurementTable } from ".";
import {useDispatch} from 'react-redux'
import {ResetCustom} from '../stores/action'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
const { Title } = Typography;
//dataCustom, which is the custom data chosen by the user is passed here 
const Cart = ({ dataCustom }) => {
  const [viewCustom, setViewCustom] = useState(false) //viewing the customizations chosen
  const [ viewMeasurement, setViewMeasurement] = useState(false) //viewing the measurement options chosen
  const [currentData, setCurrentData] = useState('') //dataa
  const dispatch = useDispatch()
  const history = useHistory() //history is used to push to other pages
  //this is to handle the image, so when a product is chosen for instance suits, then the standard  of the suit is shown in the cart page 
  const handleImage = (product) => {
    switch (product) {
      case 'suits':
        return 'https://i.ibb.co/WGc3pyN/unamed-3.png';
      case 'shirts':
        return 'https://i.ibb.co/5ThYzG9/unamed-2.png';
      case 'trousers':
        return "https://i.ibb.co/7RrYZYj/unamed-1.png";
      case 'jackets':
        return 'https://i.ibb.co/Z8x7Qrh/unnamed.png';
      default:
        break;
    }
  };


  
  return (
    <>
    {/* modal visible is basically the modal pop up, so it is initially set as false, and then when cancelled it set as false so that it closes  */}
     <Modal visible={viewCustom} onCancel={() => setViewCustom(false)} footer={null}>
      <EndCustomize data={currentData} /> {/* the current data chosen is set to endCustomize in order for it to print the modal */}
    </Modal>
    {/* You could set footer to null if you don't need default footer buttons.

 */}
    <Modal visible={viewMeasurement} onCancel={() => setViewMeasurement(false)}>
      <MeasurementTable data={currentData.measurement} />
    </Modal> 
    {/*this maps the data, so what it does it creates a row and then it prints the product image, the price, the name, the customization and measurement button, etc.  */}
      {dataCustom.map((item) => (
        <Row justify='center'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '75vw',
              backgroundColor: '#fff',
              minHeight: '15vh',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            
            <div className='flex-center'>
              <Image width={100} src={handleImage(item.product)} />
            </div>
            <div style={{ width: '50%', borderWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 20,
                }}
              >
                <Title className='text-low-margin' level={4}>
                  {item.fabric.name}
                </Title>
                <p className='text-low-margin'>Category: {item.product}</p>
                <Title level={4}>CUSTOMIZATION:</Title>
                <Space>
                  <Button onClick={() => {
                    history.push(`/custom/${item.product}/fabric`)
                  }}>Edit</Button>
                  <Button onClick={() => {
                    setCurrentData(item)
                    setViewCustom(true)}}>View</Button>
                </Space>

                <Title level={4}>MEASUREMENTS:</Title>
                <Space>
                  <Button 
                  onClick={() => {
                    history.push(`/measurement/${item.product}`)
                  }}
                  >Edit</Button>
                  <Button
                  onClick={() => {
                    setCurrentData(item)
                    setViewMeasurement(true)}}
                  >View</Button>
                </Space>
              </div>
            </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h3>Rp. {item.fabric.price}</h3>
                <Button danger style={{marginTop: 10}}
                onClick={() => dispatch(ResetCustom(item.product))}
                >Delete</Button>
              </div>
          </div>
        </Row>
      ))}
    </>
  );
};

export default Cart;