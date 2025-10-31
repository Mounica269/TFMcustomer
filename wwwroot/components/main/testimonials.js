import { useEffect } from "react";
import Head from "next/head";


const Testimonials = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.animate');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(entry.target.getAttribute('data-ani'));
                }
            });
        });

        elements.forEach(element => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    return (
        <>
          <Head>
    <title>Christian Matrimony Process | TrueFriend Matrimony</title>
    <meta
        name="description"
        content="Learn the step-by-step process of Christian Matrimony at TrueFriend Matrimony. Register, search trusted profiles, connect meaningfully, and find your God-centered life partner easily."
    />
    <meta
        name="keywords"
        content="Christian matrimony process, How Christian matrimony works, find Christian life partner, Christian marriage steps, Christian matchmaking, True Friend Matrimony guide, Christian wedding website, Christian Marriage Steps, How Christian Matrimony Works, Find Christian Life Partner, Trusted Christian Matrimonial Site, Christian Matchmaking Steps, TrueFriend Matrimony Guide, Christian Wedding Platform, Christian Matrimony India, Best Christian Matrimony Process ,Christian Matrimony ,TrueFriend Matrimony  "
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="TrueFriend Matrimony" />
    <meta property="og:title" content="Christian Matrimony Process | TrueFriend Matrimony" />
    <meta
        property="og:description"
        content="Discover how True Friend Christian Matrimony helps you find your life partner. Follow our simple steps to register, search, connect, and get married with ease."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com" />

</Head>


            <section>
                {/* <div className="wedd-tline">
            <div className="container">
                <div className="row">
                    <div className="home-tit">
                        <p>Moments</p>
                        <h2><span>How it works</span></h2>
                    </div>
                    <div className="inn">
                        <ul>
                            <li>
                                <div className="tline-inn">
                                <div className="tline-con animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                        <img src="/frontend/images/icon/rings.png" alt="" loading="lazy"/>
                                    </div>
                                    <div className="tline-con_img animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                        <h5>Register</h5>
                                       
                                        <p>Find Your Amazing Soulmate Today!</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="tline-inn tline-inn-reve">
                                <div className="tline-con animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                        <h5>Find your Match</h5>
                                        
                                        <p>Find True Love Through True Friend Matrimony</p>
                                    </div>
                                    <div className="tline-con_img animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                        <img src="/frontend/images/icon/wedding-2.png" alt="" loading="lazy"/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="tline-inn">
                                <div className="tline-con animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                        <img src="/frontend/images/icon/love-birds.png" alt="" loading="lazy"/>
                                    </div>
                                    <div className="tline-con_img animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                        <h5>Send Interest</h5>
                                        
                                        <p>Search Through Matching Profiles</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="tline-inn tline-inn-reve">
                                <div className="tline-con animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                        <h5>Get Profile Information</h5>
                                        
                                        <p>Find Your Desired Match by Religion, Community, Language, Location, or Nearby.</p>
                                    </div>
                                    <div className="tline-con_img animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                        <img src="/frontend/images/icon/network.png" alt="" loading="lazy"/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="tline-inn">
                                <div className="tline-con animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                        <img src="/frontend/images/icon/chat.png" alt="" loading="lazy"/>
                                    </div>
                                    <div className="tline-con_img animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                        <h5>Start Meetups</h5>
                                        
                                        <p>Reach out and Initiate Conversations.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="tline-inn tline-inn-reve">
                                <div className="tline-con animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                        <h5>Get Married</h5>
                                        
                                        <p>Plan your journey towards a beautiful future together.</p>
                                    </div>
                                    <div className="tline-con_img animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                        <img src="/frontend/images/icon/wedding-couple.png" alt="" loading="lazy" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> */}
                <div class="wedd-tline">
                    <div class="container">
                        <div class="row">
                            <div class="home-tit">
                                <p>Moments</p>
                                <h2><span>How it works</span></h2>

                            </div>
                            <div class="inn">
                                <ul>
                                    <li>
                                        <div class="tline-inn">
                                            <div class="tline-im animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                                <img src="/frontend/images/icon/rings.png"
                                                    alt="Illustration of wedding rings symbolizing registration"
                                                    loading="lazy" />
                                            </div>
                                            <div class="tline-con animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                                <h5>Register</h5>

                                                <p>Find Your Amazing Soulmate Today!</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tline-inn tline-inn-reve">
                                            <div class="tline-con animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                                <h5>Find your Match</h5>

                                                <p>Found True Love Through True Friend Matrimony</p>
                                            </div>
                                            <div class="tline-im animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                                <img src="/frontend/images/icon/wedding-2.png"
                                                    alt="Illustration of couple representing finding your match"
                                                    loading="lazy" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tline-inn">
                                            <div class="tline-im animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                                <img src="/frontend/images/icon/love-birds.png"
                                                    alt="Illustration of love birds representing sending interest"
                                                    loading="lazy" />
                                            </div>
                                            <div class="tline-con animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                                <h5>Send Interest</h5>

                                                <p>Search Through Matching Profiles</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tline-inn tline-inn-reve">
                                            <div class="tline-con animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                                <h5>Get Profile Information</h5>

                                                <p>Find Your Desired Match by Religion, Community, Language, Location, or Nearby.</p>
                                            </div>
                                            <div class="tline-im animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                                <img src="/frontend/images/icon/network.png"
                                                    alt="Illustration of network showing profile information access"
                                                    loading="lazy" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tline-inn">
                                            <div class="tline-im animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                                <img src="/frontend/images/icon/chat.png"
                                                    alt="Illustration of chat icon symbolizing starting conversations"
                                                    loading="lazy" />
                                            </div>
                                            <div class="tline-con animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                                <h5>Start Meetups</h5>

                                                <p>Reach out and Initiate Conversations.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="tline-inn tline-inn-reve">
                                            <div class="tline-con animate animate__animated animate__slower" data-ani="animate__fadeInUp">
                                                <h5>Getting Marriage</h5>

                                                <p>Plan your journey towards a beautiful future together.</p>
                                            </div>
                                            <div class="tline-im animate animate__animated animate__slow" data-ani="animate__fadeInUp">
                                                <img src="/frontend/images/icon/wedding-couple.png"
                                                    alt="Illustration of wedding couple representing getting married"
                                                    loading="lazy" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Testimonials;