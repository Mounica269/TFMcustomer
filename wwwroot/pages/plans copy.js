import { Fragment, useEffect, useState } from "react";
import { PLANS_PATH, commonService, masterService } from "core/services";
import { CONST } from "core/helper";

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
    console.log('plans',plans);

    useEffect(() => {
        loadPlans();
    }, []);

    const bgColors = ["#e7e2ec", "#dbddff", "#dbeaed", "#d8e9d9", "#f5d5d5"];
    const tableHeadeBgColors = ["#3b1956", "#08678a", "#0f93c3", "#069406", "#f51c1c"];

    return (
        <>
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
                        <div className="row justify-content-center">
                            <table width="100%" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="30%">Features</th>
                                        {plans.map((ele, ind) => (
                                            <th
                                                width="15%"
                                                key={ind}
                                                style={{
                                                    backgroundColor: tableHeadeBgColors[ind],
                                                    color: "white",
                                                    textAlign: "center",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                {ele.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Validity</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.validity + " Months"}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {/* <tr>
                                            <td>Create your profile</td>
                                            <td className="p-color1">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color2">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color3">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color4">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color5">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                        </tr> */}
                                    <tr>
                                        <td>No. of contacts to view</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.noOfContactsToView}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Visibility of your profile to all</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.isProfileVisibleToAll ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-close cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Browse profiles at TFM premises</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.browseProfilesAtTFMPremises ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Seek contacts of shortlisted profile</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.shorlistedContactsSeek ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Featured Profile ( Premium )</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.featuredPremiumProfile ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>
                                            Personal guidance to browse profiles at TFM premises
                                        </td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.personalGuideToBrowseProfilesAtTFMPremises ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Send Personalized Messages</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.sendPersonalizedMessage ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Cupid Match making</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.cupidMatchMaking ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Hand- Picked profiles by True Friend matrimony</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.handPickedProfilesByTFM ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Provide space for meeting the bride / groom</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.provideSpaceForMeeting ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {/* <tr>
                                            <td>Exclusive ranking of your profile</td>
                                            <td className="p-color1">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color2">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color3">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color4">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color5">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                        </tr> */}
                                    <tr>
                                        <td>Up market tagging</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.upMarketTagging ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Prominent display</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.promientDisplay ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Prayer assurance</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.prayerAssurance ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {/* <tr>
                                            <td>
                                                View social media profile ( Facebook &amp; twitter)
                                            </td>
                                            <td className="p-color1">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color2">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color3">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color4">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color5">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Upload your own audio clipping</td>
                                            <td className="p-color1">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color2">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color3">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color4">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color5">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Upload your own video clipping</td>
                                            <td className="p-color1">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color2">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color3">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color4">
                                                <i className="fa fa-check chk"></i>
                                            </td>
                                            <td className="p-color5">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                        </tr> */}
                                    <tr>
                                        <td>Get instant SMS on your contact views</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.getInstantMsgFormContactViews ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {/* <tr>
                                            <td>Telecasting the profile in TV show</td>
                                            <td className="p-color1">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color2">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color3">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color4">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                            <td className="p-color5">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                        </tr>   
                                        <tr>
                                            <td>Change your photograph ( no. of times)</td>
                                            <td className="p-color1">2</td>
                                            <td className="p-color2">5</td>
                                            <td className="p-color3">5</td>
                                            <td className="p-color4">10</td>
                                            <td className="p-color5">
                                                <i className="fa fa-times cross"></i>
                                            </td>
                                        </tr> */}
                                    <tr>
                                        <td>Personalised Matrimony Service</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {ele.personalisedMatrimonyService ? (
                                                        <i className="fa fa-check chk"></i>
                                                    ) : (
                                                        <i className="fa fa-times cross"></i>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Carry Forward</td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td
                                                    key={ind}
                                                    style={{
                                                        backgroundColor: bgColors[ind],
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <i className="fa fa-check chk"></i>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    <tr>
                                        <td></td>
                                        {plans.map((ele, ind) => {
                                            return (
                                                <td className="text-center">
                                                    <Link href="/plan-upgrade">
                                                        <a
                                                            href="#"
                                                            className="btn btn-primary btn-sm w-100"
                                                        >
                                                            Upgrade
                                                        </a>
                                                    </Link>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </Fragment>
        </>
    );
};

export default Plans;
// export default dynamic(() => Promise.resolve(Plans), { ssr: false });
