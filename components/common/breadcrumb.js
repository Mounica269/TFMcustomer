import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const breadcrumbUrl = {
    login: [
        {
            lable: "Home",
            lable_2: "Login",
            url: "/",
        },
    ],
    "forgot-password": [
        {
            lable: "Forgot Password",
            lable_2: "",
            url: "/forgot-password",
        },
    ],
    "reset-password": [
        {
            lable: "Reset Password",
            lable_2: "",
            url: "/reset-password",
        },
    ],
    activate: [
        {
            lable: "Home",
            lable_2: "Account Activation",
            url: "/",
        },
    ],
    register: [
        {
            lable: "Home",
            lable_2: "Register",
            url: "/",
        },
    ],
    plans: [
        {
            lable: "Home",
            lable_2: "Tfm Executive",
            url: "/",
        },
    ],
    plans: [
        {
            lable: "Home",
            lable_2: "Tfm Premium",
            url: "/",
        },
    ],
    plans: [
        {
            lable: "Home",
            lable_2: "Tfm Supreme",
            url: "/",
        },
    ],
    "be-safe-online": [
        {
            lable: "Home",
            lable_2: "Be Safe Online",
            url: "/",
        },
    ],
    privacy: [
        {
            lable: "Home",
            lable_2: "Privacy",
            url: "/",
        },
    ],
    "about-us": [
        {
            lable: "Home",
            lable_2: "About Us",
            url: "/",
        },
    ],
    "report-misuse": [
        {
            lable: "Home",
            lable_2: "Report Misuse",
            url: "/",
        },
    ],
    "faq": [
        {
            lable: "Home",
            lable_2: "FAQs",
            url: "/",
        },
    ],
    "terms-and-use": [
        {
            lable: "Home",
            lable_2: "Terms And Conditions",
            url: "/",
        },
    ],
    "return-and-cancellation": [
        {
            lable: "Home",
            lable_2: "Return And Cancellation",
            url: "/",
        },
    ],
    blogs: [
        {
            lable: "Home",
            lable_2: "Blogs",
            url: "/",
        },
    ],
};

const BreadCrumb = (props) => {
    const { label } = props;
    const router = useRouter();
    const [subUrl, setSubUrl] = useState([]);

    useEffect(() => {
        handleBreadCrumb(router.pathname.split("/")[1]);
    }, [router]);

    const handleBreadCrumb = (key) => {
        const url = breadcrumbUrl && breadcrumbUrl[key];
        return setSubUrl(url);
    };

    return (
        <section className="inner-intro bg page-section-ptb4 bg-overlay-black-60 login_bg">
            <Container>
                <Row className="intro-title text-center">
                    <Col className="mt-3" md={12}>
                        <h4 className="text-white">{label}</h4>
                        <ul className="page-breadcrumb">
                            {subUrl &&
                                subUrl.map((ele, ind) => (
                                    <React.Fragment key={ind}>
                                        <li key={ind}>
                                            <Link href={ele.url}>
                                                <a href="#">
                                                    <i className="fa fa-home"></i> {ele.lable}
                                                </a>
                                            </Link>
                                            <i className="fa fa-angle-double-right"></i>
                                        </li>
                                    </React.Fragment>
                                ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default BreadCrumb;
