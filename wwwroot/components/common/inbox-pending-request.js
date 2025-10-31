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

const PendingRequestProfileCard = (props) => {
    const { commonData, profile, onReloadList, dontShow = true, blockProfile=true } = props;
    const { profileID, photos } = profile;

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
                <p>
                    {profile?.bio ? profile?.bio?.slice(0, 30) + "..." : ""}{" "}
                    <Link href={`${CONST.PROFILE_BY_ID_PATH + profileID}`}>more</Link>
                </p>
            );
        } else {
            return <p>{profile?.bio}</p>;
        }
    };

    const getChatlastseen = (date) => {
        const lastSeenTime = moment(date).startOf("hour").fromNow();
        return lastSeenTime;
    };

    return (
        <Card className="mb-5 ">
            <Row>
                <Col md={3} className="p-0">
                    {photos && (
                        <ProfileImagesSlider
                            gender={profile.gender}
                            photos={photos}
                            profileID={profileID}
                            profile={profile}
                            alt={`Profile image of ${profile.userName || "user"}`}
                        />
                    )}
                </Col>
                <Col md={9}>
                    <Card.Body className="matchesProfile p-2">
                        <Row>
                            <Col md={8}>
                                <Card.Title className="d-flex justify-content-between p-2 m-0">
                                    {utils.getUserDisplayNameWithLinkNew(
                                        profileID,
                                        profile.userName
                                    )}
                                    <ProfileAction dontShow={dontShow} blockProfile={blockProfile} partnerProfileId={profileID} />
                                </Card.Title>
                                <Row className="border-bottom border-dark py-2">
                                    <Col md={6} xs={6} className="online-status">
                                        {profile.isChatActive === 10 ? (
                                            <Fragment>
                                                <FontAwesomeIcon
                                                    className="comment-icon"
                                                    icon={faComment}
                                                    style={{ fontSize: "22px", width: "22px", height: "22px", marginLeft: "10px",marginRight: "5px" }}
                                                />
                                                Online Now
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <FontAwesomeIcon
                                                    className="comment-icon"
                                                    icon={faComments}
                                                />
                                                {profile?.isChatActive === 10
                                                    ? "Online"
                                                    : getChatlastseen(profile?.lastChatActive)}
                                            </Fragment>
                                        )}
                                    </Col>
                                    <Col md={6} xs={6} className="partner-minimal-match">
                                        <FontAwesomeIcon
                                            className="you-her-icon"
                                            icon={faUserGroup}
                                        />
                                        <span className="you-her-text" onClick={youAndHerToggle}>
                                            You & Her
                                        </span>
                                        {/* <Overlay
                                            show={show}
                                            target={target}
                                            placement="bottom"
                                            containerPadding={20}
                                            className="you-her-content"
                                        >
                                            <Popover id="popover-contained">
                                                <Popover.Body className="d-block px-2 my-2 w-100">
                                                   
                                                </Popover.Body>
                                            </Popover>
                                        </Overlay> */}
                                        <div className="shadow you-her-content text-nowrap">
                                            <p>
                                                {profile?.isdiet
                                                    ? utils.rightIcon(25, 25)
                                                    : utils.closeIcon(25, 25)}
                                                {profile?.youAndHer?.diet}
                                            </p>
                                            <p>
                                                {profile?.isdegree
                                                    ? utils.rightIcon(25, 25)
                                                    : utils.closeIcon(25, 25)}{" "}
                                                {profile?.youAndHer?.degree}
                                            </p>
                                            <p>
                                                {profile?.isCommunity
                                                    ? utils.rightIcon(25, 25)
                                                    : utils.closeIcon(25, 25)}{" "}
                                                {profile?.youAndHer?.community}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} xs={6} className="about">
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
                                    <Col md={6} xs={6} className="about">
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
                                <Card.Footer>{getBio()}</Card.Footer>
                            </Col>
                            <Col md={4} className="border-start">
                                <div className="flex-column text-center pt-5">
                                    <div>Like This Profile</div>
                                    <ConnectNowIcon
                                        onReloadList={onReloadList}
                                        animate={"animate"}
                                        ProfileID={profileID}
                                        profile={profile}
                                    />
                                    <div>
                                        <ViewContactIcon profile={profile} ProfileID={profileID} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
    };
};

export default connect(mapStateToProps, null)(PendingRequestProfileCard);