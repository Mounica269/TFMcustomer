import Image from "next/image";
import MaleImage from "../../public/frontend/images/male.jpg";
import FemaleImage from "../../public/frontend/images/female.jpg";

const ProfileSmallImage = (props) => {
    const { gender, photos } = props;
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
    const defaultImage = gender === 10 ? MaleImage : FemaleImage;
    const photoSrc =
        photos && photos.length > 0 
            ? imageDomain + photos[0]?.imagePath + photos[0]?.images.small
            : defaultImage;
    return (
        <Image className="rounded-circle " width={30} height={30} src={photoSrc} style={{zIndex:10}} alt="Profile" />
    )
};

export default ProfileSmallImage;
