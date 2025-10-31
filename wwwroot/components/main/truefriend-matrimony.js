import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";

const TrueFriendMatrimony = () => {
    const [reviews, setReviews] = useState([]);
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        margin: 20,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://webadminback.truefriendmatrimony.com/api/testimonials"
                );
                const result = await res.json();
                setReviews(result.response || []);
                setIsLoaded(true); // Set as loaded after fetching
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const stripHtmlTags = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || "";
    };

    return (
        <Fragment>
            <Head>
    <title> TrueFriend Matrimony</title>
   <meta
    name="description"
    content="Join TrueFriend Matrimony, the trusted Christian matrimony site. Discover success stories, meet genuine Christian singles, and find your perfect match today."
  />
   <meta
    name="keywords"
    content="Christian matrimony, Christian marriage, Christian matchmaking, Christian singles, true love stories, Christian couple success stories, TrueFriend Matrimony"
  />
    <link rel="canonical" href="https://www.truefriendmatrimony.com" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="TrueFriend Matrimony" />
    <meta property="og:title" content="Christian Matrimony Success Stories | TrueFriend Matrimony" />
    <meta
        property="og:description"
        content="Discover real Christian matrimony success stories. Join True Friend Matrimony and find your perfect match today."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com" />

</Head>

            <section>
                <div className="hom-cus-revi">
                    <div className="container">
                        <div className="row">
                            <div className="home-tit">
                                <p>trusted brand</p>
                                <h2>
                                    <span>
                                        Trusted by <b className="num">1500</b>+ Couples
                                    </span>
                                </h2>
                            </div>{" "}
                            <Slider {...sliderSettings}>
                                {reviews.map((item, ind) => {
                                    return (
                                        <li>
                                            <div className="cus-revi-box">
                                                <div className="revi-im">
                                                    <img width="100%"
                                                        className="text-left"
                                                        src={`https://webadminback.truefriendmatrimony.com/uploads/testimonial/original/${item.image_name}`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    <i className="cir-com cir-1"></i>
                                                    <i className="cir-com cir-2"></i>
                                                    <i className="cir-com cir-3"></i>
                                                </div>
                                                <p>{stripHtmlTags(item.content)}</p>
                                                <h5>{item.title}</h5>
                                                {/* <span>{item.location || "Location Unknown"}</span> */}
                                            </div>
                                        </li>
                                    );
                                })}
                            </Slider>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default TrueFriendMatrimony;
