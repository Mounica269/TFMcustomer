import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import ConnectNowIcon from "components/common/connect-now";
import ViewContactIcon from "components/common/view-contact";
import ProfileImagesSlider from "components/matchs/profile-images-slider";
import ProfileAction from "components/matchs/profile-action";
import Link from "next/link";
import { Col, Row, Card, Overlay, Popover } from "react-bootstrap";
import { CONST, utils } from "core/helper";
import { connect } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import moment from "moment";

const ProfileCard = (props) => {
    const {
        commonData,
        profile,
        onReloadList,
        dontShow = true,
        blockProfile = true,
        isPhotoRequest,
    } = props;
    const { profileID, photos } = profile;
    const [isHovered, setIsHovered] = useState(false);

    const getCommonData = (key, value) => {
        const data = commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : "";
    };

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const youAndHerToggle = () => {
        setShow(!show);
        setTarget(event.target);
    };

    const getBio = () => {
        if (profile?.bio?.length > 25) {
            return (
                <p style={{ textAlign: "left", background: "none" }}>
                    {profile?.bio ? profile?.bio?.slice(0, 100) + "..." : ""}{" "}
                    <Link href={`${CONST.PROFILE_BY_ID_PATH + profileID}`}>more</Link>
                </p>
            );
        } else {
            return <p>{profile?.bio}</p>;
        }
    };

    const getChatlastseen = (date) => {
        const lastSeenTime = moment(date).startOf("hour").fromNow();
        console.log("lastSeenTime::", lastSeenTime);
        return lastSeenTime;
    };

    console.log("last seen siva", moment(profile?.lastChatActive).startOf("hour").fromNow());

    return (
        <>
            <div class="all-list-sh">
                <ul>
                    {/* <li>
                        <div
                            class="all-pro-box user-avil-onli"
                            data-useravil="avilyes"
                            data-aviltxt="Available online"
                        >
                            <div class="pro-img">
                                {photos && (
                                    <ProfileImagesSlider
                                        gender={profile.gender}
                                        photos={photos}
                                        profileID={profileID}
                                        profile={profile}
                                        isPhotoRequest={isPhotoRequest}
                                    />
                                )}
                                <div class="pro-ave" title="User currently available">
                                    <span class="pro-ave-yes"></span>
                                </div>
                                <div class="pro-avl-status">
                                        <span class="marqu">
                                            Last login {profile?.lastChatActive} |
                                        </span>
                                    </div>
                                {profile.isChatActive === 10 ? (
                                    <div class="pro-avl-status">
                                        <h5>Available Online</h5>
                                    </div>
                                ) : (
                                    <div class="pro-avl-status">
                                        <span class="marqu">
                                            Last login {profile?.lastChatActive} |
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div class="pro-detail">
                                <h4>
                                    <a href="profile-details.html">
                                        {utils.getUserDisplayNameWithLinkNew(
                                            profileID,
                                            profile.userName
                                        )}
                                    </a>
                                </h4>
                                <div class="pro-bio">
                                    <span>B.Sc</span>
                                    <span>IT Profession</span>
                                    <span>29 Yeard old</span>
                                    <span>Height: 155Cms</span>
                                </div>
                                <div class="links">
                                    <span class="cta-chat">Chat now</span>
                                    <a href="#!">WhatsApp</a>
                                    <a
                                        href="#!"
                                        class="cta cta-sendint"
                                        data-bs-toggle="modal"
                                        data-bs-target="#sendInter"
                                    >
                                        Send interest
                                    </a>
                                    <a href="profile-details.html">More detaiils</a>
                                </div>
                            </div>
                            <span
                                class="enq-sav"
                                data-toggle="tooltip"
                                title="Click to save this provile."
                            >
                                <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                            </span>
                        </div>
                    </li> */}
                    <li>
                        <div class="all-pro-box" data-useravil="avilno" data-aviltxt="Offline">
                            <div class="pro-img">
                                {photos && (
                                    <ProfileImagesSlider
                                        gender={profile.gender}
                                        photos={photos}
                                        profileID={profileID}
                                        profile={profile}
                                        isPhotoRequest={isPhotoRequest}
                                    />
                                )}
                                <div class="pro-ave" title="User currently available">
                                    <span class="pro-ave-yes"></span>
                                </div>
                                {profile.isChatActive === 10 ? (
                                    <div class="pro-avl-status">
                                        <h5>Available Online</h5>
                                    </div>
                                ) : (
                                    <div class="pro-avl-status">
                                        <span class="marqu">
                                            Last login {profile?.lastChatActive}{" "}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div class="pro-detail">
                                <h4>
                                   
                                        {" "}
                                        {utils.getUserDisplayNameWithLinkNew(
                                            profileID,
                                            profile.userName
                                        )}
                                       
                                        
                                    
                                </h4>
                                
                                <div class="pro-bio">
                              
                          
                                   
                                <span>
                                                    {profile.age} yr {profile.height ? ", " : ""}
                                                </span>
                                                <span>
                                                    {getCommonData("heightTypes", profile.height)}
                                                </span>

                                            <span className="d-block">
                                                {profile?.religion}, {profile?.community}
                                            </span>

                                            <span className="d-block">{profile?.language}</span>
                                </div>
                           
                       
                                <div class="links">
                               
                                               
                                        
                                        <span className="d-block">
                                                {" "}
                                                {getCommonData(
                                                    "maritalStatus",
                                                    profile.maritalStatus
                                                )}{" "}
                                            </span>
                                            <span className="d-block">
                                                {profile.city ? profile.city : ""}
                                                {profile.state ? ", " + profile.state : ""}
                                            </span>
                                            <span className="d-block">{profile?.profession}</span>
                                            <span className="d-block">{profile?.youAndHer?.diet}</span>
                                            <span className="d-block">{profile?.youAndHer?.degree}</span>
                                            <span className="d-block">{profile?.youAndHer?.community}</span>
                                       
                                    
                                    
                                    <a
                                        href="#!"
                                        class="cta cta-sendint"
                                        data-bs-toggle="modal"
                                        data-bs-target="#sendInter"
                                    >
                                        Send interest
                                    </a>
                                    <a href="profile-details.html">More detaiils</a>
                                </div>
                            </div>
                            <span
                                class="enq-sav"
                                data-toggle="tooltip"
                                title="Click to save this provile."
                            >
                                {/* <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> */}
                                <ProfileAction
                                            dontShow={dontShow}
                                            blockProfile={blockProfile}
                                            partnerProfileId={profileID}
                                        />
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <Card className="mb-3">
                <Row>
                    <Col md={3}>
                        {photos && (
                            <ProfileImagesSlider
                                gender={profile.gender}
                                photos={photos}
                                profileID={profileID}
                                profile={profile}
                                isPhotoRequest={isPhotoRequest}
                            />
                        )}
                    </Col>
                    <Col md={9}>
                        <Card.Body className="matchesProfile p-2">
                            <Row>
                                <Col md={8}>
                                    <Card.Title className="d-flex justify-content-between p-2 m-0">
                                        <h5>
                                            {" "}
                                            {utils.getUserDisplayNameWithLinkNew(
                                                profileID,
                                                profile.userName
                                            )}
                                        </h5>
                                        <ProfileAction
                                            dontShow={dontShow}
                                            blockProfile={blockProfile}
                                            partnerProfileId={profileID}
                                        />
                                    </Card.Title>
                                    <Row className="border-bottom mb-2 py-2">
                                        <Col md={6} xs={6} className="online-status">
                                            {profile.isChatActive === 10 ? (
                                                <Fragment>
                                                    <FontAwesomeIcon
                                                        className="comment-icon"
                                                        icon={faComment}
                                                    />
                                                    Online Now
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <FontAwesomeIcon
                                                        className="comment-icon"
                                                        icon={faComments}
                                                        style={{
                                                            fontSize: "22px",
                                                            width: "22px",
                                                            height: "22px",
                                                            marginLeft: "10px",
                                                            marginRight: "5px",
                                                        }}
                                                    />
                                                    {/* {profile?.isChatActive === 10
                                                    ? "Online"
                                                    : getChatlastseen(profile?.lastChatActive)} */}
                                                    {profile?.lastChatActive}
                                                </Fragment>
                                            )}
                                        </Col>
                                        <Col md={6} xs={6} className="partner-minimal-match">
                                            {(profile?.youAndHer?.isdiet ||
                                                profile?.youAndHer?.isdegree ||
                                                profile?.youAndHer?.isCommunity) && (
                                                <Fragment>
                                                    <div
                                                        className="icon-container"
                                                        onMouseEnter={() => setIsHovered(true)}
                                                        onMouseLeave={() => setIsHovered(false)}
                                                        style={{
                                                            position: "relative",
                                                            display: "inline-block",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            className="you-her-icon"
                                                            icon={faUserGroup}
                                                            style={{
                                                                fontSize: "22px",
                                                                width: "22px",
                                                                height: "22px",
                                                                marginLeft: "1px",
                                                                marginRight: "5px",
                                                            }}
                                                        />
                                                        <span
                                                            className="you-her-text"
                                                            onClick={youAndHerToggle}
                                                        >
                                                            You &{" "}
                                                            {profile?.gender === 10 ? "Him" : "Her"}
                                                        </span>

                                                        {/* Hover content */}
                                                        {isHovered && (
                                                            <div
                                                                className="shadow you-her-content text-nowrap"
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "30px",
                                                                    left: "0",
                                                                    backgroundColor: "#f1f1f1",
                                                                    padding: "5px",
                                                                    borderRadius: "5px",
                                                                    boxShadow:
                                                                        "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                                    whiteSpace: "nowrap",
                                                                    zIndex: 2,
                                                                    marginLeft: "-70px",
                                                                }}
                                                            >
                                                                {profile?.youAndHer?.isdiet && (
                                                                    <p>
                                                                        {profile?.youAndHer?.isdiet
                                                                            ? utils.rightIcon(
                                                                                  25,
                                                                                  25
                                                                              )
                                                                            : utils.closeIcon(
                                                                                  25,
                                                                                  25
                                                                              )}
                                                                        {profile?.youAndHer?.diet}
                                                                    </p>
                                                                )}
                                                                {profile?.youAndHer?.isdegree && (
                                                                    <p>
                                                                        {profile?.youAndHer
                                                                            ?.isdegree
                                                                            ? utils.rightIcon(
                                                                                  25,
                                                                                  25
                                                                              )
                                                                            : utils.closeIcon(
                                                                                  25,
                                                                                  25
                                                                              )}{" "}
                                                                        {profile?.youAndHer?.degree}
                                                                    </p>
                                                                )}
                                                                {profile?.youAndHer
                                                                    ?.isCommunity && (
                                                                    <p>
                                                                        {profile?.youAndHer
                                                                            ?.isCommunity
                                                                            ? utils.rightIcon(
                                                                                  25,
                                                                                  25
                                                                              )
                                                                            : utils.closeIcon(
                                                                                  25,
                                                                                  25
                                                                              )}{" "}
                                                                        {
                                                                            profile?.youAndHer
                                                                                ?.community
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Fragment>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col
                                            md={6}
                                            xs={6}
                                            className="about"
                                            style={{ textAlign: "left" }}
                                        >
                                            <span className="d-block">
                                                <span>
                                                    {profile.age} yr {profile.height ? ", " : ""}
                                                </span>
                                                <span>
                                                    {getCommonData("heightTypes", profile.height)}
                                                </span>
                                            </span>
                                            <span className="d-block">
                                                {profile?.religion}, {profile?.community}
                                            </span>
                                            <span className="d-block">{profile?.language}</span>
                                        </Col>
                                        <Col
                                            md={6}
                                            xs={6}
                                            className="about"
                                            style={{ textAlign: "left" }}
                                        >
                                            <span className="d-block">
                                                {" "}
                                                {getCommonData(
                                                    "maritalStatus",
                                                    profile.maritalStatus
                                                )}{" "}
                                            </span>
                                            <span className="d-block">
                                                {profile.city ? profile.city : ""}
                                                {profile.state ? ", " + profile.state : ""}
                                            </span>
                                            <span className="d-block">{profile?.profession}</span>
                                        </Col>
                                    </Row>
                                    <Card.Footer style={{ marginLeft: "-10px" }}>
                                        {getBio()}
                                    </Card.Footer>
                                </Col>
                                <Col md={4} className="border-start">
                                    <div className="flex-column text-center mt-6">
                                        <div>
                                            <h6 className="mt-5 pt-4">Like This Profile</h6>
                                        </div>
                                        <ConnectNowIcon
                                            onReloadList={onReloadList}
                                            animate={"animate"}
                                            ProfileID={profileID}
                                            profile={profile}
                                            style={{ marginLeft: "-60px" }}
                                        />
                                        <div>
                                            <ViewContactIcon
                                                profile={profile}
                                                ProfileID={profileID}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
    };
};

export default connect(mapStateToProps, null)(ProfileCard);
