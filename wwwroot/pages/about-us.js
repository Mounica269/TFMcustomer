import BreadCrumb from "components/common/breadcrumb";
import { Fragment } from "react";
import DreamPartners from "components/main/dream-partners";
import DownloadApp from "components/main/download-app";
import { Container } from "react-bootstrap";
import Head from "next/head";
import dynamic from 'next/dynamic';
// import 'animate.css';


const AboutUs = () => {
    return (
        <>
    <Head>
  <title> About Us | True Friend Matrimony | Christian Matrimony </title>
  <meta
    name="description"
    content="Find your perfect Christian life partner with True Friend Matrimony – a trusted Christian matrimony platform for brides and grooms."
  />
  <meta
    name="keywords"
    content="Christian Matrimony, Tamil Christian Matrimony, Christian Brides, Christian Grooms, Christian Matchmaking, Christian Marriage"
  />
  <link rel="canonical" href="https://www.truefriendmatrimony.com/about-us" />

  {/* Open Graph */}
  <meta property="og:title" content="Christian Matrimony | True Friend Matrimony" />
  <meta
    property="og:description"
    content="True Friend Matrimony helps you find a faithful Christian life partner with a trusted, personalized matchmaking service."
  />
  <meta property="og:url" content="https://www.truefriendmatrimony.com/about-us" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="True Friend Matrimony" />



</Head>



            <Fragment>
                <section>
                    <div className="str">
                        <div className="ban-inn ab-ban">
                            <div className="container py-5">
                                <div className="row">
                                    <div className="hom-ban mt-3">
                                        <div className="ban-tit mt-5">
                                            <span><i className="no1">#1</i> Wedding Website</span>
                                            <h1>About us</h1>
                                            <p>Most Trusted and premium Matrimony Service in the World.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="ab-sec2">
                        <div className="container pt-3">
                            <div className="row">
                                <ul className="choose" >
                                    <li>
                                        <div className="chss">
                                            <img src="/frontend/images/icon/prize.png" alt="Trustworthy" loading="lazy" />
                                            <h4>100% Trustworthy</h4>
                                            <p>We are a highly authentic, 100% trustworthy matrimony platform. We follow multi-level authentication to ensure that only genuine profiles are provided.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="chss">
                                            <img src="/frontend/images/icon/rings.png" alt="Better Search and Matches" loading="lazy" />
                                            <h4>Better Search and Matches</h4>
                                            <p>Our algorithms are tuned to provide better search results and matches based on your preferences. Our user interfaces are designed to enable hassle-free navigation to provide relevant matches.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="chss">
                                            <img src="/frontend/images/icon/trust.png" alt="Explore and connect" loading="lazy" />
                                            <h4>Explore and connect</h4>
                                            <p>Explore and connect anytime, anywhere with registered users at your ease. Get access to unlimited profiles & share your interest with the one you like.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <DreamPartners />
                {/* <section>
                    <div className="hom-partners abo-partners" id="testimonials">
                        <div className="container">
                            <div className="row">
                                <div className="sub-tit-caps">
                                    <h2>Customer <span cclassName="animate__animated animate__flipInX animate__delay-0.1s">Testimonials</span></h2>
                                    <p>Fusce imperdiet ullamcorper fringilla.</p>
                                </div>

                                <div className="wedd-shap">
                                    <span className="abo-shap-1"></span>
                                    <span className="abo-shap-3"></span>
                                </div>

                                <div id="demo" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <ul className="cust">
                                                <li>
                                                    <div className="ab-testmo">
                                                        <div className="ab-test-rat">
                                                            <div className="ab-test-star">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                <span>(50 Reviews)</span>
                                                            </div>
                                                            <div className="ab-test-conte">
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                            </div>
                                                        </div>
                                                        <div className="ab-rat-user">
                                                            <img src="/frontend/images/profiles/1.jpg" alt="" />
                                                            <div>
                                                                <h4>John Smith</h4>
                                                                <span>IT Profession</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="ab-testmo">
                                                        <div className="ab-test-rat">
                                                            <div className="ab-test-star">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <span>(50 Reviews)</span>
                                                            </div>
                                                            <div className="ab-test-conte">
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                            </div>
                                                        </div>
                                                        <div className="ab-rat-user">
                                                            <img src="/frontend/images/profiles/1.jpg" alt="" />
                                                            <div>
                                                                <h4>Julia Ann</h4>
                                                                <span>Teacher</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="ab-testmo">
                                                        <div className="ab-test-rat">
                                                            <div className="ab-test-star">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                <span>(50 Reviews)</span>
                                                            </div>
                                                            <div className="ab-test-conte">
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                            </div>
                                                        </div>
                                                        <div className="ab-rat-user">
                                                            <img src="/frontend/images/profiles/1.jpg" alt="" />
                                                            <div>
                                                                <h4>William Son</h4>
                                                                <span>Government Staff</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="carousel-item">
                                            <ul>
                                                <li>
                                                    <div className="ab-testmo">
                                                        <div className="ab-test-rat">
                                                            <div className="ab-test-star">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <span>(50 Reviews)</span>
                                                            </div>
                                                            <div className="ab-test-conte">
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                            </div>
                                                        </div>
                                                        <div className="ab-rat-user">
                                                            <img src="/frontend/images/profiles/1.jpg" alt="" />
                                                            <div>
                                                                <h4>John Smith</h4>
                                                                <span>IT Profession</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="ab-testmo">
                                                        <div className="ab-test-rat">
                                                            <div className="ab-test-star">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <span>(50 Reviews)</span>
                                                            </div>
                                                            <div className="ab-test-conte">
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                            </div>
                                                        </div>
                                                        <div className="ab-rat-user">
                                                            <img src="/frontend/images/profiles/6.jpg" alt="" />
                                                            <div>
                                                                <h4>Julia Ann</h4>
                                                                <span>Teacher</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="ab-testmo">
                                                        <div className="ab-test-rat">
                                                            <div className="ab-test-star">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                <span>(50 Reviews)</span>
                                                            </div>
                                                            <div className="ab-test-conte">
                                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                            </div>
                                                        </div>
                                                        <div className="ab-rat-user">
                                                            <img src="/frontend/images/profiles/7.jpg" alt="" />
                                                            <div>
                                                                <h4>William Son</h4>
                                                                <span>Government Staff</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                        <span className="carousel-control-prev-icon"></span>
                                    </a>
                                    <a className="carousel-control-next" href="#demo" data-slide="next">
                                        <span className="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <div className="mb-5">
                    <DownloadApp />
                </div>

            </Fragment>
        </>
    );
};

export default AboutUs;
// export default dynamic(() => Promise.resolve(AboutUs), { ssr: false });
