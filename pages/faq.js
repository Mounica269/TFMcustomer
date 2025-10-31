import BreadCrumb from "components/common/breadcrumb";
import * as React from "react";
import { Accordion } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { commonService, profileService } from "core/services";
import { CONST, utils, reloadAction } from "core";
import Head from "next/head";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
const FAQs = () => {
    const [faqList, setFaqList] = useState([]);
    const [apiLoad, setApiLoad] = useState(false);
    const [filter] = useState({ ...CONST.DEFAULT_FILTER });
    const [respMsg, setRespMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/faqs"); // Replace with your API endpoint
                const result = await res.json();
                console.log("first", result);
                setFaqList(result.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const stripHtmlTags = (html) => {
        return htmlToText(html, {
            wordwrap: 130,
            selectors: [
                { selector: "a", format: "inline" }, // Handles links
                { selector: "p", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } }, // Ensures spacing for paragraphs
            ],
        });
    };
    return (
        <>
        <Head>
  <title> FAQ | True Friend Matrimony | Christian Matrimony</title>

  <meta
    name="description"
    content="True Friend Matrimony is a trusted Christian matrimony site helping believers find their life partner. Join to connect with genuine Christian brides and grooms for a faith-filled marriage."
  />

  <meta
    name="keywords"
    content="Christian matrimony, Christian marriage site, Christian matchmaking, Christian life partner, Christian brides, Christian grooms, faith-based matrimony, Christian matrimonial services, True Friend Matrimony"
  />
  <link rel="canonical" href="https://www.truefriendmatrimony.com/faq" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Christian Matrimony | True Friend Matrimony" />
  <meta
    property="og:description"
    content="Find your Christian life partner with True Friend Matrimony. Safe, trusted, and faith-based matchmaking for believers."
  />
  <meta property="og:url" content="https://www.truefriendmatrimony.com/faq" />
  
</Head>


            <React.Fragment>
                <section>
                    <div className="ab-faq " id="faq">
                        <div className="container">
                            <div className="row justify-content-center">
                                {/* <!-- SUB TITLE --> */}
                                <div className="sub-tit-caps w-100 text-center mb-5 mt-5">
                                    <h2 className="mt-5">FAQ</h2>
                                    <p>Frequently Asked Question</p>
                                </div>
                                {/* <!-- TESTIMONIAL BACKGROUND SHAPES --> */}
                                <div className="wedd-shap w-100">
                                    <span className="abo-shap-2"></span>
                                    <span className="abo-shap-4"></span>
                                    <span className="abo-shap-5"></span>
                                </div>
                                {/* <!-- Accordion Left Column --> */}
                                <div className="col-lg-10 text-align-center d-xl-block d-lg-block d-md-none d-sm-none d-none mb-3">
                                    <div className="ab-faq-lhs">
                                        {/* <!-- Accordion Item 1 --> */}
                                        {faqList.map((item) => (
                                            <div className="accordion">
                                                <div className="top">
                                                    <div className="text"> {item.title}</div>
                                                    <img
                                                        src="https://assets-global.website-files.com/63e49089cb05f507aba64457/63e49089cb05f5c614a6446a_icon_plus.svg"
                                                        alt="Toggle Icon"
                                                    />
                                                    <input type="checkbox" />
                                                </div>
                                                <div className="bottom">
                                                    <div className="text">
                                                        {/* {stripHtmlTags(item.description)} */}
                                                        {parse(item.description)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                                <div className="col-lg-12 text-align-center d-xl-none d-lg-none d-md-block d-sm-block d-block mb-3">
                                    <Accordion
                                        className="accordion icon"
                                        id="accordionExample3"
                                    >
                                        {faqList.map((item, ind) => (
                                            <Accordion.Item eventKey={ind}>
                                                <Accordion.Header style={{ background: 'transparent' }} >
                                                    {/* {item.title} */}
                                                    <div className="top">
                                                        <div className="text"> {item.title}</div>

                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {/* {parse(item.description)} */}
                                                    <div className="text">
                                                        {/* {stripHtmlTags(item.description)} */}
                                                        {parse(item.description)}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </>
    );
};

export default FAQs;
// export default dynamic(() => Promise.resolve(FAQs), { ssr: false });
