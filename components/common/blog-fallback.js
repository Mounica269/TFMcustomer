import Image from "next/image";
import { useEffect, useState } from "react";
import BlogImage from "../../public/frontend/images/blog/richard.jpg";

export default function BlogFallback({ src, fallbackSrc, ...rest }) {
    const [imgSrc, set_imgSrc] = useState(src);

    useEffect(() => {
        set_imgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onLoadingComplete={(result) => {
                if (result.naturalWidth === 0) {
                    // Broken image
                    const loadImageSrc = fallbackSrc !== undefined ? fallbackSrc : BlogImage;
                    set_imgSrc(loadImageSrc);
                }
            }}
            onError={() => {
                const loadImageSrc = fallbackSrc !== undefined ? fallbackSrc : BlogImage;
                set_imgSrc(loadImageSrc);
            }}
        />
    );
}
