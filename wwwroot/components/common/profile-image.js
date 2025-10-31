import ImageFallback from "components/common/image-fallback";
import DefaultProfileImage from "components/common/default-profile-image";
import { Fragment, useRef, useState } from "react";
import { commonService } from "core/services";
import { connect } from "react-redux";
import { CONST, utils } from "core/helper";
import { reloadProfileAction } from "core/redux/account/account.action";
import { Form, Spinner } from "react-bootstrap";
import ModalCommon from "components/common/modal";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { CanvasPreview } from "components/image-resize/canvas-preivew";
import { UseDebounceEffect } from "components/image-resize/usedebonce";
import 'react-image-crop/dist/ReactCrop.css';

const ProfileImage = (props) => {
    const { gender, photos, reloadProfileAction, reloadProfile, authProfile } = props;
    const inputFileRef = useRef();

    const [crop, setCrop] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isUploadImg, setIsUploadImg] = useState(false);
    const [modelTitle] = useState("Upload Profile Image");
    const [imgSrc, setImgSrc] = useState("");
    const [completedCrop, setCompletedCrop] = useState();
    const [scale] = useState(1);
    const [rotate] = useState(0);
    const [aspect] = useState(6 / 6);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const handleUploadImgShow = () => setIsUploadImg(true);
    const handleUploadImgHide = () => {
        // setPreviewImg(null);
        setIsUploadImg(false);
        // setImg(null);
        // setUploadPercentage(0);
        inputFileRef.current.value = null;
    };
    // const handlePhotoPrivacyToggle = () => setIsPhotoPrivacyToggle(!isPhotoPrivacyToggle);

    // const getFormatCommonValues = (key, value) => {
    //     if (commonData && value) {
    //         const data = commonData[key]?.find((ele) => ele.code.toString() === value.toString());
    //         return data ? data.label : " - ";
    //     }
    //     return "-";
    // };

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

        const blobImg = await previewCanvasRef.current.toBlob(async (blob) => {
            console.log("blob::", blob);
            if (!blob) {
                throw new Error("Failed to create blob");
            }
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
        // const options = {
        //     onUploadProgress: (progressEvent) => {
        //         const { loaded, total } = progressEvent;
        //         let percent = Math.floor((loaded * 100) / total);
        //         if (percent < 100) {
        //             setUploadPercentage(percent);
        //         }
        //     },
        // };

        // if (!newBlob) {
        //     setUploadPercentage((uploadPercentage = 0));
        // }

        // if (newBlob) {
        const resp = await commonService.uploadImages(formData);
        // setUploadPercentage((uploadPercentage = 100), () => {
        //     setTimeout(() => {
        //         setUploadPercentage((uploadPercentage = 0));
        //     }, 1000);
        // });
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(CONST.PROFILE_IMAGE_UPDATE);
            // imageObjList(resp.data[0]);
            reloadProfileAction(!reloadProfile);
            setIsUploaded(false);
            handleUploadImgHide();
            // setUploadPercentage((uploadPercentage = 0));
        } else {
            setIsUploaded(false);
        }
        // }
    };

    const onProfilePhotoChange = async (event) => {
        if (authProfile?.photos?.length >= 20) {
            utils.showErrMsg("Maximum photos was uploaded");
            return false;
        }
        const formData = new FormData();
        formData.append("category", 10);
        const images = event?.target?.files;
        if (images) {
            formData.append("images", images[0]);
        }
        const resp = await commonService.uploadImages(formData);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(CONST.PROFILE_IMAGE_UPDATE);
            reloadProfileAction(!reloadProfile);
        }
    };

    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;

    return (
        <div className="profile-photo-wrapper">
            <div className="upload-photo">
                <div className="upload-photo-container">
                    <Fragment>
                        <div className="photo-image-md">
                            <ImageFallback
                                src={
                                    imageDomain +
                                    "/" +
                                    photos?.[0]?.imagePath +
                                    photos?.[0]?.originalImage
                                }
                                gender={gender}
                                   alt="User profile image"
                                layout="fill"
                            />
                        </div>
                        <Form>
                            <div className="photo-action">
                                <label className="photo-action-button">
                                    <Form.Control
                                        type="file"
                                        className="photo1-3 d-none"
                                        // onChange={onProfilePhotoChange}
                                        onChange={handleUploadImgChange}
                                        ref={inputFileRef}
                                    />
                                    <div className="photo-action-tooltip photo-action-tooltip-lable">
                                       +
                                    </div>
                                </label>
                            </div>
                        </Form>
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
                                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            aspect={aspect}
                                            minHeight={300}
                                            minWidth={300}
                                            // locked={true}
                                        >
                                            <img
                                                ref={imgRef}
                                                 alt="Image to crop"
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
                                        className="btn btn-success d-flex align-items-center"
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
                    </Fragment>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
        reloadProfile: state.account?.reloadProfile,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
//     <ImageFallback
//         src={
//             process.env.NEXT_PUBLIC_IMAGE_PATH +
//             photos[0]?.imagePath +
//             photos[0]?.images.medium
//         }
//         gender={gender}
//         layout="fill"
//     />
// <DefaultProfileImage gender={gender} />
// </Fragment>
