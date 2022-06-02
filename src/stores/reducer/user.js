

const initialState = {
    id: '',
    token: '',
    username: '',
    token: '',
    
    delivery: {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        country: '',
        state: '',
        city: '',
        postCode: '',
        address: ''
    }

}

const UserReducer = (state = initialState, action) => {

//The code shows how the user data is stored in the state within the Redux reducer. 
// It takes in the action type, SET_USER, and takes in the values obtained from the response by the backend, 
//and uses the spread function to spread the state, to then update the state with the new user information
//this is important because it determines that the user has already logged in, by storing their data 

    if(action.type === 'SET_USER') {
        const {token, id, email, username} = action.payload
        console.log('user store', action.payload)
        return {
            ...state,
            token, id, email, username
        }
    } else if (action.type === 'SET_DELIVERY') {
        return {
            ...state,
            delivery: action.payload
            
        }
    } else if (action.type === 'RESET_USER') {
        return {
            ...state, 
            email: '',
            id: '',
            token: '',
            username: '',
            token: '',
            
            delivery: {
                firstName: '',
                lastName: '',
                mobileNumber: '',
                country: '',
                state: '',
                city: '',
                postCode: '',
                address: ''
            }
        }
    }
    return state

}

export default UserReducer

