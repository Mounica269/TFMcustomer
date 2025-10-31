import { Fragment } from "react";
import { connect } from "react-redux";
import ImageFallback from "components/common/image-fallback";
import { utils } from "core/helper";

const PersonalNotifications = (props) => {
    const { commonData, profile } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const { profileID, user: profileUser = null, photos = null, userName } = profile;

    const getCommonDataValue = (key, value) => {
        const data = commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : "";
    };

    const covertForNoficationType = (profile) => {
        return (
            <Fragment>
                {profile?.age}, {getCommonDataValue("heightTypes", profile?.height)},  
                {profile?.religion}, {profile?.community}, {profile?.language},{" "}
                {profile?.profession}, {getCommonDataValue("category", profile?.degreeCategory)}
            </Fragment>
        );
    };

    const getSplitNotificationType = (profile) => {
        switch (profile?.notificationType) {
            case 10:
                return "Invited you to start a conversation";
            case 20:
                return "Accepted the invitation";
            case 30:
                return "Your invitation has been declined";
            case 40:
                return "Reminded the invitation";
            case 50:
                return "Raised photo request to see your profile photo";
            case 60:
                return "Your photo request was accepted";
            case 70:
                return "Raised phone request";
            case 80:
                return "Your phone request was accepted";
            case 90:
                return "Your subscription expires soon";
            default:
                break;
        }
    };

    return (
        <Fragment>
            <div className="recent-post p-2 mb-1 bottom-border d-flex">
                <div className="media-left me-2 d-flex align-items-center">
                    <a href="#">
                        <div className="media-object">
                            <div className="photo-image-sm">
                                <ImageFallback
                                    width={125}
                                    height={125}
                                    gender={profile?.gender}
                                    src={
                                        imageDomain +
                                        (photos[0]?.imagePath ? photos[0]?.imagePath : "/") +
                                        (photos[0]?.images ? photos[0]?.images?.large : "")
                                    }
                                />
                            </div>
                        </div>
                    </a>
                </div>
                <div className="d-block">
                    <div className="d-flex ">
                    <div className="notification-texts">
                        <p className="mb-0 d-flex align-items-center" style={{ paddingRight:'5px' }}>
                            {utils.getUserDisplayNameWithLinkNew(profileID, userName)}
                        </p>
                         
                        
                            <span className="text-dark notify_msg">
                                {getSplitNotificationType(profile)}
                            </span>
                            <label>{covertForNoficationType(profile)}</label>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
    };
};

export default connect(mapStateToProps, null)(PersonalNotifications);
