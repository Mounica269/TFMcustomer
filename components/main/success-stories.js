import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { profileService } from "core/services";
import SuccessStoryVerticleView from "components/common/success-story-verticle-view";
import { CONST } from "core/helper";
import Head from "next/head";

const slider = {
    slidesToShow: 4,
    slidesToScroll: 2,
    adaptiveHeight: true,
    // dots: true,
    arrows: true,
    autoplay: true,
    // autoplaySpeed: 2000,
    // speed: 2000,
    responsive: [
        {
            //xl
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            //md
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            //sm
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
    customPaging: (i) => (
        <div
            style={{
                width: "30px",
                borderRadius: "20px",
            }}
        >
            <FontAwesomeIcon icon={faHeart} />
        </div>
    ),
};

const SuccessStories = () => {
    const [successStories, setSuccessStories] = useState([]);
    const [filter, setFilter] = useState({ ...CONST.DEFAULT_FILTER });

    const successStoriesLists = async () => {
        const resp = await profileService.successStories(filter);
        if (resp && resp.meta.code === 200) {
            setSuccessStories(resp.data);
        }
    };

    const [isComponentMounted, setIsComponentMounted] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            successStoriesLists();
        };

        if (isComponentMounted) {
            handleChange();
        }
    }, [isComponentMounted]);

    useEffect(() => {
        setIsComponentMounted(true);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Christian Matrimony Success Stories | TrueFriend Matrimony</title>
                <meta
                    name="description"
                    content="Discover inspiring Christian Matrimony success stories of couples who found love through TrueFriend Matrimony. Trusted Christian marriage platform helping singles find meaningful relationships."
                />
                <meta
                    name="keywords"
                    content="Christian matrimony, Christian marriage success stories, Christian wedding matches, Christian couple love stories, Christian matrimonial site India, best Christian matrimony, True Friend Matrimony, Christian Marriage Stories, Real Christian Wedding Matches, Christian Love Stories, Christian Matrimonial Site India, Tamil Christian Matrimony Success, Kerala Christian Matrimony Stories, Christian Matrimony, Best Christian Matrimony Platform"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/success-stories" />

                {/* Open Graph  */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Christian Matrimony Success Stories | TrueFriend Matrimony" />
                <meta
                    property="og:description"
                    content="Read real success stories of Christian couples who found love through True Friend Matrimony. Trusted Christian marriage platform for meaningful connections."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/success-stories" />

            </Head>

            {successStories.length > 0 ? (
                <section className="page-section-ptb2 pb-130 sm-pb-6 grey-bg story-slider">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} sm={12} className="text-center">
                                <h2 className="title divider-2">Success Stories</h2>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col md={12} sm={12}>
                                <Slider {...slider}>
                                    {successStories.map((ele, ind) => (
                                        <SuccessStoryVerticleView successStories={ele} key={ind} />
                                    ))}
                                </Slider>
                            </Col>
                        </Row>
                    </Container>
                </section>
            ) : null}
        </Fragment>
    );
};

export default SuccessStories;
