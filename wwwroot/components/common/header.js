import { Col, Container, Nav, Row } from "react-bootstrap";
import Image from "next/image";
import logo from "public/frontend/images/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

const Header = () => {
    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 400) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
          <Head>
        {/* Primary SEO */}
        <title>TrueFriend Matrimony | Christian Matrimony in India</title>
        <meta name="description" content="TrueFriend Matrimony - An Authentic Christian Matrimony Site Connecting Christian Brides and Grooms Across India. Safe, Verified, and Trusted." />
            <meta name="keywords" content="Christian Matrimony, Christian Matrimony India, Trusted Christian Matrimony, Christian Matchmaking, Christian Brides and Grooms, Faith-Based Matrimony, Christian Life Partner, Church Wedding Support, Christian Matrimonial Services, Bible-Based Matrimony, Christian Matrimony Platform, Christian Soulmate Search" />

        <link rel="canonical" href="https://www.truefriendmatrimony.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TrueFriend Matrimony" />
        <meta property="og:title" content="TrueFriend Matrimony | Christian Matrimony in India" />
        <meta property="og:description" content="TrueFriend Matrimony - An Authentic Christian Matrimony Site Connecting Christian Brides and Grooms Across India. Safe, Verified, and Trusted." />
        <meta property="og:image:alt" content="TrueFriend Matrimony - Christian Matrimony" />
        <meta property="og:url" content="https://www.truefriendmatrimony.com" />

      </Head>

            <header id="header" className="defualt">
                <div className="topbar">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                
                            </Col>
                            <Col md={6}>
                                <div className="topbar-right text-end">
                                    <ul className="list-inline social-icons color-hover">
                                        <li className="social-facebook">
                                            <a href="#">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li className="social-twitter">
                                            <a href="#">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li className="social-instagram">
                                            <a href="#">
                                                <i className="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li className="social-dribbble">
                                            <a href="#">
                                                <i className="fa fa-dribbble"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="list-inline text-uppercase top-menu">
                                        <li>
                                            <Link href="/register">Register</Link>
                                        </li>
                                        <li>
                                            <Link href="/login">Login</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="menu">
                    <Nav id="menu" className={scroll ? "mega-menu desktopTopFixed" : "mega-menu"}>
                        <section className="menu-list-items">
                            <Container>
                                <Row className="position-relative">
                                    <Col md={12} className="position-relative">
                                        <Link href="/">
                                            <a href="#">
                                                <Image
                                                    src={logo}
                                                    alt="true friend matrimony"
                                                    width={220}
                                                    height={75}
                                                />
                                            </a>
                                        </Link>
                                        <ul className="menu-links">
                                            <li>
                                                <a href="index.html"> Home</a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    About Us{" "}
                                                    <i className="fa fa-angle-down fa-indicator"></i>
                                                </a>
                                                <ul className="drop-down-multilevel left-menu">
                                                    <li>
                                                        <a href="">Member Login</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Register Profile</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Search ID</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Search Profile</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Success Stories</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Take a Tour</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Wedding Services{" "}
                                                    <i className="fa fa-angle-down fa-indicator"></i>
                                                </a>
                                                <ul className="drop-down-multilevel left-menu">
                                                    <li>
                                                        <a href="">Bride & Groom Makeup</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Catering Service</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Floral & Stage Decoration</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Photography</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Videography</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Helicam Video</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Travel service</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Honeymoon packages</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Light Music</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Luxury Car Rentals</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Light and Sound System</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Wedding Counseling</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Wedding Gifts</a>
                                                    </li>
                                                    <li>
                                                        <a href="">Wedding Photography</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Membership Plans{" "}
                                                    <i className="fa fa-angle-down fa-indicator"></i>
                                                </a>
                                                <ul className="drop-down-multilevel left-menu">
                                                    <li>
                                                        <a href="">TFM Executive</a>
                                                    </li>
                                                    <li>
                                                        <a href="">TFM Premium</a>
                                                    </li>
                                                    <li>
                                                        <a href="">TFM Supreme</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </Nav>
                </div>
            </header>
        </>
    );
};

export default Header;
