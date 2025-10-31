import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usersService } from "../core/services/index";
import { useRouter } from "next/router";
import { utils } from "core/helper";
import { CONST } from "../core/helper";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

const passwordRegs = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const passwordRegsMsg =
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";

const validationSchema = Yup.object().shape({
    pwd: Yup.string()
        .required("Password is required")
        .min(8, "Minimum Characters is required")
        .matches(passwordRegs, passwordRegsMsg),
    confirmpwd: Yup.string()
        .required("Confirm password is required")
        .min(8, CONST.MSG.PASSWORD_MIN)
        .max(20, CONST.MSG.PASSWORD_MAX)
        .oneOf([Yup.ref("pwd")], "Passwords does not match"),
});

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordToggle = () => setPasswordToggle(!passwordToggle);
    const handleConfirmPasswordToggle = () => setConfirmPasswordToggle(!confirmPasswordToggle);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting } = formState;

    async function onSubmit({ pwd, confirmpwd }) {
        setIsLoading(true);
        const resp = await usersService.resetPassword({ pwd, confirmpwd, token });
        // return false
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(CONST.PASSWORD_RESET);
            setIsLoading(false);
            router.push(CONST.LOGIN_PATH);
        } else {
            setIsLoading(false);
        }
    }

    // const invaliEmail = async () => {
    //     if (!token) {
    //         utils.showErrMsg("Please enter a email");
    //         router.push(CONST.LOGIN_PATH);
    //         return false;
    //     }
    // };

    // useEffect(() => {
    //     invaliEmail();
    // },[]);

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
  <title>Reset Password | True Friend Matrimony - Christian Matrimony Platform</title>

  <meta
    name="description"
    content="Securely reset your True Friend Matrimony account password. Quickly regain access to your profile and continue connecting with faith-aligned Christian matches for meaningful, lifelong relationships."
  />

  <meta
    name="keywords"
    content="Christian Matrimony Reset Password, True Friend Matrimony Password Recovery, Account Security, Christian Matchmaking, Faith-Based Matrimony, Password Help, Christian Matrimonial Site, Christian Profile Login, Recover Account"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/reset-password" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/reset-password" />
  <meta property="og:title" content="Reset Password | True Friend Matrimony - Christian Matrimony Platform" />
  <meta
    property="og:description"
    content="Reset your True Friend Matrimony password securely and regain access to connect with verified Christian singles and faith-based matches."
  />


</Head>


            <Fragment>


                <Container>
                    <Row className="justify-content-center">
                        <Col lg={12} md={12} sm={12}>
                            <div className="login">
                                <div className="container">
                                    <div className="row">
                                        <div className="inn">
                                            <div className="lhs">
                                                <div className="tit">
                                                    <h2>
                                                        Now <b>Find your life partner</b> Easy and fast.
                                                    </h2>
                                                </div>
                                                <div className="im">
                                                    <img
                                                        src="/frontend/images/login-couple.png"
                                                        alt="Find your life partner online - easy and fast matrimonial services"
                                                    />
                                                </div>
                                                <div className="log-bg"> </div>
                                            </div>

                                            <div className="rhs">
                                                <div className="form-container" style={{ padding: "100px 30px 110px 30px" }}>

                                                    <div className="form-tit px-3">
                                                        <h4>Reset Password</h4>

                                                    </div>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="form-group mb-3">
                                                            <label className="form-label">Password:</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type={passwordToggle ? "text" : "password"}
                                                                    className="form-control"
                                                                    placeholder="Password"
                                                                    {...register("pwd")}
                                                                    name="pwd"
                                                                    maxLength={20}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={handlePasswordToggle}
                                                                    className="btn btn-outline-secondary"
                                                                >
                                                                    <i className={`fa ${passwordToggle ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                                </button>
                                                            </div>
                                                            {errors.pwd && (
                                                                <p className="text-danger small">{errors.pwd?.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="form-group mb-3">
                                                            <label className="form-label">Confirm Password:</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type={confirmPasswordToggle ? "text" : "password"}
                                                                    className="form-control"
                                                                    placeholder="Confirm Password"
                                                                    {...register("confirmpwd")}
                                                                    name="confirmpwd"
                                                                    maxLength={20}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={handleConfirmPasswordToggle}
                                                                    className="btn btn-outline-secondary"
                                                                >
                                                                    <i className={`fa ${confirmPasswordToggle ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                                </button>
                                                            </div>
                                                            {errors.confirmpwd && (
                                                                <p className="text-danger small">{errors.confirmpwd?.message}</p>
                                                            )}
                                                        </div>





                                                        <div className="row mt-3">
                                                            <div className="col-12 mt-2">
                                                                <button
                                                                    disabled={isSubmitting || isLoading}
                                                                    className="cta-dark"
                                                                    type="submit"
                                                                >
                                                                    <span>

                                                                        {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>


                                                    </form>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>


            </Fragment>


        </>


    );
};

export default ResetPassword;
