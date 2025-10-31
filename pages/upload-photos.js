import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { CONST, utils } from "core/helper";
import { commonService } from "core/services";
import { Button, Col, Container, Form, Row, Spinner, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { reloadProfileAction } from "core/redux/account/account.action";
import { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { CanvasPreview } from "components/image-resize/canvas-preivew";
import { UseDebounceEffect } from "components/image-resize/usedebonce";
import ModalCommon from "components/common/modal";
import Head from "next/head";
import dynamic from 'next/dynamic';

const validationSchema = Yup.object().shape({
    images: Yup.mixed().test("images", "You need to provide a image", (value) => value.length > 0),
});

const uploadPhotos = (props) => {
    const { reloadProfileAction, reloadProfile } = props;
    const authProfile = useSelector((state) => state.account?.profile);

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [modelTitle] = useState("Upload Profile Image");
    const [isUploadImg, setIsUploadImg] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    console.log("previewImg::", previewImg);
    const [img, setImg] = useState(null);
    const [isConfirmUploadFile, setIsConfirmUploadFile] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [crop, setCrop] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState(6 / 6);
    console.log("aspect::", aspect);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const handleUploadImgShow = () => setIsUploadImg(true);
    const handleUploadImgHide = () => {
        setPreviewImg(null);
        setIsUploadImg(false);
        setImg(null);
        setUploadPercentage(0);
    };

    const handleUploadImgChange = async (e) => {
        if (authProfile?.photos?.length >= 20) {
            utils.showErrMsg("Maximum photos was uploaded");
            return false;
        }
        // const imgFile = e.target.files;
        // setIsConfirmUploadFile(imgFile);
        // const file = e.target.files[0];
        // console.log("file::", file);
        // if (file) {
        //     setImg(file);
        //     handleUploadImgShow();
        // } else {
        //     setImg(null);
        // }

        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const imgFile = e.target.files;
            console.log("imgFile::", imgFile[0]);
            setIsConfirmUploadFile(imgFile);
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
            // const base = previewCanvasRef.current.toDataURL();
            // const resp = base64ToURL(previewCanvasRef.current.toDataURL());
            // console.log("resp::", resp);
            // console.log("base::", base);
            return blob;
        }, "image/jpeg");
        // console.log("blobImg::", blobImg);
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

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined);
        } else if (imgRef.current) {
            const { width, height } = imgRef.current;
            setAspect(16 / 9);
            setCrop(centerAspectCrop(width, height, 16 / 9));
        }
    }

    function changeFilename(blob, newFilename) {
        // Create a new File object with the blob and new filename
        const file = new File([blob], newFilename, { type: blob.type });
        return file;
    }

    const handleConfirmImgUpload = async (blobImg) => {
        setIsUploaded(true);
        console.log("blobImg::", blobImg);
        const newBlob = changeFilename(blobImg, `tfmprofile${new Date().getTime()}.jpg`);
        console.log("newBlob::", newBlob);
        const formData = new FormData();
        formData.append("category", 10);
        // for (let index = 0; index < isConfirmUploadFile.length; index++) {
        //     const element = isConfirmUploadFile[index];
        // }
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
        // return false;
        if (
            // isConfirmUploadFile.length === 0
            !newBlob
        ) {
            setUploadPercentage((uploadPercentage = 0));
        }

        if (
            // isConfirmUploadFile.length === 1
            newBlob
        ) {
            const resp = await commonService.uploadImages(formData, options);
            setUploadPercentage((uploadPercentage = 100), () => {
                setTimeout(() => {
                    setUploadPercentage((uploadPercentage = 0));
                }, 1000);
            });
            if (resp && resp.meta.code === 200) {
                utils.showSuccessMsg(CONST.PROFILE_IMAGE_UPDATE);
                // imageObjList(resp.data[0]);
                reloadProfileAction(!reloadProfile);
                setIsUploaded(false);
                handleUploadImgHide();
                setUploadPercentage((uploadPercentage = 0));
                router.push(CONST.DASH_PATH);
            } else {
                setIsUploaded(false);
            }
        }
    };

    // const onSubmit = async (values) => {
    //     const formData = new FormData();
    //     formData.append("category", 10);
    //     const { images } = values;
    //     for (let index = 0; index < images.length; index++) {
    //         const element = images[index];
    //         formData.append("images", element);
    //     }
    //     const resp = await commonService.uploadImages(formData);
    //     if (resp && resp.meta.code === 200) {
    //         utils.showSuccessMsg(CONST.PROFILE_IMAGE_UPDATE);
    //         reloadProfileAction(!reloadProfile);
    //         router.push(CONST.DASH_PATH);
    //     }
    // };

    return (
        <>
          <Head>
  <title>Profile Photo Upload | True Friend Christian Matrimony</title>

  <meta
    name="description"
    content="Upload and crop your profile photo on True Friend Christian Matrimony to meet size and resolution standards. Showcase your profile and connect with faith-centered Christian singles."
  />

  <meta
    name="keywords"
    content="Christian Matrimony, Profile Photo Upload, Christian Singles Profile, Image Cropper, Profile Picture Editor, Upload Profile Picture, Faith-Based Matrimony, True Friend Matrimony, Christian Matchmaking, Profile Photo Guidelines"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/profile-photo-upload" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Profile Photo Upload | True Friend Christian Matrimony" />
  <meta property="og:description" content="Upload and crop your profile photo on True Friend Christian Matrimony. Showcase your profile and connect with faith-centered Christian singles." />
  <meta property="og:url" content="https://truefriendmatrimony.com/profile-photo-upload" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>


            <section className="page-section-ptb4 pb-6">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Col className="col-md-1 mb-2"></Col>
                        <Col className="col-md-10 mb-2">
                            <div className="bg-white p-5">
                                <Row>
                                    <Col md={12}>
                                        <Tab.Container defaultActiveKey={"photo-album"}>
                                            <div className="tab tab-icon clearfix">
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="photo-album">
                                                        <div className="text-center">
                                                            <h2>
                                                                Upload your Photo <br />
                                                                (Get more responses by uploading your
                                                                recent photography)
                                                            </h2>
                                                        </div>
                                                        <div className="photo1">
                                                            <div className="photo1-1">
                                                                <span>
                                                                    Upload photos from your computer
                                                                </span>
                                                                <div>
                                                                    {/* <Form
                                                                    onSubmit={handleSubmit(
                                                                        onSubmit
                                                                    )}
                                                                > */}
                                                                    <Form.Label>
                                                                        <Form.Control
                                                                            {...register("images")}
                                                                            type="file"
                                                                            // multiple
                                                                            onChange={(e) =>
                                                                                handleUploadImgChange(e)
                                                                            }
                                                                        />
                                                                        Browse Photo
                                                                    </Form.Label>
                                                                    <p className="text-danger text-start">
                                                                        {errors.images?.message}
                                                                    </p>
                                                                    {/* <Button
                                                                    type="submit"
                                                                    disabled={isSubmitting}
                                                                >
                                                                    Submit
                                                                </Button> */}
                                                                    {/* </Form> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-5">
                                                            <strong>
                                                                <u>Note: </u>
                                                            </strong>
                                                            <ol>
                                                                <li>
                                                                    You can upload recent photography
                                                                    for your profile. Photography must be
                                                                    less than 2 MB and in jpg, jpeg and
                                                                    png format.
                                                                </li>
                                                                <li>
                                                                    Resolutions are, maximum 900 * 1200
                                                                    and minimum 300 * 300 then file size
                                                                    is minimum 10Kb
                                                                </li>
                                                            </ol>
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
                                                                    {/* <div className="upload_img_wrapper"> */}
                                                                    {!!imgSrc && (
                                                                        <ReactCrop
                                                                            crop={crop}
                                                                            onChange={(
                                                                                _,
                                                                                percentCrop
                                                                            ) => setCrop(percentCrop)}
                                                                            onComplete={(c) =>
                                                                                setCompletedCrop(c)
                                                                            }
                                                                            aspect={aspect}
                                                                            minHeight={300}
                                                                            minWidth={300}
                                                                        // locked={true}
                                                                        >
                                                                            <img
                                                                                ref={imgRef}
                                                                                alt="Crop me"
                                                                                src={imgSrc}
                                                                                style={{
                                                                                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                                                                                }}
                                                                                onLoad={onImageLoad}
                                                                            />
                                                                        </ReactCrop>
                                                                    )}
                                                                    {/* </div> */}
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
                                                                                    objectFit:
                                                                                        "contain",
                                                                                    width: completedCrop?.width,
                                                                                    height: completedCrop?.height,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ModalCommon>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </div>
                                        </Tab.Container>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        reloadProfile: state.account?.reloadProfile,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(uploadPhotos);

// const ConnecteduploadPhotos = connect(mapStateToProps, mapDispatchToProps)(uploadPhotos);

// export default dynamic(() => Promise.resolve(ConnecteduploadPhotos), { ssr: false });
