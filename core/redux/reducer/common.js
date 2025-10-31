import {
    COMMON_DATA_ACTION,
    COMMON_SETTINGS_DATA,
    COMMUNITY_DATA_ACTION,
    LANGUAGE_DATA_ACTION,
    MATCHES_COUNT_ACTION,
    MY_MATCHES_DATA_ACTION,
    NEAR_ME_MATCHES_DATA_ACTION,
    PREMIUM_MATCHES_DATA_ACTION,
    RECENT_VISITORS_DATA_ACTION,
    RELOAD_ACTION,
    STATES_DATA_ACTION,
} from "../constant";
const isAllNew = [{ value: "0", label: "All" }];

const initialState = {
    commonData: {},
    siteSettings: {},
    reloadAction: false,
    newMatches: null,
    myMatches: null,
    nearByMatches: null,
    communityData: isAllNew,
    languageData: isAllNew,
    statesData: isAllNew,
    premimumMatches:[],
    myMatchesList:{},
    nearMeMatchesList:{},
    recentVisitorsList:[]
};

const common = (state = initialState, action) => {
    switch (action.type) {
        case COMMON_DATA_ACTION: {
            return {
                ...state,
                commonData: action.payload,
            };
        }
        case COMMON_SETTINGS_DATA: {
            return {
                ...state,
                siteSettings: action.payload,
            };
        }
        case COMMUNITY_DATA_ACTION: {
            return {
                ...state,
                communityData: action.payload,
            };
        }
        case LANGUAGE_DATA_ACTION: {
            return {
                ...state,
                languageData: action.payload,
            };
        }
        case STATES_DATA_ACTION: {
            return {
                ...state,
                statesData: action.payload,
            };
        }
        case PREMIUM_MATCHES_DATA_ACTION: {
            return {
                ...state,
                premimumMatches: action.payload,
            };
        }
        case MY_MATCHES_DATA_ACTION: {
            return {
                ...state,
                myMatchesList: action.payload,
            };
        }
        case NEAR_ME_MATCHES_DATA_ACTION: {
            return {
                ...state,
                nearMeMatchesList: action.payload,
            };
        }
        case RECENT_VISITORS_DATA_ACTION: {
            return {
                ...state,
                recentVisitorsList: action.payload,
            };
        }
        case RELOAD_ACTION: {
            return {
                ...state,
                reloadAction: action.payload,
            };
        }
        case MATCHES_COUNT_ACTION: {
            return {
                ...state,
                newMatches: action.payload,
                myMatches: action.payload,
                nearByMatches: action.payload,
                todayMatches: action.payload,
            };
        }
        default:
            return state;
    }
};

export default common;
