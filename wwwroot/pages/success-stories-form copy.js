import { Fragment, useEffect, useState } from "react";

import { Container, Row, Col, Tab, Nav, Fade, Form, Modal, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { loginAction } from "core/redux/account/account.action";
import { commonService, profileService } from "core/services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import moment from "moment";
import { CONST, utils, reloadAction } from "core";
  import Head from "next/head";

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

const StoriesForm = (props) => {
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
            console.log('values',values)
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

    useEffect(() => {}, [reload]);
    return (
        <>
        <Head>
        <meta name="description" content="Share your love story and wedding journey by submitting details and photos of you and your partner. Join our community of happy couples celebrating their special moments." />
<meta name="keywords" content="success story, love story submission, wedding stories, couple photos, wedding date, first meet date, partner stories, romantic stories, wedding journey, share love story" />

        </Head>

            <div className="login pro-edit-update">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <div class="container">
                                <div class="row">
                                    <div class="inn">
                                        <div className="rhs">
                                            <div class="form-tit">
                                                <h4>Add Success Story</h4>
                                                <p>Give us details of you & your partner</p>
                                            </div>
                                            <div class="form-login">
                                                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <Row>
                                                        <Col md={2} className="form-group">
                                                            <label className="lb">Your Name</label>
                                                        </Col>
                                                        <Col md={3} className="form-group">
                                                            <input
                                                                type="text"
                                                                placeholder="Your Name"
                                                                className="form-control"
                                                                {...register("name")}
                                                            />
                                                            <p className="text-danger">
                                                                {errors?.name?.message}
                                                            </p>
                                                        </Col>
                                                        <Col md={2} className="form-group">
                                                            <label className="lb">
                                                                Your Partner Name
                                                            </label>
                                                        </Col>
                                                        <Col md={3} className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Your Partner Name"
                                                                {...register("partnerName")}
                                                            />
                                                            <p className="text-danger">
                                                                {errors?.partnerName?.message}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={2} className="form-group">
                                                            <label className="lb">
                                                                Your Email Id
                                                            </label>
                                                        </Col>
                                                        <Col md={3} className="form-group">
                                                            <input
                                                                type="text"
                                                                placeholder="Your Email Id"
                                                                className="form-control"
                                                                {...register("email")}
                                                            />
                                                            <p className="text-danger">
                                                                {errors?.email?.message}
                                                            </p>
                                                        </Col>
                                                        <Col md={2} className="form-group">
                                                            <label className="lb">
                                                                Your Partner Email Id
                                                            </label>
                                                        </Col>
                                                        <Col md={3} className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Your Partner Email Id"
                                                                {...register("partnerEmail")}
                                                            />
                                                            <p className="text-danger">
                                                                {errors?.partnerEmail?.message}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={2} className="form-group">
                                                            <label className="lb">
                                                                Select your first meet date
                                                            </label>
                                                        </Col>
                                                        <Col md={3} className="form-group">
                                                            <DatePicker
                                                                style={{ width: "100%" }}
                                                                 selected={firstMeetDate}
                                                                onChange={(date) =>
                                                                    handleChangeFirstMeetDate(date)
                                                                }
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                placeholderText="Select your first meet date"
                                                                className="form-control  w-150"
                                                            />
                                                            <p className="text-danger">
                                                                {errors.firstMeetDate?.message}
                                                            </p>
                                                        </Col>
                                                        <Col md={2} className="form-group">
                                                            <label className="lb">
                                                                Select your wedding date
                                                            </label>
                                                        </Col>
                                                        <Col md={3} className="form-group">
                                                            <DatePicker
                                                                style={{ width: "100%" }}
                                                                 selected={weddingDate}
                                                                onChange={(date) =>
                                                                    handleChangeWeddingDate(date)
                                                                }
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                placeholderText="Select your first meet date"
                                                                className="form-control  w-150"
                                                            />
                                                            <p className="text-danger">
                                                                {errors.weddingDate?.message}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        {/* <Col md={2}></Col> */}
                                                        <Col md={5}>
                                                            Your Couple or Wedding Photos
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
                                                                                ]?.img?.message
                                                                            }
                                                                        </p>
                                                                    </Fragment>
                                                                );
                                                            })}
                                                        </Col>
                                                        <Col md={2}>
                                                            <div className="image_upload_success_stroy_btn d-flex">
                                                                <button
                                                                    onClick={() => append()}
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
                                                            <Button
                                                                type="submit"
                                                                className="px-0"
                                                                // className="btn btn-primary"
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Col>
                                                        <Col md={5}></Col>
                                                    </Row>
                                                    </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
  
const mapDispathcToProps = {
    reloadAction,
  };
export default connect(null, mapDispathcToProps)(StoriesForm);
