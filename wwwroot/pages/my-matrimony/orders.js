import { Fragment, useEffect, useState } from "react";
import { Accordion, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { commonService, profileService } from "../../core/services";
import { connect, useSelector } from "react-redux";
import { CONST, utils } from "../../core/helper";
import Pagination from "components/common/pagination";
import moment from "moment";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const Order = () => {
    const commonData = useSelector((state) => state?.common?.commonData);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [totalPage, setTotalPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [respMsg, setRespMsg] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);
    const authProfile = useSelector((state) => state.account?.profile);

    const getOrdersList = async () => {
        filter.filter = {
            status: [30, 40],
        };
        const resp = await profileService.getOrders(filter);
        if (resp && resp?.meta.code == 200) {
            const { data, pagination } = resp;
            setOrders(data);
            setTotalPage(
                Math.ceil(pagination.totalCount > 0 ? pagination.totalCount / filter.limit : 0)
            );
        } else if (resp && resp?.meta.code === 1021) {
            setOrders(resp?.data);
            setRespMsg(resp?.meta?.message);
        }
    };

    const generateInvoice = async (values) => {
        const { _id, orderId } = values;
        const resp = await commonService.generateInvoice(_id);
        if (resp && resp?.meta?.code === 200) {
            fetch(resp?.data).then((response) => {
                response.blob().then((blob) => {
                    // Creating new object of PDF file
                    const fileURL = window.URL.createObjectURL(blob);
                    // Setting various property values
                    let link = document.createElement("a");
                    link.href = fileURL;
                    link.download = orderId + "-Invoice.pdf";
                    link.click();
                });
            });
            utils.showSuccessMsg(resp?.meta?.message);
        }
    };

    const getCommonDataStatusVal = (key, value) => {
        const status = commonData && commonData[key]?.find((ele) => ele.code === value);
        switch (status?.code) {
            case 10:
                return (
                    <button className="btn btn-secondary border-0 btn-sm">{status.label}</button>
                );
            case 20:
                return <button className="btn btn-primary border-0 btn-sm">{status.label}</button>;
            case 30:
                return <button className="btn btn-success border-0 btn-sm">{status.label}</button>;
            case 40:
                return <button className="btn btn-danger border-0 btn-sm">{status.label}</button>;
            case 50:
                return <button className="btn btn-warning border-0 btn-sm">{status.label}</button>;
        }
    };

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    useEffect(() => {
        if (initialLoad && selectedPage <= 1) {
            setInitialLoad(false);
            return;
        } else setInitialLoad(false);

        const skip = selectedPage >= 1 ? selectedPage * 10 : 0;
        setFilter({
            ...filter,
            skip,
        });
    }, [selectedPage]);

    useEffect(() => {
        getOrdersList();
    }, [filter]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Download Invoice
        </Tooltip>
    );

    const [transDate, setTransDate] = useState("");

    useEffect(() => {
        if (orders && orders.length > 0) {
            orders.map((ele) => {
                const { trans_date } = ele;
                if (trans_date !== undefined) {
                    const formatTransDate = trans_date !== undefined && trans_date?.split("/");
                    const [date, month, year = null] = formatTransDate;
                    const newTransDate = date + "/" + month + new Date().getFullYear();
                    setTransDate(newTransDate);
                } else {
                    return false;
                }
            });
        }
    }, [orders]);

    return (
        <>

          <Head>
    <title>Orders | True Friend Christian Matrimony</title>


    <meta
        name="description"
        content="Manage your orders, subscriptions, and premium services on True Friend Christian Matrimony. Access features designed to support your faith-based matchmaking journey and connect with compatible Christian singles."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Christian Matrimonial Services, Orders, Subscriptions, Premium Services, Faith-Based Matchmaking, Christian Singles, Matrimony Platform, Trusted Christian Matrimony"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony/orders" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Orders | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Manage your orders and premium services on True Friend Christian Matrimony. Access features to enhance your faith-centered matchmaking experience."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony/orders" />


</Head>



            <section className="page-section-ptb4 pb-6">
                <Container>
                    <div className="bg-white p-5">
                        <Row>
                            <Col md={12}>
                                <h4>My Orders</h4>
                                {orders === null || orders.length === 0 ? (
                                    <p>{respMsg || "Loading"}</p>
                                ) : (
                                    <Fragment>
                                        <Accordion
                                            className="accordion icon"
                                            id="accordionExample3"
                                        >
                                            <div className="table-responsive-lg table-responsive-md table-responsive-sm">
                                                <table className="table  table-border">
                                                    <tbody>
                                                        <tr>
                                                            <td width={"20%"}>Order</td>
                                                            <td width={"20%"}>Paid Amount</td>
                                                            <td width={"20%"}>Mode of Payment</td>
                                                            <td width={"20%"}>Status</td>
                                                            <td width={"20%"}>Date</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            {orders &&
                                                orders.length > 0 &&
                                                orders.map((ele, ind) => {
                                                    const {
                                                        orderId,
                                                        amount,
                                                        status,
                                                        paymentMode,
                                                        plan,
                                                        trans_date,
                                                        updatedAt,
                                                        planAmount,
                                                        discountValue,
                                                        discountType,
                                                        coupon,
                                                        createdAt,
                                                    } = ele;

                                                    return (
                                                        <Fragment>
                                                            <Accordion.Item eventKey={ind}>
                                                                <Accordion.Header>
                                                                    <div className="table-responsive-lg table-responsive-md table-responsive-sm d-xl-none d-lg-none d-md-block d-block">
                                                                        <table className="table table-border">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        width={"20%"}
                                                                                    >
                                                                                        {orderId}
                                                                                    </td>
                                                                                    <td
                                                                                        width={"20%"}
                                                                                    >
                                                                                        ₹{amount}
                                                                                    </td>
                                                                                    <td
                                                                                        width={"20%"}
                                                                                    >
                                                                                        {paymentMode ===
                                                                                            "null"
                                                                                            ? " ---- "
                                                                                            : paymentMode}
                                                                                    </td>
                                                                                    <td
                                                                                        width={"20%"}
                                                                                    >
                                                                                        {getCommonDataStatusVal(
                                                                                            "paymentStatus",
                                                                                            status
                                                                                        )}
                                                                                    </td>
                                                                                    <td
                                                                                        className=""
                                                                                        width={"20%"}
                                                                                    >
                                                                                        {transDate
                                                                                            ? transDate
                                                                                            : moment(
                                                                                                createdAt
                                                                                            ).format(
                                                                                                "l"
                                                                                            )}
                                                                                        <OverlayTrigger
                                                                                            placement="right"
                                                                                            delay={{
                                                                                                show: 250,
                                                                                                hide: 400,
                                                                                            }}
                                                                                            overlay={
                                                                                                renderTooltip
                                                                                            }
                                                                                        >
                                                                                            <i
                                                                                                className="bi bi-download fs-5 px-3"
                                                                                                onClick={() =>
                                                                                                    generateInvoice(
                                                                                                        ele
                                                                                                    )
                                                                                                }
                                                                                            ></i>
                                                                                        </OverlayTrigger>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    {/* <span className="d-xl-block d-lg-block d-none"> */}
                                                                    <table className="table table-border tablehide">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    width={"20%"}
                                                                                >
                                                                                    {orderId}
                                                                                </td>
                                                                                <td
                                                                                    width={"20%"}
                                                                                >
                                                                                    ₹{amount}
                                                                                </td>
                                                                                <td
                                                                                    width={"20%"}
                                                                                >
                                                                                    {paymentMode ===
                                                                                        "null"
                                                                                        ? " ---- "
                                                                                        : paymentMode}
                                                                                </td>
                                                                                <td
                                                                                    width={"20%"}
                                                                                >
                                                                                    {getCommonDataStatusVal(
                                                                                        "paymentStatus",
                                                                                        status
                                                                                    )}
                                                                                </td>
                                                                                <td
                                                                                    className=""
                                                                                    width={"20%"}
                                                                                >
                                                                                    {transDate
                                                                                        ? transDate
                                                                                        : moment(
                                                                                            createdAt
                                                                                        ).format(
                                                                                            "l"
                                                                                        )}
                                                                                    <OverlayTrigger
                                                                                        placement="right"
                                                                                        delay={{
                                                                                            show: 250,
                                                                                            hide: 400,
                                                                                        }}
                                                                                        overlay={
                                                                                            renderTooltip
                                                                                        }
                                                                                    >
                                                                                        <i
                                                                                            className="bi bi-download fs-5 px-3"
                                                                                            onClick={() =>
                                                                                                generateInvoice(
                                                                                                    ele
                                                                                                )
                                                                                            }
                                                                                        ></i>
                                                                                    </OverlayTrigger>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    {/* </span> */}

                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className="table-responsive-lg table-responsive-md table-responsive-sm">
                                                                        <table className="table  table-border">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Plan Id</td>
                                                                                    <td>Name</td>
                                                                                    <td>
                                                                                        Plan Amount
                                                                                    </td>
                                                                                    <td>
                                                                                        Mode of
                                                                                        Payment
                                                                                    </td>
                                                                                    <td>Status</td>
                                                                                    <td>Date</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        {
                                                                                            plan.planId
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {plan.name}
                                                                                    </td>
                                                                                    <td>
                                                                                        {plan.price}
                                                                                    </td>
                                                                                    <td>
                                                                                        {paymentMode ===
                                                                                            "null"
                                                                                            ? " ---- "
                                                                                            : paymentMode}
                                                                                    </td>
                                                                                    <td>
                                                                                        {getCommonDataStatusVal(
                                                                                            "paymentStatus",
                                                                                            status
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        {transDate
                                                                                            ? transDate
                                                                                            : moment(
                                                                                                createdAt
                                                                                            ).format(
                                                                                                "l"
                                                                                            )}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Discount (if
                                                                                        any)
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td>
                                                                                        {discountValue +
                                                                                            (discountType ===
                                                                                                10
                                                                                                ? "₹"
                                                                                                : "%")}
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Coupon (if
                                                                                        any)
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td className="text-success">
                                                                                        {
                                                                                            coupon?.amount
                                                                                        }
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Total
                                                                                        Payable
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td className="text-dark fs-5">
                                                                                        {amount}
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Fragment>
                                                    );
                                                })}
                                        </Accordion>
                                        {totalPage > 1 && (
                                            <Pagination
                                                initialPage={selectedPage}
                                                pageCount={totalPage}
                                                onPageChange={changePage}
                                            />
                                        )}
                                        <div>
                                            <div className="ver-steps1 pt-4">
                                                <ul className="pb-2">
                                                    <li>
                                                        Activated - We have received payment for
                                                        your order, and the order has been executed.
                                                    </li>
                                                    <li>
                                                        Payment Pending - We have recived your
                                                        order, but are still awating the payment.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Order;

// import { Fragment, useEffect, useState } from "react";
// import { Accordion, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
// import { commonService, profileService } from "../../core/services";
// import { connect, useSelector } from "react-redux";
// import { CONST, utils } from "../../core/helper";
// import Pagination from "components/common/pagination";
// import moment from "moment";
//

// const Order = () => {
//     const commonData = useSelector((state) => state?.common?.commonData);
//     const [orders, setOrders] = useState([]);
//     const [filter, setFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
//     const [totalPage, setTotalPage] = useState(0);
//     const [selectedPage, setSelectedPage] = useState(0);
//     const [respMsg, setRespMsg] = useState("");
//     const [initialLoad, setInitialLoad] = useState(true);

//     const getOrdersList = async () => {
//         filter.filter = {
//             status: [30, 40],
//         };
//         const resp = await profileService.getOrders(filter);
//         if (resp && resp?.meta.code == 200) {
//             const { data, pagination } = resp;
//             setOrders(data);
//             setTotalPage(
//                 Math.ceil(pagination.totalCount > 0 ? pagination.totalCount / filter.limit : 0)
//             );
//         } else if (resp && resp?.meta.code === 1021) {
//             setOrders(resp?.data);
//             setRespMsg(resp?.meta?.message);
//         }
//     };

//     const generateInvoice = async (values) => {
//         const { _id, orderId } = values;
//         const resp = await commonService.generateInvoice(_id);
//         if (resp && resp?.meta?.code === 200) {
//             fetch(resp?.data).then((response) => {
//                 response.blob().then((blob) => {
//                     // Creating new object of PDF file
//                     const fileURL = window.URL.createObjectURL(blob);
//                     // Setting various property values
//                     let link = document.createElement("a");
//                     link.href = fileURL;
//                     link.download = orderId + "-Invoice.pdf";
//                     link.click();
//                 });
//             });
//             utils.showSuccessMsg(resp?.meta?.message);
//         }
//     };

//     const getCommonDataStatusVal = (key, value) => {
//         const status = commonData && commonData[key]?.find((ele) => ele.code === value);
//         switch (status?.code) {
//             case 10:
//                 return (
//                     <button className="btn btn-secondary border-0 btn-sm">{status.label}</button>
//                 );
//             case 20:
//                 return <button className="btn btn-primary border-0 btn-sm">{status.label}</button>;
//             case 30:
//                 return <button className="btn btn-success border-0 btn-sm">{status.label}</button>;
//             case 40:
//                 return <button className="btn btn-danger border-0 btn-sm">{status.label}</button>;
//             case 50:
//                 return <button className="btn btn-warning border-0 btn-sm">{status.label}</button>;
//         }
//     };

//     const changePage = ({ selected }) => {
//         if (selected >= 0) {
//             setSelectedPage(selected);
//         }
//     };

//     useEffect(() => {
//         if(initialLoad && selectedPage <= 1)
//         {
//             setInitialLoad(false);
//             return;
//         }
//         else
//             setInitialLoad(false);

//         const skip = selectedPage >= 1 ? selectedPage * 10 : 0;
//         setFilter({
//             ...filter,
//             skip,
//         });
//     }, [selectedPage]);

//     useEffect(() => {
//         getOrdersList();
//     }, [filter]);

//     const renderTooltip = (props) => (
//         <Tooltip id="button-tooltip" {...props}>
//             Download Invoice
//         </Tooltip>
//     );

//     const [transDate, setTransDate] = useState("");

//     useEffect(() => {
//         if (orders && orders.length > 0) {
//             orders.map((ele) => {
//                 const { trans_date } = ele;
//                 if (trans_date !== undefined) {
//                     const formatTransDate = trans_date !== undefined && trans_date?.split("/");
//                     const [date, month, year = null] = formatTransDate;
//                     const newTransDate = date + "/" + month + new Date().getFullYear();
//                     setTransDate(newTransDate);
//                 } else {
//                     return false;
//                 }
//             });
//         }
//     }, [orders]);

//     return (
//         <>
//   <Row className="justify-content-center">
//                 <Col lg={12} md={12} className="mb-3 mt-5 pt-5" style={{ maxWidth: "1200px" }}>
//                     <Row>
//                         <Col lg={12}>
//                         <h4>My Orders</h4>
//                             <div className="db-nav">
//                                 <div className="db-nav-list">
//                                    <h4>Sorry!, your order is empty</h4>
//                                 </div>
//                             </div>
//                         </Col>

//                     </Row>
//                 </Col>
//             </Row>
//         </>
//     );
// };

// export default Order;
