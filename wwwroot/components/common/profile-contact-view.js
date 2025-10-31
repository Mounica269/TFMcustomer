import { Fragment } from "react";
import { connect } from "react-redux";
import ImageFallback from "components/common/image-fallback";
import { utils } from "core/helper";

const ProfileContactView = (props) => {
    const { commonData, profile } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const { profileID, gender, photos = null, userName } = profile;

    const getCommonDataValue = (key, value) => {
        const data = commonData[key]?.find(ele => ele.code === value);
        return data ? data.label : ""
    };

    return (
        <Fragment>
            <div className="recent-post p-2 mb-1 bottom-border d-flex">
                <div className="media-left me-2">
                    <a href="#">
                        <div className="media-object">
                            <div className="photo-image-sm">
                                <ImageFallback
                                    width={125}
                                    height={125}
                                    gender={gender}
                                    alt={`Profile picture of ${userName}`}
                                     loading="lazy"
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
                <div>
                    <p className="mb-0">
                        Call initiated with{" "}
                       <span> {utils.getUserDisplayNameWithLinkNew(profileID, userName)} </span>
                    </p>
                    <label>
                        {profile?.age}, {getCommonDataValue("heightTypes", profile?.height)}, {profile?.religion}, {profile?.community}, {profile?.language}, {profile?.profession},   {getCommonDataValue("category", profile?.degreeCategory)}
                    </label>
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

export default connect(mapStateToProps, null)(ProfileContactView);
