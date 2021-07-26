import { LOAD_MAIN_SCREEN_SUCCESS, LOAD_MAIN_SCREEN_START, LOAD_MAIN_SCREEN_FAILURE } from "../../types/Initial/Types";


const initialState = {
    goToMain: false,
    loading: false,
    error: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_MAIN_SCREEN_START:
            return {
                ...state,
                goToMain: false,
                loading: true,
                error: false,
            };
        case LOAD_MAIN_SCREEN_SUCCESS:
            return {
                ...state,
                goToMain: true,
                loading: false,
                error: false,
            };
        case LOAD_MAIN_SCREEN_FAILURE:
            return {
                ...state,
                goToMain: false,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
}
