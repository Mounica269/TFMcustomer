// // import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
// // import MyAccountSettings from "components/common/my-account-settings";
// // import { connect } from "react-redux";
// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import * as Yup from "yup";
// // import { useRouter } from "next/router";
// // import { CONST, utils, usersService } from "core";
// // import { logoutAction } from "core/redux/account/account.action";
// // 

// // const validationSchema = Yup.object().shape({
// //     oldpwd: Yup.string()
// //         .label("Old Password")
// //         .required()
// //         .min(8, CONST.MSG.PASSWORD_MIN)
// //         .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
// //     newpwd: Yup.string()
// //         .label("Password")
// //         .required()
// //         .min(8, CONST.MSG.PASSWORD_MIN)
// //         .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
// //     confirmNewpwd: Yup.string()
// //         .required(CONST.MSG.PASSWORD_CONFIRM_REQ)
// //         .oneOf([Yup.ref("newpwd")], CONST.MSG.PASSWORD_NOT_MATCH),
// // });

// // const AccountSettings = (props) => {
// //     const { token, authUser, logoutAction } = props;

// //     const {
// //         register,
// //         handleSubmit,
// //         reset,
// //         formState: { errors, isSubmitting },
// //     } = useForm({
// //         resolver: yupResolver(validationSchema),
// //     });

// //     const [show, setShow] = useState(false);
// //     const [payloadObj, setPayloadObj] = useState(null);
// //     const [isPasswordEdit, setIsPasswordEdit] = useState(false);
// //     const [isPasswordToggle, setIsPasswordToggle] = useState(false);
// //     const [isNewPasswordToggle, setIsNewPasswordToggle] = useState(false);
// //     const [isConfirmPasswordToggle, setIsConfirmPasswordToggle] = useState(false);

// //     const router = useRouter();

// //     if (!token) return;

// //     const handleClose = () => setShow(false);
// //     const handleShow = () => setShow(true);

// //     const changePasswordConfirmation = async () => {
// //         delete payloadObj.confirmNewpwd;
// //         const resp = await usersService.changePassword(payloadObj);
// //         if (resp && resp.meta.code === 200) {
// //             utils.showSuccessMsg(resp.meta.message);
// //             logoutAction();
// //             router.push(CONST.LOGIN_PATH);
// //         }
// //     };

// //     const onSubmit = (values) => {
// //         const { oldpwd, newpwd, confirmNewpwd } = values;
// //         const payload = { oldpwd, newpwd, confirmNewpwd };
// //         if (payload) {
// //             handleShow();
// //             setPayloadObj(payload);
// //         }
// //     };

// //     const handlePasswordChangeToggle = () => {
// //         setIsPasswordEdit(!isPasswordEdit);
// //     };

// //     const handleClosePasswordEdit = () => {
// //         setIsPasswordEdit(!isPasswordEdit);
// //         reset();
// //     };

// //     const handlePasswordToggle = (key) => setIsPasswordToggle(!isPasswordToggle);
// //     const handleNewPasswordToggle = (key) => setIsNewPasswordToggle(!isNewPasswordToggle);
// //     const handleConfirmPasswordToggle = (key) =>
// //         setIsConfirmPasswordToggle(!isConfirmPasswordToggle);

// //     return (
// //         <>
// //                   <Head>
// //             <link rel="stylesheet" href="/styles/bootstrap.min.css" />
// //         <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
// //         <link rel="stylesheet" href="/styles/assets/css/mega_menu.css" />
// //         <link rel="stylesheet" href="/styles/assets/css/magnific-popup.css" />
// //         <link rel="stylesheet" href="/styles/assets/css/font-awesome.min.css" />
// //         <link rel="stylesheet" href="/slick-carousel/slick/slick.css" />
// //         <link rel="stylesheet" href="/slick-carousel/slick/slick-theme.css" />
// //         <link rel="stylesheet" href="/styles/assets/css/style.css" />
// //         {/* Uncomment if needed */}
// //         <link rel="stylesheet" href="/styles/custom.css" />
// //         <link rel="stylesheet" href="/node_modules/react-toastify/dist/ReactToastify.css" />
// //         <link rel="stylesheet" href="/react-slideshow-image/dist/styles.css" />
// //         {/* Uncomment if needed */}
// //         {/* <link rel="stylesheet" href="/multi-range-slider-react/lib/multirangeslider.scss" /> */}
// //         <link rel="stylesheet" href="/rc-slider/assets/index.css" />
// //         <link rel="stylesheet" href="/react-datepicker/dist/react-datepicker.css" />
// //         <link rel="stylesheet" href="/assets/css/flaticon.css" />
// //         <link rel="stylesheet" href="/yet-another-react-lightbox/styles.css" />
// //         <link rel="stylesheet" href="/yet-another-react-lightbox/plugins/thumbnails.css" />
// //         <link rel="stylesheet" href="/yet-another-react-lightbox/plugins/captions.css" />
// //         <link rel="stylesheet" href="/react-image-crop/dist/ReactCrop.css" />
// //             </Head>
// //         <section className="page-section-ptb4 pb-6 mt-4">
// //             <Container>
// //                 <Row className="d-flex justify-content-center">
// //                     <Col md={1} className="mb-2"></Col>
// //                     <Col md={10} className="mb-2">
// //                         <div className="bg-white">
// //                             <Row>
// //                                 <Col md={3}>
// //                                     <MyAccountSettings />
// //                                 </Col>
// //                                 <Col md={9}>
// //                                     <div className="d-flex justify-content-between">
// //                                         <h4>My Account</h4>
// //                                         {/* <a
// //                                             href="#"
// //                                             onClick={handlePasswordChangeToggle}
// //                                             className="font-13"
// //                                         >
// //                                             Edit
// //                                         </a> */}
// //                                         <button
// //                                             onClick={handlePasswordChangeToggle}
// //                                             className="button btn-lg btn-theme full-rounded btn btn-primary"
// //                                         >
// //                                             Edit
// //                                         </button>
// //                                     </div>
// //                                     {!isPasswordEdit ? (
// //                                         <Row>
// //                                             <Col md={12}>
// //                                                 <Row>
// //                                                     <Col md={2}>
// //                                                         <h5>Email</h5>
// //                                                     </Col>
// //                                                     <Col md={6}>
// //                                                         <Form.Label className="mt-2">
// //                                                             {authUser?.email}
// //                                                         </Form.Label>
// //                                                     </Col>
// //                                                 </Row>
// //                                                 <Row>
// //                                                     <Col md={2}>
// //                                                         <h5>Password</h5>
// //                                                     </Col>
// //                                                     <Col md={6}>
// //                                                         <Form.Label className="mt-2">
// //                                                             ******
// //                                                         </Form.Label>
// //                                                     </Col>
// //                                                 </Row>
// //                                             </Col>
// //                                         </Row>
// //                                     ) : (
// //                                         <div className="wrapper">
// //                                             <Form onSubmit={handleSubmit(onSubmit)}>
// //                                                 <Row className="mt-3 p-3 account-sec-edit-bg">
// //                                                     <Col xl={12}>
// //                                                         <Row>
// //                                                             <Col xl={4}>
// //                                                                 <Form.Label>
// //                                                                     Old Password
// //                                                                 </Form.Label>
// //                                                             </Col>
// //                                                             <Col
// //                                                                 xl={6}
// //                                                                 className="account_password_wrap"
// //                                                             >
// //                                                                 <Form.Control
// //                                                                     {...register("oldpwd")}
// //                                                                     className="px-2 py-1"
// //                                                                     type={
// //                                                                         isPasswordToggle
// //                                                                             ? "text"
// //                                                                             : "password"
// //                                                                     }
// //                                                                     placeholder="Old Password"
// //                                                                     maxLength={20}
// //                                                                 />
// //                                                                 {isPasswordToggle ? (
// //                                                                     <i
// //                                                                         onClick={
// //                                                                             handlePasswordToggle
// //                                                                         }
// //                                                                         className="fa fa-eye"
// //                                                                     ></i>
// //                                                                 ) : (
// //                                                                     <i
// //                                                                         onClick={
// //                                                                             handlePasswordToggle
// //                                                                         }
// //                                                                         className="fa fa-eye-slash"
// //                                                                     ></i>
// //                                                                 )}
// //                                                                 <p className="text-danger text-start">
// //                                                                     {errors.oldpwd?.message}
// //                                                                 </p>
// //                                                             </Col>
// //                                                         </Row>
// //                                                         <Row className="mb-1">
// //                                                             <Col xl={4}>
// //                                                                 <Form.Label>
// //                                                                     New Password
// //                                                                 </Form.Label>
// //                                                             </Col>
// //                                                             <Col
// //                                                                 xl={6}
// //                                                                 className="account_password_wrap"
// //                                                             >
// //                                                                 <Form.Control
// //                                                                     {...register("newpwd")}
// //                                                                     className="px-2 py-1"
// //                                                                     type={
// //                                                                         isNewPasswordToggle
// //                                                                             ? "text"
// //                                                                             : "password"
// //                                                                     }
// //                                                                     placeholder="New Password"
// //                                                                     maxLength={20}
// //                                                                 />
// //                                                                 {isNewPasswordToggle ? (
// //                                                                     <i
// //                                                                         onClick={
// //                                                                             handleNewPasswordToggle
// //                                                                         }
// //                                                                         className="fa fa-eye"
// //                                                                     ></i>
// //                                                                 ) : (
// //                                                                     <i
// //                                                                         onClick={
// //                                                                             handleNewPasswordToggle
// //                                                                         }
// //                                                                         className="fa fa-eye-slash"
// //                                                                     ></i>
// //                                                                 )}
// //                                                                 <p className="text-danger text-start">
// //                                                                     {errors.newpwd?.message}
// //                                                                 </p>
// //                                                             </Col>
// //                                                         </Row>
// //                                                         <Row className="mb-1">
// //                                                             <Col xl={4}>
// //                                                                 <Form.Label>
// //                                                                     Confirm New Password
// //                                                                 </Form.Label>
// //                                                             </Col>
// //                                                             <Col
// //                                                                 xl={6}
// //                                                                 className="account_password_wrap"
// //                                                             >
// //                                                                 <Form.Control
// //                                                                     {...register("confirmNewpwd")}
// //                                                                     className="px-2 py-1"
// //                                                                     type={
// //                                                                         isConfirmPasswordToggle
// //                                                                             ? "text"
// //                                                                             : "password"
// //                                                                     }
// //                                                                     placeholder="Confirm New Password"
// //                                                                     maxLength={20}
// //                                                                 />
// //                                                                 {isConfirmPasswordToggle ? (
// //                                                                     <i
// //                                                                         onClick={
// //                                                                             handleConfirmPasswordToggle
// //                                                                         }
// //                                                                         className="fa fa-eye"
// //                                                                     ></i>
// //                                                                 ) : (
// //                                                                     <i
// //                                                                         onClick={
// //                                                                             handleConfirmPasswordToggle
// //                                                                         }
// //                                                                         className="fa fa-eye-slash"
// //                                                                     ></i>
// //                                                                 )}
// //                                                                 <p className="text-danger text-start">
// //                                                                     {errors.confirmNewpwd?.message}
// //                                                                 </p>
// //                                                             </Col>
// //                                                         </Row>
// //                                                     </Col>
// //                                                     <Button
// //                                                         className="w-auto"
// //                                                         disabled={isSubmitting}
// //                                                         type="submit"
// //                                                     >
// //                                                         {" "}
// //                                                         Submit
// //                                                     </Button>
// //                                                     <Button
// //                                                         onClick={handleClosePasswordEdit}
// //                                                         className="w-auto btn-danger mx-2"
// //                                                         type="submit"
// //                                                     >
// //                                                         Cancel
// //                                                     </Button>
// //                                                 </Row>
// //                                             </Form>
// //                                         </div>
// //                                     )}
// //                                 </Col>
// //                             </Row>
// //                         </div>
// //                     </Col>
// //                 </Row>
// //             </Container>
// //             <Modal show={show} onHide={handleClose}>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>Change Password Confirmation</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>
// //                     If you accept the change password you can redirect to login.
// //                 </Modal.Body>
// //                 <Modal.Footer className="d-flex justify-content-start">
// //                     <Button variant="primary" onClick={changePasswordConfirmation}>
// //                         Submit
// //                     </Button>
// //                     <Button variant="danger" onClick={handleClose}>
// //                         Cancel
// //                     </Button>
// //                 </Modal.Footer>
// //             </Modal>
// //         </section>
// //         </>
// //     );
// // };

// // const mapStateToProps = (state) => {
// //     return {
// //         commonData: state?.common?.commonData,
// //         token: state.account?.token,
// //         authUser: state.account?.authUser,
// //     };
// // };

// // const mapDispatchToProps = {
// //     logoutAction,
// // };

// // export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);


// import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
// import MyAccountSettings from "components/common/my-account-settings";
// import { connect } from "react-redux";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useRouter } from "next/router";
// import { CONST, utils, usersService } from "core";
// import { logoutAction } from "core/redux/account/account.action";
// 

// const validationSchema = Yup.object().shape({
//     oldpwd: Yup.string()
//         .label("Old Password")
//         .required()
//         .min(8, CONST.MSG.PASSWORD_MIN)
//         .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
//     newpwd: Yup.string()
//         .label("Password")
//         .required()
//         .min(8, CONST.MSG.PASSWORD_MIN)
//         .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
//     confirmNewpwd: Yup.string()
//         .required(CONST.MSG.PASSWORD_CONFIRM_REQ)
//         .oneOf([Yup.ref("newpwd")], CONST.MSG.PASSWORD_NOT_MATCH),
// });

// const AccountSettings = (props) => {
//     const { token, authUser, logoutAction } = props;

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitting },
//     } = useForm({
//         resolver: yupResolver(validationSchema),
//     });

//     const [show, setShow] = useState(false);
//     const [payloadObj, setPayloadObj] = useState(null);
//     const [isPasswordEdit, setIsPasswordEdit] = useState(false);
//     const [isPasswordToggle, setIsPasswordToggle] = useState(false);
//     const [isNewPasswordToggle, setIsNewPasswordToggle] = useState(false);
//     const [isConfirmPasswordToggle, setIsConfirmPasswordToggle] = useState(false);

//     const router = useRouter();

//     if (!token) return;

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const changePasswordConfirmation = async () => {
//         delete payloadObj.confirmNewpwd;
//         const resp = await usersService.changePassword(payloadObj);
//         if (resp && resp.meta.code === 200) {
//             utils.showSuccessMsg(resp.meta.message);
//             logoutAction();
//             router.push(CONST.LOGIN_PATH);
//         }
//     };

//     const onSubmit = (values) => {
//         const { oldpwd, newpwd, confirmNewpwd } = values;
//         const payload = { oldpwd, newpwd, confirmNewpwd };
//         if (payload) {
//             handleShow();
//             setPayloadObj(payload);
//         }
//     };

//     const handlePasswordChangeToggle = () => {
//         setIsPasswordEdit(!isPasswordEdit);
//     };

//     const handleClosePasswordEdit = () => {
//         setIsPasswordEdit(!isPasswordEdit);
//         reset();
//     };

//     const handlePasswordToggle = (key) => setIsPasswordToggle(!isPasswordToggle);
//     const handleNewPasswordToggle = (key) => setIsNewPasswordToggle(!isNewPasswordToggle);
//     const handleConfirmPasswordToggle = (key) =>
//         setIsConfirmPasswordToggle(!isConfirmPasswordToggle);

//     return (
//         <>

//             <section>
//                 <div class="db">
//                     <div class="container">
//                         <div class="row">
//                             <div class="col-md-4 col-lg-3">
//                                 <div class="db-nav">
//                                     <div class="db-nav-list">
//                                         <h5>Settings</h5>
//                                         <ul>
//                                             <li>
//                                                 <a href="user-dashboard.html">
//                                                     <i class="fa fa-tachometer" aria-hidden="true"></i>Account Settings
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a href="user-profile.html">
//                                                     <i class="fa fa-male" aria-hidden="true"></i>Contact Filters
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a href="user-interests.html">
//                                                     <i class="fa fa-commenting-o" aria-hidden="true"></i>Email/SMS Alerts
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a href="user-chat.html">
//                                                     <i class="fa fa-commenting-o" aria-hidden="true"></i>Privacy Options
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a href="user-plan.html">
//                                                     <i class="fa fa-money" aria-hidden="true"></i>Hide/Delete Profile
//                                                 </a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="col-md-8 col-lg-9">
//                                 <div class="row">
//                                     <div className="col-md-12 db-sec-com">
//                                     <div class="db-nav">
//                                     <div class="db-nav-list">
//                                         <h4>My Account</h4>
                                        
//                                     <ol className="poi poi-date p-1">
//                                             <li><span className="highlight">Age:</span> </li>
//                                             <li><span className="highlight">Date of Birth:</span> </li>

//                                         </ol>
//                                         <div className="db-int-pro-3" style={{ float: "right", marginTop: "-100px" }}>
//                                             <a href={CONST.EDIT_PROFILE_PATH} className="cta-dark btn btn-sm">Edit</a>
//                                         </div>
//                                     </div>
//                                 </div>
                                     
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// const mapStateToProps = (state) => {
//     return {
//         commonData: state?.common?.commonData,
//         token: state.account?.token,
//         authUser: state.account?.authUser,
//     };
// };

// const mapDispatchToProps = {
//     logoutAction,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);


import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import MyAccountSettings from "components/common/my-account-settings";
import { connect } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { CONST, utils, usersService } from "core";
import { logoutAction } from "core/redux/account/account.action";


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

    if (!token) return null; // Prevent rendering if no token

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
        setIsPasswordEdit(false);
        reset();
    };

    const handlePasswordToggle = (key) => setIsPasswordToggle(!isPasswordToggle);
    const handleNewPasswordToggle = (key) => setIsNewPasswordToggle(!isNewPasswordToggle);
    const handleConfirmPasswordToggle = (key) =>
        setIsConfirmPasswordToggle(!isConfirmPasswordToggle);

    return (
        <>

       
                    <Container className="mt-5 pt-5">
                        <Row>
                            <Col md={4} lg={3}>
                                <div className="db-nav">
                                    <div className="db-nav-list">
                                      
                                        <MyAccountSettings />
                                    </div>
                                </div>
                            </Col>
                            <Col md={8} lg={9}>
                            <div className="db-nav">
                            <div className="db-nav-list">
                                    <h4>My Account</h4>
                                    <ol className="poi poi-date p-1">
                                        <li><span className="highlight">Email:</span> {authUser?.email || 'N/A'}</li>
                                        <li><span className="highlight">Password:</span> {authUser?.password|| '  ******'}</li>
                                    </ol>
                                    <div className="db-int-pro-3" style={{ float: "right", marginTop: "-100px" }}>
                                        <a href="#" onClick={handlePasswordChangeToggle} className="cta-dark">Edit</a>
                                    </div>

                                    {isPasswordEdit && (
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Form.Group controlId="oldpwd">
                                                <Form.Label>Old Password</Form.Label>
                                                <Form.Control 
                                                    type={isPasswordToggle ? "text" : "password"} 
                                                    {...register("oldpwd")} 
                                                    isInvalid={errors.oldpwd} 
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.oldpwd?.message}
                                                </Form.Control.Feedback>
                                                <Button className="mt-2 cta-dark" onClick={handlePasswordToggle} style={{border:"none"}}>
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
                                                </Button>
                                            </Form.Group>
                                            <Form.Group controlId="newpwd">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control 
                                                    type={isNewPasswordToggle ? "text" : "password"} 
                                                    {...register("newpwd")} 
                                                    isInvalid={errors.newpwd} 
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.newpwd?.message}
                                                </Form.Control.Feedback>
                                                <Button className="mt-2 cta-dark" onClick={handleNewPasswordToggle} style={{border:"none"}}>
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
                                                </Button>
                                            </Form.Group>
                                            <Form.Group controlId="confirmNewpwd">
                                                <Form.Label>Confirm New Password</Form.Label>
                                                <Form.Control 
                                                    type={isConfirmPasswordToggle ? "text" : "password"} 
                                                    {...register("confirmNewpwd")} 
                                                    isInvalid={errors.confirmNewpwd} 
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirmNewpwd?.message}
                                                </Form.Control.Feedback>
                                                <Button className="mt-2 cta-dark" onClick={handleNewPasswordToggle} style={{border:"none"}}>
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
                                                </Button>
                                            </Form.Group>
                                            <Button className="mt-2 cta-dark" type="submit" disabled={isSubmitting} style={{border:"none"}}>
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </Button>
                                        </Form>
                                    )}
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
            

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Password Change</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to change your password?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={changePasswordConfirmation}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            
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
