import "react-toastify/dist/ReactToastify.css";
import ScrollButton from "components/common/ScrollButton";
import { Provider, useSelector } from "react-redux";
import { wrapper, store } from "core/store";
import { ToastContainer, Zoom } from "react-toastify";
import { SSRProvider } from "@react-aria/ssr";
import Layout from "components/containers/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LOGIN_PATH } from "core/helper/const";
import Script from "next/script";
import Maintenance from "../pages/maintenancePage";
import GA4 from "react-ga4";
import * as gtag from "../public/gtag";
import Head from "next/head";
import "public/frontend/css/bootstrap.css";
import "public/frontend/css/font-awesome.min.css";
import "public/frontend/css/animate.min.css";
import "public/frontend/css/style.css";
import Preloader from "components/common/preloader";
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
    const IS_MAINTENANCE_MODE = process.env.NEXT_PUBLIC_IS_MAINTENANCE_MODE === "true";

    if (IS_MAINTENANCE_MODE) {
        return <Maintenance />;
    }
    const TRACKING_ID = gtag.GA_TRACKING_ID;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => {
            setTimeout(() => setLoading(false), 2000); // Preloader stays for 2 seconds
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router.events]);

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
            GA4.send({
                hitType: "pageview",
                page: window.location.pathname + window.location.search,
            });
            window.scrollTo(0, 0);

        };

        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        const handleScroll = () => {
            const windowPos = window.scrollY;
            const element = document.querySelector(".hom-top");

            if (windowPos >= 200) {
                element.classList.add("act");
            } else {
                element.classList.remove("act");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        const popBg = document.querySelector(".pop-bg");
        if (popBg) {
            popBg.addEventListener("click", function () {
                document
                    .querySelectorAll(".pop-bg, .menu-pop, .mob-me-all")
                    .forEach(function (element) {
                        element.classList.remove("act");
                    });
                document.body.style.overflow = "visible";
            });
        }

        return () => {
            if (popBg) {
                popBg.removeEventListener("click", function () {
                    document
                        .querySelectorAll(".pop-bg, .menu-pop, .mob-me-all")
                        .forEach(function (element) {
                            element.classList.remove("act");
                        });
                    document.body.style.overflow = "visible";
                });
            }
        };
    }, []);

    return (

        <SSRProvider>
            <Head>
                <title>True Friend Matrimony</title>
                <meta
                    name="description"
                    content="True Friend Matrimony is the trusted Christian matrimony site to find your perfect Christian life partner. Simple, secure and blessed matchmaking."
                />
                <meta
                    name="keywords"
                    content="Christian matrimony, Christian matchmaking, Christian marriage site, Christian brides, Christian grooms"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:title" content="True Friend Matrimony | Christian Matrimony" />
                <meta
                    property="og:description"
                    content="Find your Christian life partner with True Friend Matrimony – trusted matrimony for serious Christian matchmaking."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://truefriendmatrimony.com" />
                <meta
                    property="og:image"
                    content="https://truefriendmatrimony.com/frontend/img/og-image.jpg"
                />
            </Head>
            <DefaultSeo
                 title="True Friend Matrimony | Christian Matrimony for Brides & Grooms"
                description="Join True Friend Matrimony – trusted Christian matrimony to find your life partner. Matrimony service for Christian brides and grooms in India."
                openGraph={{
                    type: "website",
                    locale: "en_IN",
                    url: "https://truefriendmatrimony.com",
                    site_name: "True Friend Matrimony",
                    title: "True Friend Matrimony | Christian Matrimony in India",
                    description:
                        "Find Christian brides and grooms on True Friend Matrimony – India’s trusted matrimony site for Christians.",
                    images: [
                        {
                            url: "https://truefriendmatrimony.com/frontend/img/og-image.jpg",
                            width: 1200,
                            height: 630,
                            alt: "Christian Matrimony - True Friend Matrimony",
                        },
                    ],
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "Christian matrimony, Tamil Christian matrimony, Christian brides, Christian grooms, matrimony for Christians, Christian life partner",
                    },
                ]}
            />
            <Provider store={store}>
                {loading && <Preloader />}
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
            <ScrollButton />
            <ToastContainer draggable={false} transition={Zoom} theme="dark" />

            <Script src="/frontend/js/jquery.min.js" strategy="beforeInteractive" />
            <Script src="/frontend/js/popper.min.js" strategy="beforeInteractive" />
            <Script src="/frontend/js/bootstrap.min.js" strategy="beforeInteractive" />
            <Script src="/frontend/js/select-opt.js" strategy="beforeInteractive" />
            <Script src="/frontend/js/slick.js" strategy="beforeInteractive" />
            <Script src="/frontend/js/custom.js" strategy="lazyOnload" />

            {/* Google Analytics */}
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`} />
            <Script
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16656845355');
              gtag('config', '${TRACKING_ID}', {
                page_path: window.location.pathname,
              });
              `,
                }}
            />
            {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Best SEO Practices in Next.js",
                    description: "Learn the best SEO strategies for Next.js applications.",
                    url: "https://dev-tfmcustomernewui.azurewebsites.net",
                }),
                }}
            /> */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: [
                            {
                                "@type": "Question",
                                name: "What is True Friend Matrimony?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "True Friend Matrimony is a trusted Christian matrimony site helping brides and grooms find their life partners.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Is True Friend Matrimony only for Christians?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Yes, True Friend Matrimony is exclusively for Christian matchmaking.",
                                },
                            },
                        ],
                    }),
                }}
            />
        </SSRProvider>
    );
}

export default wrapper.withRedux(MyApp);
