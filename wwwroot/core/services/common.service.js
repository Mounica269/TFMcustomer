import axios from "../config/axios";
import { utils } from "core/helper";
import {
    BLOG_LIST,
    COMMON_DATA,
    COMMON_IMAGE_UPLOAD,
    DELETE_PROFILE_IMAGE,
    DETAILED_BLOG,
    GENERATE_INVOICE,
    MAKE_DEFAULT_IMAGE,
    UPLOAD_IMAGES,
    UPLOAD_PROOF_IMAGES
} from "./apiURL.service";

const Common = {
    getAllCommonData: function () {
        return axios
            .get(COMMON_DATA)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },
    uploadImages: function (formData, options) {
        const headers = { "Content-Type": "multipart/form-data", accept: "*/*" };
        const option = options;
        const payload = { ...headers, ...option };
        return axios
            .post(UPLOAD_IMAGES, formData, payload)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },
    uploadGovernmentIdentity: function (formData, options) {
        const headers = { "Content-Type": "multipart/form-data", accept: "*/*" };
        const option = options;
        const payload = { ...headers, ...option };
        return axios
            .post(UPLOAD_PROOF_IMAGES, formData, payload)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    imageUpload: function (formData) {
        const headers = { "Content-Type": "multipart/form-data", accept: "*/*" };
        return axios
            .post(COMMON_IMAGE_UPLOAD, formData, headers)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },
    blogList: function (filter) {
        return axios
            .post(BLOG_LIST, filter)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    makeDefaultImage: function (imageId) {
        return axios
            .get(MAKE_DEFAULT_IMAGE + "/" + imageId)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    deleteProfileImage: function (imageId) {
        return axios
            .get(DELETE_PROFILE_IMAGE + "/" + imageId)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },

    // detailedBlog: function (uri) {
    //     return axios
    //         .get(DETAILED_BLOG + uri)
    //         .then((resp) => resp.data)
    //         .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    // },

    generateInvoice: function (planId) {
        return axios
            .get(GENERATE_INVOICE + "/" + planId)
            .then((resp) => resp.data)
            .catch((err) => utils.showErrMsg(utils.handleErr(err)));
    },
};

export default Common;
