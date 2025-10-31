import { Fragment } from "react";
import { Card } from "react-bootstrap";
import ImageFallback from "./image-fallback";

const SuccessStoriesVerticleView = (props) => {
    const { successStories } = props;
    const { name, email, partnerName, content, coupleorWeddingPhotos = null } = successStories;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const photoSrc = coupleorWeddingPhotos ? (coupleorWeddingPhotos[0]?.imagePath + coupleorWeddingPhotos[0]?.originalImage) : "";
    return (
        <Card>
            <ImageFallback
                width={215}
                height={215}
                // gender={userGender}
                src={imageDomain + photoSrc}
                alt={name && partnerName 
                    ? `Wedding photo of ${name} and ${partnerName}` 
                    : "Wedding photo"}
                
            />
            <Card.Body>
                <div>
                    <h3>
                        {name}, {partnerName}
                    </h3>
                    <p>{content.slice(0,100) + "..."}</p>
                </div>
                {/* <div className="story-item">
                <div className="story-image clearfix">
                    <Image layout="fill" className="img-fluid" src={coupleorWeddingPhotos?.[0]} alt="story_1" />
                </div>
                <div className="story-details text-center">
                    <h5>{name}</h5>
                    <div className="about-des">{email}</div>
                </div> 
                </div> */}
            </Card.Body>
        </Card>
    );
};

export default SuccessStoriesVerticleView;
