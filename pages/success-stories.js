import { Button, Col, Container, Fade, Form, Nav, Row, Tab } from "react-bootstrap";
import Head from "next/head";
import Pagination from "components/common/pagination";
import { Fragment, useEffect, useState } from "react";
import { commonService, profileService } from "core/services";
import { CONST, utils, reloadAction } from "core";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect, useSelector } from "react-redux";
import SuccessStroryCard from "components/common/success-story-card";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
    name: Yup.string().label("Name").required(),
    email: Yup.string().label("Email").required(),
    partnerName: Yup.string().label("Partner name").required(),
    partnerEmail: Yup.string().label("Partner email").required(),
    firstMeetDate: Yup.string().label("First meet").required(),
    weddingDate: Yup.string().label("Wedding date").required(),
    content: Yup.string().label("Content").required(),
    coupleorWeddingPhotos: Yup.array().of(
        Yup.object().shape({
            img: Yup.mixed().test("images", "Please upload the image", (file) => {
                return file;
            }),
        })
    ),
});
const SuccessStories = (props) => {
    const { reloadAction } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);
    const token = useSelector((state) => state?.account?.token);
    const router = useRouter();

    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });
    const [selectedPage, setSelectedPage] = useState(0);
    const [successStories, setSuccessStories] = useState([]);
    const [firstMeetDate, setFirstMeetDate] = useState();
    const [weddingDate, setWeedingDate] = useState();
    const [imageIds, setImageIds] = useState([]);
    const [apiLoad, setApiLoad] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            coupleorWeddingPhotos: [
                {
                    img: "",
                },
            ],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "coupleorWeddingPhotos",
    });

    const changePage = ({ selected }) => {
        if (selected >= 0) {
            setSelectedPage(selected);
        }
    };

    const handleChangeFirstMeetDate = (date) => {
        const formateDate = moment(date).format();
        setFirstMeetDate(date);
        setValue("firstMeetDate", formateDate, { shouldValidate: true });
    };

    const handleChangeWeddingDate = (date) => {
        const formateDate = moment(date).format();
        setWeedingDate(date);
        setValue("weddingDate", formateDate, { shouldValidate: true });
    };

    const onSubmit = async (values) => {
        const { content, email, partnerEmail, name, partnerName, weddingDate, firstMeetDate } =
            values;
        console.log("first", values);
        firstMeetDate = moment(firstMeetDate).format("YYYY-MM-DD");
        weddingDate = moment(weddingDate).format("YYYY-MM-DD");
        const payload = {
            content,
            email,
            partnerEmail,
            name,
            partnerName,
            firstMeetDate: firstMeetDate,
            weddingDate: weddingDate,
            coupleorWeddingPhotos: imageIds,
        };
        if (!token) {
            utils.showErrMsg("Please login to continue");
        } else {
            const resp = await profileService.createSuccessStory(payload);
            if (resp && resp.meta.code === 200) {
                utils.showSuccessMsg(resp.meta.message);
                successStoriesLists();
                reset();
                reloadAction();
            }
        }
    };

    const handleUploadImg = async (event, idx) => {
        if (!token) {
            utils.showErrMsg("Please login to continue");
            router.push(CONST.LOGIN_PATH);
        } else {
            const file = event.target.files[0];
            setValue(`coupleorWeddingPhotos.${idx}.img`, file);
            if (file) {
                const formData = new FormData();
                formData.append("type", 20);
                formData.append("images", file);
                const resp = await commonService.imageUpload(formData);
                const imageIdArr = [];
                if (resp && resp.meta.code === 200) {
                    const { data } = resp;
                    imageIdArr.push(data[0]?._id);
                }
                setImageIds([...imageIds, ...imageIdArr]);
            }
        }
    };

    const [isComponentMounted, setIsComponentMounted] = useState(false);

    useEffect(() => {
        if (isComponentMounted) {
            async function successStoriesLists() {
                if (apiLoad === true) return;
                setApiLoad(true);
                setSuccessStories([]);
                utils.scrollToTop();
                const resp = await profileService.successStories(filter);
                if (resp && resp.meta) setApiLoad(false);
                if (resp && resp.meta.code === 200) {
                    const { pagination, data } = resp;
                    const { totalCount } = pagination;
                    const totalPage = totalCount > 0 ? totalCount / filter.limit : 0;
                    setTotalPage(Math.ceil(totalPage));
                    setSuccessStories(data);
                } else if (resp && resp.meta.code === 1011) {
                    setSuccessStories(resp?.data);
                }
            }
            successStoriesLists();
        }
    }, [isComponentMounted, filter]);

    useEffect(() => {
        setIsComponentMounted(true);
    }, []);

    useEffect(() => {
        const skip = selectedPage >= 1 ? selectedPage * 10 : 0;
        setFilter({
            ...filter,
            skip,
        });
    }, [selectedPage]);

    useEffect(() => { }, [reload]);

    return (
        <>
     <Head>
  <title> Success Stories - True Friend Matrimony | Christian Matrimony</title>

  <meta
    name="description"
    content="Read inspiring Christian success stories of couples who found love and lifelong companionship through True Friend Matrimony, the trusted faith-based matchmaking platform in India"
  />

  <meta
    name="keywords"
    content="Christian Matrimony, True Friend Matrimony, Christian Success Stories, Christian Love Stories, Faith-Based Matchmaking, Christian Marriage, Christian Couples, Matrimony Success, Trusted Christian Matrimony Platform, Christian Partner Stories,Trusted Matrimony for Christians"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/success-stories" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Christian Matrimony Success Stories | True Friend Matrimony" />
  <meta property="og:description" content="Read inspiring Christian success stories of couples who found love and lifelong companionship through True Friend Matrimony, the trusted faith-based matchmaking platform." />
  <meta property="og:url" content="https://truefriendmatrimony.com/success-stories" />
  <meta property="og:site_name" content="True Friend Matrimony" />


</Head>


            <Row className="justify-content-center">
                <Col lg={12} md={12} className="mb-3 mt-5 pt-5" style={{ maxWidth: "1200px" }}>
                    <Row className="d-flex justify-content-center my-3">
                        <Col md={12}>
                            <div className="db-pro-stat p-3">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            data-bs-toggle="tab"
                                            href="#home"
                                        >
                                            Success Stories
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#menu1">
                                            Add Success Story
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div id="home" className="container tab-pane active pt-5">
                                        <Row>
                                            {apiLoad && <h3>Loading</h3>}
                                            {!apiLoad &&
                                                (successStories === null ||
                                                    successStories.length === 0) ? (
                                                <p>
                                                    If you like to add your success stories? please
                                                    click Add Success Story
                                                </p>
                                            ) : (
                                                (successStories !== null ||
                                                    successStories.length === 0) &&
                                                successStories.map((ele, ind) => (
                                                    <Col
                                                        xl={4}
                                                        lg={4}
                                                        md={6}
                                                        key={ind}
                                                        className="mb-3"
                                                    >
                                                        <SuccessStroryCard profile={ele} />
                                                    </Col>
                                                ))
                                            )}
                                        </Row>
                                    </div>
                                    <div id="menu1" className="container tab-pane fade  pt-5">
                                        <Fragment>
                                            {!token ? (
                                                <div className="d-flex py-5 justify-content-center align-items-center">
                                                    <h4 className="text-center success">
                                                        Please <Link href={CONST.LOGIN_PATH}>
                                                            <a className="mt-1 mx-1 fs-5" href="#">
                                                                Login
                                                            </a>
                                                        </Link> to continue
                                                    </h4>

                                                </div>
                                            ) : (
                                                <h4>Give us details of you & your partner</h4>
                                            )}
                                            {token && (
                                                <Container>
                                                    <Row className="d-flex justify-content-center">
                                                        <Col md={12}>
                                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                                <Row className="my-3">
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Your Name
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Your Name"
                                                                            {...register("name")}
                                                                        />
                                                                        <p className="text-danger">
                                                                            {errors.name?.message}
                                                                        </p>
                                                                    </Col>
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Your Partner Name
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Your Partner Name"
                                                                            {...register(
                                                                                "partnerName"
                                                                            )}
                                                                        />
                                                                        <p className="text-danger">
                                                                            {
                                                                                errors.partnerName
                                                                                    ?.message
                                                                            }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md={2}></Col>
                                                                </Row>
                                                                <Row className="my-3">
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Your Email Id
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <Form.Control
                                                                            type="email"
                                                                            placeholder="Your Email Id"
                                                                            {...register("email")}
                                                                        />
                                                                        <p className="text-danger">
                                                                            {errors.email?.message}
                                                                        </p>
                                                                    </Col>
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Your Partner Email Id
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <Form.Control
                                                                            type="email"
                                                                            placeholder="Your Partner Email Id"
                                                                            {...register(
                                                                                "partnerEmail"
                                                                            )}
                                                                        />
                                                                        <p className="text-danger">
                                                                            {
                                                                                errors.partnerEmail
                                                                                    ?.message
                                                                            }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md={2}></Col>
                                                                </Row>
                                                                <Row className="my-3">
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Select your first meet
                                                                            date
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <DatePicker
                                                                            selected={firstMeetDate}
                                                                            onChange={(date) =>
                                                                                handleChangeFirstMeetDate(
                                                                                    date
                                                                                )
                                                                            }
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            // maxDate={sub(new Date(), { years: 18 })}
                                                                            // minDate={sub(new Date(), { years: 100 })}
                                                                            // withPortal
                                                                            placeholderText="Select your first meet date"
                                                                            className="form-control w-100"
                                                                        />
                                                                        <p className="text-danger">
                                                                            {
                                                                                errors.firstMeetDate
                                                                                    ?.message
                                                                            }
                                                                        </p>
                                                                    </Col>
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Select your wedding date
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <DatePicker
                                                                            selected={weddingDate}
                                                                            onChange={(date) =>
                                                                                handleChangeWeddingDate(
                                                                                    date
                                                                                )
                                                                            }
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            placeholderText="Select your wedding date"
                                                                            className="form-control w-100"
                                                                        />
                                                                        <p className="text-danger">
                                                                            {
                                                                                errors.weddingDate
                                                                                    ?.message
                                                                            }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md={2}></Col>
                                                                </Row>
                                                                <Row className="my-3">
                                                                    <Col
                                                                        md={2}
                                                                        className="form-group"
                                                                    >
                                                                        <label className="lb">
                                                                            Tell us how you met each
                                                                            other on
                                                                            true-friends.com
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <Form.Control
                                                                            as={"textarea"}
                                                                            {...register("content")}
                                                                            placeholder="Tell us how you met each other on true-friends.com"
                                                                        // minLength={100}
                                                                        />
                                                                        <p className="text-danger">
                                                                            {
                                                                                errors.content
                                                                                    ?.message
                                                                            }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md={2}></Col>
                                                                </Row>
                                                                <Row className="my-3">
                                                                    {/* <Col md={2}></Col> */}
                                                                    <Col md={5}>
                                                                        <label className="lb">
                                                                            Your Couple or Wedding
                                                                            Photos
                                                                        </label>
                                                                    </Col>
                                                                    <Col md={5}>
                                                                        {fields.map((ele, ind) => {
                                                                            return (
                                                                                <Fragment>
                                                                                    <div className="image_upload_success_stroy ">
                                                                                        <Form.Control
                                                                                            {...register(
                                                                                                `coupleorWeddingPhotos.${ind}.img`
                                                                                            )}
                                                                                            type="file"
                                                                                            className="form-control"
                                                                                            onChange={(
                                                                                                e,
                                                                                                idx
                                                                                            ) =>
                                                                                                handleUploadImg(
                                                                                                    e,
                                                                                                    idx
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <p className="text-danger">
                                                                                        {
                                                                                            errors
                                                                                                .coupleorWeddingPhotos?.[
                                                                                                ind
                                                                                            ]?.img
                                                                                                ?.message
                                                                                        }
                                                                                    </p>
                                                                                </Fragment>
                                                                            );
                                                                        })}
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <div className="image_upload_success_stroy_btn d-flex">
                                                                            <button
                                                                                onClick={() =>
                                                                                    append()
                                                                                }
                                                                                className="btn btn-rounded btn-success"
                                                                                type="button"
                                                                            >
                                                                                <i className="fa fa-plus color-info"></i>
                                                                            </button>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={5}></Col>
                                                                    <Col md={2}>
                                                                        <button
                                                                            type="submit"
                                                                            className=" cta-dark"
                                                                        // className="btn btn-primary"
                                                                        >
                                                                            Submit
                                                                        </button>
                                                                    </Col>
                                                                    <Col md={5}></Col>
                                                                </Row>
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            )}
                                        </Fragment>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const mapDispathcToProps = {
    reloadAction,
};

export default connect(null, mapDispathcToProps)(SuccessStories);
// const ConnectedSuccessStories = connect(
//   null,
//   mapDispathcToProps
// )(SuccessStories);

// export default dynamic(() => Promise.resolve(ConnectedSuccessStories), {
//   ssr: false,
// });
