import BreadCrumb from "components/common/breadcrumb";
import * as React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';

const Privacy = () => {
    return (
        <>
        <Head>
  <title>
    Privacy Policy | True Friend Matrimony - Safe & Trusted Christian Matrimony
  </title>

  <meta
    name="description"
    content="Read the Privacy Policy of True Friend Matrimony. Learn how we protect your personal data and ensure a secure, trusted, and faith-based Christian matrimony experience."
  />

  <meta
    name="keywords"
    content="Christian Matrimony Privacy Policy, Data Protection, Personal Information Security, Safe Christian Matrimony, Trusted Matrimonial Platform, True Friend Matrimony, Faith-Based Matrimony, Confidentiality, Secure Christian Matchmaking"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/privacy-policy" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/privacy-policy" />
  <meta property="og:title" content="Privacy Policy | True Friend Matrimony" />
  <meta
    property="og:description"
    content="Learn how True Friend Matrimony safeguards your data and provides a secure and trustworthy Christian matrimony platform for faith-centered matchmaking."
  />

</Head>



            <React.Fragment>
                {/* <BreadCrumb label={"Privacy Policy True Friend Matrimony.Com"}/> */}
                <section className="ab-faq ">
                    <div className="container">
                        <div className="row">
                            <div className="sub-tit-caps w-100 text-center mt-5">
                                <h2 className="mt-5">
                                    Privacy Policy
                                </h2>
                            </div>

                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <p className="text-justify">
                                    True Friend Matrimony.com is an online matrimony service that constantly
                                    tries to offer you marital services. This privacy statement is common to
                                    all the matrimonial Websites. We are strongly committed to your right to
                                    privacy, we have drawn out a privacy statement with regard to the
                                    information we collect from you. You acknowledge that you are disclosing
                                    information voluntarily. By accessing /using the website and/or by
                                    providing your information, you consent to the collection and use of the
                                    info you disclose on the website in accordance with this Privacy Policy.
                                    If you do not agree for use of your information, please do not use or
                                    access this website.
                                </p>

                                <h5>What information do you need to give in order to use this Website?</h5>
                                <p className="text-justify">
                                    A user-specified password, a user's photo, email address, name, date of
                                    birth, educational background, mailing address, zip code, and phone
                                    number are just a few examples of the data we collect from members and
                                    visitors who apply for the services on our website.
                                </p>
                                <h5>With whom the website shares the information it collects/tracks?</h5>
                                <p className="text-justify">
                                    We may share such identifiable information with our
                                    associates/affiliates/subsidiaries and such
                                    associates/affiliates/subsidiaries may market to you as a result of such
                                    sharing. Any information you give us is held with the utmost care and
                                    security. We are also bound to cooperate fully should a situation arise
                                    where we are required by law or legal process to provide information
                                    about a customer/visitor.
                                </p>
                                <h5>How Long Do We Keep Your Information?</h5>
                                <p className="text-justify">
                                    As stipulated in the Privacy Policy we will retain the information we
                                    collect from users under the following circumstances:
                                </p>
                                <p className="text-justify">
                                    For as long as the users subscribe to our services to meet their
                                    suitable purpose(s) for which it was collected, for the sake of
                                    enforcing agreements, for performing audits, for resolving any form of
                                    disputes, for establishing legal defenses, for pursuing legitimate
                                    businesses and to comply with the relevant applicable laws.
                                </p>
                                <h5>
                                    What are the Security Precautions in respect of your personal
                                    information?
                                </h5>
                                <p className="text-justify">
                                    We aim to protect your personal information through a system of
                                    organizational and technical security measures. We have implemented
                                    appropriate internal control measures designed to protect the security
                                    of any personal information we process. However, please also remember
                                    that we cannot guarantee that the internet itself is 100% secure. Once
                                    your information is in our possession, we adhere to security guidelines
                                    protecting it against unauthorized access.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </>
    );
};

export default Privacy;
// export default dynamic(() => Promise.resolve(Privacy), { ssr: false });
