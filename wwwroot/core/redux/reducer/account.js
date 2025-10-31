import {
    PROFILE_DATA,
    REMOVE_LOGGED_USER,
    SET_LOGGED_USER,
    RELOAD_PROFILE_DATA,
    TOKEN_ACTION,
    VIEW_CONTACT_ACTION,
} from "../constant";
import { setAuthUser, removeAuthuser } from "core/helper/localstorage";

const initialState = {
    isLoggedIn: false,
    token: null,
    authUser: null,
    profile: null,
    reloadProfile: false,
    tokenAction: null,
    reloadMatches: false,
};

const account = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_USER:
            setAuthUser(action.payload);
            return {
                ...state,
                ...action.payload,
            };
        case REMOVE_LOGGED_USER:
            removeAuthuser();
            return {
                ...state,
                ...action.payload,
            };
        case PROFILE_DATA:
            return {
                ...state,
                profile: action.payload,
            };
        case RELOAD_PROFILE_DATA:
            return {
                ...state,
                reloadProfile: action.payload,
            };
        case VIEW_CONTACT_ACTION:
            return {
                ...state,
                reloadMatches: action.payload,
            };
        case TOKEN_ACTION:
            return {
                ...state,
                tokenAction: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default account;
