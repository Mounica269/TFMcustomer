import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileService } from "core/services";
import ImageFallback from "components/common/image-fallback";
import Link from "next/link";
import Head from "next/head";


const NotificationList = () => {
    const commonData = useSelector((state) => state.account?.commonData);
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;

    const [notifications, setNotifications] = useState([]);
    // console.log('notifications',notifications[0].createdAt);
    const [apiLoad, setApiLoad] = useState(false);

    const getCommonData = (key, value) => {
        const data =
            commonData && commonData[key] && commonData[key].find((ele) => ele.code === value);
        return data ? data.label : "";
    };

    const getPublicNotification = async () => {
        if (apiLoad === true) {
            return;
        }
        setApiLoad(true);
        const resp = await profileService.publicNotifications({
            skip: 0,
            limit: 6,
            sortBy: "_id",
            sort: -1,
        });
        if (resp && resp.meta.code === 200) {
            const { data } = resp;
            setNotifications(data);
            setApiLoad(false);
        } else {
            setApiLoad(false);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    useEffect(() => {
        getPublicNotification();
    }, []);

    return (
        <>
            <Head>
                {/* Primary SEO */}
                <title> Notifications | TrueFriend Matrimony </title>
                <meta name="description" content="Stay updated with the latest notifications, announcements, and important updates from TrueFriend Matrimony, India’s trusted Christian Matrimony platform connecting verified Christian brides and grooms." />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Notifications, TrueFriend Matrimony, Announcements, Matrimony updates , Christian Matrimony India, Matrimony Notifications, Matrimony Announcements, Matrimony Updates, TrueFriend Matrimony, Verified Christian Matrimony, Christian Marriage Alerts"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/notification" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Notifications | TrueFriend Matrimony" />
                <meta property="og:description" content="Stay updated with the latest notifications, announcements, and updates from TrueFriend Matrimony, your trusted Christian Matrimony platform." />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/notification" />

            </Head>
            <Fragment>

                <h2 className="db-tit"> <i className="fa fa-bell"></i>Notifications</h2>
                <div className="db-pro-stat p-2">
                    <div className="db-inte-prof-list db-inte-prof-chat" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {apiLoad && <h5>Loading...</h5>}
                        {!apiLoad && notifications.length > 0 ? (
                            <ul>
                                {notifications.map((notProfile, index) => {
                                    const { senderProfile, senderUser, notificationType, createdAt } = notProfile;
                                    const { photos: profilePhotos } = senderProfile;
                                    const photoSrc =
                                        senderProfile && profilePhotos.length > 0
                                            ? profilePhotos[0]?.imagePath
                                            : "/default-avatar.jpg";
                                    const photoLarge =
                                        senderProfile && profilePhotos.length > 0
                                            ? profilePhotos[0]?.images?.large
                                            : "";

                                    return (
                                        <li key={index}>
                                            <div className="photo-image-sm db-int-pro-1">
                                                <ImageFallback
                                                    width={185}
                                                    height={185}
                                                    gender={10}
                                                    style={{ borderRadius: "50px" }}
                                                    src={`${imageDomain}${photoSrc}${photoLarge}`}
                                                    alt={senderUser?.name || "User"}
                                                />
                                            </div>
                                            <div className="db-int-pro-2" style={{ float: "left", marginTop: "-45px", marginLeft: "70px", }}>
                                                <Link href={`/profile?profileId=${senderProfile.profileID}`}>
                                                    <h5>{senderUser?.name || "Unknown User"}</h5>
                                                </Link>
                                                {/* <span>{getCommonData("location", senderProfile?.location) || "Location not available"}</span> */}
                                                <span> {formatDate(createdAt)}</span>

                                            </div>
                                        </li>
                                    );
                                })}
                                <div className="bg-ashe p-1 mt-1 text-center">
                                    <Link href={"/inbox/notification"}>
                                        <a className="text-center" href="#">View All</a>
                                    </Link>
                                </div>

                            </ul>
                        ) : (
                            !apiLoad && <p>No new  notifications.</p>
                        )}
                    </div>
                </div>

            </Fragment>
        </>
    );
};

export default NotificationList;
