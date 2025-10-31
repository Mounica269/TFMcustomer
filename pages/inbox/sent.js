import React, { useEffect, useState, Fragment } from "react";
import { Col, Container, Fade, Nav, Row, Tab, Form } from "react-bootstrap";

import { connect, useSelector } from "react-redux";
import { profileService } from "core/services";
import ProfileCard from "components/common/profile-card";
import Pagination from "components/common/pagination";
import { CONST, utils } from "core";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";


const sort = [
    {
        label: "Newest first",
        value: 10,
    },
    {
        label: "Oldest first",
        value: 20,
    },
];

const Sent = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const { commonData } = props;
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [totalPage, setTotalPage] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const [selected, setSelected] = useState("10");
    const [filterSelect, setFilterSelect] = useState("10");
    const [selectedPage, setSelectedPage] = useState(0);
    const [apiLoad, setApiLoad] = useState(false);
    const [sentRespMsg, setSendRespMsg] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSelected(value);
        const sort = value !== "10" ? 1 : -1;
        setFilter({
            ...filter,
            sort,
        });
    };

    const handleChangeFilter = (e) => {
        const { value } = e.target;
        setFilterSelect(value);
        const type = Number(value);
        setFilter({
            ...filter,
            type,
        });
    };

    useEffect(() => {
        if (filter) {
            async function loadSentInvitations(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                setDataSource([]);
                utils.scrollToTop();
                const resp = await profileService.sentInvitations(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setDataSource(data);
                } else if (resp && resp.meta.code === 1011) {
                    setDataSource(resp?.data);
                    setSendRespMsg(resp?.meta?.message);
                }
            }
            loadSentInvitations(filter);
        }
    }, [filter]);

    useEffect(() => {
        async function loadSentInvitations(filter) {
            const resp = await profileService.sentInvitations(filter);
            if (resp && resp.meta) setApiLoad(false);
            if (resp && resp.meta.code === 200) {
                const { data, pagination } = resp;
                const { totalCount } = pagination;
                const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                setTotalPage(Math.ceil(totalPage));
                setDataSource(data);
            } else if (resp && resp.meta.code === 1011) {
                setDataSource(resp?.data);
                setSendRespMsg(resp?.meta?.message);
            }
        }
        if (!initialLoad)
            loadSentInvitations(filter);
        else
            setInitialLoad(false);
    }, [reload]);

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
    <title>
        Sent | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
    </title>

    <meta
        name="description"
        content="View and manage the connection requests you’ve sent on True Friend Matrimony. Strengthen Christian relationships and find your ideal life partner with trusted matchmaking services."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, TrueFriend Matrimony, Sent Requests, Connection Invitations, Christian Matchmaking, Matrimonial Services, Christian Marriage, Profile Requests, Find Life Partner, Trusted Matrimony Platform, Christian Relationships"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/sent" />

    {/* Open Graph  */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta
        property="og:title"
        content={`Sent Requests | ${getUserDisplayName(authProfile?.name, authProfile?.user?.name)}`}
    />
    <meta
        property="og:description"
        content="View and manage the connection requests you’ve sent on True Friend Matrimony. Strengthen Christian relationships and find your ideal life partner with trusted matchmaking services."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/sent" />

</Head>



            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Col md={12} className="mb-2">
                            <Row>
                                <Col xl={3} lg={4} md={12} className=" order-2 bg-transperent order-md-1">
                                    <div className="filt-com border bg-white p-3 left-side-card">
                                        <h4>Sort</h4>
                                        <Form>
                                            <ul className="list2">
                                                {sort.map((ele, ind) => (
                                                    <li key={ind}>
                                                        <Form.Check
                                                            type="radio"
                                                            value={ele.value}
                                                            label={ele.label}
                                                            onChange={handleSortChange}
                                                            checked={selected === ele.value.toString()}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </Form>
                                        <h4>Filter</h4>
                                        <ul className="list2">
                                            {commonData?.inboxSentReqFilter?.length > 0 &&
                                                commonData?.inboxSentReqFilter.map(
                                                    ({ label, value, code, checked }, ind) => (
                                                        <li key={ind}>
                                                            <Form.Check
                                                                type="radio"
                                                                name="filterType"
                                                                label={label}
                                                                value={code}
                                                                checked={
                                                                    filterSelect === code.toString()
                                                                }
                                                                onChange={handleChangeFilter}
                                                            />
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </Col>

                                <Col xl={9} lg={8} md={12} className="db-pro-stat  order-1 order-md-2 bg-white p-3">
                                    <Tab.Container defaultActiveKey={"all-request"}>
                                        <div className="tab tab-icon clearfix">
                                            <Nav className="nav-tabs mb-3" as="ul">
                                                <Nav.Item as="li">
                                                    <Nav.Link eventKey="all-request">
                                                        Sent invitations
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content>
                                                <Tab.Pane transition={Fade} eventKey="all-request">
                                                    {apiLoad && <h5>Loading</h5>}
                                                    {!apiLoad &&
                                                        (dataSource === null || dataSource.length === 0) ? (
                                                        <h5 className="py-5 text-center">
                                                            {sentRespMsg}
                                                        </h5>
                                                    ) : (
                                                        <div>
                                                            {dataSource.map((ele, ind) => (
                                                                <ProfileCard key={ind} profile={ele} />
                                                            ))}
                                                            {totalPage > 1 && !apiLoad && (
                                                                <Pagination
                                                                    initialPage={selectedPage}
                                                                    pageCount={totalPage}
                                                                    onPageChange={changePage}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </Tab.Container>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
    };
};

export default connect(mapStateToProps, null)(Sent);
