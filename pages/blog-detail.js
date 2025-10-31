import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { commonService } from "../core/services";
import { Card, Col, Container, Row } from "react-bootstrap";
import BlogFallback from "../components/common/blog-fallback";
import Link from "next/link";
import { CONST } from "core/helper";
import parse from "html-react-parser";
import Head from "next/head";

// ADD THIS createSlug FUNCTION HERE
const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .trim() // Trim leading/trailing spaces
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
};
const DetailBlog = () => {
    const router = useRouter();
    const { blogId } = router.query;
    const [data, setData] = useState([]);
    const [dataNext, setDataNext] = useState([]);
    const [dataPre, setDataPre] = useState([]);
    const [previousId, setPreviousId] = useState(null);
    const [nextId, setNextId] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [recentBlog, setRecentBlog] = useState([]);
    const [cat, setCat] = useState([]);

    useEffect(() => {
        const fetchDataNP = async () => {
            console.log(blogId, 'blogId');

            if (!blogId) {
                return;
            }

            // const numericBlogId = Number(blogId);
            // if (isNaN(numericBlogId)) {
            //     return;
            // }

            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs");
                const result = await res.json();

                if (!result?.response || !Array.isArray(result.response)) {
                    return;
                }
                setBlogs(result.response);

                const currentIndex = result.response.findIndex((post) => createSlug(post.title) === blogId);

                if (currentIndex === -1) {
                    return;
                }

                setPreviousId(currentIndex > 0 ? result.response[currentIndex - 1].id : null);
                setNextId(
                    currentIndex < result.response.length - 1
                        ? result.response[currentIndex + 1].id
                        : null
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataNP();
    }, [blogId]);

    useEffect(() => {
        const fetchPreviousData = async () => {
            if (previousId) {
                try {
                    const respre = await fetch(
                        `https://webadminback.truefriendmatrimony.com/api/blog/${previousId}`
                    );
                    const resultpre = await respre.json();
                    setDataPre(resultpre.response ? resultpre.response : null);
                } catch (error) {
                    console.error("Error fetching previous blog data:", error);
                }
            }
        };

        fetchPreviousData();
    }, [previousId]);

    // Fetch next blog data based on nextId
    useEffect(() => {
        const fetchNextData = async () => {
            if (nextId) {
                try {
                    const resnext = await fetch(
                        `https://webadminback.truefriendmatrimony.com/api/blog/${nextId}`
                    );
                    const resultnext = await resnext.json();
                    setDataNext(resultnext.response ? resultnext.response : null);
                } catch (error) {
                    console.error("Error fetching next blog data:", error);
                }
            }
        };

        fetchNextData();
    }, [nextId]);
    useEffect(() => {
        const fetchData = async () => {
            if (blogId) {
                try {
                    const res = await fetch(
                        `https://webadminback.truefriendmatrimony.com/api/blogs`
                    );
                    const result = await res.json();
                    if (result.response && Array.isArray(result.response)) {
                        const blog = result.response.find(
                            (item) => createSlug(item.title) === blogId
                        );

                        setData(blog || null); // Set found blog or null
                    }

                    // setData(result.response ? result.response : null);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [blogId]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
                const result = await res.json();
                if (result.response && Array.isArray(result.response)) {
                    const sortedBlogs = result.response
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

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
 
  <title>TrueFriend Matrimony Blogs</title>
  <meta
    name="description"
    content="Discover trusted Christian matrimony insights, faith-based relationship advice, wedding inspiration, love stories, and marriage tips on the True Friend Matrimony blog."
  />
  <meta
    name="keywords"
    content="Christian matrimony, Christian matrimony blog, Christian matchmaking, Christian marriage tips, faith-based relationships, Christian dating advice, Christian wedding ideas, church wedding tips, matrimony success stories, Christian relationship guidance"
  />
  <link rel="canonical" href="https://www.truefriendmatrimony.com/blogs" />

  {/* ✅ Open Graph */}
  <meta property="og:title" content="Christian Matrimony Blog | Faith, Love & Wedding Tips" />
  <meta
    property="og:description"
    content="Explore Christian matrimony guidance, wedding inspiration, relationship tips, and real love stories from True Friend Matrimony."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.truefriendmatrimony.com/blogs" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>

            <section>
                <div className="inn-ban">
                    <div className="container">
                        <div className="row">
                            <h1>{data.title}</h1>
                            <ul className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link href="/blogs">
                                        <a href="#">Blog</a>
                                    </Link>
                                </li>

                                <li className="breadcrumb-item active text-center">{data.title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="blog-main blog-detail">
                    <div className="container">
                        <div className="row">
                            <div className="inn">
                                <div className="lhs">
                                    {data ? (
                                        <div className="blog-home-box">
                                            <div className="im">
                                                <img
                                                    // style={{ objectFit: "contain" }}
                                                    src={`https://webadminback.truefriendmatrimony.com/uploads/blog/original/${data.image_name}`}
                                                    alt={data.title}
                                                    loading="lazy"
                                                />

                                                {/* <img src="/frontend/images/couples/richard.webp" alt="" loading="lazy" /> */}
                                                <span className="blog-date">
                                                    {formatDate(data.created_at)}
                                                </span>
                                            </div>

                                            <div className="txt">
                                                <h2>{data.title}</h2>
                                                {/* {stripHtmlTags(data.content)} */}
                                                <span>{parse(data.content || "")}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                    <div className="blog-nav">
                                        {dataPre ? (
                                            <Link
                                                passHref
                                                href={`${CONST.BLOGS_DETAIL + dataPre.id}`}
                                            >
                                                <div className="com lhs">
                                                    <span>
                                                        <i
                                                            className="fa fa-long-arrow-left"
                                                            aria-hidden="true"
                                                        ></i>{" "}
                                                        Previous post{" "}
                                                    </span>
                                                    <h4>{dataPre.title}</h4>
                                                    <a href="#!" className="fclick"></a>
                                                </div>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}

                                        {dataNext ? (
                                            <Link
                                                passHref
                                                href={`${CONST.BLOGS_DETAIL + dataNext.id}`}
                                            >
                                                <div className="com rhs">
                                                    <span>
                                                        Next post
                                                        <i
                                                            className="fa fa-long-arrow-right"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </span>
                                                    <h4>{dataNext.title}</h4>
                                                    <a href="#!" className="fclick"></a>
                                                </div>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                <div className="rhs">
                                    <div className="blog-com-rhs">
                                        {/* <div class="blog-rhs-cate">
                                    <h4>Category</h4>
                                    <ul>
                                        <li><a href="#!"><span>1</span><b>Wedding Planning</b></a></li>
                                        <li><a href="#!"><span>2</span><b>Lifestyle</b></a></li>
                                        <li><a href="#!"><span>3</span><b>Catering services</b></a></li>
                                        <li><a href="#!"><span>4</span><b>Wedding Decorations</b></a></li>
                                        <li><a href="#!"><span>5</span><b>Wedding Halls</b></a></li>
                                        <li><a href="#!"><span>6</span><b>The Ceremony</b></a></li>
                                        <li><a href="#!"><span>7</span><b>Photography </b></a></li>
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
                                                        href={`${CONST.BLOGS_DETAIL + createSlug(item.title)}`}
                                                    >
                                                        <li>
                                                            <div className="hot-page2-hom-pre-1">
                                                                <img
                                                                    style={{ objectFit: "contain" }}
                                                                    src={`https://webadminback.truefriendmatrimony.com/uploads/blog/thumb/${item.image_name}`}
                                                                    alt={'Latest Post Image'}
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
                                        {/* <div class="blog-soci pt-3">
                                            <h4>Social media</h4>
                                            <ul>
                                                <li>
                                                    <a target="_blank" href="#!" class="sm-fb-big">
                                                        <b>3k</b> Facebook
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#!" class="sm-tw-big">
                                                        <b>10K</b> Twitter
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#!" class="sm-li-big">
                                                        <b>1k</b> Linkedin
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#!" class="sm-yt-big">
                                                        <b>100K</b> Youtube
                                                    </a>
                                                </li>
                                            </ul>
                                        </div> */}
                                        {/* <div class="blog-subsc">
                                    <div class="ud-rhs-poin1">
                                        <img src="https://cdn-icons-png.flaticon.com/512/6349/6349282.png" alt=""
                                            loading="lazy" />
                                        <h5>Subscribe <b>Newsletter</b></h5>
                                    </div>
                                    <form name="news_newsletter_subscribe_form" id="news_newsletter_subscribe_form">
                                        <ul>
                                            <li><input type="text" name="news_newsletter_subscribe_name"
                                                    placeholder="Enter Email Id*" class="form-control" required="" />
                                            </li>
                                            <li><input type="submit" id="news_newsletter_subscribe_submit"
                                                    name="news_newsletter_subscribe_submit" class="form-control" /></li>
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

            {/* <section>
        <div class="blog-rel slid-inn">
            <div class="container">
                <div class="row">
                    <div class="home-tit">
                        <p>Blog & Articles</p>
                        <h2><span>Related posts</span></h2>
                        <span class="leaf1"></span>
                    </div>
                    <div className="cus-revi">
            <Carousel interval={3000} indicators={false} controls={true}>
                {groupedBlogs.map((group, index) => (
                    <Carousel.Item key={index}>
                        <div className="slider3">
                            <div className="row">
                                {group.map(blog => (
                                    <div className="col-md-4" key={blog.id}>
                                        <div className="blog-home-box">
                                            <div className="im">
                                                <img src={blog.image} alt="" loading="lazy" />
                                            </div>
                                            <div className="txt">
                                                <span className="blog-cate">{blog.category}</span>
                                                <h2>{blog.title}</h2>
                                                <a href={blog.link} className="fclick"></a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>

                </div>
            </div>
        </div>
    </section> */}
        </>
    );
};

export default DetailBlog;
// export default dynamic(() => Promise.resolve(DetailBlog), { ssr: false });