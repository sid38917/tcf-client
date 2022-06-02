import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Customize, Fabric, EndCustomize } from "../components";
import { Row, Col, Button, message } from "antd";
import { connect } from "react-redux";
import { SetUser, SetFabric, SetCustomize } from "../stores/action";

const CustomPage = (props) => {
  const params = useParams();

  //active page 
  const [active, setActive] = useState("fabric");
  //data 
  const [dataCustom, setDataCustom] = useState([]);
  const history = useHistory();
  //redux 
  const { dataStore, SetFabric, SetCustomize } = props;
  // const [total, setTotal] = useState(false)
  //if everything is completed
  const [completed, setCompleted] = useState(false);



const selectCustomize = (data, total) => {
  SetCustomize(data,params)
  if(dataCustom.customize ) {
    if(dataCustom.customize.length === total && total !== 0) {
      setCompleted(true)
    }
  }
}

  //fileres the data, 
  useEffect(() => {
    setActive(params.style);
    const filterData = dataStore.find(
      (item) => item.product === params.product
    );
    console.log(dataStore, "filterData");
    setDataCustom(filterData);
  }, [params, dataStore.length]);




//the active component determines which component the user is on, (fabrics, customize, endCustomize)
//active which is a useState variable to determine the component which component the user is on
//through params, which is taken from react-router-dom library
//it checks if the user is on the fabric page 
//and dataCustom which is a useState array variable is passed as a prop, to hold the data of the user
//alongside SetData, which takes in the data and params, which is the address, to determine the product the user has chosen
//then the SetFabric redux action is passed, with the data and params, for the product the user has chosen
//SetFabric will update the Redux state with the fabric data  

  function activeComponent() {
    if (active === "fabric") {
      return (
        <Fabric
          data={dataCustom}
          SetData={(data, params) => SetFabric(data, params)}
        />
      );
    } else if (active === "customize") {
      return (
        <Customize
          dataCustom={dataCustom}
          setDataCustom={(data, total) => selectCustomize(data, total)}
          params={params}
          setCompleted={setCompleted}
        />
      );
    } else if (active === "endCustomize") {
      return <EndCustomize data={dataCustom} />;
    }
  }


  //useParams is from react router dom, and it is basically for accessing the address of the page
  //through the use of useParams, I can access the product chosen, and then that can be added to the address
//status checks if the user has chosen data for the fabrics page, which is seen through dataCustom, which is an 
//array of objects variable that holds all the user data
//if it is false, the user will not be able to proceed to the next page, and an error message will appear
//if the is ture, the user can then proceed to the customization page, where the user can choose their customization
//based on the outfit chosen 
  function handleActive(status) {
    console.log(completed);
    if (status === "next") {
      const status = !dataCustom.fabric;
      if (active === "fabric") {
        if (!dataCustom.fabric) {
          return error();
        } else {
          history.push(`/custom/${params.product}/customize`);
          setActive("customize");
        }

      } else if (active === "customize") {
        
        console.log(completed, "iii");
        if (!completed) {
          return error();
        } else {
          history.push(`/custom/${params.product}/endCustomize`);
          setActive("endCustomize");
        }
      } else if (active === "endCustomize") {
        history.push(`/measurement/${params.product}`);
      }

    } else if (status === "back") {
      if (active === "customize") {
        setActive("fabric");
        history.push(`/custom/${params.product}/fabric`);
      } else if (active === "endCustomize") {
        setActive("customize");
        history.push(`/custom/${params.product}/customize`);
      }
    }
  }

  const error = () => {
    return message.error("you haven't filled everything up");
  };

//   const validationFabric = () => {
//     if (dataCustom.fabric) {
//     }
//   };


 //GUI
  return (
    <>
      {/* {JSON.stringify(dataCustom)}
      {JSON.stringify(completed)} */}
      <Row justify="center" style={{ minHeight: "70vh" }}>
        {activeComponent()}
      </Row>
      {/* {JSON.stringify(active)}
      {JSON.stringify(completed)} */}
      <h2>ok</h2>
      <Row justify="center">
        {active !== "fabric" && (
          <Button
            className="button-primary"
            onClick={() => handleActive("back")}
          >
            Back
          </Button>
        )}
        <Button className="button-primary" onClick={() => handleActive("next")}>
          Next
        </Button>
      </Row>{" "}
      : ""
    </>
  );
};


//mapStateToProps takes in the state of the user data and custom data, as there are two redux stores, there is custom and user
//it takes the custom and user data from the state, and updates the data which is then passed as props in the following class, such as customize
//setUser, setFabric, and setCustomize are all actions from redux, and pasisng it as props allows to pass data into these actions 
//these are then used as props in the fabric, customize pages,

const mapStateToProps = (state) => {
  const { User, Custom } = state;

  return {
    dataUser: User,
    dataStore: Custom.data,
  };
};

const mapDispatchToProps = {
  SetUser,
  SetFabric,
  SetCustomize,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomPage);
