import { Fragment, useRef, useState } from "react";
import { Container, Row, Col, Tab, Nav, Fade, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { loginAction } from "core/redux/account/account.action";
import { connect } from "react-redux";
import { usersService } from "core/services";
import { CONST, utils } from "core/helper";
import OtpTimer from "otp-timer";
import Head from "next/head";
import dynamic from "next/dynamic";

const OTP_LOGIN_TYPE = 20;
const EMAIL_LOGIN_TYPE = 10;

const validationSchema = Yup.object().shape({
    email: Yup.string().required(CONST.MSG.EMAIL_REQ),
    password: Yup.string()
        .required(CONST.MSG.PASSWORD_REQ)
        .min(8, CONST.MSG.PASSWORD_MIN)
        .max(20, CONST.MSG.PASSWORD_MAX)
        .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
});

const loginWithOtpSchema = Yup.object().shape({
    email: Yup.string().label("Email").required(),
    loginType: Yup.number(),
    otp: Yup.string().when("loginType", {
        is: 20,
        then: Yup.string().label("Otp").required(),
    }),
});
const Login = (props) => {
    const { loginAction } = props;
    const router = useRouter();
    const [passwordToggle, setPasswordToggle] = useState(false);

    const handlePasswordToggle = () => setPasswordToggle(!passwordToggle);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const {
        register: loginWithOtp,
        handleSubmit: handleLoginWithOtpSubmit,
        formState: { errors: loginWithOtpErrors, isSubmitting: loginWithOtpSubmitting },
        watch,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            loginType: EMAIL_LOGIN_TYPE,
        },
        resolver: yupResolver(loginWithOtpSchema),
    });

    const LoginType = watch("loginType");
    const [show, setShow] = useState(false);
    const [respMsg, setRespMsg] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isDisableOtpBtn, setIsDisableBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    async function onSubmit({ email, password }) {
        setUserEmail(email);
        setIsLoading(true);
        const resp = await usersService.login({
            email,
            pwd: password,
            loginType: EMAIL_LOGIN_TYPE,
        });
        console.log("response::", resp);
        const { data } = resp;
        if (resp && data?.meta?.code === 200) {
            const { token, refreshToken, completedSteps } = data.data;
            loginAction({ isLoggedIn: true, token, refreshToken, authUser: data.data });
            utils.showSuccessMsg(CONST.LOGIN_MSG);
            // return false
            setIsLoading(false);
            reset();
            if (completedSteps === 30) {
                router.push(CONST.DASH_PATH);
            } else {
                let navigationStep = "";
                switch (completedSteps) {
                    case null:
                        navigationStep = "?nav=step1";
                        break;
                    case EMAIL_LOGIN_TYPE:
                        navigationStep = "?nav=step2";
                        break;
                }
                router.push(CONST.PROFILE_COMPLETION_PATH + navigationStep);
            }
        } else if (resp && resp?.response?.data?.meta?.code === 403) {
            setRespMsg(resp?.response?.data?.meta?.message);
            handleShow();
            setIsLoading(false);
        } else {
            setIsLoading(false);
            utils.showErrMsg(resp?.response?.data?.meta?.message);
        }
    }

    const [otpVal, setOtpVal] = useState(null);
    const handleOtpChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setOtpVal(e.target.value);
            setValue("otp", e.target.value);
        }
    };

    const loginWithOtpSubmit = async (values) => {
        const { email, loginType, otp } = values;
        setUserEmail(email);
        setIsLoading(true);
        if (loginType === OTP_LOGIN_TYPE) {
            const resp = await usersService.loginWithOtp({
                email,
                loginType,
                otp: otp,
            });

            if (resp && resp.meta.code === 200) {
                setIsLoading(false);
                const { completedSteps, refreshToken, token } = resp.data;
                loginAction({ isLoggedIn: true, token, refreshToken, authUser: resp.data });
                if (completedSteps === 30) {
                    router.push(CONST.DASH_PATH);
                } else {
                    let navigationStep = "";
                    switch (completedSteps) {
                        case null:
                            navigationStep = "?nav=step1";
                            break;
                        case EMAIL_LOGIN_TYPE:
                            navigationStep = "?nav=step2";
                            break;
                        case OTP_LOGIN_TYPE:
                            navigationStep = "?nav=step3";
                            break;
                    }
                    router.push(CONST.PROFILE_COMPLETION_PATH + navigationStep);
                }
            } else {
                setIsLoading(false);
            }
        } else {
            setIsLoading(true);
            const resp = await usersService.generateLoginOtp({ email });
            if (resp && resp.meta.code === 200) {
                setIsLoading(false);
                const { meta } = resp;
                utils.showSuccessMsg(meta.message);
                const loginTypeValue = getValues("loginType");
                setValue(
                    "loginType",
                    loginTypeValue === EMAIL_LOGIN_TYPE ? OTP_LOGIN_TYPE : EMAIL_LOGIN_TYPE
                );
            } else {
                setIsLoading(false);
            }
        }
    };
    const resendActivatedLink = async () => {
        setIsLoading(true);
        const resp = await usersService.accountActivateResend({ email: userEmail });
        if (resp && resp?.meta?.code === 200) {
            const { data, meta } = resp;
            setIsLoading(false);
            utils.showSuccessMsg(meta?.message);
            handleHide();
        } else {
            setIsLoading(false);
        }
    };
    const handleResendOtp = async () => {
        const resp = await usersService.generateLoginOtp({ email: userEmail });
        if (resp && resp.meta.code === 200) {
            const { meta } = resp;
            utils.showSuccessMsg(meta.message);
        }
    };
    return (
        <>
            <style>{`
         .login .lhs .log-bg {
           width: 100%;
    height: 77px;
    background: url("/frontend/images/login-bg.png") center bottom / 300px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    transition: all 0.5s ease-in-out 0s;
    animation: 800s linear 0s infinite normal both running movehor;
    border-radius: 0px 0px 10px 10px;
    background-repeat-y: no-repeat;
}
      `}</style>
<Head>
  {/* Title */}
  <title> Login | True Friend Matrimony</title>
  <meta
    name="description"
    content="Log in to True Friend Matrimony – India’s trusted Christian matrimony site. Sign in to manage your Christian matrimonial profile, search verified Christian brides & grooms, and find your perfect life partner."
  />

  <meta
    name="keywords"
    content="Christian Matrimony, Christian Matrimony Login, Christian Brides, Christian Grooms, Christian Matrimony India, Christian Marriage, Christian Wedding, Christian Matchmaking, Matrimony Christian, Christian Matrimony Website"
  />
  <link rel="canonical" href="https://truefriendmatrimony.com/login" />
  <meta property="og:title" content="Christian Matrimony Login | True Friend Matrimony" />
  <meta
    property="og:description"
    content="Login to True Friend Matrimony, the trusted Christian matrimonial website. Connect with verified Christian brides & grooms and find your life partner."
  />
  <meta property="og:url" content="https://truefriendmatrimony.com/login" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>


            <Container>
                <Row className="justify-content-center">

                    <Col lg={12} md={12} sm={12}>
                        <section>
                            <div className="login">
                                <div className="container">
                                    <div className="row">
                                        <div className="inn">
                                            <div className="lhs">
                                                <div className="tit">
                                                    <h2>
                                                        Now{" "}
                                                        <b>
                                                            Find <br /> your life partner
                                                        </b>{" "}
                                                        Easy and fast.
                                                    </h2>
                                                </div>
                                                <div className="im">
                                                    <img
                                                        src="/frontend/images/login-couple.png"
                                                        alt="Illustration of a happy couple finding each other, symbolizing easy and fast partner search"
                                                    />
                                                </div>
                                                <div className="log-bg"> </div>
                                            </div>
                                            <div className="rhs">
                                                <div>

                                                    <div className="db-pro-stat p-lg-5 p-md-5 p-2 py-5">
                                                        <div className="form-tit px-3">
                                                            <h4>Start for free</h4>
                                                            <h1>Sign into Matrimony</h1>
                                                            <p>
                                                                Not a member?{" "}
                                                                <Link href="/register">
                                                                    <a>Sign up now</a>
                                                                </Link>
                                                            </p>
                                                        </div>
                                                        <ul className="nav nav-tabs" role="tablist">
                                                            <li className="nav-item">
                                                                <a
                                                                    className="nav-link active"
                                                                    data-bs-toggle="tab"
                                                                    href="#home"
                                                                >
                                                                    Login With Password
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" data-bs-toggle="tab" href="#menu1">
                                                                    Login With OTP
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <div className="tab-content">
                                                            <div id="home" className="container tab-pane active pt-5">
                                                                {/* <div className="form-login"> */}
                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                    <div className="form-group">
                                                                        <label className="lb">Email:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Email ID / Phone / Matrimony ID"
                                                                            {...register("email")}
                                                                        />
                                                                        {errors.email && (
                                                                            <p className="error-text">
                                                                                {errors.email.message}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    {/* <div className="form-group">
                                                                                <label className="lb">
                                                                                    Password:
                                                                                </label>
                                                                                <input
                                                                                    type={
                                                                                        passwordToggle
                                                                                            ? "text"
                                                                                            : "password"
                                                                                    }
                                                                                    className="form-control"
                                                                                    id="pwd"
                                                                                    placeholder="Enter password"
                                                                                    {...register("password")}
                                                                                />
                                                                                 <span
          className="input-group-text toggle-password"
          onClick={() => setPasswordToggle(!passwordToggle)}
          style={{ cursor: "pointer" }}
        >
          {passwordToggle ? (
            <i className="fa fa-eye-slash"></i>
          ) : (
            <i className="fa fa-eye"></i>
          )}
        </span>
                                                                                {errors.password && (
                                                                                    <p className="error-text">
                                                                                        {
                                                                                            errors.password
                                                                                                .message
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                            </div> */}
                                                                    <div className="form-group">
                                                                        <label className="lb">Password:</label>
                                                                        <div className="input-group">
                                                                            <span
                                                                                className="input-group-text toggle-password"
                                                                                onClick={() => setPasswordToggle(!passwordToggle)}
                                                                                style={{ cursor: "pointer" }}
                                                                            >
                                                                                {passwordToggle ? (
                                                                                    <i className="fa fa-eye-slash"></i>
                                                                                ) : (
                                                                                    <i className="fa fa-eye"></i>
                                                                                )}
                                                                            </span>
                                                                            <input
                                                                                type={passwordToggle ? "text" : "password"}
                                                                                className="form-control"
                                                                                id="pwd"
                                                                                placeholder="Enter password"
                                                                                {...register("password")}
                                                                            />
                                                                        </div>
                                                                        {errors.password && (
                                                                            <p className="error-text">{errors.password.message}</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-12 col-md-auto mb-2 mb-md-0">
                                                                            <div className="form-group form-check">
                                                                                <label className="form-check-label">
                                                                                    <input
                                                                                        className="form-check-input"
                                                                                        type="checkbox"
                                                                                        name="agree"
                                                                                    />{" "}
                                                                                    Remember me
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12 col-md text-md-end mt-0">
                                                                            <div className="section-field">
                                                                                <Link
                                                                                    href="/forgot-password"
                                                                                    className="float-end"
                                                                                >
                                                                                    Forgot Password?
                                                                                </Link>
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                    <div className="cta-full-wid">
                                                                        <button
                                                                            type="submit"
                                                                            className="cta-dark"
                                                                            disabled={
                                                                                isSubmitting ||
                                                                                isLoading
                                                                            }
                                                                        >
                                                                            {isLoading ? (
                                                                                <Spinner
                                                                                    animation="border"
                                                                                    size="sm"
                                                                                />
                                                                            ) : (
                                                                                "Sign in"
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                                {/* </div> */}
                                                            </div>
                                                            <div id="menu1" className="container tab-pane fade  pt-5">
                                                                <form onSubmit={handleLoginWithOtpSubmit(loginWithOtpSubmit)}>
                                                                    <div className="form-group">
                                                                        <label className="lb">Email:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Email ID / Phone / Matrimony ID"
                                                                            {...loginWithOtp("email")}
                                                                        />
                                                                        {loginWithOtpErrors.email && (
                                                                            <p className="error-text">
                                                                                {loginWithOtpErrors.email?.message}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    {LoginType === 20 ? (
                                                                        <Fragment>
                                                                            <div className="form-group">
                                                                                <label className="lb">
                                                                                    Password:
                                                                                </label>
                                                                                <input
                                                                                    {...loginWithOtp("otp")}
                                                                                    className="Password form-control"
                                                                                    type="text"
                                                                                    placeholder="OTP"
                                                                                    maxLength={6}
                                                                                    pattern="[0-9]*"
                                                                                    value={otpVal}
                                                                                    onChange={handleOtpChange}
                                                                                />
                                                                                <div className="otp_wrapper mt-2">
                                                                                    <OtpTimer
                                                                                        minutes={1}
                                                                                        seconds={30}
                                                                                        resend={handleResendOtp}
                                                                                        text="Remain"
                                                                                        className=""
                                                                                    // background="transparent"
                                                                                    // textColor="#000000"
                                                                                    />
                                                                                </div>
                                                                                {loginWithOtpErrors.otp && (
                                                                                    <p className="error-text">
                                                                                        {loginWithOtpErrors.otp?.message}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                            <div className="cta-full-wid">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="cta-dark"
                                                                                    disabled={isLoading}
                                                                                >
                                                                                    {!isLoading && (
                                                                                        <Fragment>
                                                                                            Login
                                                                                            <i
                                                                                                className="glyph-icon flaticon-hearts"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                        </Fragment>
                                                                                    )}
                                                                                    {isLoading && (
                                                                                        <Spinner
                                                                                            size="sm"
                                                                                            animation="border"
                                                                                        />
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </Fragment>
                                                                    ) : (
                                                                        <Fragment>
                                                                            <div className="cta-full-wid">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="cta-dark"
                                                                                    disabled={isLoading}
                                                                                >
                                                                                    {!isLoading && (
                                                                                        <Fragment>
                                                                                            Send OTP
                                                                                            <i
                                                                                                className="glyph-icon flaticon-hearts"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                        </Fragment>
                                                                                    )}
                                                                                    {isLoading && (
                                                                                        <Spinner
                                                                                            size="sm"
                                                                                            animation="border"
                                                                                        />
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </Fragment>
                                                                    )}
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        token: state.account?.token,
    };
};
const mapDispatchToProps = {
    loginAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
