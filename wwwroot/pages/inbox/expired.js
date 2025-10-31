import { Col, Container, Row } from "react-bootstrap";
import Head from "next/head";

const Expired = () => {
    return (
        <>
<Head>
    <title>Expired Requests | True Friend Matrimony</title>
    <meta
        name="description"
        content="You have no expired partner requests. Discover new Christian and interfaith matrimonial profiles and continue your journey to find your perfect match on True Friend Matrimony."
    />
    <meta
        name="keywords"
        content="Expired Requests, Partner Search, Matchmaking, TrueFriend Matrimony, Christian Matrimony, Christian Marriage, Interfaith Matrimony, Matrimonial Services, Marriage Partner, Trusted Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/expired" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Expired Requests | True Friend Matrimony" />
    <meta
        property="og:description"
        content="You have no expired partner requests. Discover new Christian and interfaith matrimonial profiles and continue your journey to find your perfect match on True Friend Matrimony."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/expired" />

</Head>

        <section className="page-section-ptb4 pb-6">
            <Container>
                
                <Row className="d-flex justify-content-center">
                    <Col md={10} className="col-md-10 mb-2">
                        <div className="bg-white">
                            <Row>
                                <Col md={2}>
                                    <div className="border p-2"></div>
                                </Col>
                                <Col md={9} className="text-center">
                                    <div className="m-5">
                                        <h5>No Expired Requests</h5>
                                        <p>
                                            Check out more Profiles and continue your Partner
                                            search.
                                        </p>
                                        <button className="btn btn-primary">View My Matches</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
};

export default Expired;
