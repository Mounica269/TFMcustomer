import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import play_icon from "public/frontend/images/play-icon.png";
import { useSelector } from "react-redux";

const DownloadApp = () => {
    return (
        <section>
        <div class="ab-cont">
            <div class="container">
                <div class="row ">
                    <ul className="app">
                        <li>
                            <div class="ab-cont-po">
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                                <div>
                                    <h4>2K</h4>
                                    <span>Couples paired</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="ab-cont-po">
                                <i class="fa fa-users" aria-hidden="true"></i>
                                <div>
                                    <h4>4000+</h4>
                                    <span>Registrants</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="ab-cont-po">
                                <i class="fa fa-male" aria-hidden="true"></i>
                                <div>
                                    <h4>1600+</h4>
                                    <span>Men</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="ab-cont-po">
                                <i class="fa fa-female" aria-hidden="true"></i>
                                <div>
                                    <h4>2000+</h4>
                                    <span>Women</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    );
};

export default DownloadApp;
