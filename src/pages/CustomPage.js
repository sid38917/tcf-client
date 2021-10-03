import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Customize, Fabric, EndCustomize } from "../components";
import { Row, Col, Button, message } from "antd";
import { connect } from "react-redux";
import { SetUser, SetFabric, SetCustomize } from "../stores/action";

const CustomPage = (props) => {
  const params = useParams();

  const [active, setActive] = useState("fabric");
  const [dataCustom, setDataCustom] = useState([]);
  const history = useHistory();
  const { dataStore, SetFabric, SetCustomize } = props;
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setActive(params.style);
    const filterData = dataStore.find(
      (item) => item.product === params.product
    );
    console.log(dataStore, "filterData");
    setDataCustom(filterData);
  }, [params, dataStore.length]);

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
          setDataCustom={(data) => SetCustomize(data, params)}
          params={params}
          setCompleted={setCompleted}
        />
      );
    } else if (active === "endCustomize") {
      return <EndCustomize data={dataCustom} />;
    }
  }

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
