import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MyAccountSettings from "components/common/my-account-settings";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { connect } from "react-redux";
import { profileService } from "core/services";
import { utils } from "core/helper";
import { reloadProfileAction } from "core/redux/account/account.action";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

// const privacyOptionSchema = Yup.object().shape({
//     privacyOption: Yup.object().shape({
//         displayName: Yup.string(),
//         phone: Yup.string().nullable(),
//         email: Yup.string().nullable(),
//         photo: Yup.string().nullable(),
//         dateOfBirth: Yup.string().nullable(),
//         annuelIncome: Yup.string().nullable(),
//         visitorSetting: Yup.string().nullable(),
//         profilePrivacy: Yup.string().nullable()
//     }),
// });

const Privacy = (props) => {
    const { token, commonData, authProfile, reloadProfileAction, reloadProfile } = props;

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = useForm();

    const [isPrivacyOptionEdit, setIsPrivacyOptionEdit] = useState(false);
    const [privacyData, setIsPrivacyData] = useState({});

    // useEffect(() => {
    //     if (!token) {
    //         router.push(CONST.LOGIN_PATH);
    //         return <Fragment>Need2 to Login to view this page</Fragment>;
    //     }
    // }, [token]);

    useEffect(() => {
        if (authProfile?.privacyOption) {
            getUserPrivacyOptions(authProfile?.privacyOption);
        }
    }, [authProfile]);

    const handlePrivacyEditToggle = () => setIsPrivacyOptionEdit(!isPrivacyOptionEdit);

    const getUserPrivacyOptions = async (privacyOption) => {
        setPrivacyOptionValues(privacyOption);
        setIsPrivacyData(privacyOption);
    };

    const setPrivacyOptionValues = (data) => {
        if (data) {
            const {
                annuelIncome,
                dateOfBirth,
                displayName,
                email,
                phone,
                photo,
                profilePrivacy,
                visitorSetting,
            } = data;
            setValue("privacyOption", {
                displayName,
                phone: phone?.toString(),
                email: email?.toString(),
                photo: photo?.toString(),
                dateOfBirth: dateOfBirth?.toString(),
                annuelIncome: annuelIncome?.toString(),
                visitorSetting: visitorSetting?.toString(),
                profilePrivacy: profilePrivacy?.toString(),
            });
        }
    };

    const privacyOptionSubmit = async (values) => {
        const { privacyOption } = values;
        const {
            displayName,
            phone,
            email,
            photo,
            annuelIncome,
            dateOfBirth,
            visitorSetting,
            profilePrivacy,
        } = privacyOption;
        const updateValues = {
            privacyOption: {
                displayName: displayName ? displayName : undefined,
                phone: phone ? phone : undefined,
                email: email ? email : undefined,
                photo: photo ? photo : undefined,
                annuelIncome: annuelIncome ? annuelIncome : undefined,
                dateOfBirth: dateOfBirth ? dateOfBirth : undefined,
                visitorSetting: visitorSetting ? visitorSetting : undefined,
                profilePrivacy: profilePrivacy ? profilePrivacy : undefined,
            },
        };
        const resp = await profileService.updateProfile(updateValues);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            handlePrivacyEditToggle();
            reloadProfileAction(!reloadProfile);
        }
    };

    const getFormatCommonValues = (key, value) => {
        if (commonData && value) {
            const data = commonData[key]?.find((ele) => ele.code.toString() === value.toString());
            return data ? data.label : " - ";
        }
        return "-";
    };

    const getPrivacySection = () => {
        return (
            <>
                <Fragment>
                    <div className="wrapper-te">
                        <div className="pr-bio-info mob">
                            <ul>
                                <li>
                                    <b>Display Name as:</b>
                                    {privacyData?.displayName ? privacyData?.displayName : " - "}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te" >
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Phone:</b>
                                    {getFormatCommonValues(
                                        "contactDisplayType",
                                        privacyData?.phone
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te">
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Email:</b>
                                    {getFormatCommonValues(
                                        "privacyEmailSetting",
                                        privacyData?.email
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te">
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Date of Birth:</b>
                                    {getFormatCommonValues("dateOfBirth", privacyData?.dateOfBirth)}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te">
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Annual Income:</b>
                                    {getFormatCommonValues(
                                        "annuelIncome",
                                        privacyData?.annuelIncome
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te">
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Visitors Setting:</b>
                                    {getFormatCommonValues(
                                        "visitorSetting",
                                        privacyData?.visitorSetting
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te">
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Photo:</b>
                                    {getFormatCommonValues(
                                        "privacyPhotoSetting",
                                        privacyData?.photo
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapper-te">
                        <div className="pr-bio-info">
                            <ul>
                                <li>
                                    <b>Profile Privacy:</b>
                                    {getFormatCommonValues(
                                        "profilePrivacy",
                                        privacyData?.profilePrivacy
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </Fragment>
            </>
        );
    };

    const getPrivacyFormSection = () => {
        if (commonData === undefined || commonData === null) {
            return "Form";
        }

        return (
            <>
                <Form onSubmit={handleSubmit(privacyOptionSubmit)}>
                    <Row className="account-sec-edit-bg p-3">
                        <Col md={12}>
                            <Row className="mb-4">
                                <Col md={3}>
                                    <Form.Label>Display Name</Form.Label>
                                </Col>
                                <Col md={6}>
                                    <Form.Control
                                        type="text"
                                        {...register("privacyOption.displayName")}
                                        className="px-2 py-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Form.Label>Phone</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.contactDisplayType.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.phone")}
                                                    value={ele.code}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Email</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.privacyEmailSetting.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.email")}
                                                    value={ele.code}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Photo</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.privacyPhotoSetting.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.photo")}
                                                    value={ele.code}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Date Of Birth</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.dateOfBirth.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.dateOfBirth")}
                                                    value={ele.code}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Annual Income</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.annuelIncome.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.annuelIncome")}
                                                    value={ele.code.toString()}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Visitor Setting</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.visitorSetting.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.visitorSetting")}
                                                    value={ele.code}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Profile Privacy</Form.Label>
                                </Col>
                                <Col md={8}>
                                    {commonData?.profilePrivacy.map((ele, ind) => (
                                        <Form.Check key={ind}>
                                            <Form.Check.Label>
                                                <Form.Check.Input
                                                    type="radio"
                                                    {...register("privacyOption.profilePrivacy")}
                                                    value={ele.code}
                                                />
                                                <i className="input-helper"></i>
                                                {ele.label}
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Button className="w-auto" disabled={isSubmitting} type="submit">
                            {" "}
                            Submit
                        </Button>
                        <Button
                            onClick={handlePrivacyEditToggle}
                            className="w-auto btn-danger mx-2"
                            type="submit"
                        >
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </>
        );
    };

    return (
        <>
<Head>
    <title>Privacy | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Manage your privacy on TrueFriend Christian Matrimony. Control who can view your profile and personal details, keeping your interactions secure within the Christian matrimonial community."
    />
    <meta
        name="keywords"
        content="Christian Matrimony,TrueFriend Matrimony, Christian Matrimonial Services, Privacy Settings, Profile Privacy, Data Protection, Personal Information Security, Faith-Based Matchmaking, Christian Singles, Trusted Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/privacy" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Privacy | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Manage your privacy on True Friend Christian Matrimony. Control who can view your profile and personal details while staying secure in the Christian matchmaking community."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/privacy" />


</Head>


            <section className="page-section-ptb4 pb-6 mt-4">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Row>
                            <Col xl={3} lg={4} md={12}>
                                <div className="db-nav">
                                    <div className="db-nav-list">
                                        <MyAccountSettings />
                                    </div>
                                </div>
                            </Col>
                            <Col xl={9} lg={8} md={12}>
                                <div className="db-nav">
                                    <div className="db-nav-list">
                                        <div className="d-flex justify-content-between">
                                            <h4>Privacy Options</h4>
                                            {/* <Button onClick={handlePrivacyEditToggle} className="h-25">
                                            Edit
                                        </Button> */}
                                            <button
                                                onClick={handlePrivacyEditToggle}
                                                className="cta-dark"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        {!isPrivacyOptionEdit
                                            ? getPrivacySection()
                                            : getPrivacyFormSection()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
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
        authProfile: state.account?.profile,
        reloadProfile: state.account?.reloadProfile,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);

// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import MyAccountSettings from "components/common/my-account-settings";
// import { Fragment, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { connect } from "react-redux";
// import { profileService } from "core/services";
// import { utils } from "core/helper";
// import { reloadProfileAction } from "core/redux/account/account.action";
//

// // const privacyOptionSchema = Yup.object().shape({
// //     privacyOption: Yup.object().shape({
// //         displayName: Yup.string(),
// //         phone: Yup.string().nullable(),
// //         email: Yup.string().nullable(),
// //         photo: Yup.string().nullable(),
// //         dateOfBirth: Yup.string().nullable(),
// //         annuelIncome: Yup.string().nullable(),
// //         visitorSetting: Yup.string().nullable(),
// //         profilePrivacy: Yup.string().nullable()
// //     }),
// // });

// const Privacy = (props) => {
//     const { token, commonData, authProfile, reloadProfileAction, reloadProfile } = props;

//     const {
//         register,
//         handleSubmit,
//         formState: { isSubmitting },
//         setValue,
//     } = useForm();

//     const [isPrivacyOptionEdit, setIsPrivacyOptionEdit] = useState(false);
//     const [privacyData, setIsPrivacyData] = useState({});

//     // useEffect(() => {
//     //     if (!token) {
//     //         router.push(CONST.LOGIN_PATH);
//     //         return <Fragment>Need2 to Login to view this page</Fragment>;
//     //     }
//     // }, [token]);

//     useEffect(() => {
//         if (authProfile?.privacyOption) {
//             getUserPrivacyOptions(authProfile?.privacyOption);
//         }
//     }, [authProfile]);

//     const handlePrivacyEditToggle = () => setIsPrivacyOptionEdit(!isPrivacyOptionEdit);

//     const getUserPrivacyOptions = async (privacyOption) => {
//         setPrivacyOptionValues(privacyOption);
//         setIsPrivacyData(privacyOption);
//     };

//     const setPrivacyOptionValues = (data) => {
//         if (data) {
//             const {
//                 annuelIncome,
//                 dateOfBirth,
//                 displayName,
//                 email,
//                 phone,
//                 photo,
//                 profilePrivacy,
//                 visitorSetting,
//             } = data;
//             setValue("privacyOption", {
//                 displayName,
//                 phone: phone?.toString(),
//                 email: email?.toString(),
//                 photo: photo?.toString(),
//                 dateOfBirth: dateOfBirth?.toString(),
//                 annuelIncome: annuelIncome?.toString(),
//                 visitorSetting: visitorSetting?.toString(),
//                 profilePrivacy: profilePrivacy?.toString(),
//             });
//         }
//     };

//     const privacyOptionSubmit = async (values) => {
//         const { privacyOption } = values;
//         const {
//             displayName,
//             phone,
//             email,
//             photo,
//             annuelIncome,
//             dateOfBirth,
//             visitorSetting,
//             profilePrivacy,
//         } = privacyOption;
//         const updateValues = {
//             privacyOption: {
//                 displayName: displayName ? displayName : undefined,
//                 phone: phone ? phone : undefined,
//                 email: email ? email : undefined,
//                 photo: photo ? photo : undefined,
//                 annuelIncome: annuelIncome ? annuelIncome : undefined,
//                 dateOfBirth: dateOfBirth ? dateOfBirth : undefined,
//                 visitorSetting: visitorSetting ? visitorSetting : undefined,
//                 profilePrivacy: profilePrivacy ? profilePrivacy : undefined,
//             },
//         };
//         const resp = await profileService.updateProfile(updateValues);
//         if (resp && resp.meta.code === 200) {
//             utils.showSuccessMsg(resp.meta.message);
//             handlePrivacyEditToggle();
//             reloadProfileAction(!reloadProfile);
//         }
//     };

//     const getFormatCommonValues = (key, value) => {
//         if (commonData && value) {
//             const data = commonData[key]?.find((ele) => ele.code.toString() === value.toString());
//             return data ? data.label : " - ";
//         }
//         return "-";
//     };

//     const getPrivacySection = () => {
//         return (
//             <>

//             </>
//         );
//     };

//     const getPrivacyFormSection = () => {
//         if (commonData === undefined || commonData === null) {
//             return "Form";
//         }

//         return (
//             <>

//                 <Form onSubmit={handleSubmit(privacyOptionSubmit)}>
//                     <Row className="account-sec-edit-bg p-3">
//                         <Col md={12}>
//                             <Row>
//                                 <Col md={3}>
//                                     <Form.Label>Display Name</Form.Label>
//                                 </Col>
//                                 <Col md={6}>
//                                     <Form.Control
//                                         type="text"
//                                         {...register("privacyOption.displayName")}
//                                         className="px-2 py-1"
//                                     />
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col md={3}>
//                                     <Form.Label>Phone</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.contactDisplayType.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.phone")}
//                                                     value={ele.code}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                             <Row className="mt-2">
//                                 <Col md={3}>
//                                     <Form.Label>Email</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.privacyEmailSetting.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.email")}
//                                                     value={ele.code}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                             <Row className="mt-2">
//                                 <Col md={3}>
//                                     <Form.Label>Photo</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.privacyPhotoSetting.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.photo")}
//                                                     value={ele.code}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                             <Row className="mt-2">
//                                 <Col md={3}>
//                                     <Form.Label>Date Of Birth</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.dateOfBirth.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.dateOfBirth")}
//                                                     value={ele.code}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                             <Row className="mt-2">
//                                 <Col md={3}>
//                                     <Form.Label>Annual Income</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.annuelIncome.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.annuelIncome")}
//                                                     value={ele.code.toString()}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                             <Row className="mt-2">
//                                 <Col md={3}>
//                                     <Form.Label>Visitor Setting</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.visitorSetting.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.visitorSetting")}
//                                                     value={ele.code}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                             <Row className="mt-2">
//                                 <Col md={3}>
//                                     <Form.Label>Profile Privacy</Form.Label>
//                                 </Col>
//                                 <Col md={8}>
//                                     {commonData?.profilePrivacy.map((ele, ind) => (
//                                         <Form.Check key={ind}>
//                                             <Form.Check.Label>
//                                                 <Form.Check.Input
//                                                     type="radio"
//                                                     {...register("privacyOption.profilePrivacy")}
//                                                     value={ele.code}
//                                                 />
//                                                 <i className="input-helper"></i>
//                                                 {ele.label}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                     ))}
//                                 </Col>
//                             </Row>
//                         </Col>
//                         <Button className="cta-dark w-auto" disabled={isSubmitting} type="submit" style={{border:"none"}}>
//                             {" "}
//                             Submit
//                         </Button>
//                         <Button
//                             onClick={handlePrivacyEditToggle}
//                             className="cta-dark w-auto btn-danger mx-2"
//                             type="submit"
//                         >
//                             Cancel
//                         </Button>
//                     </Row>
//                 </Form>
//             </>
//         );
//     };

//     return (
//         <>
//             <section>
//                 <div className="db">
//                     <Container>
//                         <Row>
//                             <Col md={3}>
//                                 <div className="db-nav">
//                                     <div className="db-nav-list">

//                                         <MyAccountSettings />
//                                     </div>
//                                 </div>
//                             </Col>
//                                <Col md={9}>
//                                 <div className="db-nav">
//                                     <div className="db-nav-list">
//                                         <h4>Privacy Options</h4>
//                                         <ol className="poi poi-date p-1">
//                                             <li><span className="highlight">Display Name as:</span>{privacyData?.displayName ? privacyData?.displayName : " - "} </li>
//                                             <li><span className="highlight">Phone:</span>  {getFormatCommonValues("contactDisplayType", privacyData?.phone)}</li>
//                                             <li><span className="highlight">Email:</span> {getFormatCommonValues("privacyEmailSetting", privacyData?.email)}</li>
//                                             <li><span className="highlight">Date of Birth:</span> {getFormatCommonValues("dateOfBirth", privacyData?.dateOfBirth)}</li>
//                                             <li><span className="highlight">Annual Income:</span> {getFormatCommonValues("annuelIncome", privacyData?.annuelIncome)}</li>
//                                             <li><span className="highlight">Visitors Setting:</span>  {getFormatCommonValues("visitorSetting", privacyData?.visitorSetting)}</li>
//                                             <li><span className="highlight">Photo:</span>                         {getFormatCommonValues("privacyPhotoSetting", privacyData?.photo)}</li>
//                                             <li><span className="highlight">Profile Privacy:</span>    {getFormatCommonValues("profilePrivacy", privacyData?.profilePrivacy)} </li>
//                                         </ol>
//                                         <div className="db-int-pro-3" style={{ float: "right", marginTop: "-250px" }}>
//                                             <a href="#"   onClick={handlePrivacyEditToggle} className="cta-dark">Edit</a>
//                                         </div>
//                                         {!isPrivacyOptionEdit
//                                         ? getPrivacySection()
//                                         : getPrivacyFormSection()}
//                                     </div>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </div>
//             </section>
//         </>
//     );
// };

// const mapStateToProps = (state) => {
//     return {
//         commonData: state?.common?.commonData,
//         token: state.account?.token,
//         authProfile: state.account?.profile,
//         reloadProfile: state.account?.reloadProfile,
//     };
// };

// const mapDispatchToProps = {
//     reloadProfileAction,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
