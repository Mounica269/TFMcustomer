import { Button, Col, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Link from "next/link";
import { connect, useSelector } from "react-redux";
import { getUserDisplayName } from "core/helper/utils";
import ProfileImage from "components/common/profile-image";
import { CONST, utils } from "core/helper";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { profileService, usersService } from "core/services";
import { reloadProfileAction } from "core/redux/account/account.action";
import { useRouter } from "next/router";
import Head from "next/head";

const ProfileCard = (props) => {
    const { reloadProfileAction } = props;
    const reloadProfile = useSelector((state) => state.account?.reloadProfile);
    const authProfile = useSelector((state) => state.account?.profile);
    const authUser = useSelector((state) => state.account?.authUser);
    const router = useRouter();

    const [showMobVerification, setShowMobVerification] = useState(false);
    const [getOtpBox, setGetOtpBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const handleCloseMobVerification = () => setShowMobVerification(false);
    const handleShowMobVerification = () => setShowMobVerification(true);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const { register: otpRegister, handleSubmit: mobileOtpHandleSubmit, reset } = useForm();

    const loadProfile = async () => {
        setLoading(true);
        const resp = await profileService.getProfile();
        if (resp && resp.meta.code === 200) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const mobVerificationSubmit = async () => {
        const resp = await usersService.mobileNumberVerification();
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            setTimeout(() => {
                setGetOtpBox(true);
            }, 2000);
            reloadProfileAction(!reloadProfile);
        }
    };

    const mobileOtpSubmit = async (values) => {
        const resp = await usersService.mobileNumberVerificationGenrateOTP(values);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            reloadProfileAction(!reloadProfile);
            handleCloseMobVerification();
            reset();
            setGetOtpBox(false);
        }
    };

    const handleNavigate = () => {
        router.push(CONST.PLAN_UPGRADE_PATH);
    };

    useEffect(() => {
        if (!initialLoad) loadProfile();
        else setInitialLoad(false);
    }, [reloadProfile]);

    return (

        <>
            <Head>

                <title>My Profile | TrueFriend Matrimony</title>
                <meta
                    name="description"
                    content="View and manage your Christian matrimony profile on TrueFriend Matrimony. Update your details, verify your mobile number, upgrade membership, and connect with verified Christian brides and grooms in India."
                />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Membership, Verification, TrueFriend Matrimony ,My Profile, Matrimony Membership, Profile Verification, Christian Brides and Grooms, Verified Matrimony Profiles, Matrimonial Platform India"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="My Profile | TrueFriend Matrimony" />
                <meta
                    property="og:description"
                    content="Manage your profile, membership, and verification status on TrueFriend Matrimony, the trusted Christian Matrimony platform."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony" />

            </Head>

            <Col xl={12} lg={12} md={12} sm={12} className="mb-3 mt-4 pt-2">
                <div class="db-pro-stat">
                    <div class="db-nav-pro dav-image-profile">
                        <div className="db-profile">
                            <div className="img">
                                <ProfileImage
                                    gender={authProfile?.basic?.gender}
                                    photos={authProfile?.photos}
                                    alt={`Profile photo of ${getUserDisplayName(authProfile?.name, authProfile?.user?.name)}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="db-inte-prof-list">
                        <ul>
                            <li>
                                <div class="db-int-pro-2 p-3">
                                    <h5>
                                        {getUserDisplayName(
                                            authProfile?.name,
                                            authProfile?.user?.name
                                        )}
                                    </h5>
                                    <div class="db-int-pro-3 justify-content-between">
                                        <span> {authProfile?.profileID}</span>

                                        <Link href={CONST.EDIT_PROFILE_PATH}>
                                            <button
                                                type="button"
                                                class="btn btn-success btn-md ml-5 "
                                                style={{
                                                    float: "right",
                                                    marginLeft: "5px",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                    <ol class="poi">
                                        <li className=" justify-content-between">
                                            Plan:{" "}
                                            <strong>
                                                {" "}
                                                {authProfile?.plan
                                                    ? authProfile?.plan?.name
                                                    : authProfile?.subscription?.planName}
                                            </strong>
                                            <div class="db-int-pro-3" style={{ float: "right" }}>
                                                <Link href="/plans">
                                                    <button
                                                        type="button"
                                                        class="btn btn-success btn-md"
                                                    >
                                                        Upgrade
                                                    </button>
                                                </Link>
                                            </div>
                                        </li>
                                        {authProfile && authProfile?.profileComplete && (
                                            <li className=" justify-content-between">
                                                Profile Completion: {/* <strong> */}
                                                {/* <ProgressBar
                                                        className=""
                                                        now={authProfile?.profileComplete?.percent}
                                                        variant={
                                                            authProfile?.profileComplete?.percent <=
                                                            50
                                                                ? "primary"
                                                                : "success"
                                                        }
                                                        label={`${authProfile?.profileComplete?.percent}%`}
                                                    /> */}
                                                <div
                                                    className={`progress-bar-container ${authProfile?.profileComplete?.percent <= 50
                                                        ? "primary"
                                                        : "success"
                                                        }`}
                                                >
                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width: `${authProfile.profileComplete?.percent}%`,
                                                        }}
                                                    >
                                                        {authProfile.profileComplete?.percent}%
                                                    </div>
                                                </div>
                                                {/* </strong> */}
                                            </li>
                                        )}

                                        <li>
                                            Plan Expiration:{" "}
                                            <strong>
                                                {" "}
                                                {authProfile?.subscription?.expiresAt
                                                    ? moment(
                                                        authProfile?.subscription?.expiresAt
                                                    ).format("DD-MM-YYYY")
                                                    : "None"}
                                            </strong>
                                        </li>
                                        <li>
                                            Verify:{" "}
                                            <button
                                                onClick={handleShowMobVerification}
                                                className="border-0 bg-transparent verify-mobile"
                                            >
                                                <strong> Mobile Number</strong>
                                            </button>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <Modal show={showMobVerification} onHide={handleCloseMobVerification}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mobile Number Verification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(mobVerificationSubmit)}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Mobile Number"
                                    className="p-2"
                                    value={authUser?.phone}
                                    {...register("mobile")}
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-sm"
                                    variant="outline-secondary"
                                >
                                    Verify
                                </Button>
                            </InputGroup>
                        </Form>
                        {getOtpBox && (
                            <Form onSubmit={mobileOtpHandleSubmit(mobileOtpSubmit)}>
                                <Form.Control
                                    placeholder="Enter OTP"
                                    className="p-2 border"
                                    {...otpRegister("otp")}
                                />
                                <div className="mt-2">
                                    <Button
                                        className="button btn-lg btn-theme full-rounded"
                                        type="submit"
                                        variant="primary"
                                    >
                                        Submit
                                    </Button>
                                    {/* <Button
                                    className="btn btn-danger btn-sm mx-2"
                                    variant="secondary"
                                    onClick={handleCloseMobVerification}
                                >
                                    Close
                                </Button> */}
                                </div>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>
            </Col>
        </>
    );
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(null, mapDispatchToProps)(ProfileCard);
