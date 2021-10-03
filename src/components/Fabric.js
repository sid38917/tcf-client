import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Divider, Card, Select } from 'antd'
import {dataFabrics, dataFabricShirt} from '../data/dataFabric'
import {useParams} from 'react-router-dom'

const { Option } = Select;

const Fabric = (props) => {
    const {data, SetData} = props
    const [selectedItem, SetSelectedItem] = useState([])
    const [fabricOptions, SetFabricOptions] = useState([])
    const [listFabrics, SetListFabrics] = useState([])
    const [color, SetColor] = useState('blue')
    const [design, SetDesign] = useState("")
    const params = useParams()

    useEffect(() => {
        if (color || design) {
            let filterData = fabricOptions.filter((item) => item.color === color && item.type === design)
            SetListFabrics(filterData)
        } else {
            SetListFabrics(data)
        }
    }, [color, design])

    useEffect(() => {
        const {product} = params
        if (product === 'shirts'){
            SetFabricOptions(dataFabricShirt)
            SetListFabrics(dataFabricShirt)
        } else {
            SetFabricOptions(dataFabrics)
            SetListFabrics(dataFabrics)
        }
    }, [params])

    function borderColor(image) {
        console.log(data)
        if (!data) { 
            return ''
        }
        if (data.fabric && image.name === data.fabric.name) {
            return 'red'
        } else {
            return ''
        }
    
        
    }

    return (
        <div style={{ flexDirection: 'column', width: '60%' }}>
            <Divider />
            <Row>
                <h2>
                    Select Fabric
                </h2>
            </Row>
            

            <Row justify='center'>
                <Select placeholder='Color' style={{ width: 200, marginRight: '5px' }}
                    onChange={(value) => SetColor(value)}

                >
                    <Option value = 'blue'>blue</Option>
                        <Option value = 'black'>black</Option>
                        <Option value = 'red'>red</Option>
                        <Option value = 'green'>green</Option>
                        <Option value = 'purple'>purple</Option>
                        <Option value = 'grey'>grey</Option>
                        <Option value = 'pink'>pink</Option>
                        <Option value = 'white'>white</Option>
                </Select>
                <Select placeholder='Design' style={{ width: 200, marginRight: '5px' }}
                    onChange={(value) => SetDesign(value)}
                >
                    <Option value = 'plain'>plain</Option>
                        <Option value = 'stripes'>stripes</Option>
                        <Option value = 'checks'>checks</Option>
                        <Option value = 'paisley'>paisley</Option>
                        <Option value = 'herringbone'>herringbone</Option>
                        <Option value = 'houndstooth'>houndstooth</Option>
                        <Option value = 'print'>print</Option>
                </Select>
            </Row>

            <Row justify='center' gutter={[16, 16]} >
                {
                    listFabrics.map((item) => {
                       
                        return (
                            <Col>
                                <Card
                                    style={{ flexDirection: 'column', margin: '5px', width: "200px", cursor: 'pointer', padding: 0, borderColor: borderColor(item) }}
                                    onClick={() => SetData(item, params)} >
                                    <Image src={item.url} preview={false} />
                                    <h2>{item.name}</h2>
                                    <p>{item.color}</p>
                                    <p>{item.type}</p>
                                    <p>{item.price}</p>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default Fabric