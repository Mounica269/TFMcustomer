import Image from "next/image";
import DefaultProfileImage from "components/common/default-profile-image";

const ProfileImagePlain = (props) => {
    const { gender, photos } = props;
    const [{ imagePath, images }] = photos;

    return (
        <div>
            {photos?.length > 0 ? (
                <div className="upload-photo-image media-object">
                    <Image
                        src={process.env.NEXT_PUBLIC_IMAGE_PATH + imagePath + images?.medium}
                          alt="User profile image"
                           loading="lazy"
                        layout="fill"
                    />
                </div>
            ) : (
                <DefaultProfileImage gender={gender} />
            )}
        </div>
    );
};

export default ProfileImagePlain;
