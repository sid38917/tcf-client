
import React from 'react';
import { Row,Col, Image, Button } from 'antd';

import { Link } from 'react-router-dom'

const SlideHome = () => {
    return (
        <>
        <div style= {{width: '100%', height: '50vh', display: 'flex', justifyContent:'center', margin: '0', padding: '0'}}>
            <Image height = {420} src = "https://i.ibb.co/pJxr68D/image-removebg-preview-1.png"/>
            <div style= {{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '10px', padding: '50px' }}>
                <h1 style = {{fontWeight: 'bold', textAlign: 'right', fontSize: '40px', marginBottom: '50px'}}>
                    DISCOVER TRUE TAILORING
                </h1>
                <div style = {{textAlign: 'right', fontSize: '18px', marginBotton: '0'}}>
                    <p>Custom Tailored Suits, Jackets, Shirts, and trousers by choosing from more than 100+ fabrics.</p>
                    <p>Design your attire at Theclassyfit.co.id and forget about standard sizes</p>
                    <p>because all our suits are 100% made to measure.</p>
                </div>
            </div>
        </div>
        <div style = {{ backgroundColor: '#fff', width: '100vw', margin: '0', height: '50vh' }}>
            <Row justify = 'center' style={{ margin: '30px' }}>
                <h2> WHAT ARE YOU LOOKING FOR </h2>
            </Row>
            <Row justify = 'center' gutter={[32,16]}>
                <Col span = {6} justify ='center' style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Image height = {200} src = 'https://i.ibb.co/WGc3pyN/unamed-3.png'/>
                    <Button style = {{ width: '200px', margin: '5px', backgroundColor: 'black', color: 'white' }}>
                    <Link to = '/custom/suits/fabric'>Suits</Link>
                    </Button>
                </Col>
                <Col span = {6} justify = 'center' style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image height = {200} src = 'https://i.ibb.co/5ThYzG9/unamed-2.png'/>
                <Button style = {{width: '200px', margin: '5px', backgroundColor: 'black', color: 'white'}}>
                <Link to = '/custom/shirts/fabric'>
                    Shirts
                </Link>
                </Button>
              </Col>
              <Col span = {6} justify = 'center' style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image height = {200} src = 'https://i.ibb.co/7RrYZYj/unamed-1.png'/>
                <Button style = {{width: '200px', margin: '5px', backgroundColor: 'black', color: 'white'}}>
                <Link to = '/custom/trousers/fabric'>
                    Trousers
                </Link>
                </Button>
              </Col>
              <Col span = {6} justify = 'center' style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image height = {200} src = 'https://i.ibb.co/Z8x7Qrh/unnamed.png'/>
                <Button style = {{width: '200px', margin: '5px', backgroundColor: 'black', color: 'white'}}>
                <Link to = '/custom/jacket/fabric'>
                    Jacket
                </Link>
                </Button>
              </Col>

            </Row>
        </div>

        </>
    )
} 

export default SlideHome;