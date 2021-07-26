import axios from 'axios'
import { APP_DETAILS_START, APP_DETAILS_FAILURE, APP_DETAILS_SUCCESS } from "../../types/AppDetails/Types"
import { getAppQuery } from '../../../services/Contract'
//Get customer property info by id
export function getAppDetails(_data) {
    //Return dispatch
    return async (dispatch) => {
        try {
            //Dispatch start
            dispatch(getAppDetailsStart())
            //Send properties get request
            console.log("DATA in action", _data)
            
            const applications = await getAppQuery(_data)
            console.log("APPLICATION ", applications, JSON.stringify(applications))
            dispatch(getAppDetailsSuccess(applications))
        } catch (err) {
            console.log("ERR ", err, err.message, err.data)
            dispatch(getAppDetailsFailure(err.message))
        }
    }
}


//Get customer property basic info by id start
export function getAppDetailsStart() {
    return {
        type: APP_DETAILS_START,
        payload: {},
    }
}

//Get customer property basic info by id success
export function getAppDetailsSuccess(appDetails) {
    return {
        type: APP_DETAILS_SUCCESS,
        payload: { app: appDetails },
    }
}

//Get customer property basiic info by id failure
export function getAppDetailsFailure(error) {
    return {
        type: APP_DETAILS_FAILURE,
        payload: { error },
    }
}