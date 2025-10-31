import ImageFallback from "components/common/image-fallback";
import { connect } from "react-redux";
import { removeChatUserAction, minizeChatUserAction } from "core/redux/account/chat.action";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import Link from "next/link";
import { CONST } from "core";

const PrivateChat = (props) => {
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const {
        chatUsers,
        removeChatUserAction,
        minizeChatUserAction,
        setMessage,
        sendMessage,
        message,
        messages,
        profileID,
    } = props;

    console.log("chat prev msges::", messages);

    return (
        <>
            <Head>
                <title>Chat | TrueFriend Matrimony | Christian Matrimony Private Chat  </title>
                <meta
                    name="description"
                    content="Connect instantly with verified Christian brides and grooms through secure private chat on TrueFriend Matrimony. Start your Christian marriage journey safely and confidently today!"
                />
                <meta
                    name="keywords"
                    content="Christian matrimony, Christian Matrimony India , Private chat Christian brides, Christian grooms chat, TrueFriend Christian marriage, matrimony matchmaking India,Faith-Based Matrimony, Secure Matrimony Chat India,Verified Christian Matrimony, Christian Matrimony Chat"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com" />

                {/* Open Graph */}
                <meta property="og:title" content="Christian Matrimony Private Chat | TrueFriend Matrimony" />
                <meta property="og:description" content="Talk privately to Christian brides and grooms. Begin your Christian marriage journey with secure, real-time chat." />
                <meta property="og:url" content="https://www.truefriendmatrimony.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />


            </Head>



            <div className="chatbox-holder">
                {chatUsers &&
                    chatUsers.map((ele, ind) => {
                        console.log("chat ele::", ele);
                        const { gender, photos, profileID: chatConnectProfileId } = ele;
                        return (
                            <div
                                key={ind}
                                className={`chatbox-open ${!ele.isChatOpen ? "chatbox-close" : ""}`}
                            >
                                <div className="chatbox-top">
                                    <div className="chatbox-avatar">
                                        <a href="">
                                            <div className="photo-image-sm">
                                                <ImageFallback
                                                    width={125}
                                                    height={125}
                                                    gender={gender}
                                                    alt={`Profile picture of ${ele.userName}`}
                                                    src={
                                                        imageDomain +
                                                        (photos?.[0]?.imagePath
                                                            ? photos?.[0]?.imagePath
                                                            : "/") +
                                                        (photos?.[0]?.images
                                                            ? photos?.[0]?.images?.large
                                                            : "")
                                                    }
                                                />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="chat-partner-name">
                                        <span className="status online"></span>
                                        <Link
                                            passHref
                                            href={
                                                CONST.PROFILE_VIEW_PATH +
                                                "?profileId=" +
                                                chatConnectProfileId
                                            }
                                        >
                                            <a href="#" rel="noopener noreferrer" target="_blank">
                                                {ele.userName}
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="chatbox-icons">
                                        <span onClick={() => minizeChatUserAction(ele.profileID)}>
                                            <i className="fa fa-minus"></i>
                                        </span>
                                        <span onClick={() => removeChatUserAction(ele.profileID)}>
                                            <i className="fa fa-close"></i>
                                        </span>
                                    </div>
                                </div>
                                <ScrollToBottom className="chat-messages" debug={false}>
                                    {messages &&
                                        messages.map((msg, ind) => {
                                            const profileSelfCls =
                                                msg.postedBy !== profileID ? "message-partner" : "";
                                            return (
                                                <div className="message-box-holder" key={ind}>
                                                    <div className={`message-box ${profileSelfCls}`}>
                                                        {msg.message}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </ScrollToBottom>
                                {/* <div className="chat-messages">
                                {
                                    messages && messages.map((msg, ind) => {
                                        const profileSelfCls = (msg.postedBy !== profileID) ? "message-partner" : "";
                                        return (
                                            <div className="message-box-holder" key={ind}>
                                                <div className={`message-box ${profileSelfCls}`}>{msg.message}</div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="message-box-holder">
                                    <div className="message-sender">Mamun Khandaker</div>
                                    <div className="message-box">Hello</div>
                                </div>
                                <div className="message-box-holder">
                                    <div className="message-sender">Mamun Khandaker</div>
                                    <div className="message-box message-partner">Hi.</div>
                                </div>
                            </div> */}
                                <div className="chat-input-holder">
                                    <Form className="form-control p-0">
                                        <Row>
                                            <Col md={12}>
                                                {/* <Form.Control
                                                className="chat-input p-2"
                                                type="text-area"
                                                value={message}
                                                onChange={({ target: { value } }) =>
                                                    setMessage(value)
                                                }
                                                onKeyPress={(event) =>
                                                    event.key === "Enter"
                                                        ? sendMessage(event, ele)
                                                        : null
                                                }
                                            ></Form.Control> */}
                                                <InputGroup className="">
                                                    <Form.Control
                                                        className="chat-input p-2"
                                                        type="text"
                                                        aria-label="Type your message"
                                                        placeholder="Write a message..."
                                                        value={message}
                                                        onChange={({ target: { value } }) =>
                                                            setMessage(value)
                                                        }
                                                        onKeyPress={(event) =>
                                                            event.key === "Enter"
                                                                ? sendMessage(event, ele)
                                                                : null
                                                        }
                                                    />
                                                    <Button
                                                        className="message-send"
                                                        onClick={(e) => sendMessage(e, ele)}
                                                    >
                                                        <i className="bi bi-send"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        chatUsers: state.chat?.chatUsers,
    };
};

const mapDispatchToProps = {
    removeChatUserAction,
    minizeChatUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
