import { Fragment, useEffect, useState } from "react";
import { PLANS_PATH, commonService, masterService } from "core/services";
import { CONST } from "core/helper";
import Head from "next/head";
import BreadCrumb from "components/common/breadcrumb";
import Link from "next/link";
import dynamic from "next/dynamic";

const Plans = () => {
    const [plans, setPlans] = useState([]);

    const loadPlans = async () => {
        const resp = await masterService.getAll(PLANS_PATH + "/", { ...CONST.PLAN_FILTER });
        if (resp && resp.meta.code === 200) {
            const { data } = resp;
            setPlans(data.length > 0 ? data : []);
        }
    };
    console.log("plans", plans);

    useEffect(() => {
        loadPlans();
    }, []);

    const bgColors = ["#e7e2ec", "#dbddff", "#dbeaed", "#d8e9d9", "#f5d5d5"];
    const tableHeadeBgColors = ["#3b1956", "#08678a", "#0f93c3", "#069406", "#f51c1c"];

    return (
        <>
          <Head>
  <title>
     Plans - True Friend Matrimony | Affordable & Verified Membership - Christian Matrimony
  </title>

  <meta
    name="description"
    content="Choose the best Christian matrimony plans at True Friend Matrimony. Access verified Christian brides and grooms, exclusive matchmaking features, Tamil & Kerala profiles, and premium membership benefits. Upgrade today!"
  />

  <meta
    name="keywords"
    content="Christian Matrimony, Christian Matrimony Plans, Affordable Matrimony Plans, Verified Christian Profiles, Premium Christian Matchmaking, Tamil Christian Matrimony, Kerala Christian Matrimony, Christian Brides and Grooms, True Friend Matrimony, Faith-Based Matrimony Services"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/plans" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/plans" />
  <meta property="og:title" content="Christian Matrimony Plans - True Friend Matrimony" />
  <meta
    property="og:description"
    content="Upgrade your membership on True Friend Matrimony to access verified Christian brides & grooms, Tamil & Kerala profiles, and premium matchmaking features."
  />


</Head>


            <Fragment>
                {/* <BreadCrumb label={"Plans"} /> */}

                {/* Plans Banner Section */}
                <section className="page-section-ptb2">
                    <div className="plans-ban">
                        <div className="container">
                            <div className="row">
                                <span className="pri">Pricing</span>
                                <h1>
                                    Get Started <br /> Pick your Plan Now
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Plans Section */}
                <section className="plans-main">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            {/* <ul className="plan-list"> */}
                            {plans.map((ele, ind) => (
                                // <li className="mb-3 pln">
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-2" key={ind}>
                                    <div className="pri-box">
                                        <h2>{ele.name}</h2>
                                        <p> {ele.validity + " Months"} - Validity</p>
                                        <p>
                                            No. of contacts to view - {ele.noOfContactsToView}
                                        </p>
                                        <Link href="/register">
                                            <a className="cta">Get Started</a>
                                        </Link>
                                        <ol>
                                            <li>
                                                {ele.isProfileVisibleToAll ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-close cross"></i>
                                                )}
                                                Visibility of your profile to all
                                            </li>
                                            <li>
                                                {ele.browseProfilesAtTFMPremises ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Browse profiles at TFM premises
                                            </li>
                                            <li>
                                                {ele.shorlistedContactsSeek ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Seek contacts of shortlisted profile
                                            </li>
                                            <li>
                                                {ele.featuredPremiumProfile ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Featured Profile (Premium)
                                            </li>
                                            <li>
                                                {ele.personalGuideToBrowseProfilesAtTFMPremises ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Personal guidance to browse profiles at TFM premises
                                            </li>
                                            <li>
                                                {ele.sendPersonalizedMessage ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Send Personalized Messages
                                            </li>
                                            <li>
                                                {ele.cupidMatchMaking ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Cupid Matchmaking
                                            </li>
                                            <li>
                                                {ele.handPickedProfilesByTFM ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Hand-Picked profiles by True Friend matrimony
                                            </li>
                                            <li>
                                                {ele.provideSpaceForMeeting ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Provide space for meeting the bride/groom
                                            </li>
                                            <li>
                                                {ele.upMarketTagging ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                market tagging
                                            </li>
                                            <li>
                                                {ele.promientDisplay ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Prominent display
                                            </li>
                                            <li>
                                                {ele.prayerAssurance ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Prayer assurance
                                            </li>
                                            <li>
                                                {ele.getInstantMsgFormContactViews ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Get instant SMS on your contact views
                                            </li>
                                            <li>
                                                {ele.personalisedMatrimonyService ? (
                                                    <i className="fa fa-check chk"></i>
                                                ) : (
                                                    <i className="fa fa-times cross"></i>
                                                )}
                                                Personalised Matrimony Service
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Carry Forward
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                // </li>

                            ))}
                            {/* </ul> */}
                        </div>
                    </div>
                </section>
            </Fragment>
        </>
    );
};

export default Plans;
