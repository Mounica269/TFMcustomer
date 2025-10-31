import axios from '../config/axios';
import { utils } from 'core/helper';
import {
    COMMUNITY_FILTER, LANGUAGE_FILTER, RELIGION_FILTER, LANGUAGE_CREATE,
    DEGREE_FILTER, COLLAGE_FILTER, PROFESSION_FILTER, COMPANY_FILTER, IS_VALID
} from './apiURL.service';

const Master = {
    getAll: function (urlPath, filter) {
        if (filter) {
            Object.keys(filter).forEach((f) => filter[f] === "" && delete filter[f]);
            const filterString = new URLSearchParams(filter).toString();
            return axios.get(urlPath + '?' + filterString)
                .then((resp) => resp.data)
                .catch(error => utils.showErrMsg(utils.handleErr(error)));
        } else {
            return axios.get(urlPath)
                .then((resp) => resp.data)
                .catch(error => utils.showErrMsg(utils.handleErr(error)));
        }
    },

    postFilter: function (urlPath, filter) {
        return axios.post(urlPath, filter)
            .then((resp) => resp.data)
            .catch(error => utils.showErrMsg(utils.handleErr(error)));
    },

    getAllLanguage: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios.get(LANGUAGE_FILTER + "?" + filterString)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    createLanguage: function (payload) {
        return axios.get(LANGUAGE_CREATE, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    getAllCommunity: function (filter) {
        Object.keys(filter).forEach((k) => filter[k] === "" && delete filter[k]);
        const filterString = new URLSearchParams(filter).toString();
        return axios.get(COMMUNITY_FILTER + '?' + filterString)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    getAllReligion: function () {
        return axios.get(RELIGION_FILTER)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    getAllDegree: function () {
        return axios.get(DEGREE_FILTER)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    getAllCollage: function () {
        return axios.get(COLLAGE_FILTER)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    getAllProfession: function () {
        return axios.get(PROFESSION_FILTER)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    getAllCompany: function () {
        return axios.get(COMPANY_FILTER)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    isValid: function (payload) {
        return axios.post(IS_VALID, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
};

export default Master;