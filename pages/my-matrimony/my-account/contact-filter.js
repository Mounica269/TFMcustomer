import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MyAccountSettings from "components/common/my-account-settings";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  CONST,
  utils,
  masterService,
  profileService,
  COMMUNITY_FILTER,
  LANGUAGE_FILTER,
  RELIGION_FILTER,
  reloadProfileAction,
  COMMUNITY_FILTER_GET,
} from "core";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const isOpen = CONST.DEFAULT_IS_OPEN;
const contactFilterSchema = Yup.object().shape({
  age: Yup.object().shape({
    from: Yup.string().label("Age from").required(),
    to: Yup.string().label("Age to").required(),
  }),
  height: Yup.object().shape({
    from: Yup.string().label("Height from").required(),
    to: Yup.string().label("Height to").required(),
  }),
});

const ContactFilter = (props) => {
  const { commonData, authProfile, reloadProfileAction, reloadProfile } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(contactFilterSchema),
  });
  const religionWatch = watch("religion");
  const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });

  const [isContactFilterEdit, setIsContactFilterEdit] = useState(true);
  const [contactMeData, setContactMeData] = useState({});

  const [religionOptions, setReligionOptions] = useState([...isOpen]);
  const [selectedReligions, setSelectedReligions] = useState([...isOpen]);

  const [communityOptions, setCommunityOptions] = useState([...isOpen]);
  const [selectedCommunities, setSelectedCommunities] = useState([...isOpen]);

  const [languageOptions, setLanguageOptions] = useState([...isOpen]);
  const [selectedLanguages, setSelectedLanguages] = useState([...isOpen]);
  const [communityFilter] = useState({ ...CONST.COMMUNITY_FILTER });
  const [langFilter] = useState({ ...CONST.QUALIFICATION_FILTER });

  useEffect(() => {
    arrayRange(ageFrom, ageTo);
    getReligion();
    getCommunity();
    getLanguage();
  }, []);

  const handleContactFilterEdit = () =>
    setIsContactFilterEdit(!isContactFilterEdit);
  const handleContactFilterEditCancel = () => {
    setIsContactFilterEdit(!isContactFilterEdit);
  };

  const ageFrom = 18,
    ageTo = 90;
  const [ageObj, setAgeObj] = useState({ from: ageFrom, to: ageTo });
  const { heightTypes = null } = commonData;
  // console.log("heightTypes::", heightTypes);
  // console.log("ageObj::", ageObj);

  const arrayRange = (start, end) => {
    const length = Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
    setAgeObj(length);
  };

  useEffect(() => {
    if (!authProfile?.contactMe) {
      intializeInputs();
    }
  }, [authProfile]);

  const intializeInputs = () => {
    // console.log("last code::");
    setValue("age.from", ageObj.from, { shouldValidate: true });
    setValue("age.to", ageObj.to, { shouldValidate: true });
    if (heightTypes && heightTypes.length > 0) {
      setValue("height.from", heightTypes[0]?.code, { shouldValidate: true });
      setValue("height.to", heightTypes[heightTypes.length - 1]?.code, { shouldValidate: true });
    }
  };

  const getSelectBoxFormatArr = (data, { label, value }) => {
    const arr = [];
    data.map((ele) => arr.push({ label: ele[label], value: ele[value] }));
    return arr;
  };

  const getReligion = async () => {
    const resp = await masterService.getAll(RELIGION_FILTER, filter);
    if (resp && resp.meta.code === 200) {
      const updateDataArr = getSelectBoxFormatArr(resp.data, {
        label: "name",
        value: "_id",
      });
      setReligionOptions([...religionOptions, ...updateDataArr]);
    }
  };

  const loadReligionOptions = (inputValue) =>
    new Promise(async (resolve) => {
      if (inputValue) {
        filter.search = inputValue;
      }
      let religionArr = [];
      const resp = await masterService.getAll(RELIGION_FILTER, filter);
      if (resp && resp.meta.code === 200) {
        const { data: religionResp } = resp;
        religionArr = religionResp.map((ele) => ({
          value: ele._id,
          label: ele.name,
        }));
      }
      resolve(religionArr);
    });

  const getCommunity = async () => {
    const resp = await masterService.getAll(COMMUNITY_FILTER_GET, filter);
    if (resp && resp.meta.code === 200) {
      const updateDataArr = getSelectBoxFormatArr(resp.data, {
        label: "community",
        value: "_id",
      });
      setCommunityOptions([...communityOptions, ...updateDataArr]);
    }
  };

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
      const resp = await masterService.postFilter(
        COMMUNITY_FILTER,
        communityFilter
      );
      if (resp && resp.meta.code === 200) {
        const { data: communityResp } = resp;
        communityArr = communityResp.map((ele) => ({
          value: ele._id,
          label: ele.community + "-" + ele.religion.name,
        }));
      }
      resolve(communityArr);
    });

  const getLanguage = async () => {
    const resp = await masterService.getAll(LANGUAGE_FILTER, filter);
    if (resp && resp.meta.code === 200) {
      const updateDataArr = getSelectBoxFormatArr(resp.data, {
        label: "name",
        value: "_id",
      });
      setLanguageOptions([...languageOptions, ...updateDataArr]);
    }
  };

  const loadLanguageOptions = async (inputValue) =>
    // perform a request
    new Promise(async (resolve) => {
      langFilter.search = inputValue;
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
        setValue(fieldName, isOpenAvailable ? [] : arr, {
          shouldValidate: true,
        });
      }
    } else {
      selectedFunc([]);
      setValue(fieldName, [], { shouldValidate: true });
    }
  };

  const handleReligionBlur = () =>
    handleCommonBlur(selectedReligions, setSelectedReligions, "religion");
  const handleReligionChange = (values) => {
    handleCommonChange(values, setSelectedReligions, "religion");
    setSelectedCommunities([...isOpen]);
    setValue("community", []);
    communityFilter.search = "";
  };

  const handleCommunityBlur = () =>
    handleCommonBlur(selectedCommunities, setSelectedCommunities, "community");
  const handleCommunityChange = async (values) => {
    const religionValue = getValues("religion");
    if (religionValue === undefined) {
      return;
    }
    if (religionValue === "") {
      return false;
    }
    handleCommonChange(values, setSelectedCommunities, "community");
  };

  const handleLanguageBlur = () =>
    handleCommonBlur(selectedLanguages, setSelectedLanguages, "language");
  const handleLanguageChange = (values) =>
    handleCommonChange(values, setSelectedLanguages, "language");

  const getUserContactMeOptions = async (privacyOption) => {
    setUserContactMeValues(privacyOption);
    setContactMeData(privacyOption);
  };

  const setUserContactMeValues = (data) => {
    if (data) {
      console.log("contact data::", data);
      const { age, height, language, religion, community } = data;
      setValue("age.from", age.from, { shouldValidate: true });
      setValue("age.to", age.to, { shouldValidate: true });
      setValue("height.from", height.from, { shouldValidate: true });
      setValue("height.to", height.to, { shouldValidate: true });

      const religionCond = religion !== undefined && religion.length === 0;
      const communityCond = community !== undefined && community.length === 0;
      const languageCond = language !== undefined && language.length === 0;
      setValue("religion", religionCond ? [] : religion.map((ele) => ele._id));
      setValue(
        "community",
        communityCond ? [] : community.map((ele) => ele._id)
      );
      setValue("language", languageCond ? [] : language.map((ele) => ele._id));

      const getSelReligions = religionCond
        ? {}
        : religion.map((ele) => {
          return {
            value: ele._id,
            label: ele.name,
          };
        });
      // religionOptions.filter((ele) => religion.find((ele2) => ele2._id === ele.value)),

      const getSelCommonities = communityCond
        ? {}
        : community.map((ele) => {
          return { value: ele._id, label: ele.community };
        });
      const getSelLanguages = languageCond
        ? {}
        : language.map((ele) => {
          return {
            value: ele._id,
            label: ele.name,
          };
        });
      // languageOptions.filter((ele) => language.find((ele2) => ele2._id === ele.value));
      setSelectedReligions(religionCond ? [...isOpen] : getSelReligions);
      setSelectedCommunities(communityCond ? [...isOpen] : getSelCommonities);
      setSelectedLanguages(languageCond ? [...isOpen] : getSelLanguages);
    }
  };

  const onSubmit = async (values) => {
    const resp = await profileService.updateProfileContactMe(values);
    if (resp && resp.meta.code === 200) {
      utils.showSuccessMsg(resp.meta.message);
      handleContactFilterEdit();
      reloadProfileAction(!reloadProfile);
    }
  };

  const getHeight = (heightFrom, heightTo) => {
    const heightFromObj = heightTypes?.find((ele) => ele.code === heightFrom);
    const heightToLabel = heightTypes?.find((ele) => ele.code === heightTo);
    return heightFromObj?.label + " -  " + heightToLabel?.label;
  };

  const getContactFilterSection = () => {
    // if (contactMeData === undefined || contactMeData === {}) {
    //     return;
    // }

    return (
      <>
        <div className="row">
          <h6 className="mt-3">
            Only Members matching the below criteria will be able to view your
            contact details.
          </h6>

          <div className="col-md-12 form-group p-2">
            <div className="pr-bio-info">
              <ul>
                <li>
                  <b>Age:</b>
                  {authProfile?.contactMe?.age.from
                    ? authProfile?.contactMe?.age.from +
                    " yr - " +
                    authProfile?.contactMe?.age.to +
                    " yr"
                    : "-"}
                </li>
                <li>
                  <b>Height:</b>
                  <span>{authProfile?.contactMe?.height
                    ? getHeight(
                      authProfile?.contactMe?.height?.from,
                      authProfile?.contactMe?.height?.to
                    )
                    : " - "}</span>
                </li>
                <li>
                  <b>Religion:</b>
                  {(authProfile?.contactMe?.religion === undefined ||
                    authProfile?.contactMe?.religion?.length === 0) &&
                    `Open to all`}
                  {authProfile?.contactMe?.religion &&
                    authProfile?.contactMe?.religion?.length !== 0 &&
                    authProfile?.contactMe?.religion
                      ?.map((ele) => ele.name)
                      .join(", ")}
                </li>
                <li>
                  <b>Community:</b>
                  {(authProfile?.contactMe?.community === undefined ||
                    authProfile?.contactMe?.community?.length === 0) &&
                    `Open to all`}
                  {authProfile?.contactMe &&
                    authProfile?.contactMe?.community.length !== 0 &&
                    authProfile?.contactMe?.community
                      ?.map((ele) => ele.community)
                      .join(", ")}{" "}
                </li>

                <li>
                  <b>Mother Tongue:</b>{" "}
                  {(authProfile?.contactMe?.language === undefined ||
                    authProfile?.contactMe?.language?.length === 0) &&
                    `Open to all`}
                  {authProfile?.contactMe &&
                    authProfile?.contactMe?.language?.length !== 0 &&
                    authProfile?.contactMe?.language
                      .map((ele) => ele.name)
                      .join(", ")}{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const getContactFilterForm = () => {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="account-sec-edit-bg p-3">
            <Col md={12}>
              <Row>
                <Col md={3}>Age</Col>
                <Col md={9}>
                  <Row>
                    <Col md={6}>
                      <Form.Label>From</Form.Label>
                      <Form.Select {...register("age.from")}>
                        <option value="">Select</option>
                        {ageObj.length > 0 &&
                          ageObj.map((ele, ind) => (
                            <option key={ind} value={ele}>
                              {ele}
                            </option>
                          ))}
                      </Form.Select>
                      <p className="text-danger text-start">
                        {errors.age?.from?.message}
                      </p>
                    </Col>
                    <Col md={6}>
                      <Form.Label>To</Form.Label>
                      <Form.Select {...register("age.to")}>
                        <option value="">Select</option>
                        {ageObj.length > 0 &&
                          ageObj.map((ele, ind) => (
                            <option key={ind} value={ele}>
                              {ele}
                            </option>
                          ))}
                      </Form.Select>
                      <p className="text-danger text-start">
                        {errors.age?.to?.message}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={3}>Height</Col>
                <Col md={9}>
                  <Row>
                    <Col md={6}>
                      <Form.Label>From</Form.Label>
                      <Form.Select {...register("height.from")}>
                        <option value="">Select</option>
                        {heightTypes.length > 0 &&
                          heightTypes.map((ele, ind) => (
                            <option key={ind} value={ele.code}>
                              {ele.label}
                            </option>
                          ))}
                      </Form.Select>
                      <p className="text-danger text-start">
                        {errors.height?.from?.message}
                      </p>
                    </Col>
                    <Col md={6}>
                      <Form.Label>To</Form.Label>
                      <Form.Select {...register("height.to")}>
                        <option value="">Select</option>
                        {heightTypes.length > 0 &&
                          heightTypes.map((ele, ind) => (
                            <option key={ind} value={ele.code}>
                              {ele.label}
                            </option>
                          ))}
                      </Form.Select>
                      <p className="text-danger text-start">
                        {errors.height?.to?.message}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={3}>Religion</Col>
                <Col md={6}>
                  <AsyncSelect
                    isMulti
                    defaultOptions
                    cacheOptions
                    loadOptions={loadReligionOptions}
                    value={selectedReligions}
                    onChange={handleReligionChange}
                    onBlur={handleReligionBlur}
                  />
                  <p className="text-danger">{errors.religion?.message}</p>
                </Col>
              </Row>
              {religionWatch && religionWatch.length > 0 && (
                <Row className="mt-3">
                  <Col md={3}>Community</Col>
                  <Col md={6}>
                    <AsyncSelect
                      isMulti
                      defaultOptions
                      cacheOptions
                      loadOptions={loadCommunityOptions}
                      value={selectedCommunities}
                      onChange={handleCommunityChange}
                      onBlur={handleCommunityBlur}
                      key={religionWatch}
                    />
                    <p className="text-danger">{errors.community?.message}</p>
                  </Col>
                </Row>
              )}
              <Row className="mt-3">
                <Col md={3}>Mother tongue</Col>
                <Col md={5}>
                  <AsyncSelect
                    isMulti
                    defaultOptions
                    cacheOptions
                    loadOptions={loadLanguageOptions}
                    value={selectedLanguages}
                    onChange={handleLanguageChange}
                    onBlur={handleLanguageBlur}
                  />
                  <p className="text-danger">{errors.language?.message}</p>
                </Col>
              </Row>
            </Col>
            <Button className="w-auto" disabled={isSubmitting} type="submit">
              {" "}
              Submit
            </Button>
            <Button
              onClick={handleContactFilterEditCancel}
              className="w-auto btn-danger mx-2"
              type="submit"
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </>
    );
  };

  useEffect(() => {
    getUserContactMeOptions(authProfile?.contactMe);
  }, [authProfile]);

  return (
    <>
    <Head>
    <title>Contact Filter | True Friend Christian Matrimony</title>

   <meta
        name="description"
        content="Filter and manage your contacts on TrueFriend Matrimony, the trusted Christian matchmaking platform. Discover compatible Christian singles based on faith, preferences, and location to build meaningful, faith-aligned relationships."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Contact Filter, Christian Match Search, Partner Preferences, Faith-Based Matchmaking, Find Christian Life Partner, Local Christian Matches, Christian Singles, TrueFriend Matrimony, Trusted Matrimonial Platform, Christian Marriage Partner Search"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/inbox/contacts" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Contact Filter | True Friend Christian Matrimony" />
    <meta
        property="og:description"
        content="Filter and manage your contacts on True Friend Christian Matrimony. Find compatible Christian matches based on faith, preferences, and location to build meaningful relationships."
    />

    <meta property="og:url" content="https://www.truefriendmatrimony.com/inbox/contacts" />


 
</Head>


      <section>
        <div className="db">
          <Container>
            <Row>
              <Col xl={3} lg={4} md={12}>
                <div className="db-nav">
                  <div className="db-nav-list">
                    <MyAccountSettings />
                  </div>
                </div>
              </Col>
              <Col xl={9} lg={8} md={12}>
                <div className="db-nav">
                  <div className="db-nav-list">
                    <div className="d-flex justify-content-between">
                      <h4 style={{ textTransform: "none" }}>
                        Who can contact me?
                      </h4>
                      <button
                        onClick={handleContactFilterEdit}
                        className="cta-dark"
                      >
                        {isContactFilterEdit ? "Edit" : "Back"}
                      </button>
                    </div>
                    {isContactFilterEdit
                      ? getContactFilterSection()
                      : getContactFilterForm()}
                  </div>
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
    authProfile: state.account?.profile,
    reloadProfile: state.account?.reloadProfile,
  };
};

const mapDispatchToProps = {
  reloadProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactFilter);
