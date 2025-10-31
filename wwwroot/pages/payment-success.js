import { CONST } from "core";
import Link from "next/link";
import { Fragment } from "react";
import { Container } from "react-bootstrap";

const PaymentSuccess = () => {
    return (
        <Container>
            <div className="row m-auto d-flex justify-content-center my-4">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="bg-success text-center">
                            <div className="text-white">
                                <h1>
                                    <i
                                        className="fa fa-thumbs-up"
                                        aria-hidden="true"
                                    ></i>
                                </h1>
                            </div>
                        </div>
                        <h1 className="acc-title text-success">
                            Your Payment was successfull
                        </h1>
                        <Link href={CONST.PLAN_UPGRADE_PATH}>
                            <a className="button btn-lg btn-theme full-rounded animated right-icn my-4 text-center m-auto">
                                <span>
                                    Go Back
                                    <i
                                        className="glyph-icon flaticon-hearts"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </a>
                        </Link>
                    </div></div>
            </div>
        </Container>
    )
};

export default PaymentSuccess;