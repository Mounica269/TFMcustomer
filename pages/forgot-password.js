import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usersService } from "core/services/index";
import { CONST, utils } from "core/helper";
import { Fragment, useState } from "react";
import Link from "next/link";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().label("Email").required(),
});

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    async function onSubmit({ email }) {
        setIsLoading(true);
        const resp = await usersService.forgotPassword({ email });
        if (resp && resp.meta.code === 200) {
            setIsLoading(false);
            utils.showSuccessMsg(resp.meta.message);
            reset();
        } else {
            setIsLoading(false);
        }
    }

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



            <Fragment>
                <>
                  
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
                <div className="im mb-4">
                  <img
                    src="/frontend/images/icon/login-couple.png"
                    alt="Login Couple"
                    className="img-fluid"
                  />
                </div>
                <div className="log-bg"></div>
              </div>
              
              <div className="rhs">
                <div className="form-container" style={{padding:"100px 30px 110px 30px"}}>
                  <div className="form-tit px-3">
                    <h4>Forgot Password</h4>
                    <p>
                      New to True Friends Matrimony?{" "}
                      <Link href="/register">
                        <a>Sign Up Free</a>
                      </Link>
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                      <label className="form-label">Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email ID"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-danger small">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
<div className="row mt-3">

  <div className="col-12 col-md-auto mb-2 mb-md-0">
    <button
      type="submit"
      className="cta-dark"
      disabled={isSubmitting || isLoading}
    >
      {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
    </button>
  </div>
  
  <div className="col-12 col-md text-md-end mt-2">
    <Link href={CONST.LOGIN_PATH}>
      <a className="text-decoration-none w-100 w-md-auto">
        Login with Email
      </a>
    </Link>
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

                </>
            </Fragment>
        </>
    );
};

export default ForgotPassword;
