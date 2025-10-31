import { Col, Container, Row, Card } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import CountDownTimer from "components/common/countdown-timer";
import { useRouter } from "next/router";
import { CONST, matchesCountAction, profileService } from "core";
import ProfileDetailedView from "components/common/profile-detailed-view";
import Head from "next/head";
import { getUserDisplayName } from "core/helper/utils";

const TodayMatches = (props) => {
    const authProfile = useSelector((state) => state.account?.profile);

    const router = useRouter();
    const myMatchesCount = useSelector((state) => state?.common?.myMatches);

    const profileData = useSelector((state) => state?.account?.profileData);

    const { matchesCountAction } = props;

    const { profileid } = router.query;
    const token = useSelector((state) => state.account?.tokeAction);
    const reload = useSelector((state) => state.common?.reloadAction);

    const [todayMatches, setTodayMatches] = useState([]);
    const [respMsg, setRespMsg] = useState(null);
    const [profileDetail, setProfileDetail] = useState({});
    const [previousUser, setPreviousUser] = useState({});
    const [nextUser, setNextUser] = useState({});
    const [filter] = useState({ ...CONST.DEFAULT_ADV_FILTER });
    const [apiLoad, setApiLoad] = useState(false);

    useEffect(() => {
        if (token || reload || filter) {
            getTodayMatches(filter);
        }
    }, [token, filter, reload]);

    useEffect(() => {
        if (todayMatches.length > 0) {
            if (profileid) {
                const curProfile = todayMatches.find((ele) => ele.profileID === profileid);
                const curProfileInd = todayMatches.findIndex((ele) => ele.profileID === profileid);
                setProfileDetail(curProfile);
                todayViewMatched(curProfile._id);
                setPreviousUser(
                    todayMatches[curProfileInd - 1] ? todayMatches[curProfileInd - 1] : {}
                );
                setNextUser(todayMatches[curProfileInd + 1] ? todayMatches[curProfileInd + 1] : {});
            } else {
                router.push(CONST.MATCH_TODAY_PATH + "?profileid=" + todayMatches[0].profileID);
            }
        }
    }, [profileid, todayMatches, reload]);

    const todayViewMatched = async (profilId) => {
        await profileService.todayViewedMatches({ partnerProfileId: profilId });
    };

    const getTodayMatches = async (filter) => {
        if (apiLoad === true) return;
        setApiLoad(true);
        const resp = await profileService.todayMatches(filter);
        if (resp && resp.meta.code === 200) {
            const { data, meta, pagination } = resp;
            const { totalCount } = pagination;
            setTodayMatches(data);
            matchesCountAction({
                todayMatches: totalCount,
            });
            setApiLoad(false);
        } else if (resp && resp.meta.code === 1006) {
            setRespMsg(resp.meta.message);
            setTodayMatches([]);
            matchesCountAction({
                todayMatches: 0,
            });
            setApiLoad(false);
        }
    };

    return (
        <>
       <Head>
    <title>Today's Matches | True Friend Matrimony</title>
    <meta
        name="description"
        content="Discover your best Christian matrimonial matches for today on True Friend Matrimony. Connect with faith-centered, compatible singles seeking meaningful relationships and lasting Christian marriage."
    />
    <meta
        name="keywords"
        content="Christian Matrimony Matches, Today Matches, Faith-Based Matrimony, Christian Singles, TrueFriend Matrimony,Christian Matrimony , Trusted Christian Matchmaking, Partner Search, Christian Marriage, Matrimonial Matches, Find Life Partner"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com/matches/daily-recommendations" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="True Friend Matrimony" />
    <meta property="og:title" content="Today's Matches | True Friend Matrimony" />
    <meta
        property="og:description"
        content="Discover your best Christian matrimonial matches for today on True Friend Matrimony. Connect with faith-centered, compatible singles seeking meaningful relationships."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com/matches/daily-recommendations" />

</Head>

            <section className="page-section-ptb4 pb-6">
                <Container>
                    <div className="bg-white">
                        <Row>
                            <Col md={12}>
                                <h4 className="p-4">Today Matches</h4>
                                {CONST.MATCH_TODAY_PATH === router.pathname
                                    ? myMatchesCount?.todayMatches > 0
                                        ? ` (${myMatchesCount?.todayMatches})`
                                        : ""
                                    : profileData?.matchsCount?.todayMatchsCount > 0
                                        ? ` (${profileData?.matchsCount?.todayMatchsCount})`
                                        : ""}
                                <div className="ma-photo-top p-3">
                                    {apiLoad && <h5>Loading</h5>}
                                    {!apiLoad && todayMatches.length === 0 && (
                                        <div className="ma-photo-top1">
                                            <h3 className="text-center">{respMsg}</h3>
                                        </div>
                                    )}
                                    {!apiLoad && todayMatches.length > 0 && (
                                        <div className="ma-photo-top2">
                                            <div className="ma-photo-top2-1 p-3">
                                                <div className="ma-box1">Time left to Connect</div>
                                                <div className="ma-box2">
                                                    <CountDownTimer />
                                                </div>
                                            </div>
                                            <div className="ma-photo-top2-2">
                                                <div className="ma-box3 d-flex">
                                                    {previousUser?.user && (
                                                        <div className="ma-box3-1">
                                                            <Link
                                                                href={
                                                                    CONST.MATCH_TODAY_PATH +
                                                                    "?profileid=" +
                                                                    previousUser.profileID
                                                                }
                                                            >
                                                                <a className="ma-box3-tu3" href="#">
                                                                    {previousUser?.photos &&
                                                                        previousUser?.photos[0] && (
                                                                            <img
                                                                                src={
                                                                                    process.env
                                                                                        .NEXT_PUBLIC_IMAGE_PATH +
                                                                                    previousUser
                                                                                        ?.photos[0]
                                                                                        .imagePath +
                                                                                    previousUser
                                                                                        ?.photos[0]
                                                                                        .images?.medium
                                                                                }
                                                                                alt={`${previousUser?.name || 'User'}'s profile picture`}
                                                                                className="ma-box3-tu1 ma-box3-tu1-1"
                                                                            />
                                                                        )}
                                                                    {/* <img className="ma-box3-tu1 obacity-2 ma-box3-tu1-1" /> */}
                                                                    <div className="ma-box3-tu2 ma-box3-tu4">
                                                                        <span>Prev</span>
                                                                        <svg
                                                                            className="ma-box3-tu5 royate"
                                                                            focusable="false"
                                                                            viewBox="0 0 24 24"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    )}
                                                    {/* <span className="ma-box3-2">|</span> */}
                                                    {nextUser?.user && (
                                                        <div
                                                            className="ma-box3-3"
                                                        // onClick={() => todayViewMatched(nextUser.profileID)}
                                                        >
                                                            <Link
                                                                href={
                                                                    CONST.MATCH_TODAY_PATH +
                                                                    "?profileid=" +
                                                                    nextUser.profileID
                                                                }
                                                            >
                                                                <a href="#" className="ma-box3-tu3-n">
                                                                    {nextUser?.photos &&
                                                                        nextUser?.photos[0] && (
                                                                            <img
                                                                                src={
                                                                                    process.env
                                                                                        .NEXT_PUBLIC_IMAGE_PATH +
                                                                                    nextUser?.photos[0]
                                                                                        .imagePath +
                                                                                    nextUser?.photos[0]
                                                                                        .images?.medium
                                                                                }
                                                                                alt={`${nextUser?.name || 'User'}'s profile picture`}
                                                                                className="ma-box3-tu1 ma-box3-tu1-1"
                                                                            />
                                                                        )}
                                                                    <div className="ma-box3-tu4">
                                                                        <span>Next</span>
                                                                        <svg
                                                                            className="ma-box3-tu5 royate1"
                                                                            focusable="false"
                                                                            viewBox="0 0 24 24"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {profileDetail?.user && <ProfileDetailedView profile={profileDetail} />}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
};

const mapDispatchToProps = {
    matchesCountAction,
};
export default connect(null, mapDispatchToProps)(TodayMatches);
