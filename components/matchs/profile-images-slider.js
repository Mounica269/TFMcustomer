import React, { useState, useRef } from "react";
import Slider from "react-slick";
import ImageFallback from "components/common/image-fallback";
import { profileService } from "core/services";
import { CONST, reloadAction, utils } from "core";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LightBox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Inline from "yet-another-react-lightbox/plugins/inline";
import ModalCommon from "components/common/modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fade } from "react-slideshow-image";
import "yet-another-react-lightbox/styles.css";

const ProfileImagesSlider = (props) => {
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const { gender, photos, profileID, profile, reloadAction, isPhotoRequest } = props;
    const router = useRouter();
    const authUserProfile = useSelector((state) => state.account?.profile);
    const reload = useSelector((state) => state.common?.reloadAction);
    const [lightboxOpen, setLightBoxOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const [loading, setLoading] = useState(true);

    const imageLoaded = () => {
        if (photos !== "") {
            setLoading(false);
        }
    };

    const getProfilePhotoRequest = async () => {
        const resp = await profileService.profilePhotoRequestRaise(profile?.profileID);
        if (resp && resp.meta.code === 200) {
            reloadAction(!reload);
            utils.showSuccessMsg(resp.meta?.message);
        }
    };

    const profilePhotoAccept = async () => {
        if (authUserProfile?.photos?.length === 0) {
            router.push(CONST.UPLOAD_PHOTOS_PATH);
        } else {
            const resp = await profileService.profilePhotoAccept(profile?.profileID);
            // profile/photo-request-accept/TFMB12
            if (resp && resp.meta.code === 200) {
                reloadAction(!reload);
                utils.showSuccessMsg(resp.meta?.message);
            }
        }
    };

    const processPhotoRequest = () => {
        switch (profile?.photoReqStatus) {
            case 0:
                return (
                    <button
                        onClick={getProfilePhotoRequest}
                        className="btn-sm btn btn-light mb-2 photo_accept_btn"
                    >
                        Request Photo
                    </button>
                );
            case 10:
                return (
                    <button className="btn btn-light btn-sm raised_photo_req mb-2">
                        Raised photo request <i className="fa fa-check text-success"></i>
                    </button>
                );
            case 20:
                return (
                    <button
                        onClick={profilePhotoAccept}
                        className="btn-sm btn btn-light mb-2 accept_btn"
                    >
                        Accept
                    </button>
                );
        }
    };

    const handleLightBoxOpen = () => {
        setLightBoxOpen(true);
        var name = profile?.userName ? profile?.userName : profile?.name;
        setModalTitle(`Album of ${utils.getFirstCapsName(name)}`);
    };
    const handleLightBoxClose = () => setLightBoxOpen(false);
    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
                onClick={onClick}
            >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", right: "40px", zIndex: 1 }}
                onClick={onClick}
            >
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
        );
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    const formatImageSrc = (photos) => {
        console.log("onclick photos", photos);
        const photosArr = [];
        if (photos && photos.length > 0) {
            photos.map((srcEle) => {
                const { imagePath, images } = srcEle;
                photosArr.push({
                    src: imageDomain + imagePath + images?.large,
                    width: 400,
                    height: 400,
                });
            });
        }
        console.log("photosArr::", photosArr);
        return photosArr;
    };

    const thumbnailsRef = useRef(null);

    return (
        <>
            <div className="react-slideshow-fadezoom-images-wrap1">
                {photos && photos.length > 1 && (
                    <Slider {...sliderSettings}>
                        {photos.map((ele, ind) => {
                            const imageSrc = imageDomain + ele.imagePath + ele.images?.large;
                            return (
                                <div key={ind} className="premium_member_card_wrap">
                                    <ImageFallback
                                        onClick={handleLightBoxOpen}
                                        src={imageSrc}
                                        gender={gender}
                                        alt={`Photo ${ind + 1} of ${profile?.userName || profile?.name || 'profile user'}`}
                                    />
                                    {profile?.isPremium && <i className="fa fa-trophy"></i>}
                                </div>
                            );
                        })}
                    </Slider>
                )}
                {photos && photos.length === 1 && (
                    <div className="premium_member_wrap">
                        <ImageFallback
                            onClick={handleLightBoxOpen}
                            gender={gender}
                            src={imageDomain + photos[0]?.imagePath + photos[0]?.images?.large}
                            alt={`Profile photo of ${profile?.userName || profile?.name || 'user'}`}
                        />
                        {profile?.isPremium && <i className="fa fa-trophy"></i>}
                        {/* {isPhotoRequest && processPhotoRequest()} */}
                    </div>
                )}
                {photos && photos.length === 0 && (
                    <div className="premium_member_wrap">
                        <ImageFallback gender={gender} src={imageDomain}
                        alt={`Default profile image placeholder for ${profile?.userName || profile?.name || 'user'}`} />
                        {processPhotoRequest()}
                    </div>
                )}
                <ModalCommon
                    modalTitle={modalTitle}
                    handleClose={handleLightBoxClose}
                    show={lightboxOpen}
                    closeButton={true}
                    size="lg"
                >
                    {/* <div className="row justify-content-center">
                        <div className="col-lg-6">
                            {photos && photos.length > 1 && (
                                <Slider {...sliderSettings}>
                                    {photos.map((ele, ind) => {
                                        const imageSrc =
                                            imageDomain + ele.imagePath + ele.images?.large;
                                        return (
                                            <div key={ind} className="premium_member_card_wrap">
                                                <ImageFallback
                                                    onClick={handleLightBoxOpen}
                                                    src={imageSrc}
                                                    gender={gender}
                                                />
                                                {profile?.isPremium && (
                                                    <i className="fa fa-trophy"></i>
                                                )}
                                            </div>
                                        );
                                    })}
                                </Slider>
                            )}
                        </div>
                    </div> */}
                    

                    <LightBox
                    open={lightboxOpen}
                    slides={[
                        {
                            // srcSet: [{
                            //     src: imageDomain + photos[0]?.imagePath + photos[0]?.images?.medium
                            // }]
                            srcSet: formatImageSrc(photos),
                            // width: 3840,
                            // height: 2560,
                        },
                    ]}
                    inline={{
                        style: {
                            width: "100%",
                            maxWidth: "900px",
                            aspectRatio: "3 / 2",
                        },
                    }}
                    plugins={[Thumbnails, Inline]}
                    close={handleLightBoxClose}
                    // thumbnails={thumbnailsRef}
                    thumbnails={{
                        ref: thumbnailsRef,
                        position: "bottom",
                        width: 75,
                        height: 50,
                        border: 1,
                        borderRadius: 4,
                        padding: 1,
                        gap: 16,
                    }}
                    carousel={{
                        spacing: 0,
                        padding: 0,
                        imageFit: "contain",
                    }}
                />
                </ModalCommon>
            </div>
        </>
    );
};

const mapDispathcToProps = {
    reloadAction,
};

export default connect(null, mapDispathcToProps)(ProfileImagesSlider);
// const ConnectedProfileImagesSlider = connect(null, mapDispathcToProps)(ProfileImagesSlider);

// export default connect(null, mapDispathcToProps)(ProfileImagesSlider);
