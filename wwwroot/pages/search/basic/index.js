import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner, Card } from "react-bootstrap";
import Link from "next/link";
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
} from "core/services/apiURL.service";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ProfileSearch from "components/common/profile-search";
import MySavedSearches from "components/common/my-saved-searchs";
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

        maritalStatus: Yup.array().of(Yup.string()).min(0).label("Marital Status"),
        religion: Yup.array().of(Yup.string()).min(0).label("Religion"),
        community: Yup.array().of(Yup.string()).min(0).label("Community"),
        language: Yup.array().of(Yup.string()).min(0).label("Language"),

        country: Yup.array().of(Yup.string()).min(0).label("country"),
        state: Yup.array().when("country", {
            is: (values) => utils.checkStateValidation(values),
            then: Yup.array().of(Yup.string()).min(0).label("state"),
        }),
        city: Yup.array().when("state", {
            is: (values) => utils.checkCityValidation(values),
            then: Yup.array().of(Yup.string()).min(0).label("city"),
        }),

        name: Yup.string().label("Search name").required(),
        emailMe: Yup.string().label("Email me").required().nullable(),

        photoSetting: Yup.array().of(Yup.string()).min(1).label("photoSetting").nullable(),
        doNotShow: Yup.array().of(Yup.string()).min(1).label("doNotShow").nullable(),
    },
    ["country", "state"]
);

const Search = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const { commonData, reloadAction } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(basicSearchSchema),
    });

    const countryWatch = watch("country");
    const stateWatch = watch("state");
    const religionWatch = watch("religion");
    const router = useRouter();

    const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });
    const { heightTypes = null } = commonData;

    const ageFrom = 18,
        ageTo = 90;
    const [ageObj, setAgeObj] = useState({ from: ageFrom, to: ageTo });

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
    const [languageFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [religionFilter] = useState({ ...CONST.RELIGION_FILTER });
    const [communityFilter] = useState({ ...CONST.COMMUNITY_FILTER_GET });
    const [stateFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [cityFilter] = useState({ ...CONST.QUALIFICATION_FILTER });
    const [loading, setLoading] = useState(false);
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
            // cityFilter.state = stateValues;
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

    const basicSearchSubmit = async (values) => {
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
            photoSetting,
            doNotShow,
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
            otherDetails: {
                photoSetting: photoSetting ? photoSetting : [],
                doNotShow: doNotShow ? doNotShow : [],
            },
        };

        console.log("payload:;", payload);
        // return false
        const resp = await profileService.basicSearch(payload);
        if (resp && resp.meta.code === 200) {
            const { data } = resp;
            utils.showSuccessMsg(resp.meta.message);
            reset();
            reloadAction(true);
            setMaritalStatusesSelected([...isOpen]);
            setLanguagesSelected([...isOpen]);
            setReligionsSelected([...isOpen]);
            setCommunitiesSelected([...isOpen]);
            setCountrySelected([...isOpen]);
            setStateSelected([...isOpen]);
            setCitiesSelected([...isOpen]);
            router.push(`/search/basic/${data.slug}`);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    return (
        <>

            <Head>
                <title>
                    Search | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
                </title>
                <meta
                    name="description"
                    content="Search and connect with ideal Christian matches on True Friend Matrimony. Use faith-based filters to find profiles aligned with your values and preferences."
                />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Christian Matchmaking, Faith-Based Search, True Friend Matrimony, Find Christian Matches, Ideal Christian Partner, Partner Preferences, Marriage, Trusted Christian Matrimony Platform"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/search" />
            </Head>


            <div className="login pro-edit-update">
                <Container>
                    <Row className="row">
                        <Col xl={9} lg={8} md={12}>
                            <Card className="bg-white border-0 p-5">
                                <Form onSubmit={handleSubmit(basicSearchSubmit)}>
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
                                        {/* <Row>
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

                                        </Row> */}

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
                                        <Row>
                                            <Col md={3} className="form-group">
                                                <label className="lb">Country living in</label>
                                            </Col>
                                            <Col md={9} className="form-group">
                                                <AsyncSelect isMulti defaultOptions cacheOptions
                                                    loadOptions={loadCountryOptions} value={countrySelected}
                                                    onChange={handleCountryChange} onBlur={handleCountryBlur} //
                                                    key={countryWatch} />
                                            </Col>



                                        </Row>
                                        {countryWatch && countryWatch.length > 0 && (

                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">State living in</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    <AsyncSelect isMulti defaultOptions cacheOptions
                                                        loadOptions={loadStateOptions} value={stateSelected}
                                                        onChange={handleStateChange} onBlur={handleStateBlur}
                                                        key={countryWatch} />
                                                </Col>



                                            </Row>
                                        )}
                                        {stateWatch && stateWatch.length > 0 && (

                                            <Row>
                                                <Col md={3} className="form-group">
                                                    <label className="lb">City</label>
                                                </Col>
                                                <Col md={9} className="form-group">
                                                    <AsyncSelect isMulti defaultOptions cacheOptions
                                                        loadOptions={loadCityOptions} value={citiesSelected}
                                                        onChange={handleCityChange} onBlur={handleCityBlur} key={stateWatch} />
                                                </Col>



                                            </Row>
                                        )}
                                        <Row>
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
                                        <Row>
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
                                                <p className="text-danger">
                                                    {errors?.photoSetting?.message}
                                                </p>

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
                                                <p className="text-danger">{errors?.doNotShow?.message}</p>
                                                <Link href={CONST.SEARCH_ADVANCE_PATH}>Advance Search</Link>

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
                        <Col xl={3} lg={4} md={12}>
                            <div>
                                <MySavedSearches />
                                <ProfileSearch />
                            </div>

                        </Col>

                    </Row>
                </Container>
            </div>

        </>
    );
};

const mapDispatchToProps = {
    reloadAction,
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        profile: state.account?.profile,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
