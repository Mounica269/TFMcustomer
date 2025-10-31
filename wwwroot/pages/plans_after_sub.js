import { Fragment } from "react";

import BreadCrumb from "components/common/breadcrumb";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";
import { connect, useSelector } from "react-redux";

const Plans = () => {
    const authProfile = useSelector((state) => state.account?.profile);

    return (
        <>
     <Head>
  <title>
   Plans | {getUserDisplayName(authProfile?.name, authProfile?.user?.name)}
  </title>

  <meta
    name="description"
    content="Choose the best Christian matrimony plans at True Friend Matrimony. Access verified profiles, Tamil & Kerala Christian matches, advanced search, and premium matchmaking features. Upgrade today!"
  />

  <meta
    name="keywords"
    content="Christian Matrimony, Christian Matrimony Plans, Christian Matchmaking, Verified Christian Profiles, Affordable Matrimony Plans, Tamil Christian Matrimony, Kerala Christian Matrimony, Premium Christian Matches, Christian Brides and Grooms, True Friend Matrimony"
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
                        <div className="row">
                            <ul className="plan-list">
                                <li>
                                    <div className="pri-box">
                                        <h2>TFM-EXECUTIVE</h2>
                                        <p>6 Months - Validity</p>
                                        <p>No. of contacts to view - 20</p>
                                        <Link href="/register">
                                            <a className="cta">Get Started</a>
                                        </Link>
                                        {/* <span className="pri-cou">
                      <b>$0</b>/mo
                    </span> */}
                                        <ol>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Visibility of your profile to all
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Seek contacts of shortlisted profile
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-close close"
                                                    aria-hidden="true"
                                                ></i>
                                                Featured Profile (Premium)
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personal guidance to browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-close close"
                                                    aria-hidden="true"
                                                ></i>
                                                Send Personalized Messages
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-close close"
                                                    aria-hidden="true"
                                                ></i>
                                                Cupid Matchmaking
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Hand-Picked profiles by True Friend matrimony
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Provide space for meeting the bride/groom
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>Up
                                                market tagging
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prominent display
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prayer assurance
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-close close"
                                                    aria-hidden="true"
                                                ></i>
                                                Get instant SMS on your contact views
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personalised Matrimony Service
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Carry Forward
                                            </li>
                                        </ol>
                                    </div>
                                </li>
                                <li>
                                    <div className="pri-box">
                                        <h2>TFM-CLASSIC</h2>
                                        <p>6 Months - Validity</p>
                                        <p>No. of contacts to view - 50</p>
                                        <Link href="/register">
                                            <a className="cta">Get Started</a>
                                        </Link>
                                        {/* <span className="pri-cou">
                      <b>$0</b>/mo
                    </span> */}
                                        <ol>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Visibility of your profile to all
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Seek contacts of shortlisted profile
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Featured Profile (Premium)
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personal guidance to browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Send Personalized Messages
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Cupid Matchmaking
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Hand-Picked profiles by True Friend matrimony
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Provide space for meeting the bride/groom
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>Up
                                                market tagging
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prominent display
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prayer assurance
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Get instant SMS on your contact views
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personalised Matrimony Service
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Carry Forward
                                            </li>
                                        </ol>
                                    </div>
                                </li>
                                <li>
                                    <div className="pri-box">
                                        <h2>TFM-PREMIUM</h2>
                                        <p>12 Months - Validity</p>
                                        <p>No. of contacts to view - 100</p>
                                        <Link href="/register">
                                            <a className="cta">Get Started</a>
                                        </Link>
                                        {/* <span className="pri-cou">
                      <b>$0</b>/mo
                    </span> */}
                                        <ol>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Visibility of your profile to all
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Seek contacts of shortlisted profile
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Featured Profile (Premium)
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personal guidance to browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Send Personalized Messages
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Cupid Matchmaking
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Hand-Picked profiles by True Friend matrimony
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Provide space for meeting the bride/groom
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>Up
                                                market tagging
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prominent display
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prayer assurance
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Get instant SMS on your contact views
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personalised Matrimony Service
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Carry Forward
                                            </li>
                                        </ol>
                                    </div>
                                </li>
                                <li>
                                    <div className="pri-box_1"></div>
                                </li>
                                <li>
                                    <div className="pri-box mt-3">
                                        <h2>TFM-SUPREME</h2>
                                        <p>24 Months - Validity</p>
                                        <p>No. of contacts to view - 150</p>
                                        <Link href="/register">
                                            <a className="cta">Get Started</a>
                                        </Link>
                                        {/* <span className="pri-cou">
                      <b>$0</b>/mo
                    </span> */}
                                        <ol>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Visibility of your profile to all
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Seek contacts of shortlisted profile
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Featured Profile (Premium)
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personal guidance to browse profiles at TFM premises
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Send Personalized Messages
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Cupid Matchmaking
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Hand-Picked profiles by True Friend matrimony
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Provide space for meeting the bride/groom
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>Up
                                                market tagging
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prominent display
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Prayer assurance
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Get instant SMS on your contact views
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Personalised Matrimony Service
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                Carry Forward
                                            </li>
                                        </ol>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </Fragment>
        </>
    );
};

export default Plans;
// export default dynamic(() => Promise.resolve(Plans), { ssr: false });
