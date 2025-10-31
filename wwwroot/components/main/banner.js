import { Carousel } from "react-bootstrap";
import banner from "public/frontend/images/banner/banner.jpg";
// import banner_1 from "public/frontend/images/banner/banner_1.jpg";
// import banner_2 from "public/frontend/images/banner/banner_2.jpg";
// import banner_6 from "public/frontend/images/banner/banner_6.jpg";
// import banner_4 from "public/frontend/images/banner/banner_4.jpg";
// import banner_5 from "public/frontend/images/banner/banner_5.jpg";
// import banner_6 from "public/frontend/images/banner/banner_6.jpg";
import banner_7 from "public/frontend/images/banner/banner_7.jpg";
import banner_8 from "public/frontend/images/banner/banner_8.jpg";
import banner_9 from "public/frontend/images/banner/banner_9.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import { CONST } from "core/helper";
import { LANGUAGE_FILTER, masterService, usersService, RELIGION_FILTER } from "core/services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Required from "components/common/required";
import Head from "next/head";

const bannerList = [
    { id: 1, src: banner },
    { id: 2, src: banner_7 },
    { id: 3, src: banner_8 },
    { id: 4, src: banner_9 },
];

let validName = "";
let isNameValid = false;
const validationSchema = Yup.object().shape(
    {
        profileFor: Yup.string().required(CONST.MSG.PROF_FOR_REQ),
        // gender: Yup.string().nullable().required(CONST.MSG.GENDER_REQ),
        name: Yup.string()
            .required(CONST.MSG.NAME_REQ)
            .test("checkNameUnique", CONST.MSG.NAME_EXISTS, async (value) => {
                if (validName !== value) {
                    const resp = await usersService.isExists({ name: value });
                    validName = value;
                    isNameValid = resp.data ? false : true;
                }
                return isNameValid;
            }),
        religion: Yup.string().required(CONST.MSG.RELIGION_REQ),
        // language: Yup.string().required(CONST.MSG.LANG_REQ),
    },
    ["religion"]
);

const Banner = () => {
    const router = useRouter();
    const commonData = useSelector((state) => state.common?.commonData);
    const [religion, setReligion] = useState([]);
    const [language, setLanguage] = useState([]);
    const [filter] = useState({
        ...CONST.SORT_FILTER,
    });
    const [religionFilter] = useState({
        ...CONST.RELIGION_FILTER,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const loadReligion = async (religionFilter) => {
        const resp = await masterService.getAll(RELIGION_FILTER, religionFilter);
        if (resp && resp?.meta?.code === 200) {
            setReligion(resp?.data);
        }
    };

    const loadLanguage = async () => {
        const resp = await masterService.getAll(LANGUAGE_FILTER);
        if (resp && resp?.meta?.code === 200) {
            setLanguage(resp?.data);
        }
    };

    const onSubmit = async (values) => {
        Object.keys(values).forEach((f) => values[f] === "" && delete values[f]);
        const filterString = new URLSearchParams(values).toString();

        router.push(CONST.REGISTER_PATH + "?" + filterString);
    };

    useEffect(() => {
        loadReligion(religionFilter);
        loadLanguage();
    }, []);
    return (
        <>
            <Head>
                {/* Primary SEO */}
                <title>Christian Matrimony | TrueFriend Matrimony</title>
                <meta
                    name="description"
                    content="Join TrueFriend Matrimony, the #1 Christian Matrimony site and platform in India. Connect with genuine Christian singles, find your perfect life partner, and experience safe matchmaking. Register free today."
                />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Matrimonial Site, Christian Marriage, Christian Singles, Marriage Matchmaking, TrueFriend Matrimony,  Matrimonial Site India, Verified Christian Singles , Christian Matrimony Platform, Christian Matchmaking, Safe Matrimony Site, Bride and Groom Match, Trusted Matrimonial Service"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Christian Matrimony | TrueFriend Matrimony" />
                <meta
                    property="og:description"
                    content="Join TrueFriend Matrimony, the trusted Christian Matrimony platform. Find your perfect life partner and connect with genuine Christian singles."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com" />

            </Head>

            <section>
                <div className="str">
                    <div className="hom-head">
                        <div class="container">
                            <div class="row">
                                <div className="">
                                    <div className="ban-tit">
                                        <span>
                                            <i className="no1">#1</i> Matrimony
                                        </span>
                                        <h1>
                                            Find your
                                            <br />
                                            <b>Right Match</b> here
                                        </h1>
                                        <p>
                                            An Authentic Christian Matrimony Site that Unites Two
                                            Beautiful Hearts
                                        </p>
                                    </div>
                                    <div className="ban-search chosenini">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <ul className="srch">
                                                <li className="sr-look">
                                                    <div className="form-group">
                                                        <label>
                                                            I'm looking for <Required />
                                                        </label>

                                                        <select
                                                            {...register("profileFor")}
                                                            className="chosen-select"
                                                        >
                                                            <option value="">Select</option>
                                                            {commonData.profileFor &&
                                                                commonData.profileFor.map(
                                                                    (ele, ind) => (
                                                                        <option
                                                                            key={ind}
                                                                            value={ele.code}
                                                                        >
                                                                            {ele.label}
                                                                        </option>
                                                                    )
                                                                )}
                                                        </select>
                                                        {errors.profileFor && (
                                                            <p> {errors.profileFor?.message}</p>
                                                        )}
                                                    </div>
                                                </li>
                                                <li className="sr-reli">
                                                    <div className="form-group">
                                                        <label>
                                                            Religion <Required />
                                                        </label>

                                                        <select
                                                            {...register("religion")}
                                                            className="chosen-select"
                                                        >
                                                            <option value="">Select</option>
                                                            {religion &&
                                                                religion.map((ele, idx) => (
                                                                    <option
                                                                        key={idx}
                                                                        value={ele._id}
                                                                    >
                                                                        {ele.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                        {errors.religion && (
                                                            <p>{errors.religion?.message}</p>
                                                        )}
                                                    </div>
                                                </li>
                                                <li className="sr-city">
                                                    <div className="form-group">
                                                        <label>
                                                            Name <Required />
                                                        </label>
                                                        <input
                                                            style={{ height: "50px" }}
                                                            class="form-control nm"
                                                            {...register("name")}
                                                            type="text"
                                                            placeholder="Name"
                                                        />
                                                        {errors.name && (
                                                            <p> {errors.name?.message}</p>
                                                        )}
                                                    </div>
                                                </li>

                                                <li className="sr-btn">
                                                    {/* <button type="submit" className="">
                                                        Register free
                                                    </button> */}
                                                    <input type="submit" value="Register Free" />
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="hom-ban-sli">
                    <Carousel interval={3000} indicators={false} controls={false}>
                        {bannerList.map((banner) => (
                            <Carousel.Item key={banner.id}>
                                <div className="d-lg-block d-md-block d-none">
                                    <Image
                                        src={banner.src}
                                        alt={`Banner ${banner.id}`}
                                        loading="lazy"
                                        layout="responsive"
                                        width={1920}
                                        height={1080}
                                        className="d-block w-100 h-auto sm:h-[600px] xs:h-[750px]"
                                    />
                                </div>
                                <div className="d-lg-nonenone d-md-none d-block">
                                    <Image
                                        src={banner.src}
                                        alt={`Banner ${banner.id}`}
                                        loading="lazy"
                                        layout="responsive"
                                        width='100%'
                                        height={100}
                                        className="d-block w-100 h-auto sm:h-[600px] xs:h-[750px]"
                                    />
                                </div>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </section>
        </>
    );
};

export default Banner;
