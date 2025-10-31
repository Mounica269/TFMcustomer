import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { commonService, masterService, profileService } from "core/services";
import React, { Fragment, useEffect, useState } from "react";
import { COUPON_ISVALID, CREATE_PAYMENT, PLANS_PATH } from "core/services/apiURL.service";
import { CONST, utils } from "core/helper";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { profileAction } from "core";

import dynamic from 'next/dynamic';
import BreadCrumb from "components/common/breadcrumb";
import Link from "next/link";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

let validCoupon = "";
let isCouponValid = false;

const couponSchema = Yup.object().shape({
    couponCode: Yup.string()
        .test("checkCoupon", CONST.MSG.INVALID_COUPON, async (value) => {
            if (value && validCoupon !== value) {
                const resp = await masterService.isValid({ couponCode: value });
                validCoupon = value;
                isCouponValid = resp?.data ? true : false;
            }
            return isCouponValid;
        })
        .required("Coupon code is required"),
});

const Plan = (props) => {

    const { token, commonData, authProfile, profileAction } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(couponSchema),
    });

    const router = useRouter();
    const [plans, setPlans] = useState([]);
    const [applyPlanId, setApplyPlanId] = useState(false);
    const [isCouponAvailable, setIsCouponAvailable] = useState(false);
    const [isCouponValue, setIsCouponValue] = useState(false);
    const [couponResp, setCouponResp] = useState(null);
    const [totalAmount, setTotalAmount] = useState("");
    const [afterCouponAmount, setAfterCouponAmount] = useState();
    const [planFilter] = useState({ ...CONST.PLAN_FILTER });
    const [modelShow, setModelShow] = useState(false);
    const [planId, setPlanId] = useState("");
    const [apiLoad, setApiLoad] = useState(false);

    const [isSamePlan, setIsSamePlan] = useState(false);
    const [isNewPlan, setIsNewPlan] = useState(false);
    const [isCountPending, setIsCountPending] = useState(false);
    const [isContactViewPendingCount, setIsContactViewPendingCount] = useState("");
    const [isNewPlanNoOfContactView, setIsNewPlanNoOfContactView] = useState("");
    const [modelTitle, setModelTitle] = useState("");

    const handleSubscibeShow = () => {
        setModelShow(true);
        setModelTitle("Plan Subscription");
    };

    const handleSubscibeClose = () => {
        setModelShow(false);
        setPlanId("");
        setIsSamePlan(false);
    };

    const handleConfiramtion = (planId, planName) => {
        // console.log("planName::", planName);
        // console.log("planName::", authProfile?.subscription?.planName);
        if (
            planName === authProfile?.subscription?.planName ||
            planName !== authProfile?.subscription?.planName
        ) {
            const balanceCount =
                authProfile?.subscription?.noOfContactsToView -
                authProfile?.subscription?.contactsViewed;
            setPlanId(planId);
            handleSubscibeShow();
            setIsContactViewPendingCount(balanceCount);
            setPlanId(planId);
            handleSubscibeShow();
            setIsSamePlan(true);
            setIsNewPlan(false);
            setIsCountPending(false);
        }

        // if (
        //     planName !== authProfile?.subscription?.planName &&
        //     authProfile?.subscription?.contactsViewed <
        //         authProfile?.subscription?.noOfContactsToView
        // ) {
        //     const balanceCount =
        //         authProfile?.subscription?.noOfContactsToView -
        //         authProfile?.subscription?.contactsViewed;
        //     setPlanId(planId);
        //     handleSubscibeShow();
        //     setIsContactViewPendingCount(balanceCount);
        //     setIsNewPlan(false);
        //     setIsSamePlan(false);
        //     setIsCountPending(true);
        // }

        if (authProfile?.prevContactViewPending === 0) {
            setPlanId(planId);
            handleSubscibeShow();
            setIsNewPlan(true);
            setIsContactViewPendingCount("");
            setIsSamePlan(false);
            setIsCountPending(false);
        }
    };

    const handleSubscription = async () => {
        const payload = {
            planId: planId,
            couponId: couponResp ? couponResp?.couponCode : undefined,
        };
        const resp = await masterService.postFilter(CREATE_PAYMENT, payload);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp?.meta?.message);
            router.push(resp?.data);
        } else {
            utils.showErrMsg(resp?.meta?.message);
            return false;
        }
    };

    const handleChangeCoupon = (e) => {
        const { value } = e.target;
        if (value !== "") {
            setIsCouponValue(true);
        } else {
            setIsCouponValue(false);
        }
    };

    const handleApplyCoupon = (id) => {
        setIsCouponAvailable(true);
        const plansIdx = plans?.findIndex((ele) => ele._id === id);
        if (plans[plansIdx]?._id === id) {
            setApplyPlanId(plans[plansIdx]?._id);
            reset();
            setAfterCouponAmount("");
            setIsCouponAvailable(true);
            setCouponResp(null);
            setIsCouponValue(false);
        }
    };

    const counponOnSubmit = async (values) => {
        const resp = await masterService.postFilter(COUPON_ISVALID, values);
        if (resp && resp?.meta.code === 200) {
            const { meta, data } = resp;
            if (data) {
                utils.showSuccessMsg(meta.message);
                setIsCouponAvailable(false);
                setCouponResp(data);
                setAfterCouponAmount(data.amount);
            } else if (data === false) {
                utils.showErrMsg("Invalid coupon");
            }
        }
    };

    const getCalculateDiscountAmount = (price, discountAmount, discountType) => {
        if (discountType === 10) {
            return price - discountAmount;
        } else {
            const discountVal = (discountAmount / 100) * price;
            return Math.round(price - discountVal);
        }
    };

    const getCalculateTotalAmount = (price, discountAmount, discountType) => {
        let finalAmount;
        if (discountType === 10) {
            finalAmount = price - discountAmount - afterCouponAmount;
        } else if (discountType !== 10) {
            const discountVal = (discountAmount / 100) * price;
            finalAmount = Math.round(price - discountVal) - afterCouponAmount;
        }
        return finalAmount;
    };

    useEffect(() => {
        if (couponResp) {
            plans.map((ele) => {
                const { price, discountValue, discountType } = ele;
                if (discountType === 10) {
                    const finalAmount = price - discountValue - afterCouponAmount;
                    setTotalAmount(finalAmount);
                } else {
                    const discountVal = (discountValue / 100) * price;
                    const finalAmount = Math.round(price - discountVal) - afterCouponAmount;
                    setTotalAmount(finalAmount);
                }
            });
        }
    }, [couponResp]);

    useEffect(() => {
        async function loadProfile() {
            const resp = await profileService.getProfile();
            if (resp && resp?.meta?.code === 200) {
                profileAction(resp.data);
            }
        }
        loadProfile();
    }, []);

    useEffect(() => {
        if (token) {
            const loadPlans = async () => {
                setApiLoad(true);
                const resp = await masterService.getAll(PLANS_PATH + "/filter", planFilter);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    setPlans(data);
                    // let finalAmount;
                    // data.map((ele) => {
                    //     const { price, discountValue, discountType } = ele;
                    //     if (discountType === 10) {
                    //         const finalAmount = price - discountValue - afterCouponAmount;
                    //         setTotalAmount(finalAmount);
                    //     } else {
                    //         const discountVal = (discountValue / 100) * price;
                    //         const finalAmount = Math.round(price - discountVal) - afterCouponAmount;
                    //         setTotalAmount(finalAmount);
                    //     }
                    // });
                    setApiLoad(false);
                } else {
                    setApiLoad(false);
                }
            };
            loadPlans();
        }
    }, [token]);

    const getCommonDataVal = (key, val) => {
        const data = commonData?.[key]?.find((ele) => ele.code === val);
        return data ? data?.label : "";
    };

    useEffect(() => {
        let navigationStep = "";
        switch (authProfile?.completedSteps) {
            case null:
                navigationStep = "?nav=step1";
                break;
            case 10:
                navigationStep = "?nav=step2";
                break;
            case 20:
                navigationStep = "?nav=step3";
                break;
            default:
                return;
        }
        utils.showErrMsg("Please complete your profile");
        router.push(CONST.PROFILE_COMPLETION_PATH + navigationStep);
    }, [authProfile]);

    return (
        <>

        <Head>
  <title>
  Plans | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
  </title>

  <meta
    name="description"
    content="Find the best Christian matrimony membership plans at True Friend Matrimony. Access verified profiles, advanced search, Tamil & Kerala Christian matches, and personalized matchmaking. Upgrade today!"
  />
  <meta
    name="keywords"
    content="Christian Matrimony, Christian Matrimony Plans, Christian Matrimonial Membership, Christian Brides and Grooms, Tamil Christian Matrimony, Kerala Christian Matrimony, Affordable Matrimony Plans, Verified Christian Matches, Premium Christian Matchmaking"
  />
  <link rel="canonical" href="https://truefriendmatrimony.com/plans" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/plans" />
  <meta property="og:title" content="Christian Matrimony Plans - True Friend Matrimony" />
  <meta
    property="og:description"
    content="Upgrade your Christian matrimony membership to access verified Christian brides & grooms, Tamil & Kerala Christian profiles, and premium matchmaking features."
  />

 
</Head>


            <Fragment>
                {/* Plans Banner Section */}
                <section className="page-section-ptb2">
                    <div className="plans-ban">
                        <div className="container">
                            <div className="row">
                                <span className="pri">Pricing</span>
                                <h1>Get Started <br /> Pick your Plan Now</h1>
                                <p>Upgrade now and enjoy Premium benefits for up to 4 weeks!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Plans Section */}
                <section className="plans-main">

                    <div className="container">
                        {apiLoad && <h3 className="text-center">Loading</h3>}
                        {authProfile && !apiLoad && (
                            <div className="row justify-content-center">
                                {plans.length > 0 ? (
                                    <>
                                        {plans.map((plan, ind) => {
                                            const {
                                                _id: planId,
                                                name,
                                                price,
                                                validity,
                                                defaultDiscount,
                                                noOfProfileView,
                                                noOfContactsToView,
                                                discountValue,
                                                discountType,
                                                isPremiumPlan,
                                            } = plan;
                                            const no_of_months = validity / 30;
                                            const per_month_amt = price / no_of_months;

                                            return (
                                                // <li key={ind}>
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-2" key={ind}>

                                                    <div className="pri-box">
                                                        <h2>{name}</h2>
                                                        {discountValue > 0 && (
                                                            <p>
                                                                {discountType === 10 && (
                                                                    <i className="fa fa-inr discount_flat_inr"></i>
                                                                )}
                                                                {discountValue > 0 && discountValue}
                                                                {discountType !== 10 && "%"}
                                                            </p>
                                                        )}
                                                        {discountValue > 0 && (
                                                            <p>
                                                                <i className="fa fa-inr"></i> {price}
                                                            </p>
                                                        )}
                                                        <h3>
                                                            <i className="fa fa-inr mx-1"></i>
                                                            {getCalculateDiscountAmount(
                                                                price,
                                                                discountValue,
                                                                discountType
                                                            )}
                                                        </h3>
                                                        <h6 className="mt-2">       {applyPlanId === planId ? (
                                                            <Form
                                                                onSubmit={handleSubmit(
                                                                    counponOnSubmit
                                                                )}
                                                            >
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        placeholder=" Coupon code"
                                                                        {...register("couponCode")}
                                                                        className="px-2 py-0 m-0"
                                                                        onChange={
                                                                            handleChangeCoupon
                                                                        }
                                                                        disabled={
                                                                            couponResp !== null
                                                                        }
                                                                    />
                                                                    {isCouponValue ? (
                                                                        <Button
                                                                            variant="outline-secondary"
                                                                            type="submit"
                                                                            disabled={
                                                                                couponResp !== null
                                                                            }
                                                                        >
                                                                            Apply
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            variant="outline-danger"
                                                                            onClick={() => {
                                                                                setIsCouponAvailable(
                                                                                    false
                                                                                );
                                                                                setApplyPlanId(
                                                                                    null
                                                                                );
                                                                            }}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                    )}
                                                                </InputGroup>
                                                                <span className="text-danger text-start">
                                                                    {errors.couponCode?.message}
                                                                </span>

                                                                {couponResp !== null && (
                                                                    <p className="final_amount">
                                                                        You have to pay{" "}
                                                                        <span>
                                                                            {/* {price - afterCouponAmount} */}
                                                                            ₹
                                                                            {getCalculateTotalAmount(
                                                                                price,
                                                                                discountValue,
                                                                                discountType
                                                                            )}
                                                                        </span>{" "}
                                                                    </p>
                                                                )}
                                                            </Form>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleApplyCoupon(planId)
                                                                }
                                                                className="border-0 bg-transparent"
                                                            >
                                                                Apply Coupon
                                                            </button>
                                                        )}</h6>

                                                        <a className="cta" onClick={() => {
                                                            handleConfiramtion(planId, name);
                                                            setIsNewPlanNoOfContactView(
                                                                noOfContactsToView
                                                            );
                                                        }}
                                                            disabled={isCouponAvailable}> Continue</a>




                                                        <ol>
                                                            {isPremiumPlan && (
                                                                <li>
                                                                    <i className="fa fa-check"></i> Send
                                                                    Unlimited Messages
                                                                </li>
                                                            )}
                                                            <li>    <i className="fa fa-check"></i> View{" "}
                                                                {/* {noOfProfileView} */}
                                                                detailed profiles</li>
                                                            {/* <li><i className="fa fa-check" aria-hidden="true"></i> Browse profiles at TFM premises</li> */}
                                                            <li><i className="fa fa-check"></i> Carry forward</li>
                                                            <li> <i className="fa fa-check"></i> View up to{" "}
                                                                {noOfContactsToView} contact numbers</li>
                                                            <li>
                                                                <i className="fa fa-check"></i> Let Matches
                                                                contact you directly
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-check"></i>Contact
                                                                matches directly
                                                            </li>
                                                            {/* <li className="text-left">
                                    <i className="fa fa-check"></i> Standout from other
                                    Profiles
                                </li> */}

                                                            <li>
                                                                <i className="fa fa-check"></i> Profile
                                                                validity{" "}
                                                                {getCommonDataVal(
                                                                    "planValidityList",
                                                                    validity
                                                                )}
                                                            </li>

                                                        </ol>
                                                    </div>
                                                    <Modal
                                                        show={modelShow}
                                                        onHide={handleSubscibeClose}
                                                        backdrop="static"
                                                        keyboard={false}
                                                        className="p-0"
                                                    >
                                                        <Modal.Header closeButton>
                                                            <h4>{modelTitle}</h4>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {isSamePlan && (
                                                                <Fragment>
                                                                    <i className="bi bi-exclamation-triangle custome_warning"></i>
                                                                    <b className="fs-5 d-flex text-center my-2">
                                                                        {/* Your current plan is same also. and you have
                                        remaining to see ({isContactViewPendingCount}){" "}
                                        contacts would be carried forward to the next subscription period. are you sure want to
                                        continue */}
                                                                        You have {isContactViewPendingCount} unused
                                                                        contact views from the initial{" "}
                                                                        {isNewPlanNoOfContactView} contacts would be
                                                                        carried forward to the next subscription period.
                                                                    </b>
                                                                </Fragment>
                                                            )}
                                                            {isNewPlan && (
                                                                <Fragment>
                                                                    <i className="bi bi-check-circle custome_success" style={{ fontSize: "60px", color: "green", marginLeft: "210px" }}></i>
                                                                    <b className="fs-5 d-flex justify-content-center text-center my-2">
                                                                        You want to buy this plan ?
                                                                    </b>
                                                                </Fragment>
                                                            )}
                                                            {isCountPending && (
                                                                <Fragment>
                                                                    <i className="bi bi-check-circle custome_success"></i>
                                                                    <b className="fs-5 d-flex justify-content-center text-center my-2">
                                                                        You have remaining to see (
                                                                        {isContactViewPendingCount}) contact for view.
                                                                        so you want to skip the contacts for buy
                                                                        selected plan ?
                                                                    </b>
                                                                </Fragment>
                                                            )}
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <div className="d-flex jusfify-content-end">
                                                                <button
                                                                    className="cta-dark"
                                                                    onClick={handleSubscription}
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button
                                                                    onClick={handleSubscibeClose}
                                                                    className="cta-dark"
                                                                    style={{ marginLeft: "5px" }}
                                                                >
                                                                    No
                                                                </button>
                                                            </div>
                                                        </Modal.Footer>
                                                    </Modal>

                                                    {/* </li> */}
                                                </div>

                                            );
                                        })}
                                    </>
                                ) : (
                                    <h1 className="text-center text-light">No plans available</h1>
                                )}
                            </div>

                        )}
                    </div>
                </section>
            </Fragment>

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state?.account?.profile,
    };
};

const mapDispatchToProps = {
    profileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
// const ConnectedPlan = connect(mapStateToProps, mapDispatchToProps)(Plan);

// export default dynamic(() => Promise.resolve(ConnectedPlan), { ssr: false });


