import axios from 'axios'
import { GET_FILES_START, GET_FILES_FAILURE, GET_FILES_SUCCESS } from "../../types/Main/Types"
import { graphQuery } from '../../../services/Contract'
//Get customer property info by id
export function getFileData(_searchName = "") {
    //Return dispatch
    return async (dispatch) => {
        try {
            //Dispatch start
            dispatch(getFileDataStart())
            //Send properties get request

            const applications = await graphQuery(_searchName)
            dispatch(getFileDataSuccess(applications))

        } catch (err) {
            dispatch(getFileDataFailure(err.message))

        }
    }
}


//Get customer property basic info by id start
export function getFileDataStart() {
    return {
        type: GET_FILES_START,
        payload: {},
    }
}

//Get customer property basic info by id success
export function getFileDataSuccess(allFiles) {
    return {
        type: GET_FILES_SUCCESS,
        payload: { files: allFiles },
    }
}

//Get customer property basiic info by id failure
export function getFileDataFailure(error) {
    return {
        type: GET_FILES_FAILURE,
        payload: { error },
    }
}