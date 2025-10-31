import {
    COMMON_DATA,
    COMMON_SETTINGS_DATA,
    REMOVE_LOGGED_USER,
    SET_LOGGED_USER,
    PROFILE_DATA,
    RELOAD_PROFILE_DATA,
    RELOAD_ACTION,
    TOKEN_ACTION,
    MATCHES_COUNT_ACTION,
    COMMON_DATA_ACTION,
    VIEW_CONTACT_ACTION,
    COMMUNITY_DATA_ACTION,
    LANGUAGE_DATA_ACTION,
    STATES_DATA_ACTION,
    PREMIUM_MATCHES_DATA_ACTION,
    MY_MATCHES_DATA_ACTION,
    NEAR_ME_MATCHES_DATA_ACTION,
    RECENT_VISITORS_DATA_ACTION
} from "../constant";

export const loginAction = (user) => (dispatch) => {
    dispatch({
        type: SET_LOGGED_USER,
        payload: user,
    });
};

export const logoutAction = () => (dispatch) => {
    dispatch({
        type: REMOVE_LOGGED_USER,
        payload: {
            isLoggedIn: false,
            token: "",
            authUser: "",
        },
    });
};

export const commonDataAction = (payload) => (dispatch) => {    
    dispatch({
        type: COMMON_DATA_ACTION,
        payload,
    });
};

export const commonSettingsAction = (payload) => (dispatch) => {
    dispatch({
        type: COMMON_SETTINGS_DATA,
        payload,
    });
};

export const profileAction = (payload) => (dispatch) => {
    dispatch({
        type: PROFILE_DATA,
        payload,
    });
};

export const reloadProfileAction = (payload) => (dispatch) => {
    dispatch({
        type: RELOAD_PROFILE_DATA,
        payload,
    });
};

export const reloadAction = (payload) => (dispatch) => {
    dispatch({
        type: RELOAD_ACTION,
        payload,
    });
};

export const tokenAction = (payload) => (dispatch) => {
    dispatch({
        type: TOKEN_ACTION,
        payload,
    });
};

export const matchesCountAction = (count) => (dispatch) => {
    dispatch({
        type: MATCHES_COUNT_ACTION,
        payload: count,
        // payload: {
        //     newMatchs: null,
        //     myMatches: null,
        //     nearMe: null,
        // }
    });
};

export const viewContactAction = (payload) => (dispatch) => {
    dispatch({
        type: VIEW_CONTACT_ACTION,
        payload,
    });
};

export const communityDataAction = (payload) => (dispatch) => {
    dispatch({
        type: COMMUNITY_DATA_ACTION,
        payload,
    });
};

export const languageDataAction = (payload) => (dispatch) => {
    dispatch({
        type: LANGUAGE_DATA_ACTION,
        payload,
    });
};

export const statesDataAction = (payload) => (dispatch) => {
    dispatch({
        type: STATES_DATA_ACTION,
        payload,
    });
};

export const premiumMatchesDataAction = (payload) => (dispatch) => {
    dispatch({
        type: PREMIUM_MATCHES_DATA_ACTION,
        payload,
    });
};

export const myMatchesDataAction = (payload) => (dispatch) => {
    dispatch({
        type: MY_MATCHES_DATA_ACTION,
        payload,
    });
};

export const nearMeMatchesDataAction = (payload) => (dispatch) => {
    dispatch({
        type: NEAR_ME_MATCHES_DATA_ACTION,
        payload,
    });
};

export const recentVisitorsDataAction = (payload) => (dispatch) => {
    // debugger;
    dispatch({
        type: RECENT_VISITORS_DATA_ACTION,
        payload,
    });
};
