import axios from '../config/axios';
import { utils } from 'core/helper';
import {
    ACTIVATE_ACC_URL, FORGOT_URL, LOGIN_URL,
    REGISTER_URL, RESET_URL, IS_EXISTS_URL, LOGIN_WITH_OTP, HIDE_OR_DELETE, PROFILE_ID_SEARCH, CHANGE_PWD, DELETE_PROFILE, MOBILE_NO_VERIFY, MOBILE_NO_VERIFY_OTP, ACC_RESENT_ACTIVATE_LINK
} from './apiURL.service';
import InactiveAccount from "components/common/in-active-account"

const Users = {

    login: async function ({ email, pwd, loginType, otp }) {
        return axios.post(LOGIN_URL, { email, pwd, loginType, otp })
            .then((resp) => resp)
            .catch(err => err);
    },

    loginWithOtp: function ({ email, loginType, otp }) {
        return axios.post(LOGIN_URL, { email, loginType, otp })
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    generateLoginOtp: function (payload) {
        return axios.post(LOGIN_WITH_OTP, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    activateAccount: async function (payload) {
        return axios.post(ACTIVATE_ACC_URL, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    register: function (payload) {
        return axios.post(REGISTER_URL, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    forgotPassword: function (payload) {
        return axios.post(FORGOT_URL, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    resetPassword: function (payload) {
        return axios.post(RESET_URL, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    changePassword: function (payload) {
        return axios.post(CHANGE_PWD, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    isExists: function (payload) {
        return axios.post(IS_EXISTS_URL, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    hideOrDelete: function (payload) {
        return axios.post(HIDE_OR_DELETE, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    isValid: function (payload) {
        return axios.post(PROFILE_ID_SEARCH, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    deleteProfile: function (payload) {
        return axios.post(DELETE_PROFILE, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    mobileNumberVerification: function (payload) {
        return axios.get(MOBILE_NO_VERIFY, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    mobileNumberVerificationGenrateOTP: function (payload) {
        return axios.patch(MOBILE_NO_VERIFY_OTP, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },

    accountActivateResend: function (payload) {
        return axios.post(ACC_RESENT_ACTIVATE_LINK, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    }
};

export default Users;