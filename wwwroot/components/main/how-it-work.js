import { Fragment } from "react";
import Head from "next/head";

const HowItWorks = () => {
    return (
        <Fragment>
            <Head>
                <title>Christian Matrimony | TrueFriend Matrimony - How It Works</title>
                <meta
                    name="description"
                    content="Learn how TrueFriend Matrimony, the trusted Christian Matrimony platform, helps Tamil, Kerala, and Indian Christian singles find meaningful relationships with genuine profiles and easy matchmaking." />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Christian Marriage, Christian Matchmaking, Tamil Christian Matrimony, Christian Matrimony India, Christian Brides, Christian Grooms, Matrimony Site for Christians , How Christian Matrimony Works, Christian Matchmaking Process, Tamil Christian Matrimony, Kerala Christian Matrimony, Indian Christian Matrimony, Genuine Christian Matrimony Profiles, Best Christian Matrimony Site, TrueFriend Matrimony"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Christian Matrimony | TrueFriend Matrimony - How It Works" />
                <meta
                    property="og:description"
                    content="Discover how True Friend Christian Matrimony helps you find your perfect life partner with trustworthy profiles, better matches, and easy connections."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com" />

            </Head>

            <section>
                <div className="str">
                    <div className="ban-inn ban-home">
                        <div className="container">
                            <div className="row">
                                <div className="hom-ban">
                                    <div className="ban-tit">
                                        <span><i className="no1">#1</i> Wedding Website</span>
                                        <h2>Why Choose Us</h2>
                                        <p>True Friend is making history by creating more meaningful connections that lead to fulfilling marriages</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="ab-sec2">
                    <div className="container">
                        <div className="row">
                            <ul className="choose" >
                                <li>
                                    <div className="chss">
                                        <img src="/frontend/images/icon/prize.png" alt="Trustworthy" loading="lazy" />
                                        <h4>100% Trustworthy</h4>
                                        <p>We are a highly authentic, 100% trustworthy matrimony platform. We follow multi-level authentication to ensure that only genuine profiles are provided.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="chss">
                                        <img src="/frontend/images/icon/rings.png" alt="Better Search and Matches" loading="lazy" />
                                        <h4>Better Search and Matches</h4>
                                        <p>Our algorithms are tuned to provide better search results and matches based on your preferences. Our user interfaces are designed to enable hassle-free navigation to provide relevant matches.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="chss">
                                        <img src="/frontend/images/icon/trust.png" alt="Explore and connect" loading="lazy" />
                                        <h4>Explore and connect</h4>
                                        <p>Explore and connect anytime, anywhere with registered users at your ease. Get access to unlimited profiles & share your interest with the one you like.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default HowItWorks;
