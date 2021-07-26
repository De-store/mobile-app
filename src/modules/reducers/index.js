import { combineReducers } from "redux";
import auth from "./auth";
import initial from "./Initial/Initial";
import main from "./Main/Main";
import appDetails from "./AppDetails/AppDetails";

export const allReducers = combineReducers({
    auth,
    initial,
    main,
    appDetails
});