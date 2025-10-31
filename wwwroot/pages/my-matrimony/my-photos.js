import React, { Fragment, useEffect, useRef, useState } from "react";
import {
    Col,
    Container,
    Dropdown,
    Form,
    Nav,
    OverlayTrigger,
    Row,
    Spinner,
    Tab,
    Tooltip,
} from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { CONST, utils, commonService, reloadProfileAction, profileService } from "core";
import MyAccountSettings from "components/common/my-account-settings";
import ImageFallback from "components/common/image-fallback";
import { useForm } from "react-hook-form";
import ModalCommon from "components/common/modal";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { CanvasPreview } from "components/image-resize/canvas-preivew";
import { UseDebounceEffect } from "components/image-resize/usedebonce";
import Head from "next/head";
import ProfileSearch from "components/common/profile-search";
import { getUserDisplayName } from "core/helper/utils";
import 'react-image-crop/dist/ReactCrop.css';

const MyPhotos = (props) => {
    const { reloadProfileAction } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const inputFileRef = useRef();
    const hiddenAnchorRef = useRef();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const token = useSelector((state) => state.account?.tokenAction);
    const authProfile = useSelector((state) => state.account?.profile);
    const reloadProfile = useSelector((state) => state.account?.reloadProfile);
    const commonData = useSelector((state) => state.common?.commonData);

    const [myImageList, setMyImageList] = useState([]);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isPhotoPrivacyToggle, setIsPhotoPrivacyToggle] = useState(false);
    const [modelTitle] = useState("Upload Profile Image");
    const [isUploadImg, setIsUploadImg] = useState(false);
    // const [previewImg, setPreviewImg] = useState(null);
    const [img, setImg] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const [crop, setCrop] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const [completedCrop, setCompletedCrop] = useState();
    const [scale] = useState(1);
    const [rotate] = useState(0);
    const [aspect] = useState(1);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const handleUploadImgShow = () => setIsUploadImg(true);
    const handleUploadImgHide = () => {
        // setPreviewImg(null);
        setIsUploadImg(false);
        setImg(null);
        setUploadPercentage(0);
    };
    const handlePhotoPrivacyToggle = () => setIsPhotoPrivacyToggle(!isPhotoPrivacyToggle);

    const getFormatCommonValues = (key, value) => {
        if (commonData && value) {
            const data = commonData[key]?.find((ele) => ele.code.toString() === value.toString());
            return data ? data.label : " - ";
        }
        return "-";
    };

    const handleUploadImgChange = async (e) => {
        if (authProfile?.photos?.length >= 20) {
            utils.showErrMsg("Maximum photos was uploaded");
            return false;
        }

        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
            reader.readAsDataURL(e.target.files[0]);
            handleUploadImgShow();
        }
    };

    function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight
            ),
            mediaWidth,
            mediaHeight
        );
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    async function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error("Crop canvas does not exist");
        }

        await previewCanvasRef.current.toBlob(async (blob) => {
            console.log("blob::", blob);
            if (!blob) {
                throw new Error("Failed to create blob");
            }
            // if (previewCanvasRef.current) {
            //     URL.revokeObjectURL(previewCanvasRef.current);
            // }
            // previewCanvasRef.current = URL.createObjectURL(blob);
            // hiddenAnchorRef.current.href = previewCanvasRef.current;
            // hiddenAnchorRef.current.click();
            await handleConfirmImgUpload(blob);
            return blob;
        }, "image/jpeg");
    }

    UseDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                CanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    function changeFilename(blob, newFilename) {
        // Create a new File object with the blob and new filename
        const file = new File([blob], newFilename, { type: blob.type });
        return file;
    }

    const handleConfirmImgUpload = async (blobImg) => {
        setIsUploaded(true);
        const newBlob = changeFilename(blobImg, `tfmprofile${new Date().getTime()}.jpg`);
        const formData = new FormData();
        formData.append("category", 10);
        formData.append("images", newBlob);
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
        };

        if (!newBlob) {
            setUploadPercentage((uploadPercentage = 0));
        }

        if (newBlob) {
            const resp = await commonService.uploadImages(formData, options);
            setUploadPercentage((uploadPercentage = 100), () => {
                setTimeout(() => {
                    setUploadPercentage((uploadPercentage = 0));
                }, 1000);
            });
            if (resp && resp.meta.code === 200) {
                utils.showSuccessMsg(CONST.PROFILE_IMAGE_UPDATE);
                imageObjList(resp.data[0]);
                reloadProfileAction(!reloadProfile);
                setIsUploaded(false);
                handleUploadImgHide();
                setUploadPercentage((uploadPercentage = 0));
            } else {
                setIsUploaded(false);
            }
        }
    };

    // useEffect(() => {
    //     if (img) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreviewImg(reader.result);
    //         };
    //         reader.readAsDataURL(img);
    //     } else {
    //         setPreviewImg(null);
    //     }
    // }, [img]);

    const imageObjList = (data) => {
        const imageDataArr = [];
        imageDataArr.push(data);
        setMyImageList([...myImageList, ...imageDataArr]);
    };

    const handleMakeDefaultImage = async (imageId) => {
        const resp = await commonService.makeDefaultImage(imageId);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            reloadProfileAction(!reloadProfile);
        }
    };

    const handleDeleteImage = async (imageId) => {
        const resp = await commonService.deleteProfileImage(imageId);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            reloadProfileAction(!reloadProfile);
        }
    };

    const getCommonDataValOfImageStatus = (key) => {
        switch (key) {
            case 10:
                return <p className="mt-2">Request raised waiting for approval.</p>;
            case 20:
                return <p className="mt-2">Photo approved.</p>;
            case 30:
                return <p className="mt-2">Photo approval rejected</p>;
            default:
                return <p className="mt-2">Photo approved.</p>;
        }
    };

    const defaultImage = (props) => <Tooltip {...props}>Profile Image</Tooltip>;

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <span style={{ cursor: "pointer", fontSize: "16px" }} ref={ref} onClick={onClick}>
            {children}
            <i className="fa fa-chevron-down text-dark mx-1"></i>
        </span>
    ));

    const getProfileImageSection = () => {
        return (
            <>
                <Row>
                    {authProfile?.photos?.map((ele, ind) => {
                        // console.log("ele::", ele);
                        return (
                            <Col md={3} key={ind}>
                                <div className="default-img mb-3">
                                    <div className="action-wrapper">
                                        <div className="actions">
                                            {ele.makeDefault === true ? (
                                                <Fragment>
                                                    <OverlayTrigger
                                                        placement="top-start"
                                                        arrows={false}
                                                        delay={{ show: 250, hide: 300 }}
                                                        overlay={defaultImage}
                                                    >
                                                        <i className="fa fa-check-circle"></i>
                                                    </OverlayTrigger>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <Dropdown className="m-0">
                                                        <Dropdown.Toggle
                                                            as={CustomToggle}
                                                        ></Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            className="image_default_wrapper"
                                                            as={"ul"}
                                                        >
                                                            {/* {ele.approvalStatus &&
                                                            ele.approvalStatus === 20 && ( */}
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleMakeDefaultImage(ele._id)
                                                                }
                                                                as={"li"}
                                                            >
                                                                Make this as Profile image{" "}
                                                            </Dropdown.Item>
                                                            {/* )} */}
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleDeleteImage(ele._id)
                                                                }
                                                                as={"li"}
                                                            >
                                                                Delete Profile Image
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Fragment>
                                            )}
                                        </div>
                                    </div>
                                    <ImageFallback
                                        key={ind}
                                        width={300}
                                        height={300}
                                        src={imageDomain + ele?.imagePath + ele?.images?.medium}
                                        gender={authProfile?.basic?.gender}
                                        alt={`Photo ${ind + 1} of ${authProfile?.user?.name || authProfile?.name || 'profile user'}`}
                                    />
                                    {/* <span className="text-secondary">
                                    {getCommonDataValOfImageStatus(ele.approvalStatus)}
                                </span> */}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    };

    const privacyOptionSubmit = async (values) => {
        const { photo } = values;
        const payload = {
            privacyOption: {
                photo,
            },
        };
        const resp = await profileService.updateProfile(payload);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            handlePhotoPrivacyToggle();
            reloadProfileAction(!reloadProfile);
        }
    };

    const handleEditPrivacyOptions = () => {
        handlePhotoPrivacyToggle();
    };

    const getPhotoSettingsSection = () => {
        return (
            <div>
                <div className="d-flex justify-content-between">
                    Choose display option
                    <button onClick={handlePhotoPrivacyToggle} className="cta-dark">
                        Edit
                    </button>
                </div>
                <div>
                    <Row className="mt-2">
                        <Col md={2}>
                            <Form.Label>Photo :</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form onSubmit={handleSubmit(privacyOptionSubmit)}>
                                {isPhotoPrivacyToggle ? (
                                    <Fragment>
                                        {commonData?.privacyPhotoSetting.map((ele, ind) => (
                                            <Form.Check key={ind}>
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        type="radio"
                                                        value={ele.code}
                                                        name="photoPrivacy"
                                                        {...register("photo")}
                                                    />
                                                    <i className="input-helper"></i>
                                                    {ele.label}
                                                </Form.Check.Label>
                                            </Form.Check>
                                        ))}
                                        <button
                                            className="btn btn-sm btn-success mt-2"
                                            disabled={isSubmitting}
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </Fragment>
                                ) : (
                                    <p>
                                        {getFormatCommonValues(
                                            "privacyPhotoSetting",
                                            authProfile?.privacyOption?.photo
                                        )}
                                    </p>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    };

    const getPhotoUploadForm = () => {
        return (
            <>
                <Form>
                    <div className="photo1">
                        <div className="photo1-1">
                            <span>Upload photos from your computer</span>
                            <div>
                                <Form.Label className="photo1-2">
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => handleUploadImgChange(e)}
                                        width="153px"
                                        className="photo1-3 d-none"
                                        ref={inputFileRef}
                                    />
                                    Browse Photo
                                </Form.Label>
                                {/* <div className={uploadPercentage === 100 ? "d-none" : "d-block"}>
                                {uploadPercentage > 0 && (
                                    <ProgressBar
                                        now={uploadPercentage}
                                        label={`${uploadPercentage}%`}
                                    />
                                )}
                            </div> */}
                                {/* <div>
                                {uploadPercentage === 100 && "Profile Image updated sucessfully"}
                            </div> */}
                            </div>
                        </div>
                    </div>
                </Form>
            </>
        );
    };

    const getUserPrivacyOptions = (data) => {
        setValue("photo", data?.toString(), { shouldValidate: true });
    };

    const loadProfile = async () => {
        await profileService.getProfile();
    };

    useEffect(() => {
        if (authProfile?.privacyOption) {
            getUserPrivacyOptions(authProfile?.privacyOption?.photo);
        }
    }, [authProfile, reloadProfile]);

    useEffect(() => {
        if (authProfile?.photos) {
            setMyImageList([...authProfile?.photos]);
        }
    }, [authProfile?.photos, reloadProfile]);

    useEffect(() => {
        loadProfile();
        utils.scrollToTop();
    }, [reloadProfile]);

    console.log("uploadPercentage::", uploadPercentage);
    return (
        <>
    <Head>
    <title>My Photos | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Showcase your personality and faith on TrueFriend Christian Matrimony. Manage your photos to connect with potential Christian matches and build meaningful relationships based on shared values."
    />
    <meta
        name="keywords"
        content="Christian Matrimony,TrueFriend Christian, Christian Matrimonial Services, User Photos, Profile Photos, Christian Singles, Faith-Based Marriage, Christian Matchmaking, Trusted Christian Matrimony Platform, Christian Relationships, Matrimonial Connections"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony/my-photos" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="My Photos | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Showcase your personality and faith on True Friend Christian Matrimony. Connect with potential Christian matches and share meaningful moments through your profile photos."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony/my-photos" />

 
 
</Head>


            <div className="container  pt-5 pb-4">
                <div className="row mt-5">
                    <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 ">
                        <div className="db-nav">
                            <div className="db-nav-list">
                                <MyAccountSettings />
                            </div>
                        </div>
                        <ProfileSearch />
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="db-pro-stat">
                                <div className="db-inte-main">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                data-bs-toggle="tab"
                                                href="#home"
                                            >
                                                Photo Album
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                href="#menu1"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div id="home" className="container tab-pane active">
                                            <br />

                                            <div className="db-int-pro-2">
                                                <h4 className="pb-3">
                                                    Get More Responses By Uploading Your Recent
                                                    Photography On Your Profile.
                                                </h4>
                                                {getPhotoUploadForm()}
                                                <div class="row">
                                                    {/* <div class="col-md-12 form-group p-2">
                            <ol class="poi poi-date p-1">
                                <li>Age : ---</li>
                                <li>Date of Birth : ---</li>
                                <li>Marital Status : ---</li>
                                <li>Height : ---</li>
                            </ol>
                        </div> */}
                                                    <h6>Note:</h6>
                                                    <p>
                                                        {" "}
                                                        1 - You can upload recent photography for
                                                        your profile photography must be less than 2
                                                        MB and in jpg, jpeg and png format.
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        2 - Resolutions are, maximum 900 * 1200 and
                                                        minimum 300 * 300 then file size is minimum
                                                        10Kb
                                                    </p>
                                                    {myImageList.length > 0 &&
                                                        getProfileImageSection()}
                                                </div>
                                            </div>
                                        </div>
                                        <ModalCommon
                                            handleClose={handleUploadImgHide}
                                            show={isUploadImg}
                                            size={"xl"}
                                            modalTitle={modelTitle}
                                            closeButton={true}
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    {!!imgSrc && (
                                                        <ReactCrop
                                                            crop={crop}
                                                            onChange={(_, percentCrop) =>
                                                                setCrop(percentCrop)
                                                            }
                                                            onComplete={(c) => setCompletedCrop(c)}
                                                            aspect={aspect}
                                                            minHeight={300}
                                                            minWidth={300}
                                                        // locked={true}
                                                        >
                                                            <img
                                                                ref={imgRef}
                                                                alt="User profile photo ready for cropping"
                                                                src={imgSrc}
                                                                style={{
                                                                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                                                                }}
                                                                onLoad={onImageLoad}
                                                            />
                                                        </ReactCrop>
                                                    )}
                                                    <button
                                                        onClick={onDownloadCropClick}
                                                        className="btn btn-success d-flex align-items-center mt-3"
                                                        disabled={isUploaded}
                                                    >
                                                        {isUploaded && (
                                                            <Spinner
                                                                size="sm"
                                                                animation="border"
                                                                className="mx-1"
                                                            />
                                                        )}
                                                        Confirm
                                                    </button>
                                                    {/* <div>
                                                    <button onClick={onDownloadCropClick}>
                                                        Download Crop
                                                    </button>
                                                    <a
                                                        ref={hiddenAnchorRef}
                                                        download
                                                        style={{
                                                            position: "absolute",
                                                            top: "-200vh",
                                                            visibility: "hidden",
                                                        }}
                                                    >
                                                        Hidden download
                                                    </a>
                                                </div> */}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="crop_img_wrapper">
                                                        <div>
                                                            <canvas
                                                                ref={previewCanvasRef}
                                                                style={{
                                                                    border: "1px solid black",
                                                                    objectFit: "contain",
                                                                    width: completedCrop?.width,
                                                                    height: completedCrop?.height,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ModalCommon>
                                        <div id="menu1" className="container tab-pane fade">
                                            <br />
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    Choose display option
                                                    <button
                                                        onClick={handlePhotoPrivacyToggle}
                                                        className="cta-dark"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                                <div>
                                                    <Row className="mt-2">
                                                        <Col md={2}>
                                                            <Form.Label>Photo :</Form.Label>
                                                        </Col>
                                                        <Col md={8}>
                                                            <Form
                                                                onSubmit={handleSubmit(
                                                                    privacyOptionSubmit
                                                                )}
                                                            >
                                                                {isPhotoPrivacyToggle ? (
                                                                    <Fragment>
                                                                        {commonData?.privacyPhotoSetting.map(
                                                                            (ele, ind) => (
                                                                                <Form.Check
                                                                                    key={ind}
                                                                                >
                                                                                    <Form.Check.Label>
                                                                                        <Form.Check.Input
                                                                                            type="radio"
                                                                                            value={
                                                                                                ele.code
                                                                                            }
                                                                                            name="photoPrivacy"
                                                                                            {...register(
                                                                                                "photo"
                                                                                            )}
                                                                                        />
                                                                                        <i className="input-helper"></i>
                                                                                        {ele.label}
                                                                                    </Form.Check.Label>
                                                                                </Form.Check>
                                                                            )
                                                                        )}
                                                                        <button
                                                                            className="btn btn-sm btn-success mt-2"
                                                                            disabled={isSubmitting}
                                                                            type="submit"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </Fragment>
                                                                ) : (
                                                                    <p>
                                                                        {getFormatCommonValues(
                                                                            "privacyPhotoSetting",
                                                                            authProfile
                                                                                ?.privacyOption
                                                                                ?.photo
                                                                        )}
                                                                    </p>
                                                                )}
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
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

export default connect(null, mapDispatchToProps)(MyPhotos);
