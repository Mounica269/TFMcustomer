import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CONST, profileService } from "core";
import ProfileVerticalView from "components/common/profile-vertical-view";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation } from 'swiper/modules';
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const Discovery = () => {
    const authProfile = useSelector((state) => state.account?.profile);

    const token = useSelector((state) => state.account?.tokenAction);
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter] = useState({ ...CONST.DEFAULT_FILTER });
    const [blockedProfiles, setBlockedProfiles] = useState([]);
    const [dontShowProfiles, setDontShowProfiles] = useState([]);
    const [recentViewed, setRecentViewed] = useState([]);
    const [recentViewRespMsg, setRecentViewRespMsg] = useState("");
    const [ignoreRespMsg, setIgnoreRespMsg] = useState("");
    const [blockRespMsg, setBlockRespMsg] = useState("");
    const [recentlyViewedLoad, setRecentViewLoad] = useState(false);
    const [ignoreProfileLoad, setIgnoreProfileLoad] = useState(false);
    const [blockProfilesLoad, setBlockProfilesLoad] = useState(false);
    const [initialLoadRecentlyViewed, setInitialLoadRecentlyViewed] = useState(true);
    const [initialLoadIgnoredMembers, setInitialLoadIgnoredMembers] = useState(true);
    const [initialLoadBlockedMembers, setInitialLoadBlockedMembers] = useState(true);

    useEffect(() => {
        if (token || filter) {
            const fetchData = async () => {
                setRecentViewLoad(true);
                const respRecentViewed = await profileService.recentViewed(filter);
                if (respRecentViewed && respRecentViewed.meta.code === 200) {
                    setRecentViewed(respRecentViewed.data);
                } else {
                    setRecentViewRespMsg(respRecentViewed?.meta?.message);
                }
                setRecentViewLoad(false);

                setIgnoreProfileLoad(true);
                const respIgnoredProfiles = await profileService.dontShowProfileList(filter);
                if (respIgnoredProfiles && respIgnoredProfiles.meta.code === 200) {
                    setDontShowProfiles(respIgnoredProfiles.data);
                } else {
                    setIgnoreRespMsg(respIgnoredProfiles?.meta?.message);
                }
                setIgnoreProfileLoad(false);

                setBlockProfilesLoad(true);
                const respBlockedProfiles = await profileService.getBlockedProfilesList(filter);
                if (respBlockedProfiles && respBlockedProfiles.meta.code === 200) {
                    setBlockedProfiles(respBlockedProfiles.data);
                } else {
                    setBlockRespMsg(respBlockedProfiles?.meta?.message);
                }
                setBlockProfilesLoad(false);
            };

            fetchData();
        }
    }, [token, filter]);

    useEffect(() => {
        if (!initialLoadRecentlyViewed) {
            (async () => {
                const resp = await profileService.recentViewed(filter);
                if (resp && resp.meta.code === 200) {
                    setRecentViewed(resp.data);
                }
            })();
        } else {
            setInitialLoadRecentlyViewed(false);
        }
    }, [reload]);

    useEffect(() => {
        if (!initialLoadIgnoredMembers) {
            (async () => {
                const resp = await profileService.dontShowProfileList(filter);
                if (resp && resp.meta.code === 200) {
                    setDontShowProfiles(resp.data);
                }
            })();
        } else {
            setInitialLoadIgnoredMembers(false);
        }
    }, [reload]);

    useEffect(() => {
        if (!initialLoadBlockedMembers) {
            (async () => {
                const resp = await profileService.getBlockedProfilesList(filter);
                if (resp && resp.meta.code === 200) {
                    setBlockedProfiles(resp.data);
                }
            })();
        } else {
            setInitialLoadBlockedMembers(false);
        }
    }, [reload]);

    return (
        <>

   <Head>
    <title>
        More Matches | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
    </title>
    <meta
        name="description"
        content="Explore more potential Christian matches on TrueFriend Matrimony, the trusted Christian matrimony platform. Connect with faith-aligned singles, discover ideal life partners, and build meaningful relationships rooted in Christian values."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Matches, Faith-Based Matchmaking, Christian Singles, Christian Marriage, Christian Life Partner, Find Christian Partner, Christian Matchmaking Services, TrueFriend Matrimony, Trusted Matrimony Platform, Matrimonial Services, Matchmaking Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/discovery" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="More Matches | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Explore more potential Christian matches on True Friend Matrimony. Connect with faith-aligned singles and find your ideal life partner."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/discovery" />

</Head>



            <Container>
                <Row className="d-flex justify-content-center">
                    <Col md={12}>
                        <section className="page-section-ptb4  story-slider">
                            <div className="profi-pg profi-ban">
                                <div className="profi-pg profi-bio">
                                    <div className="rhs">
                                        <div className="slid-inn pr-bio-c wedd-rel-pro">
                                            <div className="d-flex justify-content-between">
                                                <h3>Recently Viewed Members</h3>
                                                {recentViewed !== null && recentViewed.length > 4 && (
                                                    <Link href={CONST.RECENT_VIEWED}>See All</Link>
                                                )}
                                            </div>
                                            {recentlyViewedLoad && <h3 className="py-5 text-center">Loading</h3>}
                                            {!recentlyViewedLoad && recentViewed.length < 1 && (
                                                <h3 className="text-center py-5">{recentViewRespMsg}</h3>
                                            )}
                                            {!recentlyViewedLoad && recentViewed.length < 4 ? (
                                                <Row>
                                                    {recentViewed.map((ele, ind) => (
                                                        <Col md={3} key={ind}>
                                                            <ProfileVerticalView profile={ele} />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            ) : (
                                                <Swiper
                                                    modules={[Navigation]}
                                                    spaceBetween={20}
                                                    // slidesPerView={4}
                                                    navigation
                                                    breakpoints={{
                                                        1024: { slidesPerView: 4 },
                                                        600: { slidesPerView: 2 },
                                                        480: { slidesPerView: 1 },
                                                    }}
                                                >
                                                    {recentViewed.map((ele, ind) => (
                                                        <SwiperSlide key={ind}>
                                                            <ProfileVerticalView profile={ele} />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Ignored Members Section */}

                            <div className="profi-pg profi-ban">

                                <div className="profi-pg profi-bio">
                                    <div className="rhs">
                                        <div className="slid-inn pr-bio-c wedd-rel-pro">

                                            <div className="d-flex justify-content-between">
                                                <h3>Ignored Members</h3>
                                                {dontShowProfiles.length > 4 && (
                                                    <Link href={CONST.DONT_SHOW_PROFILE_PATH}>See All</Link>
                                                )}
                                            </div>
                                            {ignoreProfileLoad && <h3 className="py-5 text-center">Loading</h3>}
                                            {!ignoreProfileLoad && dontShowProfiles.length < 1 && (
                                                <h3 className="py-5 text-center">{ignoreRespMsg}</h3>
                                            )}
                                            {!ignoreProfileLoad && dontShowProfiles.length < 4 ? (
                                                <Row>
                                                    {dontShowProfiles.map((ele, ind) => (
                                                        <Col md={3} key={ind}>
                                                            <ProfileVerticalView profile={ele} />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            ) : (
                                                <Swiper
                                                    modules={[Navigation]}
                                                    spaceBetween={20}
                                                    // slidesPerView={4}
                                                    navigation
                                                    breakpoints={{
                                                        1024: { slidesPerView: 4 },
                                                        600: { slidesPerView: 2 },
                                                        480: { slidesPerView: 1 },
                                                    }}
                                                >
                                                    {dontShowProfiles.map((ele, ind) => (
                                                        <SwiperSlide key={ind}>
                                                            <ProfileVerticalView profile={ele} />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>





                            {/* Blocked Members Section */}


                            <div className="profi-pg profi-bio">
                                <div className="rhs">
                                    <div className="slid-inn pr-bio-c wedd-rel-pro">
                                        <div className="d-flex justify-content-between">
                                            <h3>Blocked Members</h3>
                                            {blockedProfiles.length > 4 && (
                                                <Link href={CONST.BLOCKED_PROFILE_PATH}>See All</Link>
                                            )}
                                        </div>
                                        {blockProfilesLoad && <h3 className="py-5 text-center">Loading</h3>}
                                        {!blockProfilesLoad && blockedProfiles.length < 1 && (
                                            <h3 className="py-5 text-center">{blockRespMsg}</h3>
                                        )}
                                        {!blockProfilesLoad && blockedProfiles.length < 4 ? (
                                            <Row>
                                                {blockedProfiles.map((ele, ind) => (
                                                    <Col md={3} key={ind}>
                                                        <ProfileVerticalView profile={ele} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : (
                                            <Swiper
                                                modules={[Navigation]}
                                                spaceBetween={20}
                                                // slidesPerView={4}
                                                navigation
                                                breakpoints={{
                                                    1024: { slidesPerView: 4 },
                                                    600: { slidesPerView: 2 },
                                                    480: { slidesPerView: 1 },
                                                }}
                                            >
                                                {blockedProfiles.map((ele, ind) => (
                                                    <SwiperSlide key={ind}>
                                                        <ProfileVerticalView profile={ele} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        )}
                                    </div>
                                </div>
                            </div>



                        </section>


                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Discovery;
