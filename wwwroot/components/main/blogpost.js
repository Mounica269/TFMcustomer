import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Head from "next/head";
import dynamic from 'next/dynamic';

const BlogPost = () => {
    return (
        <>

            <Head>
                <title>Christian Matrimony Blog | TrueFriend Matrimony</title>
                <meta
                    name="description"
                    content="Discover expert advice and latest blogs on Christian matrimony, wedding planning, invitation cards, and marriage tips. Get helpful articles to plan your special day perfectly."
                />
                <meta
                    name="keywords"
                    content="Christian Matrimony Blog, Wedding Planning Tips, Marriage Articles,Christian Wedding Invitations, Matrimony Stories, Matrimony Success Stories, TrueFriend Matrimony Blog, Wedding Checklist, Christian Marriage Advice, TrueFriend Matrimony Blog, Christian Bride and Groom Tips,Christian Matrimony,TrueFriend Matrimony"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/blogs" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Christian Matrimony Blog | TrueFriend Matrimony" />
                <meta
                    property="og:description"
                    content="Read the latest blogs on Christian matrimony, wedding arrangements, and helpful tips to make your marriage planning smooth and enjoyable."
                />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/blogs" />

            </Head>

            <section>
                <div className="hom-blog">
                    <div className="container">
                        <div className="row">
                            <div className="home-tit">
                                <p>Blog posts</p>
                                <h2><span>Blog & Articles</span></h2>
                            </div>
                            <div className="blog">
                                <ul>
                                    <li>
                                        <div className="blog-box">
                                            <img src="/frontend/images/couples/1.jpg"
                                                alt="Wedding couple Johnny during arrangements"
                                                loading="lazy" />
                                            <span>Wedding - Johnny</span>
                                            <h2>Wedding arrangements</h2>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.
                                            </p>
                                            <a href="/blogs" className="cta-dark"><span>Read more</span></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="blog-box">
                                            <img src="/frontend/images/couples/11.jpg"
                                                alt="Johnny and partner wedding celebrations"
                                                loading="lazy" />
                                            <span>Wedding - Johnny</span>
                                            <h2>Wedding arrangements</h2>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.
                                            </p>
                                            <a href="/blogs" className="cta-dark"><span>Read more</span></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="blog-box">
                                            <img src="/frontend/images/couples/4.jpg"
                                                alt="Invitation cards for wedding by Johnny"
                                                loading="lazy" />
                                            <span>Wedding - Johnny</span>
                                            <h2>Invitation cards</h2>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.
                                            </p>
                                            <a href="/blogs" className="cta-dark"><span>Read more</span></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPost;
// export default dynamic(() => Promise.resolve(BlogPost), { ssr: false });
