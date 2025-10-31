import Image from "next/image";
import Link from "next/link";
import { CONST } from "core/helper";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState, useRef } from "react";
import Head from "next/head";
import slugify from "slugify";

const Footer = () => {
    const token = useSelector((state) => state?.account?.token);
    const settings = useSelector((state) => state?.common?.siteSettings);
    const { social = null } = settings;
    const year = new Date().getFullYear();
    const [blog, setBlog] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
                const result = await res.json();
                console.log("first", result);
                setBlog(result.response); // Ensure 'result' is an array of items
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Head>
                {/* Primary SEO */}
                <title>TrueFriend Matrimony | Christian Matrimony in India</title>
                <meta name="description" content="TrueFriend Matrimony - An Authentic Christian Matrimony Site Connecting Christian Brides and Grooms Across India. Safe, Verified, and Trusted." />
                <meta name="keywords" content="Christian Matrimony, Christian Matrimony India, Trusted Christian Matrimony, Christian Matchmaking, Christian Brides and Grooms, Faith-Based Matrimony, Christian Life Partner, Church Wedding Support, Christian Matrimonial Services, Bible-Based Matrimony, Christian Matrimony Platform, Christian Soulmate Search" />
                <link rel="canonical" href="https://www.truefriendmatrimony.com" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="TrueFriend Matrimony | Christian Matrimony in India" />
                <meta property="og:description" content="TrueFriend Matrimony - An Authentic Christian Matrimony Site Connecting Christian Brides and Grooms Across India. Safe, Verified, and Trusted." />
                <meta property="og:image:alt" content="TrueFriend Matrimony - Christian Matrimony" />
                <meta property="og:url" content="https://www.truefriendmatrimony.com" />

            </Head>
            <Fragment>
                <section class="wed-hom-footer">
                    <div class="container">
                        <div class=" foot-supp">
                            <h2>
                                <span>Free support:</span>{" "}
                                <br className="d-xl-none d-lg-none d-md-none d-block" />
                                <a href="tel:+917550014747" className="foot" rel="nofollow">
                                    {" "}
                                    +91 75500 14747
                                </a>{" "}/
                                <br className="d-xl-none d-lg-none d-md-none d-block" />

                                <a className="foot" href="tel:+917550054747" rel="nofollow">
                                    {" "}
                                    +91 75500 54747
                                </a>{" "}
                                /
                                <br className="d-xl-none d-lg-none d-md-none d-block" />
                                <a href="tel:+917550064747" className="foot" rel="nofollow">
                                    {" "}
                                    +91 75500 64747
                                </a>{" "}

                                <br className="" /> <span>Email:</span>{" "}
                                <br className="d-xl-none d-lg-none d-md-none d-block" />
                                <a className="foot mail" href="mailto:matrimony@truefriend.co.in" rel="nofollow" style={{ textTransform: 'lowercase' }}>
                                    matrimony@truefriend.co.in
                                </a>
                            </h2>
                        </div>
                        <div class="row wed-foot-link wed-foot-link-1 justify-content-center">
                            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                <h4>Get In Touch</h4>
                                <p className="add">
                                    Address: Vikas Mantra Towers, 3rd Floor, 249, RK Mutt Road,
                                    Mandaveli, Chennai - 600 028 Tamilnadu.
                                </p>
                                <p>
                                    Phone: <a href="tel:+917550014747" rel="nofollow"> +91 75500 14747</a> /
                                    <a href="tel:+917550054747" rel="nofollow"> 75500 54747</a> <br />
                                    <a href="tel:+917550064747" rel="nofollow">/ 75500 64747</a>
                                </p>
                                <p>
                                    Email:{" "}
                                    <a href="mailto:matrimony@truefriend.co.in">
                                        matrimony@truefriend.co.in
                                    </a>
                                </p>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 help ">
                                <h4>HELP &amp; SUPPORT</h4>
                                <ul>
                                    {token && (
                                        <li>
                                            <Link href={CONST.MATRI_ACC_CONTACT_PATH} >
                                                <a>Search Profile</a>
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link href={CONST.SUCCESS_STORIES_PATH} >
                                            <a>Success Stories</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.CONTACT_US_PATH} >
                                            <a>Help</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.FAQs_PATH} >
                                            <a>FAQs</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.BLOGS_PATH} >
                                            <a>Our Blogs</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.ABOUT_US_PATH} >
                                            <a>About us</a>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href={CONST.TERMS_AND_USE_PATH}>
                                            <a>Terms and Use</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.PRIVACY_PATH} >
                                            <a>Privacy Policy</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.RETURN_AND_CANCELLATION_PATH} >
                                            <a>Return & Cancellation</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 help fot-soc ">
                                <h4>Plans</h4>
                                <ul>
                                    <li>
                                        <Link href={CONST.TFM_SUPREME} >TFM-EXECUTIVE</Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.TFM_PREMIUM} >TFM-CLASSIC</Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.TFM_PREMIUM} >TFM-PREMIUM</Link>
                                    </li>
                                    <li>
                                        <Link href={CONST.TFM_EXECUTIVE} >TFM-SUPREME</Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 fot-soc">
                                <h4>SOCIAL MEDIA</h4>
                                <ul>
                                    <li>
                                        <a href={social?.facebook} target="_blank">
                                            <img
                                                src="/frontend/images/social/3.png"
                                                alt="Social Media 3"
                                                width={24}
                                                height={24}
                                                loading="lazy"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={social?.instagram} target="_blank">
                                            <img
                                                src="/frontend/images/social/insta.webp"
                                                alt="Social Media 1"
                                                width={24}
                                                height={24}
                                                loading="lazy"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={social?.twitter} target="_blank">
                                            <img
                                                src="/frontend/images/social/2.png"
                                                alt="Social Media 2"
                                                width={24}
                                                height={24}
                                                loading="lazy"
                                            />
                                        </a>
                                    </li>

                                    <li>
                                        <a href={social?.youtube} target="_blank">
                                            <img
                                                src="/frontend/images/social/5.png"
                                                alt="Social Media 5"
                                                width={24}
                                                height={24}
                                                loading="lazy"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div>
                            <div className="row foot-count p-2 text-center">
                                {blog.map((item, index) => {
                                  const slug = slugify(item.title, { lower: true, strict: true });
                                  return (
                                    <div className="col-lg-4" key={index}>
                                        <p>
                                           <Link href={`${CONST.BLOGS_DETAIL}${slug}`}>
                                                {item.title}
                                            </Link>
                                        </p>
                                    </div>
                                     );
                                })}
                            </div>
                        </div>
                       



                        <div class="row foot-count">
                            <p>
                                True Friend Matrimony - An Authentic Christian Matrimony Site that
                                Unites Two Beautiful Hearts.
                                <Link href={CONST.REGISTER_PATH} >
                                    <a
                                        style={{ marginLeft: "10px" }}
                                        className=" btn btn-primary btn-sm"
                                    >
                                        Join us today!
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="cr">
                        <div class="container">
                            <div class="row">
                                <p>
                                    Copyright © <span>{year}</span>{" "}
                                    <Link href={CONST.BASE_PATH} >
                                        <a className="px-2">TruefriendMatrimony.com.</a>
                                    </Link>{" "}
                                    All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        </>
    );
};

export default Footer;
