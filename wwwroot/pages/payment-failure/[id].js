import { CONST, profileService } from "core";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Head from "next/head";


const PaymentFailure = () => {
    const router = useRouter();
    const { id } = router.query;
    const commonData = useSelector((state) => state.common?.commonData);
    const [paymentDetails, setPaymentDetails] = useState({});

    const getCommonDataVal = (key, value) => {
        const data = commonData && commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : "";
    };

    const getPaymentDetails = async () => {
        const resp = await profileService.getPaymentDetails(id);
        if (resp && resp.meta.code === 200) {
            setPaymentDetails(resp.data);
        }
    };

    useEffect(() => {
        if (id) {
            getPaymentDetails();
        }
    }, [id]);

    return (
        <Container>
            <div className="row m-auto d-flex justify-content-center my-4">
                <div className="col-md-6">
                    <div className="card text-center shadow">
                        <h1 className="acc-title text-danger my-4">
                            Your Payment was failure
                            <span className="payment_failure_wrap mt-2">
                                <i className="fa fa-thumbs-down text-danger" aria-hidden="true"></i>
                            </span>
                        </h1>
                        <Row className="">
                            <Col md={12}>
                                {paymentDetails?.bankRefNo !== "null" && (
                                    <Row className="d-flex justify-content-center mb-2">
                                        <Col md={4}>
                                            <label className="text-secondary d-flex justify-content-start">
                                                Transaction ID
                                            </label>
                                        </Col>
                                        <Col md={5}>
                                            <h6 className="d-flex justify-content-start text-bold">
                                                {" "}
                                                {paymentDetails?.bankRefNo}
                                            </h6>
                                        </Col>
                                    </Row>
                                )}
                                {paymentDetails?.paymentMode !== "null" && (
                                    <Row className="d-flex justify-content-center mb-2">
                                        <Col md={4}>
                                            <label className="text-secondary d-flex justify-content-start">
                                                Payment Method
                                            </label>
                                        </Col>
                                        <Col md={5}>
                                            <h6 className="d-flex justify-content-start text-success text-bold">
                                                {" "}
                                                {paymentDetails?.paymentMode}
                                            </h6>
                                        </Col>
                                    </Row>
                                )}
                                <Row className="d-flex justify-content-center mb-2">
                                    <Col md={4}>
                                        <label className="text-secondary d-flex justify-content-start">
                                            Payment Date
                                        </label>
                                    </Col>
                                    <Col md={5}>
                                        <h6 className="d-flex justify-content-start text-bold">
                                            {moment(paymentDetails?.updatedAt).format("YYYY-DD-MM")}
                                        </h6>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center mb-2">
                                    <Col md={4}>
                                        <label className="text-secondary d-flex justify-content-start">
                                            Status
                                        </label>
                                    </Col>
                                    <Col md={5}>
                                        <h6 className="d-flex justify-content-start text-bold text-danger">
                                            {getCommonDataVal(
                                                "paymentStatus",
                                                paymentDetails?.status
                                            )}
                                        </h6>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center  mb-2">
                                    <Col md={4}>
                                        <label className="text-secondary d-flex justify-content-start">
                                            Amount
                                        </label>
                                    </Col>
                                    <Col md={5}>
                                        <h6 className="d-flex justify-content-start  text-bold payment_amount">
                                            {" "}
                                            ₹{paymentDetails?.amount}
                                        </h6>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Link href={CONST.MATCH_MY_PATH}>
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
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PaymentFailure;
