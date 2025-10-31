import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { commonService } from "../../core/services";
import { Card, Col, Container, Row } from "react-bootstrap";
import BlogFallback from "../../components/common/blog-fallback";
import Link from "next/link";
import { CONST } from "core/helper";
import Head from "next/head";
import { Carousel } from "react-bootstrap";
import dynamic from 'next/dynamic';


const DetailBlog = () => {

    const blogs = [
        {
            id: 1,
            image: "/frontend/images/couples/1.jpg",
            category: "Wedding",
            title: "6 Things You Need To Prepare For Your Wedding Day",
            link: "#"
        },
        {
            id: 2,
            image: "/frontend/images/couples/4.jpg",
            category: "Wedding",
            title: "6 Things You Need To Prepare For Your Wedding Day",
            link: "#"
        },
        {
            id: 3,
            image: "/frontend/images/couples/2.jpg",
            category: "Wedding",
            title: "What your wedding checklist should include?",
            link: "#"
        },
        {
            id: 4,
            image: "/frontend/images/couples/11.jpg",
            category: "Bridal",
            title: "Wedding bridal hairstyle",
            link: "#"
        },
        {
            id: 5,
            image: "/frontend/images/couples/1.jpg",
            category: "Bridal",
            title: "Pre wedding photoshoot",
            link: "#"
        }
    ];

    // Group blogs into sets of 3 for each carousel item
    const groupedBlogs = [];
    for (let i = 0; i < blogs.length; i += 3) {
        groupedBlogs.push(blogs.slice(i, i + 3));
    }

    return (
        <>
  <Head>
    <title>Blogs | True Friend Matrimony</title>
    <meta
        name="description"
        content="Explore expert tips, inspiring stories, and guides on Christian matrimony, weddings, and relationships. True Friend Matrimony is your trusted Christian marriage partner."
    />
    <meta
        name="keywords"
        content="Christian Matrimony, Christian Marriage, Christian Wedding, Christian Matrimony Blogs, Matrimony Kerala, Matrimony Tamil Nadu, Matrimony Telangana, Matrimony India, True Friend Matrimony, Christian Brides, Christian Grooms, Christian Matchmaking"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/blogs" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Blogs | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Explore expert tips, inspiring stories, and guides on Christian matrimony, weddings, and relationships. True Friend Matrimony is your trusted Christian marriage partner."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/blogs" />

</Head>




            <Row className="my-5">
                <Col md={12}>
                    <section>
                        <div className="inn-ban">
                            <div className="container">
                                <div className="row">
                                    <h1>Prepare For Your Wedding Day</h1>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="blog.html">All Posts</a></li>
                                        <li className="breadcrumb-item"><a href="blog.html">Wedding</a></li>
                                        <li className="breadcrumb-item active">Prepare For Your Wedding Day</li>
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

                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <img src="/frontend/images/couples/richard.webp" alt="" loading="lazy" />
                                                    <span className="blog-date">16, March 2022</span>
                                                    <div className="shar-1">
                                                        <i className="fa fa-share-alt" aria-hidden="true"></i>
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                            <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                            <li><a href="#!"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                                            <li><span><i className="fa fa-link" aria-hidden="true" data-toggle="modal"
                                                                data-target="#sharepop"></i></span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="txt">
                                                    <span className="blog-cate">Wedding</span><span className="blog-cate">Events</span><span
                                                        className="blog-cate">Decoration</span>
                                                    <h2>The Ultimate Wedding Planning Checklist</h2>
                                                    <p>It is a long established fact that a reader will be distracted by the readable
                                                        content of a page when looking at its layout. The point of using Lorem Ipsum is
                                                        that it has a more-or-less normal distribution of letters, as opposed to using
                                                        'Content here, content here', making it look like readable English. Many desktop
                                                        publishing packages and web page editors now use Lorem Ipsum as their default
                                                        model text, and a search for 'lorem ipsum' will uncover many web sites still in
                                                        their infancy. Various versions have evolved over the years, sometimes by
                                                        accident, sometimes on purpose (injected humour and the like).</p>
                                                    <h3>Where does it come from?</h3>
                                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                                        in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                                        old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                                                        Virginia, looked up one of the more obscure Latin words, consectetur, from a
                                                        Lorem Ipsum passage, and going through the cites of the word in classical
                                                        literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                                                        1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
                                                        Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
                                                        ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                                                        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                                                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
                                                        those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                                                        Malorum" by Cicero are also reproduced in their exact original form, accompanied
                                                        by English versions from the 1914 translation by H. Rackham.</p>
                                                    <h4>Why do we use it?</h4>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                                        unknown printer took a galley of type and scrambled it to make a type specimen
                                                        book. It has survived not only five centuries, but also the leap into electronic
                                                        typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                                        with the release of Letraset sheets containing Lorem Ipsum passages, and more
                                                        recently with desktop publishing software like Aldus PageMaker including
                                                        versions of Lorem Ipsum.</p>
                                                    <h3>Where does it come from?</h3>
                                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                                        in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                                        old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                                                        Virginia, looked up one of the more obscure Latin words, consectetur, from a
                                                        Lorem Ipsum passage, and going through the cites of the word in classical
                                                        literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                                                        1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
                                                        Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
                                                        ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                                                        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

                                                </div>
                                            </div>

                                            <div className="blog-nav">
                                                <div className="com lhs">
                                                    <span><i className="fa fa-long-arrow-left" aria-hidden="true"></i> Previous post</span>
                                                    <h4>The Wedding Food</h4>
                                                    <a href="#!" class="fclick"></a>
                                                </div>
                                                <div className="com rhs">
                                                    <span>Next post <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                                                    <h4>Drinks and Music</h4>
                                                    <a href="#!" className="fclick"></a>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="rhs">
                                            <div className="blog-com-rhs">

                                                <div className="blog-soci">
                                                    <h4>Social media</h4>
                                                    <ul>
                                                        <li><a target="_blank" href="#!" className="sm-fb-big"><b>3k</b> Facebook</a></li>
                                                        <li><a target="_blank" href="#!" className="sm-tw-big"><b>10K</b> Twitter</a></li>
                                                        <li><a target="_blank" href="#!" className="sm-li-big"><b>1k</b> Linkedin</a></li>
                                                        <li><a target="_blank" href="#!" className="sm-yt-big"><b>100K</b> Youtube</a></li>
                                                    </ul>
                                                </div>

                                                <div className="blog-rhs-cate">
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
                                                </div>

                                                <div className="hot-page2-hom-pre blog-rhs-trends">
                                                    <h4>Trending Posts</h4>
                                                    <ul>
                                                        <li>
                                                            <div className="hot-page2-hom-pre-1">
                                                                <img src="/frontend/images/couples/4.jpg" alt="Bride and Groom - Wedding Blog" loading="lazy" />
                                                            </div>
                                                            <div className="hot-page2-hom-pre-2">
                                                                <h5>Simply dummy and typesetting</h5>
                                                            </div>
                                                            <a href="#" class="fclick"></a>
                                                        </li>
                                                        <li>
                                                            <div className="hot-page2-hom-pre-1">
                                                                <img src=" /frontend/images/couples/4.jpg" alt="Bride and Groom - Wedding Blog" loading="lazy" />
                                                            </div>
                                                            <div className="hot-page2-hom-pre-2">
                                                                <h5>Wedding make a type specimen book</h5>
                                                            </div>
                                                            <a href="#" className="fclick"></a>
                                                        </li>
                                                        <li>
                                                            <div className="hot-page2-hom-pre-1">
                                                                <img src="/frontend/images/couples/4.jpg" alt="Bride and Groom - Wedding Blog" loading="lazy" />
                                                            </div>
                                                            <div className="hot-page2-hom-pre-2">
                                                                <h5>Halls Letraset sheets containing</h5>
                                                            </div>
                                                            <a href="#" className="fclick"></a>
                                                        </li>
                                                        <li>
                                                            <div className="hot-page2-hom-pre-1">
                                                                <img src="/frontend/images/couples/4.jpg" alt="Bride and Groom - Wedding Blog" loading="lazy" />
                                                            </div>
                                                            <div className="hot-page2-hom-pre-2">
                                                                <h5>Where can I get some?</h5>
                                                            </div>
                                                            <a href="#" className="fclick"></a>
                                                        </li>
                                                        <li>
                                                            <div className="hot-page2-hom-pre-1">
                                                                <img src="/frontend/images/couples/4.jpg" alt="Bride and Groom - Wedding Blog" loading="lazy" />
                                                            </div>
                                                            <div className="hot-page2-hom-pre-2">
                                                                <h5>The standard chunk of Lorem Ipsum</h5>
                                                            </div>
                                                            <a href="#" className="fclick"></a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="blog-subsc">
                                                    <div className="ud-rhs-poin1">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/6349/6349282.png" alt=""
                                                            loading="lazy" />
                                                        <h5>Subscribe <b>Newsletter</b></h5>
                                                    </div>
                                                    <form name="news_newsletter_subscribe_form" id="news_newsletter_subscribe_form">
                                                        <ul>
                                                            <li><input type="text" name="news_newsletter_subscribe_name"
                                                                placeholder="Enter Email Id*" className="form-control" required="" />
                                                            </li>
                                                            <li><input type="submit" id="news_newsletter_subscribe_submit"
                                                                name="news_newsletter_subscribe_submit" className="form-control" /></li>
                                                        </ul>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="blog-rel slid-inn">
                            <div className="container">
                                <div className="row">
                                    <div className="home-tit">
                                        <p>Blog & Articles</p>
                                        <h2><span>Related posts</span></h2>
                                        <span className="leaf1"></span>
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
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default DetailBlog;
// export default dynamic(() => Promise.resolve(DetailBlog), { ssr: false });
