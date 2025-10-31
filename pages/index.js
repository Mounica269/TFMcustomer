import Head from "next/head";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import TrueFriendMatrimony from "components/main/truefriend-matrimony";
import HowItWorks from "components/main/how-it-work";
import DreamPartners from "components/main/dream-partners";
import DownloadApp from "components/main/download-app";
import Testimonials from "components/main/testimonials";
import TrueLove from "components/main/true-love";
import BlogPost from "components/main/blogpost";
import BottomBanner from "components/main/bottombanner";
import Banner from "components/main/banner";
import { usersService } from "core/services";
import { utils } from "core/helper";
import Script from "next/script";
import dynamic from 'next/dynamic';

export default function Home() {
  const router = useRouter();
  const { token } = router.query;

  const activateUser = async () => {
    const resp = await usersService.activateAccount({ token });
    if (resp && resp.meta.code === 200) {
      utils.showSuccessMsg("Account activated successfully");
    }
  };

  useEffect(() => {
    if (token !== undefined) {
      activateUser();
    }
  }, [token]);

  return (
    <>


 <Head>
  <title> True Friend Matrimony | Christian Matrimony </title>
  <meta
    name="description"
    content="Join True Friend Matrimony – the trusted Christian matrimony platform to find your perfect life partner. Connect with Christian brides and grooms from Kerala, Tamil Nadu, and across India for faith-based marriages."
  />

  <meta
    name="keywords"
    content="Christian matrimony, Christian marriage, Christian brides, Christian grooms, Kerala Christian matrimony, Tamil Christian matrimony, Christian matrimonial site, Christian matchmaking, Christian life partner, Christian wedding, Christian marriage services, True Friend Matrimony"
  />

  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charSet="UTF-8" />
  <link rel="canonical" href="https://truefriendmatrimony.com" />

  {/*Open Graph tags */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Christian Matrimony | True Friend Matrimony" />
  <meta
    property="og:description"
    content="Find your Christian life partner with True Friend Matrimony – trusted matchmaking for faith-based marriages."
  />
  <meta property="og:url" content="https://truefriendmatrimony.com" />
  <meta property="og:site_name" content="True Friend Matrimony" />



  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "True Friend Matrimony",
        "url": "https://truefriendmatrimony.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://truefriendmatrimony.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }),
    }}
  />
</Head>



      <Fragment>
        <Banner />
        <TrueFriendMatrimony />
        <HowItWorks />
        <DreamPartners />
        <DownloadApp />
        <Testimonials />
        {/* <TrueLove /> */}
        <BottomBanner />
      </Fragment>
    </>
  );
}
