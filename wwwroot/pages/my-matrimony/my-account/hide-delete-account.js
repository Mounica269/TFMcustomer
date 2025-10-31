import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MyAccountSettings from "components/common/my-account-settings";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { commonService, masterService, PROFILE_GET, usersService } from "core/services";
import { CONST, utils } from "core/helper";
import { useRouter } from "next/router";
import { logoutAction, reloadAction } from "core/redux/account/account.action";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";


const hideSchema = Yup.object().shape({
    hideProfile: Yup.string().nullable().label("Profile show or hide").required(),
});

const deleteAccSchema = Yup.object().shape({
    message: Yup.string().nullable().required("Delete reason is required"),
});

const HideAndDelete = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const { reloadAction, logoutAction } = props;
    const commonData = useSelector((state) => state.common?.commonData);
    const reload = useSelector((state) => state.common?.reloadAction);

    const router = useRouter();
    const [isHideAcc, setisHideAcc] = useState(false);
    const [isDeleteAcc, setisDeleteAcc] = useState(false);
    const [reasonValue, setReasonValue] = useState(null);
    const [profile, setProfile] = useState(null);

    const getCommondataVal = (key, value) => {
        const resp = commonData[key]?.find((ele) => ele.code === value);
        return resp ? resp?.label : "";
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue: hideOrDeleteSetValue,
        reset,
    } = useForm({
        resolver: yupResolver(hideSchema),
    });

    const {
        register: deleteRegister,
        handleSubmit: deleteAccSubmit,
        formState: { errors: deleteAccErrors, isSubmitting: deleteAccSubmitting },
        reset: deleteAccReset,
        setValue,
    } = useForm({
        resolver: yupResolver(deleteAccSchema),
    });

    const handleHideAcc = () => {
        setisHideAcc(!isHideAcc);
        setisDeleteAcc(false);
        reset();
    };

    const handleDeleteAccount = () => {
        setisDeleteAcc(!isDeleteAcc);
        setisHideAcc(false);
        deleteAccReset();
    };

    const handleHideAccCancel = () => {
        setisHideAcc(!isHideAcc);
    };

    const handleDeleteAccCancel = () => {
        setisDeleteAcc(!isDeleteAcc);
        deleteAccReset();
    };

    const onSubmit = async (values) => {
        const { hideProfile } = values;
        const payload = parseInt(hideProfile);
        const resp = await usersService.hideOrDelete({ hideMe: payload });
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            handleHideAccCancel();
            reloadAction(!reload);
        }
    };

    const OnDeleteAccSubmit = async (values) => {
        delete values.noReason;
        values.reason = reasonValue;
        // return false
        const resp = await usersService.deleteProfile(values);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            logoutAction();
            router.push(CONST.LOGIN_PATH);
            deleteAccReset();
        } else if (resp && resp.meta.code === 1001) {
            utils.showErrMsg(resp.meta.message);
        }
    };

    const getHideProfileSection = () => {
        return (
            <>

                <Row className="d-flex justify-content-between mt-2 mb-2">
                    <Col md={3}>
                        <label className="label">Hide Profile</label>
                    </Col>
                    <Col md={6}>
                        <span className="text-la">
                            {getCommondataVal("hideProfile", profile?.hideProfileType)}
                        </span>
                    </Col>
                    <Col md={3}>
                        <button
                            onClick={handleHideAcc}
                            className="cta-dark"
                            style={{ border: "none" }}
                        >
                            Edit
                        </button>
                    </Col>
                </Row>
            </>
        );
    };

    const getloggedProfile = async () => {
        const resp = await masterService.getAll(PROFILE_GET);
        if (resp && resp?.meta?.code === 200) {
            const { data } = resp;
            hideOrDeleteSetValue("hideProfile", data.hideProfileType?.toString());
            setProfile(data);
        }
    };

    const getHideProfileFormSection = () => {
        return (
            <>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex justify-content-between">
                        <h6>Hide Profile</h6>
                    </div>
                    <Row className="account-sec-edit-bg p-3 ">
                        <Col md={12}>
                            <p>
                                Hiding your profile will make it invisible temporarily. Other members
                                will not able to send you invitations or Messages or chat
                            </p>
                            <Row className="">
                                <Col md={8}>
                                    <div className="d-xl-flex d-lg-block d-md-block">
                                        {commonData?.hideProfile?.map((ele, ind) => (
                                            <Form.Check
                                                type="radio"
                                                key={ind}
                                                value={ele.code}
                                                label={ele.label}
                                                {...register("hideProfile")}
                                                className="mx-2"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-danger text-start">
                                        {errors.hideProfile?.message}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Button className="btn-primary w-auto" disabled={isSubmitting} type="submit" style={{ border: "none" }}>
                            {" "}
                            Submit
                        </Button>
                        <Button
                            onClick={handleHideAccCancel}
                            className=" w-auto btn-danger mx-2"
                            type="submit"
                        >
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </>
        );
    };

    const getDeleteProfileSection = () => {
        return (
            <>

                <Row>
                    <Col md={12} className="mt-3 mb-2">
                        <Row>
                            <Col md={3}>
                                <label className="label">Delete Profile</label>
                            </Col>
                            <Col md={6}>
                                <span className="text-la">
                                    {getCommondataVal(
                                        "deleteProfileReason",
                                        profile?.defaultReasonToDel
                                    )}
                                </span>
                            </Col>
                            <Col md={3}>
                                {!profile?.raiseDelReq && (
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="cta-dark"
                                        style={{ border: "none" }}
                                    >
                                        Edit
                                    </button>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    };

    const getDeleteProfileFormSection = () => {
        return (
            <>

                <Form onSubmit={deleteAccSubmit(OnDeleteAccSubmit)}>
                    <div className="d-flex justify-content-between">
                        <h6>Delete Profile</h6>
                    </div>
                    <Row className="account-sec-edit-bg p-3">
                        <Col md={12}>
                            <p>Let us know why you wish to delete your profile?</p>
                            <Row>
                                <Col md={8}>
                                    {commonData?.deleteProfileReason?.map((ele, ind) => (
                                        <Form.Check
                                            type="radio"
                                            key={ind}
                                            value={ele.code}
                                            label={ele.label}
                                            {...deleteRegister("message")}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setValue("message", value);
                                                setReasonValue(value);
                                            }}
                                        />
                                    ))}
                                    {reasonValue === "50" && (
                                        <Form.Control
                                            as={"textarea"}
                                            {...deleteRegister("message")}
                                            placeholder="Type a reason"
                                        />
                                    )}
                                    <p className="text-danger text-start">
                                        {deleteAccErrors.message?.message}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Button className="btn-primary w-auto" disabled={deleteAccSubmitting} type="submit" style={{ border: "none" }}>
                            {" "}
                            Submit
                        </Button>
                        <Button
                            onClick={handleDeleteAccCancel}
                            className=" w-auto btn-danger mx-2"
                            type="submit"
                        >
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </>
        );
    };

    useEffect(() => {
        getloggedProfile();
    }, [reload]);

    return (
        <>

     <Head>
    <title>Hide/Delete Profile | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Manage your privacy on TrueFriend Christian Matrimony by hiding or deleting your profile. Securely control your account visibility while staying connected to faith-based Christian matches."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, TrueFriend Matrimony, Hide Profile, Delete Profile, Account Privacy, Privacy Control, Christian Matrimonial Services, Faith-Based Matchmaking, Christian Singles, Trusted Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Hide/Delete Profile | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Manage your privacy on True Friend Christian Matrimony by hiding or deleting your profile. Securely control your account visibility while staying connected to faith-based Christian matches."
    />
 
    <meta property="og:url" content="https://www.truefriendmatrimony.com" />

</Head>



            <section>
                <div className="db">
                    <Container>
                        <Row>
                            <Col xl={3} lg={4} md={12}>
                                <div className="db-nav">
                                    <div className="db-nav-list">

                                        <MyAccountSettings />
                                    </div>
                                </div>
                            </Col>
                            <Col xl={9} lg={8} md={12}>
                                <div className="db-nav">
                                    <div className="db-nav-list">
                                        <h4 className="pb-3">Hide / Delete Profile</h4>

                                        {!isHideAcc
                                            ? getHideProfileSection()
                                            : getHideProfileFormSection()}
                                        {!isDeleteAcc
                                            ? getDeleteProfileSection()
                                            : getDeleteProfileFormSection()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    reloadAction,
    logoutAction,
};

export default connect(null, mapDispatchToProps)(HideAndDelete);
