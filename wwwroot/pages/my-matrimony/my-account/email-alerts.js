import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MyAccountSettings from "components/common/my-account-settings";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { reloadProfileAction } from "core/redux/account/account.action";
import { connect } from "react-redux";
import { profileService } from "core/services";
import { utils } from "core/helper";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";



const emailAlertsSchema = Yup.object().shape({
    emailAlerts: Yup.object().shape({
        matchs: Yup.string().nullable().label("Matches").required(),
        visitors: Yup.string().nullable().required("For whom to show your emails?"),
        viewed: Yup.string().nullable().required("For whom to show your profile email?"),
        contactAlert: Yup.string().nullable().required("Contact alert is required"),
    }),
});

const EmailAlerts = (props) => {
    const { commonData, reloadProfileAction, reloadProfile, authProfile } = props;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: yupResolver(emailAlertsSchema),
    });

    const onSubmitEmailAlerts = async (values) => {
        const resp = await profileService.updateProfile(values);
        if (resp && resp?.meta?.code === 200) {
            utils.showSuccessMsg(resp?.meta.message);
            reloadProfileAction(!reloadProfile);
        }
    };

    const getEmailAlertsFormSection = () => {
        if (commonData === undefined || commonData === null) {
            return "Form";
        }
        return (
            <>
     <Form onSubmit={handleSubmit(onSubmitEmailAlerts)}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col lg={12}>
                                <div className="wrapper-te1 pb-3 pt-3">
                                    <Row>
                                        <Col md={6}>
                                        <span className="text-la"><b>Match Mail & Photo Match Mail </b></span>{" "}

                                        </Col>
                                        <Col md={6}>
                                        <span className="float-right text-lar r_t"><b>Email Alert</b></span>

                                        </Col>

                                    </Row>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="wrapper-te1">
                                    <Row>
                                        <Col xs={6}>
                                            <span className="text-la w-100">
                                                Personalized matches for you delivered via email as
                                                often as you like. A very effective match-making
                                                tool.{" "}
                                            </span>
                                        </Col>
                                        <Col xs={6} className="d-flex">
                                            <span className="float-right text-lar">
                                                <ul className="list">
                                                    {commonData?.matchMail?.map((ele, ind) => (
                                                        <li>
                                                            <Form.Check key={ind}>
                                                                <Form.Check.Label>
                                                                    <Form.Check.Input
                                                                        type="radio"
                                                                        {...register(
                                                                            "emailAlerts.matchs"
                                                                        )}
                                                                        value={ele.code}
                                                                    />
                                                                    <i className="input-helper"></i>
                                                                    {ele.label}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="text-danger text-nowrap">
                                                    {errors.emailAlerts?.matchs?.message}
                                                </p>
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col lg={12}>
                                <div className="wrapper-te1 pt-3 pb-3">
                                <Row>
                                        <Col md={6}>
                                        <span className="text-la"><b>Recent Visitors Email </b></span>{" "}

                                        </Col>
                                        <Col md={6}>
                                        <span className="float-right text-lar r_t"><b><b>Email Alert</b></b></span>

                                        </Col>

                                    </Row>

                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="wrapper-te1">
                                    <Row>
                                        <Col xs={6}>
                                            <span className="text-la w-100">
                                                An email notification of Members who have recently
                                                Viewed your Profile
                                            </span>
                                        </Col>
                                        <Col xs={6} className="d-flex">
                                            <span className="float-right text-lar">
                                                <ul className="list">
                                                    {commonData?.visitorMail?.map((ele, ind) => (
                                                        <li>
                                                            <Form.Check key={ind}>
                                                                <Form.Check.Label>
                                                                    <Form.Check.Input
                                                                        type="radio"
                                                                        {...register(
                                                                            "emailAlerts.visitors"
                                                                        )}
                                                                        value={ele.code}
                                                                    />
                                                                    <i className="input-helper"></i>
                                                                    {ele.label}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="text-danger text-nowrap">
                                                    {errors.emailAlerts?.visitors?.message}
                                                </p>
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col lg={12}>
                            <div className="wrapper-te1 pt-3 pb-3">
                                <Row>
                                        <Col md={6}>
                                        <span className="text-la"><b>Viewed Profiles Email</b> </span>{" "}

                                        </Col>
                                        <Col md={6}>
                                        <span className="float-right text-lar r_t"><b>Email Alert</b></span>

                                        </Col>

                                    </Row>

                                </div>

                            </Col>
                            <Col lg={12}>
                                <div className="wrapper-te1">
                                    <Row>
                                        <Col xs={6}>
                                            <span className="text-la w-100">
                                                An email reminder containing Profiles you have
                                                Viewed recently but have not yet invited to Connect.
                                            </span>
                                        </Col>
                                        <Col xs={6} className="d-flex">
                                            <span className="float-right text-lar">
                                                <ul className="list">
                                                    {commonData?.viewedMail?.map((ele, ind) => (
                                                        <li>
                                                            <Form.Check key={ind}>
                                                                <Form.Check.Label>
                                                                    <Form.Check.Input
                                                                        type="radio"
                                                                        {...register(
                                                                            "emailAlerts.viewed"
                                                                        )}
                                                                        value={ele.code}
                                                                    />
                                                                    <i className="input-helper"></i>
                                                                    {ele.label}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="text-danger text-nowrap">
                                                    {errors.emailAlerts?.viewed?.message}
                                                </p>
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Row>
                            <Col lg={12}>
                            <div className="wrapper-te1 pt-3 pb-3">
                                <Row>
                                        <Col md={6}>
                                        <span className="text-la"><b>Contact Alert </b></span>{" "}

                                        </Col>
                                        <Col md={6}>
                                        <span className="float-right text-lar r_t"><b>Email Alert</b></span>

                                        </Col>

                                    </Row>

                                </div>

                            </Col>
                            <Col lg={12}>
                                <div className="wrapper-te1">
                                    <Row>
                                        <Col xs={6}>
                                            <span className="text-la w-100">
                                                Alerts you receive every time someone contacts you
                                                or you receive a response to a contact initiated by
                                                you. Get them in your mailbox at a frequency of your
                                                choice. Essential to keep you informed of all
                                                responses received.
                                            </span>
                                        </Col>
                                        <Col xs={6} className="d-flex">
                                            <span className="float-right text-lar w-100">
                                                <ul className="list">
                                                    {commonData?.contactAlertMail?.map(
                                                        (ele, ind) => (
                                                            <li>
                                                                <Form.Check key={ind}>
                                                                    <Form.Check.Label>
                                                                        <Form.Check.Input
                                                                            type="radio"
                                                                            {...register(
                                                                                "emailAlerts.contactAlert"
                                                                            )}
                                                                            value={ele.code}
                                                                        />
                                                                        <i className="input-helper"></i>
                                                                        {ele.label}
                                                                    </Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                                <p className="text-danger text-nowrap">
                                                    {errors.emailAlerts?.contactAlert?.message}
                                                </p>
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button className="cta-dark btn-lg btn-theme full-rounded btn btn-primary mt-5" disabled={isSubmitting} type="submit" style={{border:"none"}}>
                    Submit
                </Button>
            </Form>
            </>
        );
    };

    useEffect(() => {
        if (authProfile?.privacyOption) {
            setPrivacyOptionValues(authProfile?.emailAlerts);
        }
    }, [authProfile]);

    const setPrivacyOptionValues = (data) => {
        if (data) {
            const { matchs, visitors, viewed, contactAlert } = data;
            setValue("emailAlerts", {
                matchs: matchs.toString(),
                visitors: visitors.toString(),
                viewed: viewed.toString(),
                contactAlert: contactAlert.toString(),
            });
        }
    };

    return (
        <>

<Head>
    <title>Alerts | True Friend Christian Matrimony</title>

   <meta
        name="description"
        content="Receive real-time Christian matrimony alerts and notifications on TrueFriend Matrimony. Stay updated on new messages, profile activity, and important updates to connect with compatible Christian singles easily."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Alerts, Real-Time Matrimonial Notifications, Christian Matchmaking Alerts, Profile Activity Notifications, Christian Singles Alerts, TrueFriend Matrimony,Christian Matrimony,  Trusted Christian Matrimonial Platform, Faith-Based Matchmaking, Christian Messages, Find Life Partner"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/notification" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Alerts | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Receive real-time alerts on True Friend Christian Matrimony for new messages, profile activity, and updates. Stay connected with compatible Christian matches and never miss important notifications."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/notification" />

</Head>


   <section>
                <div className="db">
                    <Container>
                        <Row>
                            <Col xl={3} lg={4} md={12}>
                                <div className="db-nav">
                                    <div className="db-nav-list">

                                        <MyAccountSettings />
                                    </div>
                                </div>
                            </Col>
                            <Col xl={9} lg={8} md={12} >
                                <div className="db-nav">
                                    <div className="db-nav-list">
                                    <h4>My Alerts Manager</h4>

                                    <p className="mt-4">
                                        Manage your subscriptions to Alerts on email listed below.
                                        You can also subscribe to and Times Newsletters.
                                    </p>

                                    <h5 className="mt-4">My Alerts</h5>
                                    {getEmailAlertsFormSection()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </section>
   
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        reloadProfile: state.account?.reloadProfile,
        authProfile: state.account?.profile,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailAlerts);
