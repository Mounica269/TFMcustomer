import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import Head from "next/head";

import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { CONST } from "core";

// ADD THIS createSlug FUNCTION HERE
const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .trim() // Trim leading/trailing spaces
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
};
const Blogs = () => {
    const adminAPI = process.env.NEXT_ADMIN_API;
    const [blog, setBlog] = useState([]);
    const [cat, setCat] = useState([]);
    const [recentBlog, setRecentBlog] = useState([]);

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://webadminback.truefriendmatrimony.com/api/category"
                ); // Replace with your API endpoint
                const result = await res.json();
                console.log("first", result);
                setCat(result.response); // Ensure 'result' is an array of items
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
                const result = await res.json();
                console.log("Fetched blogs:", result);

                // Check if result.response is valid and sort by created_at in descending order
                if (result.response && Array.isArray(result.response)) {
                    const sortedBlogs = result.response
                        // .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 5);
                    setRecentBlog(sortedBlogs); // Set the sorted blogs to state
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
      <Head>
    <title>Blogs & Articles | True Friend Matrimony</title>
   <meta
        name="description"
        content="Read expert blogs, success stories, and articles about Christian matrimony, love, marriage, and matchmaking. True Friend Matrimony helps Christian singles find their perfect match."
    />
    <meta
        name="keywords"
        content="Christian Matrimony , Christian Matrimony Blogs, Matrimony Articles, Christian Marriage, Matrimony Success Stories, True Friend Matrimony, Matrimony Kerala, Matrimony Tamil Nadu, Matrimony India, Matchmaking, Christian Brides, Christian Grooms, Matchmaking, Christian Brides, Christian Grooms, Matrimony Kerala, Matrimony Tamil Nadu, Matrimony India"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/blogs" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Blogs & Articles | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Explore expert blogs, inspiring articles, and success stories about Christian matrimony, love, and marriage. True Friend Matrimony helps you find your perfect match."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/blogs" />

</Head>

            <style>{`
       .inn-ban::after {
    content: "";
    position: absolute;
    background: url(/frontend/images/login-bg.png);
    width: 100%;
    height: 53px;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 260px;
    animation: 10000s linear 0s infinite normal both running movehor;
    opacity: 0.8;
}
    .blog-rhs-cate ul li a {
    background: url(/frontend/images/ban-bg.jpg);
    display: block;
    padding: 15px 50px 15px 25px;
    border-radius: 5px;
    position: relative;
    color: #fff;
    font-size: 18px;
    z-index: 0;
    background-position: -41px -464px;
    text-align: left;
}
      `}</style>
            <Row>
                <section>
                    <div className="inn-ban">
                        <div className="container">
                            <div className="row">
                                <h1>Blog & Articles</h1>
                                <p>They found True Love in True Friend Matrimony.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="blog-main">
                        <div className="container">
                            <div className="row">
                                <div className="inn">
                                    <div className="lhs">
                                        <div className="blog-com-tit">
                                            <h2>Latest &amp; Popular</h2>
                                        </div>
                                        <div className="row">


                                            {/* Blog Post Example */}
                                            {blog.map((item) => (
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                    <div className="blog-home-box">
                                                        <div className="im">
                                                            <Link
                                                                passHref
                                                                href={`${CONST.BLOGS_DETAIL + createSlug(item.title)}`}
                                                            >
                                                                <img
                                                                    style={{ objectPosition: "top" }}
                                                                    src={`https://webadminback.truefriendmatrimony.com/uploads/blog/original/${item.image_name}`}
                                                                    alt={item.title || "Blog post image"}
                                                                    loading="lazy"
                                                                />
                                                            </Link>
                                                            <span className="blog-date">
                                                                {formatDate(item.created_at)}
                                                            </span>
                                                            {/* <div className="shar-1">
                                                        <i
                                                            className="fa fa-share-alt"
                                                            aria-hidden="true"
                                                        ></i>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <i
                                                                        className="fa fa-facebook"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i
                                                                        className="fa fa-twitter"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i
                                                                        className="fa fa-whatsapp"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <i
                                                                        className="fa fa-link"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div> */}
                                                        </div>
                                                        <div className="txt">
                                                            {/* <span className="blog-cate">Wedding</span>
                                                    <span className="blog-cate">Events</span>
                                                    <span className="blog-cate">Decoration</span> */}
                                                            <Link
                                                                passHref
                                                                href={`${CONST.BLOGS_DETAIL + createSlug(item.title)}`}
                                                            >
                                                                <h2>{item.title}</h2>
                                                            </Link>
                                                            <p>
                                                                {stripHtmlTags(item.content).slice(0, 70)}
                                                                {stripHtmlTags(item.content).length > 70
                                                                    ? "..."
                                                                    : ""}
                                                            </p>
                                                            {/* <a href="#" className="fclick">Read More</a> */}
                                                            <Link
                                                                passHref
                                                                href={`${CONST.BLOGS_DETAIL + createSlug(item.title)}`}
                                                            >
                                                                <a href="#" className="cta-dark">
                                                                    <span>Read more</span>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/*                                       
                                        <div class="page-nation">
                                <ul class="pagination pagination-sm">
                                    <li class="page-item"><a class="page-link" href="#!">Previous</a></li>
                                    <li class="page-item active"><a class="page-link" href="#!">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#!">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#!">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#!">Next</a></li>
                                </ul>
                            </div> */}
                                    </div>

                                    <div className="rhs">
                                        <div className="blog-com-rhs">
                                            {/* <div class="blog-soci pt-3">
                                    <h4>Social media</h4>
                                    <ul>
                                        <li><a target="_blank" href="#!" class="sm-fb-big"><b>3k</b> Facebook</a></li>
                                        <li><a target="_blank" href="#!" class="sm-tw-big"><b>10K</b> Twitter</a></li>
                                        <li><a target="_blank" href="#!" class="sm-li-big"><b>1k</b> Linkedin</a></li>
                                        <li><a target="_blank" href="#!" class="sm-yt-big"><b>100K</b> Youtube</a></li>
                                    </ul>
                                </div>
                             */}

                                            <div className="blog-rhs-cate">
                                                <h4>Category</h4>
                                                <ul>
                                                    {cat.map((item) => (
                                                        <li>
                                                            <Link
                                                                passHref
                                                                href={`${CONST.CAT_ID + item.id}`}
                                                            >
                                                                <a>
                                                                    <span>1</span>
                                                                    <b>{item.title}</b>
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    {/* <li><a href="#!"><span>2</span><b>Lifestyle</b></a></li>
                                        <li><a href="#!"><span>3</span><b>Catering services</b></a></li>
                                        <li><a href="#!"><span>4</span><b>Wedding Decorations</b></a></li>
                                        <li><a href="#!"><span>5</span><b>Wedding Halls</b></a></li>
                                        <li><a href="#!"><span>6</span><b>The Ceremony</b></a></li>
                                        <li><a href="#!"><span>7</span><b>Photography </b></a></li> */}
                                                </ul>
                                            </div>

                                            <div className="hot-page2-hom-pre blog-rhs-trends">
                                                <h4>Latest Posts</h4>
                                                <ul>
                                                    {recentBlog.map((item) => (
                                                        <Link
                                                            passHref
                                                            href={`${CONST.BLOGS_DETAIL + createSlug(item.title)}`}
                                                        >
                                                            <li>
                                                                <div className="hot-page2-hom-pre-1">
                                                                    <img
                                                                        style={{
                                                                            objectFit: "contain",
                                                                        }}
                                                                        src={`https://webadminback.truefriendmatrimony.com/uploads/blog/thumb/${item.image_name}`}
                                                                        alt={item.title || "Thumbnail image for blog post"}
                                                                        loading="lazy"
                                                                    />
                                                                </div>
                                                                <div className="hot-page2-hom-pre-2">
                                                                    <h5>{item.title}</h5>
                                                                </div>
                                                                <a className="fclick"></a>
                                                            </li>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* <div class="blog-subsc">
                                                <div class="ud-rhs-poin1">
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/6349/6349282.png"
                                                        alt=""
                                                        loading="lazy"
                                                    />
                                                    <h5>
                                                        Subscribe <b>Newsletter</b>
                                                    </h5>
                                                </div>
                                                <form
                                                    name="news_newsletter_subscribe_form"
                                                    id="news_newsletter_subscribe_form"
                                                >
                                                    <ul>
                                                        <li>
                                                            <input
                                                                type="text"
                                                                name="news_newsletter_subscribe_name"
                                                                placeholder="Enter Email Id*"
                                                                class="form-control"
                                                                required=" "
                                                            />
                                                        </li>
                                                        <li>
                                                            <input
                                                                type="submit"
                                                                id="news_newsletter_subscribe_submit"
                                                                name="news_newsletter_subscribe_submit"
                                                                class="form-control"
                                                            />
                                                        </li>
                                                    </ul>
                                                </form>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Row>
        </>
    );
};

export default Blogs;
// export default dynamic(() => Promise.resolve(Blogs), { ssr: false });