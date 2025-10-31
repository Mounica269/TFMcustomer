import { Fragment, useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TooltipSlider from "components/common/TooltipSlider";
import {
    CONST,
    utils,
    masterService,
    profileService,
    COMMUNITY_FILTER,
    DEGREE_FILTER,
    LANGUAGE_FILTER,
    PROFESSION_FILTER,
    RELIGION_FILTER,
    PREFERENCE,
    COUNTRY_PATH,
    STATE_SEARCH_PATH,
    CITY_SEARCH_PATH,
} from "core";
import AsyncSelect from "react-select/async";
import { reloadAction } from "core";

import dynamic from 'next/dynamic';
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";


const isOpen = CONST.DEFAULT_IS_OPEN;

const annualIncomeIsOpenAllArr = [
    {
        name: "Open to all",
        value: "true",
    },
    {
        name: "Specify an income range",
        value: "false",
    },
];
const preferenceSchema = Yup.object().shape(
    {
        age: Yup.object().shape({
            from: Yup.number(),
            to: Yup.number(),
        }),
        height: Yup.object().shape({
            from: Yup.number(),
            to: Yup.number(),
        }),

        maritalStatus: Yup.array().of(Yup.string()).min(0).label("Marital Status").required(),
        religion: Yup.array().of(Yup.string()).min(0).label("Religion").required(),
        community: Yup.array().of(Yup.string()).min(0).label("Community").required(),
        language: Yup.array().of(Yup.string()).min(0).label("Language").required(),

        hasMore: Yup.string(),

        country: Yup.array().when("hasMore", {
            is: "true",
            then: Yup.array().of(Yup.string()).min(0).label("country").required(),
        }),
        state: Yup.array().when("country", {
            is: (values) => utils.checkStateValidation(values),
            then: Yup.array().of(Yup.string()).min(0).label("state").required(),
        }),
        city: Yup.array().when("state", {
            is: (values) => utils.checkCityValidation(values),
            then: Yup.array().of(Yup.string()).min(0).label("city").required(),
        }),

        degree: Yup.array().when("hasMore", {
            is: "true",
            then: Yup.array().of(Yup.string()).min(0).label("degree").required(),
        }),
        workingWith: Yup.array().when("hasMore", {
            is: "true",
            then: Yup.array().of(Yup.string()).min(0).label("workingWith").required(),
        }),
        professionArea: Yup.array().when("hasMore", {
            is: "true",
            then: Yup.array().of(Yup.string()).min(0).label("professionArea").required(),
        }),

        annualisOpenAll: Yup.string(),
        annualIncome: Yup.object().shape({
            from: Yup.string(),
            to: Yup.string(),
        }),

        profileCreatedBy: Yup.array().when("hasMore", {
            is: "true",
            then: Yup.array().of(Yup.string()).min(0).label("profileCreatedBy").required(),
        }),
        diet: Yup.array().when("hasMore", {
            is: "true",
            then: Yup.array().of(Yup.string()).min(0).label("diet").required(),
        }),
    },
    ["hasMore", "country", "state"]
);

const PartnerPreferences = (props) => {
    const { token, commonData, reloadAction } = props;

    const authProfile = useSelector((state) => state.account?.profile);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        watch,
        resetField,
    } = useForm({
        defaultValues: {
            annualisOpenAll: "true",
            hasMore: "false",
        },
        resolver: yupResolver(preferenceSchema),
    });

    const hasMore = watch("hasMore");
    const countryWatch = watch("country");
    const stateWatch = watch("state");
    const religionWatch = watch("religion");

    const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });
    const { heightTypes = null } = commonData;

    const ageFrom = 18,
        ageTo = 90,
        heightFrom = 53,
        heightTo = 88;
    const [ageObj, setAgeObj] = useState({
        from: ageFrom,
        to: ageTo,
    });

    const [heightObj, setHeightObj] = useState({ from: heightFrom, to: heightTo });
    const [heightLabelObj, setHeightLabelObj] = useState({ from: null, to: null });
    const [rangeHeight, setRangeHeight] = useState({});
    const [userPreferenceObj, setUserPreferenceObj] = useState(null);
    const [maritalStatusOptions, setMaritalStatusOptions] = useState([...isOpen]);
    const [maritalStatusesSelected, setMaritalStatusesSelected] = useState([...isOpen]);
    const [religionOptions, setReligionOptions] = useState([...isOpen]);
    const [religionsSelected, setReligionsSelected] = useState([...isOpen]);
    const [communitiesSelected, setCommunitiesSelected] = useState([...isOpen]);
    const [languageOptions, setLanguageOptions] = useState([...isOpen]);
    const [languagesSelected, setLanguagesSelected] = useState([...isOpen]);

    const [countryOptions, setCountryOptions] = useState([...isOpen]);
    const [countrySelected, setCountrySelected] = useState([...isOpen]);
    const [stateOptions, setStateOptions] = useState([...isOpen]);
    const [stateSelected, setStateSelected] = useState([...isOpen]);
    const [cityOptions, setCityOptions] = useState([...isOpen]);
    const [citiesSelected, setCitiesSelected] = useState([...isOpen]);

    const [degreeOptions, setDegreeOptions] = useState([...isOpen]);
    const [degreeSelected, setDegreeSelected] = useState([...isOpen]);
    const [workWithOptions, setWorkwithOptions] = useState([...isOpen]);
    const [workwithSelected, setWorkwithSelected] = useState([...isOpen]);
    const [professionOptions, setProfessionOptions] = useState([...isOpen]);
    const [professionSelected, setProfessionSelected] = useState([...isOpen]);

    const [profileCreatedByOptions, setProfileCreatedByOptions] = useState([...isOpen]);
    const [dietOptions, setDietOptions] = useState([...isOpen]);
    const [religionFilter] = useState({ ...CONST.RELIGION_FILTER });
    const [languageFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [communityFilter] = useState({ ...CONST.COMMUNITY_FILTER });
    const [countryFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [stateFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [cityFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [degreeFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [professionFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProfilePreference();
    }, [token, religionOptions, languageOptions]);

    useEffect(() => {
        if (hasMore === "true") {
            intializeAdvancedInputs();
            getDegree({ ...filter });
            getProfession({ ...filter });
            getWorkwith({ ...filter });
            getProfileCreatedBy();
            getProfileDietTypes();
        }
    }, [hasMore, userPreferenceObj]);

    useEffect(() => {
        if (
            userPreferenceObj?.hasMore &&
            degreeOptions.length > 1 &&
            professionOptions.length > 1 &&
            (countryOptions.length > 1 || stateOptions || cityOptions)
        ) {
            updateAdvancedInputs(userPreferenceObj);
        }
    }, [
        token,
        userPreferenceObj,
        degreeOptions,
        professionOptions,
        countryOptions,
        stateOptions,
        cityOptions,
    ]);

    const arrayRange = (start, end) =>
        Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    const createHeightRangeArray = (heightTypes) => {
        const rangeObj = {};
        arrayRange(heightFrom, heightTo).forEach(
            (ele, ind) => (rangeObj[ele] = { ...heightTypes?.[ind], inputVal: ele })
        );
        setRangeHeight(rangeObj);
    };

    const intializeHeightObjAndLabel = (rangeHeightArr) => {
        const fromObj = Object.values(rangeHeightArr).find((e) => e.inputVal === heightFrom);
        const toObj = Object.values(rangeHeightArr).find((e) => e.inputVal === heightTo);

        setHeightObj({
            from: fromObj?.inputVal,
            to: toObj?.inputVal,
        });
        setHeightLabelObj({ from: fromObj?.label, to: toObj?.label });
        setValue("height", { from: fromObj?.inputVal, to: toObj?.inputVal });
    };

    useEffect(() => {
        if (Object.values(rangeHeight).length > 0) {
            intializeHeightObjAndLabel(rangeHeight);
        }
    }, [rangeHeight]);

    const intializeInputs = () => {
        setValue("age", { from: ageObj.from, to: ageObj.to });
        setValue("height", { from: heightObj.from, to: heightObj.to });
        setValue("maritalStatus", []);
        setValue("religion", []);
        setValue("community", []);
        setValue("language", []);
    };

    const intializeAdvancedInputs = () => {
        setValue("country", []);
        setValue("state", []);
        setValue("city", []);

        setValue("degree", []);
        setValue("workingWith", []);
        setValue("professionArea", []);

        setValue("profileCreatedBy", []);
        setValue("diet", []);
        // setValue("annualIncome", {});
        // setValue("annualisOpenAll", "true");
    };

    const handleChangeAgeRange = (value) => {
        const [from, to] = value;
        setAgeObj({ from, to });
        setValue("age", { from, to });
    };

    const handleChangeHeightRange = (value) => {
        const [from, to] = value;

        const fromHeightObj = Object.values(rangeHeight).find((e) => e.inputVal === from);
        const toHeightObj = Object.values(rangeHeight).find((e) => e.inputVal === to);
        setHeightObj({
            from: fromHeightObj?.inputVal,
            to: toHeightObj?.inputVal,
        });

        setHeightLabelObj({
            from: fromHeightObj?.label,
            to: toHeightObj?.label,
        });
        setValue("height", { from: from, to: to });
    };

    const handleToggleAction = () => {
        const previousHasMore = getValues("hasMore");
        setValue("hasMore", previousHasMore === "true" ? "false" : "true");
    };

    const formatMaritalStatus = () => {
        const commonMaritalStatus = commonData?.maritalStatus?.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonMaritalStatus) {
            const setMartialStatusArr = [...commonMaritalStatus];
            setMaritalStatusOptions(setMartialStatusArr);
        }
    };

    const getSelectBoxFormatArr = (data, { label, value }) => {
        const arr = [];
        data?.map((ele) => arr.push({ label: ele[label], value: ele[value] }));
        return arr;
    };

    const getReligion = async (religionFilter) => {
        const resp = await masterService.getAll(RELIGION_FILTER + "/", religionFilter);
        if (resp && resp.meta.code === 200) {
            const updateDataArr = getSelectBoxFormatArr(resp.data, { label: "name", value: "_id" });
            setReligionOptions([...updateDataArr]);
        }
    };

    const getLanguage = async (filter) => {
        const resp = await masterService.getAll(LANGUAGE_FILTER + "/", filter);
        if (resp && resp.meta.code === 200) {
            const updateDataArr = getSelectBoxFormatArr(resp.data, { label: "name", value: "_id" });
            setLanguageOptions([...languageOptions, ...updateDataArr]);
        }
    };

    const loadCountryOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            countryFilter.search = inputValue;
            let countryArr = [];
            const resp = await masterService.getAll(COUNTRY_PATH + "/filter", filter);
            if (resp && resp.meta.code === 200) {
                const { data: countryResp } = resp;
                countryArr = countryResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(countryArr);
        });

    const loadStateOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            const countryValue = getValues("country");
            if (countryValue !== "" || countryValue !== undefined) {
                stateFilter.filter = {
                    country: countryValue,
                };
            }
            stateFilter.search = inputValue;
            let stateArr = [];
            const resp = await masterService.postFilter(STATE_SEARCH_PATH, stateFilter);
            if (resp && resp.meta.code === 200) {
                const { data: stateResp } = resp;
                stateArr = stateResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(stateArr);
        });

    const loadCityOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            const countryValue = getValues("country");
            const stateValue = getValues("state");
            if (
                countryValue !== "" ||
                countryValue !== undefined ||
                stateValue !== "" ||
                stateValue !== undefined
            ) {
                cityFilter.filter = {
                    country: countryValue,
                    state: stateValue,
                };
            }
            cityFilter.search = inputValue;
            let stateArr = [];
            const resp = await masterService.postFilter(CITY_SEARCH_PATH, cityFilter);
            if (resp && resp.meta.code === 200) {
                const { data: stateResp } = resp;
                stateArr = stateResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(stateArr);
        });

    const getDegree = async (filter) => {
        const resp = await masterService.getAll(DEGREE_FILTER + "/", filter);
        if (resp && resp.meta.code === 200) {
            const updateDataArr = getSelectBoxFormatArr(resp.data, { label: "name", value: "_id" });
            setDegreeOptions([...degreeOptions, ...updateDataArr]);
        }
    };

    const getWorkwith = () => {
        const updateDataArr = getSelectBoxFormatArr(commonData?.workWithTypes, {
            label: "label",
            value: "code",
        });
        setWorkwithOptions([...updateDataArr]);
    };

    const getProfession = async (filter) => {
        const resp = await masterService.getAll(PROFESSION_FILTER + "/", filter);
        if (resp && resp.meta.code === 200) {
            const updateDataArr = getSelectBoxFormatArr(resp.data, { label: "name", value: "_id" });
            setProfessionOptions([...professionOptions, ...updateDataArr]);
        }
    };

    const getProfileCreatedBy = () => {
        const updateDataArr = getSelectBoxFormatArr(commonData?.profileFor, {
            label: "label",
            value: "code",
        });
        setProfileCreatedByOptions([...profileCreatedByOptions, ...updateDataArr]);
    };

    const getProfileDietTypes = () => {
        const updateDataArr = getSelectBoxFormatArr(commonData?.dietTypes, {
            label: "label",
            value: "code",
        });
        setDietOptions([...dietOptions, ...updateDataArr]);
    };

    const handleCommonBlur = (selectedArr, selectedFunc, fieldName) => {
        if (selectedArr.length === 0) {
            selectedFunc([...isOpen]);
            setValue(fieldName, []);
        }
    };

    const handleCommonChange = (selectedValues, selectedFunc, fieldName) => {
        if (selectedValues.length > 0) {
            const [{ value }] = isOpen;

            if (selectedValues[0] && selectedValues[0].value === 0) {
                selectedValues.splice(0, 1);
                selectedFunc([...selectedValues]);

                const arr = [];
                selectedValues.map((ele) => arr.push(ele.value));
                setValue(fieldName, arr, { shouldValidate: true });
            } else {
                const arr = [];
                selectedValues.map((ele) => arr.push(ele.value));

                const isOpenAvailable = selectedValues.find((ele) => ele.value === 0);

                selectedFunc(isOpenAvailable ? [...isOpen] : [...selectedValues]);
                setValue(fieldName, isOpenAvailable ? [] : arr, { shouldValidate: true });
            }
        } else {
            selectedFunc([]);
            setValue(fieldName, [], { shouldValidate: true });
        }
    };

    const handleMaritalStatusBlur = () =>
        handleCommonBlur(maritalStatusesSelected, setMaritalStatusesSelected, "maritalStatus");
    const handleMaritalStatusChange = (values) =>
        handleCommonChange(values, setMaritalStatusesSelected, "maritalStatus");

    const handleReligionBlur = () =>
        handleCommonBlur(religionsSelected, setReligionsSelected, "religion");
    const handleReligionChange = (values) => {
        handleCommonChange(values, setReligionsSelected, "religion");
        setCommunitiesSelected([...isOpen]);
        setValue("community", []);
        communityFilter.search = "";
    };

    const handleCommunityBlur = () =>
        handleCommonBlur(communitiesSelected, setCommunitiesSelected, "community");

    const handleLanguageBlur = () =>
        handleCommonBlur(languagesSelected, setLanguagesSelected, "language");

    const handleDegreeBlur = () => handleCommonBlur(degreeSelected, setDegreeSelected, "degree");

    const handleWorkwithBlur = () =>
        handleCommonBlur(workwithSelected, setWorkwithSelected, "workingWith");

    const handleProfessionBlur = () =>
        handleCommonBlur(professionSelected, setProfessionSelected, "professionArea");

    const handleCountryBlur = () =>
        handleCommonBlur(countrySelected, setCountrySelected, "country");
    const handleCountryChange = (values) => {
        handleCommonChange(values, setCountrySelected, "country");
        setStateSelected([...isOpen]);
        setCitiesSelected([...isOpen]);
        setValue("state", []);
        setValue("city", []);
    };

    const handleStateBlur = () => handleCommonBlur(stateSelected, setStateSelected, "state");
    const handleStateChange = (values) => {
        handleCommonChange(values, setStateSelected, "state");
        setCitiesSelected([...isOpen]);
        setValue("city", []);
    };

    const handleCityBlur = () => handleCommonBlur(citiesSelected, setCitiesSelected, "city");
    const handleCityChange = (values) => handleCommonChange(values, setCitiesSelected, "city");

    const loadReligionOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            religionFilter.search = inputValue;
            let religionArr = [];
            const resp = await masterService.getAll(RELIGION_FILTER, religionFilter);
            if (resp && resp.meta.code === 200) {
                const { data: religionResp } = resp;
                religionArr = religionResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(religionArr);
        });

    const loadCommunityOptions = async (inputValue) =>
        // perform a request
        new Promise(async (resolve) => {
            const religionValue = getValues("religion");
            if (religionValue === undefined) {
                return;
            }
            if (religionValue === "") {
                return false;
            }

            communityFilter.filter = {
                religion: religionValue,
            };
            // communityFilter.religion = religionValue;
            communityFilter.search = inputValue;
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

    const handleCommunityChange = async (option, meta) => {
        const religionValue = getValues("religion");
        if (religionValue === undefined) {
            return;
        }
        if (religionValue === "") {
            return false;
        }

        const values = option;
        handleCommonChange(values, setCommunitiesSelected, "community");
    };

    const loadLanguageOptions = async (inputValue) =>
        // perform a request
        new Promise(async (resolve) => {
            languageFilter.search = inputValue;
            let languageArr = [];
            const resp = await masterService.getAll(LANGUAGE_FILTER, languageFilter);
            if (resp && resp.meta.code === 200) {
                const { data: languageResp } = resp;
                languageArr = languageResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(languageArr);
        });

    const handleLanguageChange = async (option) => {
        const values = option;
        handleCommonChange(values, setLanguagesSelected, "language");
    };

    const loadDegreeOption = async (inputValue) =>
        new Promise(async (resolve) => {
            degreeFilter.search = inputValue;
            let degreeArr = [];
            const resp = await masterService.getAll(DEGREE_FILTER, degreeFilter);
            if (resp && resp.meta.code === 200) {
                const { data: degreeResp } = resp;
                degreeArr = degreeResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(degreeArr);
        });

    const handleDegreeChange = async (option) => {
        const values = option;
        handleCommonChange(values, setDegreeSelected, "degree");
    };

    const LoadWorkWithOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            filter.search = inputValue;
            let workWithArr = [];
            workWithArr = commonData?.workWithTypes?.map((ele) => ({
                value: ele.code,
                label: ele.label,
            }));
            resolve(workWithArr);
        });

    const handleWorkWithChange = async (option) => {
        const values = option;
        handleCommonChange(values, setWorkwithSelected, "workingWith");
    };

    const loadProfessionOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            professionFilter.search = inputValue;
            let professionArr = [];
            const resp = await masterService.getAll(PROFESSION_FILTER, professionFilter);
            if (resp && resp.meta.code === 200) {
                const { data: professionResp } = resp;
                professionArr = professionResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(professionArr);
        });

    const handleProfessionChange = async (option) => {
        const values = option;
        handleCommonChange(values, setProfessionSelected, "professionArea");
    };

    useEffect(() => {
        if (heightTypes !== null) {
            createHeightRangeArray(heightTypes);
            intializeInputs();
        }
        if (commonData !== null) {
            formatMaritalStatus();
            getReligion({ ...religionFilter });
            getLanguage({ ...filter });
        }
    }, [commonData, heightTypes]);

    // useEffect(() => {
    //     const heightVal = getValues("height")
    //     console.log("height set values::",heightVal);
    // },[])

    const updateInputs = (data) => {
        const {
            age,
            height,
            maritalStatus = [],
            religion = [],
            community = [],
            language = [],
            hasMore: preferenceHasMore,
        } = data;

        const maritalStatusCond = maritalStatus !== undefined && maritalStatus.length === 0;
        const religionCond = religion !== undefined && religion.length === 0;
        const communityCond = community !== undefined && community.length === 0;
        const languageCond = language !== undefined && language.length === 0;

        if (age !== undefined) {
            setValue("age", age);
            setAgeObj({ from: age.from, to: age.to });
        }
        if (
            height !== undefined &&
            Object.values(rangeHeight).length > 0 &&
            height?.from &&
            height?.to
        ) {
            // setValue("height", height);
            const fromHeightObj = Object.values(rangeHeight).find((e) => e.code === height.from);
            const toHeightObj = Object.values(rangeHeight).find((e) => e.code === height.to);
            setHeightObj({ from: fromHeightObj?.inputVal, to: toHeightObj?.inputVal });
            setHeightLabelObj({
                from: fromHeightObj?.label,
                to: toHeightObj?.label,
            });
            setValue("height.from", fromHeightObj?.inputVal);
            setValue("height.to", toHeightObj?.inputVal);
        }

        setValue("maritalStatus", maritalStatusCond ? [] : maritalStatus);
        setValue("religion", religionCond ? [] : religion.map((ele) => ele._id));
        setValue("community", communityCond ? [] : community.map((ele) => ele._id));
        setValue("language", languageCond ? [] : language.map((ele) => ele._id));

        const getSelMarital = maritalStatusCond
            ? {}
            : maritalStatusOptions.filter((ele) => maritalStatus.includes(ele.value));
        const getSelReligions = religionCond
            ? {}
            : religionOptions.filter((ele) => religion.find((ele2) => ele2._id === ele.value));
        const getSelCommonities = communityCond
            ? {}
            : community.map((ele) => {
                return { value: ele._id, label: ele.community };
            });
        const getSelLanguages = languageCond
            ? {}
            : language.map((ele) => {
                return { value: ele._id, label: ele.name };
            });
        // languageOptions.filter((ele) => language.find((ele2) => ele2._id === ele.value));
        setMaritalStatusesSelected(maritalStatusCond ? [...isOpen] : getSelMarital);
        setReligionsSelected(religionCond ? [...isOpen] : getSelReligions);
        setCommunitiesSelected(communityCond ? [...isOpen] : getSelCommonities);
        setLanguagesSelected(languageCond ? [...isOpen] : getSelLanguages);

        preferenceHasMore === true ? handleToggleAction() : "";
    };

    const updateAdvancedInputs = (data) => {
        const { location, qualification, otherDetails } = data;
        if (location !== undefined) {
            const { country = [], state = [], city = [] } = location;

            const countryCond = country !== undefined && country.length === 0;
            const stateCond = state !== undefined && state.length === 0;
            const cityCond = city !== undefined && city.length === 0;

            setValue("country", countryCond ? [] : country.map((ele) => ele._id));
            setValue("state", stateCond ? [] : state.map((ele) => ele._id));
            setValue("city", cityCond ? [] : city.map((ele) => ele._id));

            const getSelCountry = countryCond
                ? {}
                : country.map((ele) => {
                    return {
                        value: ele._id,
                        label: ele.name,
                    };
                });

            const getSelState = countryCond
                ? {}
                : state.map((ele) => {
                    return {
                        value: ele._id,
                        label: ele.name,
                    };
                });

            const getSelCity = countryCond
                ? {}
                : city.map((ele) => {
                    return {
                        value: ele._id,
                        label: ele.name,
                    };
                });

            setCountrySelected(countryCond ? [...isOpen] : getSelCountry);
            setStateSelected(stateCond ? [...isOpen] : getSelState);
            setCitiesSelected(cityCond ? [...isOpen] : getSelCity);
        }

        if (qualification !== undefined) {
            const {
                degree = [],
                professionArea = [],
                workingWith = [],
                annualIncome,
            } = qualification;

            const degreeCond = degree && degree.length === 0;
            const workingWithCond = workingWith && workingWith.length === 0;
            const professionAreaCond = professionArea && professionArea.length === 0;
            setValue("degree", degreeCond ? [] : degree.map((ele) => ele._id));
            setValue("workingWith", workingWithCond ? [] : workingWith);
            setValue(
                "professionArea",
                professionAreaCond ? [] : professionArea.map((ele) => ele._id)
            );

            setValue("annualisOpenAll", annualIncome ? "false" : "true", { shouldValidate: true });
            setAnnualIncomeIsOpenAll(annualIncome ? "false" : "true");
            setValue("annualIncome.from", annualIncome?.from, { shouldValidate: true });
            setValue("annualIncome.to", annualIncome?.to, { shouldValidate: true });

            const getSelDegree = degreeCond
                ? {}
                : degree.map((ele) => {
                    return {
                        value: ele._id,
                        label: ele.name,
                    };
                });
            // degreeOptions.filter((ele) => degree.find((ele2) => ele2._id === ele.value));
            const getSelWorkingWith = workingWithCond
                ? {}
                : workWithOptions.filter((ele) => workingWith.includes(ele.value));
            const getSelProfessionArea = professionAreaCond
                ? {}
                : professionArea.map((ele) => {
                    return {
                        value: ele._id,
                        label: ele.name,
                    };
                });
            // professionOptions.filter((ele) =>
            //       professionArea.find((ele2) => ele2._id === ele.value)
            //   );

            setDegreeSelected(degreeCond ? [...isOpen] : getSelDegree);
            setWorkwithSelected(workingWithCond ? [...isOpen] : getSelWorkingWith);
            setProfessionSelected(professionAreaCond ? [...isOpen] : getSelProfessionArea);
        }

        if (otherDetails !== undefined) {
            const { profileCreatedBy = [], diet = [] } = otherDetails;

            const profileCreatedByCond = profileCreatedBy && profileCreatedBy.length === 0;
            const dietCond = diet && diet.length === 0;

            setValue(
                "profileCreatedBy",
                profileCreatedByCond ? [] : profileCreatedBy.map((ele) => ele.toString())
            );
            setValue("diet", dietCond ? [] : diet.map((ele) => ele.toString()));

            // const getSelProfileCreatedBy = profileCreatedByCond
            //     ? {}
            //     : profileCreatedByOptions.filter((ele) => profileCreatedBy.includes(ele.value));
            // const getSelDiets = dietCond ? {} : dietOptions.filter((ele) => diet.includes(ele.value));

            // setProfileCreatedBySelected(profileCreatedByCond ? [...isOpen] : getSelProfileCreatedBy);
            // setDietSelected(dietCond ? [...isOpen] : getSelDiets);
        }
    };

    const loadProfilePreference = async () => {
        const resp = await masterService.getAll(PREFERENCE);
        if (resp && resp.meta.code === 200 && resp.data) {
            setUserPreferenceObj(resp.data);
            updateInputs(resp.data);
        }
    };

    const partnerPreferenceSubmit = async (values) => {
        const heightVal = getValues("height");
        console.log("height val::", heightVal);
        // setLoading(true);
        const {
            age,
            height,
            maritalStatus,
            religion,
            community,
            language,
            hasMore,
            country,
            state,
            city,
            degree,
            workingWith,
            professionArea,
            annualIncome,
            profileCreatedBy,
            diet,
        } = values;
        // console.log("height::",height);

        let advancedPreference = {};
        if (hasMore === "true") {
            advancedPreference = {
                location: {
                    country,
                    state,
                    city,
                },
                qualification: {
                    degree,
                    workingWith,
                    professionArea,
                    annualIncome: annualIncome ? annualIncome : undefined,
                },
                otherDetails: {
                    profileCreatedBy,
                    diet,
                },
            };
        }

        const formatFromHeight = Object.values(rangeHeight).find(
            (ele) => ele?.inputVal === height.from
        );
        console.log("formatFromHeight::", formatFromHeight);
        const formatToHeight = Object.values(rangeHeight).find(
            (ele) => ele?.inputVal === height.to
        );
        console.log("formatToHeight::", formatToHeight);

        const payloadObj = {
            age,
            height: {
                from: formatFromHeight?.code,
                to: formatToHeight?.code,
            },
            maritalStatus,
            religion,
            community,
            language,
            hasMore: hasMore === "true" ? true : false,
            ...advancedPreference,
        };
        // return false;
        const resp = await profileService.addPartnerPreference(payloadObj);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            reloadAction(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const [annualIncomeIsOpenAll, setAnnualIncomeIsOpenAll] = useState("");

    const handleAnnualIncomeChange = (e) => {
        const { value } = e.target;
        setAnnualIncomeIsOpenAll(value);
        setValue("annualisOpenAll", value);
        if (value === "true") {
            resetField("annualIncome.from");
            resetField("annualIncome.to");
        }
    };

    const handleFromChange = (e) => {
        const { value } = e.target;
        setValue("annualIncome.from", value, { shouldValidate: true });
    };

    const handleToChange = (e) => {
        const { value } = e.target;
        setValue("annualIncome.to", value, { shouldValidate: true });
    };

    return (
        <>
       <Head>
    <title>Partner Preferences | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Set and manage your partner preferences on True Friend Christian Matrimony. Find faith-aligned Christian matches compatible with your values, lifestyle, and life goals."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Partner Preferences, Christian Matrimonial Services, Faith-Based Matchmaking, Ideal Christian Partner, Christian Singles, Christian Marriage, True Friend Matrimony, Trusted Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/my-matrimony/partner-preferences" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Partner Preferences | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Set your partner preferences on True Friend Christian Matrimony to find compatible Christian matches who share your faith and values."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/my-matrimony/partner-preferences" />



</Head>



            <section className="page-section-ptb4 pb-6 mt-4">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Col md={10}>
                            <div className="bg-white p-5">
                                <Form onSubmit={handleSubmit(partnerPreferenceSubmit)}>
                                    <div>
                                        <div className="form-tit">

                                            <h1>Tell us your preferences for your life partner</h1>
                                            <h4>Basic Details</h4>
                                        </div>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <label className="lb">Age</label>
                                            </Col>
                                            <Col md={9}>
                                                <div className="d-flex justify-content-between">
                                                    <label>From {ageObj.from} years</label>
                                                    <label>To {ageObj.to} years</label>
                                                </div>
                                                <TooltipSlider
                                                    range
                                                    min={ageFrom}
                                                    max={ageTo}
                                                    value={[ageObj.from, ageObj.to - 1]}
                                                    onChange={handleChangeAgeRange}
                                                />
                                                <p className="text-danger">{errors.age?.message}</p>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <label className="lb">Height</label>
                                            </Col>
                                            <Col md={9}>
                                                <div className="d-flex justify-content-between">
                                                    <label>From {heightLabelObj.from}</label>
                                                    <label>To {heightLabelObj.to}</label>
                                                </div>
                                                <TooltipSlider
                                                    range
                                                    min={heightFrom}
                                                    max={heightTo}
                                                    value={[heightObj.from, heightObj.to]}
                                                    onChange={handleChangeHeightRange}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <label className="lb">Marital status</label>
                                            </Col>
                                            <Col md={9}>
                                                <Select
                                                    isMulti
                                                    options={maritalStatusOptions}
                                                    value={maritalStatusesSelected}
                                                    onChange={handleMaritalStatusChange}
                                                    onBlur={handleMaritalStatusBlur}
                                                />
                                                <p className="text-danger">
                                                    {errors.maritalStatus?.message}
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <label className="lb">Religion</label>
                                            </Col>
                                            <Col md={9}>
                                                <AsyncSelect
                                                    isMulti
                                                    defaultOptions
                                                    cacheOptions
                                                    loadOptions={loadReligionOptions}
                                                    value={religionsSelected}
                                                    onChange={handleReligionChange}
                                                    onBlur={handleReligionBlur}
                                                />
                                                <p className="text-danger">
                                                    {errors.religion?.message}
                                                </p>
                                            </Col>
                                        </Row>
                                        {religionWatch && religionWatch.length > 0 && (
                                            <Row className="mt-2 mb-2">
                                                <Col md={3}>
                                                    <label className="lb">Community</label>
                                                </Col>
                                                <Col md={9}>
                                                    <Fragment>
                                                        <AsyncSelect
                                                            isMulti
                                                            cacheOptions
                                                            defaultOptions
                                                            value={communitiesSelected}
                                                            loadOptions={loadCommunityOptions}
                                                            onChange={handleCommunityChange}
                                                            onBlur={handleCommunityBlur}
                                                            key={religionWatch}
                                                        />
                                                        <p className="text-danger text-start">
                                                            {errors.community?.message}
                                                        </p>
                                                    </Fragment>
                                                </Col>
                                            </Row>
                                        )}
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <label className="lb">Mother tongue</label>
                                            </Col>
                                            <Col md={9}>
                                                <AsyncSelect
                                                    isMulti
                                                    cacheOptions
                                                    defaultOptions
                                                    loadOptions={loadLanguageOptions}
                                                    value={languagesSelected}
                                                    onChange={handleLanguageChange}
                                                    onBlur={handleLanguageBlur}
                                                />
                                                <p className="text-danger">
                                                    {errors.language?.message}
                                                </p>
                                            </Col>
                                        </Row>
                                        {hasMore === "false" ? (
                                            <Row className="mt-2 mb-2">
                                                <Col md={12} className="text-center">
                                                    <button
                                                        type="button"
                                                        className="cta-dark"
                                                        onClick={handleToggleAction}
                                                    >
                                                        more <i className="bi bi-chevron-down px-1"></i>
                                                    </button>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <Fragment>
                                                <div className="form-tit">
                                                    <h4>Location Details</h4>

                                                </div>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Country Living In</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <AsyncSelect
                                                            isMulti
                                                            defaultOptions
                                                            cacheOptions
                                                            loadOptions={loadCountryOptions}
                                                            value={countrySelected}
                                                            onChange={handleCountryChange}
                                                            onBlur={handleCountryBlur}
                                                        />
                                                        <p className="text-danger">
                                                            {errors.country?.message}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                {countryWatch && countryWatch.length > 0 && (
                                                    <Row className="mt-2 mb-2">
                                                        <Col md={3}>
                                                            <label className="lb">State Living In</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <AsyncSelect
                                                                isMulti
                                                                defaultOptions
                                                                cacheOptions
                                                                loadOptions={loadStateOptions}
                                                                value={stateSelected}
                                                                onChange={handleStateChange}
                                                                onBlur={handleStateBlur}
                                                                key={countryWatch}
                                                            />
                                                            <p className="text-danger">
                                                                {errors.state?.message}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                )}
                                                {stateWatch && stateWatch.length > 0 && (
                                                    <Row className="mt-2 mb-2">
                                                        <Col md={3}>
                                                            <label className="lb">City Living In</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <AsyncSelect
                                                                isMulti
                                                                defaultOptions
                                                                cacheOptions
                                                                loadOptions={loadCityOptions}
                                                                value={citiesSelected}
                                                                onChange={handleCityChange}
                                                                onBlur={handleCityBlur}
                                                                key={stateWatch}
                                                            />
                                                            <p className="text-danger">
                                                                {errors.city?.message}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                )}
                                                <div className="form-tit">
                                                    <h4>Education & Profession Details</h4>

                                                </div>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Qualification</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <AsyncSelect
                                                            isMulti
                                                            defaultOptions
                                                            cacheOptions
                                                            options={degreeOptions}
                                                            value={degreeSelected}
                                                            loadOptions={loadDegreeOption}
                                                            onChange={handleDegreeChange}
                                                            onBlur={handleDegreeBlur}
                                                        />
                                                        <p className="text-danger">
                                                            {errors.degree?.message}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Working with</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <AsyncSelect
                                                            isMulti
                                                            defaultOptions
                                                            cacheOptions
                                                            loadOptions={LoadWorkWithOptions}
                                                            value={workwithSelected}
                                                            onChange={handleWorkWithChange}
                                                            onBlur={handleWorkwithBlur}
                                                        />
                                                        <p className="text-danger">
                                                            {errors.workingWith?.message}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Profession area</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <AsyncSelect
                                                            isMulti
                                                            defaultOptions
                                                            cacheOptions
                                                            loadOptions={loadProfessionOptions}
                                                            value={professionSelected}
                                                            onChange={handleProfessionChange}
                                                            onBlur={handleProfessionBlur}
                                                        />
                                                        <p className="text-danger">
                                                            {errors.professionArea?.message}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Annual income</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <div className="d-flex">
                                                            {annualIncomeIsOpenAllArr.map(
                                                                (ele, ind) => (
                                                                    <div className="d-flex" key={ind}>
                                                                        <Form.Check
                                                                            type="radio"
                                                                            value={ele.value}
                                                                            {...register(
                                                                                "annualisOpenAll"
                                                                            )}
                                                                            onChange={(e) =>
                                                                                handleAnnualIncomeChange(
                                                                                    e
                                                                                )
                                                                            }
                                                                            className="d-flex"
                                                                        />
                                                                        <Form.Label className="mx-1">
                                                                            {ele.name}
                                                                        </Form.Label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                {annualIncomeIsOpenAll === "false" && (
                                                    <Row>
                                                        <Col md={3}></Col>
                                                        <Col className="col-md-2">
                                                            <input
                                                                value={"INR"}
                                                                className="form-control"
                                                            />
                                                        </Col>
                                                        <Col className="col-md-2">
                                                            <Form.Select
                                                                // className="form-control"
                                                                {...register("annualIncome.from")}
                                                                onChange={handleFromChange}
                                                            >
                                                                <option value="">Select</option>
                                                                {commonData?.yearlyFrom?.map(
                                                                    (ele, ind) => (
                                                                        <option
                                                                            key={ind}
                                                                            value={ele.code}
                                                                        >
                                                                            {ele.label}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Select>
                                                            <p className="text-danger">
                                                                {errors.annualIncome?.from?.message}
                                                            </p>
                                                        </Col>
                                                        <Col className="col-md-2">
                                                            <Form.Select
                                                                {...register("annualIncome.to")}
                                                                // className="form-control"
                                                                onChange={handleToChange}
                                                            >
                                                                <option value="">Select</option>
                                                                {commonData?.yearlyTo?.map(
                                                                    (ele, ind) => (
                                                                        <option
                                                                            key={ind}
                                                                            value={ele.code}
                                                                        >
                                                                            {ele.label}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Select>
                                                            <p className="text-danger">
                                                                {errors.annualIncome?.to?.message}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                )}
                                                <h5 className="fs-5 text-secondary ">
                                                    <div className="form-tit mt-4">
                                                        <h4>Other Details</h4>

                                                    </div>

                                                </h5>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Matrimony Profile for</label>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="d-xl-flex d-lg-flex d-md-block ">
                                                            {commonData &&
                                                                commonData.profileCreatedBy &&
                                                                commonData.profileCreatedBy.map(
                                                                    (ele, ind) => (
                                                                        <Form.Check key={ind}>
                                                                            <Form.Check.Label className="d-flex align-items-center mx-1">
                                                                                <Form.Check.Input
                                                                                    {...register(
                                                                                        "profileCreatedBy"
                                                                                    )}
                                                                                    value={ele.code}
                                                                                />
                                                                                <i className="input-helper p-1"></i>
                                                                                {ele.label}
                                                                            </Form.Check.Label>
                                                                        </Form.Check>
                                                                    )
                                                                )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 mb-2">
                                                    <Col md={3}>
                                                        <label className="lb">Dietary Preferences</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <div className="d-xl-flex d-lg-flex d-md-block">
                                                            {commonData &&
                                                                commonData.dietTypes &&
                                                                commonData.dietTypes.map((ele, ind) => (
                                                                    <Form.Check key={ind}>
                                                                        <Form.Check.Label className="d-flex align-items-center mx-1">
                                                                            <Form.Check.Input
                                                                                {...register("diet")}
                                                                                value={ele.code}
                                                                            />
                                                                            <i className="input-helper p-1"></i>
                                                                            {ele.label}
                                                                        </Form.Check.Label>
                                                                    </Form.Check>
                                                                ))}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Fragment>
                                        )}
                                        <Row className="mt-2 mb-2">
                                            <Col className="text-center invitation_wrap">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="cta-dark d-flex align-items-center m-auto"
                                                >
                                                    {loading && (
                                                        <Spinner
                                                            className="mx-1 "
                                                            size="sm"
                                                            animation="border"
                                                        />
                                                    )}
                                                    Save
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    reloadAction,
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.tokenAction,
        profile: state.account?.profile,
        reload: state.common?.reloadAction,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerPreferences);
// const ConnectedPartnerPreferences = connect(mapStateToProps, mapDispatchToProps)(PartnerPreferences);

// export default dynamic(() => Promise.resolve(ConnectedPartnerPreferences), { ssr: false });
