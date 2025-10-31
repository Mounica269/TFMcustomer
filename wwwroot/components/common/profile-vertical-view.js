import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import ImageFallback from "components/common/image-fallback";
import { utils } from "core/helper";
import ConnectNowIcon from "components/common/connect-now";
import Link from "next/link";
import { useState } from "react";

const ProfileVerticalView = (props) => {
const { profile } = props;
const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
const { profileID, user, photos, gender, userName } = profile;
const photoSrc =
photos && photos.length > 0 ? photos[0]?.imagePath + photos[0]?.images?.large : "";

const [loading, setLoading] = useState(true);
const imageLoaded = () => {
if (photos !== "") {
setLoading(false);
}
};

return (
<ul class="slider3">
    <li>
        <div class="wedd-rel-box">
            <div class="wedd-rel-img">
                <ImageFallback gender={gender} src={imageDomain + photoSrc} alt={`${userName || "Profile"}'s profile picture`}  />
                <span class="badge badge-success">
                    {profile?.age && profile?.age + "yr"}
                </span>
            </div>
            <div class="wedd-rel-con">
                <h5>
                    {utils.getUserDisplayNameWithLinkNew(profileID, userName)}
                </h5>
                {profile.bio ? (
                <span>
                    {profile?.bio ? profile?.bio?.slice(0, 15) + "..." : "-"}{" "}
                    <b>
                        <Link className="more" href={`/profile?profileId=${profileID}`}>More</Link>
                    </b>
                </span>
                ) : (
                    <span>-</span>
                )}
                <ConnectNowIcon ProfileID={profileID} profile={profile} />



            </div>
            {/*
            <ConnectNowIcon ProfileID={profileID} profile={profile} /> */}
        </div>
    </li>


</ul>

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

export default connect(mapStateToProps, null)(ProfileVerticalView);
