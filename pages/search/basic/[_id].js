import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { profileService } from "core/services";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CONST, reloadAction, utils } from "core";
import Head from "next/head";

const filterOpt = {
    skip: 0,
    limit: 10,
};

const SearchMatches = (props) => {
    const { reloadAction } = props;
    const reloadCommon = useSelector((state) => state.common?.reloadAction);

    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [reload, setReload] = useState(null);
    const [selectedPage, setSelectedPage] = useState(0);
    const [searchMatches, setSearchMatches] = useState([]);
    const [apiLoad, setApiLoad] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const filterSubmit = async (data) => {
        setFilter({
            ...filter,
            filter: data,
        });
    };

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const router = useRouter();
    const { _id } = router.query;

    useEffect(() => {
        if (filter && _id) {
            async function getMyMatches(_id, filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                setSearchMatches([]);
                utils.scrollToTop();
                const resp = await profileService.getSearchMatches(_id, filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setSearchMatches(data);
                    setReload(false);
                    setApiLoad(false);
                    reloadAction(true);
                } else {
                    setApiLoad(false);
                }
            }
            getMyMatches(_id, filter);
        }
    }, [filter, _id]);

    useEffect(() => {
        if (filter && _id) {
            async function getMyMatches(_id, filter) {
                const resp = await profileService.getSearchMatches(_id, filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setSearchMatches(data);
                }
            }

            if (!initialLoad)
                getMyMatches(_id, filter);
            else
                setInitialLoad(false);
        }
    }, [reloadCommon, _id, filter]);

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
    <title>Search Matches | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Find compatible Christian profiles using advanced filters on True Friend Matrimony. Connect with faith-centered singles and discover ideal matches for meaningful, lasting relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Christian Matchmaking, Advanced Search, Faith-Based Matches, Partner Preferences, True Friend Matrimony, Find Christian Matches, Christian Singles, Marriage, Trusted Christian Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/search/basic" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Search Matches | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Use advanced filters on True Friend Matrimony to find faith-aligned Christian profiles. Connect with ideal matches and build meaningful relationships within the Christian community."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/search/basic" />


</Head>

            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Col md={9}>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Row className="mt-3">
                                        <Col md={12}>
                                            {apiLoad && <h5>Loading</h5>}
                                            {!apiLoad &&
                                                (searchMatches.length === 0 ? (
                                                    <h3 className="text-center py-5">
                                                        {"No meet to your search qualification "}
                                                    </h3>
                                                ) : (
                                                    searchMatches.map((ele, ind) => {
                                                        return <ProfileCard key={ind} profile={ele} />;
                                                    })
                                                ))}
                                        </Col>
                                        <div className="d-flex justify-content-center">
                                            {apiLoad ||
                                                (totalPage > 1 && (
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

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMatches);
