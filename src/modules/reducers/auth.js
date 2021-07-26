import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCESS, REGISTER_FAIL, VERIFICATION_MAIL_SENT, FAILED_TO_SEND_VERIFICATION_MAIL } from "../types/auth";


const initialState = {
  token: "",
  isAuthenticated: false,
  isLoading: false,
  user: null,
  currentUserRegistered: false
};


export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        token: action.payload
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        currentUserRegistered: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        currentUserRegistered: false,
        token: action.payload.token
      };
    case REGISTER_SUCESS:
      return {
        ...state,
        currentUserRegistered: true,
        isLoading: false,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        currentUserRegistered: false,
      };
    case VERIFICATION_MAIL_SENT:
    case FAILED_TO_SEND_VERIFICATION_MAIL:
      return {
        token: "",
        isAuthenticated: false,
        isLoading: false,
        currentUserRegistered: false,
        user: null,
      }
    default:
      return state;
  }
}
