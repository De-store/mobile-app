// REDUX TYPES IMPORT
import { LOAD_MAIN_SCREEN_START, LOAD_MAIN_SCREEN_SUCCESS, LOAD_MAIN_SCREEN_FAILURE } from "../../types/Initial/Types";


// CHECK TOKEN & LOAD USER
export const loadMainScreen = () => async (dispatch) => {
    dispatch(mainScreenStart())
    setTimeout(() => {
        try {
            dispatch(mainScreenSuccess())
        } catch {
            dispatch(mainScreenFailure())
        }
    }, 3000);
};

mainScreenStart = () => {
    return {
        type: LOAD_MAIN_SCREEN_START
    }
}

mainScreenSuccess = () => {
    return {
        type: LOAD_MAIN_SCREEN_SUCCESS
    }
}

mainScreenFailure = () => {
    return {
        type: LOAD_MAIN_SCREEN_FAILURE
    }
}
