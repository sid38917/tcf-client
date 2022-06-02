import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Divider, Card, Select } from 'antd'
import {dataAll, dataShirt, dataFabric, dataFabricShirt} from '../data/dataFabric'
import {useParams} from 'react-router-dom'

const { Option } = Select;

const Fabric = (props) => {
    const {data, SetData} = props
    const [fabricOptions, SetFabricOptions] = useState([])
    const [listFabrics, setListFabrics] = useState([])
    const [color, setColor] = useState("blue")
    const [design, setDesign] = useState("")
    const params = useParams()


    


    //uses useEffect, checks the color and design chosen by the user
    //which are useState variables, and are updated based on the dropdown menu chosen from the GUI
     // The state for these variables are updated through user interaction 
     //such as the onClick function which takes in the variable value
     //to determine what optiosn the user has chosen
    //the following filters the fabric list to display the user's options based on the color and design
    //a new array is created with the filtered data, as fabricOptions, which holds the fabric data is filtered
    //the list is then updated based on the GUI
    //if nothing is done, the list will display all the options

    useEffect(() => {
        if (color || design) {
            let filterData = fabricOptions.filter((item) => item.color === color && item.type === design)
            setListFabrics(filterData)
        } else {
            setListFabrics(data)
        }
    }, [color, design])


    //sets the list of fabrics 
    //products is used as params, because as the link of the website
    //if the product chosen is shirts, based on what is shown on the top, then 
    //the list that will be shown is the shirt data, otherwise the other data wil be shown 


    //product is passed from params,
    //based on the product chosen, the list of fabrics that will display is different
    useEffect(() => {
        const {product} = params
        if (product === 'shirts'){
            SetFabricOptions(dataFabricShirt)
            setListFabrics(dataFabricShirt)
        } else {
            SetFabricOptions(dataFabric)
            setListFabrics(dataFabric)
        }
    }, [params])


    //chekcs if there is data, and if there is no exisiting data, then the border color will be blank
    //if the fabric data is euqual to the data chosen for the fabric, then the border color willturn red 
    function borderColor(image) {
        // console.log(data)
        if (!data) {
            return ""
        }

        if (data.fabric && image.name === data.fabric.name) {
            return "red"
        } else {
            return ""
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
            
{/* for the dropdown menu  */}
            <Row justify="center">
                <Select placeholder="Color" style={{ width: 200, marginRight: '5px' }}
                    onChange={(value) => setColor(value)}

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
                <Select placeholder="Design" style={{ width: 200, marginRight: '5px' }}
                    onChange={(value) => setDesign(value)}
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

            <Row justify="center" gutter={[16, 16]} >
                {
                    listFabrics.map((item) => {
                        return (
                            <Col>
                                <Card
                                    style={{ flexDirection: 'column', margin: '5px', width: "200px", cursor: 'pointer', padding: 0, borderColor: borderColor(item) }}
                                    onClick={() => SetData(item, params)}
                                >
                                    <Image src={item.url} preview={false} />
                                    <h2>{item.name}</h2>
                                    <p>{item.color}</p>
                                    <p>{item.type}</p>
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