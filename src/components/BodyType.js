import React, {useState} from "react";
import dataBody from "../data/dataBody";
import { Card , Image} from "antd";

const BodyType = (props) => {

    const [body, setBody] = useState([]);


    const {dataUser, SetUser, dataStore, SetMeasurement, setManualView} = props;

    function borderColor(image) {
        

    }

    return (
        <>
        <div style = {{ width: '50%'}}>
      {dataBody.map((item) => (
          <Card style= {{flexDirection: 'row', justifyContent: 'center' , cursor: 'pointer', margin: '5px', width: '200px', alignItems: 'center'}}>
              <Image src= {item.url}/>
              <h3>{item.name}</h3>
          </Card>   
      ))}
            
            </div>
      
        
      </>
    )
  
}

export default BodyType