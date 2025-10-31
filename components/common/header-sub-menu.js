import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { CONST } from "core/helper";
import { useSelector } from "react-redux";
import { profileService } from "core/services";
import Head from "next/head";

import dynamic from 'next/dynamic';

const SubHeaderAfterLogin = (props) => {
    const reload = useSelector((state) => state.common?.reloadAction);
    const myMatchesCount = useSelector((state) => state?.common?.myMatches);
    // console.log("myMatchesCount::", myMatchesCount);

    const router = useRouter();
    // const [profileData, setProfileData] = useState(null);
    const profileData = useSelector((state) => state?.account?.profileData);
    const [subMenu, setSubMenu] = useState([]);

    const getAuthProfile = async () => {
        const resp = await profileService.getProfile();
        if (resp && resp?.meta?.code === 200) {
            // setProfileData(resp?.data);
            // reloadAction(!reload);
            return resp.data;
        }
    };

    const subMenuObj = {
        "my-matrimony": [
            {
                label: "Dashboard",
                url: CONST.DASH_PATH,
            },
            {
                label: "My Profile",
                url: CONST.MATRI_PROFILE_PATH,
            },
            {
                label: "My Photos",
                url: CONST.MATRI_PHOTOS_PATH,
            },
            {
                label: "Partner Preferences",
                url: CONST.MATRI_PREFERENCE,
            },
            {
                label: "My Account",
                url: CONST.MATRI_ACCOUNT_PATH,
            },
            {
                label: "More ",
                hasSubMenu: true,
                icon: "fa fa-chevron-down",
                subMenu: [
                    {
                        label: "Contact Details",
                        url: CONST.MATRI_ACC_CONTACT_DET_PATH,
                    },
                    {
                        label: "My Orders",
                        url: CONST.ORDERS_PATH,
                    },
                    {
                        label: "Notifications",
                        url: CONST.INBOX_NOTIFICATION_PATH,
                    },
                ],
            },
        ],
        // "my-matrimony/my-account/contact-filter": [
        //     {
        //         url: CONST.MATRI_ACCOUNT_PATH,
        //     },
        // ],
        matches: [
            {
                label: "New Matches",
                url: CONST.MATCH_NEW_PATH,
                count:
                    CONST.MATCH_NEW_PATH === router.pathname
                        ? myMatchesCount?.newMatches === 0
                            ? null
                            : myMatchesCount?.newMatches
                        : profileData?.matchsCount?.newMatchsCount !== 0 &&
                        profileData?.matchsCount?.newMatchsCount,
            },
            {
                label: "Today Matches",
                url: CONST.MATCH_TODAY_PATH,
                count:
                    CONST.MATCH_TODAY_PATH === router.pathname
                        ? myMatchesCount?.todayMatches === 0
                            ? null
                            : myMatchesCount?.todayMatches
                        : profileData?.matchsCount?.todayMatchsCount !== 0 &&
                        profileData?.matchsCount?.todayMatchsCount,
            },
            {
                label: "My Matches",
                url: CONST.MATCH_MY_PATH,
                count:
                    CONST.MATCH_MY_PATH === router.pathname
                        ? myMatchesCount?.myMatches === 0
                            ? null
                            : myMatchesCount?.myMatches
                        : profileData?.matchsCount?.myMatchsCount !== 0 &&
                        profileData?.matchsCount?.myMatchsCount,
            },
            {
                label: "Near Me",
                url: CONST.MATCH_NEARBY_PATH,
                count:
                    CONST.MATCH_NEARBY_PATH === router.pathname
                        ? myMatchesCount?.nearByMatches === 0
                            ? null
                            : myMatchesCount?.nearByMatches
                        : profileData?.matchsCount?.nearbyMatchsCount !== 0 &&
                        profileData?.matchsCount?.nearbyMatchsCount,
            },
            {
                label: "Recent Visitors",
                url: CONST.MATCH_RECENTLY_VISITORS_PATH,
                count:
                    profileData?.matchsCount?.recentVisitorsCount !== 0 &&
                    profileData?.matchsCount?.recentVisitorsCount,
            },
            {
                label: "More Matches",
                url: CONST.MATCH_MORE_PATH,
            },
        ],
        search: [
            {
                label: "Basic",
                url: CONST.SEARCH_BASIC_PATH,
            },
            {
                label: "Advance",
                url: CONST.SEARCH_ADVANCE_PATH,
            },
        ],
        inbox: [
            {
                label: "Received",
                url: CONST.INBOX_RECEIVED_PATH,
            },
            {
                label: "Accepted",
                url: CONST.INBOX_ACCEPTED_PATH,
            },
            {
                label: "Requests",
                url: CONST.INBOX_REQUESTS_PATH,
            },
            {
                label: "Sent",
                url: CONST.INBOX_SENT_PATH,
            },
            {
                label: "Contacts",
                url: CONST.INBOX_CONTACTS_PATH,
            },
            {
                label: "Notifications",
                url: CONST.INBOX_NOTIFICATIONS_PATH,
            },
            // {
            //     label: "Expired",
            //     url: CONST.INBOX_EXPIRED_PATH
            // },
            // {
            //     label: "More",
            //     url: CONST.INBOX_MORE_PATH
            // },
        ],
    };

    useEffect(() => {
        router.events.on("routeChangeComplete", () => {
            window.scroll({
                top: 0,
                behavior: "smooth",
            });
        });
        const urlPath = router.pathname;
        const urlPathObj = urlPath.split("/");
        const [baseUrl, mainUrl, subMenuUrl = null] = urlPathObj;
        const menuList = subMenuObj[mainUrl];
        setSubMenu(menuList);
    }, [router, reload, profileData, myMatchesCount]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <span style={{ cursor: "pointer", fontSize: "16px" }} ref={ref} onClick={onClick}>
            {children}
            <i className="bi bi-chevron-down mx-1"></i>
        </span>
    ));

    useEffect(() => {
        // getAuthProfile();
    }, [reload]);

    // const [pathName, setPathName] = useState([]);
    // console.log("pathName::",pathName);
    // useEffect(() => {
    //     const { pathname } = router;
    //     const splitPath = pathname.split("/")
    //     setPathName(splitPath)
    // },[]);

    return (
        <>

            <Head>
        {/* Primary SEO */}
        <title>TrueFriend Matrimony | Best Christian Matrimony in India</title>
        <meta name="description" content=" The most trusted Christian Matrimony site in India, helping Christian brides and grooms find their life partner safely. Verified profiles, faith-based matchmaking, and personalized service." />
       
        <meta
        name="keywords"
        content="Christian Matrimony, Best Christian Matrimony India, Christian Marriage Platform, Christian Matchmaking India, Trusted Christian Matrimony Site, Verified Christian Matrimonial Service, Christian Life Partner Search, Bible-Based Matrimony, Faith-Based Matrimony, Christian Brides and Grooms"
    />
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
            {subMenu && (
                <div className="bg-cray-menu">
                    <Container>
                        <Row>
                            <Col md={12} className="text-center">
                                <ul className="dropdown-sub">
                                    {subMenu &&
                                        subMenu.map((ele, ind) => {
                                            const { hasSubMenu, url, label, count,icon } = ele;
                                            // console.log("url::", url);
                                            // const splitUrl = url?.split("/");
                                            // console.log("splitUrl::",splitUrl);
                                            // const urlEle = splitUrl?.find((ele) => ele)
                                            // console.log("urlEle::",urlEle);
                                            return (
                                                <li
                                                    className={`${
                                                        // pathName.find((ele) => ele === urlEle) ? " active" : ""
                                                        router.pathname === url ? " active" : ""
                                                        }`}
                                                    key={ind}
                                                >
                                                    {hasSubMenu === undefined ? (
                                                        <Link href={`${url}`}>
                                                            <a href={`${url}`}>
                                                                {label} {count && "(" + count + ")"}{" "}
                                                            </a>
                                                        </Link>
                                                    ) : (
                                                        <Dropdown className="header_sub_menu_dropdown">
                                                            <Dropdown.Toggle as={CustomToggle}>
                                                                {label}
                                                                {icon && <i className={icon}></i>}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {ele?.subMenu?.map(
                                                                    (subMenuEle, subInd) => (
                                                                        <Dropdown.Item className="p-0" key={subInd}>
                                                                            <Link
                                                                                key={subInd}
                                                                                href={
                                                                                    subMenuEle.url
                                                                                }
                                                                            >
                                                                                {subMenuEle.label}
                                                                            </Link>
                                                                        </Dropdown.Item>
                                                                    )
                                                                )}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    )}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </Fragment>
        </>
    );
};

export default SubHeaderAfterLogin;
// export default dynamic(() => Promise.resolve(SubHeaderAfterLogin), { ssr: false });
