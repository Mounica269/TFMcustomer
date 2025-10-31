import ImageFallback from "components/common/image-fallback";
import { connect, useSelector } from "react-redux";
import {
    initOnlineUsersAction,
    addOnlineUserAction,
    removeOnlineUserAction,
    emptyOnlineUserAction,
    addChatUserAction,
    emptyChatUserAction,
    initialChatMessages,
    pushChatMessage,
} from "core/redux/account/chat.action";
import React, { useEffect, useState } from "react";
import PrivateChat from "components/chatbox/chat";
import io from "socket.io-client";
import { utils } from "core/helper";
import Head from "next/head";

const ChatBoxList = (props) => {
    const {
        authUser,
        authProfile,
        onlineUsers,
        chatUsers,
        initOnlineUsersAction,
        addOnlineUserAction,
        removeOnlineUserAction,
        emptyOnlineUserAction,
        addChatUserAction,
        emptyChatUserAction,
        initialChatMessages,
        pushChatMessage,
    } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const socketEndPoint = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;

    const token = useSelector((state) => state?.account?.tokenAction);

    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [chatBoxToggle, setChatBoxToggle] = useState(true);
    const handleChatBoxToggle = () => setChatBoxToggle(!chatBoxToggle);

    const [socket, setSocket] = useState(null);
    const [socketUser, setSocketUser] = useState(null);

    function addUserToChat(profile) {
        console.log("chat list profiles", profile);
        emptyChatUserAction();

        // if (chatUsers.length > 2) {
        //     utils.showErrMsg("limit reached close other chat and open new");
        //     return false;
        // }

        // addChatUserAction(profile);

        // const payload = {
        //     room: roomName,
        //     skip: 0,
        //     limit: 10
        // };

        // socket.emit("loadChatUserInitialMessages", payload);

        socket.emit("getRoomName", { toProfileId: profile.profileID }, ({ roomName }) => {
            addChatUserAction(profile);
            setRoomName(roomName);
        });
        return true;
    }

    const sendMessage = (event, ele) => {
        event.preventDefault();
        const { value: message } = event.target;
        if (message && roomName) {
            socket.emit("sendMessage", { roomName, message }, (resp) =>
                console.log("resp::", resp)
            );
            setMessage("");
        }
    };

    useEffect(() => {
        const newSocket = io(socketEndPoint, { autoConnect: false });
        setSocket(newSocket);
        return () => {
            emptyOnlineUserAction();
            newSocket.close();
        };
    }, [setSocket]);

    useEffect(() => {
        if (socket !== null && authProfile) {
            console.log("socket::", socket);

            if (socketUser === null) {
                // const username = "USER00" + Date.now();
                // console.log("username::", username);
                // console.log("chat authProfile::", authProfile);
                setSocketUser(authProfile?.profileID);
                socket.auth = { profileID: authProfile?.profileID };
                socket.connect();

                socket.emit("registerNewUser");
            }
            console.log("socketUser::", socketUser);

            // possible error outcomes and init steps
            socket.onAny((event, ...args) => {
                console.log(event, args);
            });

            // socket.on("userConnected", (user) => {
            //     // console.log("userConnected::", user);
            //     addOnlineUserAction(user);
            // });

            socket.on("userConnected", (user) => {
                console.log("user online::", user);
                if (
                    authProfile.profileID !== user.profileID &&
                    authProfile.basic.gender !== user.gender
                ) {
                    addOnlineUserAction(user);
                }
            });

            socket.on("userDisConnected", (user) => {
                // console.log("userDisConnected::", user);
                removeOnlineUserAction(user);
            });

            // needed actions
            socket.on("sendActiveMatchedProfiles", (users) => {
                console.log("users::", users);
                initOnlineUsersAction(users);
            });

            socket.on("initialChatUserMessages", (chatUserMessageObj) => {
                // console.log("initialChatUserMessages::", chatUserMessageObj);
                setMessages((messages) => [...messages, ...chatUserMessageObj.messages]);
                // initialChatMessages(chatUserMessageObj.chatUserProfileID, chatUserMessageObj.messages);
            });

            socket.on("message", (message) => {
                // console.log("ui-message::", message);
                setMessages((messages) => [...messages, message]);
            });

            // socket.on("connect_error", (err) => {
            //     console.log(`ui-connect_error due to ${err.message}`);
            // });

            // socket.on("connect_error", (err) => {
            //     if (err.message === "invalid username") {
            //         console.log("username already exists");
            //     }
            // });
        }
    }, [socket, authProfile, token]);

    return (

        <React.Fragment>
            <Head>
                <title>Chat List | TrueFriend Matrimony | Find Christian Brides & Grooms Online | Christian Matrimony</title>

                <meta name="keywords" content="Christian Matrimony, Christian Matrimony India, Christian matrimony chat, Christian matchmaking chat, chat with Christian brides, chat with Christian grooms, TrueFriend matrimony messaging, Christian marriage platform,Christian brides,Christian Marriage, Faith-Based Matrimony,Christian Bride Groom Chat, Verified Christian Matrimony Profiles " />
                <meta name="description" content="TrueFriend Matrimony is a trusted Christian matrimony platform where you can chat with verified Christian brides and grooms online. Safe, secure, and faith-based matchmaking service for your marriage journey." />
                <link rel="canonical" href="https://www.truefriendmatrimony.com" />

                <meta property="og:title" content="Chat with Christian Brides & Grooms | TrueFriend Matrimony" />
                <meta
                    property="og:description"
                    content="Start chatting with verified Christian brides and grooms on TrueFriend Matrimony. Safe, private, and real-time messaging for your marriage journey."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />


            </Head>
            <div className="chatlist">
                <div className={`chatlist-open ${chatBoxToggle ? "chatlist-close" : ""}`}>
                    <div className="px-3 chat_header_wrapper">
                        <h5>
                            Chat List
                            <span className="float-right">
                                <span onClick={() => handleChatBoxToggle()} className="text-right">
                                    <i
                                        className={`fa ${chatBoxToggle ? "fa-plus" : "fa-minus"}`}
                                    ></i>
                                </span>
                            </span>
                        </h5>
                    </div>
                    <div className="box mt-2 sidebar-widget">
                        {onlineUsers &&
                            onlineUsers.length > 0 &&
                            onlineUsers
                                .filter((ele) => ele.profileID !== authProfile.profileID)
                                .map((ele, ind) => {
                                    console.log("online :", ele);
                                    const { basic, photos, gender } = ele;
                                    const imagePath = photos?.[0]?.imagePath || "";
                                    const image = photos?.[0]?.images?.large || "";
                                    const imageUrl = imageDomain + imagePath + image;
                                    return (
                                        <div key={ind} className="recent-post p-2 mb-1 d-flex">
                                            <div className="media-left me-2">
                                                <a href="#">
                                                    <div className="photo-image-sm">
                                                        <ImageFallback
                                                            gender={gender}
                                                            src={imageUrl}
                                                            alt={`Profile image of ${ele.userName}`}
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="media-body me-2">
                                                <a href="#" onClick={() => addUserToChat(ele)}>
                                                    {ele.userName}
                                                </a>
                                                <span>
                                                    {messages[messages.length - 1]?.message}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                    </div>
                </div>
            </div>
            <PrivateChat
                profileID={authProfile?.profileID}
                message={message}
                messages={messages}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
        onlineUsers: state.chat?.onlineUsers,
        chatUsers: state.chat?.chatUsers,
    };
};

const mapDispatchToProps = {
    initOnlineUsersAction,
    addOnlineUserAction,
    removeOnlineUserAction,
    emptyOnlineUserAction,
    addChatUserAction,
    emptyChatUserAction,
    initialChatMessages,
    pushChatMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxList);
