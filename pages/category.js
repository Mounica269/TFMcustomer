import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Head from "next/head";

import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { CONST } from "core";

const CatBlogs = () => {
    const router = useRouter();
    const { catId } = router.query;
    const [blog, setBlog] = useState([]);
    const [cat, setCat] = useState([]);
    const [recentBlog, setRecentBlog] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://webadminback.truefriendmatrimony.com/api/catblog/${catId}`
                ); 
                const result = await res.json();
                setBlog(result.response); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [catId]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://webadminback.truefriendmatrimony.com/api/category"
                ); 
                const result = await res.json();
                setCat(result.response); 
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
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); 
                const result = await res.json();
                if (result.response && Array.isArray(result.response)) {
                    const sortedBlogs = result.response
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 5);
                    setRecentBlog(sortedBlogs); 
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


<Head>

  <title>Category | True Friend Matrimony</title>
  <meta
    name="description"
    content="Discover inspiring Christian matrimony blogs on love, marriage, and faith at True Friend Matrimony. Read Bible-based relationship tips, Christian wedding guidance, and faith-filled love stories."
  />
  <meta
    name="keywords"
    content="Christian matrimony, Christian marriage blogs, Christian wedding tips, Bible-based relationships, faith-based love, Christian matchmaking, Christian couple stories, church marriage, Christian love stories, True Friend Matrimony"
  />
  <link rel="canonical" href="https://www.truefriendmatrimony.com" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Christian Matrimony Blogs | True Friend Matrimony" />
  <meta
    property="og:description"
    content="Explore Christian matrimony blogs filled with love, marriage, and faith stories. Get relationship advice, wedding tips, and inspiring Bible-based guidance."
  />
  <meta property="og:url" content="https://www.truefriendmatrimony.com" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>

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

                                        {/* Blog Post Example */}
                                        {blog.map((item) => (
                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <Link
                                                        passHref
                                                        href={`${CONST.BLOGS_DETAIL + item.id}`}
                                                    >
                                                        <img
                                                            style={{ objectPosition: "top" }}
                                                            src={`https://webadminback.truefriendmatrimony.com/uploads/blog/original/${item.image_name}`}
                                                            alt={item.title} 
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
                                                        href={`${CONST.BLOGS_DETAIL + item.id}`}
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
                                                        href={`${CONST.BLOGS_DETAIL + item.id}`}
                                                    >
                                                        <a href="#" className="cta-dark">
                                                            <span>Read more</span>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}

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
                                                    <li>
                                                        <a
                                                            target="_blank"
                                                            href="#!"
                                                            class="sm-fb-big"
                                                        >
                                                            <b>3k</b> Facebook
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            target="_blank"
                                                            href="#!"
                                                            class="sm-tw-big"
                                                        >
                                                            <b>10K</b> Twitter
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            target="_blank"
                                                            href="#!"
                                                            class="sm-li-big"
                                                        >
                                                            <b>1k</b> Linkedin
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            target="_blank"
                                                            href="#!"
                                                            class="sm-yt-big"
                                                        >
                                                            <b>100K</b> Youtube
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div> */}

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
                                                    
                                                </ul>
                                            </div>

                                            <div className="hot-page2-hom-pre blog-rhs-trends">
                                                <h4>Latest Posts</h4>
                                                <ul>
                                                    {recentBlog.map((item) => (
                                                        <Link
                                                            passHref
                                                            href={`${CONST.BLOGS_DETAIL + item.id}`}
                                                        >
                                                            <li>
                                                                <div className="hot-page2-hom-pre-1">
                                                                    <img
                                                                        style={{
                                                                            objectFit: "contain",
                                                                        }}
                                                                        src={`https://webadminback.truefriendmatrimony.com/uploads/blog/thumb/${item.image_name}`}
                                                                        alt={item.title} 
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

export default CatBlogs;
// export default dynamic(() => Promise.resolve(Blogs), { ssr: false });
