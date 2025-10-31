import React, { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { profileService } from "core/services";
import Link from "next/link";
import ProfileSmallView from "components/common/profile-small-view";
import { CONST, myMatchesDataAction } from "core";
import Head from "next/head";


const NewMatcheList = (props) => {
    const reload = useSelector((state) => state.common?.reloadAction);
    const myMatchesData = useSelector((state) => state.common?.myMatchesList);
    const myMatches = (myMatchesData?.data) ? myMatchesData.data : [];
    // const [myMatches, setMymatches] = useState([]);
    const [apiLoad, setApiLoad] = useState(false);
    const [respMsg, setRespMsg] = useState("");
    const [filter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [initialLoad, setInitialLoad] = useState(true);



    useEffect(() => {
        if (filter) {
            const getMyMatches = async () => {
                if (apiLoad === true) {
                    return;
                }
                setApiLoad(true);
                const resp = await profileService.myMatches(filter);
                if (resp && resp.meta.code === 200) {
                    props.myMatchesDataAction(resp);
                    // setMymatches(resp.data);
                    setApiLoad(false);
                    setRespMsg(resp?.meta?.message);
                } else if (resp && resp.meta.code === 1007) {
                    props.myMatchesDataAction(resp);
                    // setMymatches(resp.data);
                    setApiLoad(false);
                    setRespMsg(resp?.meta?.message);
                }
            };
            getMyMatches(filter);
        }
    }, [filter]);

    useEffect(() => {
        const getMyMatches = async () => {
            const resp = await profileService.myMatches(filter);
            if (resp && resp.meta.code === 200) {
                props.myMatchesDataAction(resp);
                // setMymatches(resp.data);
                setRespMsg(resp?.meta?.message);
            } else if (resp && resp.meta.code === 1007) {
                props.myMatchesDataAction(resp);
                // setMymatches(resp.data);
                setRespMsg(resp?.meta?.message);
            }
        };
        if (!initialLoad)
            getMyMatches(filter);
        else
            setInitialLoad(false);
    }, [reload]);

    return (
        <>
            <Head>
                {/* SEO */}
                <title>My Matches | TrueFriend Matrimony  - Trusted Christian Matrimony Platform</title>
                <meta name="description" content="Discover your perfect match on TrueFriend Matrimony, India’s most trusted Christian Matrimony platform. Browse verified Christian brides and grooms profiles tailored to your preferences." />
                <meta
                    name="keywords"
                    content="Christian Matrimony, Matches, TrueFriend Matrimony, Profile Matches ,Christian Matrimony India, Verified Christian Matrimony, Christian Matchmaking, TrueFriend Matrimony Matches, Christian Brides and Grooms, Matrimony Profiles, Faith-Based Matrimony, Christian Marriage Matches"
                />
                <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/my-matches" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrueFriend Matrimony" />
                <meta property="og:title" content="My Matches | TrueFriend Matrimony" />
                <meta property="og:description" content="Discover your perfect match on TrueFriend Matrimony, India’s most trusted Christian Matrimony platform. Browse verified Christian brides and grooms profiles tailored to your preferences." />
                <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/my-matches" />

            </Head>

            <Fragment>

                <h2 className="db-tit">My Matches</h2>
                <div className="box box-s mt-2 db-pro-stat p-2 mb-2">
                    {apiLoad && myMatches.length == 0 && <h5>Loading</h5>}
                    {
                        (myMatches?.length > 0 ? (
                            <div className=""
                                style={{ maxHeight: "400px", overflowY: "auto" }}>
                                <ul>
                                    {myMatches.map((ele, ind) => (
                                        <ProfileSmallView key={ind} profile={ele} />
                                    ))}
                                </ul>
                                {myMatches.length > 10 && (
                                    <div className="bg-ashe p-1 mt-1 text-center">
                                        <Link href={"/matches/my-matches"}>View All</Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                <p>{respMsg}</p>
                            </div>
                        ))}
                </div>

            </Fragment>

        </>
    );
};

const mapDispatchToProps = {
    myMatchesDataAction
};

export default connect(null, mapDispatchToProps)(NewMatcheList);


