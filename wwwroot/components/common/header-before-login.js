import { Col, Container, Dropdown, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import Image from "next/image";
import logo from "public/frontend/images/logo.png";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { utils, CONST } from "core/helper";
import { logoutAction } from "core/redux/account/account.action";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import ProfileSmallImage from "components/common/profile-small-image";
import Head from "next/head";

const HeaderBeforeLogin = () => {
    const router = useRouter();
    const token = useSelector((state) => state?.account?.token);
    const settings = useSelector((state) => state?.common?.siteSettings);
    const { supportEmail, contactNo, social = null } = settings;
    const [menuCollapse, setMenuCollapse] = useState(false);
    const authUser = useSelector((state) => state?.account?.authUser);
    const authProfile = useSelector((state) => state?.account?.profile);

    const [scroll, setScroll] = useState(false);

    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(true);
    };
    const closeMenu = () => {
        setIsActive(false);
    };


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
        
            <div className="head-top d-xl-block d-lg-none d-none">
                <div className="container">
                    <div className="row">
                        <div className="lhs">
                            <ul>
                                <li>
                                    <Link href="/about-us">About</Link>
                                </li>
                                <li>
                                    <Link href="/faq">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/contact-us">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="rhs">
                            <ul>
                                <li>
                                    <a href="tel:+917550014747" rel="nofollow">
                                        <i
                                            className="fa fa-phone me-1"
                                            
                                            aria-hidden="true"
                                        ></i>
                                        +91 75500 14747
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+917550054747" rel="nofollow">+91 75500 54747</a>
                                </li>
                                <li>
                                    <a href="tel:+917550064747" rel="nofollow" >+91 75500 64747</a>
                                </li>
                                <li>
                                    <a
                                        // style="text-transform: lowercase;"
                                        href="mailto:matrimony@truefriend.co.in" rel="nofollow"
                                    >
                                        <i
                                            className="fa fa-envelope-o me-1"
                                          
                                            aria-hidden="true"
                                        ></i>
                                        matrimony@truefriend.co.in
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com" target="_blank" rel="nofollow noopener">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com" target="_blank" rel="nofollow noopener">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://wa.me/+917550054747" rel="nofollow noopener">
                                        <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="menu-pop menu-pop1"> */}
            <div class={`menu-pop menu-pop1 ${isActive ? 'act' : ''}`}>
                <span class="menu-pop-clo" onClick={closeMenu}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <div class="inn">
                    <img
                        src="/frontend/images/logo.webp"
                        alt="True Friend Matrimony Logo"
                        loading="lazy"
                        class="logo-brand-only"
                    />
                    <ul className="pt-2 pb-4 d-xl-none d-block">
                        <li className="smenu-pare auth">
                            <Link href="/" >
                                <a onClick={closeMenu}>Home</a>
                            </Link>
                        </li>
                        <li className="smenu-pare auth">
                            <Link href="/success-stories">
                                <a onClick={closeMenu}>Success Stories</a>
                            </Link>
                        </li>
                        <li className="smenu-pare auth">
                            <Link href="/plans">
                                <a onClick={closeMenu}>Pricing Plans</a>
                            </Link>
                        </li>
                        <li className="smenu-pare auth">
                            <Link href="/blogs">
                                <a onClick={closeMenu}>Blog</a>
                            </Link>
                        </li>
                        <li className="smenu-pare auth d-xl-none d-lg-none d-md-none d-sm-none d- d-block">
                            <Link href="/login">
                                <a onClick={closeMenu}>LogIn</a>
                            </Link>
                        </li>
                        <li className="smenu-pare auth d-xl-none d-lg-none d-md-none d-sm-none d-block">
                            <Link href="/register">
                                <a onClick={closeMenu}>SignUp</a>
                            </Link>
                        </li>
                    </ul>
                    <p>
                        <strong>True Friend Matrimony</strong> is making history by creating more
                        meaningful connections that lead to fulfilling marriages
                    </p>
                    <ul class="menu-pop-info">
                        <li>
                            <a href="tel:+917550014747">
                                <i class="fa fa-phone" aria-hidden="true"></i>+91 75500 14747
                            </a>

                            <a href="tel:+917550054747">+91 75500 54747</a>
                            <a href="tel:+917550064747">+91 75500 64747 </a>
                        </li>

                        <li>
                            <a href="mailto:matrimony@truefriend.co.in">
                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                matrimony@truefriend.co.in
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>Vikas Mantra
                                Towers, 3rd Floor, 249, RK Mutt Road, Mandaveli, Chennai - 600 028
                                Tamilnadu.
                            </a>
                        </li>
                    </ul>
                
                    <div class="menu-pop-soci">
                        <ul>
                            <li>
                                <a href={social?.facebook}>
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.instagram}>
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.twitter}>
                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                            </li>

                            <li>
                                <a href={social?.youtube}>
                                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://wa.me/+917550054747">
                                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="menu-pop menu-pop2">
                <span class="menu-pop-clo">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <div class="inn">
                    {/* <div class="menu-pop-help">
                            <h4>Support Team</h4>
                            <div class="user-pro">
                                <img src="/frontend/images/profiles/1.jpg" alt="" loading="lazy" />
                            </div>
                            <div class="user-bio">
                                <h5>Ashley emyy</h5>
                                <span>Senior personal advisor</span>
                                <a href="#" class="btn btn-primary btn-sm">
                                    Ask your doubts
                                </a>
                            </div>
                        </div> */}
                    <div class="menu-pop-soci">
                    <ul>
                            <li>
                                <a href={social?.facebook}>
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.instagram}>
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.twitter}>
                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                            </li>

                            <li>
                                <a href={social?.youtube}>
                                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://wa.me/+917550054747" rel="nofollow noopener">
                                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="hom-top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="hom-nav">
                            <div className="logo">
                                <span className="menu desk-menu" onClick={toggleMenu}>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </span>
                                <Link href="/">
                                    <a
                                        className="logo-brand text-right"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <img
                                            src="/frontend/images/logo.webp"
                                            alt="True Friend Matrimony Logo"
                                            loading="lazy"
                                            className="ic-logo"
                                        />
                                    </a>
                                </Link>
                            </div>

                            <div className="bl pt-1 d-xl-block d-lg-none d-none">
                                <ul id="mainMenu">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/success-stories">Success Stories</Link>
                                    </li>

                                    <li>
                                        <Link href="/plans">Pricing Plans</Link>
                                    </li>
                                    <li>
                                        <Link href="/blogs">Blog</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="mob-menu">
                                <div className="mob-me-ic d-flex">
                                    {/* <!-- <span className="ser-open mobile-ser">
                                    <img src="images/icon/search.svg" alt=""/>
                                </span> --> */}
                                    {/* <span className="mobile-exprt" data-mob="dashbord">
                                        <img src="/frontend/images/icon/users.svg" alt="" />
                                    </span>
                                    <span className="mobile-menu" data-mob="mobile">
                                        <img src="/frontend/images/icon/menu.svg" alt="" />
                                    </span> */}
                                    <Link href="/register" className="">
                                        <a className="cta-dark_1 d-xl-block d-md-block d-sm-block d-none">
                                            <span>SignUp</span>
                                        </a>
                                    </Link>{" "}
                                    <Link href="/login" className="">
                                        <a className="cta-dark_1 d-xl-block d-md-block d-sm-block d-block log">
                                            <span>LogIn</span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

const mapDispatchToProps = {
    logoutAction,
};

export default connect(null, mapDispatchToProps)(HeaderBeforeLogin);
