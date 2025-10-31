import Image from "next/image";
import maleImage from "public/frontend/images/male.jpg";
import femaleImage from "public/frontend/images/female.jpg";

const DefaultProfileImage = (props) => {
    const { gender } = props;
    const imageSrc = gender === 10 ? maleImage : femaleImage;
    const resolvedAlt = alt || (gender === 10 ? "Default male profile image" : "Default female profile image");

    return <Image src={imageSrc} width={300} height={370}  alt={resolvedAlt} />;
};

export default DefaultProfileImage;
