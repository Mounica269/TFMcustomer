import { Col, Container, Form, Row } from "react-bootstrap";
import React, { useEffect, useState, Fragment } from "react";
import Pagination from "components/common/pagination";
import { profileService } from "core/services";
import ProfileContactView from "components/common/profile-contact-view";
import { CONST, utils } from "core";
import { connect, useSelector } from "react-redux";
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

const Contacts = () => {
    const authProfile = useSelector((state) => state.account?.profile);

    const [totalPage, setTotalPage] = useState(1);
    const [contactsView, setContactsView] = useState([]);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [selected, setSelected] = useState("10");
    const [selectedPage, setSelectedPage] = useState(0);
    const [respMsg, setRespMsg] = useState("");
    const [apiLoad, setApiLoad] = useState(false);

    const getPublicNotification = async () => {
        if (apiLoad === true) return;
        setApiLoad(true);
        setContactsView([]);
        utils.scrollToTop();
        const resp = await profileService.contactsView(filter);
        if (resp && resp.meta.code === 200) {
            const { data, pagination, meta } = resp;
            setTotalPage(
                Math.ceil(pagination.totalCount > 0 ? pagination.totalCount / filter.limit : 0)
            );
            setContactsView(data);
            setRespMsg(meta?.message);
            setApiLoad(false);
        } else if (resp && resp.meta?.code === 1019) {
            const { data, meta } = resp;
            setContactsView(data);
            setRespMsg(meta?.message);
            setApiLoad(false);
        }
    };

    useEffect(() => {
        if (filter) {
            getPublicNotification(filter);
        }
    }, [filter]);

    useEffect(() => {
        const skip = selectedPage >= 1 ? selectedPage * 10 : 0;
        setFilter({
            ...filter,
            skip,
        });
    }, [selectedPage]);

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSelected(value);
        filter.sort = value !== "10" ? 1 : -1;
        getPublicNotification(filter);
    };

    return (
        <>

<Head>
    <title>
       Inbox Contacts | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
    </title>
    <meta
        name="description"
        content="Track your contact history including calls and SMS interactions with potential matches on True Friend Matrimony. Stay connected and build meaningful relationships."
    />
    <meta
        name="keywords"
        content="TrueFriend Matrimony, Christian Matrimony, Christian Marriage, Interfaith Matrimony, Matrimonial Services, Contacts History, Connection Requests, Potential Matches, Profile Interactions, Marriage, Trusted Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/contacts" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta
        property="og:title"
        content={`Inbox Contacts | ${getUserDisplayName(authProfile?.name, authProfile?.user?.name)}`}
    />
    <meta
        property="og:description"
        content="Track your contact history including calls and SMS interactions with potential matches on True Friend Matrimony. Stay connected and build meaningful relationships."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/contacts" />
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
                    
                    <Col xl={9} lg={8} md={12} className="db-pro-stat-contact order-1 order-md-2 bg-white  p-3 tect-left">
                    <h4 className="text-center">
                            <i className="fa fa-bell"></i>History of call initiated & SMSs sent
                        </h4>
                        {apiLoad && <h5 className="text-center">Loading</h5>}
                        {!apiLoad && contactsView === null && (
                            <h5 className="py-5 text-center">{respMsg}</h5>
                        )}
                        {!apiLoad &&
                            contactsView !== null &&
                            contactsView.map((ele, ind) => (
                                <ProfileContactView key={ind} profile={ele} />
                            ))}
                                                    {apiLoad || contactsView !== null && totalPage > 1 && (
                            <Pagination
                                initialPage={selectedPage}
                                pageCount={totalPage}
                                onPageChange={changePage}
                            />
                        )}

                    </Col>
                    </Row>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
};

export default Contacts;
