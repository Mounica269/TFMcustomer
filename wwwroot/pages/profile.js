import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { profileService } from "core/services";
import { useSelector } from "react-redux";
import ProfileDetailedView from "components/common/profile-detailed-view";
import Head from "next/head";
import dynamic from 'next/dynamic';

const Profile = () => {
    const router = useRouter();
    const { profileId } = router.query;
    console.log('profileId', profileId);

    const reload = useSelector((state) => state.common?.reloadAction);
    const [partnerProfile, setPartnerProfile] = useState(null);
    const [respMsg, setRespMsg] = useState("");
    const [apiLoad, setApiLoad] = useState(false);

    useEffect(() => {
        if (profileId && profileId !== undefined) {
            const getPartnerProfile = async (profileId) => {
                setApiLoad(true);
                setPartnerProfile(null);
                const resp = await profileService.getPartnerProfile(profileId);
                if (resp && resp.meta.code === 200) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1004) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 404) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1003) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                    setApiLoad(false);
                } else if (resp && resp.meta.code === 1026) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                    setApiLoad(false);
                }
            };
            getPartnerProfile(profileId);
        }
    }, [profileId]);

    useEffect(() => {
        if (profileId) {
            const getPartnerProfile = async (profileId) => {
                const resp = await profileService.getPartnerProfile(profileId);
                if (resp && resp.meta.code === 200) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                } else if (resp && resp.meta.code === 1004) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                } else if (resp && resp.meta.code === 404) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                } else if (resp && resp.meta.code === 1003) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                } else if (resp && resp.meta.code === 1026) {
                    setPartnerProfile(resp.data);
                    setRespMsg(resp.meta?.message);
                }
            };
            getPartnerProfile(profileId);
        }
    }, [reload]);

    return (
        <>
        <Head>
  <title>Christian Matrimony Blog | True Friend Matrimony</title>

  <meta
    name="description"
    content="Read the latest Christian Matrimony blogs at True Friend Matrimony. Discover inspirational love stories, faith-based matchmaking tips, wedding guidance, and relationship advice for Christian singles."
  />

  <meta
    name="keywords"
    content="Christian Matrimony, True Friend Matrimony, Christian Marriage Blog, Christian Matchmaking Tips, Faith-Based Love Stories, Wedding Tips, Relationship Advice, Christian Singles, Inspirational Matrimony Stories, Christian Matrimonial Insights"
  />

  <link rel="canonical" href="https://truefriendmatrimony.com/blog" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://truefriendmatrimony.com/blog" />
  <meta property="og:title" content="Christian Matrimony Blog | True Friend Matrimony" />
  <meta
    property="og:description"
    content="Explore Christian matrimony insights, love stories, and expert advice on True Friend Matrimony. Get inspiration for faith-based relationships and successful marriages."
  />

</Head>



            <section className="page-section-ptb4 pb-6">
                <Container className="bg-white">
                    {/* {Object.keys(partnerProfile).length === 0 && (
                    <div className="text-center py-5">
                        <h3>User profile is not exists.</h3>
                        <button
                            onClick={handleBack}
                            className="button  btn-lg btn-theme full-rounded animated right-icn"
                        >
                            Go back
                        </button>
                    </div>
                )} */}
                    {apiLoad && <h3 className="text-center py-5">Loading</h3>}
                    {!apiLoad && partnerProfile === null && (
                        <Fragment>
                            <h3 className="text-center py-5">{respMsg}</h3>
                            {/* <button
                            onClick={handleBack}
                            className="button  btn-lg btn-theme full-rounded animated right-icn"
                        >
                            Go back
                        </button> */}
                        </Fragment>
                    )}
                    {!apiLoad && partnerProfile !== null && (
                        <ProfileDetailedView profile={partnerProfile} />
                    )}
                </Container>
            </section>
        </>
    );
};

export default Profile;
// export default dynamic(() => Promise.resolve(Profile), { ssr: false });

