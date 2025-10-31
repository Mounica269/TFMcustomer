import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { CONST, matchesCountAction, profileService, utils, nearMeMatchesDataAction } from "core";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import MatchFilter from "components/matchs/match-filter";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const NearByMatches = (props) => {
    const { matchesCountAction } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);
    const reloadMatches = useSelector((state) => state?.account?.reloadMatches);
    const nearMeMatchesData = useSelector((state) => state?.common?.nearMeMatchesList);
    let matches = (nearMeMatchesData?.data) ? nearMeMatchesData.data : [];
    // const [matches, setmatches] = useState([]);
    const [apiLoad, setApiLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [selectedPage, setSelectedPage] = useState(0);
    const [isDistanceRange] = useState(true);
    const [respMsg, setRespMsg] = useState("");
    const [resolution, setResolution] = useState({ width: 0, height: 0 });
    const [initialLoad, setInitialLoad] = useState(true);
    const router = useRouter();
    const myMatchesCount = useSelector((state) => state?.common?.myMatches);
    const profileData = useSelector((state) => state?.account?.profileData);

    const authProfile = useSelector((state) => state.account?.profile);

    const filterSubmit = (data) => {
        setFilter({
            ...filter,
            filter: data,
        });
    };

    useEffect(() => {
        if (filter) {
            const getNearByMatches = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                // setmatches([]);
                utils.scrollToTop();
                const resp = await profileService.nearbyMatches(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    props.nearMeMatchesDataAction(resp);
                    // setmatches(data);
                    matchesCountAction({
                        nearByMatches: totalCount,
                    });
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1008) {
                    const { meta, data } = resp;
                    props.nearMeMatchesDataAction(resp);
                    // setmatches(data);
                    setApiLoad(false);
                    setRespMsg(meta?.message);
                    matchesCountAction({
                        nearByMatches: 0,
                    });
                } else if (resp && resp.meta.code === 1029) {
                    const { meta, data } = resp;
                    props.nearMeMatchesDataAction(resp);
                    // setmatches(data);
                    setApiLoad(false);
                    setRespMsg(meta?.message);
                    matchesCountAction({
                        nearByMatches: 0,
                    });
                }
            };
            getNearByMatches(filter);
        }
    }, [filter]);

    useEffect(() => {
        if (reload && !initialLoad) {
            const getNearByMatches = async (filter) => {
                const resp = await profileService.nearbyMatches(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    props.nearMeMatchesDataAction(resp);
                    // setmatches(data);
                    matchesCountAction({
                        nearByMatches: totalCount,
                    });
                } else if (resp && resp.meta.code === 1008) {
                    const { meta, data } = resp;
                    props.nearMeMatchesDataAction(resp);
                    // setmatches(data);
                    setRespMsg(meta?.message);
                    // matchesCountAction({
                    //     nearByMatches: 0,
                    // });
                }
            };
            getNearByMatches(filter);
        }
        setInitialLoad(false);
    }, [reload, reloadMatches]);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    useEffect(() => {
        const updateWindowDimensions = () => {
            setResolution({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", updateWindowDimensions);

        // Call the function once initially to get the initial screen resolution
        updateWindowDimensions();

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    useEffect(() => {
        const skip = selectedPage >= 1 ? selectedPage * 10 : 0;
        setFilter({
            ...filter,
            skip,
        });
    }, [selectedPage]);

    return (
        <>

     <Head>
    <title> Near Me | True Friend Matrimony</title>


     <meta
        name="description"
        content="Find Christian matrimonial matches near you on TrueFriend Matrimony, the trusted Christian matchmaking platform. Connect with faith-aligned singles in your local area and start building meaningful Christian relationships today."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Near Me, Local Christian Matrimony Matches, Christian Singles Nearby, Find Christian Life Partner Locally, Faith-Based Matchmaking, TrueFriend Matrimony, Trusted Christian Matrimonial Service, Nearby Christian Partner Search, Christian Marriage Matches, Matrimonial Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/nearby-matches" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Christian Matrimony Near Me | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Find Christian matrimonial matches near you on True Friend Matrimony. Connect with faith-aligned singles in your local area and start building meaningful Christian relationships today."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/nearby-matches" />

 
</Head>



            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row>
                        <Col md={3} className="mb-2 order-2 order-md-1">
                            <MatchFilter
                                onFilterSubmit={filterSubmit}
                                isDistanceRange={isDistanceRange}
                                isLoading={apiLoad}
                                width={resolution.width}
                            />
                        </Col>
                        <Col md={9} className="order-1 order-md-2">
                            <h4>Near Me {CONST.MATCH_NEARBY_PATH === router.pathname
                                ? myMatchesCount?.nearByMatches > 0
                                    ? ` (${myMatchesCount?.nearByMatches})`
                                    : ""
                                : profileData?.matchsCount?.nearbyMatchsCount > 0
                                    ? ` (${profileData?.matchsCount?.nearbyMatchsCount})`
                                    : ""} </h4>
                            {!apiLoad && matches === null && (
                                <h3 className="text-center py-5">{respMsg}</h3>
                            )}
                            <Row className="mt-2">
                                <Col md={12}>
                                    {apiLoad && <h5>Loading</h5>}
                                    {!(apiLoad && filter?.skip !== 0) &&
                                        matches !== null &&
                                        matches.map((ele, ind) => (
                                            <ProfileCard key={ind} profile={ele} />
                                        ))}
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                {apiLoad ||
                                    (matches !== null && totalPage > 1 && (
                                        <Pagination
                                            initialPage={selectedPage}
                                            pageCount={totalPage}
                                            onPageChange={changePage}
                                        />
                                    ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    matchesCountAction,
    nearMeMatchesDataAction
};

export default connect(null, mapDispatchToProps)(NearByMatches);
