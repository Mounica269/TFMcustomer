import { Col, Container, Row } from "react-bootstrap";
import { commonService } from "core/services";
import { Fragment, useEffect, useState } from "react";
import BlogFallback from "components/common/blog-fallback";
import Link from "next/link";
import { CONST } from "core/helper";
import moment from "moment";
import Head from "next/head";


const RecentBlog = () => {
    const [filter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async (filter) => {
        const resp = await commonService.blogList(filter);
        if (resp && resp.meta.code === 200) {
            setBlogs(resp.data);
        }
    };

    useEffect(() => {
        getBlogs(filter);
    }, [filter]);

    return (
        <Fragment>
           <Head>
    <title>Christian Matrimony Blogs | TrueFriend Matrimony</title>
    <meta
        name="description"
        content="Stay updated with the latest insights, tips, and articles on Christian Matrimony, wedding planning, matchmaking advice, and success stories at TrueFriend Matrimony - the trusted Christian Matrimony platform."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Blogs, Wedding Tips, Christian Marriage Advice, Matrimony Articles, Christian Bride and Groom, TrueFriend Matrimony,Christian Matrimony Tips, Wedding Planning Advice, Christian Marriage Insights, Matchmaking Success Stories, Christian Bride and Groom Tips, Tamil Christian Matrimony Blog, Kerala Christian Matrimony Blog, TrueFriend Matrimony Blog, Best Christian Matrimony Articles,Christian Matrimony"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/blogs" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="TrueFriend Matrimony" />
    <meta property="og:title" content="Christian Matrimony Blogs | TrueFriend Matrimony" />
    <meta
        property="og:description"
        content="Read our latest blogs on Christian Matrimony, wedding tips, matchmaking insights, and more at TrueFriend Matrimony."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/blogs" />

</Head>

            {blogs.length > 0 ? (
                <section className={"page-section-ptb2 grey-bg"}>
                    <Container>
                        <Row className="justify-content-center mb-5 sm-mb-3">
                            <Col md={8} sm={12} className="text-center">
                                <h2 className="title divider-2 mb-3">Our Recent Blogs</h2>
                                <p className="lead mb-0">
                                    Nulla quis lorem ut libero malesuada feugiat. Curabitur non
                                    nulla sit amet nisl tempus convallis quis ac lectus. Quisque
                                    velit nisi, pretium ut lacinia in, elementum id enim.
                                </p>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            {blogs.length > 2 && (
                                <Link href={CONST.BLOGS_PATH}>
                                    <a href="#" className="fs-4 mb-2">
                                        See All
                                    </a>
                                </Link>
                            )}
                        </div>
                        <Row className="post-article">
                            {blogs.slice(0, 3).map((ele, ind) => {
                                const { description, title, blog, updatedAt } = ele;
                                const { imagePath, images } = blog;
                                const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;
                                const imagesrc = imageDomain + imagePath + images?.medium;
                                return (
                                    <Col md={4} key={ind}>
                                        <div className="post post-artical top-pos shadow">
                                            <div className="post-image clearfix">
                                                <BlogFallback
                                                    className="img-fluid w-100"
                                                    src={imagesrc}
                                                    alt="blog_1"
                                                    key={ind}
                                                />
                                            </div>
                                            <div className="post-details p-2">
                                                <div className="post-date">
                                                    <span className="text-black">
                                                        {moment(updatedAt).format("MMMM Do")}
                                                    </span>
                                                </div>
                                                {/* <div className="post-meta">
                                            <a href="#"><i className="fa fa-user"></i> Admin</a>
                                            <a href="#"><i aria-hidden="true" className="fa fa-heart-o"></i>98 Like</a>
                                            <a href="#"><i className="fa fa-comments-o last-child"></i>Comments</a>
                                        </div> */}
                                                <div className="post-title">
                                                    <h5 className="title text-uppercase">
                                                        <Link
                                                            href={`${CONST.BLOGS_PATH + "/" + ele.uri
                                                                }`}
                                                        >
                                                            <a href="">{title}</a>
                                                        </Link>{" "}
                                                    </h5>
                                                </div>
                                                <div className="post-content d-flex">
                                                    <p
                                                        className="text-capitalize"
                                                        dangerouslySetInnerHTML={{
                                                            __html: description.slice(0, 20),
                                                        }}
                                                    ></p>
                                                    <Link
                                                        href={`${CONST.BLOGS_PATH + "/" + ele.uri}`}
                                                    >
                                                        Read more..
                                                    </Link>{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </section>
            ) : null}
        </Fragment>
    );
};

export default RecentBlog;
