import React, { useEffect, useState, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { CONST, profileService, reloadAction, utils, matchesCountAction } from "core";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import MatchFilter from "components/matchs/match-filter";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";
import { useRouter } from "next/router";


const NewMatches = (props) => {

    const authProfile = useSelector((state) => state.account?.profile);

    const router = useRouter();
    const myMatchesCount = useSelector((state) => state?.common?.myMatches);
    const profileData = useSelector((state) => state?.account?.profileData);

    const { matchesCountAction } = props;
    const reload = useSelector((state) => state.common?.reloadAction);
    const reloadMatches = useSelector((state) => state?.account?.reloadMatches);

    const [newMatches, setNewmatches] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [apiLoad, setApiLoad] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    const [respMsg, setRespMsg] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);
    const [resolution, setResolution] = useState({ width: 0, height: 0 });

    console.log("resolution::", resolution);

    useEffect(() => {
        if (filter) {
            async function getNewMatches(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                const resp = await profileService.newMatches(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setNewmatches(data);
                    setApiLoad(false);
                    matchesCountAction({
                        newMatches: totalCount,
                    });
                }
                if (resp && resp.meta.code === 1006) {
                    const { data, meta } = resp;
                    setNewmatches(data);
                    setRespMsg(meta?.message);
                    setApiLoad(false);
                    matchesCountAction({
                        newMatches: 0,
                    });
                }
            }
            getNewMatches(filter);
        }
    }, [filter]);

    useEffect(() => {
        async function getNewMatches(filter) {
            const resp = await profileService.newMatches(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination, data } = resp;
                const { totalCount } = pagination;
                const { limit } = filter;
                const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                setTotalPage(page);
                setNewmatches(data);
                matchesCountAction({
                    newMatches: totalCount,
                });
            }
        }
        if (!initialLoad)
            getNewMatches(filter);
        else
            setInitialLoad(false);
    }, [reload, reloadMatches]);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const filterSubmit = (data) => {
        setFilter({
            ...filter,
            filter: data,
        });
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

        // Call the function once initially to get the initial screen resolution
        updateWindowDimensions();

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    return (
        <>
          <Head>
    <title>New Matches | True Friend Matrimony</title>


   <meta
        name="description"
        content="Discover new Christian matrimonial matches on TrueFriend Matrimony, the trusted Christian matchmaking platform. Connect with compatible, faith-centered singles and start building meaningful relationships aligned with your Christian values."
    />
    <meta
        name="keywords"
        content="New Christian Matrimony Matches, Christian Matrimony, Faith-Based Matchmaking, Christian Singles, Find Christian Life Partner, TrueFriend Matrimony, Ideal Christian Match, Trusted Matrimonial Platform, Christian Marriage Matches, Christian Matchmaking Services"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/new-matches" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="New Christian Matrimony Matches | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Discover new Christian matrimonial matches on True Friend Matrimony. Connect with compatible, faith-centered singles and begin meaningful relationships aligned with your Christian values today."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/new-matches" />

</Head>


            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row>
                        <Col md={3} className="mb-2 order-2 order-md-1">
                            <MatchFilter
                                width={resolution.width}
                                isLoading={apiLoad}
                                onFilterSubmit={filterSubmit}
                            />
                        </Col>

                        <Col md={9} className="order-1 order-md-2">
                            <h3>New Matches {(CONST.MATCH_NEW_PATH === router.pathname
                                ? myMatchesCount?.newMatches
                                : profileData?.matchsCount?.newMatchsCount) > 0
                                ? ` (${CONST.MATCH_NEW_PATH === router.pathname
                                    ? myMatchesCount?.newMatches
                                    : profileData?.matchsCount?.newMatchsCount})`
                                : null}</h3>

                            <Row className="mt-1 pt-1">
                                <Col md={12}>

                                    {!apiLoad && newMatches === null && (
                                        <h3 className="text-center py-5">{respMsg}</h3>
                                    )}
                                    {apiLoad && <h5>Loading</h5>}
                                    {!apiLoad &&
                                        newMatches !== null &&
                                        newMatches.map((ele, ind) => {
                                            return <ProfileCard key={ind} profile={ele} />;
                                        })}
                                </Col>
                                <div className="d-flex justify-content-center">
                                    {apiLoad ||
                                        (newMatches !== null && totalPage > 1 && (
                                            <Pagination
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
    matchesCountAction,
};

export default connect(null, mapDispatchToProps)(NewMatches);
// https://codesandbox.io/s/country-state-city-selection-ui-forked-zq4zjc?file=/src/App.js:1169-1191
