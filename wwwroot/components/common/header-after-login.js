// new

import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Dropdown, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { logoutAction } from "core/redux/account/account.action";
import { utils, CONST } from "core/helper";
import logo from "public/frontend/images/logo.png";

import SubHeaderAfterLogin from "./header-sub-menu";
import { useRouter } from "next/router";
import ProfileSmallImage from "components/common/profile-small-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import SideNavBar from "./sidednavbar";
import Head from "next/head";

const HeaderAfterLogin = (props) => {
    const router = useRouter();
    const { logoutAction } = props;
    const authUser = useSelector((state) => state?.account?.authUser);
    const authProfile = useSelector((state) => state?.account?.profile);
    const [scroll, setScroll] = useState(false);
    const [mainMenuPath, setMainMenuPath] = useState("");
    const settings = useSelector((state) => state?.common?.siteSettings);
    const { social = null } = settings;
    const profileData = useSelector((state) => state?.account?.profileData);
    const handleScroll = () => {
        // console.log("handleScroll::");
        // setScroll(window.pageYOffset > 50);
        // if (window.pageYOffset > 50) {
        //     setScroll(true);
        // } else {
        //     setScroll(false);
        // }
    };

    useEffect(() => {
        const urlPath = router.pathname;
        const urlPathObj = urlPath.split("/");
        const [baseUrl, mainUrl, subMenuUrl = null] = urlPathObj;
        setMainMenuPath(mainUrl);
    }, [router]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.addEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logoutAction();
        utils.showSuccessMsg("Logged Out Successfully");
        router.push(CONST.LOGIN_PATH);
    };

    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(true);
    };
    const closeMenu = () => {
        setIsActive(false);
    };

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
            <Fragment>
                {/* Preloader */}
                {/* <div className="pop-bg"></div> */}

                {/* Top Header */}
                <div className="head-top d-xl-block d-lg-none d-md-none d-none">
                    <Container>
                        <Row>
                            <Col xs={6} className="lhs" style={{ paddingLeft: "0" }}>
                                <ul>
                                    {/* <li>
                                        <a href="#!" className="ser-open">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </a>
                                    </li> */}
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
                            </Col>
                            <Col xs={6} className="rhs">
                                <ul>
                                    <li>
                                        <a href="tel:+917550014747" rel="nofollow" >
                                            <i
                                                class="fa fa-phone me-1"
                                               
                                                aria-hidden="true"
                                            ></i>
                                            +91 75500 14747
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+917550054747" rel="nofollow" >+91 75500 54747</a>
                                    </li>
                                    <li>
                                        <a href="tel:+917550064747" rel="nofollow">+91 75500 64747</a>
                                    </li>
                                    <li>
                                        <a
                                            // style="text-transform: lowercase;"
                                            href="mailto:matrimony@truefriend.co.in" rel="nofollow" 
                                        >
                                            <i
                                                class="fa fa-envelope-o me-1"
                                                
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
                                        {/* <a href="https://www.webwhatsapp.com">
                                            <i className="fa fa-whatsapp" aria-hidden="true"></i>+91 75500 54747
                                        </a> */}
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div class={`menu-pop menu-pop1 ${isActive ? 'act' : ''}`}>
                    <span class="menu-pop-clo"  onClick={closeMenu}>
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
                            <li className="smenu-pare">
                                <span className="">Matrimony</span>

                                <div className="smenu-open_2 smenu-single mat">
                                    <ul>
                                        <li className="sub" onClick={closeMenu} >
                                            <Link href={CONST.DASH_PATH} > Dashboard</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}  >
                                            <Link href={CONST.MATRI_PROFILE_PATH}>My profile</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu} >
                                            <Link href={CONST.MATRI_PHOTOS_PATH} >My Photos</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATRI_PREFERENCE}>
                                                Partner Preference
                                            </Link>
                                        </li>

                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATRI_ACCOUNT_PATH}>My Account</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATRI_ACC_CONTACT_DET_PATH}>
                                                Contact Details
                                            </Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.ORDERS_PATH}>My Orders</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.INBOX_NOTIFICATION_PATH}>Notifications</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="smenu-pare">
                                <span className="">Matches</span>

                                <div className="smenu-open_2 smenu-single match">
                                    <ul>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATCH_NEW_PATH}>New Matches</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATCH_TODAY_PATH}>
                                                Today Matches
                                            </Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATCH_MY_PATH}>My Matches</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATCH_NEARBY_PATH}>Near Me</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATCH_RECENTLY_VISITORS_PATH}>
                                                Recent Visitors
                                            </Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.MATCH_MORE_PATH}>More Matches</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="smenu-pare">
                                <span className="">Search</span>

                                <div className="smenu-open_2 smenu-single srch">
                                    <ul>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.SEARCH_BASIC_PATH}>Basic</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.SEARCH_ADVANCE_PATH}>Advance</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="smenu-pare">
                                <span className="">Inbox</span>

                                <div className="smenu-open_2 smenu-single inbox">
                                    <ul>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.INBOX_RECEIVED_PATH}>Received</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.INBOX_ACCEPTED_PATH}>Accepted</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.INBOX_REQUESTS_PATH}>Requests</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.INBOX_SENT_PATH}>Sent</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link  href={CONST.INBOX_CONTACTS_PATH}>Contacts</Link>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={CONST.INBOX_NOTIFICATION_PATH}>Notifications</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="smenu-pare">
                                <span className="">
                                    {" "}
                                    {authProfile?.prevContactViewPending === 0 && (
                                        <Fragment style={{ color: "#fff" }}>Update Plan</Fragment>
                                    )}
                                    {authProfile?.prevContactViewPending !== 0 && (
                                        <Fragment>Renew Plan</Fragment>
                                    )}
                                </span>

                                <div className="smenu-open_2 smenu-single pln">
                                    <ul className="">
                                        <li className="sub" onClick={closeMenu}>
                                            <label style={{ whiteSpace: "normal" }}>
                                                Acc-Type :
                                                {authProfile?.subscription
                                                    ? authProfile?.subscription?.planName
                                                    : " ----- "}
                                            </label>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <label>
                                                Expires on:
                                                {authProfile?.subscription?.expiresAt
                                                    ? moment(
                                                          authProfile?.subscription?.expiresAt
                                                      ).format("DD-MM-YYYY")
                                                    : " ----- "}
                                            </label>
                                        </li>
                                        <li className="sub" onClick={closeMenu}>
                                            <Link href={"/plan-upgrade"}>
                                                <a>
                                                    {" "}
                                                    <FontAwesomeIcon
                                                        width={20}
                                                        icon={faCrown}
                                                    />{" "}
                                                    Upgrade Now
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/* <li className="smenu-pare auth">
                                <Link href="/login">
                                    <a style={{ borderBottom: "0" }}>LogIn</a>
                                </Link>
                            </li>
                            <li className="smenu-pare auth">
                                <Link href="/register">
                                    <a>SignUp</a>
                                </Link>
                            </li> */}
                        </ul>
                        <p>
                            <strong>True Friend Matrimony</strong> is making history by creating
                            more meaningful connections that lead to fulfilling marriages
                        </p>
                        <ul class="menu-pop-info">
                            <li>
                                <a href="tel:+917550014747" rel="nofollow">
                                    <i class="fa fa-phone" aria-hidden="true"></i>+91 75500 14747
                                </a>

                                <a href="tel:+917550054747" rel="nofollow" >+91 75500 54747</a>
                                <a href="tel:+917550064747" rel="nofollow" >+91 75500 64747 </a>
                            </li>

                            <li>
                                <a href="mailto:matrimony@truefriend.co.in" rel="nofollow">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                    matrimony@truefriend.co.in
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>Vikas Mantra
                                    Towers, 3rd Floor, 249, RK Mutt Road, Mandaveli, Chennai - 600
                                    028 Tamilnadu.
                                </a>
                            </li>
                        </ul>
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
                <div class="menu-pop menu-pop2">
                    <span class="menu-pop-clo">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                    <div class="inn">
                      
                        <div class="menu-pop-soci">
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-whatsapp" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                     
                    </div>
                </div>
                {/* Main Header */}
                <div className="hom-top">
                    <Container>
                        <Row className="justify-content-between">
                            <div className="hom-nav">
                                <div className="logo ">
                                    <span class="menu desk-menu mt-1" onClick={toggleMenu}>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </span>

                                    <Link href="/">
                                        <a class="logo-brand" style={{ marginLeft: "10px" }}>
                                            <img
                                                src="/frontend/images/logo.webp"
                                                alt="True Friend Matrimony Logo"
                                                loading="lazy"
                                                class="ic-logo"
                                            />
                                        </a>
                                    </Link>
                                </div>

                                {/* Top Menu */}
                                <div className="bl d-xl-block d-lg-none d-none">
                                    <ul>
                                        <li className="smenu-pare">
                                            <span className="smenu">My Matrimony </span>
                                            <div className="smenu-open smenu-single">
                                                <ul>
                                                    <li>
                                                        <Link  href={CONST.DASH_PATH}>Dashboard</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATRI_PROFILE_PATH}>
                                                            My profile
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATRI_PHOTOS_PATH}>
                                                            My Photos
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATRI_PREFERENCE}>
                                                            Partner Preference
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href={CONST.MATRI_ACCOUNT_PATH}>
                                                            My Account
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATRI_ACC_CONTACT_DET_PATH}>
                                                            Contact Details
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.ORDERS_PATH}>
                                                            My Orders
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.INBOX_NOTIFICATION_PATH}>
                                                            Notifications
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="smenu-pare">
                                            <span className="smenu">Matches</span>
                                            <div className="smenu-open smenu-single">
                                                <ul>
                                                    <li>
                                                        <Link href={CONST.MATCH_NEW_PATH}>
                                                            New Matches
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATCH_TODAY_PATH}>
                                                            Today Matches
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATCH_MY_PATH}>
                                                            My Matches
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATCH_NEARBY_PATH}>
                                                            Near Me
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link  href={CONST.MATCH_RECENTLY_VISITORS_PATH}>
                                                            Recent Visitors
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.MATCH_MORE_PATH}>
                                                            More Matches
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="smenu-pare">
                                            <span className="smenu">Search</span>
                                            <div className="smenu-open smenu-single">
                                                <ul>
                                                    <li>
                                                        <Link  href={CONST.SEARCH_BASIC_PATH}>Basic</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.SEARCH_ADVANCE_PATH}>Advance</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="smenu-pare">
                                            <span className="smenu">Inbox</span>
                                            <div className="smenu-open smenu-single">
                                                <ul>
                                                    <li>
                                                        <Link href={CONST.INBOX_RECEIVED_PATH}>Received</Link>
                                                    </li>
                                                    <li>
                                                        <Link  href={CONST.INBOX_ACCEPTED_PATH}>Accepted</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.INBOX_REQUESTS_PATH}>Requests</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.INBOX_SENT_PATH}>Sent</Link>
                                                    </li>
                                                    <li>
                                                        <Link  href={CONST.INBOX_CONTACTS_PATH}>Contacts</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={CONST.INBOX_NOTIFICATION_PATH}>
                                                            Notifications
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mob-menu">
                                    <div className="mob-me-ic d-flex">
                                        <div class="bl_2 d-xl-block d-lg-none d-none">
                                            <ul>
                                                <li
                                                    className="smenu-pare"
                                                   
                                                >
                                                    <span className="">
                                                        {authProfile?.prevContactViewPending ===
                                                            0 && (
                                                            <Fragment style={{ color: "#fff" }}>
                                                                <i
                                                                    className="fa fa-trophy me-1"
                                                                  
                                                                ></i>
                                                                Update Plan
                                                            </Fragment>
                                                        )}
                                                        {authProfile?.prevContactViewPending !==
                                                            0 && (
                                                            <Fragment>
                                                                <i
                                                                    className="fa fa-trophy me-1"
                                                                   
                                                                ></i>
                                                                Renew Plan
                                                            </Fragment>
                                                        )}
                                                    </span>

                                                    <div className="smenu-open_2 smenu-single">
                                                        <ul>
                                                            <li>
                                                                <label
                                                                    style={{ whiteSpace: "normal" }}
                                                                >
                                                                    Acc-Type :
                                                                    {authProfile?.subscription
                                                                        ? authProfile?.subscription
                                                                              ?.planName
                                                                        : " ----- "}
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label>
                                                                    Expires on:
                                                                    {authProfile?.subscription
                                                                        ?.expiresAt
                                                                        ? moment(
                                                                              authProfile
                                                                                  ?.subscription
                                                                                  ?.expiresAt
                                                                          ).format("DD-MM-YYYY")
                                                                        : " ----- "}
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <Link href={"/plan-upgrade"}>
                                                                    <a>
                                                                        {" "}
                                                                        <FontAwesomeIcon
                                                                            width={20}
                                                                            icon={faCrown}
                                                                        />{" "}
                                                                        Upgrade Now
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bl_1 d-xl-block d-none">
                                            <ul className="float-right">
                                                <li
                                                    className="smenu-pare"
                                                    style={{
                                                        marginTop: "3px",
                                                        marginBottom: "-3px",
                                                    }}
                                                >
                                                    <span className="">
                                                        {" "}
                                                        {authProfile && (
                                                            <ProfileSmallImage
                                                                photos={authProfile?.photos}
                                                                gender={authProfile?.basic?.gender}
                                                                alt={`Profile picture of ${authProfile?.userName || "user"}`}
                                                            />
                                                        )}
                                                    </span>

                                                    <div className="smenu-open_1 smenu-single">
                                                        <ul>
                                                            <li>
                                                                <Link
                                                                    href={CONST.MATRI_PROFILE_PATH}
                                                                >
                                                                    <a>
                                                                        <i className="fa fa-user"></i>{" "}
                                                                        My Profile
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href={CONST.MATRI_ACCOUNT_PATH}
                                                                >
                                                                    <a>
                                                                        <i className="fa fa-cog"></i>{" "}
                                                                        Account Settings
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href={
                                                                        CONST.MATRI_ACC_CONTACT_PATH
                                                                    }
                                                                >
                                                                    <a>
                                                                        <i className="fa fa-sliders"></i>{" "}
                                                                        Contact
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href={
                                                                        CONST.MATRI_ACC_EMAIL_ALERT_PATH
                                                                    }
                                                                >
                                                                    <a>
                                                                        <i className="fa fa-envelope"></i>{" "}
                                                                        Email /SMS Alerts
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <Link
                                                                    href={
                                                                        CONST.MATRI_ACC_PRIVACY_PATH
                                                                    }
                                                                >
                                                                    <a>
                                                                        <i className="fa fa-lock"></i>{" "}
                                                                        Privacy Options
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <a href="#" onClick={handleLogout}>
                                                                    <i className="fa fa-power-off"></i>{" "}
                                                                    Logout
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Menu */}
                                <div className="mob-menu ">
                                    <div className="mob-me-ic mt-2 d-xl-none d-block">
                                        <span>
                                            <div class="bl_2 ">
                                                <ul>
                                                    {/* <li className="smenu-pare">
                                                        <span className="">
                                                            {authProfile?.prevContactViewPending ===
                                                                0 && (
                                                                <Fragment style={{ color: "#fff" }}>
                                                                    Update Plan
                                                                </Fragment>
                                                            )}
                                                            {authProfile?.prevContactViewPending !==
                                                                0 && (
                                                                <Fragment>Renew Plan</Fragment>
                                                            )}
                                                        </span>

                                                        <div className="smenu-open_2 smenu-single">
                                                            <ul>
                                                                <li>
                                                                    <label
                                                                        style={{
                                                                            whiteSpace: "normal",
                                                                        }}
                                                                    >
                                                                        Acc-Type :
                                                                        {authProfile?.subscription
                                                                            ? authProfile
                                                                                  ?.subscription
                                                                                  ?.planName
                                                                            : " ----- "}
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <label>
                                                                        Expires At:
                                                                        {authProfile?.subscription
                                                                            ?.expiresAt
                                                                            ? moment(
                                                                                  authProfile
                                                                                      ?.subscription
                                                                                      ?.expiresAt
                                                                              ).format("DD-MM-YYYY")
                                                                            : " ----- "}
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <Link href={"/plan-upgrade"}>
                                                                        <a>
                                                                            {" "}
                                                                            <FontAwesomeIcon
                                                                                width={20}
                                                                                icon={faCrown}
                                                                            />{" "}
                                                                            Upgrade Now
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </span>
                                        <span>
                                            <div className="bl_1 ">
                                                <ul>
                                                    <li className="smenu-pare">
                                                        <span className="">
                                                            {" "}
                                                            {authProfile && (
                                                                <ProfileSmallImage
                                                                    photos={authProfile?.photos}
                                                                    gender={
                                                                        authProfile?.basic?.gender
                                                                    }
                                                                    alt={`Profile picture of ${authProfile?.userName || "user"}`}
                                                                />
                                                            )}
                                                        </span>

                                                        <div className="smenu-open_1 smenu-single">
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={
                                                                            CONST.MATRI_PROFILE_PATH
                                                                        }
                                                                    >
                                                                        <a>My Profile</a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={
                                                                            CONST.MATRI_ACCOUNT_PATH
                                                                        }
                                                                    >
                                                                        <a>Account Settings</a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={
                                                                            CONST.MATRI_ACC_CONTACT_PATH
                                                                        }
                                                                    >
                                                                        <a>Contact</a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={
                                                                            CONST.MATRI_ACC_EMAIL_ALERT_PATH
                                                                        }
                                                                    >
                                                                        <a>Email /SMS Alerts</a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    {" "}
                                                                    <Link
                                                                        href={
                                                                            CONST.MATRI_ACC_PRIVACY_PATH
                                                                        }
                                                                    >
                                                                        <a>Privacy Options</a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={handleLogout}
                                                                    >
                                                                        Logout
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>

            </Fragment>
        </>
    );
};

const mapDispatchToProps = {
    logoutAction,
};

export default connect(null, mapDispatchToProps)(HeaderAfterLogin);
