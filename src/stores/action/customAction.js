 const SetFabric = (data, params) => {
  

    return {
        type: 'SET_FABRIC',
        payload: data,
        params: params

    }
    
}

const SetCustomize = (data, params) => {
  

    return {
        type: 'SET_CUSTOMIZE',
        payload: data,
        params: params

    }
    
}

const ResetCustom = (data) => {
    return {
        type: 'RESET_CUSTOM',
        payload: data,
        

    }
}

const FixValueMeasurement = (data, params) => {
    return {
        type: 'FIX_VALUE_MEASUREMENT',
        payload: data,
        params: params
    }
}

const SetMeasurement = (data, params) => {
        console.log('reset custom', data)
    return {
        type: 'SET_MEASUREMENT',
        payload: data,
        params: params
    }
}

export  {SetFabric, SetCustomize, SetMeasurement, ResetCustom, FixValueMeasurement}
