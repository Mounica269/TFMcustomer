import {
    Col,
    Container,
    Fade,
    Form,
    Nav,
    OverlayTrigger,
    Row,
    Tab,
    Tooltip,
} from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { profileService } from "core/services";
import { CONST, utils } from "core";
import ProfileCard from "components/common/profile-card";
import Pagination from "components/common/pagination";
import { useSelector } from "react-redux";
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

const Requests = () => {
    const authProfile = useSelector((state) => state.account?.profile);

    const commonData = useSelector((state) => state.common?.commonData);
    const reload = useSelector((state) => state.common?.reloadAction);

    const [pendingRequests, setPendingRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [filterSelect, setFilterSelect] = useState("10");
    const [eventKey, setEventKey] = useState("pending-request");
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER, type: 10 });
    const [totalPage, setTotalPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [pendingRespMsg, setPendingRespMsg] = useState("");
    const [acceptRespMsg, setAcceptRespMsg] = useState("");
    const [sentRespMsg, setSendRespMsg] = useState("");
    const [sortSelected, setSortSelected] = useState("10");
    const [apiLoad, setApiLoad] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);


    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    useEffect(() => {
        if (filter && eventKey === "send-request") {
            async function getSentReqs(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setSentRequests([]);
                const resp = await profileService.profileSentRequests(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setSentRequests(data);
                } else if (resp && resp.meta.code === 1014) {
                    setSentRequests(resp?.data);
                    setSendRespMsg(resp?.meta?.message);
                }
            };
            getSentReqs(filter);
        }
        if (filter && eventKey === "accepted-request") {
            async function getAccpetedReqs(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setAcceptedRequests([]);
                const resp = await profileService.profileAcceptedRequests(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setAcceptedRequests(data);
                } else if (resp && resp.meta.code === 1013) {
                    setAcceptedRequests(resp?.data);
                    setAcceptRespMsg(resp?.meta?.message);
                }
            };
            getAccpetedReqs(filter);
        }
        if (filter && eventKey === "pending-request") {
            async function getPendingReqs(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setPendingRequests([]);
                const resp = await profileService.profilePendingRequests(filter);
                if (resp && resp.meta) setApiLoad(false);

                if (resp && resp.meta?.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setPendingRequests(data);
                } else if (resp && resp.meta.code === 1012) {
                    setPendingRequests(resp?.data);
                    setPendingRespMsg(resp?.meta?.message);
                }
            };
            getPendingReqs(filter);
        }
    }, [filter, eventKey]);

    useEffect(() => {
        if(initialLoad){ 
            setInitialLoad(false);
            return;
        }
        if (eventKey === "send-request") {
            async function getSentReqs(filter) {
                const resp = await profileService.profileSentRequests(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setSentRequests(data);
                } else if (resp && resp.meta.code === 1014) {
                    setSentRequests(resp?.data);
                    setSendRespMsg(resp?.meta?.message);
                }
            };
            getSentReqs(filter);
        }
        if (eventKey === "accepted-request") {
            async function getAccpetedReqs(filter) {
                const resp = await profileService.profileAcceptedRequests(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setAcceptedRequests(data);
                } else if (resp && resp.meta.code === 1013) {
                    setAcceptedRequests(resp?.data);
                    setAcceptRespMsg(resp?.meta?.message);
                }
            };
            getAccpetedReqs(filter);
        }
        if (eventKey === "pending-request") {
            async function getPendingReqs(filter) {
                const resp = await profileService.profilePendingRequests(filter);
                if (resp && resp.meta) setApiLoad(false);

                if (resp && resp.meta?.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setPendingRequests(data);
                } else if (resp && resp.meta.code === 1012) {
                    setPendingRequests(resp?.data);
                    setPendingRespMsg(resp?.meta?.message);
                }
            };
            getPendingReqs(filter);
        }
    }, [reload]);

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortSelected(value);
        const sort = value !== "10" ? 1 : -1;
        setFilter({
            ...filter,
            sort,
        });
    };

    const handleChangeFilter = (e) => {
        const { value } = e.target;
        setFilterSelect(value);
        filter.type = Number(value);
        if (eventKey === "pending-request") {
            async function getPendingReqs(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setPendingRequests([]);
                const resp = await profileService.profilePendingRequests(filter);
                if (resp && resp.meta) setApiLoad(false);

                if (resp && resp.meta?.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setPendingRequests(data);
                } else if (resp && resp.meta.code === 1012) {
                    setPendingRequests(resp?.data);
                    setPendingRespMsg(resp?.meta?.message);
                }
            }
            getPendingReqs(filter);
        }
        if (eventKey === "accepted-request") {
            async function getAccpetedReqs(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setAcceptedRequests([]);
                const resp = await profileService.profileAcceptedRequests(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setAcceptedRequests(data);
                } else if (resp && resp.meta.code === 1013) {
                    setAcceptedRequests(resp?.data);
                    setAcceptRespMsg(resp?.meta?.message);
                }
            };
            getAccpetedReqs(filter);
        }
        if (eventKey === "send-request") {
            async function getSentReqs(filter) {
                if (apiLoad === true) return;
                setApiLoad(true);
                utils.scrollToTop();
                setSentRequests([]);
                const resp = await profileService.profileSentRequests(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { data, pagination } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setSentRequests(data);
                } else if (resp && resp.meta.code === 1014) {
                    setSentRequests(resp?.data);
                    setSendRespMsg(resp?.meta?.message);
                }
            };
            getSentReqs(filter);
        }
    };

    const getPendingRequestSection = () => {
        return (
            <>

                {apiLoad && <h5>Loading</h5>}
                {!apiLoad &&
                    (pendingRequests === null ? (
                        <h5 className="py-5 text-center">{pendingRespMsg}</h5>
                    ) : (
                        <div>
                            {pendingRequests.map((ele, ind) => (
                                <ProfileCard isPhotoRequest={true} key={ind} profile={ele} />
                            ))}
                            {totalPage > 1 && (
                                <Pagination
                                    initialPage={selectedPage}
                                    pageCount={totalPage}
                                    onPageChange={changePage}
                                />
                            )}
                        </div>
                    ))}
            </>
        );
    };

    const getAcceptedRequestSection = () => {
        return (
            <>

                {apiLoad && <h5>Loading</h5>}
                {!apiLoad &&
                    (acceptedRequests === null ? (
                        <h5 className="py-5 text-center">{acceptRespMsg}</h5>
                    ) : (
                        <div>
                            {acceptedRequests.map((ele, ind) => (
                                <ProfileCard key={ind} profile={ele} />
                            ))}
                            {totalPage > 1 && (
                                <Pagination
                                    initialPage={selectedPage}
                                    pageCount={totalPage}
                                    onPageChange={changePage}
                                />
                            )}
                        </div>
                    ))}
            </>
        );
    };

    const getSentRequestSection = () => {
        return (
            <>

            <Fragment>
                {apiLoad && <h5>Loading</h5>}
                {!apiLoad &&
                    (sentRequests === null ? (
                        <h5 className="py-5 text-center">{sentRespMsg}</h5>
                    ) : (
                        <div>
                            {sentRequests.map((ele, ind) => (
                                <ProfileCard key={ind} profile={ele} />
                            ))}
                            {totalPage > 1 && (
                                <Pagination
                                    initialPage={selectedPage}
                                    pageCount={totalPage}
                                    onPageChange={changePage}
                                />
                            )}
                        </div>
                    ))}
            </Fragment>
            </>
        );
    };

    const pendinRequestResp = (props) => (
        <Tooltip {...props}>list of phone or photo request receive</Tooltip>
    );

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
        Request | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
    </title>
    <meta
        name="description"
        content="Manage your connection requests on TrueFriend Matrimony. Accept, send, or review invitations to build meaningful Christian relationships and find your perfect life partner."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, TrueFriend Matrimony, Matrimonial Services, Connection Requests, Christian Marriage, Profile Invitations, Christian Matchmaking, Trusted Matrimony Platform, Relationship Building"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/requests" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta
        property="og:title"
        content={`Request | ${getUserDisplayName(authProfile?.name, authProfile?.user?.name)}`}
    />
    <meta
        property="og:description"
        content="Manage your connection requests on True Friend Matrimony. Accept, send, or review invitations to build meaningful Christian relationships and find your perfect life partner."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/requests" />


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
                                                        checked={
                                                            sortSelected === ele.value.toString()
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Form>
                                    <h4>Filter</h4>
                                    <ul className="list2">
                                        {commonData?.inboxRequestFilter?.length > 0 &&
                                            commonData?.inboxRequestFilter.map(
                                                ({ label, code }, ind) => (
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
                                <Tab.Container className="clearfix" defaultActiveKey={eventKey}>
                                    <div className="tab tab-icon">
                                        <Nav className="nav-tabs mb-3" as="ul">
                                            <Nav.Item as="li">
                                                <Nav.Link
                                                    eventKey="pending-request"
                                                    onClick={() => setEventKey("pending-request")}
                                                    className="inbox_pending_requests"
                                                >
                                                    Pending Requests
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={pendinRequestResp}
                                                    >
                                                        <i className="bi bi-info-circle"></i>
                                                    </OverlayTrigger>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link
                                                    eventKey="accepted-request"
                                                    onClick={() => setEventKey("accepted-request")}
                                                >
                                                    Accepted Requests
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link
                                                    onClick={() => setEventKey("send-request")}
                                                    eventKey="send-request"
                                                >
                                                    Sent Requests
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>

                                        <Tab.Content>
                                            <Tab.Pane
                                                transition={Fade}
                                                eventKey={"pending-request"}
                                            >
                                                {getPendingRequestSection()}
                                            </Tab.Pane>
                                            <Tab.Pane
                                                transition={Fade}
                                                eventKey={"accepted-request"}
                                            >
                                                {getAcceptedRequestSection()}
                                            </Tab.Pane>
                                            <Tab.Pane transition={Fade} eventKey={"send-request"}>
                                                {getSentRequestSection()}
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

export default Requests;
