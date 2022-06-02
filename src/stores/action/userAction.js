import {createSlice} from 'react-redux'

//these are the actions the user does when using the app for instance registering or logging otu 

//these are the actions done by the user

//the first one is set user, which is primarily for registering and logging in, it takes in user data 
const SetUser = (data) => {

console.log(data, 'from action ')

    return {
        type: 'SET_USER',
        payload: data,

    }
    
}

//the second one is setting the details of the user for the delivery

const SetDelivery = (data) => {
    return {
        type: 'SET_DELIVERY',
        payload: data
    }
}

//the third one is resetting  the user, which is used for logging out. 

const ResetUser = (data) => {
    return {
        type: 'RESET_USER',
        payload: data
    }
}

export {
    SetUser, SetDelivery, ResetUser
}



