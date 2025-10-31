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

const Received = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const { commonData } = props;
    const reload = useSelector((state) => state.common?.reloadAction);

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [totalPage, setTotalPage] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const [selected, setSelected] = useState("10");
    const [filterSelect, setFilterSelect] = useState("10");
    const [apiLoad, setApiLoad] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    const [respMessage, setRespMessage] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSelected(value);
        setFilter({
            ...filter,
            sort: value !== "10" ? 1 : -1,
        });
    };

    const handleChangeFilter = (e) => {
        const { value } = e.target;
        setFilterSelect(value);
        filter.type = Number(value);
        setFilter({
            ...filter,
            type: Number(value),
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
        if (filter) {
            const loadReceivedInvitations = async (filter) => {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setDataSource([]);
                const resp = await profileService.receivedInvitations(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setDataSource(data);
                } else if (resp.meta.code === 1009) {
                    setDataSource(resp?.data);
                    setRespMessage(resp?.meta?.message);
                }
            };
            loadReceivedInvitations(filter);
        }
    }, [filter]);

    useEffect(() => {
        const loadReceivedInvitations = async (filter) => {
            const resp = await profileService.receivedInvitations(filter);
            if (resp && resp.meta) setApiLoad(false);
            if (resp && resp.meta.code === 200) {
                const { data, pagination } = resp;
                const { totalCount } = pagination;
                const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                setTotalPage(Math.ceil(totalPage));
                setDataSource(data);
            } else if (resp.meta.code === 1009) {
                setDataSource(resp?.data);
                setRespMessage(resp?.meta?.message);
            }
        };
        if(!initialLoad)
            loadReceivedInvitations(filter);
        else
            setInitialLoad(false);
    }, [reload]);

    return (
        <>

<Head>
    <title>
        Inbox | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
    </title>
   <meta
        name="description"
        content="Manage your received partner invitations on TrueFriend Matrimony, the trusted Christian matrimony platform. View, respond to, and connect with genuine Christian singles seeking marriage and lifelong companionship."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Invitations, Received Partner Requests, Christian Matchmaking, Matrimonial Services, Christian Brides, Christian Grooms, TrueFriend Matrimony, Trusted Matrimony Platform, Marriage Connections, Life Partner Invitations"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/received" />

    {/* Open Graph  */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta
        property="og:title"
        content={`Inbox | ${getUserDisplayName(authProfile?.name, authProfile?.user?.name)}`}
    />
    <meta
        property="og:description"
        content="Manage your received partner invitations on True Friend Matrimony. View and respond to connection requests easily to take the next step in your Christian matchmaking and matrimonial journey."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/received" />

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
                                        {commonData?.inboxInvitationReceivedFilter?.length > 0 &&
                                            commonData?.inboxInvitationReceivedFilter.map(
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
                        
                            <Col xl={9} lg={8} md={12} className="db-pro-stat order-1 order-md-2 bg-white  p-3">
                                <Tab.Container defaultActiveKey={"all-request"}>
                                    <div className="tab tab-icon clearfix">
                                        <Nav className="nav-tabs mb-3" as="ul">
                                            <Nav.Item as="li">
                                                <Nav.Link eventKey="all-request">
                                                    All Requests
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane transition={Fade} eventKey="all-request">
                                                {apiLoad && <h5>Loading</h5>}
                                                {!apiLoad && dataSource === null ? (
                                                    <h5 className="py-5 text-center">
                                                        {respMessage}
                                                    </h5>
                                                ) : (
                                                    dataSource !== null &&
                                                    dataSource.map((ele, ind) => (
                                                        <ProfileCard key={ind} profile={ele} />
                                                    ))
                                                )}
                                                {totalPage > 1 && (
                                                    <Pagination
                                                        initialPage={0}
                                                        pageCount={totalPage}
                                                        onPageChange={changePage}
                                                    />
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

// export default connect(mapStateToProps, null)(Received);

const ConnectedReceived = connect(mapStateToProps, null)(Received);

export default connect(mapStateToProps, null)(Received);
