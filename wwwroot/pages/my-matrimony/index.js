import { Container, Row, Col } from "react-bootstrap";
import { useEffect, Fragment } from "react";
import ProfileCard from "components/dashboard/profile-card";
import ActivitySummary from "components/dashboard/activity-summary";
import Advertisement from "components/dashboard/advertisement";
import PremiumProfileList from "components/dashboard/premium-list";
import NewMatcheList from "components/dashboard/new-matche-list";
import NotificationList from "components/dashboard/notification-list";
import ChatBox from "components/chatbox/chat-list";
import { utils } from "core";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";
import { connect, useSelector } from "react-redux";

const Dashboard = (props) => {

    const authProfile = useSelector((state) => state.account?.profile);

    useEffect(() => {
        setTimeout(() => {
            utils.scrollToTop();
        }, 250);
    }, []);

    return (
        <>

       <Head>
    <title>My Matrimony | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Explore inspiring Christian matrimony success stories on TrueFriend Matrimony. Discover faith-aligned partners, real-life Christian love journeys, and connect with trusted singles within a secure Christian community."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Success Stories, TrueFriend Matrimony,Christian matrimony, Christian Love Stories, Faith-Based Matrimonial Matches, Christian Marriage Stories, Christian Relationship Success, Christian Matrimonial Platform, Find Christian Life Partner, Trusted Christian Matrimony, Christian Singles"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="My Matrimony | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Explore inspiring Christian success stories on True Friend Christian Matrimony. Connect with faith-aligned partners and find your ideal life partner within a trusted community."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony" />


  
</Head>


            <Fragment>
                <section className="page-section-ptb4">
                    <Container>
                        <Row>
                            <Col lg={4} md={6} sm={12}>
                                <ProfileCard />
                            </Col>
                            <Col lg={8} md={6} sm={12}>
                                <ActivitySummary />
                            </Col>
                            <Advertisement />
                        </Row>
                        <Row className="sidebar-widget">
                            <Col lg={4} sm={12}>
                                <PremiumProfileList />
                            </Col>
                            <Col lg={4} sm={12}>
                                <NewMatcheList />
                            </Col>
                            <Col lg={4} sm={12}>
                                <NotificationList />
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* <ChatBox /> */}
            </Fragment>
        </>
    );
};

export default Dashboard;
