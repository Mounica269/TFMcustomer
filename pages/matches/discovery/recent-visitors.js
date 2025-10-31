import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CONST, profileService, utils } from "core";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import Head from "next/head";


const RecentVisitors = () => {
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [recentVisitorsLists, setRecentVisitorsLists] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [selectedPage, setSelectedPage] = useState(0);
    const [respMsg, setRespMsg] = useState("");
    const [apiLoad, setApiLoad] = useState(false);

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
        if (filter) {
            const getRecentVisitors = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                setRecentVisitorsLists([]);
                utils.scrollToTop();
                const resp = await profileService.recentVisitors(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setRecentVisitorsLists(data);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1015) {
                    const { data, meta } = resp;
                    setRecentVisitorsLists(data);
                    setRespMsg(meta?.message);
                    setApiLoad(false);
                }
            };
            getRecentVisitors(filter);
        }
    }, [filter]);

    useEffect(() => {
        const getRecentVisitors = async (filter) => {
            const resp = await profileService.recentVisitors(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination, data } = resp;
                const { totalCount } = pagination;
                const { limit } = filter;
                const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                setTotalPage(page);
                setRecentVisitorsLists(data);
            }
        };
        getRecentVisitors(filter);
    }, [reload]);

    return (
        <>
         <Head>
    <title>Recent Visitors | True Friend Matrimony</title>
     <meta
        name="description"
        content="See who recently viewed your Christian matrimony profile on TrueFriend Matrimony, the trusted Christian matrimonial platform. Instantly connect with faith-aligned singles, explore interested members, and find your ideal life partner."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Recent Visitors, Profile Views History, Christian Matrimony Profile Visitors, Faith-Based Matchmaking, Christian Singles, TrueFriend Matrimony, Matrimonial Matches, Christian Marriage, Find Christian Life Partner, Trusted Matrimonial Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/recent-visitors" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Recent Visitors | True Friend Matrimony" />
    <meta
        property="og:description"
        content="See who recently viewed your Christian matrimony profile on True Friend Matrimony. Connect instantly with faith-aligned singles and explore interested members."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/recent-visitors" />


</Head>

            <section className="page-section-ptb4 pb-6">
                <Container className="justify-content-center">
                    <Row className="d-flex justify-content-center my-4">
                        <Col md={10}>
                            <div className="mb-2">
                                <h3>
                                    Recent Visitors
                                </h3>
                            </div>
                            {apiLoad && <h5 className="py-5 text-center">Loading</h5>}
                            {!apiLoad && recentVisitorsLists === null ? (
                                <h3 className="py-5 text-center">{respMsg}</h3>
                            ) : (
                                !apiLoad &&
                                recentVisitorsLists.map((ele, ind) => (
                                    <ProfileCard key={ind} profile={ele} />
                                ))
                            )}
                            <div className="d-flex justify-content-center">
                                {!apiLoad && recentVisitorsLists !== null && totalPage > 1 && (
                                    <Pagination
                                        initialPage={selectedPage}
                                        pageCount={totalPage}
                                        onPageChange={changePage}
                                    />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default RecentVisitors;
