import { Carousel } from "react-bootstrap";
import Head from "next/head";

const TrueLove = () => {
    const couples = [
        { id: 1, image: "/frontend/images/couples/1.jpg", name: "Dany & July", location: "New York" },
        { id: 2, image: "/frontend/images/couples/2.jpg", name: "Dany & July", location: "New York" },
        { id: 3, image: "/frontend/images/couples/3.jpg", name: "Dany & July", location: "New York" },
        { id: 4, image: "/frontend/images/couples/4.jpg", name: "Dany & July", location: "New York" },
        { id: 5, image: "/frontend/images/couples/1.jpg", name: "Dany & July", location: "New York" },
        { id: 6, image: "/frontend/images/couples/11.jpg", name: "Dany & July", location: "New York" },
        { id: 7, image: "/frontend/images/couples/4.jpg", name: "Dany & July", location: "New York" },
        { id: 8, image: "/frontend/images/couples/3.jpg", name: "Dany & July", location: "New York" }
    ];

    // Group couples into sets of 4 for each carousel item
    const groupedCouples = [];
    for (let i = 0; i < couples.length; i += 4) {
        groupedCouples.push(couples.slice(i, i + 4));
    }

    return (
        <>
          <Head>
    <title>TrueFriend Matrimony | Christian Matrimony</title>
     <meta
        name="description"
        content="Read real Christian matrimony success stories of couples who found their perfect life partner through TrueFriend Matrimony. Join the most trusted Christian marriage site in India."
    />
     <meta
        name="keywords"
        content="Christian Matrimony, Matrimony Success Stories, Christian Marriage Success, Christian Bride and Groom, Christian Matchmaking, Real Love Stories, Trusted Christian Matrimony Site, Christian Matrimony India, TrueFriend Matrimony, Best Christian Matrimony Platform"
    />
    <link rel="canonical" href="https://www.truefriendmatrimony.com" />

    {/* Open Graph  */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="TrueFriend Matrimony" />
    <meta property="og:title" content="Christian Matrimony Success Stories | TrueFriend Matrimony" />
    <meta
        property="og:description"
        content="Discover real Christian matrimony success stories. Join True Friend Matrimony and find your perfect match today."
    />
    <meta property="og:url" content="https://www.truefriendmatrimony.com" />


</Head>


            <section>
                <div className="hom-couples-all">
                    <div className="container">
                        <div className="row">
                            <div className="home-tit">
                                <p>Trusted brand</p>
                                <h2><span>Recent Couples</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="hom-coup-test">
                        <Carousel interval={3000} indicators={false} controls={true}>
                            {groupedCouples.map((group, index) => (
                                <Carousel.Item key={index}>
                                    <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
                                        {group.map(couple => (
                                            <div className="col-md-3" key={couple.id} style={{ paddingRight: 0, paddingLeft: 0 }}>
                                                <div className="hom-coup-box">
                                                    <span className="leaf"></span>
                                                    <img src={couple.image} alt={couple.name} loading="lazy" />
                                                    <div className="bx">
                                                        <h4>{couple.name} <span>{couple.location}</span></h4>
                                                        <a href="#" className="sml-cta cta-dark">View more</a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrueLove;
