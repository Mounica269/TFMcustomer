import BreadCrumb from "components/common/breadcrumb";
import * as React from "react";
import dynamic from 'next/dynamic';
import Head from "next/head";


const ReturnAndCancellation = () => {
    return (
        <>
   <Head>
  <title>Returns & Cancellations | True Friend Matrimony - Christian Matrimony Platform</title>

  <meta
    name="description"
    content="Understand True Friend Matrimony’s returns, cancellations, and refund policies. Get clear guidance on managing memberships, service changes, and refunds on our trusted Christian matrimony platform."
  />

  <meta
    name="keywords"
    content="Christian Matrimony Returns, Christian Matrimony Cancellations, True Friend Matrimony Refunds, Membership Cancellation, Service Refund Policy, Christian Matrimonial Services, Trusted Christian Matrimony, Christian Marriage Services, Account Management"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/return-and-cancellation" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/return-and-cancellation" />
  <meta property="og:title" content="Returns & Cancellations | True Friend Matrimony - Christian Matrimony Platform" />
  <meta
    property="og:description"
    content="Learn about True Friend Matrimony’s returns, cancellations, and refund policies. Clear guidance for members on our trusted Christian matrimony platform."
  />

</Head>




            <React.Fragment>
                {/* <BreadCrumb label="Return And Cancellation"/> */}
                <section className="ab-faq mb-5 ">
                    <div className="container">
                        <div className="row">
                            <div className="sub-tit-caps w-100 text-center mt-5">
                                <h2 className="mt-5">
                                    Return And Cancellation
                                </h2>
                            </div>

                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <p className="text-justify">
                                    In the event, you are not agreeable to any of the terms or conditions
                                    herein contained, please reconsider and please refrain from
                                    registration.
                                </p>
                                <h5>Cancellation / Discontinuation</h5>
                                <p className="text-justify">
                                    If you want to discontinue the services (benefits of this pack) at any
                                    point of time, you can still enjoy listed paid benefits till the end of
                                    that year of membership. On your request, the membership will be
                                    discontinued from the next year onwards.
                                </p>
                                <p className="text-justify">
                                    Under no circumstances refunds would be made if membership is canceled
                                    at any point in time. Maximum package validity is 6 years or the user's
                                    marriage, whichever is earlier.
                                </p>
                                <p className="text-justify">
                                    True Friend Matrimony reserves the right to discontinue the product at
                                    any time. However, if you have already bought the product, you'll
                                    continue to enjoy the benefits till the period specified.
                                </p>
                                <p className="text-justify">
                                    True Friend Matrimony reserves the right to change product features at
                                    any time. However, you'll continue to enjoy the benefits that were
                                    offered when you bought the product.
                                </p>
                                <p className="text-justify">
                                    True Friend Matrimony reserves the right to cancel your membership at
                                    any point of time, if malicious activity is suspected. In such cases
                                    membership fees will not be refunded. Malicious activity includes but is
                                    not limited to:
                                </p>
                                <ul className="tr-list1">
                                    <li>
                                        Using the product for brokerage purposes, as this product is
                                        intended for personal use ONLY.
                                    </li>
                                    <li>Using products without the intent of marriage.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </>
    );
};

export default ReturnAndCancellation;
// export default dynamic(() => Promise.resolve(ReturnAndCancellation), { ssr: false });
