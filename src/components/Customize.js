import React, { useEffect, useState} from 'react';
import {CaretRightOutlined} from '@ant-design/icons';
import dataSuit from '../data/dataSuit';
import dataShirt from '../data/dataShirt';
import dataJacket from '../data/dataJacket';
import dataTrouser from '../data/dataTrouser';
import {Divider,  Row, Button, Image, Card} from 'antd'


const Customize = (props) => { //props are the properties to help access the values
    const [data, setData] = useState([]); //giving useState to this, the data that is provided is kept in an array, for example suit, there is an array of objects
    const [currentData, setCurrentData] = useState(''); //for this one currentData such as the names is kept as string
 //same as up
 

    const { params, dataCustom, setDataCustom, setCompleted } = props 
    const [total, setTotal] = useState(0)

    // const header = [
    //     'SUIT TYPE', 'LAPELS', 'BUTTON', 'VENT', 'CUFF BUTTONS', 'POCKET ACCENT', 'JACKET LINING',
    //     'JACKET LINING TYPE', 'ELBOW PATCH', 'WAISTCOAT', 'PANTS LINING', 'POCKET STYLE', 'PLEATS',
    //     'FRONT POCKET', 'BACK POCKET', 'BELT LOOPS', 'TROUSER BOTTOM STYLE', 'WAISTBAND FRONT',
    //     'JACKET INNER STYLE', 'SLEEVE OPENING'
    // ] //header for all of them, for example suit 
    


useEffect(() => {
    console.log('params: ' + params); 
    if(params.product === 'suits') {      //if product is suits, the
        setData(dataSuit);  //the data is set to the data for suits, which is the array of options
        setCurrentData(dataSuit[0]) //thei current data is set to the dataSuit and starts at 0,
        setTotal(dataSuit.length)
        // because the start of the array starts at value 0, so the data starts at 0
    } else if (params.product === 'shirts') { //if params.product is chosen as shirt, then the data is set to the shirt array
        setData(dataShirt)
        setTotal(dataSuit.length)
    } else if (params.product === 'trousers') {
        setData(dataTrouser)
        setTotal(dataSuit.length)
    } else if (params.product === 'jacket') {
        setData(dataJacket)
        setTotal(dataSuit.length)
    }                       
}, [params]) //after it renders it does this, basically, and it wont repeat after rendering because of the parameters at the end  



useEffect(() => {
    if(dataCustom.customize.length === total && total !== 0) {
        console.log('enter', dataCustom.customize.length, total)
        setCompleted(true)
    } else {
        setCompleted(false)
    }
}, [dataCustom.customize])

function selectCustom(item) { 
    
    let selectData = {
        name: currentData.name, 
        option: item.name,
        image: item.url //getsthe name of the data and the name of the option
    }   //this function pretty much gets the name of the styling option and the option that is included inside it 
    setDataCustom(selectData)

return console.log(item)

}

// const found = dataCustom.find((i) => i.name === currentData.name); //a data is found when the name equals the currentData which is the styling option.name

// if(dataCustom.length == 0) {  //if dataCustom is not yet filled up,then you set the values to the user choices which is selectData
//     setDataCustom([selectData])
// } else if (!found) {
//     let oldData = dataCustom;             
//     oldData.push(selectData);  //adds the new piece of data to the olddata lists
//     setDataCustom(oldData) //updates the data array/list
    
// } else {
//     const newData = dataCustom.map(i => {
//         if(i.name === currentData.name) {
//             i = selectData  //dataCustom is mapped, and if.name = currentData.name, i equals the data chosen/selected and therefore the value of i is returned
//         }
//         return i;
//     })

//     setDataCustom(newData) //the newData is passed as a value in the useState
//     }
// }  


function selectedItem(image, item) {

    const found = dataCustom.customize.find((item) => item.name === currentData.name)
    if (found) {
        if (image.name === found.option) {
            return "red"
        } else {
            return ""
        }
    }
} 
   
const activeButton = (item) => {
        const found = dataCustom.customize.find((c) =>c.name === item.name)
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

    


 //puts the data in columns, divider seperates the different content, row justify centers it, map is like for loop, 
return (



    <div style = {{flexDirection: 'column', width: '50%'}}> 
        <Divider/>
 {JSON.stringify(dataCustom)}
       
        <Row justify = 'center'>
            {
                data.map((item) => (
                    <Button 
                    //type = {currentData.name === item.name && 'primary'} 
                    style = {{margin: '5px', ...activeButton(item)}} onClick={() => setCurrentData(item)}> {/*when the bytton is clicked, it sets the currentData as shown above*/}
                        <CaretRightOutlined/>{item.name} {/*to ge the black play button */}
                    </Button>
                ))
            }
        </Row>
        <Row>
            {
                currentData && currentData.images.map((item) => (
                    <Card style = {{flexDirection: 'column', margin: '5px', width: '200px', cursor: 'pointer', padding: 5, borderColor: selectedItem(item)}} onClick = {() => selectCustom(item)}>
                        <Image src = {item.url} preview={false}/>
                        <h3>{item.name}</h3>

                    </Card>
                ))
            }
        
        </Row>
    </div>
)

        }

export default Customize


