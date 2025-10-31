import { toast } from "react-toastify";
import Link from "next/link";
import moment from "moment";
import { CONST } from "./";
// import { removeAuthuser } from './localStorage';
// import { useRouter } from 'next/router';

const minYear = moment().subtract(100, "year").format("YYYY-MM-DD");
const maxYear = moment().subtract(18, "year").format("YYYY-MM-DD");
const getFirstCaps = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

export const firstCaps = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

export const handleErr = (err) => {
    const resMessage = err?.response?.data?.meta?.message || err?.message || err.toString();
    return resMessage;
};

export const handleSuccess = (data) => {
    return data?.data?.data;
};

export const showSuccessMsg = (msg) => {
    toast.success(msg, { autoClose: 2000 });
};

export const showErrMsg = (msg) => {
    toast.error(msg, { autoClose: 2000 });
};

export const getUserDisplayName = (displayName, name) => {
    return displayName ? getFirstCaps(displayName) : getFirstCaps(name);
};

export const getFirstCapsName = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

export const getUserDisplayNameWithLink = (profileID, user) => {
    return (
        <Link passHref={true} href={CONST.PROFILE_VIEW_PATH + "?profileid=" + profileID}>
            <a href="#" target="_blank">
                {user?.name && getFirstCaps(user?.name)}
            </a>
        </Link>
    );
};

export const getUserDisplayNameWithLinkNew = (profileID, userName) => {
    return (
        <Link passHref href={CONST.PROFILE_VIEW_PATH + "?profileId=" + profileID}>
            <a href="#" rel="noopener noreferrer" target="_blank">
            <strong> {getFirstCaps(userName)}</strong>
            </a>
        </Link>
    );
};

export const getCommonData = (commonData, key, value) => {
    const data = commonData[key] ? commonData[key].find((ele) => ele.code === value) : false;
    return data ? data.label : false;
};

export const getMaskedNumber = (number) => {
    number = number.toString();
    const startDigits = number.slice(0, 4);
    return startDigits.padEnd(number.length, "X");
};

export const getMaskedEmail = (email) => {
    email = email.toString();
    const emailEmpty = "";
    const emailObj = email.split("@");
    return emailEmpty.padStart(emailObj[0].length, "X") + "@" + emailObj[1];
};

export const checkStateValidation = (countryArr) => {
    return countryArr && countryArr.length > 0 ? true : false;
};
export const checkCityValidation = (stateArr) => {
    return stateArr && stateArr.length > 0 ? true : false;
};

export const rightIcon = (width, height) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 48 48"
        >
            <path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
        </svg>
    );
};

export const closeIcon = (width, height) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 48 48"
        >
            <path
                fill="#F44336"
                d="M21.5 4.5H26.501V43.5H21.5z"
                transform="rotate(45.001 24 24)"
            ></path>
            <path
                fill="#F44336"
                d="M21.5 4.5H26.5V43.501H21.5z"
                transform="rotate(135.008 24 24)"
            ></path>
        </svg>
    );
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return <></>;
};

// utils/slugify.js (create a new file for this helper)
export const slugify = (text) => {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };
