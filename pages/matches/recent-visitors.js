import React, { useEffect, useState, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector, connect } from "react-redux";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { CONST, profileService, premiumMatchesDataAction, recentVisitorsDataAction } from "core";
import ProfileVerticalView from "components/common/profile-vertical-view";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const RecentlyViewed = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);
    const profileData = useSelector((state) => state?.account?.profileData);

    const token = useSelector((state) => state.account?.tokenAction);
    const reload = useSelector((state) => state?.common?.reloadAction);
    const premiumMembers = useSelector((state) => state.common?.premimumMatches);
    const recentVisitors = useSelector((state) => state.common?.recentVisitorsList);

    const [filter] = useState({ ...CONST.DEFAULT_FILTER });
    const [resMsg, setRespMsg] = useState("");
    const [premiumRespMsg, setPremiumRespMsg] = useState("");
    const [recentVisitorsLoad, setRecentVistorsLoad] = useState(false);
    const [premiumMembersLoad, setPremiumMembersLoad] = useState(false);
    const [initialLoadRecentVisitors, setInitialLoadRecentVisitors] = useState(true);
    const [initialLoadPremiumMembers, setInitialLoadPremiumMembers] = useState(true);

    const [resolution, setResolution] = useState({ width: 0, height: 0 });


    useEffect(() => {
        const updateWindowDimensions = () => {
            setResolution({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", updateWindowDimensions);
        updateWindowDimensions();

        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);
    useEffect(() => {
        if (token || filter) {
            async function getRecentVisitors(filter) {
                setRecentVistorsLoad(true);
                const resp = await profileService.recentVisitors(filter);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    props.recentVisitorsDataAction(data);
                    setRecentVistorsLoad(false);
                } else if (resp && resp.meta.code === 1015) {
                    props.recentVisitorsDataAction(resp.data);
                    setRespMsg(resp.meta?.message);
                    setRecentVistorsLoad(false);
                }
            }

            async function getPremiumMembers(filterObj) {
                setPremiumMembersLoad(true);
                const resp = await profileService.premiumMembers(filterObj);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    props.premiumMatchesDataAction(resp.data);
                    setPremiumMembersLoad(false);
                } else if (resp && resp.meta.code === 1015) {
                    props.premiumMatchesDataAction(resp.data);
                    setPremiumRespMsg(resp?.data);
                    setPremiumMembersLoad(false);
                }
            }

            getRecentVisitors(filter);
            getPremiumMembers(filter);
        }
    }, [token, filter]);

    useEffect(() => {
        async function getRecentVisitors(filter) {
            const resp = await profileService.recentVisitors(filter);
            if (resp && resp.meta.code === 200) {
                const { data } = resp;
                props.recentVisitorsDataAction(data);
            }
        }
        if (!initialLoadRecentVisitors) getRecentVisitors(filter);
        else setInitialLoadRecentVisitors(false);
    }, [reload]);

    useEffect(() => {
        if (reload) {
            async function getPremiumMembers(filterObj) {
                const resp = await profileService.premiumMembers(filterObj);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    props.premiumMatchesDataAction(resp.data);
                }
            }
            if (!initialLoadPremiumMembers) getPremiumMembers(filter);
            else setInitialLoadPremiumMembers(false);
        }
    }, [reload]);

    const getRecentVisitors = (recentVisitors) => {
        return (
            <Row>
                <Col md={12}>
                    {recentVisitors !== null && recentVisitors.length < 5 ? (
                        <Fragment>
                            {recentVisitors.map((ele, ind) => (
                                <Col md={3} key={ind}>
                                    <ProfileVerticalView profile={ele} />
                                </Col>
                            ))}
                        </Fragment>
                    ) : (
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={resolution.width < 768 ? 1 : 4}
                            navigation={{
                                prevEl: ".swiper-button-prev",
                                nextEl: ".swiper-button-next",
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 2,
                                },
                                600: {
                                    slidesPerView: 1,
                                },
                                480: {
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            {recentVisitors.map((ele, ind) => (
                                <SwiperSlide key={ind}>
                                    <ProfileVerticalView profile={ele} />
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-prev">{""}</div>
                            <div className="swiper-button-next">{""}</div>
                        </Swiper>
                    )}
                </Col>
            </Row>
        );
    };

    const getPremiumVisitors = (premiumMembers) => {
        return (
            <Row>
                <Col md={12}>
                    {premiumMembers?.length < 4 ? (
                        <>
                            {premiumMembers.map((ele, ind) => (
                                <Col md={3} key={ind}>
                                    <ProfileVerticalView profile={ele} />
                                </Col>
                            ))}
                        </>
                    ) : (
                        <Swiper
                            modules={[Navigation]} // Enable Navigation module
                            spaceBetween={20}
                            slidesPerView={resolution.width < 768 ? 1 : 4}
                            navigation={{
                                prevEl: ".swiper-button-prev",
                                nextEl: ".swiper-button-next",
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4,
                                },
                                992: {
                                    slidesPerView: 3,
                                },
                                769: {
                                    slidesPerView: 3,
                                },
                                600: {
                                    slidesPerView: 2,
                                },
                                480: {
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            {premiumMembers.map((ele, ind) => (
                                <SwiperSlide key={ind} style={{ marginTop: "10px" }}>
                                    <ProfileVerticalView profile={ele} />
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                            {/* <div className="swiper-button-prev">{"<"}</div>
                            <div className="swiper-button-next">{">"}</div> */}
                        </Swiper>
                    )}
                </Col>
            </Row>
        );
    };

    return (
        <>
        
         <Head>
    <title>Recent Visitors | True Friend Matrimony</title>


    <meta
        name="description"
        content="Discover who recently viewed your Christian matrimony profile on TrueFriend Matrimony, the trusted Christian matchmaking platform. Connect instantly with faith-aligned singles interested in you and explore meaningful relationships today."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Recent Visitors, Christian Profile Views, Recent Matrimonial Visitors, Christian Matchmaking, Find Christian Life Partner, TrueFriend Matrimony, Trusted Christian Matrimonial Platform, Faith-Based Matchmaking, Christian Singles, Profile Visitor History"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/recent-visitors" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Recent Christian Matrimony Visitors | True Friend Matrimony" />
    <meta
        property="og:description"
        content="See who recently viewed your Christian matrimony profile on True Friend Matrimony. Connect with faith-aligned singles interested in you and explore meaningful relationships today."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/recent-visitors" />

</Head>


            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="">

                        <div className="d-flex justify-content-between">

                            <h3>Recent Visitors   {profileData?.matchsCount?.recentVisitorsCount > 0
                                ? ` (${profileData?.matchsCount?.recentVisitorsCount})`
                                : ""}</h3>
                            {recentVisitors !== null &&
                                recentVisitors.length > 4 && (
                                    <Link href={CONST.RECENT_VISITORS}>
                                        See All
                                    </Link>
                                )}
                        </div>
                        {recentVisitorsLoad && (
                            <h3 className="text-center py-3">Loading</h3>
                        )}
                        {!recentVisitorsLoad && recentVisitors === null && (
                            <h5 className="text-center py-3">{resMsg}</h5>
                        )}
                        {!recentVisitorsLoad && recentVisitors !== null && (
                            <Col md={12}>
                                {recentVisitors?.length < 0 ? (
                                    <>
                                        {recentVisitors.map((ele, ind) => (
                                            <Col md={3} key={ind}>
                                                <ProfileVerticalView
                                                    profile={ele}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                ) : (
                                    <Swiper
                                        modules={[Navigation]} // Enable Navigation module
                                        spaceBetween={20}
                                        // slidesPerView={4}
                                        navigation={{
                                            prevEl: ".swiper-button-prev",
                                            nextEl: ".swiper-button-next",
                                        }}
                                        breakpoints={{
                                            1024: {
                                                slidesPerView: 4,
                                            },
                                            992: {
                                                slidesPerView: 3,
                                            },
                                            769: {
                                                slidesPerView: 3,
                                            },
                                            600: {
                                                slidesPerView: 2,
                                            },
                                            480: {
                                                slidesPerView: 1,
                                            },
                                        }}
                                    >
                                        {recentVisitors.map((ele, ind) => (
                                            <SwiperSlide
                                                key={ind}
                                                style={{ marginTop: "10px" }}
                                            >
                                                <ProfileVerticalView
                                                    profile={ele}
                                                />
                                            </SwiperSlide>
                                        ))}
                                        <div className="swiper-button-prev"></div>
                                        <div className="swiper-button-next"></div>

                                        {/* <div className="swiper-button-prev">{"<"}</div>
                            <div className="swiper-button-next">{">"}</div> */}
                                    </Swiper>
                                )}
                            </Col>
                        )}

                    </Row>

                    <Row className="">

                        <div className="d-flex justify-content-between">
                            <h3>Premium Members</h3>
                            {premiumMembers.length > 4 && (
                                <Link href={CONST.PREMIUM_MEMBERS_LISTS}>
                                    See All
                                </Link>
                            )}
                        </div>
                        {premiumMembersLoad && (
                            <h3 className="text-center py-3">Loading</h3>
                        )}
                        {!premiumMembersLoad && premiumMembers === null && (
                            <h5 className="text-center py-3">{premiumRespMsg}</h5>
                        )}
                        {!premiumMembersLoad && getPremiumVisitors(premiumMembers)}

                    </Row>
                </Container>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    premiumMatchesDataAction,
    recentVisitorsDataAction,
};

export default connect(null, mapDispatchToProps)(RecentlyViewed);
