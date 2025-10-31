import { Fragment, useEffect, useState } from "react";
import { usersService } from "core/services/index";
import { useRouter } from "next/router";
import { CONST, utils } from "core/helper";
import { Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const Activate = () => {
    const router = useRouter();
    const { token } = router.query;

    const [accStatus, setAccStatus] = useState(null);
    const [timer, setTimer] = useState(null);

    const activateAccount = async (token) => {
        const resp = await usersService.activateAccount({ token });
        if (resp && resp?.meta?.code === 200) {
            utils.showSuccessMsg(resp?.meta.message);
            setAccStatus(true);
        }
    };

    const [isComponentMounted, setComponentMounted] = useState(false);
    useEffect(() => {
        if (isComponentMounted) {
            if (token !== undefined && token !== "") {
                clearTimeout(timer);
                activateAccount(token);
            } else {
                setTimer(
                    setTimeout(() => {
                        utils.showErrMsg("Invalid Activation Token");
                        router.push(CONST.MAIN_PATH);
                    }, 1000)
                );
            }
        }
    }, [isComponentMounted, token]);

    useEffect(() => {
        setComponentMounted(true);
    }, []);

    return (
        <section className="page-section-ptb4 pb-6">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col md={6} className="mb-2">
                        <Card className="card">
                            <Card.Body className="card-body">
                                {accStatus === true && (
                                    <Fragment>
                                        <div className="bg-primary text-center">
                                            <div className="text-white">
                                                <h1>
                                                    <i
                                                        className="fa fa-check"
                                                        aria-hidden="true"
                                                    ></i>
                                                </h1>
                                            </div>
                                        </div>
                                        <h1 className="acc-title text-primary">
                                            Activation Successfull!
                                        </h1>
                                        <p className="acc-content">
                                            Your Account is activated successfully. Login to choose
                                            your dream partner.
                                        </p>
                                        <Link href={CONST.BASE_PATH}>
                                            <a className="activate_go_home_btn button btn-lg btn-theme full-rounded animated right-icn mt-4 d-flex justify-content-center">
                                                <span>
                                                    Go to Home page
                                                    <i
                                                        className="glyph-icon flaticon-hearts"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </a>
                                        </Link>
                                    </Fragment>
                                )}
                                {accStatus === false && (
                                    <Fragment>
                                        <div className="bg-danger text-center">
                                            <div className="text-white">
                                                <h1>
                                                    <i
                                                        className="fa fa-times"
                                                        aria-hidden="true"
                                                    ></i>
                                                </h1>
                                            </div>
                                        </div>
                                        <h1 className="acc-title text-danger">
                                            Your Account Activation failed!
                                        </h1>
                                        <p className="acc-content">
                                            Account activation failed, if your register try forgot
                                            password or contact site admin.
                                        </p>
                                        <Link href={CONST.LOGIN_PATH}>
                                            <a className="activate_go_home_btn button btn-lg btn-theme full-rounded animated right-icn d-flex justify-content-center mt-4">
                                                <span>
                                                    Go to Home page
                                                    <i
                                                        className="glyph-icon flaticon-hearts"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </a>
                                        </Link>
                                    </Fragment>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Activate;
