import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { CONST, profileService, utils } from "core";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import Head from "next/head";


const PremiumMembers = () => {
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [premiumMembersLists, setPremiumMembersLists] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [apiLoad, setApiLoad] = useState(false);
    const [respMsg, setRespMsg] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);

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
            const getPremiumMembersLists = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                setPremiumMembersLists([]);
                utils.scrollToTop();
                const resp = await profileService.premiumMembers(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setPremiumMembersLists(data);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1028) {
                    const { data, meta } = resp;
                    setPremiumMembersLists(data);
                    setRespMsg(meta?.message);
                }
            };
            getPremiumMembersLists(filter);
        }
    }, [filter]);

    useEffect(() => {
        const getPremiumMembersLists = async (filter) => {
            const resp = await profileService.premiumMembers(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination, data } = resp;
                const { totalCount } = pagination;
                const { limit } = filter;
                const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                setTotalPage(page);
                setPremiumMembersLists(data);
            } else if (resp && resp.meta.code === 1028) {
                const { data, meta } = resp;
                setPremiumMembersLists(data);
                setRespMsg(meta?.message);
            }
        };
        if(!initialLoad)        
            getPremiumMembersLists(filter);
        else
            setInitialLoad(false);        
    }, [reload]);

    return (
        <>
<Head>
    <title>Premium Members | True Friend Matrimony</title>

    <meta
        name="description"
        content="Explore premium, verified Christian matrimony profiles on TrueFriend Matrimony. Connect with faith-aligned singles, discover ideal life partners, and build meaningful Christian relationships with trusted members."
    />
    <meta
        name="keywords"
        content="Premium Christian Matrimony, Verified Christian Profiles, Exclusive Matrimonial Matches, TrueFriend Matrimony, Christian Singles, Faith-Based Matchmaking, Christian Marriage, Trusted Matrimony Platform, Find Life Partner, Christian Relationships"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/discovery" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Premium Christian Profiles | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Explore premium, verified Christian matrimony profiles on True Friend Matrimony. Connect with faith-aligned singles and find your perfect life partner."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/discovery" />


</Head>

        <section className="page-section-ptb4 pb-6">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <div className="mb-2">
                            <h3>Premium Members</h3>
                        </div>
                        {apiLoad && <h5 className="py-5 text-center">Loading</h5>}
                        {premiumMembersLists === null ? (
                            <h3 className="py-5 text-center">{respMsg}</h3>
                        ) : (
                            !apiLoad &&
                            premiumMembersLists.map((ele, ind) => (
                                <ProfileCard key={ind} profile={ele} />
                            ))
                        )}
                        <div className="d-flex justify-content-center">
                            {!apiLoad && premiumMembersLists !== null && totalPage > 1 && (
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

export default PremiumMembers;
