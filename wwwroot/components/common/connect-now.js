import { Fragment, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { profileService } from "core/services";
import { utils } from "core/helper";
import * as lodash from "lodash";
import { connect, useSelector } from "react-redux";
import { reloadAction } from "core";

const defaultMessage =
    "Hi, I am interested in your profile. if you also feel the same, please reach out.";
const remindInviteMessage = "You want like remind the profile invitation ?";
const validationSchema = Yup.object().shape({
    message: Yup.string().label("Message").required(),
});

const ConnectNowIcon = (props) => {
    const { ProfileID, profile, reloadAction } = props;
    const reload = useSelector((state) => state.common?.reloadAction);
    const authProfile = useSelector((state) => state?.account?.profile);

    const [userProfileId, setUserProfileId] = useState("");
    const [isProfileInViteShow, setIsProfileInviteShow] = useState(false);
    const [isProfileInViteCancelShow, setIsProfileInviteCanceShow] = useState(false);
    const [remindInvite, setRemindInvite] = useState(false);

    const handleShowProfileInvite = () => {
        if(authProfile?.plan?.planId === "PLAN0"){
            utils.showErrMsg("Please upgrade your plan to connect the person");
            return false
        }
        setIsProfileInviteShow(true);
        setUserProfileId(ProfileID);
    };

    const handleCloseProfileInvite = () => {
        setIsProfileInviteShow(false);
        reset();
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onInvitationSubmit = async ({ message }) => {
        
        const resp = await profileService.profileInvite(userProfileId, { message });
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            handleCloseProfileInvite();
            reloadAction(!reload);
        } else if (resp && resp.meta.code === 1001) {
            utils.showSuccessMsg("You are already invited");
            handleCloseProfileInvite();
            reloadAction(!reload);
        }
    };

    const handleInviteAccept = async (userProfileId) => {
        if(authProfile?.plan?.planId === "PLAN0"){
            utils.showErrMsg("Please upgrade your plan for accept the invitation");
            return false
        }
        const resp = await profileService.profileInviteAccept(userProfileId);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg("Invititation Accepted");
            reloadAction(!reload);
        }
    };

    const handleInviteDecline = async (userProfileId) => {
        if(authProfile?.plan?.planId === "PLAN0"){
            utils.showErrMsg("Please upgrade your plan for decline the invitation");
            return false
        }
        const payload = {
            message: "looking for better",
        };
        const resp = await profileService.profileInviteDecline(userProfileId, payload);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg("Invititation Declined");
            reloadAction(!reload);
        }
    };

    const handleInviteCancelSubmit = async () => {
        const resp = await profileService.profileInviteCancel(userProfileId);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            setUserProfileId("");
            handleCloseprofileInvite();
            reloadAction(!reload);
        }
    };

    const handleInviteCancelShow = (proId) => {
        setIsProfileInviteCanceShow(true);
        setUserProfileId(proId);
    };

    const handleCloseprofileInvite = () => setIsProfileInviteCanceShow(false);

    const handleWriteMessage = () => {
        alert("Starting the chat");
    };

    const handleRemindInviteShow = () => {
        setIsProfileInviteShow(true);
        setUserProfileId(ProfileID);
        setRemindInvite(true);
        // reloadAction(!reload);
    };

    const handleRemaindInviteSubmit = async () => {
        // connectpopup show after submit
        // https://apidev.truefriendmatrimony.com/api/v1/profile/partner/TFMB7940
        const payload = {
            message: "I like Your Profile Pls Check",
            type: "resend",
        };
        const resp = await profileService.remindInvitation(userProfileId, payload);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp?.meta?.message);
            handleCloseProfileInvite();
            reloadAction(!reload);
        }
    };

    const processInvitation = () => {
        switch (profile.invStatus) {
            case 0:
                return (
                    <div className="invitation_wrap text-center justify-content-center">
                        <button className="cta-btn" onClick={handleShowProfileInvite}> 
                            Connect Now
                        </button>
                    </div>
                );
            case 10:
                return (
                    <div className="invitation_wrap">
                        <button className="btn btn-outline-danger btn-sm m-1" onClick={handleRemindInviteShow}>
                            Remind
                        </button>
                        <button
                            className="btn btn-outline-danger btn-sm m-1"
                            onClick={() => handleInviteCancelShow(ProfileID)}
                        >
                            Cancel
                        </button>
                    </div>
                );
            case 20:
                return (
                    <div className="invitation_wrap">
                        <button className="btn btn-outline-success btn-sm mx-1" onClick={() => handleInviteAccept(ProfileID)}>
                            Accept
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleInviteDecline(ProfileID)}>
                            Decline
                        </button>
                    </div>
                );
            case 30:
                return (
                    <div className="invitation_wrap">
                        <button className="cta-btn" onClick={handleWriteMessage}>
                            Write a Message <i className="fa fa-telegram"></i>
                        </button>
                    </div>
                );
            case 40:
                return (
                    <div className="invitation_wrap">
                        <button className="btn btn-success remind m-1">Reminded</button>
                        <button
                            className="btn btn-danger cancel m-1"
                            onClick={() => handleInviteCancelShow(ProfileID)}
                        >
                            Cancel
                        </button>
                    </div>
                );
            case 50:
                return (
                    <div className="invitation_wrap">
                        <button className="btn btn-outline-success btn-sm mx-1" onClick={() => handleInviteAccept(ProfileID)}>
                            Accept
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleInviteDecline(ProfileID)}>
                            Decline
                        </button>
                    </div>
                );
            case 60:
                return (
                    <div className="invitation_wrap">
                        <span className="text-danger">Your invite has declined</span>
                    </div>
                );
            case 70:
                return (
                    <div className="invitation_wrap">
                        <span className="btn btn-light cancel_invite_btn">You declined invite</span>
                    </div>
                );
            case 80:
                return (
                    <div className="invitation_wrap">
                        <button className="btn btn-light cancel_invite_btn">
                            You cancelled invite <i className="fa fa-close text-danger"></i>
                        </button>
                    </div>
                );
            case 90:
                return (
                    <div className="invitation_wrap">
                        <button className="btn btn-light cancel_invite_btn">
                            They cancelled the invite
                            {/* Invitation cancel her (or) him{" "} */}
                            <i className="fa fa-close text-danger"></i>
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="invitation_wrap">
                        <button className="cta-btn" onClick={handleShowProfileInvite}>
                            Connect Now
                        </button>
                    </div>
                );
        }
    };

    return (
        <Fragment>
            {processInvitation()}
            <Modal
                show={isProfileInViteShow}
                onHide={handleCloseProfileInvite}
                backdrop="static"
                keyboard={false}
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Connect with personal message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!remindInvite ? (
                        <Form onSubmit={handleSubmit(onInvitationSubmit)}>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Label>Profile</Form.Label>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control
                                                as="textarea"
                                                defaultValue={defaultMessage}
                                                {...register("message")}
                                            />
                                            <p className="text-danger">{errors.message?.message}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="connect_now_pop_up">
                                <button type="submit" disabled={isSubmitting} className="btn btn-success">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseProfileInvite}
                                    className="btn btn-danger"
                                    style={{marginLeft:"5px"}}
                                >
                                    Close
                                </button>
                            </div>
                        </Form>
                    ) : (
                        <Form onSubmit={handleSubmit(handleRemaindInviteSubmit)}>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Label>Profile</Form.Label>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control
                                                as="textarea"
                                                defaultValue={remindInviteMessage}
                                                {...register("message")}
                                            />
                                            <p className="text-danger">{errors.message?.message}</p>
                                        </Col>
                                    </Row>
                                    {/* <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-success btn-sm w-25"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={handleCloseProfileInvite}
                                        className="btn-danger btn-sm w-25"
                                    >
                                        Close
                                    </Button> */}
                                    <div className="connect_now_pop_up">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="remind"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseProfileInvite}
                                            className="cancel"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
            <Modal
                show={isProfileInViteCancelShow}
                onHide={handleCloseprofileInvite}
                backdrop="static"
                keyboard={false}
                size="md"
            >
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Row>
                                <Col md={12}>
                                    <h5 className="text-center">
                                        Are you sure You want to cancel the profile invitation?
                                    </h5>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <div className="connect_now_pop_up d-flex justify-content-center">
                                        <button
                                            type="submit"
                                            onClick={handleInviteCancelSubmit}
                                            disabled={isSubmitting}
                                            className="remind"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseprofileInvite}
                                            className="cancel"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

const mapDispathcToProps = {
    reloadAction,
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
    };
};

export default connect(mapStateToProps, mapDispathcToProps)(ConnectNowIcon);