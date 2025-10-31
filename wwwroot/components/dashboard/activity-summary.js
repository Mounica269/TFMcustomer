

import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { connect, useSelector } from "react-redux";
import ModalCommon from "components/common/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Required from "components/common/required";
import { CONST, utils, commonService, reloadProfileAction, profileService } from "core";
import MaleImage from "../../public/frontend/images/male.jpg";
import Head from "next/head";


const MAX_FILE_SIZE = 102400;

const validFileExtensions = { proof: ["jpg", "jpeg", "pdf"] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1;
}

function getAllowedExt(type) {
    console.log("type::", type);
    return validFileExtensions[type].map((e) => `.${e}`).toString();
}

const validationSchema = Yup.object().shape({
    proofType: Yup.string().label(CONST.MSG.PROOF_TYPE).required(),
    proof: Yup.mixed().test("proof", CONST.MSG.REQ_PROOF_IMAGE, (file) => {
        return file ? true : false;
    }),
    //pravin
    // .required("Required")
    // .test("is-valid-size", "The file is too large", (value) => {
    //     console.log("value.size::", value[0]?.size);
    //     return !value || (value && value[0]?.size <= MAX_FILE_SIZE);
    // })
    // .test(
    //     "is-valid-type",
    //     "Only the following formats are accepted: .jpeg, .jpg and .pdf",
    //     (value) => {
    //         return (
    //             value &&
    //             (value[0]?.type === "image/jpg" ||
    //                 value[0]?.type === "image/jpeg" ||
    //                 value[0]?.type === "application/pdf")
    //         );
    //     }
    // ),

    //vijay
    // .required("Required")
    // .test("is-valid-type", "Not a valid image type", (value) =>
    //     isValidFileType(value && value.name?.toLowerCase(), "proof")
    // )
    // .test("is-valid-size", "Max allowed size is 100KB", (value) => {
    //     value && value.size <= MAX_FILE_SIZE;
    //     console.log("value.size::", value.size);
    // }),
});

const ActivitySummary = (props) => {
    const fileRef = useRef();
    const { reloadProfileAction } = props;
    const [profileDash, setProfileDash] = useState(null);
    const authProfile = useSelector((state) => state?.account?.profile);
    const reloadProfile = useSelector((state) => state.account?.reloadProfile);
    const commonData = useSelector((state) => state.common?.commonData);

    const [modelTitle] = useState("Improve your profile by uploading you Government Identity");
    const [show, setShow] = useState(false);

    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);
    const [proofType, setProofType] = useState(null);
    const [imgSrc, set_imgSrc] = useState(MaleImage);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = () => {
        setShow(false);
        reset();
    };

    const loadProfileDash = async () => {
        const resp = await profileService.getProfileDash();
        if (resp && resp.meta.code === 200) {
            const { meta, data } = resp;
            setProfileDash(meta.code === 200 ? data : {});
        }
    };

    useEffect(() => {
        loadProfileDash();
    }, []);

    useEffect(() => {
        setProofType(commonData?.proofDocTypes);
    }, [commonData]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(validationSchema) });
    console.log("errors::", errors);

    const handleChange = (e) => {
        const file = e.target?.files[0];
        // getAllowedExt("proof");
        setValue("proof", file, { shouldValidate: true });
    };

    const onSubmit = async (values) => {
        console.log("values::", values);
        const { proof, proofType } = values;
        console.log("proof::", proof);

        setIsUploaded(true);
        const formData = new FormData();
        formData.append("type", 40);
        formData.append("code", 30);
        formData.append("images", values.proof);
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
        };

        const resp = await commonService.uploadGovernmentIdentity(formData, options);
        setUploadPercentage((uploadPercentage = 100), () => {
            setTimeout(() => {
                setUploadPercentage((uploadPercentage = 0));
            }, 1000);
        });
        if (resp && resp.meta.code === 200) {
            setIsUploaded(false);
            setUploadPercentage(0);
            handleHide();
            reloadProfileAction(!reloadProfile);
            utils.showSuccessMsg(CONST.PROFILE_PROOF_IMAGE_UPDATE);
        } else {
            setIsUploaded(false);
        }
    };

    return (
        <>
            <Head>
                {/* SEO */}
                <title> TrueFriend Matrimony | Your Activity Summary  </title>
                <meta name="description" content="View your profile activity summary on including pending invitations, accepted invitations, recent visitors, and chat history on TrueFriend Matrimony - the most trusted Christian Matrimony platform in India. Check your pending invitations, accepted invitations, recent visitors, and chat history safely."
     />
                <meta name="keywords"content="Christian Matrimony, Christian Matrimony India, Activity Summary Matrimony, Christian Matchmaking, Verified Christian Matrimony, Christian Brides and Grooms, Matrimony Dashboard, Faith-Based Matrimony Platform, Christian Marriage Invitations, Matrimony Profile Updates" />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="TrueFriend Matrimony | Your Activity Summary" />
                <meta property="og:description" content="View your profile activity summary including pending invitations, accepted invitations, recent visitors, and chat history on TrueFriend Matrimony - the trusted Christian Matrimony platform." />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony" />

            </Head>


            <Col xl={12} lg={12} md={12} sm={12} className="pt-4 mb-1">
                <h5>Your Activity Summary</h5>

                <Row>
                    {/* Column 1 */}
                    <Col xl={4} lg={4} md={6} sm={12}>


                        <div class="db-pro-stat">
                            <div class="db-inte-prof-list db-inte-prof-chat">
                                <ul>
                                    <Link href={CONST.INBOX_RECEIVED_PATH}>
                                        <a >
                                            <li>
                                                <div class="db-int-pro-2 p-2">
                                                    <h1>{profileDash?.invitationPending || 0}</h1>
                                                    <h5>Pending Invitations</h5>  </div>
                                            </li>
                                        </a>
                                    </Link>
                                </ul>
                            </div>
                        </div>

                    </Col>

                    {/* Column 2 */}
                    <Col xl={4} lg={4} md={6} sm={12} >


                        <div class="db-pro-stat">
                            <div class="db-inte-prof-list db-inte-prof-chat">
                                <ul>
                                    <Link href={CONST.INBOX_ACCEPTED_PATH}>
                                        <a >
                                            <li>
                                                <div class="db-int-pro-2 p-2">
                                                    <h1>{profileDash?.invitationAccept || 0}</h1>
                                                    <h5>Accepted Invitations</h5>  </div>
                                            </li>
                                        </a>
                                    </Link>
                                </ul>
                            </div>
                        </div>

                    </Col>

                    {/* Column 3 */}
                    <Col xl={4} lg={4} md={6} sm={12}>


                        <div class="db-pro-stat">
                            <div class="db-inte-prof-list db-inte-prof-chat">
                                <ul><Link href={CONST.MATCH_RECENTLY_VISITORS_PATH}>
                                    <a >
                                        <li>
                                            <div class="db-int-pro-2 p-2">
                                                <h1>{profileDash?.recentlyVistors || 0}</h1>
                                                <h5>Recent Visitors</h5>  </div>
                                        </li>
                                    </a>
                                </Link>
                                </ul>
                            </div>
                        </div>

                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12}>

                        <div className="db-pro-stat">
                            <div className="db-inte-prof-list db-inte-prof-chat">
                                <ul>
                                    <li>
                                        <div className="db-int-pro-2 p-3">

                                            <h5 className="align-item-center ">
                                                {authProfile?.plan?.name === "Free Plan"
                                                    ? "For premium members only"
                                                    : `Your ${utils.firstCaps(authProfile?.plan?.name)} Activity`}
                                            </h5>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </Col>
                    {authProfile?.plan?.planId === "PLAN0" && (
                        <Col xl={4} lg={4} md={6} sm={12}>

                            <div className="db-pro-stat">
                                <div className="db-inte-prof-list db-inte-prof-chat">
                                    <ul>
                                        <a href={CONST.MATCH_RECENTLY_VISITORS_PATH}>
                                            <li>
                                                <div className="db-int-pro-2 p-2">
                                                    <h1>0/0</h1>
                                                    <h5>Contact Viewed</h5>
                                                </div>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>

                        </Col>
                    )}
                    {authProfile?.plan?.planId !== "PLAN0" && (
                        <Col xl={4} lg={4} md={6} sm={12}>

                            <div className="db-pro-stat">
                                <div className="db-inte-prof-list db-inte-prof-chat">
                                    <ul>
                                        <li>
                                            <div className="db-int-pro-2 p-2">
                                                <h1>  {profileDash?.contactView}
                                                    {" / "}
                                                    {profileDash?.totalContactsView}</h1>
                                                <h5>Contacts Viewed</h5>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </Col>



                    )}
                    {authProfile?.plan?.planId !== "PLAN0" && (
                        <Col xl={4} lg={4} md={6} sm={12}>

                            <div className="db-pro-stat">
                                <div className="db-inte-prof-list db-inte-prof-chat">
                                    <ul>
                                        <a href={CONST.INBOX_SENT_PATH}>
                                            <li>
                                                <div className="db-int-pro-2 p-2">
                                                    <h1>{profileDash?.chatCount || 0}</h1>
                                                    <h5>Chats Initiated</h5>
                                                </div>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>

                        </Col>



                    )}
                </Row>




                <Row>
                    <Col md={12} className=" mt-3">
                        <h5>Improve Your Profile</h5>
                        {authProfile?.proof && authProfile?.proof?.images && authProfile?.proof?.images.length > 0 ? (
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text text-center">
                                        Congratulations! Your account has been verified successfully.
                                        You now have access to all the exciting features and benefits.
                                        Feel free to explore and make the most of your enhanced profile!
                                    </p>
                                </div>
                            </div>
                        ) : (

                            <div className="db-pro-stat">
                                <div className="db-inte-prof-list db-inte-prof-chat">
                                    <ul>
                                        <li>
                                            <div className="db-int-pro-2 text-center pt-4">
                                                <h5>Enhance your profile by securely submitting the required documents.</h5>
                                                <a href="#"

                                                    data-bs-toggle="modal"
                                                    data-bs-target="#plancancel"
                                                    className="cta-dark mt-2"
                                                    onClick={handleShow}
                                                >
                                                    Verify Now
                                                </a>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        )}


                    </Col>
                </Row>

            </Col>


            <div class="modal fade plncanl-pop" id="plancancel">
                <div class="modal-dialog modal-md">
                    <div class="modal-content ">


                        <div class="modal-header">
                            <h4 class="modal-title seninter-tit">Improve your profile by uploading you Government Identity</h4>
                            <button type="button" class="close btn-sm" data-bs-dismiss="modal">&times;</button>
                        </div>


                        <div class="modal-body seninter chosenini">
                            <div class="row">

                                <div class="col-md-10 rhs-form">
                                    <div class="form-login">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div class="form-group">
                                                <label class="lb">Proof Type: *</label>
                                                <Form.Select {...register("proofType")}>
                                                    <option value={""}>Select</option>
                                                    {proofType &&
                                                        proofType.map((ele, ind) => (
                                                            <option key={ind} value={ele.code}>
                                                                {ele.name}
                                                            </option>
                                                        ))}
                                                </Form.Select>
                                            </div>
                                            <div class="form-group">
                                                <label class="lb">Proof: *</label>
                                                <Form.Control
                                                    {...register("proof")}
                                                    type="file"
                                                    onChange={(e) => handleChange(e)}
                                                    accept=".jpg, .jpeg, .pdf"
                                                    ref={fileRef}
                                                />
                                            </div>
                                            <div>
                                                <strong>
                                                    <u className="text-secondary">Note:</u>
                                                </strong>
                                            </div>

                                            <span>
                                                Size must be less than 1 MB and in jpg, jpeg
                                                or pdf .
                                            </span>


                                            <button type="submit" disabled={isSubmitting} class="cta-dark mt-5">Confirm</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
};

const mapDispatchToProps = {
    reloadProfileAction,
};
export default connect(null, mapDispatchToProps)(ActivitySummary);
