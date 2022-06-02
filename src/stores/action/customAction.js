 
 //these are the types of actions the user takes when customizitnhg 


 //the first one is SetFabric, which allows the user to set the fabric 
 const SetFabric = (data, params) => {
  

    return {
        type: 'SET_FABRIC',
        payload: data,
        params: params

    }
    
}

//The second one is SetCustomize, which allows the user to set customizations
// it takes in data, which is the data of the user, and what they chose for their customizations
//and the second one is params 

const SetCustomize = (data, params) => {
  

    return {
        type: 'SET_CUSTOMIZE',
        payload: data,
        params: params

    }
    
}

//resetting their customizations 
const ResetCustom = (data) => {
    console.log('reset custom', data)
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

///setting the measuremeent option.
//takes in data, which refers to the measruements of the user 

const SetMeasurement = (data, params) => {
        
    return {
        type: 'SET_MEASUREMENT',
        payload: data,
        params: params
    }
}

const SetBody = (data, params) => {
    return {
        type: 'SET_BODY',
        payload: data,
        params: params
    }
}

export  {SetFabric, SetCustomize, SetMeasurement, ResetCustom, FixValueMeasurement, SetBody}
