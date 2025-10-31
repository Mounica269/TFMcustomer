import {
    INIT_ONLINE_USERS, ADD_ONLINE_USER, REMOVE_ONLINE_USER, EMPTY_ONLINE_USERS,
    ADD_CHAT_USER, REMOVE_CHAT_USER, EMPTY_CHAT_USER, MINIZE_TOGGLE_CHAT_USER,
    INIT_CHAT_MESSAGES, PUSH_MESSAGE_BY_PROFILE_ID
} from "../constant";

const initialState = {
    onlineUsers: [],
    chatUsers: []
};

const chat = (state = initialState, action) => {
    switch (action.type) {
        case INIT_ONLINE_USERS: {
            return {
                ...state,
                onlineUsers: action.payload
            }
        }
        case ADD_ONLINE_USER: {
            state.onlineUsers.push(action.payload);
            return {
                ...state,
                onlineUsers: [...state.onlineUsers]
            }
        }
        case REMOVE_ONLINE_USER: {
            return {
                ...state,
                onlineUsers: [...state.onlineUsers.filter(user => user.profileID !== action.payload.profileID)]
            }
        }
        case EMPTY_ONLINE_USERS: {
            return {
                ...state,
                onlineUsers: [...action.payload]
            }
        }
        case ADD_CHAT_USER: {
            return {
                ...state,
                chatUsers: [...state.chatUsers, action.payload]
            }
        }
        case REMOVE_CHAT_USER: {
            return {
                ...state,
                chatUsers: [...state.chatUsers.filter(user => user.profileID !== action.payload)]
            }
        }
        case EMPTY_CHAT_USER: {
            return {
                ...state,
                chatUsers: [...action.payload]
            }
        }
        case MINIZE_TOGGLE_CHAT_USER: {
            const chatUser = state.chatUsers.find(user => user.profileID === action.payload);
            chatUser.isChatOpen = !chatUser.isChatOpen;
            return {
                ...state,
                chatUsers: [...state.chatUsers]
            }
        }
        case INIT_CHAT_MESSAGES: {
            const chatUser = state.chatUsers.find(user => user.profileID === action.payload.profileID);
            chatUser.messages = action.payload.messages;
            return {
                ...state,
                chatUsers: [...state.chatUsers]
            }
        }
        case PUSH_MESSAGE_BY_PROFILE_ID: {
            const chatUser = state.chatUsers.find(user => user.profileID === action.payload.profileID);
            console.log("chatUser id::",chatUser);
            chatUser.messages.push(action.payload.message);
            return {
                ...state,
                chatUsers: [...state.chatUsers]
            }
        }
        default:
            return {
                ...state
            }
    }
};

export default chat;