import 'swiper/swiper-bundle.css';
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { connect, useSelector } from "react-redux";
import { CONST, matchesCountAction, profileService, reloadAction, utils, myMatchesDataAction } from "core";
import PaginationComponent from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import ProfileVerticalView from "components/common/profile-vertical-view";
import MatchFilter from "components/matchs/match-filter";
import { useRouter } from "next/router";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";



const MyMatches = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const router = useRouter();
    const myMatchesCount = useSelector((state) => state?.common?.myMatches);
    const profileData = useSelector((state) => state?.account?.profileData);

    const { matchesCountAction, myMatchesDataAction } = props;
    const reload = useSelector((state) => state.common?.reloadAction);
    const reloadMatches = useSelector((state) => state?.account?.reloadMatches);
    const myMatchesData = useSelector((state) => state.common?.myMatchesList);
    let myMatches = (myMatchesData?.data) ? myMatchesData.data : [];

    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [apiLoad, setApiLoad] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    const [respMsg, setRespMsg] = useState("");
    const [resolution, setResolution] = useState({ width: 0, height: 0 });
    const [initialLoad, setInitialLoad] = useState(true);


    const filterSubmit = async (data) => {
        setFilter({
            ...filter,
            filter: data,
        });
    };

    useEffect(() => {
        if (filter) {
            async function getMyMatches(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                const resp = await profileService.myMatches(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data, meta } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    myMatchesDataAction(resp);
                    setTotalPage(Math.ceil(totalPage));
                    setApiLoad(false);
                    setRespMsg(meta?.message);
                    matchesCountAction({
                        myMatches: totalCount,
                    });
                }
                if (resp && resp.meta.code === 1007) {
                    setRespMsg(resp.meta?.message);
                    setApiLoad(false);
                    matchesCountAction({
                        myMatches: 0,
                    });
                }
            }
            getMyMatches(filter);
        }
    }, [filter]);

    useEffect(() => {
        async function getMyMatches(filter) {
            const resp = await profileService.myMatches(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination } = resp;
                const { totalCount } = pagination;
                const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                setTotalPage(Math.ceil(totalPage));
                myMatchesDataAction(resp);
                matchesCountAction({
                    myMatches: totalCount,
                });
            } else if (resp && resp.meta.code === 1007) {
                setRespMsg(resp.meta?.message);
            }
        }
        if (!initialLoad) {
            getMyMatches(filter);
        } else {
            setInitialLoad(false);
        }
    }, [reload, reloadMatches]);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    useEffect(() => {
        const skip = selectedPage >= 1 ? selectedPage * 10 : 0;
        setFilter({
            ...filter,
            skip,
        });
    }, [selectedPage]);

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

    return (
        <>
        <Head>
    <title>My Matches | True Friend Matrimony</title>

   <meta
        name="description"
        content="Discover personalized Christian matrimonial matches on TrueFriend Matrimony, the trusted Christian matchmaking platform. Connect with faith-aligned singles, find compatible partners, and start your journey toward a meaningful Christian marriage."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Matches, Personalized Christian Matches, Christian Matchmaking Platform, Find Christian Life Partner, Faith-Based Matrimony, Christian Singles, TrueFriend Matrimony, Trusted Christian Matrimonial Services, Ideal Christian Match, Religious Matrimony, Matrimonial Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/my-matches" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="My Matches | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Discover your personalized Christian matrimonial matches on True Friend Matrimony. Connect with faith-aligned singles and start your journey towards a meaningful Christian marriage."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/my-matches" />

</Head>


            <section className="page-section-ptb4 pb-6 story-slider my_matches_profile_vertical_view">
                <Container>
                    <Row>
                        <Col xl={3} lg={3} md={4} sm={12} className="mb-2 order-2 order-md-1">
                            <MatchFilter
                                width={resolution.width}
                                isLoading={apiLoad}
                                onFilterSubmit={filterSubmit}
                            />
                        </Col>
                        <Col xl={9} lg={9} md={8} sm={12} className="order-1 order-md-2">
                            <h4>My Matches   {CONST.MATCH_MY_PATH === router.pathname
                                ? myMatchesCount?.myMatches > 0
                                    ? ` (${myMatchesCount?.myMatches})`
                                    : ""
                                : profileData?.matchsCount?.myMatchsCount > 0
                                    ? ` (${profileData?.matchsCount?.myMatchsCount})`
                                    : ""}</h4>
                            {!(apiLoad && filter?.skip !== 0) && myMatches?.length > 0 && (
                                <Row className="mt-2">
                                    <Col md={12}>
                                        <Swiper
                                            modules={[Pagination, Navigation]} // Include both modules here
                                            spaceBetween={20}
                                            // slidesPerView={4} // Responsive slides
                                            navigation
                                            // pagination={{ clickable: true }}
                                            breakpoints={{
                                                1024: { slidesPerView: 3 },
                                                600: { slidesPerView: 2 },
                                                480: { slidesPerView: 1 },
                                                380: { slidesPerView: 1 },
                                            }}
                                        >
                                            {myMatches.map((match, index) => (
                                                <SwiperSlide key={index}>
                                                    <ProfileVerticalView profile={match} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Col>
                                </Row>
                            )}
                            {!apiLoad && myMatches === null && (
                                <div className="d-flex py-5 justify-content-center align-items-center">
                                    <h3 className="text-center">{respMsg} </h3>
                                    <Link href={CONST.MATRI_PREFERENCE}>
                                        <a className="mt-1 mx-1 fs-5" href="#">
                                            Edit
                                        </a>
                                    </Link>
                                </div>
                            )}
                            <Row className="mt-3">
                                <Col md={12}>
                                    {apiLoad && <h5>Loading</h5>}
                                    {!(apiLoad && filter?.skip !== 0) &&
                                        myMatches !== null &&
                                        myMatches.map((ele, ind) => (
                                            <ProfileCard key={ind} profile={ele} />
                                        ))}
                                </Col>
                                <div className="d-flex justify-content-center">
                                    {apiLoad ||
                                        (myMatches !== null && totalPage > 1 && (
                                            <PaginationComponent
                                                initialPage={selectedPage}
                                                disableInitialCallback={true}
                                                pageCount={totalPage}
                                                onPageChange={changePage}
                                            />
                                        ))}
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    reloadAction,
    matchesCountAction,
    myMatchesDataAction,
};

export default connect(null, mapDispatchToProps)(MyMatches);
