// REDUX TYPES IMPORT
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCESS, REGISTER_FAIL, VERIFICATION_MAIL_SENT, FAILED_TO_SEND_VERIFICATION_MAIL } from "../types/auth";


// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch) => { };

// REGISTER USER
export const register = (newUser) => async (dispatch) => { }

// LOGIN USER
export const login = (user) => async (dispatch) => { }


// LOGOUT USER
export const logout = async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS
  })
}

// SETUP CONFIG/HEADERS AND TOKEN
export const tokenConfig = async (dispatch) => {
  // GET TOKEN FROM LOCAL STORAGE
  dispatch({ type: USER_LOADING });
};

export const resendVerificationMail = (userEmail) => async (dispatch) => { }