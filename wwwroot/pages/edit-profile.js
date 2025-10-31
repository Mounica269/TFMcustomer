


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Col, Container, Row, Accordion, Form, Button } from "react-bootstrap";
import { masterService, profileService } from "core/services";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { CONST, utils } from "core/helper";
import AsyncSelect from "react-select/async";
import { connect, useSelector } from "react-redux";
import {
    COLLAGE_FILTER,
    DEGREE_FILTER,
    PROFESSION_FILTER,
    RELIGION_FILTER,
    LANGUAGE_FILTER,
    COMPANY_FILTER,
    COUNTRY_PATH,
    STATE_PATH,
    CITY_PATH,
    COMMUNITY_FILTER_GET,
    PROFESSION_PATH,
    COLLAGE,
    DEGREE_PATH,
    COMPANY_PATH,
    COMMUNITY_FILTER,
    COMMUNITY_PATH,
    PROFESSION_GET_BY_ID,
    DEGREE_GET_BY_ID,
} from "core/services/apiURL.service";
import MyAccMatchLinks from "components/common/my-account-match-links";
import { reloadProfileAction } from "core/redux/account/account.action";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useRouter } from "next/router";

import ProfileSearch from "components/common/profile-search";

import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const validationSchema = Yup.object().shape({
    basic: Yup.object().shape({
        height: Yup.string(),
        maritalStatus: Yup.string(),
        religion: Yup.string(),
        language: Yup.string(),
        community: Yup.string(),
        sub_community: Yup.string(),
        diet: Yup.string(),
        profileFor: Yup.string(),
        isAnyDisability: Yup.string().nullable(),
        bloodGroup: Yup.string(),
        aboutYourSelf: Yup.string(),
    }),
    family: Yup.object().shape({
        fatherName: Yup.string(),
        motherName: Yup.string(),
        location: Yup.string(),
        familyType: Yup.string().nullable(),
        fatherBusiness: Yup.string(),
        motherBusiness: Yup.string(),
        nativePlace: Yup.string(),
        familyValue: Yup.string().nullable(),
        familyAffluence: Yup.string(),
        sibling: Yup.object().shape({
            noOfMale: Yup.string(),
            noOfMaleMarried: Yup.string(),
            noOfFemale: Yup.string(),
            noOfFemaleMarried: Yup.string(),
        }),
    }),
    qualification: Yup.object().shape({
        degree: Yup.string(),
        collage: Yup.string(),
        workWith: Yup.string(),
        profession: Yup.string(),
        currentCompanyName: Yup.string(),
        annualIncome: Yup.string(),
    }),
    location: Yup.object().shape({
        country: Yup.string(),
        state: Yup.string().label("State"),
        city: Yup.string().label("City"),
        // ethnicOrigin: Yup.string().default("IN"),
        residencyStatus: Yup.string().nullable(),
        zipCode: Yup.string().nullable(),
    }),
});

const ProfileEdit = (props) => {
    const { token, commonData, reloadProfileAction, reloadProfile } = props;
    const authProfile = useSelector((state) => state?.account?.profile);
    const router = useRouter();

    useEffect(() => {
        let navigationStep = "";
        switch (authProfile?.completedSteps) {
            case null:
                navigationStep = "?nav=step1";
                break;
            case 10:
                navigationStep = "?nav=step2";
                break;
            case 20:
                navigationStep = "?nav=step3";
                break;
            default:
                return;
        }
        utils.showErrMsg("Please complete your profile");
        router.push(CONST.PROFILE_COMPLETION_PATH + navigationStep);
    }, [authProfile]);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const countryWatch = watch("location.country");
    const stateWatch = watch("location.state");

    const religionWatch = watch("basic.religion");
    const communityWatch = watch("basic.community");
    const religionVal = watch("basic.religion");
    const communityVal = watch("basic.community");
    const professionVal = getValues("qualification.profession");
    const degreeVal = getValues("qualification.degree");

    const [filter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [profileDetail, setProfileDetail] = useState(null);
    const [countryFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [religion, setReligion] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [selectedSubCommunity, setSelectedSubCommunity] = useState(null);
    // const [deg, setDeg] = useState([]);
    // const [profes, setProfes] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [workWithVal, setWorkwithVal] = useState("");
    const [selectedCollage, setSelectedCollage] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [langFilter] = useState({ ...CONST.DEFAULT_ASYNC_LANG_FILTER });
    const [defaultFilter] = useState({ ...CONST.DEFAULT_FOR_PROFILE_FILTER });
    const [apiLoad, setApiLoad] = useState(false);
    const [fatherBusiness, setFatherBusiness] = useState("");
    const [motherBusiness, setMotherBusiness] = useState("");
    const [communityFilter] = useState({ ...CONST.COMMUNITY_FILTER });
    const [subCommunityFilter] = useState({ ...CONST.SUB_COMMUNITY_FILTER });
    const [professionFilter] = useState({ ...CONST.PROFESSION_FILTER });
    const [qualificationFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [companyFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [collageFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [profession, setProfession] = useState(null);
    const [degree, setDegree] = useState(null);
    console.log("profession::", profession);
    console.log("degree::", degree);

    const getCommonDataVal = (key, value) => {
        if (commonData === null) {
            return false;
        }
        const data = commonData[key]?.find((ele) => ele.code === value);
        return data ? data.label : false;
    };

    const loadProfile = async () => {
        setApiLoad(true);
        const resp = await profileService.getProfile();
        if (resp && resp.meta.code === 200) {
            setProfileDetail(resp.data);
            setFormvalues(resp.data);
            setApiLoad(false);
        }
    };

    const loadReligion = async () => {
        const resp = await masterService.getAll(RELIGION_FILTER + "/", {
            ...CONST.RELIGION_FILTER,
        });
        setReligion(resp.data);
    };

    // const loadCommunity = async () => {
    //     const resp = await masterService.getAll(COMMUNITY_FILTER_GET + "/", {
    //         ...CONST.DEFAULT_MASTER_FILTER,
    //     });
    //     return resp?.data;
    // };

    // const loadDegree = async () => {
    //     const resp = await masterService.getAll(DEGREE_FILTER + "/", {
    //         ...CONST.DEFAULT_MASTER_FILTER,
    //     });
    //     setDeg(resp.data);
    // };

    const loadCollage = async () => {
        const resp = await masterService.getAll(COLLAGE_FILTER + "/", {
            ...CONST.DEFAULT_MASTER_FILTER,
        });
        return resp?.data;
    };

    // const loadProfession = async () => {
    //     const resp = await masterService.getAll(PROFESSION_FILTER, {
    //         ...CONST.DEFAULT_MASTER_FILTER,
    //     });
    //     setProfes(resp.data);
    // };

    const loadCompany = async () => {
        const resp = await masterService.getAll(COMPANY_FILTER, { ...CONST.DEFAULT_MASTER_FILTER });
        if (resp && resp.meta.code === 200) {
            return resp?.data;
        }
        return;
    };

    const loadLanguageOptions = (inputValue) =>
        new Promise(async (resolve) => {
            if (inputValue) {
                langFilter.search = inputValue;
            }
            let languageArr = [];
            const resp = await masterService.getAll(LANGUAGE_FILTER, langFilter);
            if (resp && resp.meta.code === 200) {
                const { data: languageResp } = resp;
                languageArr = languageResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(languageArr);
        });

    const handleLanguageChange = (option) => {
        const { value, label } = option;
        setValue("basic.language", value, { shouldValidate: true });
        setSelectedLanguage({
            label: label,
            value: value,
        });
    };

    const loadCommunityOptions = (inputValue) =>
        new Promise(async (resolve) => {
            const religionValue = getValues("basic.religion");
            console.log("religionValue::", religionValue);
            communityFilter.filter = {
                religion: [religionValue ? religionValue : authProfile?.basic?.religion?._id],
            };
            if (inputValue) {
                communityFilter.search = inputValue;
            }
            let communityArr = [];
            const resp = await masterService.postFilter(COMMUNITY_FILTER, communityFilter);
            if (resp && resp.meta.code === 200) {
                const { data: communityResp } = resp;
                communityArr = communityResp.map((ele) => ({
                    value: ele._id,
                    label: ele.community + "-" + ele.religion.name,
                }));
            }
            resolve(communityArr);
        });

    const handleCommunityChange = async (option) => {
        const religionValue = getValues("basic.religion");

        if (option) {
            setValue("basic.community", option.value, { shouldValidate: true });
            setSelectedCommunity({
                label: option.label,
                value: option.value,
            });
            setSelectedSubCommunity(null);
            setValue("basic.sub_community", "");
            // communityFilter.search = "";
            subCommunityFilter.search = "";
            // if (option.__isNew__) {
            //     setValue("basic.sub_community", "");
            //     setSelectedSubCommunity(null);
            //     const payload = {
            //         religion: religionValue,
            //         community: option.value,
            //     };
            //     const resp = await masterService.postFilter(COMMUNITY_PATH, payload);
            //     if (resp && resp.meta.code === 200) {
            //         const { data } = resp;
            //         setValue("basic.community", data._id);
            //         utils.showSuccessMsg(resp.meta.message);
            //         setSelectedCommunity({
            //             label: data.community,
            //             value: data._id,
            //         });
            //         loadCommunity();
            //     }
            //     // else {
            //     //     utils.showErrMsg("error in creating community");
            //     // }
            // }
        } else {
            setValue("basic.community", "");
            setSelectedCommunity(null);
            subCommunityFilter.search = "";
        }
    };

    const loadSubCommunityOptions = (inputValue) =>
        new Promise(async (resolve) => {
            const religionValue = getValues("basic.religion");
            const communityValue = getValues("basic.community");
            console.log("communityValue::", communityValue);
            if (
                !religion ||
                religionValue === "" ||
                religionValue === undefined ||
                !communityValue ||
                communityValue === "" ||
                communityValue === undefined
            ) {
                resolve([]);
                return false;
            } else {
                subCommunityFilter.filter = {
                    religion: [religionValue ? religionValue : authProfile?.basic?.religion?._id],
                    parentCommunity: [
                        communityValue ? communityValue : authProfile?.basic?.community?._id,
                    ],
                };
            }
            console.log("communityValue::", communityValue);

            if (inputValue) {
                subCommunityFilter.search = inputValue;
            }
            let subCommunityArr = [];
            const resp = await masterService.postFilter(COMMUNITY_FILTER, subCommunityFilter);
            if (resp && resp.meta.code === 200) {
                const { data: communityResp } = resp;
                subCommunityArr = communityResp.map((ele) => ({
                    value: ele._id,
                    label: ele.community + "-" + ele.religion.name,
                }));
            }
            resolve(subCommunityArr);
        });

    const handleSubCommunityChange = async (option, meta) => {
        const religionValue = getValues("basic.religion");
        if (religionValue === undefined || religionValue === "" || option === undefined) {
            return;
        }

        if (option) {
            setValue("basic.sub_community", option.value, { shouldValidate: true });
            setSelectedSubCommunity({
                label: option.label,
                value: option.value,
            });
            // if (option.__isNew__) {
            //     const parentCommunityVal = getValues("basic.community");
            //     const payload = {
            //         religion: religionValue,
            //         parentCommunity: parentCommunityVal,
            //         community: option.value,
            //     };
            //     const resp = await masterService.postFilter(COMMUNITY_PATH, payload);
            //     if (resp && resp.meta.code === 200) {
            //         const { data } = resp;
            //         setValue("basic.sub_community", data._id);
            //         utils.showSuccessMsg("community created");
            //         setSelectedSubCommunity({
            //             label: data.community,
            //             value: data._id,
            //         });
            //         loadCommunity();
            //     }
            // }
        } else {
            setValue("basic.sub_community", "");
            setSelectedSubCommunity(null);
        }
    };

    const loadCountry = async (value) =>
        new Promise(async (resolve) => {
            countryFilter.search = value;
            const resp = await masterService.getAll(COUNTRY_PATH + "/filter", countryFilter);
            let countryArr = [];
            if (resp && resp.meta.code === 200) {
                const { data } = resp;
                countryArr = data.map((ele) => ({
                    label: ele.name,
                    value: ele._id,
                    ...ele,
                }));
            }
            resolve(countryArr);
        });

    const handleCountryChange = (value) => {
        const { name, _id } = value;
        setSelectedCountry({
            label: name,
            value: _id,
        });
        setValue("location.country", _id);
    };

    const loadStates = async (value) =>
        new Promise(async (resolve) => {
            const countryVal = getValues("location.country");
            filter.filter = {
                country: [countryVal],
            };
            filter.search = value;
            const resp = await masterService.postFilter(STATE_PATH + "/advance-filter", filter);
            let stateArr = [];
            if (resp && resp.meta.code === 200) {
                stateArr = resp.data.map((ele) => ({
                    label: ele.name,
                    value: ele._id,
                    ...ele,
                }));
            }
            resolve(stateArr);
        });

    const handleStateChange = (values) => {
        const { value, label } = values;
        setValue("location.state", value);
        setSelectedState({
            label: label,
            value: value,
        });
    };
    const handleBornAgainChange = (e) => {
        setProfileDetail({
            ...profileDetail,
            basic: {
                ...profileDetail.basic,
                isBornAgain: e.target.value === "true"
            }
        });
    };

    const loadCities = async (value) =>
        new Promise(async (resolve) => {
            const countryVal = getValues("location.country");
            const stateval = getValues("location.state");
            filter.filter = {
                country: [countryVal],
                state: [stateval],
            };
            filter.search = value;
            const resp = await masterService.postFilter(CITY_PATH + "/advance-filter", filter);
            let cityArr = [];
            if (resp && resp.meta.code === 200) {
                cityArr = resp.data.map((ele) => ({
                    label: ele.name,
                    value: ele._id,
                    ...ele,
                }));
            }
            resolve(cityArr);
        });

    const handleCityChange = (values) => {
        const cityArr = [];
        const { label, value } = values;
        setValue("location.city", value);
        cityArr.push({ value, label });
        setSelectedCity(cityArr);
    };

    const setFormvalues = (values) => {
        if (values) {
            const { basic, qualification, family, location } = values;
            delete basic.age;
            setValue("basic", basic);
            setValue("basic.religion", basic?.religion?._id);
            setValue("basic.community", basic?.community?._id);
            setValue("basic.language", basic?.language?._id);
            setValue("basic.sub_community", basic?.sub_community?._id);
            setValue(
                "basic.isAnyDisability",
                basic?.isAnyDisability?.toString() ? basic?.isAnyDisability?.toString() : "10"
            );
            setValue("basic.diet", basic?.diet?.toString());

            setValue("family", family);
            setValue("family.familyType", family?.familyType?.toString());
            setValue("family.familyValue", family?.familyValue?.toString());
            setFatherBusiness(family?.fatherBusiness);
            setMotherBusiness(family?.motherBusiness);

            const communityArr = [];
            const subCommunityArr = [];
            const collageArr = [];
            const degreeArr = [];
            const companyArr = [];
            const professionArr = [];
            const languageArr = [];
            languageArr.push({
                label: basic?.language?.name,
                value: basic?.language?._id,
            });
            communityArr.push({
                label: basic?.community?.community,
                value: basic?.community?._id,
            });
            subCommunityArr.push({
                label: basic?.sub_community?.community,
                value: basic?.sub_community?._id,
            });
            collageArr.push({
                label: qualification?.collage?.name,
                value: qualification?.collage?._id,
            });
            degreeArr.push({
                label: qualification?.degree?.name,
                value: qualification?.degree?._id,
            });
            companyArr.push({
                label: qualification?.currentCompanyName?.name,
                value: qualification?.currentCompanyName?._id,
            });
            professionArr.push({
                label: qualification?.profession?.name,
                value: qualification?.profession?._id,
            });
            setValue("qualification", {
                collage: qualification?.collage?._id,
                degree: qualification?.degree?._id,
                profession: qualification?.profession?._id,
                currentCompanyName: qualification?.currentCompanyName?._id,
                workWith: qualification?.workWith,
                annualIncome: qualification?.annualIncome,
            });
            setSelectedCommunity(communityArr);
            setSelectedSubCommunity(subCommunityArr);
            setSelectedCollage(collageArr);
            setSelectedDegree(degreeArr);
            setSelectedProfession(professionArr);
            setSelectedCompany(companyArr);
            setSelectedLanguage(languageArr);
            setWorkwithVal(qualification?.workWith?.toString());

            const countrArr = [];
            const stateArr = [];
            const cityArr = [];
            countrArr.push({
                label: location?.country?.name,
                value: location?.country?._id,
            });
            stateArr.push({
                label: location?.state?.name,
                value: location?.state?._id,
            });
            cityArr.push({
                label: location?.city?.name,
                value: location?.city?._id,
            });
            setValue("location.country", location?.country?._id);
            setValue("location.state", location?.state?._id);
            setValue("location.city", location?.city?._id);
            setValue("location.residencyStatus", location?.residencyStatus);
            setValue("location.zipCode", location?.zipCode);
            setSelectedCountry(countrArr);
            setSelectedState(stateArr);
            setSelectedCity(cityArr);
        }
    };

    const handleWorkwithChange = (e) => {
        const { value } = e.target;
        setWorkwithVal(value);
    };

    const handleRelgionChange = (e) => {
        const { value } = e.target;
        if (value === authProfile?.basic?.religion?._id) {
            setValue("basic.religion", value, { shouldValidate: true });
            setValue("basic.community", authProfile?.basic?.community?._id, {
                shouldValidate: true,
            });
            setValue("basic.sub_community", authProfile?.basic?.sub_community?._id, {
                shouldValidate: true,
            });
            setSelectedCommunity({
                label: authProfile?.basic?.community?.community,
                value: authProfile?.basic?.community?._id,
            });
            setSelectedSubCommunity({
                label: authProfile?.basic?.sub_community?.community,
                value: authProfile?.basic?.sub_community?._id,
            });
        } else {
            setValue("basic.religion", value, { shouldValidate: true });
            setSelectedCommunity(null);
            setSelectedSubCommunity(null);
            setValue("basic.community", "");
            setValue("basic.sub_community", "");
            communityFilter.search = "";
            subCommunityFilter.search = "";
        }
    };

    const loadDegreeOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            qualificationFilter.search = inputValue;
            const resp = await masterService.getAll(DEGREE_FILTER, qualificationFilter);
            let degreeArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: degreeResp } = resp;
                degreeArr = degreeResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                    ...ele,
                }));
            }
            resolve(degreeArr);
        });

    const handleDegreeChange = async (option) => {
        if (option) {
            setValue("qualification.degree", option.value, {
                shouldValidate: true,
            });
            setSelectedDegree({
                label: option?.label,
                value: option?.value,
            });
        }
        loadDegree(option._id);
        // if (option.__isNew__) {
        //     const payload = {
        //         name: option.value,
        //         degreeCategory: 160,
        //     };
        //     const resp = await masterService.postFilter(DEGREE_PATH, payload);
        //     if (resp && resp.meta.code === 200) {
        //         utils.showSuccessMsg(resp?.meta?.message);
        //         const { data } = resp;
        //         setValue("qualification.degree", data._id, {
        //             shouldValidate: true,
        //         });
        //         setSelectedDegree({
        //             label: data?.name,
        //             value: data?._id,
        //         });
        //         loadDegree();
        //     }
        // }
        // } else {
        //     setValue("qualification.degree", "");
        // }
    };

    const loadDegree = async (id) => {
        const resp = await masterService.getAll(DEGREE_GET_BY_ID + id);
        if (resp && resp.meta.code === 200) {
            setDegree(resp?.data);
        }
        return;
    };

    const loadCollageOptions = async (inputValue) =>
        // perform a request
        new Promise(async (resolve) => {
            collageFilter.search = inputValue;
            const resp = await masterService.getAll(COLLAGE_FILTER, collageFilter);
            let collageArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: collageResp } = resp;
                collageArr = collageResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                    ...ele,
                }));
            }
            resolve(collageArr);
        });

    const handleCollageChange = async (option) => {
        if (!option.__isNew__) {
            setValue("qualification.collage", option._id, {
                shouldValidate: true,
            });
            setSelectedCollage({
                label: option?.label,
                value: option?.value,
            });
        }
        if (option.__isNew__) {
            const payload = {
                name: option.value,
            };
            const resp = await masterService.postFilter(COLLAGE, payload);
            if (resp && resp.meta.code === 200) {
                const { data } = resp;
                setValue("qualification.collage", data._id, {
                    shouldValidate: true,
                });
                setSelectedCollage({
                    label: data?.name,
                    value: option?._id,
                });
                utils.showSuccessMsg(resp.meta.message);
                loadCollage();
            }
        }
    };

    const loadCompanyOptions = async (inputValue) =>
        // perform a request
        new Promise(async (resolve) => {
            companyFilter.search = inputValue;
            const resp = await masterService.getAll(COMPANY_FILTER, companyFilter);
            let companyArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: companyResp } = resp;
                companyArr = companyResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                    ...ele,
                }));
            }
            resolve(companyArr);
        });

    const handleCompanyChange = async (option) => {
        if (option) {
            if (!option.__isNew__) {
                setValue("qualification.currentCompanyName", option._id, {
                    shouldValidate: true,
                });
                setSelectedCompany({
                    label: option?.label,
                    value: option?.value,
                });
            }
            if (option.__isNew__) {
                const payload = {
                    name: option.value,
                };
                const resp = await masterService.postFilter(COMPANY_PATH, payload);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    setValue("qualification.currentCompanyName", data._id, {
                        shouldValidate: true,
                    });
                    setSelectedCompany({
                        label: data?.name,
                        value: data?.value,
                    });
                    utils.showSuccessMsg(resp.meta.message);
                    loadCompany();
                }
            }
        } else {
            setValue("qualification.currentCompanyName", "");
            setSelectedCompany(null);
        }
    };

    const loadProfessionOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            professionFilter.search = inputValue;
            const resp = await masterService.getAll(PROFESSION_FILTER, professionFilter);
            let companyArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: companyResp } = resp;
                companyArr = companyResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                    ...ele,
                }));
            }
            resolve(companyArr);
        });

    const handleProfessionChange = async (option) => {
        setValue("qualification.profession", option._id, {
            shouldValidate: true,
        });
        setSelectedProfession({
            label: option?.label,
            value: option?._id,
        });
        loadProfession(option._id);
        // if (option.__isNew__) {
        //     const payload = {
        //         name: option.value,
        //         professionCategory: 21,
        //     };
        //     const resp = await masterService.postFilter(PROFESSION_PATH, payload);
        //     if (resp && resp.meta.code === 200) {
        //         utils.showSuccessMsg(resp?.meta?.message);
        //         const { data } = resp;
        //         setValue("qualification.profession", data._id, {
        //             shouldValidate: true,
        //         });
        //         setSelectedProfession({
        //             label: data?.name,
        //             value: data?._id,
        //         });
        //         loadProfession();
        //     }
        // }
    };

    const loadProfession = async (id) => {
        const resp = await masterService.getAll(PROFESSION_GET_BY_ID + id);
        if (resp && resp.meta.code === 200) {
            setProfession(resp?.data);
        }
        return;
    };

    const payloadValueCheck = (key) => {
        if (Object.keys(key.location).length === 0) {
            delete key.location;
        }
    };

    const payloadBasicCheck = (key) => {
        Object.keys(key).map((val) => {
            if (key[val] === undefined || key[val] === null || key[val] === "") {
                delete key[val];
            }
        });
    };

    const payloadLocationCheck = (key) => {
        Object.keys(key).map((val) => {
            if (key[val] === undefined || key[val] === null || key[val] === "") {
                delete key[val];
            }
        });
    };

    const payloadFamilyCheck = (key) => {
        Object.keys(key).map((val) => {
            if (key[val] === undefined || key[val] === null || key[val] === "") {
                delete key[val];
            }
        });
        Object.keys(key.sibling).map((val) => {
            if (
                key.sibling[val] === undefined ||
                key.sibling[val] === null ||
                key.sibling[val] === ""
            ) {
                delete key.sibling[val];
            }
        });
    };

    const payloadQualifyCheck = (key) => {
        Object.keys(key).map((val) => {
            if (key[val] === undefined || key[val] === null || key[val] === "") {
                delete key[val];
            }
        });
    };

    const handleFatherOccupationChange = (e) => {
        const { value } = e.target;
        const regex = /^[A-Za-z\s]+$/;
        if (value === "" || regex.test(value)) {
            setValue("family.fatherBusiness", value);
            setFatherBusiness(value);
        }
    };

    const handleMotherOccupationChange = (e) => {
        const { value } = e.target;
        const regex = /^[A-Za-z\s]+$/;
        if (value === "" || regex.test(value)) {
            setValue("family.motherBusiness", value);
            setMotherBusiness(value);
        }
    };

    useEffect(() => {
        if (degreeVal) {
            loadDegree(degreeVal);
        }
    }, [degreeVal]);

    useEffect(() => {
        if (professionVal) {
            loadProfession(professionVal);
        }
    }, [professionVal]);

    const onSubmit = async (values) => {
        const payload = { ...values };
        delete payload.qualification.income;

        if (workWithVal === "30" || workWithVal === "40" || workWithVal === "50") {
            delete payload.qualification.currentCompanyName;
        }
        if (workWithVal === "50") {
            delete payload.qualification.currentCompanyName;
            delete payload.qualification.annualIncome;
            delete payload.qualification.profession;
        }

        if (payload.qualification.degree) {
            // const degreeCategoryObj = deg?.find((ele) => ele._id === payload.qualification.degree);
            // const degreeCategoryObj = degree?._id === payload.qualification.degree;
            payload.qualification.degreeCategory = degree?.degreeCategory;
        }
        if (payload.qualification.profession) {
            // const professionCategoryObj = profession?.find(
            //     (ele) => ele._id === payload.qualification.profession
            // );
            // const professionCategoryObj = profession?._id === payload.qualification.profession;
            payload.qualification.professionCategory = profession?.professionCategory;
        }
        payloadValueCheck(payload);

        payloadBasicCheck(payload.basic);
        payloadLocationCheck(payload.location);
        payloadFamilyCheck(payload.family);
        payloadQualifyCheck(payload.family);
        // delete payload.location.ethnicOrigin;

        const resp = await profileService.updateProfile(payload);
        if (resp && resp.meta.code === 200) {
            reloadProfileAction(!reloadProfile);
            utils.showSuccessMsg(CONST.PROFILE_UPDATE_MSG);
        }
    };

    useEffect(() => {
        if (token) {
            loadProfile();
            loadReligion();
            // loadCommunity();
            // loadDegree();
            loadCollage();
            // loadProfession();
            loadCompany();
        }
    }, [token]);



    return (
        <>

      <Head>
  <title>
    Edit | True Friend Matrimony | Christian Matrimony 
  </title>
  <meta
    name="description"
    content="Edit and update your Christian matrimony profile on True Friend Matrimony. Customize your personal details, partner preferences, and photos to connect with the right faith-based matches for marriage."
  />
  <meta
    name="keywords"
    content="Christian matrimony, Christian matrimony site, edit Christian profile, Christian marriage, update matrimony profile, Christian matchmaking, faith-based matrimony, Christian wedding profile, church matrimony, Christian marriage site"
  />
  <link rel="canonical" href="https://www.truefriendmatrimony.com/edit-profile" />

  {/* ✅ Open Graph for Facebook/LinkedIn */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Edit Your Christian Matrimony Profile - True Friend Matrimony" />
  <meta property="og:description" content="Update your Christian matrimony profile with preferences and photos. Connect with genuine faith-based matches at True Friend Matrimony." />
  <meta property="og:url" content="https://www.truefriendmatrimony.com/edit-profile" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>



            <Row className="justify-content-center">
                <Col lg={12} md={12} className="mb-3 mt-5 pt-3" style={{ maxWidth: "1200px" }}>
                    <Row>
                        <Col lg={3}>
                            <div className="db-profile mt-5 pt-3">
                                <MyAccMatchLinks />

                            </div>
                            <div className="mt-5 pt-0">
                                <ProfileSearch />
                            </div>
                        </Col>

                        <Col lg={9}>

                            <div className="db-pro-stat p-3 mt-5">
                                <div className="row" style={{ padding: "0px" }}>
                                    {apiLoad && <h5>Loading</h5>}
                                    {!apiLoad && profileDetail && (
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Accordion
                                                className="boxed"
                                                defaultActiveKey={[
                                                    "0",
                                                    "1",
                                                    "2",
                                                    "3",
                                                    "4",
                                                    "5",
                                                    "6",
                                                ]}
                                                alwaysOpen
                                            >
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <h4> Basic Information</h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }} >
                                                        <div className="wrapper" >
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Profile created for
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-flex">
                                                                        {commonData &&
                                                                            profileDetail &&
                                                                            getCommonDataVal(
                                                                                "profileFor",
                                                                                profileDetail?.basic
                                                                                    ?.profileFor
                                                                            )}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Gender
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <div className="d-flex">
                                                                        {commonData &&
                                                                            profileDetail &&
                                                                            getCommonDataVal(
                                                                                "gender",
                                                                                profileDetail?.basic
                                                                                    ?.gender
                                                                            )}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <label className="label">
                                                                        Height
                                                                    </label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-block">
                                                                        <Form.Select
                                                                            className="selecthide"
                                                                            {...register(
                                                                                "basic.height"
                                                                            )}
                                                                        >
                                                                            <option value="">
                                                                                Select
                                                                            </option>
                                                                            {commonData &&
                                                                                commonData.heightTypes &&
                                                                                commonData.heightTypes.map(
                                                                                    (ele, ind) => (
                                                                                        <option
                                                                                            key={
                                                                                                ind
                                                                                            }
                                                                                            value={
                                                                                                ele.code
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                ele.label
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </Form.Select>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Disability
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-flex">
                                                                        {commonData &&
                                                                            commonData.disabilityStatus &&
                                                                            commonData.disabilityStatus.map(
                                                                                (ele, ind) => (
                                                                                    <Form.Label
                                                                                        key={ind}
                                                                                        className="d-flex mx-1"
                                                                                    >
                                                                                        <Form.Check
                                                                                            {...register(
                                                                                                "basic.isAnyDisability"
                                                                                            )}
                                                                                            type="radio"
                                                                                            value={
                                                                                                ele.code
                                                                                            }
                                                                                        />

                                                                                        {ele.label}
                                                                                    </Form.Label>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Blood Group
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Select
                                                                        className="selecthide"
                                                                        {...register(
                                                                            "basic.bloodGroup"
                                                                        )}
                                                                    >
                                                                        <option value="">
                                                                            Select
                                                                        </option>
                                                                        {commonData &&
                                                                            commonData.bloodGroup &&
                                                                            commonData.bloodGroup.map(
                                                                                (ele, ind) => (
                                                                                    <option
                                                                                        value={
                                                                                            ele.code
                                                                                        }
                                                                                        key={ind}
                                                                                    >
                                                                                        {ele.label}
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                    </Form.Select>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Date of Birth
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Label className="bold">
                                                                        {
                                                                            profileDetail?.basic
                                                                                ?.dateOfBirth
                                                                        }
                                                                    </Form.Label>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Marital status
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-block">
                                                                        <Form.Select
                                                                            className="selecthide"
                                                                            {...register(
                                                                                "basic.maritalStatus"
                                                                            )}
                                                                        >
                                                                            <option value="">
                                                                                Select
                                                                            </option>
                                                                            {commonData &&
                                                                                commonData.maritalStatus &&
                                                                                commonData.maritalStatus.map(
                                                                                    (ele, ind) => (
                                                                                        <option
                                                                                            key={
                                                                                                ind
                                                                                            }
                                                                                            value={
                                                                                                ele.code
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                ele.label
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </Form.Select>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        <h4> Religious Background</h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }}>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Religion
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-block">
                                                                        <Form.Select
                                                                            className="selecthide"
                                                                            {...register(
                                                                                "basic.religion"
                                                                            )}
                                                                            onChange={
                                                                                handleRelgionChange
                                                                            }
                                                                        >
                                                                            <option value="">
                                                                                Select
                                                                            </option>
                                                                            {religion &&
                                                                                religion.map(
                                                                                    (ele, ind) => (
                                                                                        <option
                                                                                            value={
                                                                                                ele._id
                                                                                            }
                                                                                            key={
                                                                                                ind
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                ele.name
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </Form.Select>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Mother Tongue
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-block">
                                                                        <AsyncSelect
                                                                            cacheOptions
                                                                            defaultOptions
                                                                            loadOptions={
                                                                                loadLanguageOptions
                                                                            }
                                                                            onChange={
                                                                                handleLanguageChange
                                                                            }
                                                                            value={selectedLanguage}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Community
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <AsyncSelect
                                                                        cacheOptions
                                                                        defaultOptions
                                                                        loadOptions={
                                                                            loadCommunityOptions
                                                                        }
                                                                        onChange={
                                                                            handleCommunityChange
                                                                        }
                                                                        key={religionWatch}
                                                                        value={selectedCommunity}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label d-inline">
                                                                        Sub - Community
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div>
                                                                        <AsyncSelect
                                                                            cacheOptions
                                                                            defaultOptions
                                                                            loadOptions={
                                                                                loadSubCommunityOptions
                                                                            }
                                                                            onChange={
                                                                                handleSubCommunityChange
                                                                            }
                                                                            key={
                                                                                communityWatch ||
                                                                                religionWatch
                                                                            }
                                                                            value={
                                                                                selectedSubCommunity
                                                                            }
                                                                            isDisabled={
                                                                                !communityVal ||
                                                                                communityVal ===
                                                                                "" ||
                                                                                communityVal ===
                                                                                undefined
                                                                            }
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label d-inline">
                                                                        Are you a Born Again Christian?
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div>
                                                                        <Form.Check
                                                                            {...register("basic.isBornAgain")}
                                                                            type="radio"
                                                                            value="true"
                                                                            label="Yes"
                                                                            checked={profileDetail.basic?.isBornAgain === true}
                                                                            onChange={handleBornAgainChange}
                                                                        />
                                                                        &nbsp;
                                                                        <Form.Check
                                                                            {...register("basic.isBornAgain")}
                                                                            type="radio"
                                                                            value="false"
                                                                            label="No"
                                                                            // checked={profileDetail.basic?.isBornAgain === false}
                                                                            checked={
                                                                                profileDetail.basic?.isBornAgain === false ||
                                                                                profileDetail.basic?.isBornAgain === undefined
                                                                            }
                                                                            onChange={handleBornAgainChange}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        <h4>Family</h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }}>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Father Name
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        className="selecthide"
                                                                        {...register(
                                                                            "family.fatherName"
                                                                        )}
                                                                        type="text"
                                                                        placeholder="Father Name"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Mother Name
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        className="selecthide"
                                                                        {...register(
                                                                            "family.motherName"
                                                                        )}
                                                                        type="text"
                                                                        placeholder="Mother Name"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Father's Occupation
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        {...register(
                                                                            "family.fatherBusiness"
                                                                        )}
                                                                        type="text"
                                                                        className="textboxhide"
                                                                        maxLength="50"
                                                                        placeholder="Father's Occupation"
                                                                        // pattern="[a-zA-Z]*"
                                                                        value={fatherBusiness}
                                                                        onChange={
                                                                            handleFatherOccupationChange
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Mother's Occupation
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        {...register(
                                                                            "family.motherBusiness"
                                                                        )}
                                                                        type="text"
                                                                        className="textboxhide"
                                                                        maxLength="50"
                                                                        placeholder="Mother's Occupation"
                                                                        onChange={
                                                                            handleMotherOccupationChange
                                                                        }
                                                                        value={motherBusiness}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Location
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        {...register(
                                                                            "family.location"
                                                                        )}
                                                                        type="text"
                                                                        className="textboxhide"
                                                                        maxLength="100"
                                                                        placeholder="Family Location"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Native Place
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        {...register(
                                                                            "family.nativePlace"
                                                                        )}
                                                                        type="text"
                                                                        className="textboxhide input_width"
                                                                        maxLength="100"
                                                                        placeholder="Enter native place"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Siblings
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Row>
                                                                        <Col lg={6} md={12} xs={12}>
                                                                            <Row className="text-center">
                                                                                <Col md={5}>
                                                                                    <Form.Control
                                                                                        {...register(
                                                                                            "family.sibling.noOfMale"
                                                                                        )}
                                                                                        type="text"
                                                                                        className=""
                                                                                        maxLength="2"
                                                                                    />
                                                                                    <span>
                                                                                        Not married
                                                                                    </span>
                                                                                </Col>
                                                                                <Col
                                                                                    md={2}
                                                                                    className=""
                                                                                >
                                                                                    <div>
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="30"
                                                                                            height="60"
                                                                                            viewBox="0 0 24 24"
                                                                                            fill="#dc3545"
                                                                                        >
                                                                                            <path
                                                                                                d="M9 11.75C8.66848 11.75 8.35054 11.8817 8.11612 12.1161C7.8817 12.3505 7.75 12.6685 7.75 13C7.75 13.3315 7.8817 13.6495 8.11612 13.8839C8.35054 14.1183 8.66848 14.25 9 14.25C9.16415 14.25 9.3267 14.2177 9.47835 14.1548C9.63001 14.092 9.76781 14 9.88388 13.8839C9.99996 13.7678 10.092 13.63 10.1548 13.4784C10.2177 13.3267 10.25 13.1642 10.25 13C10.25 12.8358 10.2177 12.6733 10.1548 12.5216C10.092 12.37 9.99996 12.2322 9.88388 12.1161C9.76781 12 9.63001 11.908 9.47835 11.8452C9.3267 11.7823 9.16415 11.75 9 11.75ZM15 11.75C14.6685 11.75 14.3505 11.8817 14.1161 12.1161C13.8817 12.3505 13.75 12.6685 13.75 13C13.75 13.3315 13.8817 13.6495 14.1161 13.8839C14.3505 14.1183 14.6685 14.25 15 14.25C15.3315 14.25 15.6495 14.1183 15.8839 13.8839C16.1183 13.6495 16.25 13.3315 16.25 13C16.25 12.6685 16.1183 12.3505 15.8839 12.1161C15.6495 11.8817 15.3315 11.75 15 11.75ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 11.71 4 11.42 4.05 11.14C6.41 10.09 8.28 8.16 9.26 5.77C10.4033 7.39238 12.0046 8.63679 13.859 9.34401C15.7135 10.0512 17.7367 10.1891 19.67 9.74C19.88 10.45 20 11.21 20 12C20 16.41 16.41 20 12 20Z"
                                                                                                fill="#dc3545"
                                                                                            />
                                                                                        </svg>
                                                                                    </div>
                                                                                </Col>
                                                                                <Col md={5}>
                                                                                    <Form.Control
                                                                                        {...register(
                                                                                            "family.sibling.noOfMaleMarried"
                                                                                        )}
                                                                                        type="text"
                                                                                        maxLength="2"
                                                                                    />
                                                                                    <span>
                                                                                        Married
                                                                                    </span>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col lg={6} md={12} xs={12}>
                                                                            <Row className="text-center">
                                                                                <Col md={5}>
                                                                                    <Form.Control
                                                                                        {...register(
                                                                                            "family.sibling.noOfFemale"
                                                                                        )}
                                                                                        type="text"
                                                                                        maxLength="2"
                                                                                    // onBlur={(event) => handleNoOfSiblings("family.sibling.noOfFemale", event.target.value)}
                                                                                    />
                                                                                    <span>
                                                                                        Not married
                                                                                    </span>
                                                                                </Col>
                                                                                <Col md={2}>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="30"
                                                                                        height="60"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="#dc3545"
                                                                                    >
                                                                                        <path
                                                                                            d="M19.5 1L18.41 3.41L16 4.5L18.41 5.59L19.5 8L20.6 5.59L23 4.5L20.6 3.41M12 2C6.5 2 2 6.5 2 12V22H22V12C22 10.53 21.67 9.13 21.1 7.87L19.86 10.57C19.95 11.04 20 11.5 20 12C20 16.43 16.43 20 12 20C7.57 20 4 16.43 4 12V11.86C5.28881 11.3826 6.46446 10.6428 7.45252 9.68746C8.44057 8.73211 9.21951 7.58202 9.74 6.31C10.8199 7.63838 12.223 8.66707 13.8147 9.29744C15.4064 9.92782 17.1334 10.1387 18.83 9.91L17.96 8H17.5C14.68 8 12.1 6.5 10.66 4.12C11.1 4.05 11.54 4 12 4C12.5 4 12.96 4.05 13.42 4.13L16.13 2.91C14.8354 2.31153 13.4263 2.00105 12 2ZM8.09 5C7.46094 6.90287 6.15015 8.50575 4.41 9.5C5.04 7.57 6.37 6 8.09 5ZM9 11.75C8.66848 11.75 8.35054 11.8817 8.11612 12.1161C7.8817 12.3505 7.75 12.6685 7.75 13C7.75 13.3315 7.8817 13.6495 8.11612 13.8839C8.35054 14.1183 8.66848 14.25 9 14.25C9.33152 14.25 9.64946 14.1183 9.88388 13.8839C10.1183 13.6495 10.25 13.3315 10.25 13C10.25 12.6685 10.1183 12.3505 9.88388 12.1161C9.64946 11.8817 9.33152 11.75 9 11.75ZM15 11.75C14.6685 11.75 14.3505 11.8817 14.1161 12.1161C13.8817 12.3505 13.75 12.6685 13.75 13C13.75 13.3315 13.8817 13.6495 14.1161 13.8839C14.3505 14.1183 14.6685 14.25 15 14.25C15.3315 14.25 15.6495 14.1183 15.8839 13.8839C16.1183 13.6495 16.25 13.3315 16.25 13C16.25 12.6685 16.1183 12.3505 15.8839 12.1161C15.6495 11.8817 15.3315 11.75 15 11.75ZM4 17.97C4.58 18.74 5.26 19.42 6.03 20H4M20 17.97V20H17.97C18.74 19.42 19.42 18.74 20 17.97Z"
                                                                                            fill="#dc3545"
                                                                                        />
                                                                                    </svg>
                                                                                </Col>
                                                                                <Col md={5}>
                                                                                    <Form.Control
                                                                                        {...register(
                                                                                            "family.sibling.noOfFemaleMarried"
                                                                                        )}
                                                                                        type="text"
                                                                                        className=""
                                                                                        maxLength="2"
                                                                                    // onBlur={(event) => handleNoOfSiblings("family.sibling.noOfFemaleMarried", event.target.value)}
                                                                                    />
                                                                                    <span>
                                                                                        Married
                                                                                    </span>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Family Type
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="family_radio_wrap d-flex">
                                                                        {commonData &&
                                                                            commonData.familyType &&
                                                                            commonData.familyType.map(
                                                                                (ele, ind) => (
                                                                                    <Form.Check
                                                                                        key={ind}
                                                                                    >
                                                                                        <Form.Check.Label className="mx-1">
                                                                                            <Form.Check.Input
                                                                                                type="radio"
                                                                                                name="FamilyType"
                                                                                                {...register(
                                                                                                    "family.familyType"
                                                                                                )}
                                                                                                value={
                                                                                                    ele.code
                                                                                                }
                                                                                            />
                                                                                            {
                                                                                                ele.label
                                                                                            }
                                                                                        </Form.Check.Label>
                                                                                    </Form.Check>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Family Values
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <div className="d-flex">
                                                                        {commonData &&
                                                                            commonData.familyValue &&
                                                                            commonData.familyValue.map(
                                                                                (ele, ind) => (
                                                                                    <Form.Check
                                                                                        key={ind}
                                                                                    >
                                                                                        <Form.Check.Label className="mx-1">
                                                                                            <Form.Check.Input
                                                                                                {...register(
                                                                                                    "family.familyValue"
                                                                                                )}
                                                                                                type="radio"
                                                                                                value={
                                                                                                    ele.code
                                                                                                }
                                                                                            />
                                                                                            {
                                                                                                ele.label
                                                                                            }
                                                                                        </Form.Check.Label>
                                                                                    </Form.Check>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Family Affluence
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Select
                                                                        className="selecthide"
                                                                        {...register(
                                                                            "family.familyAffluence"
                                                                        )}
                                                                    >
                                                                        <option value="">
                                                                            Select
                                                                        </option>
                                                                        {commonData &&
                                                                            commonData.familyAffluence &&
                                                                            commonData.familyAffluence.map(
                                                                                (ele, ind) => (
                                                                                    <option
                                                                                        value={
                                                                                            ele.code
                                                                                        }
                                                                                        key={ind}
                                                                                    >
                                                                                        {ele.label}
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                    </Form.Select>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="3">
                                                    <Accordion.Header>
                                                        <h4> Education & Career </h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }}>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Highest Qualification
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <AsyncSelect
                                                                        cacheOptions
                                                                        defaultOptions
                                                                        loadOptions={
                                                                            loadDegreeOptions
                                                                        }
                                                                        onChange={
                                                                            handleDegreeChange
                                                                        }
                                                                        value={selectedDegree}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        College Attended
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <AsyncCreatableSelect
                                                                        cacheOptions
                                                                        defaultOptions
                                                                        loadOptions={
                                                                            loadCollageOptions
                                                                        }
                                                                        onChange={
                                                                            handleCollageChange
                                                                        }
                                                                        value={selectedCollage}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Working With
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Select
                                                                        className="selecthide"
                                                                        {...register(
                                                                            "qualification.workWith"
                                                                        )}
                                                                        onChange={
                                                                            handleWorkwithChange
                                                                        }
                                                                    >
                                                                        <option
                                                                            value=""
                                                                            label="Select"
                                                                        >
                                                                            Select
                                                                        </option>
                                                                        {commonData &&
                                                                            commonData.workWithTypes &&
                                                                            commonData.workWithTypes.map(
                                                                                (ele, ind) => (
                                                                                    <option
                                                                                        value={
                                                                                            ele.code
                                                                                        }
                                                                                        key={ind}
                                                                                    >
                                                                                        {ele.label}
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                    </Form.Select>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {workWithVal !== "50" && (
                                                            <div className="wrapper">
                                                                <Row>
                                                                    <Col lg={3} md={3} xs={12}>
                                                                        <Form.Label className="label">
                                                                            Profession
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} md={9} xs={12}>
                                                                        <AsyncSelect
                                                                            cacheOptions
                                                                            defaultOptions
                                                                            loadOptions={
                                                                                loadProfessionOptions
                                                                            }
                                                                            onChange={
                                                                                handleProfessionChange
                                                                            }
                                                                            value={
                                                                                selectedProfession
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        )}
                                                        {workWithVal !== "50" && (
                                                            <div className="wrapper">
                                                                <Row>
                                                                    <Col lg={3} md={3} xs={12}>
                                                                        <Form.Label className="label">
                                                                            Annual Income
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} md={9} xs={12}>
                                                                        <div>
                                                                            <Form.Select
                                                                                className="selecthide"
                                                                                {...register(
                                                                                    "qualification.annualIncome"
                                                                                )}
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                    label="Select"
                                                                                >
                                                                                    Select
                                                                                </option>
                                                                                {commonData &&
                                                                                    commonData.yearlyIncome &&
                                                                                    commonData.yearlyIncome.map(
                                                                                        (
                                                                                            ele,
                                                                                            ind
                                                                                        ) => (
                                                                                            <option
                                                                                                value={
                                                                                                    ele.code
                                                                                                }
                                                                                                key={
                                                                                                    ind
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    ele.label
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        )}
                                                        {(workWithVal === "10" ||
                                                            workWithVal === "20") && (
                                                                <div className="wrapper">
                                                                    <Row>
                                                                        <Col lg={3} md={3} xs={12}>
                                                                            <Form.Label className="label">
                                                                                Company
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={9} md={9} xs={12}>
                                                                            <AsyncCreatableSelect
                                                                                cacheOptions
                                                                                defaultOptions
                                                                                loadOptions={
                                                                                    loadCompanyOptions
                                                                                }
                                                                                onChange={
                                                                                    handleCompanyChange
                                                                                }
                                                                                value={selectedCompany}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="4">
                                                    <Accordion.Header>
                                                        <h4>Life Style</h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }}>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Dietary Preferences
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12} >
                                                                    {commonData &&
                                                                        commonData.dietTypes &&
                                                                        commonData.dietTypes.map(
                                                                            (ele, ind) => (
                                                                                <Form.Label
                                                                                    key={ind}
                                                                                    className="d-flex mx-2  d-flex1"
                                                                                >
                                                                                    <Form.Check
                                                                                        {...register(
                                                                                            "basic.diet"
                                                                                        )}
                                                                                        type="radio"
                                                                                        value={
                                                                                            ele.code
                                                                                        }
                                                                                    />

                                                                                    {ele.label}
                                                                                </Form.Label>
                                                                            )
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="5">
                                                    <Accordion.Header><h4>Location</h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }}>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Country
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <AsyncSelect
                                                                        defaultOptions
                                                                        cacheOptions
                                                                        loadOptions={loadCountry}
                                                                        value={selectedCountry}
                                                                        onChange={
                                                                            handleCountryChange
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        State
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <AsyncSelect
                                                                        defaultOptions
                                                                        cacheOptions
                                                                        loadOptions={loadStates}
                                                                        value={selectedState}
                                                                        onChange={handleStateChange}
                                                                        key={countryWatch}
                                                                        placeholder="Select"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label
                                                                        className="label "
                                                                        id=""
                                                                    >
                                                                        City
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <AsyncSelect
                                                                        defaultOptions
                                                                        cacheOptions
                                                                        loadOptions={loadCities}
                                                                        value={selectedCity}
                                                                        onChange={handleCityChange}
                                                                        placeholder="Select"
                                                                        key={stateWatch}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Residential Status
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Select
                                                                        className="selecthide"
                                                                        {...register(
                                                                            "location.residencyStatus"
                                                                        )}
                                                                    >
                                                                        <option value="">
                                                                            Select
                                                                        </option>
                                                                        {commonData &&
                                                                            commonData.residencyStatus &&
                                                                            commonData.residencyStatus.map(
                                                                                (ele, ind) => (
                                                                                    <option
                                                                                        value={
                                                                                            ele.code
                                                                                        }
                                                                                        key={ind}
                                                                                    >
                                                                                        {ele.label}
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                    </Form.Select>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="wrapper">
                                                            <Row>
                                                                <Col lg={3} md={3} xs={12}>
                                                                    <Form.Label className="label">
                                                                        Zip/Pin Code
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9} md={9} xs={12}>
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="textboxhide"
                                                                        {...register(
                                                                            "location.zipCode"
                                                                        )}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="6">
                                                    <Accordion.Header>
                                                        <h4> More About Yourself</h4>
                                                    </Accordion.Header>
                                                    <Accordion.Body style={{ textAlign: "left" }}>
                                                        <p>
                                                            This section will help you make a strong
                                                            impression on your potential partner.
                                                            So, express yourself. (NOTE: This
                                                            section will be screened everytime you
                                                            update it. Allow upto 24 hours for it to
                                                            go live.)
                                                        </p>
                                                        <span className="text-left">
                                                            Personality, Family Details, Career,
                                                            Partner Expectations etc.
                                                            <Link href="#" className="float-right">
                                                                Help me write this
                                                            </Link>
                                                        </span>

                                                        <div className="livespell_textarea">
                                                            <Form.Control
                                                                as="textarea"
                                                                {...register("basic.aboutYourSelf")}
                                                                defaultValue={`It is a pleasure introducing myself. As far as my education is concerned, I have obtained a Bachelors degree in Engineering. I am working as a Hardware &amp; Networking professional.In my personal life, I believe in 'simple living and high thinking'. I am looking for a simple and honest partner who will stand by me in every phase of life. I'm glad my profile caught your eye.`}
                                                            />
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Button
                                                    type="submit"
                                                    className="cta-dark mt-3"
                                                    disabled={isSubmitting}
                                                    style={{ border: "none" }}
                                                >
                                                    Submit
                                                </Button>
                                            </Accordion>
                                        </Form>
                                    )}
                                </div>
                            </div>



                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        reloadProfile: state.account?.reloadProfile,
        authProfile: state.account?.profile,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
