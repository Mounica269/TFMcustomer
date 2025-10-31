import { profileService } from "core";
import moment from "moment";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import HeaderBeforeLogin from "../../components/common/header-before-login"

const PaymentSuccessMobile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [paymentDetails, setPaymentDetails] = useState({});
    const commonData = useSelector((state) => state.common?.commonData);

    const getPaymentDetails = async () => {
        const resp = await profileService.getPaymentDetails(id);
        if (resp && resp.meta.code === 200) {
            setPaymentDetails(resp.data);
        }
    };

    const getCommonDataVal = (key, value) => {
        const data = commonData && commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : "";
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
                        <h1 className="acc-title text-success my-4">
                            Your Payment was successfull
                            <span className="payment_success_wrap mt-2">
                                <i className="fa fa-thumbs-up text-success" aria-hidden="true"></i>
                            </span>
                        </h1>
                        <Row className="">
                            <Col md={12}>
                                <Row className="d-flex justify-content-center mb-2">
                                    <Col md={4}>
                                        <label className="text-secondary d-flex justify-content-start">
                                            Transaction Id
                                        </label>
                                    </Col>
                                    <Col md={5}>
                                        <h6 className="d-flex justify-content-start text-bold">
                                            {" "}
                                            {paymentDetails?.bankRefNo}
                                        </h6>
                                    </Col>
                                </Row>
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
                                            Payment
                                        </label>
                                    </Col>
                                    <Col md={5}>
                                        <h6 className="d-flex justify-content-start text-bold text-success">
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
                                            Amount Paid
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
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PaymentSuccessMobile;
