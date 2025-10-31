import { Fragment } from "react";
import { connect } from "react-redux";
import ImageFallback from "components/common/image-fallback";
import { utils } from "core/helper";
import ConnectNowIcon from "components/common/connect-now";
import { Col, Container, Row } from "react-bootstrap";

const ProfileSmallView = (props) => {
    const { profile } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const { profileID, user: profileUser = null, photos = null, userName } = profile;
    const getProfileInfo = (profile) => {
        let infoProfileArr = [
            profile?.age ? profile?.age + " yrs" : "",
            profile?.height ? profile?.height + " cm" : "",
            profile?.language ? profile?.language : "",
        ];
        infoProfileArr = [...new Set(infoProfileArr.filter((x) => x))];
        return infoProfileArr.join(", ");
    };

    return (
        <Fragment>
            <Container>
                <Row className="border-bottom d-flex align-items-center p-2">
                    <Col xs={3}>
                        <div className="media-object">
                            <div className="photo-image-sm" >
                                <ImageFallback
                                    width={185}
                                    height={185}
                                    style={{borderRadius:"50px"}}
                                    gender={profile?.gender}
                                    alt={`${userName}'s profile picture`}
                                    src={
                                        imageDomain +
                                        (photos?.length > 0 && photos[0]?.imagePath
                                            ? photos[0]?.imagePath
                                            : "/") +
                                        (photos?.length > 0 && photos[0]?.images
                                            ? photos[0]?.images?.large
                                            : "")
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={4} className="text-start">
                        <div className="profile_small_view_content">
                            {utils.getUserDisplayNameWithLinkNew(profileID, userName)}
                            <div className="profile-info-mini">
                                <span className="d-block text-wrap">{getProfileInfo(profile)}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={5}>
                        <div className="profile_small_view">
                            <ConnectNowIcon
                                animate={"animate"}
                                ProfileID={profileID}
                                profile={profile}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProfileSmallView;
