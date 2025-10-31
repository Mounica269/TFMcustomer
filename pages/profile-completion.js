import { Fragment } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { masterService, profileCompletionService } from "core/services";
import { connect, useSelector } from "react-redux";
import { CONST, utils } from "core/helper";
import {
    CITY_PATH,
    COLLAGE_FILTER,
    COMMUNITY_FILTER,
    COMPANY_FILTER,
    COUNTRY_PATH,
    DEGREE_FILTER,
    PROFESSION_FILTER,
    SESSION_URL,
    STATE_PATH,
    COMMUNITY_PATH,
    PROFESSION_PATH,
    COLLAGE_PATH,
    COLLAGE,
    DEGREE_PATH,
    COMPANY_CREATE,
    COMPANY_PATH,
} from "core/services/apiURL.service";
import { reloadAction, reloadProfileAction } from "core/redux/account/account.action";
// import Select from "react-select";
// import Creatable from 'react-select/creatable';
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { LOGIN_PATH } from "core/helper/const";
import Required from "components/common/required";

import dynamic from 'next/dynamic';


const income = [
    {
        value: "Y",
        income: "Yearly",
    },
    {
        value: "M",
        income: "Monthly",
    },
];

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(CONST.NAME_REGEX, CONST.MSG.INVALID_NAME)
        .min(3, CONST.MSG.MIN_CHAR)
        .max(30, CONST.MSG.MAX_CHAR_FOR_PROFILE_NAME)
        .required("Profile name is required"),
    location: Yup.object().shape({
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
    }),
    isLivingWithFamily: Yup.string().nullable().required("Field is required"),
    height: Yup.string().required("Height is required"),
    diet: Yup.number().required("Diet is required").nullable(),
    // sub_community: Yup.string(),
});

const validationSchema_f2 = Yup.object().shape({
    degree: Yup.string().required("Qualification is required"),
    collage: Yup.string().required("College is required"),
    workWith: Yup.number()
        .typeError("Working sector is required")
        .required("Working sector is required"),
    workWithVal: Yup.string(),
    profession: Yup.string().when("workWithVal", {
        is: (val) => val !== "50",
        then: Yup.string().required("Profession is required"),
    }),
    currentCompanyName: Yup.string().when("workWithVal", {
        is: (val) => val === "10" || val === "20",
        then: Yup.string().required("Company name is required"),
    }),
    monthlyIncome: Yup.string().when("workWithVal", {
        is: (val) => {
            val !== "50";
        },
        then: Yup.string().required("Monthly income is required"),
    }),
    annualIncome: Yup.string().when("workWithVal", {
        is: (val) => val !== "50",
        then: Yup.string().required("Yearly income is required"),
    }),
});

const validationSchema_f3 = Yup.object().shape({
    aboutYourSelf: Yup.string()
        .min(200, "Minimum 200 characters is required")
        .required("Yourself is required"),
});

const Profile = (props) => {
    const { authProfile, commonData, reloadAction, reload, reloadProfile, reloadProfileAction } =
        props;
    console.log("authProfile::", authProfile);
    const router = useRouter();
    const [workWithVal, setWorkwithVal] = useState("");
    const token = useSelector((state) => state.account?.token);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const {
        register: register_f2,
        handleSubmit: handleSubmit_f2,
        setValue: setValue_f2,
        getValues,
        formState: { errors: errors_f2, isSubmitting: isSubmitting_f2, isValid: isValid_f2 },
    } = useForm({
        defaultValues: {
            workWithVal: workWithVal,
        },
        resolver: yupResolver(validationSchema_f2),
    });

    console.log("errors_f2::", errors_f2);

    const {
        register: register_f3,
        handleSubmit: handleSubmit_f3,
        formState: { errors: errors_f3, isSubmitting: isSubmitting_f3 },
    } = useForm({
        resolver: yupResolver(validationSchema_f3),
    });

    const [goSteps, setGoSteps] = useState(0);
    const [degree, setDegree] = useState([]);
    const [profession, setProfession] = useState([]);
    const [stateFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [cityFilter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [subCommunityFilter] = useState({ ...CONST.SUB_COMMUNITY_FILTER });
    const [degreeFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [collageFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [companyFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [professionFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [countryId, setCountryId] = useState(null);
    const [stateId, setStateId] = useState(null);
    const [incomeValue, setIncomeValue] = useState("Y");
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [selectedCollage, setSelectedCollage] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedProfession, setSelectedProfession] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authProfile?.user?.name) {
            setValue("name", authProfile?.user?.name, { shouldValidate: true });
        }
    }, [authProfile]);

    const handleWorkwithChange = (e) => {
        const { value } = e.target;
        console.log("work with value::", value);
        setWorkwithVal(value);
        setValue_f2("workWith", value, { shouldValidate: true });
        setValue_f2("workWithVal", value);
    };

    const loadDegree = async () => {
        const resp = await masterService.getAll(DEGREE_FILTER + "/", {
            ...CONST.DEFAULT_MASTER_FILTER,
        });
        if (resp && resp.meta.code === 200) {
            setDegree(resp.data);
        }
    };

    const loadCollage = async () => {
        const resp = await masterService.getAll(COLLAGE_FILTER + "/", {
            ...CONST.DEFAULT_MASTER_FILTER,
        });
        if (resp && resp.meta.code === 200) {
            return resp?.data;
        }
    };

    const loadProfession = async () => {
        const resp = await masterService.getAll(PROFESSION_FILTER, {
            ...CONST.DEFAULT_MASTER_FILTER,
        });
        if (resp && resp.meta.code === 200) {
            setProfession(resp?.data);
        }
    };

    const loadCompany = async () => {
        const resp = await masterService.getAll(COMPANY_FILTER, { ...CONST.DEFAULT_MASTER_FILTER });
        if (resp && resp.meta.code === 200) {
            return resp?.data;
        }
    };

    const handleSubCommunityChange = async (option) => {
        setValue("sub_community", option.value, { shouldValidate: true });
        // if (option.__isNew__) {
        //     const payload = {
        //         religion: authProfile.basic.religion._id,
        //         parentCommunity: authProfile.basic.community._id,
        //         community: option.value,
        //     };
        //     const resp = await masterService.postFilter(COMMUNITY_PATH, payload);
        //     if (resp && resp.meta.code === 200) {
        //         setValue("sub_community", resp.data._id, { shouldValidate: true });
        //         utils.showSuccessMsg("sub community created");
        //     } else {
        //         setValue("sub_community", "");
        //     }
        // }
    };

    const loadSubCommunityOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            if (!authProfile) {
                resolve([]);
                return false;
            } else {
                // perform a request
                subCommunityFilter.filter = {
                    religion: [authProfile?.basic?.religion?._id],
                    parentCommunity: [authProfile?.basic?.community?._id],
                };
            }
            subCommunityFilter.search = inputValue;
            let communityArr = [];
            const resp = await masterService.postFilter(COMMUNITY_FILTER, subCommunityFilter);
            if (resp && resp.meta.code === 200) {
                const { data: communityResp } = resp;
                communityArr = communityResp.map((ele) => ({
                    value: ele._id,
                    label: ele.community + "-" + ele.religion.name,
                }));
            }
            resolve(communityArr);
        });

    const loadDegreeOptions = async (inputValue) =>
        // perform a request
        new Promise(async (resolve) => {
            degreeFilter.search = inputValue;
            const resp = await masterService.getAll(DEGREE_FILTER, degreeFilter);
            let degreeArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: degreeResp } = resp;
                setDegree(degreeResp);
                degreeArr = degreeResp.map((ele) => ({ value: ele._id, label: ele.name, ...ele }));
            }
            resolve(degreeArr);
        });

    const handleDegreeChange = async (option, meta) => {
        // setValue_f2("degree", option.value, { shouldValidate: true });
        if (option) {
            if (!option.__isNew__) {
                setValue_f2("degree", option.value, {
                    shouldValidate: true,
                });
                setSelectedDegree({
                    label: option?.label,
                    value: option?._id,
                });
            }
            if (option.__isNew__) {
                setSelectedDegree({
                    label: option?.label,
                    value: option?.value,
                });
                const payload = {
                    name: option.value,
                    degreeCategory: 160,
                };
                const resp = await masterService.postFilter(DEGREE_PATH, payload);
                if (resp && resp.meta.code === 200) {
                    utils.showSuccessMsg(resp?.meta?.message);
                    const { data } = resp;
                    setValue_f2("degree", data._id, {
                        shouldValidate: true,
                    });
                    loadDegree();
                }
            }
        } else {
            setValue_f2("degree", "");
            setSelectedDegree(null);
        }
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
        if (option) {
            if (!option.__isNew__) {
                setValue_f2("collage", option.value, { shouldValidate: true });
                setSelectedCollage({
                    label: option?.label,
                    value: option?._id,
                });
            }
            if (option.__isNew__) {
                setSelectedCollage({
                    label: option?.label,
                    value: option?._id,
                });
                const payload = {
                    name: option.value,
                };
                const resp = await masterService.postFilter(COLLAGE, payload);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    setValue_f2("collage", data._id, { shouldValidate: true });
                    utils.showSuccessMsg(resp.meta.message);
                    loadCollage();
                }
            }
        } else {
            setValue_f2("collage", "");
            setSelectedCollage({
                label: option?.label,
                value: option?._id,
            });
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

    const handleCompanyChange = async (option, meta) => {
        setValue_f2("currentCompanyName", option.value, { shouldValidate: true });
        if (option) {
            if (!option.__isNew__) {
                setValue_f2("currentCompanyName", option.value, { shouldValidate: true });
                setSelectedCompany({
                    label: option?.label,
                    value: option?._id,
                });
            }
            if (option.__isNew__) {
                setSelectedCompany({
                    label: option?.label,
                    value: option?.value,
                });
                const payload = {
                    name: option.value,
                };
                const resp = await masterService.postFilter(COMPANY_PATH, payload);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    setValue_f2("currentCompanyName", data._id, { shouldValidate: true });
                    utils.showSuccessMsg(resp.meta.message);
                    loadCompany();
                }
            }
        } else {
            setValue_f2("currentCompanyName", "");
            setSelectedCompany({
                label: option?.label,
                value: option?._id,
            });
        }
    };

    const loadProfessionOptions = async (inputValue) =>
        // perform a request
        new Promise(async (resolve) => {
            professionFilter.search = inputValue;
            const resp = await masterService.getAll(PROFESSION_FILTER, professionFilter);
            let companyArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: companyResp } = resp;
                setProfession(companyResp);
                companyArr = companyResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                    ...ele,
                }));
            }
            resolve(companyArr);
        });

    const handleProfessionChange = async (option) => {
        if (option) {
            if (!option.__isNew__) {
                setValue_f2("profession", option.value, { shouldValidate: true });
                setSelectedProfession({
                    label: option?.label,
                    value: option?._id,
                });
            }
            if (option.__isNew__) {
                setSelectedProfession({
                    label: option?.label,
                    value: option?.value,
                });
                const payload = {
                    name: option.value,
                    professionCategory: 21,
                };
                const resp = await masterService.postFilter(PROFESSION_PATH, payload);
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    utils.showSuccessMsg(resp?.meta?.message);
                    setValue_f2("profession", data._id, { shouldValidate: true });
                    loadProfession();
                }
            }
        } else {
            setValue_f2("profession", "");
            setSelectedProfession({
                label: option?.label,
                value: option?._id,
            });
        }
    };

    const getUserSession = async () => {
        const resp = await masterService.getAll(SESSION_URL);
        if (resp?.meta.code === 200) {
            const { phoneCode } = resp?.data;
            loadCountryByPhoneCode(phoneCode);
        }
    };

    const loadCountryByPhoneCode = async (phoneCode) => {
        const resp = await masterService.getAll(COUNTRY_PATH + "/countryByPhoneCode/" + phoneCode);
        if (resp && resp.meta.code === 200) {
            const { _id } = resp?.data;
            setCountryId(_id);
        }
    };

    const loadStateOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            if (countryId === null) {
                resolve([]);
                return false;
            }
            // perform a request
            stateFilter.filter = { country: [countryId] };
            stateFilter.search = inputValue;
            const resp = await masterService.postFilter(
                STATE_PATH + "/advance-filter",
                stateFilter
            );
            let stateArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: stateResp } = resp;
                stateArr = stateResp.map((ele) => ({ value: ele._id, label: ele.name, ...ele }));
            }
            resolve(stateArr);
        });

    const handleStateChange = async (option, meta) => {
        setValue("location.state", option.value, { shouldValidate: true });
        setStateId(option.value);
    };

    const loadCityOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            if (stateId === null) {
                resolve([]);
                return false;
            }
            // perform a request
            cityFilter.filter = { state: [stateId] };
            cityFilter.search = inputValue;
            const resp = await masterService.postFilter(CITY_PATH + "/advance-filter", cityFilter);
            let cityArr = [];
            if (resp && resp.meta.code === 200) {
                const { data: stateResp } = resp;
                cityArr = stateResp.map((ele) => ({ value: ele._id, label: ele.name, ...ele }));
            }
            resolve(cityArr);
        });
    const handleCityChange = async (option) => {
        setValue("location.city", option.value, { shouldValidate: true });
    };

    const handleIncomeChange = (event) => {
        const value = event.target.value;
        setIncomeValue(value);
    };

    const onSubmit_f1 = async (data) => {
        // const { sub_community } = data
        setLoading(true);
        if (isValid || !data.sub_community) {
            data.location.country = countryId;
            const resp = await profileCompletionService.registerStep1(data);
            if (resp && resp.meta.code === 200) {
                setGoSteps(1);
                utils.scrollToTop();
                reloadAction(!reload);
                reloadProfileAction(!reloadProfile);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const onSubmit_f2 = async (data) => {
        setLoading(true);
        console.log("data::", data);
        if (workWithVal === "30" || workWithVal === "40" || workWithVal === "50") {
            delete data.currentCompanyName;
        }
        if (workWithVal === "50") {
            delete data.professionCategory;
            delete data.annualIncome;
            delete data.monthlyIncome;
            delete data.profession;
        }
        // if (isValid_f2) {
        const payload = { ...data };
        const degreeCategoryObj = degree?.find((ele) => ele._id === payload.degree);
        const { degreeCategory } = degreeCategoryObj;

        if (workWithVal !== "50") {
            const professionCategoryObj = profession.find((ele) => ele._id === payload.profession);
            console.log("professionCategoryObj::", professionCategoryObj);
            const { professionCategory } = professionCategoryObj;
            payload.professionCategory = professionCategory;
        }
        payload.degreeCategory = degreeCategory;
        payload.workWith = workWithVal;
        console.log("payload::", payload);

        delete payload.workWithVal;
        // return false;
        const resp = await profileCompletionService.registerStep2(payload);
        if (resp && resp.meta.code === 200) {
            setGoSteps(2);
            utils.scrollToTop();
            reloadAction(!reload);
            reloadProfileAction(!reloadProfile);
            setLoading(false);
        } else {
            setLoading(false);
            return false;
        }
        // }
    };

    const onSubmit_f3 = async (data) => {
        setLoading(true);
        const resp = await profileCompletionService.registerStep3(data);
        if (resp && resp.meta.code === 200) {
            router.push(CONST.UPLOAD_PHOTOS_PATH);
            reloadAction(!reload);
            reloadProfileAction(!reloadProfile);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const registerStepOneForm = () => {
        return (
            <>

            <Form onSubmit={handleSubmit(onSubmit_f1)}>
                <div className="login-1-form register-1-form clearfix text-start">
                    <h4 className="title divider-3 mb-3">Let's create your Profile now</h4>
                    <div className="section-field mb-3">
                        <Row>
                            <Col lg={6}>
                                <Form.Label>
                                    Profile Name <Required />
                                </Form.Label>
                                <Form.Control
                                    placeholder="Profile Name"
                                    className="form-control"
                                    {...register("name")}
                                    maxLength={30}
                                />
                                {errors.name?.message && (
                                    <p className="text-danger text-start">{errors.name?.message}</p>
                                )}
                            </Col>
                            <Col lg={6}>
                                <Form.Label>
                                    Do you live with your family? <Required />
                                </Form.Label>
                                <div className="d-flex">
                                    <Form.Label>
                                        {/* <Form.Control
                                            type="radio"
                                            {...register("isLivingWithFamily")}
                                            value={true}
                                            name="isLivingWithFamily"
                                        /> */}
                                         <Form.Check
                                           type="radio"
                                           {...register("isLivingWithFamily")}
                                           value={true}
                                           name="isLivingWithFamily"
                                        />
                                        <span>Yes</span>
                                    </Form.Label>
                                    <Form.Label className="mx-2">
                                    <Form.Check
                                           type="radio"
                                           {...register("isLivingWithFamily")}
                                           value={true}
                                           name="isLivingWithFamily"
                                        />
                                        <span>No</span>
                                    </Form.Label>
                                </div>
                                {errors.isLivingWithFamily?.message && (
                                    <p className="text-danger text-start">
                                        {errors.isLivingWithFamily?.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                    </div>
                    <div className="section-field mb-3">
                        <Row>
                            <Col lg={6}>
                                <Form.Label>
                                    State <Required />
                                </Form.Label>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={loadStateOptions}
                                    onChange={handleStateChange}
                                    // key={authProfile?.location?.}
                                    key={countryId}
                                />
                                {errors.location?.state && (
                                    <p className="text-danger text-start">
                                        {errors.location?.state.message}
                                    </p>
                                )}
                            </Col>
                            <Col lg={6}>
                                <Form.Label>
                                    City <Required />
                                </Form.Label>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={loadCityOptions}
                                    onChange={handleCityChange}
                                    key={stateId}
                                />
                                {errors.location?.city && (
                                    <p className="text-danger text-start">
                                        {errors.location?.city.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                    </div>
                    <div className="section-field mb-3">
                        <Form.Label>
                            Dietary Preferences <Required />
                        </Form.Label>
                        <div className="d-flex checkdesk1">
                            {commonData.dietTypes &&
                                commonData.dietTypes.map((ele, ind) => (
                                    <Form.Label className="mx-2" key={ind}>
                                        {/* <Form.Control
                                            type="radio"
                                            {...register("diet")}
                                            value={ele.code}
                                            name="diet"
                                        /> */}
                                        <Form.Check
                                            type="radio"
                                            {...register("diet")}
                                            value={ele.code}
                                            name="diet"
                                        />
                                                                                             
                                        <span>{ele.label}</span>
                                    </Form.Label>
                                ))}
                        </div>
                        <p className="text-danger text-start">{errors.diet?.message}</p>
                    </div>
                    <div className="section-field mb-3">
                        <Form.Label>
                            Your Height <Required />
                        </Form.Label>
                        <Form.Select className="form-select" {...register("height")}>
                            <option value="">Select</option>
                            {commonData.heightTypes &&
                                commonData.heightTypes.map((ele, ind) => (
                                    <option key={ind} value={ele.code}>
                                        {ele.label}
                                    </option>
                                ))}
                        </Form.Select>
                        <p className="text-danger text-start">{errors.height?.message}</p>
                    </div>
                    <div className="section-field mb-3">
                        <Form.Label>Your sub-community</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={loadSubCommunityOptions}
                            onChange={handleSubCommunityChange}
                            key={authProfile?.basic?.community?._id}
                            isDisabled={!authProfile}
                        />
                        {/* not-validated in the checkbox from backend */}
                        {/* <div className="d-flex">
                            <Form.Check type="checkbox" />
                            Not particular about my partner's Community (Caste No Bar)
                        </div> */}
                    </div>
                    <div className="clearfix"></div>
                    <div className="section-field text-uppercase text-end mt-2">
                        <button
                            type="submit"
                            className="button cta-dark full-rounded animated right-icn"
                            disabled={loading}
                        >
                            <span className="d-flex align-items-center ">
                                {loading && (
                                    <Spinner size="sm" animation="border" className="mx-2" />
                                )}
                                Continue
                            </span>
                        </button>
                    </div>
                </div>
            </Form>
            </>
        );
    };

    const registerStepTwoForm = () => {
        return (
            <>

            <Form onSubmit={handleSubmit_f2(onSubmit_f2)}>
                <div className="login-1-form register-1-form clearfix text-start">
                    <h4 className="title divider-3 mb-3">Education & Career</h4>
                    <div className="section-field mb-3">
                        <div>
                            <Form.Label>
                                Your highest qualification <Required />
                            </Form.Label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={loadDegreeOptions}
                                onChange={handleDegreeChange}
                                value={selectedDegree}
                                isClearable
                            />
                            <p className="text-danger text-start">{errors_f2.degree?.message}</p>
                        </div>
                    </div>
                    <div className="section-field mb-3">
                        <Form.Label>
                            College/School <Required />
                        </Form.Label>
                        <AsyncCreatableSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={loadCollageOptions}
                            onChange={handleCollageChange}
                            value={selectedCollage}
                            isClearable
                        />
                        <p className="text-danger text-start">{errors_f2.collage?.message}</p>
                    </div>
                    <div className="section-field mb-3">
                        <Form.Label>
                            You work with <Required />
                        </Form.Label>
                        <Form.Select
                            className=""
                            onChange={(e) => handleWorkwithChange(e)}
                            // {...register_f2("workWith")}
                        >
                            <option value="">Select</option>
                            {commonData.workWithTypes &&
                                commonData.workWithTypes.map((ele, ind) => (
                                    <option key={ind} value={ele.code}>
                                        {ele.label}
                                    </option>
                                ))}
                        </Form.Select>
                        <p className="text-danger text-start">{errors_f2.workWith?.message}</p>
                    </div>
                    {workWithVal !== "50" && (
                        <div className="section-field mb-3">
                            <Form.Label>Designation</Form.Label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={loadProfessionOptions}
                                onChange={handleProfessionChange}
                                isClearable
                                value={selectedProfession}
                            />
                            <p className="text-danger text-start">
                                {errors_f2.profession?.message}
                            </p>
                        </div>
                    )}
                    {(workWithVal === "10" || workWithVal === "20") && (
                        <div className="section-field mb-3">
                            <Form.Label>Company name</Form.Label>
                            <AsyncCreatableSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={loadCompanyOptions}
                                onChange={handleCompanyChange}
                                value={selectedCompany}
                                isClearable
                            />
                            <p className="text-danger text-start">
                                {errors_f2.currentCompanyName?.message}
                            </p>
                        </div>
                    )}
                    {workWithVal !== "50" && (
                        <div className="section-field mb-3">
                            <div className="d-flex justify-content-between">
                                <Form.Label>Select Income</Form.Label>
                                <div className="checkdesk1">
                                    {income.map((ele, ind) => (
                                        <Form.Label className="mx-1" key={ind}>
                                            {/* <Form.Control
                                                type="radio"
                                                value={ele.value}
                                                key={ind}
                                                name={"income"}
                                                onChange={handleIncomeChange}
                                            /> */}
                                             <Form.Check
                                                                                                type="radio"
                                                                                                value={ele.value}
                                                                                                key={ind}
                                                                                                name={"income"}
                                                                                                onChange={handleIncomeChange}
                                                                                            />
                                            <span>{ele.income}</span>
                                        </Form.Label>
                                    ))}
                                </div>
                            </div>
                            {incomeValue === "Y" ? (
                                <Fragment>
                                    <Form.Select
                                        className=""
                                        {...register_f2("annualIncome")}
                                        onChange={(eve) => {
                                            const { value } = eve.target;
                                            setValue_f2("annualIncome", value, {
                                                shouldValidate: true,
                                            });
                                            setValue_f2("monthlyIncome", value, {
                                                shouldValidate: true,
                                            });
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {commonData.yearlyIncome &&
                                            commonData.yearlyIncome.map((ele, ind) => (
                                                <option key={ind} value={ele.code}>
                                                    {ele.label}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <p className="text-danger text-start">
                                        {errors_f2.annualIncome?.message}
                                    </p>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Form.Select
                                        // className="form-control"
                                        {...register_f2("monthlyIncome")}
                                        onChange={(eve) => {
                                            const { value } = eve.target;
                                            setValue_f2("annualIncome", value, {
                                                shouldValidate: true,
                                            });
                                            setValue_f2("monthlyIncome", value, {
                                                shouldValidate: true,
                                            });
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {commonData.monthlyIncome &&
                                            commonData.monthlyIncome.map((ele, ind) => (
                                                <option key={ind} value={ele.code}>
                                                    {ele.label}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <p className="text-danger text-start">
                                        {errors_f2.monthlyIncome?.message}
                                    </p>
                                </Fragment>
                            )}
                        </div>
                    )}
                    <div className="clearfix"></div>
                    <div className="section-field text-uppercase text-end mt-2">
                        <button
                            type="submit"
                            className="button cta-dark  full-rounded animated right-icn"
                            disabled={loading}
                        >
                            <span className="d-flex align-items-center">
                                {loading && (
                                    <Spinner size="sm" animation="border" className="mx-2" />
                                )}
                                Continue
                            </span>
                        </button>
                    </div>
                </div>
            </Form>
            </>
        );
    };

    const registerStepThreeForm = () => {
        return (
            <>

            <Form onSubmit={handleSubmit_f3(onSubmit_f3)}>
                <div className="login-1-form register-1-form clearfix text-start">
                    <h4 className="title divider-3 mb-3">
                        One last thing! Describe yourself in a few words
                    </h4>
                    <div className="section-field mb-3">
                        <Form.Label>
                            Write a brief introduction about yourself <Required />
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            className="form-control"
                            rows={10}
                            {...register_f3("aboutYourSelf")}
                        />
                        <p className="text-danger text-start">{errors_f3.aboutYourSelf?.message}</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="section-field text-uppercase text-end mt-2">
                        <button
                            className="button cta-dark full-rounded animated right-icn"
                            type="submit"
                            disabled={loading}
                        >
                            <span className="d-flex align-items-center">
                                {loading && (
                                    <Spinner size="sm" animation="border" className="mx-2" />
                                )}
                                Create Profile
                            </span>
                        </button>
                    </div>
                </div>
            </Form>
            </>
        );
    };

    useEffect(() => {
        if (token) {
            getUserSession();
        }
    }, [token]);

    useEffect(() => {
        if (router.query && router.query.nav) {
            switch (router.query.nav) {
                case "step1":
                    setGoSteps(0);
                    break;
                case "step2":
                    setGoSteps(1);
                    break;
                case "step3":
                    setGoSteps(2);
                    break;
            }
        }
    }, [router]);

    useEffect(() => {
        let navigationStep = "";
        console.log("authProfile?.completedSteps::", authProfile?.completedSteps);
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
        router.push(CONST.PROFILE_COMPLETION_PATH + navigationStep);
    }, [authProfile, reloadProfile]);

    return (
        <>

        <section className="login-form page-section-ptb3">
            <Container>
                <Row>
                    <Col lg={2} md={12} className="mb-5"></Col>
                    <Col lg={9} md={12} className="mb-5">
                        <div className="step-form">
                            <Stepper activeStep={goSteps}>
                                <Step />
                                <Step />
                                <Step />
                            </Stepper>
                            {goSteps === 0 && registerStepOneForm()}
                            {goSteps === 1 && registerStepTwoForm()}
                            {goSteps === 2 && registerStepThreeForm()}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
        reloadProfile: state.account?.reloadProfile,
        reload: state?.common?.reloadAction,
    };
};

const mapDispatchToProps = {
    reloadProfileAction,
    reloadAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default dynamic(() => Promise.resolve(ConnectedProfile), { ssr: false });
