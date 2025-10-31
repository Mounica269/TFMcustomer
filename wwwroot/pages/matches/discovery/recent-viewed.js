import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import { CONST, profileService, reloadAction, utils } from "core";
import Head from "next/head";


const RecentViewed = (props) => {
    const { reloadAction } = props;
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [recentlyViewedLists, setRecentlyViewedLists] = useState([]);
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
            const recentlyViewedList = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                setRecentlyViewedLists([]);
                utils.scrollToTop();
                const resp = await profileService.recentViewed(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setRecentlyViewedLists(data);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1016) {
                    const { data, meta } = resp;
                    setRecentlyViewedLists(data);
                    setRespMsg(meta?.message);
                    setApiLoad(false);
                }
            };
            recentlyViewedList(filter);
        }
    }, [filter]);

    useEffect(() => {
        const recentlyViewedList = async (filter) => {
            const resp = await profileService.recentViewed(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination, data } = resp;
                const { totalCount } = pagination;
                const { limit } = filter;
                const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                setTotalPage(page);
                setRecentlyViewedLists(data);
            } else if (resp && resp.meta.code === 1016) {
                const { data, meta } = resp;
                setRecentlyViewedLists(data);
                setRespMsg(meta?.message);
            }
        };
        recentlyViewedList(filter);
    }, [reload]);

    return (
        <>
        <Head>
    <title>Recently Viewed Profiles | True Friend Matrimony</title>
  <meta
        name="description"
        content="Easily revisit your recently viewed Christian matrimony profiles on TrueFriend Matrimony, the trusted Christian matrimonial platform. Reconnect with faith-aligned singles, explore trusted profiles, and accelerate your journey to find your perfect life partner."
    />
    <meta
        name="keywords"
        content="Recently Viewed Christian Matrimony Profiles,Christian Matrimony, Christian Matrimony History, Revisit Christian Profiles, Faith-Based Matchmaking, Trusted Matrimonial Platform, Christian Singles, Christian Marriage, Find Christian Life Partner, Matchmaking Services, TrueFriend Matrimony"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/recent-visitors" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Recently Viewed Christian Profiles | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Easily revisit your recently viewed Christian matrimony profiles on True Friend Matrimony. Reconnect with faith-aligned singles and find your ideal life partner."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/recent-visitors" />

</Head>


            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={9}>
                            <div className="mb-2">
                                <h3>
                                    <u>Recently Viewed</u>
                                </h3>
                            </div>
                            {apiLoad && <h3 className="py-5 text-center">Loading</h3>}
                            {!apiLoad && recentlyViewedLists === null ? (
                                <h3 className="py-5 text-center">{respMsg}</h3>
                            ) : (
                                !apiLoad &&
                                recentlyViewedLists.map((ele, ind) => (
                                    <ProfileCard key={ind} profile={ele} />
                                ))
                            )}
                            <div className="d-flex justify-content-center">
                                {apiLoad ||
                                    (recentlyViewedLists !== null && totalPage > 1 && (
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
    reloadAction,
};
export default connect(null, mapDispatchToProps)(RecentViewed);
