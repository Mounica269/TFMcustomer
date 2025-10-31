import { Col, Container, Form, Row } from "react-bootstrap";
import { profileService } from "core/services";
import { Fragment, useEffect, useState } from "react";
import { CONST, reloadAction, utils } from "core";
import { connect, useSelector } from "react-redux";
import Pagination from "components/common/pagination";
import PersonalNotifications from "components/common/personal-notifications";
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

const Notifications = () => {

    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [totalPage, setTotalPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [selectedPage, setSelectedPage] = useState(0);
    const [selected, setSelected] = useState("10");
    const [respMsg, setRespMsg] = useState("");
    const [apiLoad, setApiLoad] = useState(false);
    const authProfile = useSelector((state) => state.account?.profile);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSelected(value);
        filter.sort = value !== "10" ? 1 : -1;
        getPersonalNotifications(filter);
    };

    const getPersonalNotifications = async (filter) => {
        if (apiLoad === true) return;
        setApiLoad(true);
        setNotifications([]);
        utils.scrollToTop();
        const resp = await profileService.personalNotifications(filter);
        if (resp && resp.meta.code === 200) {
            const { data, pagination } = resp;
            const { totalCount } = pagination;
            const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
            setTotalPage(Math.ceil(totalPage));
            setNotifications(data);
            setApiLoad(false);
            // reloadAction(!reload);
        } else if (resp && resp.meta.code === 1027) {
            const { data } = resp;
            setRespMsg(resp.meta.message);
            setNotifications(data);
            setApiLoad(false);
        }
    };

    useEffect(() => {
        if(filter){
            getPersonalNotifications(filter);
        }
    }, [filter]);

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
        Notifications | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
    </title>
      <meta
        name="description"
        content="Stay updated with the latest notifications on TrueFriend Matrimony, the trusted Christian matrimony platform. Manage alerts for new messages, profile activities, and important matchmaking updates to help you find your perfect Christian life partner."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Notifications, Matrimonial Alerts, Christian Matchmaking Updates, Profile Activity Alerts, TrueFriend Matrimony, Christian Matrimony Platform, New Messages, Matchmaking Services, Christian Life Partner Notifications"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/notification" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta
        property="og:title"
        content={`Notifications | ${getUserDisplayName(authProfile?.name, authProfile?.user?.name)}`}
    />
    <meta
        property="og:description"
        content="Stay updated with the latest notifications on True Friend Matrimony. Manage alerts for new messages, profile activity, and important updates to enhance your Christian matchmaking and matrimonial experience."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/notification" />

 
</Head>



<section className="page-section-ptb4 pb-6">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col md={12} className="mb-2">
                        <Row>
                        <Col xl={3} lg={4} md={12} className=" order-2 bg-transperent order-md-1">
                                <div className="filt-com border bg-white p-3 left-side-card">
                            <h4>Sort</h4>
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
                        </div>
                    </Col>
                    
                    <Col xl={9} lg={8} md={12} className="db-pro-stat  order-1 order-md-2 bg-white  p-3">
                    <h3>
                            Notifications
                        </h3>
                        {apiLoad && <h5>Loading</h5>}
                        {!apiLoad && notifications === null && (
                            <h5 className="py-5 text-center">{respMsg}</h5>
                        )}
                        {!apiLoad &&
                            notifications !== null &&
                            notifications.length > 0 &&
                            notifications.map((ele, ind) => (
                                <PersonalNotifications key={ind} profile={ele} />
                            ))}
                        <div className="d-flex justify-content-center">
                            {apiLoad ||
                                (notifications !== null && totalPage > 1 && (
                                    <Pagination
                                        initialPage={selectedPage}
                                        pageCount={totalPage}
                                        onPageChange={changePage}
                                    />
                                ))}
                        </div>
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
    };
};

export default connect(mapStateToProps, null)(Notifications);
