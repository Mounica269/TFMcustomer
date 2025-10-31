import axios from "core/config/axios";
import { utils } from "core/helper";
import * as URL from "./apiURL.service";

const Profile = {
    getProfile: function () {
        return axios
            .get(URL.PROFILE_GET)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    getOnlyProfileInfo: function () {
        return axios
            .get(`${URL.PROFILE_GET}?onlyInfo=true`)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    getProfileDash: function () {
        return axios
            .get(URL.PROFILE_DASH)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    updateProfile: function (payload) {
        return axios
            .put(URL.PROFILE_API, payload)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    updateProfileContactMe: function (payload) {
        return axios
            .patch(URL.PROFILE_API + "/contact-me", payload)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    myMatches: function (filter) {
        return axios
            .post(URL.MY_MATCHES, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    newMatches: function (filter) {
        return axios
            .post(URL.NEW_MATCHES, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    nearbyMatches: function (filter) {
        return axios
            .post(URL.NEARBY_MATCHES, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    todayMatches: function (filter) {
        // Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        // const filterString = new URLSearchParams(filter).toString();
        return axios
            .post(URL.TODAY_MATCHES, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    todayViewedMatches: function (payload) {
        return axios
            .patch(URL.TODAY_VIEWD_MATCHES, payload)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    getPartnerProfile: function (profileId) {
        return axios
            .get(URL.GET_PARTNER_PROFILE + profileId)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    premiumMatches: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PREMIUM_MATCHES + "?" + filterString)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    nearByMatches: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.NEAR_BY_MATCHES + "?" + filterString)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    blockProfile: function (blockProfileId, payload) {
        return axios
            .post(URL.BLOCK_PROFILE + blockProfileId, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    getBlockedProfilesList: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.BLOCKED_PRFILES_LIST + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    dontShow: function (dontShowProfileId, userProfileId) {
        return axios
            .post(URL.DONT_SHOW + dontShowProfileId, userProfileId)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    dontShowProfileList: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.DONT_SHOW_PROFILE_LIST + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    recentVisitors: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.RECENT_VISITORS + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    recentViewed: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.RECENTLY_VIEWED + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    partnerPreference: function () {
        return axios
            .get(URL.PREFERENCE)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    addPartnerPreference: function (payload) {
        return axios
            .post(URL.PREFERENCE, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    publicNotifications: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.DASH_NOTIFICATION + "?" + filterString)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    personalNotifications: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.NOTIFICATION_PATH + "?" + filterString)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    profileInvite: function (profileID, payload) {
        return axios
            .post(URL.PROFILE_PATH + "/invite/" + profileID, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    remindInvitation: function (profileID, payload) {
        return axios
            .post(URL.REMIN_INVITAION + profileID, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profileInviteAccept: function (profileID) {
        return axios
            .get(URL.PROFILE_PATH + "/accept-invitation/" + profileID)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profileInviteDecline: function (profileID, payload) {
        return axios
            .post(URL.PROFILE_PATH + "/decline-invitation/" + profileID, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profileInviteCancel: function (profileID) {
        return axios
            .get(URL.PROFILE_INVITAION_CANCEL + "/" + profileID)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profilePendingInvitations: function () {
        return axios
            .get(URL.PROFILE_PENDING_INVITAIONS)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profilePendingRequests: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PROFILE_PHOTO_REQUEST_PENDING + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profileAcceptedRequests: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PROFILE_PHOTO_REQUEST_ACCEPTED + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profileSentRequests: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PROFILE_PHOTO_REQUEST_SEND + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profilePhotoRequestRaise: function (profileID) {
        return axios
            .post(URL.PROFILE_PHOTO_REQUEST_RAISE + profileID)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    profilePhotoAccept: function (profileId) {
        return axios
            .get(URL.PROFILE_PHOTO_ACCEPT + "/" + profileId)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    receivedInvitations: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.RECIVED_INVITATIONS + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    pendingInvitations: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PROFILE_PATH + "/pending-invitations?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    acceptedInvitations: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PROFILE_PATH + "/accepted-invitations?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    sentInvitations: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PROFILE_PATH + "/sent-invitations?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    successStories: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.SUCCESS_STORIES + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    faqList: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .post(URL.FAQ_FILTER + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    createSuccessStory: function (payload) {
        return axios
            .post(URL.CREATE_SUCCESS_STORY, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    contactus: function (payload) {
        return axios
            .post(URL.CONTACT_US, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    partnerContactView: function (profileId) {
        return axios
            .get(URL.PARTNER_CONTACT_VIEW + profileId)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    requestContact: function (profileId) {
        return axios
            .post(URL.REQUEST_CONTACT_VIEW + profileId)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    requestContactAccept: function (profileId) {
        return axios
            .get(URL.PHONE_REQUEST_ACCEPT + profileId)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    premiumMembers: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.PREMIUM_MEMBERS + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    basicSearch: function (payload) {
        // Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        // const filterString = new URLSearchParams(filter).toString();
        return axios
            .post(URL.BASIC_SEARCH, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    advanceSearch: function (payload) {
        return axios
            .post(URL.ADVANCE_SEARCH, payload)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    contactsView: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios
            .get(URL.COTACT_VIEW + "?" + filterString)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    getPaymentDetails: function (paymentId) {
        return axios
            .get(URL.GET_PAYMENT_DETAILS + "/" + paymentId)
            .then((resp) => resp.data)
            .catch((error) => utils.showErrMsg(utils.handleErr(error)));
    },

    getOrders: function (payload) {
        return axios
            .post(URL.GET_ORDERS, payload)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    getSearchProfile: function () {
        return axios
            .get(URL.BASIC_SEARCH)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    removeSavedSearches: function (searchId) {
        return axios
            .patch(URL.REMOVE_SAVED_SEARCH + searchId)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    getSearchMatches: function (searchId, filter) {
        return axios
            .post(URL.SEARCH_MATCHES + "/" + searchId, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    getAdvanceSearchMatches: function (searchId, filter) {
        return axios
            .post(URL.SEARCH_MATCHES + "/" + searchId, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },
};

export default Profile;
