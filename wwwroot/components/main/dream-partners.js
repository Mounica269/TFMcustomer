import { Col, Container, Row } from "react-bootstrap";
import dreamPartner from "public/frontend/images/bg/bg-7.jpg";
import Link from "next/link";
import { REGISTER_PATH } from "core/helper/const";
import Head from "next/head";

const DreamPartners = () => {
    return (
        <>
            <Head>
                <title>Christian Matrimony | TrueFriend Matrimony</title>
                <meta
                    name="description"
                    content="TrueFriend Matrimony is the leading Christian Matrimony platform helping Tamil, Kerala, and Indian Christian singles find meaningful relationships and marriage. Connect with verified Christian brides & grooms today."
                />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Christian Marriage, Tamil Christian Matrimony, Kerala Christian Matrimony, Indian Christian Matrimony, Christian Bride, Christian Groom, True Friend Matrimony, Best Christian Matrimony Site, Christian Wedding, Christian Soulmate ,God-centered Soulmate, Christian Matrimonial Services"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com" />

                {/* Open Graph  */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Christian Matrimony | TrueFriend Matrimony" />
                <meta
                    property="og:description"
                    content="True Friend Matrimony helps Christian singles find meaningful relationships and marriage. Start your journey to find a God-centered soulmate today."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com" />

            </Head>

            <section>
                <div className="ab-wel">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="ab-wel-lhs">
                                    <span className="ab-wel-3"></span>
                                    <img src="/frontend/images/couples/1.jpg" alt="couples" loading="lazy" className="ab-wel-1" />
                                    <img src="/frontend/images/couples/11.jpg" alt="couples" loading="lazy" className="ab-wel-2" />
                                    <span className="ab-wel-4"></span>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="ab-wel-rhs">
                                    <div className="ab-wel-tit">
                                        <h2>Welcome to <em>True Friend matrimony</em>
                                        </h2>
                                        <p>True Friend Matrimony, a trusted platform to find your life partner. Our website is dedicated to helping you find a compatible match who shares your faith, values, and aspirations, and will be a great and perfect match for your beloved family. “He has made everything beautiful in its time” Eccl 3:11.</p>

                                        <p>  <Link href="/register" class="cta-dark_1">Join us at True Friend Matrimony  </Link> and start your beautiful journey towards finding an Amazing Soulmate.</p>
                                    </div>
                                    <div className="ab-wel-tit-1">
                                        <p>We believe that finding your soulmate should be a joyful experience, and we're committed to making it happen. Our website is designed to cater to your diverse needs and preferences, providing you with a personalized and hassle-free experience.</p>
                                    </div>
                                    <div className="ab-wel-tit-2">
                                        <ul>
                                            <li>
                                                <div>
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                    <h4>Enquiry <em><a href="tel:+917550014747" rel="nofollow">

                                                        +91 75500 14747
                                                    </a>
                                                        <br /><a href="tel:+917550054747" rel="nofollow">+91 75500 54747</a>
                                                        <br /><a href="tel:+917550064747" rel="nofollow">+91 75500 64747</a></em></h4>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                                    <h4>Get Support <em> <a
                                                        href="mailto:matrimony@truefriend.co.in" rel="nofollow"
                                                    > matrimony@truefriend.co.in
                                                    </a></em></h4>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DreamPartners;
