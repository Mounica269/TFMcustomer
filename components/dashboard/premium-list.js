



import React, { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { profileService } from "core/services";
import ProfileSmallView from "components/common/profile-small-view";
import Link from "next/link";
import { CONST, reloadAction, premiumMatchesDataAction } from "core";
import Head from "next/head";

const PremiumProfileList = (props) => {
    const reload = useSelector((state) => state.common?.reloadAction);
    const premiumMatches = useSelector((state) => state.common?.premimumMatches);

    const [apiLoad, setApiLoad] = useState(false);
    const [respMsg, setRespMsg] = useState("");
    const [filter] = useState({ ...CONST.DEFAULT_MASTER_FILTER });
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (filter) {
            async function getPremiumMatches(filter) {
                if (apiLoad === true) {
                    return;
                }
                setApiLoad(true);
                const resp = await profileService.premiumMatches(filter);
                if (resp && resp.meta.code === 200) {
                    props.premiumMatchesDataAction(resp.data);
                    setApiLoad(false);
                    setRespMsg(resp?.meta?.message);
                } else {
                    setApiLoad(false);
                    setRespMsg("Failed to load premium matches.");
                }
            }
            getPremiumMatches(filter);
        }
    }, [filter]);

    useEffect(() => {
        async function getPremiumMatches(filter) {
            const resp = await profileService.premiumMatches(filter);
            if (resp && resp.meta.code === 200) {
                props.premiumMatchesDataAction(resp.data);
                setApiLoad(false);
                setRespMsg(resp?.meta?.message);
            } else {
                setRespMsg("Failed to load premium matches.");
            }
        }
        if (!initialLoad) {
            getPremiumMatches(filter);
        } else {
            setInitialLoad(false);
        }
    }, [reload]);

    return (
        <Fragment>
            <Head>
                {/* Primary SEO */}
                <title>Premium Matches | TrueFriend Matrimony</title>
                <meta name="description" content="Discover premium Christian matrimony profiles on TrueFriend Matrimony. Connect with verified Christian brides and grooms across India. Start your journey toward a meaningful relationship today!"/>
                <meta
                    name="keywords"
                    content="Premium Matches, Christian Matrimony, TrueFriend Matrimony, Matrimony Profiles,Verified Matrimony Profiles, Christian Matrimony India, Christian Brides and Grooms, Trusted Matrimony, Matrimonial Platform India"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/new-matches" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="Premium Matches | TrueFriend Matrimony" />
                <meta property="og:description" content="Discover premium Christian matrimony profiles on TrueFriend Matrimony. Connect with verified Christian brides and grooms across India. Start your journey toward a meaningful relationship today!"
    />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/new-matches" />

            </Head>

            <h2 className="db-tit">Premium Matches</h2>
            <div className="box box-s mt-2 mb-2 db-pro-stat p-2">
                {apiLoad && premiumMatches.length === 0 && <h5>Loading...</h5>}
                {premiumMatches.length > 0 ? (
                    <div className=""
                        style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <ul>
                            {premiumMatches.map((ele, ind) => (
                                <li key={ind}>
                                    <ProfileSmallView profile={ele} />
                                </li>
                            ))}
                        </ul>
                        {premiumMatches.length > 10 && (
                            <div className="bg-ashe p-1 mt-1 text-center">
                                <Link href="/matches/my-matches">View All</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <p>{respMsg}</p>
                    </div>
                )}
            </div>

        </Fragment>
    );
};

const mapDispatchToProps = {
    reloadAction,
    premiumMatchesDataAction
};

export default connect(null, mapDispatchToProps)(PremiumProfileList);
