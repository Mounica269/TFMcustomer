import React, { Fragment, useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { masterService } from "core/services";
import { connect, useSelector } from "react-redux";
import { LANGUAGE_FILTER, STATE_PATH, COMMUNITY_FILTER_GET } from "core/services/apiURL.service";
import { CONST } from "core/helper";
import { reloadAction, communityDataAction, languageDataAction, statesDataAction } from "core/redux";

import dynamic from 'next/dynamic';

const photoSettingInitial = [
    {
        code: 10,
        label: `Proctected Photos`,
    },
    {
        code: 20,
        label: `Visible to all`,
    },
];

const isAllNew = [{ value: "0", label: "All" }];

const filterSchema = Yup.object().shape(
    {
        distance: Yup.string().label("Distance"),
        photoSetting: Yup.array().of(Yup.string()).min(0).label("Photo Setting"),
        recentlyJoined: Yup.string().label("recentlyJoined"),
        activeMembers: Yup.string().label("activeMembers"),
        maritalStatus: Yup.array().of(Yup.string()).min(0).label("Marital Status"),
        annualIncome: Yup.array().of(Yup.string()).min(0).label("annualIncome"),
        communities: Yup.array().of(Yup.string()).min(0).label("communities"),
        languages: Yup.array().of(Yup.string()).min(0).label("languages"),
        countries: Yup.array().of(Yup.string()).min(0).label("countries"),
        states: Yup.array().of(Yup.string()).min(0).label("states"),
    },
    []
);

const MatchFilter = (props) => {
    const {
        onFilterSubmit = { onFilterSubmit },
        isDistanceRange,
        reloadAction,
        width,
        isLoading,
    } = props;
    
    const authProfile = useSelector((state) => state?.account?.profile);
    const commonData = useSelector((state) => state?.common?.commonData);
    const reload = useSelector((state) => state?.common?.reloadAction);
    const reloadProfile = useSelector((state) => state?.account?.reloadProfile);
    const communityData = useSelector((state) => state.common?.communityData); 
    const languageData = useSelector((state) => state.common?.languageData);
    const statesData = useSelector((state) => state.common?.statesData);

    const { register, handleSubmit, getValues, setValue, watch } = useForm({
        defaultValues: {
            distance: "0",
            photoSetting: ["0"],
            recentlyJoined: "0",
            activeMembers: "0",
            maritalStatus: ["0"],
            annualIncome: ["0"],
            communities: ["0"],
            languages: ["0"],
            countries: ["0"],
            states: ["0"],
        },
        resolver: yupResolver(filterSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        const dataNew = { ...data };
        const payload = {};

        if (dataNew.distance[0] && dataNew.distance[0] !== "0") {
            payload.distance = Number(dataNew.distance);
        }
        if (dataNew.photoSetting[0] && dataNew.photoSetting[0] !== "0") {
            payload.photoSetting = dataNew.photoSetting.map((ele) => Number(ele));
        }
        if (dataNew.recentlyJoined !== "0") {
            payload.recentlyJoined = Number(dataNew.recentlyJoined);
        }
        if (dataNew.activeMembers !== "0") {
            payload.activeMembers = Number(dataNew.activeMembers);
        }
        if (dataNew.maritalStatus[0] && dataNew.maritalStatus[0] !== "0") {
            payload.maritalStatus = dataNew.maritalStatus.map((ele) => Number(ele));
        }
        if (dataNew.communities[0] && dataNew.communities[0] !== "0") {
            payload.community = dataNew.communities.map((ele) => ele);
        }
        if (dataNew.languages[0] && dataNew.languages[0] !== "0") {
            payload.language = dataNew.languages.map((ele) => ele);
        }
        if (dataNew.annualIncome[0] && dataNew.annualIncome[0] !== "0") {
            payload.qualification = {
                annualIncome: dataNew.annualIncome.map((ele) => Number(ele)),
            };
        }
        if (
            (dataNew.countries[0] && dataNew.countries[0] !== "0") ||
            (dataNew.states[0] && dataNew.states[0] !== "0")
        ) {
            payload.location = {};

            if (dataNew.countries[0] && dataNew.countries[0] !== "0") {
                payload.location.country = dataNew.countries.map((ele) => ele);
            }

            if (dataNew.states[0] && dataNew.states[0] !== "0") {
                payload.location.state = dataNew.states.map((ele) => ele);
            }
        }
        onFilterSubmit(payload);
    };

    useEffect(() => {
        const subscription = watch(handleSubmit(onSubmit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });
    const [langFilter] = useState({ ...CONST.DEFAULT_ASYNC_LANG_FILTER });
    const [stateFilter] = useState({ ...CONST.DEFAULT_STATE_FILTER });

    const [distanceRange, setDistanceRange] = useState([...isAllNew]);
    const [photoSetting, setPhotoSetting] = useState([...isAllNew]);
    const [maritalStatus, setMaritalStatus] = useState([...isAllNew]);
    const [recentlyJoined, setRecentlyJoined] = useState([...isAllNew]);
    const [activeMembers, setActiveMembers] = useState([...isAllNew]);
    const [annualIncome, setAnnualIncome] = useState([...isAllNew]);
    const [communities, setCommunities] = useState([...isAllNew]);
    const [languages, setLanguages] = useState([...isAllNew]);
    const [states, setStates] = useState([...isAllNew]);    

    const getSelectBoxFormatArr = (data, { label, value }) => {
        const arr = [];
        data.map((ele) => arr.push({ label: ele[label], value: ele[value] }));
        return arr;
    };

    const formatDistanceRange = () => {
        const commonDistanceRange = commonData?.distanceRange?.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonDistanceRange) {
            const distanceNew = [...commonDistanceRange];
            const setDistanceRangeArr = [...distanceRange, ...distanceNew];
            setDistanceRange(setDistanceRangeArr);
        }
    };

    const formatMaritalStatus = () => {
        const commonMaritalStatus = commonData?.maritalStatus?.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonMaritalStatus) {
            const setMartialStatusArr = [...maritalStatus, ...commonMaritalStatus];
            setMaritalStatus(setMartialStatusArr);
        }
    };

    const formatAnnualIncome = () => {
        const commonAnnualIncome = commonData?.yearlyIncome?.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonAnnualIncome) {
            const setAnnualIncomeArr = [...annualIncome, ...commonAnnualIncome];
            setAnnualIncome(setAnnualIncomeArr);
        }
    };

    const formatPhotoSetting = () => {
        const commonPhotoSetting = photoSettingInitial.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonPhotoSetting) {
            const setPhotoSettingArr = [...photoSetting, ...commonPhotoSetting];
            setPhotoSetting(setPhotoSettingArr);
        }
    };

    const formatRecentlyJoined = () => {
        const commonRecentlyJoined = commonData?.dateRangeFilters?.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonRecentlyJoined) {
            const commonRecentlyJoinedNew = [...commonRecentlyJoined];
            const setRecentlyJoinedArr = [...recentlyJoined, ...commonRecentlyJoinedNew];
            setRecentlyJoined(setRecentlyJoinedArr);
        }
    };

    const formatActiveMembers = () => {
        const commonActiveMembers = commonData?.dateRangeFilters?.map((ele) => ({
            label: ele.label,
            value: ele.code,
        }));
        if (commonActiveMembers) {
            const commonActiveMembersNew = [...commonActiveMembers];
            const setActiveMembersArr = [...activeMembers, ...commonActiveMembersNew];
            setActiveMembers(setActiveMembersArr);
        }
    };

    const getCommunity = async (filter) => {
        if (authProfile?.basic?.religion) {
            filter.religion = authProfile?.basic?.religion?._id;
        }
        const resp = await masterService.getAll(COMMUNITY_FILTER_GET, filter);
        if (resp && resp.meta.code === 200) {            
            const updateDataArr = getSelectBoxFormatArr(resp.data, {
                label: "community",
                value: "_id",
            });
            var communityData = [...communities, ...updateDataArr];
            setCommunities(communityData);
            props.communityDataAction(communityData);
        }
    };

    const getLanguage = async (langFilter) => {
        const resp = await masterService.getAll(LANGUAGE_FILTER, langFilter);
        if (resp && resp.meta.code === 200) {
            const updateDataArr = getSelectBoxFormatArr(resp.data, { label: "name", value: "_id" });
            let languageData = [...languages, ...updateDataArr];
            setLanguages(languageData);            
            props.languageDataAction(languageData);
        }
    };

    const loadStates = async (stateFilter) => {
        if (authProfile?.location?.country?._id) {
            stateFilter.country = authProfile?.location?.country?._id;
        }
        const resp = await masterService.getAll(STATE_PATH + "/filter", stateFilter);
        if (resp && resp.meta.code === 200) {
            const updateDataArr = getSelectBoxFormatArr(resp.data, { label: "name", value: "_id" });
            let statesData = [...states, ...updateDataArr];
            setStates(statesData);
            props.statesDataAction(statesData);
        }
    };

    const checkboxOnChange = (eve, fieldName) => {
        const { value, checked } = eve.target;
        const previousArr = getValues(fieldName);
        // reloadAction(!reload);
        if (checked) {
            if (value !== "0") {
                if (previousArr[0] === "0") {
                    previousArr.splice(0, 1);
                }
                previousArr.push(value);
            } else {
                previousArr = [value];
            }
        } else {
            const preInd = previousArr.findIndex((ele) => ele === value);
            previousArr.splice(preInd, 1);
            if (previousArr.length === 0) {
                previousArr = ["0"];
            }
        }
        setValue(fieldName, previousArr);
    };

    useEffect(() => {
        console.log("Current", reload);
        if (reload) {
            formatDistanceRange();
            formatRecentlyJoined();
            formatMaritalStatus();
            formatAnnualIncome();
            formatPhotoSetting();
            formatActiveMembers();
            if(communityData?.length == 1){
                getCommunity({ ...filter });                          
            }else if(communities?.length == 1){
                setCommunities(communityData);
            }

            if(languageData.length == 1){
                getLanguage({ ...langFilter });
            }else if(languages?.length == 1){
                setLanguages(languageData);
            }

            if(statesData.length == 1){
                loadStates({ ...stateFilter });
            }else if(states?.length == 1){
                setStates(statesData);
            }            
        }
    }, [reload, reloadProfile]);

    return (
        <>

        <Fragment>
            <Accordion
                className={`filter-accordian ${isLoading && width <= 768 ? "d-none" : "d-block"}`}
                defaultActiveKey={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                alwaysOpen
            >
                <h4>Refine Search</h4>
                {isDistanceRange && (
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Distance Range</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                {distanceRange.map((ele, ind) => (
                                    <Form.Check
                                        {...register(`distance`)}
                                        key={ind}
                                        type="radio"
                                        label={ele.label}
                                        value={ele.value}
                                        name="distance"
                                        // onChange={async (e) => checkboxOnChange(e, "distance")}
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Photo Settings</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {photoSetting.map((ele, ind) => (
                                <Form.Check
                                    {...register(`photoSetting`)}
                                    key={ind}
                                    type="checkbox"
                                    label={ele.label}
                                    value={ele.value}
                                    name="photoSetting"
                                    onChange={async (e) => checkboxOnChange(e, "photoSetting")}
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Recently Joined</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {recentlyJoined.map((ele, ind) => (
                                <Form.Check
                                    {...register("recentlyJoined")}
                                    key={ind}
                                    type="radio"
                                    label={ele.label}
                                    value={ele.value}
                                    name="recentlyJoined"
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Active Members</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {activeMembers.map((ele, ind) => (
                                <Form.Check
                                    {...register("activeMembers")}
                                    key={ind}
                                    type="radio"
                                    label={ele.label}
                                    value={ele.value}
                                    name="activeMembers"
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Marital Status</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {maritalStatus.map((ele, ind) => (
                                <Form.Check
                                    {...register("maritalStatus")}
                                    key={ind}
                                    type="checkbox"
                                    label={ele.label}
                                    value={ele.value}
                                    name="maritalStatus"
                                    onChange={async (e) => checkboxOnChange(e, "maritalStatus")}
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>Annual Income</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {annualIncome.map((ele, ind) => (
                                <Form.Check
                                    {...register("annualIncome")}
                                    type="checkbox"
                                    key={ind}
                                    label={ele.label}
                                    value={ele.value}
                                    name="annualIncome"
                                    onChange={async (e) => checkboxOnChange(e, "annualIncome")}
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>Community</Accordion.Header>
                    <Accordion.Body className="match-filter">
                        <Form>
                            {communities?.map((ele, ind) => (
                                <Form.Check
                                    {...register("communities")}
                                    type="checkbox"
                                    key={ind}
                                    label={ele.label}
                                    value={ele.value}
                                    name="annualIncome"
                                    onChange={async (e) => checkboxOnChange(e, "communities")}
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                    <Accordion.Header>Mother Tongue</Accordion.Header>
                    <Accordion.Body className="match-filter">
                        <Form>
                            {languages.map((ele, ind) => {
                                return (
                                    <Form.Check
                                        {...register("languages")}
                                        type="checkbox"
                                        key={ind}
                                        label={ele.label}
                                        value={ele.value}
                                        name="motherTounge"
                                        onChange={async (e) => checkboxOnChange(e, "languages")}
                                    />
                                );
                            })}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                {/* <Accordion.Item eventKey="8">
                    <Accordion.Header>Country Living in</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {countries.map((ele, ind) => (
                                <Form.Check
                                    {...register("countries")}
                                    type="checkbox"
                                    key={ind}
                                    label={ele.label}
                                    value={ele.value}
                                    name="Country"
                                    onChange={async (e) => checkboxOnChange(e, "countries")}
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item> */}
                <Accordion.Item eventKey="9">
                    <Accordion.Header>State Living in</Accordion.Header>
                    <Accordion.Body className="state-filter">
                        <Form>
                            {states.map((ele, ind) => (
                                <Form.Check
                                    {...register("states")}
                                    type="checkbox"
                                    key={ind}
                                    label={ele.label}
                                    value={ele.value}
                                    name="State"
                                    onChange={async (e) => checkboxOnChange(e, "states")}
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Fragment>
        </>
    );
};

const mapDispatchToProps = {
    reloadAction,
    communityDataAction,
    languageDataAction,
    statesDataAction
};

export default connect(null, mapDispatchToProps)(MatchFilter);
// const ConnectedMatchFilter = connect(null, mapDispatchToProps)(MatchFilter);

// export default dynamic(() => Promise.resolve(ConnectedMatchFilter), { ssr: false });
