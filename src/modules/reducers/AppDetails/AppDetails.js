import { APP_DETAILS_START, APP_DETAILS_FAILURE, APP_DETAILS_SUCCESS } from "../../types/AppDetails/Types" 

//Set initial state for owner
const initialState = {
    app: {"Alpe ": "aple"},
    loading: true,
    error: null,
}

//Export new state using switch
export default (state = initialState, action = {}) => {
    // if(action.type === APP_DETAILS_SUCCESS){
    //     return {
    //         ...state,
    //         loading: false,
    //         error: false,
    //         app: action.payload.app,
    //     }
    // }
    switch (action.type) {

        case APP_DETAILS_START:
            return {
                ...state,
                loading: true
            }

        case APP_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                app: action.payload.app,
            }
        case APP_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}
