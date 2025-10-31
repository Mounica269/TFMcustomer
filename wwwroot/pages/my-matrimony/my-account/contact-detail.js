import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CONST, utils, profileService } from "core";
import MyAccMatchLinks from "components/common/my-account-match-links";
import Link from "next/link";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const validationSchema = Yup.object().shape({
    contactDetails: Yup.object().shape({
        nameOfContact: Yup.string()
            .matches(CONST.NAME_REGEX, CONST.MSG.INVALID_NAME)
            .min(3, CONST.MSG.MIN_CHAR)
            .max(30, CONST.MSG.MAX_CHAR_FOR_PROFILE_NAME)
            .label("Name of contact")
            .required(),
        relationMember: Yup.number().label("Relation member").required(),
        contactDisplay: Yup.number().label("Contact Display").required(),
        timeToCall: Yup.object().shape({
            fromTime: Yup.number().required("Required"),
            fromValue: Yup.number().required("Required"),
            toTime: Yup.number().required("Required"),
            toValue: Yup.number().required("Required"),
        }),
    }),
});

const ContactDetail = () => {
    const token = useSelector((state) => state.account?.token);
    const commonData = useSelector((state) => state.common?.commonData);
    const profile = useSelector((state) => state.account?.profile);
    const [phoneVal, setPhoneVal] = useState("");
    const authProfile = useSelector((state) => state.account?.profile);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [isContactEdit, setIsContactEdit] = useState(false);
    const [profileContactDetail, setProfileContactDetail] = useState(null);

    useEffect(() => {
        if (token !== "") {
            loadProfile();
        }
    }, [token]);

    useEffect(() => {
        if (
            isContactEdit &&
            (profileContactDetail !== null || profileContactDetail !== undefined)
        ) {
            setFormvalues(profileContactDetail);
        }
    }, [isContactEdit]);

    const handleContactDetailToggle = () => {
        setIsContactEdit(!isContactEdit);
    };

    const getCommonDataVal = (key, value) => {
        if (commonData === null) return false;

        const data = commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : false;
    };

    const loadProfile = async () => {
        const resp = await profileService.getProfile();
        if (resp && resp.meta.code === 200) {
            const { contactDetails } = resp.data;
            if (contactDetails) {
                setProfileContactDetail(contactDetails);
            }
        }
    };

    const setFormvalues = (values) => {
        setValue("contactDetails", values);
        setValue("contactDetails.contactDisplay", values?.contactDisplay.toString());
        setPhoneVal(values?.contact);
    };

    const onSubmit = async (values) => {
        const resp = await profileService.updateProfile(values);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp?.meta?.message);
            handleContactDetailToggle();
            loadProfile();
        }
    };

    const handleChangeContactNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setPhoneVal(e.target.value);
            setValue("phone", e.target.value);
        }
    };

    return (
        <>
          <Head>
    <title>My Contact | True Friend Christian Matrimony</title>

    {/* SEO Meta */}
    <meta
        name="description"
        content="Manage and update your contact details on TrueFriend Christian Matrimony. Stay connected with verified Christian singles and receive timely match notifications for meaningful relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Christian Matrimonial Services, Contact Management, Profile Contact Details, Verified Christian Singles, Faith-Based Matchmaking, TrueFriend Matrimony, Trusted Christian Matrimonial Platform, Marriage Partner, Christian Connections"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/contacts" />

    {/* Open Graph  */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="My Contact | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Manage and update your contact details on True Friend Christian Matrimony. Stay connected with verified Christian singles and receive timely match notifications for meaningful relationships."
    />


    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/contacts" />

</Head>


            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Row>
                            <Col xl={3} lg={4} md={12}>
                                <div className="db-nav">
                                    <div className="db-nav-list">
                                        <h5>Quick Links</h5>
                                        <ul>
                                            <li>
                                                <Link href={CONST.MATCH_NEW_PATH}>
                                                    <a>
                                                        <i
                                                            className="fa fa-arrow-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                        New Matches
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={CONST.MATCH_MY_PATH}>
                                                    <a>
                                                        <i
                                                            className="fa fa-arrow-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                        My Matches
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={CONST.MATCH_NEARBY_PATH}>
                                                    <a href={CONST.MATCH_NEARBY_PATH}>
                                                        <i
                                                            className="fa fa-arrow-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                        Near Me
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={CONST.SEARCH_BASIC_PATH}>
                                                    <a>
                                                        <i
                                                            className="fa fa-arrow-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                        Saved Searches
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={9} lg={8} md={12}>
                                <h4>My Contact Details</h4>
                                <Row className="mt-4">
                                    <Col md={12}>
                                        <Card className="bg-white border-0 p-3">
                                            <Card.Header className="bg-white border-0">
                                                <Card.Title>Contact Number</Card.Title>
                                                <Card.Body className="p-0 mb-2">
                                                    <Row>
                                                        <Col md={6}>
                                                            <div className="d-flex">
                                                                <p>
                                                                    Mobile: {profile?.user?.phone}
                                                                    {profile?.user
                                                                        ?.phoneVerified ? (
                                                                        <button className="border-0 bg-transparent text-success">
                                                                            Verified
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            href={CONST.DASH_PATH}
                                                                        >
                                                                            <a
                                                                                href="#"
                                                                                className="text-danger mx-2"
                                                                            >
                                                                                Verify now
                                                                            </a>
                                                                        </Link>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md={12}>
                                        <Card className="bg-white border-0 p-3">
                                            <Card.Header className="bg-white border-0">
                                                <Card.Title className="d-flex justify-content-between">
                                                    Contact details and display status
                                                    <span
                                                        className="float-right font-12"
                                                        onClick={handleContactDetailToggle}
                                                    >
                                                        <button className="cta-dark">Edit</button>
                                                    </span>
                                                </Card.Title>
                                                {!isContactEdit && (
                                                    <Card.Body>

                                                        <div className="wrapper-te" >
                                                            <div className="pr-bio-info">
                                                                <ul>
                                                                    <li>
                                                                        <b>Name of contact person :</b>
                                                                        {profileContactDetail?.nameOfContact
                                                                            ? profileContactDetail?.nameOfContact
                                                                            : " --- "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="wrapper-te" >
                                                            <div className="pr-bio-info">
                                                                <ul>
                                                                    <li>
                                                                        <b>Relationship with the member : </b>
                                                                        {profileContactDetail?.relationMember
                                                                            ? getCommonDataVal(
                                                                                "relationMember",
                                                                                profileContactDetail?.relationMember
                                                                            )
                                                                            : " --- "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="wrapper-te" >
                                                            <div className="pr-bio-info">
                                                                <ul>
                                                                    <li>
                                                                        <b>Convenient time to call : </b>
                                                                        {profileContactDetail?.timeToCall
                                                                            ? profileContactDetail?.timeToCall &&
                                                                            getCommonDataVal(
                                                                                "time",
                                                                                profileContactDetail
                                                                                    ?.timeToCall?.fromTime
                                                                            ) +
                                                                            " " +
                                                                            getCommonDataVal(
                                                                                "timeType",
                                                                                profileContactDetail
                                                                                    ?.timeToCall
                                                                                    ?.fromValue
                                                                            ) +
                                                                            " - " +
                                                                            getCommonDataVal(
                                                                                "time",
                                                                                profileContactDetail
                                                                                    ?.timeToCall
                                                                                    ?.toTime
                                                                            ) +
                                                                            " " +
                                                                            getCommonDataVal(
                                                                                "timeType",
                                                                                profileContactDetail
                                                                                    ?.timeToCall
                                                                                    ?.toValue
                                                                            )
                                                                            : " --- "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="wrapper-te" >
                                                            <div className="pr-bio-info">
                                                                <ul>
                                                                    <li>
                                                                        <b> Contact display setting : </b>
                                                                        {profileContactDetail?.contactDisplay
                                                                            ? getCommonDataVal(
                                                                                "contactDisplayType",
                                                                                profileContactDetail?.contactDisplay
                                                                            )
                                                                            : " --- "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="wrapper-te" >
                                                            <div className="pr-bio-info">
                                                                <ul>
                                                                    <li>
                                                                        <b>Contact Number : </b>
                                                                        {profileContactDetail?.contact
                                                                            ? profileContactDetail?.contact
                                                                            : " --- "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </Card.Body>
                                                )}
                                                {isContactEdit && (
                                                    <Fragment>
                                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                                            <Card.Body>
                                                                <Row className="mb-3">
                                                                    <Col md={4}>
                                                                        Name of contact person:
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            {...register(
                                                                                "contactDetails.nameOfContact"
                                                                            )}
                                                                            className="p-2"
                                                                            placeholder="Contact Person"
                                                                            maxLength={25}
                                                                        />
                                                                        <span className="text-danger">
                                                                            {
                                                                                errors
                                                                                    .contactDetails
                                                                                    ?.nameOfContact
                                                                                    ?.message
                                                                            }
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                    <Col md={4}>
                                                                        Relationship with the
                                                                        member:
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Select
                                                                            className="selecthide p-auto"
                                                                            {...register(
                                                                                "contactDetails.relationMember"
                                                                            )}
                                                                        >
                                                                            <option value="">
                                                                                Select
                                                                            </option>
                                                                            {commonData &&
                                                                                commonData.relationMember &&
                                                                                commonData.relationMember.map(
                                                                                    (ele, ind) => (
                                                                                        <option
                                                                                            value={
                                                                                                ele.code
                                                                                            }
                                                                                            key={
                                                                                                ind
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                ele.label
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                    <Col md={4}>
                                                                        Convenient time to call:
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <Row>
                                                                            <Col md={6}>
                                                                                <Form.Label>
                                                                                    From
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={6}>
                                                                                <Form.Label>
                                                                                    To
                                                                                </Form.Label>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md={3}>
                                                                                <Form.Select
                                                                                    className="w-100 p-auto"
                                                                                    {...register(
                                                                                        "contactDetails.timeToCall.fromTime"
                                                                                    )}
                                                                                >
                                                                                    <option value="">
                                                                                        Select
                                                                                    </option>
                                                                                    {commonData &&
                                                                                        commonData.time &&
                                                                                        commonData.time.map(
                                                                                            (
                                                                                                ele,
                                                                                                ind
                                                                                            ) => (
                                                                                                <option
                                                                                                    value={
                                                                                                        ele.code
                                                                                                    }
                                                                                                    key={
                                                                                                        ind
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        ele.label
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                </Form.Select>
                                                                                <span className="text-danger">
                                                                                    {
                                                                                        errors
                                                                                            .contactDetails
                                                                                            ?.timeToCall
                                                                                            ?.fromTime
                                                                                            ?.message
                                                                                    }
                                                                                </span>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <Form.Select
                                                                                    className="selecthide"
                                                                                    {...register(
                                                                                        "contactDetails.timeToCall.fromValue"
                                                                                    )}
                                                                                >
                                                                                    <option value="">
                                                                                        Select
                                                                                    </option>
                                                                                    {commonData &&
                                                                                        commonData.timeType &&
                                                                                        commonData.timeType.map(
                                                                                            (
                                                                                                ele,
                                                                                                ind
                                                                                            ) => (
                                                                                                <option
                                                                                                    value={
                                                                                                        ele.code
                                                                                                    }
                                                                                                    key={
                                                                                                        ind
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        ele.label
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                </Form.Select>
                                                                                <span className="text-danger">
                                                                                    {
                                                                                        errors
                                                                                            .contactDetails
                                                                                            ?.timeToCall
                                                                                            ?.fromValue
                                                                                            ?.message
                                                                                    }
                                                                                </span>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <Form.Select
                                                                                    className="selecthide"
                                                                                    {...register(
                                                                                        "contactDetails.timeToCall.toTime"
                                                                                    )}
                                                                                >
                                                                                    <option value="">
                                                                                        Select
                                                                                    </option>
                                                                                    {commonData &&
                                                                                        commonData.time &&
                                                                                        commonData.time.map(
                                                                                            (
                                                                                                ele,
                                                                                                ind
                                                                                            ) => (
                                                                                                <option
                                                                                                    value={
                                                                                                        ele.code
                                                                                                    }
                                                                                                    key={
                                                                                                        ind
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        ele.label
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                </Form.Select>
                                                                                <span className="text-danger">
                                                                                    {
                                                                                        errors
                                                                                            .contactDetails
                                                                                            ?.timeToCall
                                                                                            ?.toTime
                                                                                            ?.message
                                                                                    }
                                                                                </span>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <Form.Select
                                                                                    className="selecthide"
                                                                                    {...register(
                                                                                        "contactDetails.timeToCall.toValue"
                                                                                    )}
                                                                                >
                                                                                    <option value="">
                                                                                        Select
                                                                                    </option>
                                                                                    {commonData &&
                                                                                        commonData.timeType &&
                                                                                        commonData.timeType.map(
                                                                                            (
                                                                                                ele,
                                                                                                ind
                                                                                            ) => (
                                                                                                <option
                                                                                                    value={
                                                                                                        ele.code
                                                                                                    }
                                                                                                    key={
                                                                                                        ind
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        ele.label
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                </Form.Select>
                                                                                <span className="text-danger">
                                                                                    {
                                                                                        errors
                                                                                            .contactDetails
                                                                                            ?.timeToCall
                                                                                            ?.toValue
                                                                                            ?.message
                                                                                    }
                                                                                </span>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                    <Col md={4}>
                                                                        <Form.Label>
                                                                            Contact
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            {...register(
                                                                                "contactDetails.contact"
                                                                            )}
                                                                            maxLength={10}
                                                                            pattern="[0-9]*"
                                                                            value={phoneVal}
                                                                            onChange={
                                                                                handleChangeContactNumber
                                                                            }
                                                                            placeholder="Contact Number"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                    <Col md={4}>
                                                                        Contact display setting:
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <div className="d-flex flex-row">
                                                                            <ul>
                                                                                {commonData &&
                                                                                    commonData.familyValue &&
                                                                                    commonData.contactDisplayType.map(
                                                                                        (
                                                                                            ele,
                                                                                            ind
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    ind
                                                                                                }
                                                                                            >
                                                                                                <Form.Label>
                                                                                                    <Form.Check
                                                                                                        className="d-inline"
                                                                                                        {...register(
                                                                                                            "contactDetails.contactDisplay"
                                                                                                        )}
                                                                                                        type="radio"
                                                                                                        value={
                                                                                                            ele.code
                                                                                                        }
                                                                                                    />

                                                                                                    {
                                                                                                        ele.label
                                                                                                    }
                                                                                                </Form.Label>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                            </ul>
                                                                        </div>
                                                                        <span className="text-danger">
                                                                            {
                                                                                errors
                                                                                    .contactDetails
                                                                                    ?.contactDisplay
                                                                                    ?.message
                                                                            }
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                            <Card.Footer>
                                                                <Button
                                                                    type="submit"
                                                                    disabled={isSubmitting}
                                                                >
                                                                    Submit
                                                                </Button>
                                                            </Card.Footer>
                                                        </Form>
                                                    </Fragment>
                                                )}
                                            </Card.Header>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ContactDetail;
