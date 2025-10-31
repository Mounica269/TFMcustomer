import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { CONST } from "core/helper";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const SideNavBar = () => {
    const settings = useSelector((state) => state?.common?.siteSettings);
    const { social = null } = settings;
    return (
        <Fragment>
            <div class="menu-pop menu-pop1">
                <span class="menu-pop-clo">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <div class="inn">
                    <img
                        src="/frontend/images/logo.webp"
                        alt="True Friend Matrimony Logo"
                        loading="lazy"
                        class="logo-brand-only"
                    />
                    <p>
                        <strong>True Friend Matrimony</strong> is making history by creating more
                        meaningful connections that lead to fulfilling marriages
                    </p>
                    <ul class="menu-pop-info">
                        <li>
                            <a href="tel:+917550014747">
                                <i class="fa fa-phone" aria-hidden="true"></i>+91 75500 14747
                            </a>

                            <a href="tel:+917550054747">+91 75500 54747</a>
                            <a href="tel:+917550064747">+91 75500 64747 </a>
                        </li>

                        <li>
                            <a href="mailto:matrimony@truefriend.co.in">
                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                matrimony@truefriend.co.in
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>Vikas Mantra
                                Towers, 3rd Floor, 249, RK Mutt Road, Mandaveli, Chennai - 600 028
                                Tamilnadu.
                            </a>
                        </li>
                    </ul>
                    {/* <div class="menu-pop-help">
                            <h4>Support Team</h4>
                            <div class="user-pro">
                                <img src="/frontend/images/profiles/1.jpg" alt="" loading="lazy" />
                            </div>
                            <div class="user-bio">
                                <h5>Ashley emyy</h5>
                                <span>Senior personal advisor</span>
                                <a href="#" class="btn btn-primary btn-sm">
                                    Ask your doubts
                                </a>
                            </div>
                        </div> */}
                    <div class="menu-pop-soci">
                        <ul>
                            <li>
                                <a href={social?.facebook}>
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.instagram}>
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.twitter}>
                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                            </li>

                            <li>
                                <a href={social?.youtube}>
                                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="menu-pop menu-pop2">
                <span class="menu-pop-clo">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <div class="inn">
                    {/* <div class="menu-pop-help">
                            <h4>Support Team</h4>
                            <div class="user-pro">
                                <img src="/frontend/images/profiles/1.jpg" alt="" loading="lazy" />
                            </div>
                            <div class="user-bio">
                                <h5>Ashley emyy</h5>
                                <span>Senior personal advisor</span>
                                <a href="#" class="btn btn-primary btn-sm">
                                    Ask your doubts
                                </a>
                            </div>
                        </div> */}
                    <div class="menu-pop-soci">
                    <ul>
                            <li>
                                <a href={social?.facebook}>
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.instagram}>
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href={social?.twitter}>
                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                            </li>

                            <li>
                                <a href={social?.youtube}>
                                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://wa.me/+917550054747">
                                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="late-news">
                        <h4>Latest news</h4>
                        <ul>
                            <li>
                                <div class="rel-pro-img">
                                    <img
                                        src="/frontend/images/couples/1.jpg"
                                      alt="Image of a happy couple"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="rel-pro-con">
                                    <h5>Long established fact that a reader distracted</h5>
                                    <span class="ic-date">12 Dec 2023</span>
                                </div>
                                <a href="#" class="fclick"></a>
                            </li>
                            <li>
                                <div class="rel-pro-img">
                                    <img
                                        src="/frontend/images/couples/3.jpg"
                                       alt="Image of a happy couple"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="rel-pro-con">
                                    <h5>Long established fact that a reader distracted</h5>
                                    <span class="ic-date">12 Dec 2023</span>
                                </div>
                                <a href="#" class="fclick"></a>
                            </li>
                            <li>
                                <div class="rel-pro-img">
                                    <img
                                        src="/frontend/images/couples/4.jpg"
                                        alt="Image of a happy couple"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="rel-pro-con">
                                    <h5>Long established fact that a reader distracted</h5>
                                    <span class="ic-date">12 Dec 2023</span>
                                </div>
                                <a href="#" class="fclick"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </Fragment>
    );
};

export default SideNavBar;
