import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { CONST, profileService, utils } from "core";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import { useRouter } from "next/router";
import Head from "next/head";


const BlockedProfiles = () => {
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [blockedProfilesLists, setBlockedProfilesLists] = useState([]);
    const [selectedPage, setSelectedPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [apiLoad, setApiLoad] = useState(false);
    const [blockRespMsg, setBlockRespMsg] = useState("");

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
            const blockedProfilesList = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                setBlockedProfilesLists([]);
                utils.scrollToTop();
                const resp = await profileService.getBlockedProfilesList(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setBlockedProfilesLists(data);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1017) {
                    setBlockedProfilesLists(resp?.data);
                    setBlockRespMsg(resp?.meta?.message);
                }
            };
            blockedProfilesList(filter);
        }
    }, [filter]);

    useEffect(() => {
        const blockedProfilesList = async (filter) => {
            const resp = await profileService.getBlockedProfilesList(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination, data } = resp;
                const { totalCount } = pagination;
                const { limit } = filter;
                const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                setTotalPage(page);
                setBlockedProfilesLists(data);
            }
        };
        blockedProfilesList(filter);
    }, [reload]);

    return (
        <>
<Head>
    <title>Blocked Profiles | True Friend Matrimony</title>
   <meta
        name="description"
        content="Manage and review blocked Christian profiles on TrueFriend Matrimony, the trusted Christian matrimony platform. Easily unblock members, reconnect, and continue your faith-based matchmaking journey toward finding your ideal life partner."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Blocked Profiles, Unblock Christian Members, Faith-Based Matchmaking, Christian Marriage, Christian Matchmaking Platform, Matrimonial Services, Profile Management, Find Christian Life Partner, Trusted Matrimony Platform, TrueFriend Matrimony"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/discovery" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Blocked Profiles | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Manage and review blocked Christian profiles on True Friend Matrimony. Easily unblock members, reconnect, and continue your journey to find your ideal life partner."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/discovery" />

</Head>

        <section className="page-section-ptb4 pb-6">
            <Container>
                <Row className="justify-content-center d-flex">
                    <Col md={9}>
                        <div className="mb-2">
                            <h3>
                                <u>Blocked Members</u>
                            </h3>
                        </div>
                        {apiLoad && <h3 className="py-5 text-center">Loading</h3>}

                        {blockedProfilesLists === null ? (
                            <p>{blockRespMsg}</p>
                        ) : (
                            !apiLoad &&
                            blockedProfilesLists.map((ele, ind) => (
                                <ProfileCard blockProfile={false} key={ind} profile={ele} />
                            ))
                        )}
                        <div className="d-flex justify-content-center">
                            {apiLoad ||
                                (blockedProfilesLists !== null && totalPage > 1 && (
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

export default BlockedProfiles;
