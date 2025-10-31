import {
    INIT_ONLINE_USERS, ADD_ONLINE_USER, REMOVE_ONLINE_USER, EMPTY_ONLINE_USERS,
    ADD_CHAT_USER, REMOVE_CHAT_USER, MINIZE_TOGGLE_CHAT_USER, EMPTY_CHAT_USER,
    INIT_CHAT_MESSAGES, PUSH_MESSAGE_BY_PROFILE_ID
} from "../constant";

export const setSocket = (socket) => dispatch => {
    dispatch({
        type: SET_SOCKET,
        payload: socket
    })
};

export const initOnlineUsersAction = (users) => dispatch => {
    dispatch({
        type: INIT_ONLINE_USERS,
        payload: users
    });
};

export const addOnlineUserAction = (user) => dispatch => {
    dispatch({
        type: ADD_ONLINE_USER,
        payload: user
    });
};

export const removeOnlineUserAction = (user) => dispatch => {
    dispatch({
        type: REMOVE_ONLINE_USER,
        payload: user
    });
};

export const emptyOnlineUserAction = () => dispatch => {
    dispatch({
        type: EMPTY_ONLINE_USERS,
        payload: []
    });

    dispatch({
        type: EMPTY_CHAT_USER,
        payload: []
    });
};

export const addChatUserAction = (user) => dispatch => {
    dispatch({
        type: ADD_CHAT_USER,
        payload: user
    })
};

export const removeChatUserAction = (profileID) => dispatch => {
    dispatch({
        type: REMOVE_CHAT_USER,
        payload: profileID
    })
};

export const emptyChatUserAction = () => dispatch => {
    dispatch({
        type: EMPTY_CHAT_USER,
        payload: []
    });
};

export const minizeChatUserAction = (profileID) => dispatch => {
    dispatch({
        type: MINIZE_TOGGLE_CHAT_USER,
        payload: profileID
    })
};

export const initialChatMessages = (profileID, messages) => dispatch => {
    dispatch({
        type: INIT_CHAT_MESSAGES,
        payload: { profileID, messages }
    })
};

export const pushChatMessage = (profileID, message) => dispatch => {
    dispatch({
        type: PUSH_MESSAGE_BY_PROFILE_ID,
        payload: { profileID, message }
    })
};