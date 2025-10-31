import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import MyAccountSettings from "components/common/my-account-settings";
import { connect, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { CONST, utils, usersService } from "core";
import { logoutAction } from "core/redux/account/account.action";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";


const validationSchema = Yup.object().shape({
    oldpwd: Yup.string()
        .label("Old Password")
        .required()
        .min(8, CONST.MSG.PASSWORD_MIN)
        .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
    newpwd: Yup.string()
        .label("Password")
        .required()
        .min(8, CONST.MSG.PASSWORD_MIN)
        .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
    confirmNewpwd: Yup.string()
        .required(CONST.MSG.PASSWORD_CONFIRM_REQ)
        .oneOf([Yup.ref("newpwd")], CONST.MSG.PASSWORD_NOT_MATCH),
});

const AccountSettings = (props) => {
    const { token, authUser, logoutAction } = props;

    const authProfile = useSelector((state) => state.account?.profile);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [show, setShow] = useState(false);
    const [payloadObj, setPayloadObj] = useState(null);
    const [isPasswordEdit, setIsPasswordEdit] = useState(false);
    const [isPasswordToggle, setIsPasswordToggle] = useState(false);
    const [isNewPasswordToggle, setIsNewPasswordToggle] = useState(false);
    const [isConfirmPasswordToggle, setIsConfirmPasswordToggle] = useState(false);

    const router = useRouter();

    if (!token) return;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changePasswordConfirmation = async () => {
        delete payloadObj.confirmNewpwd;
        const resp = await usersService.changePassword(payloadObj);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            logoutAction();
            router.push(CONST.LOGIN_PATH);
        }
    };

    const onSubmit = (values) => {
        const { oldpwd, newpwd, confirmNewpwd } = values;
        const payload = { oldpwd, newpwd, confirmNewpwd };
        if (payload) {
            handleShow();
            setPayloadObj(payload);
        }
    };

    const handlePasswordChangeToggle = () => {
        setIsPasswordEdit(!isPasswordEdit);
    };

    const handleClosePasswordEdit = () => {
        setIsPasswordEdit(!isPasswordEdit);
        reset();
    };

    const handlePasswordToggle = (key) => setIsPasswordToggle(!isPasswordToggle);
    const handleNewPasswordToggle = (key) => setIsNewPasswordToggle(!isNewPasswordToggle);
    const handleConfirmPasswordToggle = (key) =>
        setIsConfirmPasswordToggle(!isConfirmPasswordToggle);

    return (
        <>
      <Head>
    <title>My Account | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Manage your profile and partner preferences on TrueFriend Christian Matrimony. Update your details, connect securely with compatible Christian singles, and take steps toward meaningful faith-based relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony,TrueFriend Matrimony, Christian Matrimonial Services, Account Management, Profile Settings, Partner Preferences, Christian Singles, Faith-Based Matchmaking, Christian Marriage, Trusted Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony/my-account" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="My Account | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Manage your profile and partner preferences on True Friend Christian Matrimony. Connect securely with compatible Christian singles and build meaningful faith-based relationships."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony/my-account" />


</Head>

            <section className="page-section-ptb4 pb-6 mt-4">
                <Container>
                    <Row className="d-flex justify-content-center">
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

                                        <div className="d-flex justify-content-between">
                                            <h4>My Account</h4>
                                            {/* <a
                                            href="#"
                                            onClick={handlePasswordChangeToggle}
                                            className="font-13"
                                        >
                                            Edit
                                        </a> */}
                                            <button
                                                onClick={handlePasswordChangeToggle}
                                                className="cta-dark"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        {!isPasswordEdit ? (
                                            <Row>
                                                <Col md={12}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <h5>Email</h5>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Label className="mt-2">
                                                                {authUser?.email}
                                                            </Form.Label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={2}>
                                                            <h5>Password</h5>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Label className="mt-2">
                                                                ******
                                                            </Form.Label>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <div className="wrapper">
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <Row className="mt-3 p-3 account-sec-edit-bg">
                                                        <Col xl={12}>
                                                            <Row>
                                                                <Col xl={4}>
                                                                    <Form.Label>
                                                                        Old Password
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col
                                                                    xl={6}
                                                                    className="account_password_wrap"
                                                                >
                                                                    <Form.Control
                                                                        {...register("oldpwd")}
                                                                        className="px-2 py-1"
                                                                        type={
                                                                            isPasswordToggle
                                                                                ? "text"
                                                                                : "password"
                                                                        }
                                                                        placeholder="Old Password"
                                                                        maxLength={20}
                                                                    />
                                                                    {isPasswordToggle ? (
                                                                        <i
                                                                            onClick={
                                                                                handlePasswordToggle
                                                                            }
                                                                            className="fa fa-eye"
                                                                        ></i>
                                                                    ) : (
                                                                        <i
                                                                            onClick={
                                                                                handlePasswordToggle
                                                                            }
                                                                            className="fa fa-eye-slash"
                                                                        ></i>
                                                                    )}
                                                                    <p className="text-danger text-start">
                                                                        {errors.oldpwd?.message}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-1">
                                                                <Col xl={4}>
                                                                    <Form.Label>
                                                                        New Password
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col
                                                                    xl={6}
                                                                    className="account_password_wrap"
                                                                >
                                                                    <Form.Control
                                                                        {...register("newpwd")}
                                                                        className="px-2 py-1"
                                                                        type={
                                                                            isNewPasswordToggle
                                                                                ? "text"
                                                                                : "password"
                                                                        }
                                                                        placeholder="New Password"
                                                                        maxLength={20}
                                                                    />
                                                                    {isNewPasswordToggle ? (
                                                                        <i
                                                                            onClick={
                                                                                handleNewPasswordToggle
                                                                            }
                                                                            className="fa fa-eye"
                                                                        ></i>
                                                                    ) : (
                                                                        <i
                                                                            onClick={
                                                                                handleNewPasswordToggle
                                                                            }
                                                                            className="fa fa-eye-slash"
                                                                        ></i>
                                                                    )}
                                                                    <p className="text-danger text-start">
                                                                        {errors.newpwd?.message}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-1">
                                                                <Col xl={4}>
                                                                    <Form.Label>
                                                                        Confirm New Password
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col
                                                                    xl={6}
                                                                    className="account_password_wrap"
                                                                >
                                                                    <Form.Control
                                                                        {...register("confirmNewpwd")}
                                                                        className="px-2 py-1"
                                                                        type={
                                                                            isConfirmPasswordToggle
                                                                                ? "text"
                                                                                : "password"
                                                                        }
                                                                        placeholder="Confirm New Password"
                                                                        maxLength={20}
                                                                    />
                                                                    {isConfirmPasswordToggle ? (
                                                                        <i
                                                                            onClick={
                                                                                handleConfirmPasswordToggle
                                                                            }
                                                                            className="fa fa-eye"
                                                                        ></i>
                                                                    ) : (
                                                                        <i
                                                                            onClick={
                                                                                handleConfirmPasswordToggle
                                                                            }
                                                                            className="fa fa-eye-slash"
                                                                        ></i>
                                                                    )}
                                                                    <p className="text-danger text-start">
                                                                        {errors.confirmNewpwd?.message}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Button
                                                            className="w-auto"
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                        >
                                                            {" "}
                                                            Submit
                                                        </Button>
                                                        <Button
                                                            onClick={handleClosePasswordEdit}
                                                            className="w-auto btn-danger mx-2"
                                                            type="submit"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Row>
                                                </Form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        If you accept the change password you can redirect to login.
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-start">
                        <Button variant="primary" onClick={changePasswordConfirmation}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
    };
};

const mapDispatchToProps = {
    logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);


