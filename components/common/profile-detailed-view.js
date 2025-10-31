import { Fragment, useEffect } from "react";
import Link from "next/link";
import { Col, Container, Form, Card, Spinner } from "react-bootstrap";
import ConnectNowIcon from "components/common/connect-now";
import ViewContactIcon from "components/common/view-contact";
import { connect, useSelector } from "react-redux";
import ProfileImagesLargeSlider from "components/matchs/profile-images-large-slider";
import ProfileAction from "components/matchs/profile-action";
import { CONST, utils } from "core/helper";
import moment from "moment";
import { Row } from "react-bootstrap";

const ProfileDetailedView = (props) => {
    const { token, authProfile, commonData, profile } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);

    const {
        profileID,
        user: profileUser = null,
        photos = null,
        basic = null,
        contactDetails = null,
        location = null,
        qualification = null,
        preference = null,
        family = null,
        matchPreferenceResult = null,
        name,
        isBlocked,
    } = profile;

    const authUserProfile = useSelector((state) => state.account?.profile);

    const getCommonData = (key, value) =>
        commonData ? utils.getCommonData(commonData, key, value) : false;
    const getFirstCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const getFamilyMessage = (family) => {
        return (
            <p>
                {family.familyAffluence &&
                    "Ours is a " + getCommonData("familyAffluence", family.familyAffluence) + ","}
                {family.location && "originally from " + family.location + ","}
                {family.familyValue &&
                    "with " + getCommonData("familyValue", family.familyValue) + "."}
                {family.fatherBusiness &&
                    "My father is " +
                        // getCommonData("business", family.fatherBusiness)
                        family.fatherBusiness +
                        " "}
                {family.motherBusiness &&
                    "and my mother is " +
                        // getCommonData("business", family.motherBusiness)
                        family.motherBusiness +
                        "."}
                {family?.sibling?.noOfMale &&
                    family?.sibling?.noOfMale > 0 &&
                    "I have " + family?.sibling?.noOfMale + " brother"}
                {family?.sibling?.noOfMaleMarried > 0 ? "," : "."}
                {family?.sibling?.noOfMale > 0 &&
                    family?.sibling?.noOfMaleMarried > 0 &&
                    family?.sibling?.noOfMaleMarried &&
                    "(" + family?.sibling?.noOfMaleMarried + " married" + ")"}
                {family?.sibling?.noOfFemale > 0 &&
                    family?.sibling?.noOfFemale &&
                    " and " + family?.sibling?.noOfFemale + "sister "}
                {family?.sibling?.noOfFemale > 0 &&
                    family?.sibling?.noOfFemaleMarried > 0 &&
                    family?.sibling?.noOfFemaleMarried &&
                    "(" + family?.sibling?.noOfFemaleMarried + " married" + ")"}
            </p>
        );
    };

    const getLifeStyleSection = (diet) => {
        return (
            <div class="pr-bio-c pr-bio-info">
                <h3>Lifestyle</h3>
                <ul>
                    <li>
                        <b>Diet:</b> {getCommonData("dietTypes", diet)}
                    </li>
                </ul>
            </div>
        );
    };

    const getFamilySection = (family) => {
        return (
            <div class="pr-bio-c pr-bio-abo">
                <h3>Family Details</h3>
                <p>{getFamilyMessage(family)}</p>
            </div>
        );
    };

    const getContactDetailSection = (profileUser) => {
        return (
            <Fragment>
                <div class="pr-bio-c pr-bio-conta">
                    <h3>Contact Details</h3>
                    <Container>
                        <Row className="row">
                            <Col md={12} sm={12}>
                                <ul>
                                    <li>
                                        <span>
                                            <i class="fa fa-mobile" aria-hidden="true"></i>
                                            <b>Contact Number : </b>
                                            {profileUser?.phoneCode + "" + profileUser?.phone}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                            <b>Email ID :</b>
                                            {profileUser?.email}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <i class="fa fa fa-map-marker" aria-hidden="true"></i>
                                            <b>Address: </b>
                                            {location?.city?.name ? location.city.name : ""}{" "}
                                            {location?.state?.name
                                                ? ", " + location.state.name
                                                : ""}
                                        </span>
                                    </li>
                                </ul>
                            </Col>

                            {/* <Col md={4}>

<div class="prof-rhs-help">
            <div class="inn">
            {authUserProfile?.subscription === null ? (
                                    <Fragment>
                                        
                                        <Link href={CONST.PLAN_UPGRADE_PATH}>
                                            <a
                                                target="_blank"
                                                
                                            >
                                                Upgrade Now
                                            </a>
                                        </Link>{" "}
                                    </Fragment>
                                ) : (
                                    <ViewContactIcon ProfileID={profileID} />
                                )}

            </div>
        </div>

</Col> */}
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    };

    const getBackgroundSection = (basic, location) => {
        return (
            <div class="pr-bio-c pr-bio-info">
                <h3>Background</h3>
                <ul>
                    <li>
                        <b>Born on:</b> {basic?.dateOfBirth}
                    </li>
                    <li>
                        <b>Religion:</b> {basic?.religion?.name}
                    </li>
                    <li>
                        <b>Community:</b>
                        {basic?.community?.community ? basic.community.community : ""}
                        {basic?.sub_community?.community
                            ? ", " + basic.sub_community.community
                            : ""}
                    </li>
                    {location && (
                        <li>
                            <b>Location:</b>
                            {location?.city?.name ? location.city.name : ""}
                            {location?.state?.name ? ", " + location.state.name : ""}
                        </li>
                    )}
                </ul>
            </div>
        );
    };

    const getQualificationSection = (qualification) => {
        return (
            <div class="pr-bio-c pr-bio-info">
                <h3>Education &amp; Career</h3>
                <ul>
                    {qualification?.degree?.name && (
                        <li>
                            <b>Degree:</b> {qualification?.degree?.name}
                        </li>
                    )}
                    {qualification?.collage?.name && (
                        <li>
                            <b>Collage name:</b> {qualification?.collage?.name}
                        </li>
                    )}
                    {qualification?.workWith && (
                        <li>
                            <b>Profession name:</b>
                            {qualification?.profession?.name} Works in
                            {getCommonData("workWithTypes", qualification?.workWith)}
                        </li>
                    )}
                    {qualification?.yearlyIncome && qualification?.yearlyIncome !== 100 && (
                        <li>
                            <b>Yearly Income:</b>
                            {qualification?.profession?.name} Works in
                            {getCommonData("yearlyIncome", qualification?.yearlyIncome)}
                        </li>
                    )}
                </ul>
            </div>
        );
    };

    const getPreferenceSection = (preference) => {
        return (
            <li>
                <div className="profile-inner">
                    <div className="profile-ph" id="preferences">
                        <div className="pr-bio-c pr-bio-info">
                            <h3>What She is looking for</h3>
                            <div className="pt-3 pb-3">
                                You have{" "}
                                {matchPreferenceResult?.matchedCount +
                                    " / " +
                                    matchPreferenceResult?.totalMatchesCount}{" "}
                                matches to this profile.
                            </div>

                            <ul>
                                <li className="d-flex justify-content-between">
                                    <div>
                                        <div className="partner_profile_looking_title">Age</div>
                                        {preference?.age?.from + " to " + preference?.age?.to}
                                    </div>
                                    <div>
                                        <span>
                                            {matchPreferenceResult?.matches.isAgeMatch
                                                ? utils.rightIcon(25, 25)
                                                : utils.closeIcon(25, 25)}
                                        </span>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <div>
                                        <div className="partner_profile_looking_title">Height</div>
                                        {preference?.height?.from +
                                            " cms to " +
                                            preference?.height?.to +
                                            " cms"}
                                    </div>
                                    <div>
                                        <span>
                                            {matchPreferenceResult?.matches.isHeightMatch
                                                ? utils.rightIcon(25, 25)
                                                : utils.closeIcon(25, 25)}
                                        </span>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <div>
                                        <div className="partner_profile_looking_title">
                                            Marital Status
                                        </div>
                                        {preference?.maritalStatus === undefined ||
                                        preference?.maritalStatus.length === 0
                                            ? `Does't Matter`
                                            : preference?.maritalStatus
                                                  ?.map((ele) =>
                                                      getCommonData("maritalStatus", ele)
                                                  )
                                                  .join(", ")}
                                    </div>
                                    <div>
                                        <span>
                                            {matchPreferenceResult?.matches.isMaritalStatusMatch
                                                ? utils.rightIcon(25, 25)
                                                : utils.closeIcon(25, 25)}
                                        </span>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <div>
                                        <div className="partner_profile_looking_title">
                                            Mother Tongue
                                        </div>
                                        {preference?.language === undefined ||
                                        preference?.language.length === 0
                                            ? `Does't Matter`
                                            : preference?.language
                                                  .map((ele) => ele.name)
                                                  .join(", ")}
                                    </div>
                                    <div>
                                        <span>
                                            {matchPreferenceResult?.matches.isLanguageMatch
                                                ? utils.rightIcon(25, 25)
                                                : utils.closeIcon(25, 25)}
                                        </span>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <div>
                                        <div className="partner_profile_looking_title">
                                            Religion / Community
                                        </div>
                                        {preference?.community === undefined ||
                                        preference?.community.length === 0
                                            ? `Does't Matter`
                                            : preference?.community
                                                  .map((ele) => ele.community)
                                                  .join(", ")}
                                    </div>
                                    <div>
                                        <span>
                                            {matchPreferenceResult?.matches.isCommunityMatch
                                                ? utils.rightIcon(25, 25)
                                                : utils.closeIcon(25, 25)}
                                        </span>
                                    </div>
                                </li>
                                {preference?.hasMore && (
                                    <>
                                        <li className="d-flex justify-content-between">
                                            <div>
                                                <div className="partner_profile_looking_title">
                                                    Country Living in
                                                </div>
                                                {preference?.location?.country === undefined ||
                                                preference?.location?.country.length === 0
                                                    ? `Does't Matter`
                                                    : preference?.location?.country
                                                          .map((ele) => ele.name)
                                                          .join(", ")}
                                            </div>
                                            <div>
                                                <span>
                                                    {preference?.location?.country === undefined ||
                                                    preference?.location?.country.length === 0
                                                        ? `+`
                                                        : preference?.location?.country.includes(
                                                              authProfile?.location?.country?._id
                                                          )
                                                        ? `+`
                                                        : `-`}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <div>
                                                <div className="partner_profile_looking_title">
                                                    State Living in
                                                </div>
                                                {preference?.location?.state === undefined ||
                                                preference?.location?.state.length === 0
                                                    ? `Does't Matter`
                                                    : preference?.location?.state
                                                          .map((ele) => ele.name)
                                                          .join(", ")}
                                            </div>
                                            <div>
                                                <span>
                                                    {preference?.location?.state === undefined ||
                                                    preference?.location?.state.length === 0
                                                        ? `+`
                                                        : preference?.location?.state.includes(
                                                              authProfile?.location?.state?._id
                                                          )
                                                        ? `+`
                                                        : `-`}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <div>
                                                <div className="partner_profile_looking_title">
                                                    City Living in
                                                </div>
                                                {preference?.location?.city === undefined ||
                                                preference?.location?.city.length === 0
                                                    ? `Does't Matter`
                                                    : preference?.location?.city
                                                          .map((ele) => ele.name)
                                                          .join(", ")}
                                            </div>
                                            <div>
                                                <span>
                                                    {preference?.location?.city === undefined ||
                                                    preference?.location?.city.length === 0
                                                        ? `+`
                                                        : preference?.location?.city.includes(
                                                              authProfile?.location?.city?._id
                                                          )
                                                        ? `+`
                                                        : `-`}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <div>
                                                <div className="partner_profile_looking_title">
                                                    Diet
                                                </div>
                                                {preference?.otherDetails?.diet === undefined ||
                                                preference?.otherDetails?.diet.length === 0
                                                    ? `Does't Matter`
                                                    : preference?.otherDetails?.diet
                                                          .map((ele) => ele.name)
                                                          .join(", ")}
                                            </div>
                                            <div>
                                                <span>
                                                    {preference?.otherDetails?.diet === undefined ||
                                                    preference?.otherDetails?.diet.length === 0
                                                        ? `+`
                                                        : preference?.otherDetails?.diet.includes(
                                                              authProfile?.basic?.diet?._id
                                                          )
                                                        ? `+`
                                                        : `-`}
                                                </span>
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    const getConvinentTimeSection = (contact) => {
        return (
            <div class="pr-bio-c pr-bio-info">
                <h3>Convenient Person To Call</h3>
                <ul>
                    <li>
                        <b>Contact Person :</b> {contact?.nameOfContact}
                    </li>
                    <li>
                        <b>Relationship With Member :</b>{" "}
                        {getCommonData("relationMember", contact?.relationMember)}
                    </li>
                    <li>
                        <b>Convenient time to call : </b>
                        {contact?.timeToCall
                            ? contact?.timeToCall &&
                              getCommonData("time", contact?.timeToCall?.fromTime) +
                                  " " +
                                  getCommonData("timeType", contact?.timeToCall?.fromValue) +
                                  " - " +
                                  getCommonData("time", contact?.timeToCall?.toTime) +
                                  " " +
                                  getCommonData("timeType", contact?.timeToCall?.toValue)
                            : " --- "}
                    </li>
                    <li>
                        <b>Contact Display To:</b>
                        {getCommonData("contactDisplayType", contact?.contactDisplay)}
                    </li>
                    <li>
                        <b>Contact Number :</b>
                        {contact?.contact}
                    </li>
                </ul>
            </div>
        );
    };

    useEffect(() => {
        //refresh the state
    }, [reload]);

    return (
        <Fragment>
            {isBlocked && (
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-end mb-0 text-danger">
                            <strong>Note: </strong>You have blocked this profile
                        </p>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            )}
            <div class="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                        <div className="ma-photo-box mt-4">
                            <div className="ma-photo1">
                                {profile && (
                                    <ProfileImagesLargeSlider
                                        profilePhotoStatus={profile?.photoReqStatus}
                                        gender={basic?.gender}
                                        photos={photos}
                                        profileID={profile?.profileID}
                                        profile={profile}
                                    />
                                )}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-xl-12 col-12 db-sec-com">
                                <h2 class="db-tit">Verifications</h2>
                                <div class="db-pro-stat">
                                    <div class="">
                                        <ul>
                                            <li>
                                                <div class="db-int-pro-2 pt-3 px-3 my-4">
                                                    <span className="">
                                                        {" "}
                                                        {profileUser?.user?.phoneVerified ? (
                                                            <div className="px-1">
                                                                {utils.rightIcon(25, 25)}
                                                                <p>Mobile number is verified</p>
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex">
                                                                <span>
                                                                    {utils.closeIcon(18, 18)}
                                                                </span>
                                                                <p className="px-1">
                                                                    Mobile number is not verified
                                                                </p>
                                                            </div>
                                                        )}
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-12 col-12 p-3">
                        <div class="profi-pg profi-bio">
                            <div class="pr-bio-c pr-bio-info">
                                <Row>
                                    <Col xl={8} lg={12} md={12} sm={12}>
                                        <div class="d-flex justify-content-between">
                                            <h3>
                                                {" "}
                                                {name
                                                    ? name
                                                    : profileUser?.name &&
                                                      getFirstCaps(profileUser?.name)}
                                            </h3>
                                            <ProfileAction
                                                profile={profile}
                                                partnerProfileId={profileID}
                                            />
                                        </div>

                                        <ul>
                                            <li>
                                                <b>Age:</b>
                                                {basic?.age && <span>{basic.age} yr</span>}
                                            </li>
                                            <li>
                                                <b>Height:</b>
                                                {basic?.height && (
                                                    <span>
                                                        {getCommonData(
                                                            "heightTypes",
                                                            basic?.height
                                                        )}
                                                    </span>
                                                )}
                                            </li>
                                            <li>
                                                <b>Marital Status:</b>
                                                {basic?.maritalStatus &&
                                                    getCommonData(
                                                        "maritalStatus",
                                                        basic?.maritalStatus
                                                    )}
                                            </li>
                                            <li>
                                                <b>Language:</b> {basic?.language?.name}
                                            </li>
                                            <li>
                                                <b>City:</b>

                                                {location?.city?.name ? location.city.name : ""}
                                                {location?.state?.name
                                                    ? ", " + location.state.name
                                                    : ""}
                                            </li>
                                            <li>
                                                <b>Community:</b>
                                                {basic?.community?.community
                                                    ? basic.community.community
                                                    : ""}
                                                {basic?.sub_community?.community
                                                    ? ", " + basic.sub_community.community
                                                    : ""}
                                            </li>
                                            <li>
                                                <b>Yearly Income:</b>
                                                {getCommonData(
                                                    "yearlyIncome",
                                                    qualification?.annualIncome
                                                )}
                                            </li>
                                        </ul>
                                    </Col>
                                    {/* <div class="col-md-4 float-end text-right justify-content-end">

                            <ProfileAction profile={profile} partnerProfileId={profileID} />

</div> */}
                                    <Col xl={4} lg={12} md={12} sm={12} className="border-start">
                                        <div className="flex-column text-center mt-6">
                                            <div>
                                                <h6 className="mt-5 pt-4">Like This Profile</h6>
                                            </div>
                                            <ConnectNowIcon
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
                            </div>
                            <div class="lhs">
                                <div class="pr-bio-c pr-bio-abo">
                                    <h3>
                                        {" "}
                                        About{" "}
                                        {name
                                            ? name
                                            : profileUser?.name && getFirstCaps(profileUser?.name)}
                                    </h3>
                                    <p>
                                        {" "}
                                        {profileID} | Profile created for {" "}
                                        { basic?.profileFor  && 
                                            getCommonData("profileFor", basic?.profileFor)}
                                    </p>
                                    <p> {basic?.aboutYourSelf}</p>
                                </div>
                                {profileUser && getContactDetailSection(profileUser)}
                                {basic?.diet && getLifeStyleSection(basic.diet)}
                                {(basic || location) && getBackgroundSection(basic, location)}
                                {family && getFamilySection(family)}
                                {qualification && getQualificationSection(qualification)}
                                {preference && getPreferenceSection(preference)}
                                {contactDetails && getConvinentTimeSection(contactDetails)}

                                {/* <div class="pr-bio-c pr-bio-info">
                            <h3>Personal information</h3>
                            <ul>
                                <li><b>Name:</b> Angelina Jolie</li>
                                <li><b>Fatheres name:</b> John smith</li>
                                <li><b>Family name:</b> Joney family</li>
                                <li><b>Age:</b> 24</li>
                                <li><b>Date of birth:</b>03 Jan 1998</li>
                                <li><b>Height:</b>167cm</li>
                                <li><b>Weight:</b>65kg</li>
                                <li><b>Degree:</b> MSC Computer Science</li>
                                <li><b>Religion:</b> Any</li>
                                <li><b>Profession:</b> Working</li>
                                <li><b>Company:</b> Google</li>
                                <li><b>Position:</b> Web developer</li>
                                <li><b>Salary:</b> $1000 p/m</li>
                            </ul>
                        </div>
                        <div class="pr-bio-c pr-bio-hob">
                            <h3>Hobbies</h3>
                            <ul>
                                <li><span>Modelling</span></li>
                                <li><span>Watching movies</span></li>
                                <li><span>Playing volleyball</span></li>
                                <li><span>Hangout with family</span></li>
                                <li><span>Adventure travel</span></li>
                                <li><span>Books reading</span></li>
                                <li><span>Music</span></li>
                                <li><span>Cooking</span></li>
                                <li><span>Yoga</span></li>
                            </ul>
                        </div> */}
                            </div>
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

export default connect(mapStateToProps, null)(ProfileDetailedView);
