import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { CONST, utils } from "core";
import { connect, useSelector } from "react-redux";
import ProfileImagesSlider from "components/matchs/profile-images-slider";
import { profileService } from "core/services";
import { reloadProfileAction } from "core/redux/account/account.action";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const Profile = (props) => {
    const {
        token,
        authProfile = null,
        commonData,
        reloadProfileAction,
        reloadProfile,
        partnerLocation,
        partnerQualification,
        partnerOtherDet,
    } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);
    const [profilePreference, setProfilePreference] = useState(null);
    const userProfile = useSelector((state) => state?.account?.profile);
    const [profileName, setProfileName] = useState("");



    useEffect(() => {
        if (token) {
            loadProfilePreference();
        }
    }, [token, reload]);

    useEffect(() => {
        const profileNameNew =
            userProfile && userProfile?.name
                ? userProfile?.name?.charAt(0).toUpperCase() + userProfile?.name?.slice(1)
                : authProfile?.name?.charAt(0).toUpperCase() + authProfile?.name?.slice(1);
        setProfileName(profileNameNew);
    }, [userProfile, authProfile]);

    console.log('authProfile', authProfile);

    const getCommonDataVal = (key, value) =>
        commonData
            ? utils.getCommonData(commonData, key, value)
                ? utils.getCommonData(commonData, key, value)
                : "-"
            : "-";

    const loadProfilePreference = async () => {
        const resp = await profileService.partnerPreference();
        if (resp && resp.meta.code === 200) {
            reloadProfileAction(!reloadProfile);
            setProfilePreference(resp.data);
        }
    };

    return (
        <>

        <Head>
    <title>My Profile | True Friend Christian Matrimony</title>

     <meta
        name="description"
        content="Manage and showcase your Christian Matrimony profile on TrueFriend Christian Matrimony. Update your details, highlight your faith, and connect with trusted Christian singles for meaningful, faith-centered relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Profile, TrueFriend Matrimony, Christian Singles, Faith-Based Matchmaking, Matrimonial Profile Management, Christian Marriage, Trusted Matrimonial Platform, Christian Relationships, Faith-Centered Matches, Find Life Partner"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony/my-profile" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="My Profile | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Manage and showcase your profile on True Friend Christian Matrimony. Connect with compatible Christian matches and build faith-centered relationships."
    />
  
    <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony/my-profile" />


</Head>


            <Row className="justify-content-center">
                <Col lg={12} md={12} className="mb-3 mt-5 pt-5" style={{ maxWidth: "1200px" }}>
                    <Row>
                        <Col lg={3}>
                            <div className="db-profile">
                                <h6>
                                    Name : <span>{profileName ? profileName : "-"}</span>
                                </h6>
                                <div className="img">
                                    {authProfile?.photos && (
                                        <ProfileImagesSlider
                                            gender={authProfile?.basic?.gender}
                                            photos={authProfile?.photos}
                                            profile={authProfile}
                                        />
                                    )}
                                </div>
                            </div>
                        </Col>

                        <Col lg={9}>
                            <div className="db-pro-stat p-3">
                                <Row className="mb-3">
                                    <Col xl={6} lg={6} md={12}>
                                        <div className="pr-bio-info">
                                            <ul>
                                                <li>
                                                    <b>Age:</b>{" "}
                                                    {authProfile?.basic?.age
                                                        ? `${authProfile.basic.age} Yr.`
                                                        : "-"}
                                                </li>
                                                <li>
                                                    <b>Date of Birth:</b>
                                                    {authProfile?.basic?.dateOfBirth || "-"}
                                                </li>
                                                <li>
                                                    <b>Marital Status:</b>
                                                    {getCommonDataVal(
                                                        "maritalStatus",
                                                        authProfile?.basic?.maritalStatus
                                                    )}{" "}
                                                </li>

                                                <li className=" mb-0 pb-0">
                                                    <b>Height:</b>
                                                    {authProfile?.basic?.height
                                                        ? `${authProfile.basic.height} cms.`
                                                        : "-"}{" "}
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={12}>
                                        <div className="pr-bio-info">
                                            <ul>
                                                <li>
                                                    <b>Dietary Preferences:</b>{" "}
                                                    {getCommonDataVal(
                                                        "dietTypes",
                                                        authProfile?.basic?.diet
                                                    )}
                                                </li>
                                                <li>
                                                    <b>Grew up in:</b>
                                                    {authProfile?.location?.country?.name || "-"}
                                                </li>
                                                <li>
                                                    <b>Blood Group:</b>
                                                    {getCommonDataVal(
                                                        "bloodGroup",
                                                        authProfile?.basic?.bloodGroup
                                                    )}{" "}
                                                </li>

                                                <li>
                                                    <b>Disability:</b>
                                                    {getCommonDataVal(
                                                        "disabilityStatus",
                                                        authProfile?.basic?.isAnyDisability
                                                    )}{" "}
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="db-pro-stat mt-4 p-3">
                                <Row className="mb-3">
                                    <h4 className="">Manage your Profile</h4>

                                    <Col xl={6} lg={6} md={12}>
                                        <div className="pr-bio-info">

                                            <ul className="">
                                                <li>
                                                    <Link href={CONST.EDIT_PROFILE_PATH}>
                                                        <a>
                                                            <b>Edit Personal Profile</b>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={CONST.MATRI_ACC_CONTACT_PATH}>
                                                        <a>
                                                            <b>Set Contact Filters</b>
                                                        </a>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href={CONST.MATRI_PHOTOS_PATH}>
                                                        <a>
                                                            <b>Add Photos</b>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className=" mb-0 pb-0">
                                                    <Link href={CONST.MATRI_ACC_CONTACT_DET_PATH}>
                                                        <a>
                                                            <b>Edit Contact Details</b>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={12}>
                                        <div className="pr-bio-info ">
                                            <ul className="pt-lg-3 pt-md-0 pt-0">
                                                <li>
                                                    <Link href={CONST.DASH_PATH}>
                                                        <a>
                                                            <b>View Profile Status</b>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={CONST.MATRI_PREFERENCE}>
                                                        <a>
                                                            <b>Edit Partner Preferences</b>
                                                        </a>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href={CONST.MATRI_ACC_HIDE_DELETE_PATH}>
                                                        <a>
                                                            <b>Hide / Delete Profile</b>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col lg={12} md={12} className="mb-3 pt-2 mx-auto" style={{ maxWidth: "1200px" }}>
                    <div className="db-pro-stat p-3">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#home">
                                    About Myself
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#menu1">
                                    Partner Preferences
                                </a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div id="home" className="container tab-pane active">
                                <br />

                                <div className="db-int-pro-2">
                                    <div className="db-int-pro-3 d-flex justify-content-between">
                                        <h5 className="mb-3">
                                            Personality, Family Details, Career, Partner
                                            Expectations etc.
                                        </h5>
                                        <Link href={CONST.EDIT_PROFILE_PATH}>
                                            <a className="cta-dark">Edit</a>
                                        </Link>
                                    </div>

                                    <p className="mb-3 mt-3">{authProfile?.basic?.aboutYourSelf}</p>

                                    <h4>Basics & Lifestyle:</h4>
                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info ">
                                                <ul className="">
                                                    <li>
                                                        <b>Age:</b>{" "}
                                                        {authProfile?.basic?.age
                                                            ? `${authProfile.basic.age} Yr.`
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>Date of Birth:</b>
                                                        {authProfile?.basic?.dateOfBirth || "-"}
                                                    </li>
                                                    <li>
                                                        <b>Marital Status:</b>
                                                        {getCommonDataVal(
                                                            "maritalStatus",
                                                            authProfile?.basic?.maritalStatus
                                                        )}{" "}
                                                    </li>

                                                    <li className=" mb-0 pb-0">
                                                        <b>Height:</b>
                                                        {authProfile?.basic?.height
                                                            ? `${authProfile.basic.height} cms.`
                                                            : "-"}{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Dietary Preferences:</b>{" "}
                                                        {getCommonDataVal(
                                                            "dietTypes",
                                                            authProfile?.basic?.diet
                                                        )}
                                                    </li>
                                                    <li>
                                                        <b>Grew up in:</b>
                                                        {authProfile?.location?.country?.name ||
                                                            "-"}
                                                    </li>
                                                    <li>
                                                        <b>Blood Group:</b>
                                                        {getCommonDataVal(
                                                            "bloodGroup",
                                                            authProfile?.basic?.bloodGroup
                                                        )}{" "}
                                                    </li>

                                                    <li>
                                                        <b>Disability:</b>
                                                        {getCommonDataVal(
                                                            "disabilityStatus",
                                                            authProfile?.basic?.isAnyDisability
                                                        )}{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>

                                    <h4>Religious Background:</h4>
                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Religion:</b>{" "}
                                                        {authProfile?.basic?.religion?.name}
                                                    </li>
                                                    <li>
                                                        <b>Mother Tongue:</b>{" "}
                                                        {authProfile?.basic?.language?.name}
                                                    </li>
                                                    <li>
                                                        <b>Community:</b>{" "}
                                                        {authProfile?.basic?.community?.community}
                                                    </li>
                                                    <li>
                                                        <b>Sub community:</b>{" "}
                                                        {
                                                            authProfile?.basic?.sub_community
                                                                ?.community
                                                        }
                                                    </li>
                                                    <li>
                                                        <b> Born Again Christian:</b>{" "}


                                                        {authProfile?.basic?.isBornAgain == null ? '-' : (authProfile.basic.isBornAgain ? 'Yes' : 'No')}

                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>

                                    <h4>Family details:</h4>
                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Father Name:</b>{" "}
                                                        {authProfile?.family?.fatherName
                                                            ? authProfile?.family?.fatherName
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>Father's Occupation:</b>{" "}
                                                        {authProfile?.family?.fatherBusiness
                                                            ? authProfile?.family?.fatherBusiness
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>Mother Name:</b>{" "}
                                                        {authProfile?.family?.motherName
                                                            ? authProfile?.family?.motherName
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>Mother's Occupation:</b>{" "}
                                                        {authProfile?.family?.motherBusiness
                                                            ? authProfile?.family?.motherBusiness
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>Family Location:</b>{" "}
                                                        {authProfile?.family?.location
                                                            ? authProfile?.family?.location
                                                            : "-"}
                                                    </li>
                                                    <li className=" mb-0 pb-0">
                                                        <b>Native Place:</b>{" "}
                                                        {authProfile?.family?.nativePlace
                                                            ? authProfile?.family?.nativePlace
                                                            : "-"}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>No. of Brothers:</b>{" "}
                                                        {authProfile?.family?.sibling?.noOfMale
                                                            ? authProfile?.family?.sibling?.noOfMale
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>No. of Sisters:</b>{" "}
                                                        {authProfile?.family?.sibling?.noOfFemale
                                                            ? authProfile?.family?.sibling
                                                                ?.noOfFemale
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <b>Family Type:</b>{" "}
                                                        {getCommonDataVal(
                                                            "familyType",
                                                            authProfile?.family?.familyType
                                                        )}
                                                    </li>
                                                    <li>
                                                        <b>Family Values:</b>{" "}
                                                        {getCommonDataVal(
                                                            "familyValue",
                                                            authProfile?.family?.familyValue
                                                        )}
                                                    </li>
                                                    <li>
                                                        <b>Family Affluence:</b>{" "}
                                                        {getCommonDataVal(
                                                            "familyAffluence",
                                                            authProfile?.family?.familyAffluence
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>

                                    <h4>Education & Career:</h4>
                                    {/* <div className="row">
                    <div className="col-md-6 form-group p-2"> */}
                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Highest Qualification:</b>{" "}
                                                        {authProfile?.qualification?.degree?.name}
                                                    </li>
                                                    <li>
                                                        <b>College(s) Attended:</b>{" "}
                                                        {authProfile?.qualification?.collage?.name}
                                                    </li>
                                                    <li className=" mb-0 pb-0">
                                                        <b>Annual Income:</b>{" "}
                                                        {getCommonDataVal(
                                                            "yearlyIncome",
                                                            authProfile?.qualification?.annualIncome
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Working With:</b>{" "}
                                                        {getCommonDataVal(
                                                            "workWithTypes",
                                                            authProfile?.qualification?.workWith
                                                        )}
                                                    </li>
                                                    <li>
                                                        <b>Working As:</b>{" "}
                                                        {
                                                            authProfile?.qualification?.profession
                                                                ?.name
                                                        }
                                                    </li>
                                                    <li>
                                                        <b>Employer Name:</b>{" "}
                                                        {
                                                            authProfile?.qualification
                                                                ?.currentCompanyName?.name
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* </div> */}

                                            {/* </div> */}
                                        </Col>
                                    </Row>

                                    <h4>Location:</h4>
                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Current Residence:</b>{" "}
                                                        {authProfile?.location?.city?.name},{" "}
                                                        {authProfile?.location?.country?.name}
                                                    </li>
                                                    <li className=" mb-0 pb-0">
                                                        <b>State Of Residence:</b>{" "}
                                                        {authProfile?.location?.state?.name}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Residency Status:</b>{" "}
                                                        {getCommonDataVal(
                                                            "residencyStatus",
                                                            authProfile?.location?.residencyStatus
                                                        )}
                                                    </li>
                                                    <li>
                                                        <b>Zip / Pin code:</b>{" "}
                                                        {authProfile?.location?.zipCode
                                                            ? authProfile?.location?.zipCode
                                                            : "-"}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>

                                    <h4>My Contact details:</h4>

                                    <div className="row">
                                        <div className="col-md-6 form-group p-2">
                                            <div className=" pr-bio-conta pt-2">
                                                <ul>
                                                    <li>
                                                        <span>
                                                            <i
                                                                className="fa fa-mobile"
                                                                aria-hidden="true"
                                                            ></i>
                                                            <b>Contact Number : </b>
                                                            {authProfile?.contactDetails?.contact
                                                                ? authProfile?.contactDetails
                                                                    ?.contact
                                                                : "-"}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i
                                                                className="fa fa-envelope-o"
                                                                aria-hidden="true"
                                                            ></i>
                                                            <b>Email ID :</b>
                                                            {authProfile?.contactDetails?.email
                                                                ? authProfile?.contactDetails?.email
                                                                : "-"}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="menu1" className="container tab-pane fade">
                                <br />
                                <div className="db-int-pro-2">
                                    <div className="db-int-pro-3 d-flex justify-content-between">
                                        <h5 className="mb-3">Partner Preferences</h5>

                                        <a href={CONST.MATRI_PREFERENCE} className="cta-dark">
                                            Edit
                                        </a>
                                    </div>

                                    <h4>Basics Info:</h4>

                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Age:</b>{" "}
                                                        {profilePreference?.age !== undefined
                                                            ? profilePreference?.age.from +
                                                            " yr to " +
                                                            profilePreference?.age.to +
                                                            " yr"
                                                            : `Any `}
                                                    </li>
                                                    <li>
                                                        <b>Height:</b>{" "}
                                                        {profilePreference?.age !== undefined
                                                            ? profilePreference?.height?.from +
                                                            " cms to " +
                                                            profilePreference?.height?.to +
                                                            " cms"
                                                            : `Any `}
                                                    </li>
                                                    <li className=" mb-0 pb-0">
                                                        <b>Religion / Community:</b>{" "}
                                                        {(profilePreference?.community ===
                                                            undefined ||
                                                            profilePreference?.community.length ===
                                                            0) &&
                                                            `Any `}
                                                        {profilePreference?.community &&
                                                            profilePreference?.community.length !==
                                                            0 &&
                                                            profilePreference?.community
                                                                .map((ele) => ele.community)
                                                                .join(", ")}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Mother tongue:</b>{" "}
                                                        {(profilePreference?.language ===
                                                            undefined ||
                                                            profilePreference?.language.length ===
                                                            0) &&
                                                            `Any `}
                                                        {profilePreference?.language &&
                                                            profilePreference?.language.length !==
                                                            0 &&
                                                            profilePreference?.language
                                                                .map((ele) => ele.name)
                                                                .join(", ")}
                                                    </li>

                                                    <li>
                                                        <b>Marital status:</b>{" "}
                                                        {(profilePreference?.maritalStatus ===
                                                            undefined ||
                                                            profilePreference?.maritalStatus
                                                                .length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.maritalStatus &&
                                                            profilePreference?.maritalStatus
                                                                .length !== 0 &&
                                                            profilePreference?.maritalStatus
                                                                .map((ele) =>
                                                                    getCommonDataVal(
                                                                        "maritalStatus",
                                                                        ele
                                                                    )
                                                                )
                                                                .join(", ")}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>

                                    <h4>Location Details:</h4>

                                    <div className="row">
                                        <div className="col-md-6 form-group p-2">
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Country living in : </b>{" "}
                                                        {(profilePreference?.location?.country ===
                                                            undefined ||
                                                            profilePreference?.location?.country
                                                                .length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.location?.country
                                                            ?.length !== 0 &&
                                                            profilePreference?.location?.country
                                                                .map((ele) => ele.name)
                                                                .join(", ")}{" "}
                                                    </li>
                                                    <li>
                                                        <b>State living in : </b>
                                                        {(profilePreference?.location?.state ===
                                                            undefined ||
                                                            profilePreference?.location?.state
                                                                .length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.location?.state
                                                            ?.length !== 0 &&
                                                            profilePreference?.location?.state
                                                                .map((ele) => ele.name)
                                                                .join(", ")}
                                                    </li>
                                                    <li>
                                                        <b>City / District : </b>{" "}
                                                        {(profilePreference?.location?.city ===
                                                            undefined ||
                                                            profilePreference?.location?.city
                                                                .length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.location?.city
                                                            ?.length !== 0 &&
                                                            profilePreference?.location?.city
                                                                .map((ele) => ele.name)
                                                                .join(", ")}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <h4>Education & Career:</h4>

                                    <div className="row">
                                        <div className="col-md-6 form-group p-2">
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li>
                                                        <b>Education :</b>{" "}
                                                        {(profilePreference?.qualification
                                                            ?.degree === undefined ||
                                                            profilePreference?.qualification?.degree
                                                                .length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.qualification?.degree
                                                            ?.length !== 0 &&
                                                            profilePreference?.qualification?.degree
                                                                .map((ele) => ele.name)
                                                                .join(", ")}
                                                    </li>
                                                    <li>
                                                        <b>Working with :</b>{" "}
                                                        {(profilePreference?.qualification
                                                            ?.workingWith === undefined ||
                                                            profilePreference?.qualification
                                                                ?.workingWith.length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.qualification
                                                            ?.workingWith !== undefined &&
                                                            profilePreference?.qualification
                                                                ?.workingWith?.length !== 0 &&
                                                            profilePreference?.qualification?.workingWith
                                                                .map((ele) =>
                                                                    getCommonDataVal(
                                                                        "workWithTypes",
                                                                        ele
                                                                    )
                                                                )
                                                                .join(", ")}
                                                    </li>
                                                    <li className=" mb-0 pb-0">
                                                        <b>Profession area :</b>{" "}
                                                        {(profilePreference?.qualification
                                                            ?.professionArea === undefined ||
                                                            profilePreference?.qualification
                                                                ?.professionArea.length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.qualification
                                                            ?.professionArea !== undefined &&
                                                            profilePreference?.qualification
                                                                ?.professionArea?.length !== 0 &&
                                                            profilePreference?.qualification?.professionArea
                                                                .map((ele) => ele.name)
                                                                .join(", ")}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <h4>Other Details :</h4>

                                    <Row className="mb-3">
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li className=" mb-0 pb-0">
                                                        <b>Profile created by :</b>{" "}
                                                        {(profilePreference?.otherDetails
                                                            ?.profileCreatedBy === undefined ||
                                                            profilePreference?.otherDetails
                                                                ?.profileCreatedBy.length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.otherDetails
                                                            ?.profileCreatedBy?.length !== 0 &&
                                                            profilePreference?.otherDetails?.profileCreatedBy
                                                                .map((ele) =>
                                                                    getCommonDataVal(
                                                                        "profileCreatedBy",
                                                                        ele
                                                                    )
                                                                )
                                                                .join(", ")}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} md={12}>
                                            <div className="pr-bio-info">
                                                <ul>
                                                    <li >
                                                        <b>Dietary Preferences :</b>{" "}
                                                        {(profilePreference?.otherDetails?.diet ===
                                                            undefined ||
                                                            profilePreference?.otherDetails?.diet
                                                                .length === 0) &&
                                                            `Any `}
                                                        {profilePreference?.otherDetails?.diet
                                                            ?.length !== 0 &&
                                                            profilePreference?.otherDetails?.diet
                                                                .map((ele) =>
                                                                    getCommonDataVal(
                                                                        "dietTypes",
                                                                        ele
                                                                    )
                                                                )
                                                                .join(", ")}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
        reloadProfile: state.account?.reloadProfile,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
