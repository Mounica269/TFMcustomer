import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { profileService } from "core/services";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
// import MatchFilter from "components/matchs/match-filter";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CONST, reloadAction, utils } from "core";
import Head from "next/head";



const AdvanceSearchMatches = (props) => {
    const { reloadAction } = props;
    const reloadCommon = useSelector((state) => state.common?.reloadAction);

    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [selectedPage, setSelectedPage] = useState(0);
    const [advanceSearchMatches, setAdvanceSearchMatches] = useState([]);
    const [apiLoad, setApiLoad] = useState(false);
    const [reload, setReload] = useState(null);
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
            setAdvanceSearchMatches([]);
            utils.scrollToTop();
            async function getAdvanceSearchMatches(_id, filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                const resp = await profileService.getAdvanceSearchMatches(_id, filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setAdvanceSearchMatches(data);
                    setReload(false);
                    setApiLoad(false);
                    reloadAction(true);
                } else {
                    setApiLoad(false);
                }
            }
            getAdvanceSearchMatches(_id, filter);
        }
    }, [filter, _id]);

    useEffect(() => {
        if (filter && _id) {
            async function getAdvanceSearchMatches(_id, filter) {
                const resp = await profileService.getAdvanceSearchMatches(_id, filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setAdvanceSearchMatches(data);
                }
            }
            if(!initialLoad)        
                getAdvanceSearchMatches(_id, filter);
            else
                setInitialLoad(false);            
        }
    }, [reloadCommon, _id]);

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
    <title>Advanced Search Matches | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Use the advanced search feature on True Friend Christian Matrimony to find faith-aligned partners by filtering profiles based on your values, preferences, and lifestyle for meaningful Christian relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Advanced Search, Christian Matchmaking, Faith-Based Matches, Partner Preferences, Ideal Christian Partner, True Friend Matrimony, Christian Singles, Trusted Matrimony Platform, Christian Marriage"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/search/advance" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Advanced Search Matches | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Filter and search for your ideal Christian matches using advanced search on True Friend Matrimony. Connect with faith-aligned partners and build meaningful relationships."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/search/advance" />

 
</Head>

        <section className="page-section-ptb4 pb-6">
            <Container>
                <Row className="d-flex1 justify-content-center">
                    {/* <Col md={3} className="mb-2">
                        <MatchFilter onFilterSubmit={filterSubmit} />
                    </Col> */}
                    <Col md={9}>
                        <Row className="mt-3">
                            <Col md={12}>
                                {apiLoad && <h5>Loading</h5>}
                                {!apiLoad &&
                                    (advanceSearchMatches.length === 0 ? (
                                        <p>{"No meet to your search qualification "}</p>
                                    ) : (
                                        advanceSearchMatches.map((ele, ind) => {
                                            return <ProfileCard key={ind} profile={ele} />;
                                        })
                                    ))}
                            </Col>
                            <div className="d-flex1 justify-content-center">
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearchMatches);
