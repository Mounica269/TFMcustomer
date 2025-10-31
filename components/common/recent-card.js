import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import ConnectNowIcon from "components/common/connect-now";
import ViewContactIcon from "components/common/view-contact";
import ProfileImagesSlider from "components/matchs/profile-images-slider";
import ProfileAction from "components/matchs/profile-action";
import Link from "next/link";
import { Col, Row, Card } from "react-bootstrap";
import { utils } from "core/helper";
import { connect } from "react-redux";
import { Fragment, useEffect } from "react";

const ProfileCard = (props) => {
    const { token, commonData, profile } = props;
    const { profileID, photos } = profile;

    const getCommonData = (key, value) => {
        const data = commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : "";
    };

    // useEffect(() => {
    //     if (!token) {
    //         router.push(CONST.LOGIN_PATH);
    //         return <Fragment>Need to Login to view this page</Fragment>;
    //     }
    // }, [token]);

    return (
        <Card className="mb-5">
            <Row>
                <Col md={3}>
                    <ProfileImagesSlider
                        gender={profile.userGender}
                        photos={photos}
                        profileID={profileID}
                    />
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
                                    <ProfileAction partnerProfileId={profileID} />
                                </Card.Title>
                                <Row className="horizontal-line ">
                                    <Col md={6} xs={6}>
                                        <p>
                                            {profile.isChatActive === 10 ? (
                                                <Fragment>
                                                    <FontAwesomeIcon
                                                        className="comment-icon"
                                                        icon={faComment}
                                                    />
                                                    style={{ fontSize: "22px", width: "22px", height: "22px", marginLeft: "10px",marginRight: "5px" }}
                                                    Online Now
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <FontAwesomeIcon
                                                        className="comment-icon"
                                                        icon={faComments}
                                                    />
                                                    Online 1d ago
                                                </Fragment>
                                            )}
                                        </p>
                                    </Col>
                                    <Col md={6} xs={6}>
                                        <p>
                                            <FontAwesomeIcon
                                                className="you-her-icon"
                                                icon={faUserGroup}
                                            />
                                            You & Her
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} xs={6}>
                                        <div className="about">
                                            <p>
                                                <span>{profile.age} yr,</span>
                                                <span>
                                                    {getCommonData("heightTypes", profile.height)}
                                                </span>
                                            </p>
                                            <p>
                                                {profile?.religion}, {profile?.community}
                                            </p>
                                            <p>{profile?.language}</p>
                                        </div>
                                    </Col>
                                    <Col md={6} xs={6}>
                                        <div className="about">
                                            <p>
                                                {" "}
                                                {getCommonData(
                                                    "maritalStatus",
                                                    profile.maritalStatus
                                                )}{" "}
                                            </p>
                                            <p>
                                                {profile.city ? profile.city : ""}
                                                {profile.state ? ", " + profile.state : ""}
                                            </p>
                                            {/* <p>Not Specified</p> */}
                                            <p>{profile?.profession}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Card.Footer>
                                    {profile.bio}
                                    <Link href={`/profile?profileId=${profileID}`}>More</Link>
                                </Card.Footer>
                            </Col>
                            <Col md={4} className="border-start">
                                <div className="d-flex flex-column justify-content-around">
                                    <div className="p-2">Like This Profile</div>
                                    <div className="p-2">
                                        <ConnectNowIcon
                                            animate={"animate"}
                                            ProfileID={profileID}
                                            profile={profile}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <ViewContactIcon ProfileID={profileID} />
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

export default connect(mapStateToProps, null)(ProfileCard);
