import axios from '../config/axios';
import { utils } from 'core/helper';
import { REGISTER_STEP_1, REGISTER_STEP_2, REGISTER_STEP_3, } from './apiURL.service';

const Profile = {
    registerStep1: function (payload) {
        return axios.post(REGISTER_STEP_1, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    registerStep2: function (payload) {
        return axios.post(REGISTER_STEP_2, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    },
    registerStep3: function (payload) {
        return axios.post(REGISTER_STEP_3, payload)
            .then((resp) => resp.data)
            .catch(err => utils.showErrMsg(utils.handleErr(err)));
    }
};

export default Profile;