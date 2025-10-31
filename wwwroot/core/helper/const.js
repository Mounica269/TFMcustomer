
//BEFORE_LOGIN
export const BASE_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const RESET_PASSWORD_PATH = "/reset-password";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const ABOUT_US_PATH = "/about-us";

//AFTER_LOGIN
export const MAIN_PATH = "/";
export const PROFILE_VIEW_PATH = "/profile";
export const PROFILE_BY_ID_PATH = "/profile?profileId=";

//MENU_ACTIVE_PATH
export const MATRI_PATH = "my-matrimony";
export const MATCHES_PATH = "matches";
export const SEARCH_PATH = "search";
export const INBOX_PATH = "inbox";

export const DASH_PATH = "/my-matrimony";
export const MATRI_PREFERENCE = "/my-matrimony/partner-preferences";
export const MATRI_PROFILE_PATH = "/my-matrimony/my-profile";
export const MATRI_ACCOUNT_PATH = "/my-matrimony/my-account";
export const MATRI_PHOTOS_PATH = "/my-matrimony/my-photos";
export const MATRI_ACC_PRIVACY_PATH = "/my-matrimony/my-account/privacy";
export const MATRI_ACC_CONTACT_DET_PATH = "/my-matrimony/my-account/contact-detail";
export const MATRI_ACC_CONTACT_PATH = "/my-matrimony/my-account/contact-filter";
export const MATRI_ACC_EMAIL_ALERT_PATH = "/my-matrimony/my-account/email-alerts";
export const MATRI_ACC_INBOX_PATH = "/my-matrimony/my-account/inbox";
export const MATRI_ACC_HIDE_DELETE_PATH = "/my-matrimony/my-account/hide-delete-account";
export const ORDERS_PATH = "/my-matrimony/orders";

export const MATCH_NEW_PATH = "/matches/new-matches";
export const MATCH_MY_PATH = "/matches/my-matches";
export const MATCH_TODAY_PATH = "/matches/daily-recommendations";
export const MATCH_NEARBY_PATH = "/matches/nearby-matches";
export const MATCH_RECENTLY_VISITORS_PATH = "/matches/recent-visitors";
export const MATCH_MORE_PATH = "/matches/discovery";

export const SEARCH_BASIC_PATH = "/search/basic";
export const SEARCH_ADVANCE_PATH = "/search/advance";

export const INBOX_NOTIFICATION_PATH = "/inbox/notification";
export const INBOX_RECEIVED_PATH = "/inbox/received";
export const INBOX_ACCEPTED_PATH = "/inbox/accepted";
export const INBOX_REQUESTS_PATH = "/inbox/requests";
export const INBOX_SENT_PATH = "/inbox/sent";
export const INBOX_CONTACTS_PATH = "/inbox/contacts";
export const INBOX_EXPIRED_PATH = "/inbox/expired";
export const INBOX_MORE_PATH = "/inbox/more";
export const INBOX_NOTIFICATIONS_PATH = "/inbox/notification";

export const PROFILE_PATH = "/my-profile";
export const PROFILE_COMPLETION_PATH = "/profile-completion";
export const EDIT_PROFILE_PATH = "/edit-profile";

export const UPLOAD_PHOTOS_PATH = "/upload-photos";
export const PLAN_UPGRADE_PATH = "/plans";
export const ORDER_PATH = "/order";

export const PRIVACY_PATH = "/privacy";
export const TERMS_AND_USE_PATH = "/terms-and-use";
// export const REPORT_MISUSE_PATH = "/report-misuse";
export const RETURN_AND_CANCELLATION_PATH = "/return-and-cancellation";
export const BE_SAFE_ONLINE_PATH = "/be-safe-online";
export const SUCCESS_STORIES_PATH = "/success-stories";
export const SUCCESS_STORIES_FORM_PATH = "/success-stories-form";
export const SUCCESS_STORIES_ID_PATH = "/success-stories-detail?storiesId=";
export const CONTACT_US_PATH = "/contact-us";
export const BLOGS_PATH = "/blogs";
export const BLOGS_DETAIL = "/blog-detail?blogId=";
export const CAT_ID = "category/?catId=";
export const FAQs_PATH = "/faq";

export const SETTINGS_PATH = "/settings";

export const BLOCKED_PROFILE_PATH = "/matches/discovery/blocked-profile";
export const DONT_SHOW_PROFILE_PATH = "/matches/discovery/dont-show-profiles";
export const RECENT_VIEWED = "/matches/discovery/recent-viewed";
export const RECENT_VISITORS = "/matches/discovery/recent-visitors";
export const PREMIUM_MEMBERS_LISTS = "/matches/discovery/premium-members";

//PLANS
export const PLANS = "/plans";
export const TFM_PLANS = "/plans";
export const TFM_EXECUTIVE = "/plans";
export const TFM_PREMIUM = "/plans";
export const TFM_SUPREME = "/plans";

//UTILS_SUCCESS_MESSAGE
export const LOGIN_MSG = "logged in successfully";
export const PROFILE_UPDATE_MSG = "profile updated successfully";
export const PASSWORD_RESET = "password reset successfully";
export const PROFILE_IMAGE_UPDATE = "profile image update successfully";
export const PROFILE_PROOF_IMAGE_UPDATE = "proof image updated successfully";

//UTILS_ERROR_MESSAGE
export const PROFILE_IMAGE_ERR = "please choose photo";

export const DEFAULT_SORT_BY = "_id";
export const PLAN_SORT_BY_PRICE = "price";
export const DEFAULT_UPDATE_AT = "updatedAt";
export const DEFAULT_SORT = -1;
export const SORT_FILTER_CHANGE = -1;
export const SORT_FILTER_BY_COMMMUNITY = "community";
export const SORT_FILTER_BY_PROFESSION = "profession";
export const SORT_FILTER_BY_NAME = "name";
export const SORT = 1;
export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sortBy: DEFAULT_SORT_BY,
    sort: DEFAULT_SORT,
};

export const RELIGION_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sort: SORT_FILTER_CHANGE,
    sortBy: DEFAULT_UPDATE_AT,
};

export const SORT_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sort: SORT_FILTER_CHANGE,
    sortBy: "name",
};

export const FILTER = {
    skip: 0,
    page_no: 1,
    limit: DEFAULT_PER_PAGE,
    sortBy: DEFAULT_SORT_BY,
    sort: DEFAULT_SORT,
};

export const DEFAULT_ADV_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sortBy: DEFAULT_SORT_BY,
    sort: DEFAULT_SORT,
    // search: "",
    filter: {},
};

export const COMMUNITY_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sortBy: SORT_FILTER_BY_COMMMUNITY,
    sort: SORT,
    filter: {},
};

export const SUB_COMMUNITY_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sortBy: SORT_FILTER_BY_COMMMUNITY,
    sort: SORT,
    filter: {},
};

export const PROFESSION_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sortBy: SORT_FILTER_BY_NAME,
    sort: SORT,
};

export const QUALIFICATION_FILTER = {
    skip: 0,
    limit: DEFAULT_PER_PAGE,
    sortBy: SORT_FILTER_BY_NAME,
    sort: SORT,
};

export const DEFAULT_MASTER_FILTER = {
    skip: 0,
    limit: 10,
};

export const DEFAULT_FOR_PROFILE_FILTER = {
    skip: 0,
    limit: 10,
};

export const DEFAULT_ASYNC_MASTER_FILTER = {
    skip: 0,
    limit: 25,
};

export const COMMUNITY_FILTER_GET = {
    skip: 0,
    limit: 25,
    sortBy: SORT_FILTER_BY_COMMMUNITY,
    sort: SORT,
};

export const DEFAULT_ASYNC_LANG_FILTER = {
    skip: 0,
    limit: 25,
    sortBy: "orderList",
    sort: 1,
};

export const DEFAULT_STATE_FILTER = {
    skip: 0,
    limit: 100,
    sortBy: "orderList",
    sort: 1,
};

export const PAGINATION_FILTER = {
    skip: 0,
    limit: 10,
};
export const SLIDER_OPTION = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 0,
    adaptiveHeight: true,
};

export const PLAN_FILTER = {
    sortBy: PLAN_SORT_BY_PRICE,
    sort: 1,
};

export const DEFAULT_IS_OPEN = [{ value: 0, label: "Any" }];
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const PHONE_REGEX =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const PARTNER_AGE_FROM = 18;
export const PARTNER_AGE_TO = 18;
export const NAME_REGEX = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;

export const PHONE_IND_REGEX = /^[6-9]\d{9}$/;

export const MSG = {
    RECORD_ADDED_SUCC: "Record added Successfully",
    RECORD_UPDATED_SUCC: "Record updated Successfully",
    RECORD_DELETED_SUCC: "Record deleted Successfully",

    PROF_FOR_REQ: "Matrimony Profile for is required",
    GENDER_REQ: "Gender is required",
    RELIGION_REQ: "Religion is required",
    LANG_REQ: "Language is required",
    COMMUNITY_REQ: "Community is required",

    NAME_REQ: "Name is required",
    NAME_EXISTS: "Name is already registered.",

    EMAIL_REQ: "Email is required",
    EMAIL_EXISTS: "This email is already registered.",

    PROOF_TYPE: "Proof type",
    REQ_IMG: "Please upload a image",
    REQ_PROOF_IMAGE: "Please upload a proof image",

    PASSWORD_REQ: "Password is required",
    PASSWORD_CONFIRM_REQ: "Confirm password is required",
    PASSWORD_NOT_MATCH: "Passwords does not match",
    PASSWORD_MIN: "Minimum Characters is required",
    PASSWORD_MAX: "Maximun 20 Characters are allowed",
    PASSWORD_REGEX:
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",

    PHONE_CODE_REQ: "Phone code is required",
    PHONE_REQ: "Phone number is required",
    PHONE_REGEX: "Phone number is not valid",
    PHONE_INVALID: "Invalid Phone number",
    PHONE_EXISTS: "This phone number is already registered.",
    INVALID_COUPON: "Invalid coupon",

    BLOCKED_PROFILE_MSG: "Sorry, You Have not blocked any profiles",
    IGNORE_PROFILE_MSG: "You are not currently any Ignored profiles",
    RECENT_VISITORS: "Your profile not visiting any others",
    RECENT_VIEWED: "You are not visit any profiles",

    PROFILE_PHOTO_PENDING_REQUEST_MSG: "No pending request for profile photos",
    PROFILE_PHOTOS_SEND_REQUEST_MSG: "You are not sending any photo request",
    PROFILE_PHOTO_REQ_ACCEPTED: "You are not request any photo",

    PREMIUM_MEMBERS: "Nobody is there premium members",

    NOTIFICATION_MSG: "Empty Notifications",
    INVALID_NAME: "Name can only contain letters",

    MIN_CHAR: "Minimum 3 characters required",
    MAX_CHAR: "Maximum 25 character allowed",
    MAX_CHAR_FOR_PROFILE_NAME: "Maximum 30 character allowed",
};
