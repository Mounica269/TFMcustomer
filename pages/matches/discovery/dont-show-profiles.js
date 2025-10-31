import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { CONST, profileService, reloadAction, utils } from "core";
import Pagination from "components/common/pagination";
import ProfileCard from "components/common/profile-card";
import Head from "next/head";

const DontShowProfiles = (props) => {
    const { reloadAction } = props;
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [dontShowProfilesLists, setDontShowProfilesLists] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [selectedPage, setSelectedPage] = useState(0);
    const [apiLoad, setApiLoad] = useState(false);
    const [ignoreRespMsg, setIgnoreRespMsg] = useState("");

    useEffect(() => {
        if (filter) {
            const dontShowProfilesList = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                setDontShowProfilesLists([]);
                utils.scrollToTop();
                const resp = await profileService.dontShowProfileList(filter);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const { limit } = filter;
                    const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                    setTotalPage(page);
                    setDontShowProfilesLists(data);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1018) {
                    setDontShowProfilesLists(resp?.data);
                    setIgnoreRespMsg(resp?.meta?.message);
                }
            };
            dontShowProfilesList(filter);
        }
    }, [filter]);

    useEffect(() => {
        const dontShowProfilesList = async (filter) => {
            const resp = await profileService.dontShowProfileList(filter);
            if (resp && resp.meta.code === 200) {
                const { pagination, data } = resp;
                const { totalCount } = pagination;
                const { limit } = filter;
                const page = totalCount >= limit ? Math.ceil(totalCount / limit) : 1;
                setTotalPage(page);
                setDontShowProfilesLists(data);
            }
        };
        dontShowProfilesList(filter);
    }, [reload]);

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

    return (
        <>
       <Head>
    <title>Ignored Members | True Friend Matrimony</title>

    <meta
        name="description"
        content="Manage and review members you have ignored on TrueFriend Matrimony. Easily refine your Christian matchmaking journey, control hidden profiles, and focus on finding your ideal life partner through trusted faith-based matchmaking."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Ignored Members, Hidden Profiles, Don't Show Profiles, Member Management, TrueFriend Matrimony, Faith-Based Matchmaking, Christian Marriage, Christian Matchmaking, Matrimonial Services, Trusted Matrimony Platform, Find Life Partner"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/discovery" />

    {/* Open Graph  */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Ignored Members | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Manage and review members you have ignored on True Friend Matrimony. Easily refine your Christian matchmaking journey and focus on finding your ideal life partner."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/discovery" />
 
</Head>

            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={9}>
                            <div className="mb-2">
                                <h3>
                                    <u>Ignored Members</u>
                                </h3>
                            </div>
                            {apiLoad && <h3 className="py-5 text-center">Loading</h3>}
                            {dontShowProfilesLists === null ? (
                                <p>{ignoreRespMsg}</p>
                            ) : (
                                !apiLoad &&
                                dontShowProfilesLists.map((ele, ind) => (
                                    <ProfileCard dontShow={false} key={ind} profile={ele} />
                                ))
                            )}
                            <div className="d-flex justify-content-center">
                                {apiLoad ||
                                    (dontShowProfilesLists !== null && totalPage > 1 && (
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

export default connect(null, mapDispatchToProps)(DontShowProfiles);
