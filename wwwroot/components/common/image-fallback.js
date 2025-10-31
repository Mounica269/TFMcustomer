import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import MaleImage from "../../public/frontend/images/male.jpg";
import FemaleImage from "../../public/frontend/images/female.jpg";
import { Spinner } from "react-bootstrap";

export default function ImageFallback({ src, gender, fallbackSrc, onClick, makeDefault, ...rest }) {
    const isMaleImage = gender === 10;
    const imageSrc = isMaleImage ? MaleImage : FemaleImage;
    const [imgSrc, set_imgSrc] = useState(src);
    const [loading, setLoading] = useState(true);

    const imageLoaded = () => {
        if (imgSrc !== "") {
            setLoading(false);
        }
    };

    useEffect(() => {
        set_imgSrc(src);
    }, [src]);

    return (
        <Fragment>
            <div className="spinner_wrap">{loading && <Spinner animation="border" />}</div>
                <Image
                    width={500}
                    height={640}
                    layout="responsive"
                    alt={"User profile image"}
                    {...rest}
                    src={imgSrc}
                    // makeDefault={true}
                    onLoadingComplete={(result) => {
                        if (result.naturalWidth === 0) {
                            // Broken image
                            const loadImageSrc = fallbackSrc !== undefined ? fallbackSrc : imageSrc;
                            set_imgSrc(loadImageSrc);
                        }
                    }}
                    onError={() => {
                        const loadImageSrc = fallbackSrc !== undefined ? fallbackSrc : imageSrc;
                        set_imgSrc(loadImageSrc);
                    }}
                    onLoad={imageLoaded}
                    // style={{ display: loading ? "none" : "block" }}
                    onClick={onClick}
                    className="image_pointer"
                />
        </Fragment>
    );
}
