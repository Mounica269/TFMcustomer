import { useEffect, useState, Fragment } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { loginAction } from "core/redux/account/account.action";
import { utils, CONST } from "core/helper";
import { masterService, usersService } from "core/services";
import {
    COMMUNITY_FILTER_GET,
    COUNTRY_PATH,
    LANGUAGE_FILTER,
    RELIGION_FILTER,
} from "core/services/apiURL.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import sub from "date-fns/sub";
import AsyncSelect from "react-select/async";
import reg_step_img_1 from "../public/frontend/images/reg-01.png";
import reg_step_img_2 from "../public/frontend/images/reg-02.png";
import Image from "next/image";
import Required from "components/common/required";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";


import "react-datepicker/dist/react-datepicker.css";
let validName = "";
let isNameValid = false;

const validationSchema = Yup.object().shape(
    {
        profileFor: Yup.string().required(CONST.MSG.PROF_FOR_REQ),
        gender: Yup.string().nullable().required(CONST.MSG.GENDER_REQ),
        name: Yup.string()
            .required(CONST.MSG.NAME_REQ)
            .matches(CONST.NAME_REGEX, CONST.MSG.INVALID_NAME)
            .trim("Space not allowed")
            // .ensure()
            .min(3, CONST.MSG.MIN_CHAR)
            .max(25, CONST.MSG.MAX_CHAR)
            .test("checkNameUnique", CONST.MSG.NAME_EXISTS, async (value) => {
                if (validName !== value) {
                    const resp = await usersService.isExists({ name: value });
                    validName = value;
                    isNameValid = resp.data ? false : true;
                }
                return isNameValid;
            }),
        religion: Yup.string().required(CONST.MSG.RELIGION_REQ),
        language: Yup.string().required(CONST.MSG.LANG_REQ),
        community: Yup.string().required(CONST.MSG.COMMUNITY_REQ),
    },
    ["religion"]
);

let validEmail = "";
let isEmailValid = false;

let validPhone = "";
let isPhoneValid = false;

const validationSchema_f2 = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(CONST.MSG.EMAIL_REQ)
        .test("checkEmailUnique", CONST.MSG.EMAIL_EXISTS, async (value) => {
            if (validEmail !== value) {
                const resp = await usersService.isExists({ email: value });
                validEmail = value;
                isEmailValid = resp.data ? false : true;
            }
            return isEmailValid;
        }),
    phoneCode: Yup.string().required(CONST.MSG.PHONE_CODE_REQ),
    phone: Yup.string()
        .min(10, CONST.MSG.PHONE_REQ)
        .matches(CONST.PHONE_IND_REGEX, CONST.MSG.PHONE_REGEX)
        .required(CONST.MSG.PHONE_REQ)
        .test("checkPhoneUnique", CONST.MSG.PHONE_EXISTS, async (value) => {
            if (validPhone !== value) {
                const resp = await usersService.isExists({ phone: value });
                validPhone = value;
                isPhoneValid = resp.data ? false : true;
            }
            return isPhoneValid;
        }),
    dateOfBirth: Yup.string().required("Date of birth number is required"),
    maritalStatus: Yup.string().required("Maritial Status is required"),
    pwd: Yup.string()
        .required(CONST.MSG.PASSWORD_REQ)
        .min(8, CONST.MSG.PASSWORD_MIN)
        .max(20, CONST.MSG.PASSWORD_MAX)
        .matches(CONST.PASSWORD_REGEX, CONST.MSG.PASSWORD_REGEX),
    confirmPwd: Yup.string()
        .required(CONST.MSG.PASSWORD_CONFIRM_REQ)
        .oneOf([Yup.ref("pwd")], CONST.MSG.PASSWORD_NOT_MATCH),
});

const Register = () => {
    const router = useRouter();
    const commonData = useSelector((state) => state.common?.commonData);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });
    const religionWatch = watch("religion");
    const religionValue = getValues("religion");

    const getProfileForVal = getValues("profileFor");
    console.log("getProfileForVal::", getProfileForVal);

    const {
        register: register_f2,
        handleSubmit: handleSubmit_f2,
        setValue: register_f2_value,
        formState: { errors: errors_f2, isSubmitting: isSubmitting_f2 },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema_f2),
    });
    useEffect(() => {
        console.log("Form Errors:", errors);
    }, [errors]);

    const [formData, setFormData] = useState({});
    const [startDate, setStartDate] = useState();
    const [languageSelected, setLanguageSelected] = useState(null);
    const [religion, setReligion] = useState([]);
    const [countryPhoneCode, setCountryPhoneCode] = useState([]);
    const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });
    const [communityFilter] = useState({ ...CONST.COMMUNITY_FILTER_GET });
    const [langFilter] = useState({ ...CONST.DEFAULT_ASYNC_LANG_FILTER });
    const [religionFilter] = useState({ ...CONST.RELIGION_FILTER });
    const [communitySelected, setCommunitySelected] = useState(null);
    const [stepOneComp, setStepOneComp] = useState(false);
    const [mobileVal, setMobileVal] = useState("");
    const maleArr = ["20", "40"];
    const femaleArr = ["30", "50"];
    const [isLoading, setIsLoading] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 150,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        console.log("Religion Data Loaded:", religion);
        async function loadDropDowns() {
            await getReligion(religionFilter);
            await loadCountryWithPhoneCode();
        }
        loadDropDowns();
    }, []);

    useEffect(() => {
        console.log("Router Query Parameters:", router.query);
        const params = router.query;
        setValue("profileFor", params.profileFor);
        setValue("name", params.name);
        setValue("religion", params.religion);

        if ([...maleArr, ...femaleArr].includes(params.profileFor)) {
            let name, value;
            if (maleArr.includes(params.profileFor)) {
                name = "Male";
                value = "10";
            }
            if (femaleArr.includes(params.profileFor)) {
                name = "Female";
                value = "20";
            }
            handleGenderChange(name, value);
            console.log("Gender Changed:", name, value);
        } else {
            // handleGenderChange("", "");
            setValue("gender", "", { shouldValidate: false });
            setGenderVal("");
        }
        disableGender(params.profileFor);
    }, [router.query, religion]);

    const onSubmit = async (data) => {
        console.log("Form Data on Submit:", data);
        if (data) {
            setFormData(data);
            scrollToTop();
            setStepOneComp(true);
        }
    };

    const onSubmit_f2 = async (value) => {
        try {
            setIsLoading(true);
            value.dateOfBirth = moment(startDate).format("YYYY-MM-DD");
            const combinedValues = { ...value, ...formData };
            const resp = await usersService.register(combinedValues);

            if (resp && resp.meta.code === 200) {
                const { meta, data } = resp;
                utils.showSuccessMsg(meta.message);
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'conversion', {
                        'send_to': 'AW-16656845355/4hMOCOzEgtMZEKuUzYY-'
                    });
                }
                router.push(CONST.LOGIN_PATH);
            }
        } catch (error) {
            console.error('Registration error:', error);
            utils.showErrorMsg(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const loadCommunity = async () => {
        const resp = await masterService.getAll(COMMUNITY_FILTER_GET, filter);
        if (resp && resp.meta.code === 200) {
            return resp.data;
        }
    };

    const getReligion = async (religionFilter) => {
        const resp = await masterService.getAll(RELIGION_FILTER, religionFilter);
        if (resp && resp.meta.code === 200) {
            setReligion(resp.data);
        }
    };

    const handleReligionChange = (e) => {
        const { value } = e.target;
        setValue("religion", value, { shouldValidate: true });
        setCommunitySelected(null);
        setValue("community", "");
        communityFilter.search = "";
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

    const handleLanguageChange = async (option) => {
        if (option === undefined) {
            return;
        }
        if (option) {
            setValue("language", option.value, { shouldValidate: true });
            setLanguageSelected({
                label: option.label,
                value: option.value,
            });
        } else {
            setValue("language", "");
            setLanguageSelected(null);
        }
    };

    const loadCommunityOptions = (inputValue) =>
        new Promise(async (resolve) => {
            if (religionValue === undefined || religionValue === "") {
                return false;
            }
            communityFilter.religion = religionValue;
            if (inputValue) {
                communityFilter.search = inputValue;
            }
            let communityArr = [];
            const resp = await masterService.getAll(COMMUNITY_FILTER_GET + "/", communityFilter);
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
        if (religionValue === undefined || religionValue === "" || option === undefined) {
            return;
        }
        if (option) {
            setValue("community", option.value, { shouldValidate: true });
            setCommunitySelected({
                label: option.label,
                value: option.value,
            });
        } else {
            setValue("community", "");
            setCommunitySelected(null);
        }
    };

    const loadCountryWithPhoneCode = async () => {
        const resp = await masterService.getAll(COUNTRY_PATH + "/filter", filter);
        if (resp && resp.meta.code === 200) {
            setCountryPhoneCode(resp.data);
        }
    };

    const handleChangeDateOfBirth = (date) => {
        const formateDate = moment(date).format();
        setStartDate(date);
        register_f2_value("dateOfBirth", formateDate);
    };

    const [passwordToggle, setPasswordToggle] = useState(false);
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);

    const handlePasswordToggle = () => setPasswordToggle(!passwordToggle);
    const handleConfirmPasswordToggle = () => setConfirmPasswordToggle(!confirmPasswordToggle);

    const [genderVal, setGenderVal] = useState("");
    console.log("genderVal::", genderVal);
    const [genderDisable, setGenderDisable] = useState(false);

    const handleGenderChange = (name, value) => {
        console.log(name, value);
        console.log(typeof name, typeof value);
        setGenderVal(name);
        setValue("gender", value, { shouldValidate: true });
    };

    const handleMobileNoChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setMobileVal(e.target.value);
            setValue("phone", e.target.value);
        }
    };

    const handleProfileFor = (e) => {
        const { value: profileFor } = e.target;
        console.log("profileFor::", profileFor);
        if ([...maleArr, ...femaleArr].includes(profileFor)) {
            let name, value;
            if (maleArr.includes(profileFor)) {
                name = "Male";
                value = "10";
            }
            if (femaleArr.includes(profileFor)) {
                name = "Female";
                value = "20";
            }
            handleGenderChange(name, value);
        } else {
            // handleGenderChange("", "");
            setValue("gender", "");
            setGenderVal("");
        }
        disableGender(profileFor);
    };

    const disableGender = (profileFor) => {
        const res = [...maleArr, ...femaleArr].includes(profileFor);
        setGenderDisable(res);
        return res;
    };

    return (
        <>
            <style>{`
         .login .lhs .log-bg {
           width: 100%;
    height: 77px;
    background: url("/frontend/images/login-bg.png") center bottom / 300px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    transition: all 0.5s ease-in-out 0s;
    animation: 800s linear 0s infinite normal both running movehor;
    border-radius: 0px 0px 10px 10px;
    background-repeat-y: no-repeat;
}
      `}</style>
<Head>
  <title>Sign In | True Friend Matrimony - Christian Matrimony Platform</title>

  <meta
    name="description"
    content="Sign in to True Friend Matrimony, the trusted Christian matrimonial platform. Connect with faith-aligned Christian matches, manage your profile, and start your journey toward a meaningful, lifelong partnership."
  />

  <meta
    name="keywords"
    content="Christian Matrimony Sign In, Christian Matrimony Login, True Friend Matrimony Login, Christian Matchmaking, Faith-Based Matrimony, Find Christian Partner, Trusted Christian Matrimonial Services, Christian Bride and Groom Login"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/register" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/register" />
  <meta property="og:title" content="Sign In | True Friend Matrimony - Christian Matrimony Platform" />
  <meta
    property="og:description"
    content="Sign in to True Friend Matrimony to connect with verified Christian singles and manage your profile on a trusted faith-based matchmaking platform."
  />

</Head>


            <Fragment>
                <>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={12}>
                                <div className="login">
                                    <div className="container">
                                        <div className="row">
                                            <div className="inn">
                                                <div className="lhs">
                                                    <div className="tit">
                                                        <h2>
                                                            Now <b>Find your life partner</b> Easy
                                                            and fast.
                                                        </h2>
                                                    </div>
                                                    <div className="im">
                                                        <img
                                                            src="/frontend/images/icon/login-couple.png"
                                                            alt="Illustration of a couple, symbolizing easy and fast partner search"
                                                        />
                                                    </div>
                                                    <div className="log-bg"> </div>
                                                </div>
                                                <div className="rhs  p-lg-5 p-md-5 p-2 py-5">
                                                    <div>
                                                        <div className="form-tit">
                                                            <h4>Start for free</h4>
                                                            <h1>Sign up to Matrimony</h1>
                                                            <p>
                                                                Already a member?{" "}
                                                                <Link href="/login">
                                                                    <a>Login</a>
                                                                </Link>
                                                            </p>
                                                        </div>
                                                        {!stepOneComp && (
                                                            <Form
                                                                autoComplete="Off"
                                                                onSubmit={handleSubmit(onSubmit)}
                                                            >
                                                                <div className="login-1-form register-1-form clearfix text-start">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div>
                                                                                <div className="section-field mb-3 ">
                                                                                    <div className="row">
                                                                                        <div className="col-md-5 text-nowrap">
                                                                                            Matrimony
                                                                                            Profile
                                                                                            for:{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            <select
                                                                                                {...register(
                                                                                                    "profileFor"
                                                                                                )}
                                                                                                className="form-control custom-select"
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    handleProfileFor(
                                                                                                        e
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <option value="">
                                                                                                    Select
                                                                                                </option>
                                                                                                {commonData.profileFor &&
                                                                                                    commonData.profileFor.map(
                                                                                                        (
                                                                                                            ele,
                                                                                                            ind
                                                                                                        ) => (
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
                                                                                            </select>
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors
                                                                                                        .profileFor
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            User
                                                                                            Name{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            <Form.Control
                                                                                                {...register(
                                                                                                    "name"
                                                                                                )}
                                                                                                type="text"
                                                                                                placeholder="Name"
                                                                                                maxLength={
                                                                                                    25
                                                                                                }
                                                                                            />
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors
                                                                                                        .name
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    {commonData?.gender && (
                                                                                        <div className="row">
                                                                                            <div className="col-md-5">
                                                                                                Gender{" "}
                                                                                                <Required />
                                                                                            </div>
                                                                                            <div className="col-md-7">
                                                                                                {commonData.gender.map(
                                                                                                    (
                                                                                                        ele,
                                                                                                        ind
                                                                                                    ) => (
                                                                                                        <label
                                                                                                            className={
                                                                                                                genderVal ===
                                                                                                                    ele.label
                                                                                                                    ? "radio_button checked"
                                                                                                                    : "radio_button"
                                                                                                            }
                                                                                                            style={{
                                                                                                                marginRight:
                                                                                                                    "15px",
                                                                                                            }}
                                                                                                            key={
                                                                                                                ind
                                                                                                            }
                                                                                                        >
                                                                                                            <input
                                                                                                                style={{
                                                                                                                    marginRight:
                                                                                                                        "15px",
                                                                                                                }}
                                                                                                                {...register(
                                                                                                                    "gender"
                                                                                                                )}
                                                                                                                type="radio"
                                                                                                                value={
                                                                                                                    ele.code
                                                                                                                }
                                                                                                                onChange={(
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    handleGenderChange(
                                                                                                                        e
                                                                                                                            .target
                                                                                                                            .name,
                                                                                                                        e
                                                                                                                            .target
                                                                                                                            .value
                                                                                                                    )
                                                                                                                }
                                                                                                                name={
                                                                                                                    ele.label
                                                                                                                }
                                                                                                                checked={
                                                                                                                    ele.label ===
                                                                                                                    genderVal
                                                                                                                }
                                                                                                                disabled={
                                                                                                                    genderDisable
                                                                                                                }
                                                                                                            />
                                                                                                            {
                                                                                                                ele.label
                                                                                                            }
                                                                                                        </label>
                                                                                                    )
                                                                                                )}
                                                                                                <p className="text-danger text-start">
                                                                                                    {
                                                                                                        errors
                                                                                                            .gender
                                                                                                            ?.message
                                                                                                    }
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}

                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Language{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7 register_lang_dropdown-wrapper">
                                                                                            <AsyncSelect
                                                                                                cacheOptions
                                                                                                defaultOptions
                                                                                                isClearable
                                                                                                loadOptions={
                                                                                                    loadLanguageOptions
                                                                                                }
                                                                                                onChange={
                                                                                                    handleLanguageChange
                                                                                                }
                                                                                                value={
                                                                                                    languageSelected
                                                                                                }
                                                                                            />
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors
                                                                                                        .language
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Religion{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7 register_lang_dropdown-wrapper">
                                                                                            <select
                                                                                                {...register(
                                                                                                    "religion"
                                                                                                )}
                                                                                                className="form-control custom-select"
                                                                                                onChange={
                                                                                                    handleReligionChange
                                                                                                }
                                                                                            >
                                                                                                <option value="">
                                                                                                    Select
                                                                                                </option>
                                                                                                {religion.length >
                                                                                                    0 &&
                                                                                                    religion.map(
                                                                                                        (
                                                                                                            ele,
                                                                                                            idx
                                                                                                        ) => (
                                                                                                            <option
                                                                                                                key={
                                                                                                                    idx
                                                                                                                }
                                                                                                                value={
                                                                                                                    ele._id
                                                                                                                }
                                                                                                            >
                                                                                                                {
                                                                                                                    ele.name
                                                                                                                }
                                                                                                            </option>
                                                                                                        )
                                                                                                    )}
                                                                                            </select>
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors
                                                                                                        .religion
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    {religionWatch && (
                                                                                        <div className="row">
                                                                                            <div className="col-md-5">
                                                                                                Community{" "}
                                                                                                <Required />
                                                                                            </div>
                                                                                            <div className="col-md-7 register_community_dropdown-wrapper">
                                                                                                <Fragment>
                                                                                                    <div className="community_select">
                                                                                                        <AsyncSelect
                                                                                                            cacheOptions
                                                                                                            defaultOptions
                                                                                                            isClearable
                                                                                                            loadOptions={
                                                                                                                loadCommunityOptions
                                                                                                            }
                                                                                                            onChange={
                                                                                                                handleCommunityChange
                                                                                                            }
                                                                                                            value={
                                                                                                                communitySelected
                                                                                                            }
                                                                                                            key={
                                                                                                                religionWatch
                                                                                                            }
                                                                                                            isDisabled={
                                                                                                                !religionValue ||
                                                                                                                religionValue ===
                                                                                                                "" ||
                                                                                                                religionValue ===
                                                                                                                null
                                                                                                            }
                                                                                                        />
                                                                                                    </div>
                                                                                                    <p className="text-danger text-start">
                                                                                                        {
                                                                                                            errors
                                                                                                                .community
                                                                                                                ?.message
                                                                                                        }
                                                                                                    </p>
                                                                                                </Fragment>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="cta-full-wid text-uppercase text-end mt-2">
                                                                                <button className="cta-dark button btn-lg btn-theme btn-sm full-rounded animated right-icn">
                                                                                    <span>
                                                                                        CONTINUE
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                        )}
                                                        {stepOneComp && (
                                                            <Form
                                                                autoComplete="off"
                                                                onSubmit={handleSubmit_f2(
                                                                    onSubmit_f2
                                                                )}
                                                            >
                                                                <div className="login-1-form register-1-form clearfix text-start">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div>
                                                                                <div className="section-field mb-3">
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Email Id{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            <Form.Control
                                                                                                {...register_f2(
                                                                                                    "email"
                                                                                                )}
                                                                                                type="text"
                                                                                                placeholder="Email ID"
                                                                                            />
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors_f2
                                                                                                        .email
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Mobile
                                                                                            Number{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            <div className="row">
                                                                                                <div className="col-md-5 mb-2">
                                                                                                    <select
                                                                                                        style={{
                                                                                                            fontSize:
                                                                                                                "12px",
                                                                                                            padding:
                                                                                                                "10px 5px",
                                                                                                        }}
                                                                                                        {...register_f2(
                                                                                                            "phoneCode"
                                                                                                        )}
                                                                                                        className="form-control"
                                                                                                    >
                                                                                                        <option value="">
                                                                                                            Select
                                                                                                        </option>
                                                                                                        {countryPhoneCode &&
                                                                                                            countryPhoneCode.map(
                                                                                                                (
                                                                                                                    ele,
                                                                                                                    idx
                                                                                                                ) => (
                                                                                                                    <option
                                                                                                                        key={
                                                                                                                            idx
                                                                                                                        }
                                                                                                                        value={
                                                                                                                            ele.phoneCode
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {`${ele.name} ( ${ele.phoneCode} )`}
                                                                                                                    </option>
                                                                                                                )
                                                                                                            )}
                                                                                                    </select>
                                                                                                </div>
                                                                                                <div className="col-md-7">
                                                                                                    <Form.Control
                                                                                                        {...register_f2(
                                                                                                            "phone"
                                                                                                        )}
                                                                                                        type="text"
                                                                                                        placeholder="Mobile Number"
                                                                                                        className="custom-placeholder"
                                                                                                        pattern="[0-9]*"
                                                                                                        value={
                                                                                                            mobileVal
                                                                                                        }
                                                                                                        onChange={
                                                                                                            handleMobileNoChange
                                                                                                        }
                                                                                                        maxLength={
                                                                                                            10
                                                                                                        }
                                                                                                    />
                                                                                                    <p className="text-danger text-start">
                                                                                                        {
                                                                                                            errors_f2
                                                                                                                .phone
                                                                                                                ?.message
                                                                                                        }
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors_f2
                                                                                                        .phoneCode
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Date Of
                                                                                            Birth{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            {/* <DatePicker
                                                                                                // value={startDate}
                                                                                                selected={
                                                                                                    startDate
                                                                                                }
                                                                                                onChange={(
                                                                                                    date
                                                                                                ) =>
                                                                                                    handleChangeDateOfBirth(
                                                                                                        date
                                                                                                    )
                                                                                                }
                                                                                                maxDate={sub(
                                                                                                    new Date(),
                                                                                                    {
                                                                                                        years: 18,
                                                                                                    }
                                                                                                )}
                                                                                                minDate={sub(
                                                                                                    new Date(),
                                                                                                    {
                                                                                                        years: 100,
                                                                                                    }
                                                                                                )}
                                                                                                format="y-MM-dd"
                                                                                                clearIcon={
                                                                                                    null
                                                                                                }
                                                                                                placeholder="Select your date of birth"
                                                                                                className="form-control w-100"
                                                                                                popperPlacement="bottom-start" // Adjust placement as needed
                                                                                                popperModifiers={{
                                                                                                    preventOverflow:
                                                                                                        {
                                                                                                            enabled: true,
                                                                                                        },
                                                                                                }}
                                                                                            /> */}
                                                                                            <DatePicker
                                                                                                selected={
                                                                                                    startDate
                                                                                                }
                                                                                                onChange={(
                                                                                                    date
                                                                                                ) =>
                                                                                                    handleChangeDateOfBirth(
                                                                                                        date
                                                                                                    )
                                                                                                }
                                                                                                peekNextMonth
                                                                                                showMonthDropdown
                                                                                                showYearDropdown
                                                                                                dropdownMode="select"
                                                                                                maxDate={sub(
                                                                                                    new Date(),
                                                                                                    {
                                                                                                        years: 18,
                                                                                                    }
                                                                                                )}
                                                                                                minDate={sub(
                                                                                                    new Date(),
                                                                                                    {
                                                                                                        years: 100,
                                                                                                    }
                                                                                                )}
                                                                                                // withPortal
                                                                                                placeholderText="Select your date of birth"
                                                                                                className="form-control w-100"
                                                                                            />

                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors_f2
                                                                                                        .dateOfBirth
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Marital
                                                                                            Status{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            <Form.Select
                                                                                                {...register_f2(
                                                                                                    "maritalStatus"
                                                                                                )}
                                                                                                className=""
                                                                                            >
                                                                                                <option value="">
                                                                                                    Select
                                                                                                </option>
                                                                                                {commonData.maritalStatus &&
                                                                                                    commonData.maritalStatus.map(
                                                                                                        (
                                                                                                            ele,
                                                                                                            ind
                                                                                                        ) => (
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
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors_f2
                                                                                                        .maritalStatus
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Password{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7 reg_password_wrap">
                                                                                            <div className="password-container">

                                                                                                <Form.Control
                                                                                                    type={
                                                                                                        passwordToggle
                                                                                                            ? "text"
                                                                                                            : "password"
                                                                                                    }
                                                                                                    placeholder="******"
                                                                                                    {...register_f2(
                                                                                                        "pwd"
                                                                                                    )}
                                                                                                    maxLength={
                                                                                                        20
                                                                                                    }
                                                                                                />
                                                                                                {passwordToggle ? (
                                                                                                    <i
                                                                                                        onClick={
                                                                                                            handlePasswordToggle
                                                                                                        }
                                                                                                        className="fa fa-eye"
                                                                                                    ></i>
                                                                                                ) : (
                                                                                                    <i
                                                                                                        onClick={
                                                                                                            handlePasswordToggle
                                                                                                        }
                                                                                                        className="fa fa-eye-slash"
                                                                                                    ></i>
                                                                                                )}

                                                                                            </div>
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors_f2
                                                                                                        .pwd
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-5">
                                                                                            Confirm
                                                                                            Password{" "}
                                                                                            <Required />
                                                                                        </div>
                                                                                        <div className="col-md-7 reg_password_wrap">
                                                                                            <div className="password-container">
                                                                                                <Form.Control
                                                                                                    type={
                                                                                                        confirmPasswordToggle
                                                                                                            ? "text"
                                                                                                            : "password"
                                                                                                    }
                                                                                                    placeholder="******"
                                                                                                    {...register_f2(
                                                                                                        "confirmPwd"
                                                                                                    )}
                                                                                                    maxLength={
                                                                                                        20
                                                                                                    }
                                                                                                />
                                                                                                {confirmPasswordToggle ? (
                                                                                                    <i
                                                                                                        onClick={
                                                                                                            handleConfirmPasswordToggle
                                                                                                        }
                                                                                                        className="fa fa-eye"
                                                                                                    ></i>
                                                                                                ) : (
                                                                                                    <i
                                                                                                        onClick={
                                                                                                            handleConfirmPasswordToggle
                                                                                                        }
                                                                                                        className="fa fa-eye-slash"
                                                                                                    ></i>
                                                                                                )}
                                                                                            </div>
                                                                                            <p className="text-danger text-start">
                                                                                                {
                                                                                                    errors_f2
                                                                                                        .confirmPwd
                                                                                                        ?.message
                                                                                                }
                                                                                            </p>

                                                                                            <p className="text-left">
                                                                                                <span className="text-danger">
                                                                                                    Password
                                                                                                    must
                                                                                                    be
                                                                                                    minimum
                                                                                                    8
                                                                                                    character
                                                                                                    length
                                                                                                    with
                                                                                                    One
                                                                                                    uppercase,
                                                                                                    lowercase,
                                                                                                    special
                                                                                                    and
                                                                                                    numeric.
                                                                                                </span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="cta-full-wid section-field text-uppercase text-end mt-2 ml-5">
                                                                                {stepOneComp && (
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            setStepOneComp(
                                                                                                false
                                                                                            )
                                                                                        }
                                                                                        className="cta-dark button btn-lg btn-info btn-sm full-rounded animated right-icn mx-2"
                                                                                    >
                                                                                        <span>
                                                                                            Previous
                                                                                        </span>
                                                                                    </button>
                                                                                )}
                                                                                <button className="cta-dark button btn-lg btn-theme btn-sm full-rounded animated right-icn">
                                                                                    <span>
                                                                                        CONTINUE
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            </Fragment>
        </>
    );
};
const mapDispatchToProps = {
    loginAction,
};
export default connect(null, mapDispatchToProps)(Register);
// const ConnectedRegister = connect(null, mapDispatchToProps)(Register);

// export default dynamic(() => Promise.resolve(ConnectedRegister), { ssr: false });
