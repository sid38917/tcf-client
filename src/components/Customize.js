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

    //this is to determine if the user has selected all the options. It goes through dataCustom, which is a prop, and it set s
    //includes all the data that the user has entered, it goes through the customization section
    //the total data is then passed, seen below, and if the completion equals the total and 
    //there is data, as determined by the total not equalong 0, then setCompleted is set as true
    //setCompleted is a prop, which then determines if the user can proceed to the next page 
    const checkCompleted = (total) => {
        if(dataCustom.customize.length === total && total !==0) {
            setCompleted(true)
            
        } else {
            setCompleted(false)
        }
    }




useEffect(() => {
    console.log('params: ' + params); 
    if(params.product === 'suits') {      //if product is suits, the
        setData(dataSuit);  //the data is set to the data for suits, which is the array of options
        setCurrentData(dataSuit[0]) //thei current data is set to the dataSuit and starts at 0,
        setTotal(dataSuit.length)
        checkCompleted(dataSuit.length)
        // because the start of the array starts at value 0, so the data starts at 0
    } else if (params.product === 'shirts') { //if params.product is chosen as shirt, then the data is set to the shirt array
        setData(dataShirt)
        setCurrentData(dataShirt[0])
        setTotal(dataShirt.length)
        checkCompleted(dataShirt.length)
    } else if (params.product === 'trousers') {
        setData(dataTrouser)
        setCurrentData(dataTrouser[0])
        setTotal(dataTrouser.length)
        checkCompleted(dataTrouser.length)
    } else if (params.product === 'jacket') {
        setData(dataJacket)
        setCurrentData(dataJacket[0])
        setTotal(dataJacket.length)
        checkCompleted(dataJacket.length)
    }                       
}, [params]) //after it renders it does this, basically, and it wont repeat after rendering because of the parameters at the end  


//the useEffect here, is meant to handle if the user has finished the data 
// useEffect(() => {
//     if(dataCustom.customize.length === total && total !== 0) {
//         console.log('enter', dataCustom.customize.length, total)
//         setCompleted(true)
//     } else {
//         setCompleted(false)
//     }
// }, [dataCustom.customize])


//this is for setting the data, so when the user selects the option, the name of the styling option will be set, as well as the 
//option they selected and the image



//gets the customization data of the user. 
//stored in an object with the name, the customiaation option, and the image which includes the option the user has chosen 
//this data is then passed to setDataCustom which is passed as a prop,from the custom page class, where this was set as the 
//setCustomization. this will then update the state. 

function selectCustom(item) { 
    
    let selectData = {
        name: currentData.name, 
        option: item.name,
        image: item.url //getsthe name of the data and the name of the option
    }   //this function pretty much gets the name of the styling option and the option that is included inside it 
    setDataCustom(selectData, total)
    //sending this to dataCustom in redux 

return console.log(item)


}



//if this item is selected then it returns red else, returns plain

//this is for the selected item, so the found variable, through the use of dataCustom, which is a a const variable set as a prop
//so the item parameter is passed, and if the item name equals the currenData name, which is a useState variable, and determines which 
//data the user is on, or where the data of the user. If the item name is equals to the currentData, then the border color will turn red


function selectedItem(image, item) {

    //datacustom is a prop, the .customize would find the customization data, and it would find the option the user has chosen, currentdata
    //stores the name of the styling option, and it finds the styling option name, and if it is found
    //it chekcs if the option stored is the same as what the user chose,
    //thus, if it is found, the background of the item will turn red 
    //this one checks if image is the same as the option that has been found
    //if it is true, then the red border colour will appear

    const found = dataCustom.customize.find((item) => item.name === currentData.name)
    if (found) {
        if (image.name === found.option) {
            return "red"
        } else {
            return ""
        }
    }
} 


   
//if this styling option is chosen, then it returns black and if it is finisehd then it returns blue, else return white
//activeButton takes in an arguement item. The found variable searches for the data of the customization option, that 
// If the item.name is equal to the currentData name, which holds the customization option the user is on
//If the customization option the user is on matches this, then the background color of the option will turn black
//to determine the user is on that option. Additionally, if the user has chosen an option within the customization option
// the color will of the customization option will turn blue, as determined by the variable found,

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

    


return (



    <div style = {{flexDirection: 'column', width: '50%'}}> 
        <Divider/>
 {/* {JSON.stringify(dataCustom)} */}
       
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


