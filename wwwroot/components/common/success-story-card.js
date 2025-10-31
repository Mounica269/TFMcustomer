import ImageFallback from "components/common/image-fallback";
import moment from "moment";
import { useState } from "react";

const SuccessStroryCard = (props) => {
    const { profile } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const photoSrc =
    profile?.coupleorWeddingPhotos[0]?.imagePath +  profile?.coupleorWeddingPhotos[0]?.originalImage

    const [expanded, setExpanded] = useState(false);
      
    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const renderContent = () => {
        if (expanded) {
            return profile?.content; 
        } else {
            return profile?.content.slice(0, 85) + "...";
        }
    };

    return (
        <div className="item shadow mb-2 success_story_card">
            <div className="story-item">
                <div className="story-image clearfix">
                    <ImageFallback
                        width={300}
                        height={350}
                        src={imageDomain + photoSrc}
                        alt={
                            profile?.name && profile?.partnerName
                              ? `Wedding photo of ${profile.name} and ${profile.partnerName}`
                              : "Wedding photo"
                          }
                    />
                </div>
                <div className="story-details h-auto text-start p-3">
                    <h3>
                        {profile?.name + " - " + profile?.partnerName}
                    </h3>
                    <h5 className="text-capitalize">Married At: {moment(profile?.weddingDate).format("YYYY-MM-DD")}</h5>
                </div>
                <div className="content p-3">
                    <p>{renderContent()}
                    {profile?.content.length > 85 && (<span className="view-more" onClick={handleToggle}>
                    {expanded ? "view less" : "view more"}</span>)} </p>
                </div>
            </div>
        </div>
    );
};


export default SuccessStroryCard;