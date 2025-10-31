import { Button, Col, Container, Row, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CONST, utils } from "../core/helper";
import { useRef, useState } from "react";
import { profileService } from "../core/services";
import Head from "next/head";

const validationSchema = Yup.object().shape({
    name: Yup.string().label("Name").required(),
    email: Yup.string().label("Email").required(),
    subject: Yup.string().label("Subject").required(),
    content: Yup.string().label("Content").required(),
    mobileNo: Yup.string().label("Mobile")
        .min(10, CONST.MSG.PHONE_INVALID)
        .max(10, CONST.MSG.PHONE_INVALID)
        .matches(CONST.PHONE_REGEX, CONST.MSG.PHONE_REGEX)
        .required(),
});


const ContactUs = () => {

    const [val, setVal] = useState('');

    const {
        register,
        handleSubmit,
        formState,
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const mobRef = useRef();

    const { errors, isSubmitting } = formState;

    const onSubmit = async (values) => {
        const resp = await profileService.contactus(values);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            reset();
        }
    };

    const handleChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setVal(e.target.value);
            setValue('mobileNo', e.target.value);
        }
    };
    return (
        <>
        <Head>
  <title>Contact Us | True Friend Matrimony - Christian Matrimony Services</title>

  <meta
    name="description"
    content="Contact True Friend Matrimony - A trusted Christian Matrimony platform helping believers find their life partner with faith and trust. Get support, inquiries, and personalized Christian matchmaking assistance."
  />
  <meta
    name="keywords"
    content="Christian matrimony, Christian marriage blogs, Christian wedding tips, Bible-based relationships, faith-based love, Christian matchmaking, Christian couple stories, church marriage, Christian love stories, True Friend Matrimony"
  />
  <link rel="canonical" href="https://www.truefriendmatrimony.com/contact-us" />


  <meta property="og:type" content="website" />
  <meta property="og:title" content="Contact Us | True Friend Matrimony - Christian Matrimony Services" />
  <meta
    property="og:description"
    content="Reach out to True Friend Matrimony, your trusted Christian matrimony service. Get guidance, marriage support, and faith-based matchmaking assistance."
  />
  <meta property="og:url" content="https://www.truefriendmatrimony.com/contact-us" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>


            <Row className="d-flex justify-content-center my-3">
                <Col md={12}>
                    <Tab.Container className="clearfix" defaultActiveKey={"contact-us"}>
                        {/* BANNER */}
                        <section>
                            <div className="str">
                                <div className="ban-inn ab-ban pg-cont">
                                    <div className="container">
                                        <div className="row">
                                            <div className="hom-ban mt-3">
                                                <div className="ban-tit mt-5">
                                                    <span>We are here to assist you.</span>
                                                    <h1>Contact us</h1>
                                                    <p>
                                                        Most Trusted and premium Matrimony Service
                                                        in the World.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* END BANNER */}

                        {/* START CONTACT INFO */}
                        <section>
                            <div className="ab-sec2 pg-cont">
                                <div className="container">
                                    <div className="row">
                                        <ul>
                                            <li>
                                                <div className="we-here">
                                                    <h3>Our office</h3>
                                                    <p>
                                                        Most Trusted and premium Matrimony Service
                                                        in the World.
                                                    </p>
                                                    <span>
                                                        <i
                                                            className="fa fa-phone"
                                                            aria-hidden="true"
                                                        ></i>
                                                        <a href="tel:+917550014747">
                                                            +91 75500 14747
                                                        </a>/
                                                        <a href="tel:+917550054747">
                                                            +91 75500 54747
                                                        </a>/
                                                        <a href="tel:+917550064747">
                                                            +91 75500 64747
                                                        </a>{" "}


                                                    </span>
                                                    <span>
                                                        <i
                                                            className="fa fa-envelope-o"
                                                            aria-hidden="true"
                                                        ></i>
                                                        <a href="mailto:matrimony@truefriend.co.in">
                                                            {" "}
                                                            matrimony@truefriend.co.in
                                                        </a>
                                                    </span>
                                                    <span>
                                                        <i
                                                            className="fa fa-map-marker"
                                                            aria-hidden="true"
                                                        ></i>
                                                        Vikas Mantra Towers, 3rd Floor, 249, RK Mutt
                                                        Road, Mandaveli, Chennai - 600 028
                                                        Tamilnadu.
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="we-cont">
                                                    <img
                                                        src="/frontend/images/icon/trust.png"
                                                        alt="Trust Icon"
                                                    />
                                                    <h4>Customer Relations</h4>
                                                    <p>
                                                        Most Trusted and premium Matrimony Service
                                                        in the World.
                                                    </p>
                                                    <div className="cta-full-wid">
                                                        <a href="tel:+917550014747" className="cta-dark">
                                                            Get Support
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="we-cont">
                                                    <img
                                                        src="/frontend/images/icon/telephone.png"
                                                        alt="Telephone Icon"
                                                    />
                                                    <h4>WhatsApp Support</h4>
                                                    <p>
                                                        Most Trusted and premium Matrimony Service
                                                        in the World.
                                                    </p>
                                                    <div className="cta-full-wid">
                                                        <a target="_blank" href="https://wa.me/+917550054747" className="cta-dark">
                                                            Talk to Us
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* END CONTACT INFO */}

                        {/* START CONTACT FORM */}
                        <section>
                            <div className="login pg-cont mb-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="inn">
                                            <div className="lhs">
                                                <div className="tit">
                                                    <h2>
                                                        Now <b>Contact to us</b> Easy and fast.
                                                    </h2>
                                                </div>
                                                <div className="im">
                                                    <img
                                                        src="/frontend/images/icon/login-couple.png"
                                                        alt="Illustration of a couple connecting, symbolizing easy and fast contact"
                                                    />
                                                </div>
                                                <div className="log-bg"> </div>
                                            </div>
                                            <div className="rhs p-5">
                                                <div>
                                                    <div className="form-tit">
                                                        <h4>Let's talk</h4>
                                                        <h1>Send your enquiry now </h1>
                                                    </div>
                                                    <div className="form-login">
                                                        <form
                                                            className="cform fvali"
                                                            onSubmit={handleSubmit(onSubmit)}
                                                        >
                                                            <div
                                                                className="alert alert-success cmessage"
                                                                style={{ display: "none" }}
                                                                role="alert"
                                                            >
                                                                Your message was sent successfully.
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="lb">Name:</label>
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    className="form-control"
                                                                    placeholder="Enter your full name"
                                                                    name="name"
                                                                    {...register("name")}

                                                                />
                                                                <p className="text-danger">
                                                                    {errors.name?.message}
                                                                </p>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="lb">Email:</label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    placeholder="Enter email"
                                                                    name="email"

                                                                    {...register("email")}
                                                                />
                                                                <p className="text-danger">
                                                                    {errors.email?.message}
                                                                </p>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="lb">Subject:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="subject"
                                                                    placeholder="Enter Subject"
                                                                    name="subject"

                                                                    {...register("subject")}
                                                                />
                                                                <p className="text-danger">
                                                                    {errors.subject?.message}
                                                                </p>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="lb">Phone:</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="phone"
                                                                    placeholder="Enter phone number"
                                                                    name="phone"

                                                                    value={val}
                                                                    onChange={handleChange}
                                                                    maxLength={10}
                                                                    ref={mobRef}

                                                                />
                                                                <p className="text-danger">
                                                                    {errors.mobileNo?.message}
                                                                </p>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="lb">Message:</label>
                                                                <textarea
                                                                    name="message"
                                                                    className="form-control"
                                                                    id="message"
                                                                    placeholder="Enter message"

                                                                    {...register("content")}
                                                                ></textarea>
                                                                <p className="text-danger">
                                                                    {errors.content?.message}
                                                                </p>
                                                            </div>

                                                            <div className="cta-full-wid">
                                                                {/* <a type="submit" disabled={isSubmitting} class="cta-dark">
                                                                    Send Enquiry
                                                                </a> */}


                                                                <button className="cta-dark"
                                                                    type="submit"
                                                                    disabled={isSubmitting}
                                                                >
                                                                    <a >
                                                                        Submit</a>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* END CONTACT FORM */}
                    </Tab.Container>
                </Col>
            </Row>
        </>
    );
};

export default ContactUs;
// export default dynamic(() => Promise.resolve(ContactUs), { ssr: false });
