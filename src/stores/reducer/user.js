

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

