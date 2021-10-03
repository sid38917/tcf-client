import {createSlice} from 'react-redux'

const SetUser = (data) => {


    return {
        type: 'SET_USER',
        payload: data,

    }
    
}

const SetDelivery = (data) => {
    return {
        type: 'SET_DELIVERY',
        payload: data
    }
}

const ResetUser = (data) => {
    return {
        type: 'RESET_USER',
        payload: data
    }
}

export {
    SetUser, SetDelivery, ResetUser
}



