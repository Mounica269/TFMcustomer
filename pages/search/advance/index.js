import { Fragment, useEffect, useState } from "react";
import { Col, Container, Form, Row, Accordion, Spinner, Card } from "react-bootstrap";
import { CONST, utils } from "core/helper";
import { connect, useSelector } from "react-redux";
import { masterService, profileService } from "core/services";
import {
    CITY_SEARCH_PATH,
    COMMUNITY_FILTER,
    COUNTRY_PATH,
    LANGUAGE_FILTER,
    RELIGION_FILTER,
    STATE_SEARCH_PATH,
    DEGREE_FILTER,
    COLLAGE_FILTER,
    PROFESSION_FILTER,
    STATE_PATH,
    CITY_PATH,
} from "core/services/apiURL.service";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ProfileSearch from "components/common/profile-search";
import MyAdvanceSearch from "../../../components/common/my-advance-search";
import { reloadAction } from "core";
import AsyncSelect from "react-select/async";
import { useRouter } from "next/router";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const isOpen = CONST.DEFAULT_IS_OPEN;
const basicSearchSchema = Yup.object().shape(
    {
        age: Yup.object().shape({
            from: Yup.number(),
            to: Yup.number(),
        }),
        height: Yup.object().shape({
            from: Yup.number(),
            to: Yup.number(),
        }),

        maritalStatus: Yup.array().of(Yup.string()).min(0),
        religion: Yup.array().of(Yup.string()).min(0),
        community: Yup.array().of(Yup.string()).min(0),
        language: Yup.array().of(Yup.string()).min(0),

        country: Yup.array().of(Yup.string()).min(0),
        countryGrowUp: Yup.array().of(Yup.string()).min(0),
        state: Yup.array().when("country", {
            is: (values) => utils.checkStateValidation(values),
            then: Yup.array().of(Yup.string()).min(0),
        }),
        city: Yup.array().when("state", {
            is: (values) => utils.checkCityValidation(values),
            then: Yup.array().of(Yup.string()).min(0),
        }),

        degree: Yup.array().of(Yup.string()).min(0),
        collage: Yup.array().of(Yup.string()).min(0),
        workingWith: Yup.array().of(Yup.string()).min(0),
        professionArea: Yup.array().of(Yup.string()).min(0),

        profileCreatedBy: Yup.array().of(Yup.string()).min(1).nullable(),
        diet: Yup.array().of(Yup.string()).min(1).nullable(),
        photoSetting: Yup.array().of(Yup.string()).min(1).nullable(),
        doNotShow: Yup.array().of(Yup.string()).min(1).nullable(),

        name: Yup.string().label("Name").required(),
        emailMe: Yup.string().label("Email me").required().nullable(),
    },
    ["country", "state"]
);

const AdvanceSearch = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const { token, profile, commonData, reloadAction } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        getValues,
    } = useForm({
        resolver: yupResolver(basicSearchSchema),
    });

    const countryWatch = watch("country");
    const stateWatch = watch("state");
    const religionWatch = watch("religion");
    const workingWithWatch = watch("workingWith");
    const router = useRouter();

    const workingWithVal = getValues("workingWith");
    console.log("workingWithVal::", workingWithVal);

    const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });
    const { heightTypes = null } = commonData;

    const ageFrom = 18,
        ageTo = 90;
    const [ageObj] = useState({ from: ageFrom, to: ageTo });

    const arrayRange = (start, end) =>
        Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    const [ageRange] = useState(arrayRange(ageFrom, ageTo));

    const [maritalStatusOptions, setMaritalStatusOptions] = useState([...isOpen]);
    const [maritalStatusesSelected, setMaritalStatusesSelected] = useState([...isOpen]);
    const [religionsSelected, setReligionsSelected] = useState([...isOpen]);
    const [communitiesSelected, setCommunitiesSelected] = useState([...isOpen]);
    const [languagesSelected, setLanguagesSelected] = useState([...isOpen]);

    const [countrySelected, setCountrySelected] = useState([...isOpen]);
    const [stateSelected, setStateSelected] = useState([...isOpen]);
    const [citiesSelected, setCitiesSelected] = useState([...isOpen]);
    const [countryGrowUpSelected, setCountryGrownUpSelected] = useState([...isOpen]);

    const [degreeSelected, setDegreeSelected] = useState([...isOpen]);
    const [collageselected, setCollageSelected] = useState([...isOpen]);
    const [workingWithSelected, setWorkingWithSelected] = useState([...isOpen]);
    const [professionAreaSelected, setProfessionAreaSelected] = useState([...isOpen]);
    const [religionFilter] = useState({ ...CONST.RELIGION_FILTER });
    const [languageFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [communityFilter] = useState({ ...CONST.COMMUNITY_FILTER_GET });
    const [stateFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [cityFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [degreeFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [collageFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [professionFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [loading, setLoading] = useState(false);
    const [workWithVal, setWorkWithVal] = useState(null);
    const [isBornAgain, setIsBornAgain] = useState(false);


    useEffect(() => {
        if (heightTypes !== null) {
            intializeInputs();
        }
    }, [commonData, heightTypes]);

    useEffect(() => {
        if (commonData !== null) {
            formatMaritalStatus();
        }
    }, [commonData]);

    const intializeInputs = () => {
        setValue("age", { from: ageObj.from, to: ageObj.to });
        setValue("height", {
            from: heightTypes[0]?.code,
            to: heightTypes[heightTypes.length - 1]?.code,
        });
        setValue("maritalStatus", []);
        setValue("religion", []);
        setValue("community", []);
        setValue("language", []);

        setValue("degree", []);
        setValue("collage", []);
        setValue("workingWith", []);
        setValue("professionArea", []);
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

    const handleCommonBlur = (selectedArr, selectedFunc, fieldName) => {
        if (selectedArr.length === 0) {
            selectedFunc([...isOpen]);
            setValue(fieldName, []);
        }
    };

    const handleCheckboxChange = (value) => {
        setIsBornAgain(value === isBornAgain ? null : value);
    };

    const handleCommonChange = (selectedValues, selectedFunc, fieldName) => {
        if (selectedValues.length > 0) {
            if (selectedValues[0] && selectedValues[0].value === 0) {
                selectedValues.splice(0, 1);
                selectedFunc([...selectedValues]);

                const selectedArr = [];
                selectedValues.map((ele) => selectedArr.push(ele.value));
                setValue(fieldName, selectedArr, { shouldValidate: true });
            } else {
                const selectedArr = [];
                selectedValues.map((ele) => selectedArr.push(ele.value));

                const isOpenAvailable = selectedValues.find((ele) => ele.value === 0);

                selectedFunc(isOpenAvailable ? [...isOpen] : [...selectedValues]);
                setValue(fieldName, isOpenAvailable ? [] : selectedArr, { shouldValidate: true });
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
    const handleCountryBlur = () =>
        handleCommonBlur(countrySelected, setCountrySelected, "country");
    const handleCountryChange = (values) => {
        handleCommonChange(values, setCountrySelected, "country");
        setStateSelected([...isOpen]);
        setCitiesSelected([...isOpen]);
        setValue("state", []);
        setValue("city", []);
    };

    const handleCountryGrownUpBlur = () =>
        handleCommonBlur(countryGrowUpSelected, setCountryGrownUpSelected, "countryGrowUp");

    const handleCountryGrownUpChange = (values) => {
        handleCommonChange(values, setCountryGrownUpSelected, "countryGrowUp");
    };

    const handleStateBlur = () => handleCommonBlur(stateSelected, setStateSelected, "state");
    const handleStateChange = (values) => {
        handleCommonChange(values, setStateSelected, "state");
        setCitiesSelected([...isOpen]);
        setValue("city", []);
    };

    const handleCityBlur = () => handleCommonBlur(citiesSelected, setCitiesSelected, "city");
    const handleCityChange = (values) => {
        setCitiesSelected([...isOpen]);
        handleCommonChange(values, setCitiesSelected, "city");
    };

    const handleDegreeBlur = () => handleCommonBlur(degreeSelected, setDegreeSelected, "degree");

    const handlecollageBlur = () => handleCommonBlur(collageselected, setCollageSelected, "collage");

    const handleWorkingWithBlur = () =>
        handleCommonBlur(workingWithSelected, setWorkingWithSelected, "workingWith");

    const handleProfessionAreaBlur = () =>
        handleCommonBlur(professionAreaSelected, setProfessionAreaSelected, "professionArea");

    const AdvancedSearchSubmit = async (values) => {
        setLoading(true);
        const {
            age,
            height,
            maritalStatus,
            religion,
            community,
            language,
            country,
            state,
            city,
            name,
            emailMe,
            degree,
            collage,
            workingWith,
            professionArea,
            diet,
            doNotShow,
            profileCreatedBy,
            photoSetting,
        } = values;

        const payload = {
            age,
            height,
            maritalStatus,
            religion,
            community,
            language,
            name,
            emailMe,
            isBornAgain: isBornAgain,
            isAdvanced: false,
            location: {
                country,
                state,
                city,
            },
            qualification: {
                degree,
                collage,
                workingWith,
                professionArea,
            },
            otherDetails: {
                profileCreatedBy: profileCreatedBy ? profileCreatedBy : [],
                photoSetting: photoSetting ? photoSetting : [],
                diet: diet ? diet : [],
                doNotShow: doNotShow ? doNotShow : [],
            },
            isBornAgain,
        };
        const resp = await profileService.advanceSearch(payload);
        if (resp && resp.meta.code === 200) {
            const { data } = resp;
            utils.showSuccessMsg(resp.meta.message);
            reset();
            reloadAction(true);
            setDegreeSelected([...isOpen]);
            setCollageSelected([...isOpen]);
            setWorkingWithSelected([...isOpen]);
            setProfessionAreaSelected([...isOpen]);
            setCountryGrownUpSelected([...isOpen]);
            setMaritalStatusesSelected([...isOpen]);
            setLanguagesSelected([...isOpen]);
            setReligionsSelected([...isOpen]);
            setCountrySelected([...isOpen]);
            setCountryGrownUpSelected([...isOpen]);
            setValue("age", { from: ageObj.from, to: ageObj.to });
            setValue("height", { from: height.from, to: height.to });
            setValue("height", {
                from: heightTypes[0]?.code,
                to: heightTypes[heightTypes.length - 1]?.code,
            });
            router.push(`/search/advance/${data.slug}`);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

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

    const handleCommunityChange = async (option) => {
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

    const loadCountryGrownUpOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            filter.search = inputValue;
            let countryGrowArr = [];
            const resp = await masterService.getAll(COUNTRY_PATH + "/filter", filter);
            if (resp && resp.meta.code === 200) {
                const { data: countryResp } = resp;
                countryGrowArr = countryResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(countryGrowArr);
        });

    const loadCountryOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            filter.search = inputValue;
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
            const countryValues = getValues("country");
            stateFilter.filter = {
                country: countryValues,
            };
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
            const countryValues = getValues("country");
            const stateValues = getValues("state");
            cityFilter.filter = {
                country: countryValues,
                state: stateValues,
            };
            cityFilter.search = inputValue;
            let cityArr = [];
            const resp = await masterService.postFilter(CITY_SEARCH_PATH, cityFilter);
            if (resp && resp.meta.code === 200) {
                const { data: cityResp } = resp;
                cityArr = cityResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(cityArr);
        });

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

    const loadcollageOptions = async (inputValue) =>
        new Promise(async (resolve) => {
            collageFilter.search = inputValue;
            let collageArr = [];
            const resp = await masterService.getAll(COLLAGE_FILTER, collageFilter);
            if (resp && resp.meta.code === 200) {
                const { data: collageResp } = resp;
                collageArr = collageResp.map((ele) => ({
                    value: ele._id,
                    label: ele.name,
                }));
            }
            resolve(collageArr);
        });

    const handlecollageChange = async (option) => {
        const Values = option;
        handleCommonChange(Values, setCollageSelected, "collage");
    }

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
        handleCommonChange(values, setWorkingWithSelected, "workingWith");
        if (option && option.length > 0) {
            option.map((ele) => {
                console.log("ele::", ele);
                if (ele.value === 50) {
                    setValue("professionArea", []);
                    setProfessionAreaSelected([...isOpen]);
                }
                setWorkWithVal(ele.value);
            });
        }
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
        handleCommonChange(values, setProfessionAreaSelected, "professionArea");
    };

    return (
        <>

        <Head>
    <title>Search Profiles | True Friend Christian Matrimony</title>

    <meta
        name="description"
        content="Search and discover faith-aligned Christian matrimonial profiles on True Friend Matrimony. Filter by partner preferences to find compatible matches and build meaningful, lasting relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Christian Matchmaking, Faith-Based Search, True Friend Matrimony, Partner Preferences, Find Christian Matches, Christian Singles, Marriage, Trusted Christian Matrimony Platform, Faith-Aligned Matches"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/search/advance" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Search Profiles | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Search for your ideal Christian matches on True Friend Matrimony. Use partner preferences to connect with faith-aligned singles for meaningful Christian relationships."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/search/advance" />


</Head>



            <section>
                <div className="login pro-edit-update">
                    <Container>
                        <Row className="row">
                            <Col md={9}>
                                <Card className="bg-white border-0 p-5">
                                    <Form onSubmit={handleSubmit(AdvancedSearchSubmit)}>
                                        <div className="edit-pro-parti">
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Age</label>
                                                </Col>
                                                <Col md={4} className="form-group">
                                                    <Form.Select {...register("age.from")}>
                                                        <option value="">Select</option>
                                                        {ageRange &&
                                                            ageRange.map((ele, ind) => (
                                                                <option key={ind} value={ele}>
                                                                    {ele}
                                                                </option>
                                                            ))}
                                                    </Form.Select>
                                                </Col>

                                                <Col md={1} className="text-center">
                                                    to
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Select {...register("age.to")}>
                                                        <option value="">Select</option>
                                                        {ageRange &&
                                                            ageRange.map((ele, ind) => (
                                                                <option key={ind} value={ele}>
                                                                    {ele}
                                                                </option>
                                                            ))}
                                                    </Form.Select>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Height</label>
                                                </Col>
                                                <Col md={4} className="form-group">
                                                    <Form.Select {...register("height.from")}>
                                                        <option value="">Select</option>
                                                        {commonData.heightTypes &&
                                                            commonData.heightTypes.map((ele, ind) => (
                                                                <option key={ind} value={ele.code}>
                                                                    {ele.label}
                                                                </option>
                                                            ))}
                                                    </Form.Select>
                                                </Col>

                                                <Col md={1} className="text-center">
                                                    to
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Select {...register("height.to")}>
                                                        <option value="">Select</option>
                                                        {commonData.heightTypes &&
                                                            commonData.heightTypes.map((ele, ind) => (
                                                                <option key={ind} value={ele.code}>
                                                                    {ele.label}
                                                                </option>
                                                            ))}
                                                    </Form.Select>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Marital status</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    <Select isMulti options={maritalStatusOptions}
                                                        value={maritalStatusesSelected} onChange={handleMaritalStatusChange}
                                                        onBlur={handleMaritalStatusBlur} />
                                                </Col>



                                            </Row>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Mother tongue</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    <AsyncSelect isMulti defaultOptions cacheOptions
                                                        loadOptions={loadLanguageOptions} value={languagesSelected}
                                                        onChange={handleLanguageChange} onBlur={handleLanguageBlur} />
                                                </Col>



                                            </Row>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Religion</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    <AsyncSelect isMulti defaultOptions cacheOptions
                                                        loadOptions={loadReligionOptions} value={religionsSelected}
                                                        onChange={handleReligionChange} onBlur={handleReligionBlur} />
                                                </Col>



                                            </Row>
                                            {religionWatch && religionWatch.length > 0 && (

                                                <Row>
                                                    <Col md={3} className="form-group">
                                                        <label className="lb">Community</label>
                                                    </Col>
                                                    <Col md={9} className="form-group">
                                                        <AsyncSelect isMulti defaultOptions cacheOptions
                                                            loadOptions={loadCommunityOptions} value={communitiesSelected}
                                                            onChange={handleCommunityChange} onBlur={handleCommunityBlur}
                                                            key={religionWatch} />
                                                    </Col>



                                                </Row>
                                            )}
                                            <Row className="my-2">
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Is Born Again</label>
                                                </Col>

                                                <Col md={9} className="form-group">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Yes"
                                                        checked={isBornAgain === true}
                                                        onChange={() => handleCheckboxChange(true)}
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="No"
                                                        checked={isBornAgain === false}
                                                        onChange={() => handleCheckboxChange(false)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Accordion
                                                className="accordion icon"
                                                defaultActiveKey={["0", "1", "2", "3"]}
                                                alwaysOpen
                                            >
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        Location & Grew up in Details
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row>
                                                            <Col md={3} className="form-group">
                                                                <label className="lb">Country living in</label>

                                                            </Col>
                                                            <Col md={9} className="form-group">
                                                                <AsyncSelect
                                                                    isMulti
                                                                    defaultOptions
                                                                    cacheOptions
                                                                    loadOptions={loadCountryOptions}
                                                                    value={countrySelected}
                                                                    onChange={handleCountryChange}
                                                                    onBlur={handleCountryBlur}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        {countryWatch && countryWatch.length > 0 && (
                                                            <Row>
                                                                <Col md={3} className="form-group">
                                                                    <label className="lb">State living in</label>


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
                                                                </Col>
                                                            </Row>
                                                        )}
                                                        {stateWatch && stateWatch.length > 0 && (
                                                            <Row>
                                                                <Col md={3} className="form-group">
                                                                    <label className="lb">City</label>
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
                                                                </Col>
                                                            </Row>
                                                        )}
                                                        <Row>
                                                            <Col md={3} className="form-group">
                                                                <label className="lb">Country Grew up in</label>

                                                            </Col>
                                                            <Col md={9}>
                                                                <AsyncSelect
                                                                    isMulti
                                                                    defaultOptions
                                                                    cacheOptions
                                                                    loadOptions={loadCountryGrownUpOptions}
                                                                    value={countryGrowUpSelected}
                                                                    onChange={handleCountryGrownUpChange}
                                                                    onBlur={handleCountryGrownUpBlur}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>Education & Profession</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row>
                                                            <Col md={3} className="form-group" >
                                                                <label className="lb">Qualification</label>

                                                            </Col>
                                                            <Col md={9}>
                                                                <AsyncSelect
                                                                    isMulti
                                                                    defaultOptions
                                                                    cacheOptions
                                                                    loadOptions={loadDegreeOption}
                                                                    value={degreeSelected}
                                                                    onChange={handleDegreeChange}
                                                                    onBlur={handleDegreeBlur}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-2 mb-2">
                                                            <Col md={3}>college</Col>
                                                            <Col md={9}>
                                                                <AsyncSelect
                                                                    isMulti
                                                                    defaultOptions
                                                                    cacheOptions
                                                                    loadOptions={loadcollageOptions}
                                                                    value={collageselected}
                                                                    onChange={handlecollageChange}
                                                                    onBlur={handlecollageBlur}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} className="form-group">
                                                                <label className="lb">Working with</label>

                                                            </Col>
                                                            <Col md={9}>
                                                                <AsyncSelect
                                                                    isMulti
                                                                    defaultOptions
                                                                    cacheOptions
                                                                    loadOptions={LoadWorkWithOptions}
                                                                    value={workingWithSelected}
                                                                    onChange={handleWorkWithChange}
                                                                    onBlur={handleWorkingWithBlur}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        {workWithVal && workWithVal !== 50 && (
                                                            <Row>
                                                                <Col md={3} className="form-group">
                                                                    <label className="lb">Profession</label>

                                                                </Col>
                                                                <Col md={9}>
                                                                    <AsyncSelect
                                                                        isMulti
                                                                        defaultOptions
                                                                        cacheOptions
                                                                        loadOptions={loadProfessionOptions}
                                                                        value={professionAreaSelected}
                                                                        onChange={handleProfessionChange}
                                                                        onBlur={handleProfessionAreaBlur}
                                                                        key={workingWithWatch}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>Lifestyle & Appearance</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row>
                                                            <Col md={3} className="form-group">
                                                                <label className="lb">Dietary Preferences</label>

                                                            </Col>
                                                            <Col md={9} className="form-group">
                                                                <div className="">
                                                                    {commonData &&
                                                                        commonData.dietTypes &&
                                                                        commonData.dietTypes.map((ele, ind) => (
                                                                            <Form.Check
                                                                                key={ind}
                                                                                className="mx-1"
                                                                            >
                                                                                <Form.Check.Label>
                                                                                    <Form.Check.Input
                                                                                        {...register("diet")}
                                                                                        value={ele.code}
                                                                                        className="mt-1"
                                                                                    />
                                                                                    <i className="input-helper"></i>
                                                                                    {ele.label}
                                                                                </Form.Check.Label>
                                                                            </Form.Check>
                                                                        ))}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Row className="my-2">
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Photo Settings</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    {commonData &&
                                                        commonData.privacyPhotoSetting &&
                                                        commonData.privacyPhotoSetting.map((ele, ind) => (
                                                            <Form.Check key={ind}>
                                                                <Form.Check.Label className="mx-1">
                                                                    <Form.Check.Input {...register("photoSetting")} value={ele.code}
                                                                        className="mt-1" />
                                                                    <i className="input-helper"></i>
                                                                    {ele.label}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        ))}
                                                </Col>



                                            </Row>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Do not Show</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    {commonData &&
                                                        commonData.dontShow &&
                                                        commonData.dontShow.map((ele, ind) => (
                                                            <Form.Check key={ind}>
                                                                <Form.Check.Label className="mx-1">
                                                                    <Form.Check.Input {...register("doNotShow")} value={ele.code}
                                                                        className="mt-1" />
                                                                    <i className="input-helper"></i>
                                                                    {ele.label}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        ))}
                                                </Col>



                                            </Row>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Matrimony Profile for</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    {commonData &&
                                                        commonData.profileCreatedBy &&
                                                        commonData.profileCreatedBy.map((ele, ind) => (
                                                            <Form.Check key={ind}>
                                                                <Form.Check.Label className="mx-1">
                                                                    <Form.Check.Input
                                                                        {...register("profileCreatedBy")}
                                                                        value={ele.code}
                                                                        className="mt-1"
                                                                    />
                                                                    <i className="input-helper"></i>
                                                                    {ele.label}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        ))}
                                                </Col>



                                            </Row>
                                            <h5>Save upto 5 Searches</h5>
                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Save Search as</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    <input type="text" className="form-control" {...register("name")} />
                                                    <p className="text-danger">{errors?.name?.message}</p>

                                                </Col>
                                            </Row>
                                            <Row className="my-2">
                                                <Col md={3} className="form-group">
                                                    <label className="lb">Email me new results</label>
                                                </Col>

                                                <Col md={9} className="form-group">
                                                    <div className="">
                                                        {commonData &&
                                                            commonData.mailingFrequency &&
                                                            commonData.mailingFrequency.map((ele, ind) => (
                                                                <Form.Check key={ind}>
                                                                    <Form.Check.Label className="mx-1">
                                                                        <Form.Check.Input
                                                                            type="radio"
                                                                            {...register("emailMe")}
                                                                            value={ele.code}
                                                                            className="mt-1"
                                                                        />
                                                                        <i className="input-helper"></i>
                                                                        {ele.label}
                                                                    </Form.Check.Label>
                                                                </Form.Check>
                                                            ))}
                                                    </div>
                                                    <p className="text-danger">{errors?.emailMe?.message}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <button type="submit" disabled={loading} className="cta-dark">
                                            {" "}
                                            {loading && (
                                                <Spinner className="mx-1" size="sm" animation="border" />
                                            )}
                                            Save & Continue{" "}
                                        </button>
                                    </Form>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <div>
                                    <MyAdvanceSearch />
                                    <ProfileSearch />
                                </div>

                            </Col>

                        </Row>
                    </Container>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        profile: state.account?.profile,
    };
};

const mapDispatchToProps = {
    reloadAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch);
