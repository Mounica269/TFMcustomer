// pages/404.js
import Link from "next/link";
import styles from "./404.module.css";
import Head from "next/head";

import dynamic from "next/dynamic";
const Custom404 = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Sorry, the page you are looking for does not exist on True Friend Christian Matrimony. Explore meaningful Christian matches and join our trusted matrimonial community."
        />
        <meta
          name="keywords"
          content="404, page not found, Christian Matrimony, True Friend Matrimony, Christian Matchmaking, Error Page, Faith-Based Matrimony, Trusted Christian Matrimony Platform"
        />
        <link rel="canonical" href="https://www.truefriendmatrimony.com/" />
      </Head>
      <section>
        <div className="login pg-404">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>Page not found <b>404</b></h2>
                    <h5>We can't seem to find the page you are looking for.</h5>
                    <Link href="/">
                      <a className="cta-4">Visit home page now</a>
                    </Link>
                  </div>
                  <div className="log-bg"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Custom404;
// export default dynamic(() => Promise.resolve(Custom404), { ssr: false });
