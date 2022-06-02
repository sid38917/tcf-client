import React, { useState, useEffect } from "react";

import { Row, Column, Divider, Input, Button, Typography, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetDelivery } from "../stores/action";
const { Title } = Typography;
const { TextArea } = Input;
const styles = {
  width: '20vw',
  marginRight: 10,
};
const Delivery = () => {
  const dispatch = useDispatch(); //dispatch is used to dispatch an action,such as storing the data 
  const dataStore = useSelector((state) => state.User.delivery);
  const {
    firstName, 
    lastName,
    mobileNumber,
    country,
    city,
    state,
    postCode,
    address,
  } = dataStore;

  
  
 //GUI
  return (
    <>
      <Row>
        <Title level={3}>Delivery</Title>
      </Row>
      <Divider />
      {/* {JSON.stringify(dataStore)} */}
      <Form
        layout='vertical'
        upperCol={{
          backgroundColor: 'red',
          width: '80vw',
          paddingLeft: '10vw',
        }}
      >
        <Row justify='space-around'>
          <Form.Item label='first name'>
            <Input
              value={firstName}
              onChange={(e) => {
                const payload = { ...dataStore, firstName: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
          <Form.Item label='last name'>
            <Input
              value={lastName}
              onChange={(e) => {
                const payload = { ...dataStore, lastName: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
        </Row>
        <Row justify='space-around'>
          <Form.Item label='country'>
            <Input
              value={country}
              onChange={(e) => {
                //payload refers to the data, and ... maps out the data
                //e refers to the event, 
                const payload = { ...dataStore, country: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
          <Form.Item label='state'>
            <Input
              value={state}
              onChange={(e) => {
                const payload = { ...dataStore, state: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
        </Row>
        <Row justify='space-around'>
          <Form.Item label='Mobile Number'>
            <Input
              value={mobileNumber}
              onChange={(e) => {
                const payload = { ...dataStore, mobileNumber: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
          <Form.Item label='City'>
            <Input
              value={city}
              onChange={(e) => {
                const payload = { ...dataStore, city: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
          
          <Form.Item label='Post Code'>
            <Input
              value={postCode}
              onChange={(e) => {
                const payload = { ...dataStore, postCode: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={styles}
            />
          </Form.Item>
          <Form.Item label='Address'>
            <TextArea
              value={address}
              onChange={(e) => {
                const payload = { ...dataStore, address: e.target.value };
                dispatch(SetDelivery(payload));
              }}
              style={{ width: '60vw' }}
            />
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default Delivery;
