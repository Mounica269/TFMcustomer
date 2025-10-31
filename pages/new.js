import { Fragment, useEffect, useState,useRef } from "react";

import Head from "next/head";


const New = () => {

    const [blog, setBlog] = useState([]);

 

  

   
    
    const scrollToNextSection = (e) => {
        e.preventDefault(); 
    
        
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth' 
        });
    };

    
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
                const result = await res.json();
                console.log("first", result);
                setBlog(result.response); // Ensure 'result' is an array of items
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
                const result = await res.json();
                console.log("Fetched blogs:", result);

                // Check if result.response is valid and sort by created_at in descending order
                if (result.response && Array.isArray(result.response)) {
                    const sortedBlogs = result.response
                        // .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 5);
                    setRecentBlog(sortedBlogs); // Set the sorted blogs to state
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <>
<Head>

  <title> True Friend Matrimony | Trusted Christian Matrimonial Site -  Christian Matrimony</title>
  
  <meta 
    name="description" 
    content="Find your perfect Christian life partner with True Friend Matrimony. Explore affordable membership plans, verified Christian profiles, and premium matchmaking services trusted by thousands of families." 
  />
  
  <meta 
    name="keywords" 
    content="Christian Matrimony, Christian Matrimonial Site, Christian Bride, Christian Groom, Christian Marriage, Christian Matchmaking, Christian Wedding, Christian Matrimony Plans, Trusted Christian Matrimony, True Friend Matrimony" 
  />
  
  <link rel="canonical" href="https://truefriendmatrimony.com/explore" />

  {/* Open Graph  */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Christian Matrimony | Trusted Christian Matrimonial Site - True Friend Matrimony" />
  <meta property="og:description" content="Join True Friend Matrimony to find verified Christian brides & grooms. Affordable membership plans and personalized matchmaking services for your happy Christian marriage." />
  <meta property="og:url" content="https://truefriendmatrimony.com/explore" />
  <meta property="og:site_name" content="True Friend Matrimony" />

</Head>


            <Fragment>

                <section>
                    <div className="str">
                        <div className="ban-inn ab-ban">
                            <div className="container py-5">
                                <div className="row">
                                    <div className="hom-ban mt-3">
                                        <div className="ban-tit mt-5">
                                            <span><i className="no1">#1</i> Wedding Website</span>
                                            <h1>True Friend Matrimony</h1>
                                            <p>Most Trusted and premium Matrimony Service in the World.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="ab-sec2">
                        <div className="container pt-3">
                            <div className="row">
                                <ul className="choose" >
                                    <li>
                                        <a href="#" onClick={scrollToNextSection}>
                                            <div className="chss">
                                                <img src="/frontend/images/icon/prize.png" alt="Trustworthy" loading="lazy" />
                                                <h4>Search By Religion</h4>
                                                <p>We are a highly authentic, 100% trustworthy matrimony platform. We follow multi-level authentication to ensure that only genuine profiles are provided.</p>
                                            </div>
                                        </a>

                                    </li>
                                    <li>
                                        <a href="#" onClick={scrollToNextSection}>
                                            <div className="chss">
                                                <img src="/frontend/images/icon/rings.png" alt="Better Search and Matches" loading="lazy" />
                                                <h4>Search By Community</h4>
                                                <p>Our algorithms are tuned to provide better search results and matches based on your preferences. Our user interfaces are designed to enable hassle-free navigation to provide relevant matches.</p>
                                            </div>
                                        </a>

                                    </li>
                                    <li>
                                        <a href="#" onClick={scrollToNextSection}>
                                            <div className="chss">
                                                <img src="/frontend/images/icon/trust.png" alt="Explore and connect" loading="lazy" />
                                                <h4>Search By City</h4>
                                                <p>Explore and connect anytime, anywhere with registered users at your ease. Get access to unlimited profiles & share your interest with the one you like.</p>
                                            </div>
                                        </a>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>


                <section>

                    <div class="ab-team pg-abo-ab-team neww_1">
                        <div class="container">
                            <div class="row">
                                <div class="home-tit" style={{ paddingTop: "5px" }}>

                                    <h2><span>OUR Profiles</span></h2>

                                </div>
                                <ul>
                                    <li>
                                        <div>

                                            <img src="/frontend/images/men.png" alt="couples" loading="lazy" />
                                            <h4>John</h4>
                                            <p>Marketing Manager</p>
                                            <ul class="social-light">
                                                <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <img src="/frontend/images/female.png" alt="couples" loading="lazy" />
                                            <h4>Ashley</h4>
                                            <p>Marketing Manager</p>
                                            <ul class="social-light">
                                                <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <img src="/frontend/images/female.png" alt="couples" loading="lazy" />
                                            <h4>Emily</h4>
                                            <p>Creative Manager</p>
                                            <ul class="social-light">
                                                <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                        <img src="/frontend/images/men.png" alt="couples" loading="lazy" />
                                            <h4>Rio</h4>
                                            <p>Client Coordinator</p>
                                            <ul class="social-light">
                                                <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </section>

                <section id="nextSection">

                    <div class="p-5">
                        <div class="container">
                            <div class="row">
                                <div className="home-tit" style={{ paddingTop: "5px" }}>

                                    <h2>
                                        <span>
                                            Quick Search
                                        </span>
                                    </h2>
                                </div>{" "}
                               
                                <div class="col-lg-4 col-md-6 inn" >
                                    <div class="rhs mx-4">
                                        <div class="blog-com-rhs mx-4">
                                            <div class="hot-page2-hom-pre blog-rhs-trends">
                                                <h4>Search By Religion</h4>
                                                {blog.map((item, index) => (
                                                <ul key={index}>
                                                    <li>
                                                        <div class="hot-page2-hom-pre-item city">
                                                            <i class="fa fa-handshake-o big-icon" aria-hidden="true"></i>
                                                            <h5>{item.title}</h5>
                                                        </div>
                                                        <a href="#" class="fclick"></a>
                                                    </li>
                                                  
                                                   
                                                </ul>
                                                    ))}

                                                <a href="#" className="cta-dark">
                                                    <span>Read more</span>
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                              

                                


                                <div class="col-lg-4 col-md-6 inn">
                                    <div class="rhs mx-4">
                                        <div class="blog-com-rhs mx-4">
                                            <div class="hot-page2-hom-pre blog-rhs-trends">
                                                <h4>Search By Community</h4>
                                                {blog.map((item, index) => (
                                                <ul key={index}>
                                                    <li>
                                                        <div class="hot-page2-hom-pre-item city">
                                                            <i class="fa fa-users big-icon" aria-hidden="true"></i>
                                                            <h5>{item.title}</h5>
                                                        </div>
                                                        <a href="#" class="fclick"></a>
                                                    </li>
                                               
                                                </ul>
                                                  ))}

                                                <a href="#" className="cta-dark">
                                                    <span>Read more</span>
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 inn">
                                    <div class="rhs mx-4">
                                        <div class="blog-com-rhs mx-4">
                                            <div class="hot-page2-hom-pre blog-rhs-trends">
                                                <h4>Search by City</h4>
                                                {blog.map((item, index) => (
                                                <ul key={index}>
                                                    <li>
                                                        <div class="hot-page2-hom-pre-item city">
                                                            <i class="fa fa-map-marker big-icon" aria-hidden="true"></i>
                                                            <h5>{item.title}</h5>
                                                        </div>
                                                        <a href="#" class="fclick"></a>
                                                    </li>
                                                
                                                </ul>
                                                 ))}

                                                <a href="#" className="cta-dark">
                                                    <span>Read more</span>
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>








            </Fragment>
        </>
    );
};

export default New;



// import { Fragment, useEffect, useState } from "react";

// import Head from "next/head";


// const New = () => {

//     const [blog, setBlog] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
//                 const result = await res.json();
//                 console.log("first", result);
//                 setBlog(result.response); // Ensure 'result' is an array of items
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//       useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); // Replace with your API endpoint
//                 const result = await res.json();
//                 console.log("Fetched blogs:", result);

//                 // Check if result.response is valid and sort by created_at in descending order
//                 if (result.response && Array.isArray(result.response)) {
//                     const sortedBlogs = result.response
//                         // .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//                         .slice(0, 5);
//                     setRecentBlog(sortedBlogs); // Set the sorted blogs to state
//                 } else {
//                     console.error("Unexpected response format:", result);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <>
//             <Head>
//                 <title>Explore | True Friend Matrimony</title>
//                 <meta name="description" content="Explore our affordable pricing plans to find your perfect match with True Friend Matrimony. Upgrade to enjoy exclusive features and personalized matchmaking services." />
//                 <meta name="keywords" content="Pricing Plans , Upgrade, True Friend Matrimony" />
//             </Head>

//             <Fragment>

//                 <section>
//                     <div className="str">
//                         <div className="ban-inn ab-ban">
//                             <div className="container py-5">
//                                 <div className="row">
//                                     <div className="hom-ban mt-3">
//                                         <div className="ban-tit mt-5">
//                                             <span><i className="no1">#1</i> Wedding Website</span>
//                                             <h1>True Friend Matrimony</h1>
//                                             <p>Most Trusted and premium Matrimony Service in the World.</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <section>
//                     <div className="ab-sec2">
//                         <div className="container pt-3">
//                             <div className="row">
//                                 <ul className="choose" >
//                                     <li>
//                                         <a href="">
//                                             <div className="chss">
//                                                 <img src="/frontend/images/icon/prize.png" alt="Trustworthy" loading="lazy" />
//                                                 <h4>Search By Religion</h4>
//                                                 <p>We are a highly authentic, 100% trustworthy matrimony platform. We follow multi-level authentication to ensure that only genuine profiles are provided.</p>
//                                             </div>
//                                         </a>

//                                     </li>
//                                     <li>
//                                         <a href="#">
//                                             <div className="chss">
//                                                 <img src="/frontend/images/icon/rings.png" alt="Better Search and Matches" loading="lazy" />
//                                                 <h4>Search By Community</h4>
//                                                 <p>Our algorithms are tuned to provide better search results and matches based on your preferences. Our user interfaces are designed to enable hassle-free navigation to provide relevant matches.</p>
//                                             </div>
//                                         </a>

//                                     </li>
//                                     <li>
//                                         <a href="#">
//                                             <div className="chss">
//                                                 <img src="/frontend/images/icon/trust.png" alt="Explore and connect" loading="lazy" />
//                                                 <h4>Search By City</h4>
//                                                 <p>Explore and connect anytime, anywhere with registered users at your ease. Get access to unlimited profiles & share your interest with the one you like.</p>
//                                             </div>
//                                         </a>

//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </section>


//                 <section>

//                     <div class="ab-team pg-abo-ab-team neww_1">
//                         <div class="container">
//                             <div class="row">
//                                 <div class="home-tit" style={{ paddingTop: "5px" }}>

//                                     <h2><span>OUR Profiles</span></h2>

//                                 </div>
//                                 <ul>
//                                     <li>
//                                         <div>

//                                             <img src="/frontend/images/Handler (1).html" alt="couples" loading="lazy" />
//                                             <h4>John</h4>
//                                             <p>Marketing Manager</p>
//                                             <ul class="social-light">
//                                                 <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
//                                             </ul>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <div>
//                                             <img src="/frontend/images/Handler.html" alt="couples" loading="lazy" />
//                                             <h4>Ashley</h4>
//                                             <p>Marketing Manager</p>
//                                             <ul class="social-light">
//                                                 <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
//                                             </ul>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <div>
//                                             <img src="/frontend/images/Handler.html" alt="couples" loading="lazy" />
//                                             <h4>Emily</h4>
//                                             <p>Creative Manager</p>
//                                             <ul class="social-light">
//                                                 <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
//                                             </ul>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <div>
//                                             <img src="/frontend/images/Handler (1).html" alt="couples" loading="lazy" />
//                                             <h4>Rio</h4>
//                                             <p>Client Coordinator</p>
//                                             <ul class="social-light">
//                                                 <li><a href="#!"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
//                                                 <li><a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
//                                             </ul>
//                                         </div>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>


//                 </section>

//                 <section>
//                     <div class="p-5">
//                         <div class="container">
//                             <div class="row">
//                                 <div className="home-tit" style={{ paddingTop: "5px" }}>

//                                     <h2>
//                                         <span>
//                                             Quick Search
//                                         </span>
//                                     </h2>
//                                 </div>{" "}
                               
//                                 <div class="col-lg-4 col-md-6 inn" >
//                                     <div class="rhs mx-4">
//                                         <div class="blog-com-rhs mx-4">
//                                             <div class="hot-page2-hom-pre blog-rhs-trends">
//                                                 <h4>Search By Religion</h4>
                                               
//                                                 <ul>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-handshake-o big-icon" aria-hidden="true"></i>
//                                                             <h5>Hindu</h5>
                                                          
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-handshake-o big-icon" aria-hidden="true"></i>
                                                           
//                                                             <h5>christian</h5>
                                                          
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-handshake-o big-icon" aria-hidden="true"></i>
                                                          
//                                                             <h5>Muslim</h5>
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
                                                  
                                                   
//                                                 </ul>
                                                   

//                                                 <a href="#" className="cta-dark">
//                                                     <span>Read more</span>
//                                                 </a>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
                              

                                


//                                 <div class="col-lg-4 col-md-6 inn">
//                                     <div class="rhs mx-4">
//                                         <div class="blog-com-rhs mx-4">
//                                             <div class="hot-page2-hom-pre blog-rhs-trends">
//                                                 <h4>Search By Community</h4>
                                              
//                                                 <ul>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-users big-icon" aria-hidden="true"></i>
//                                                             <h5>Hindu</h5>
                                                           
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-users big-icon" aria-hidden="true"></i>
                                                        
//                                                             <h5>christian</h5>
                                                            
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-users big-icon" aria-hidden="true"></i>
                                                         
//                                                             <h5>Muslim</h5>
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
                                               
//                                                 </ul>
                                                 

//                                                 <a href="#" className="cta-dark">
//                                                     <span>Read more</span>
//                                                 </a>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div class="col-lg-4 col-md-6 inn">
//                                     <div class="rhs mx-4">
//                                         <div class="blog-com-rhs mx-4">
//                                             <div class="hot-page2-hom-pre blog-rhs-trends">
//                                                 <h4>Search by City</h4>
                                                
//                                                 <ul>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-map-marker big-icon" aria-hidden="true"></i>
//                                                             <h5>Madurai</h5>
                                                           
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>

//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-map-marker big-icon" aria-hidden="true"></i>
                                                           
//                                                             <h5>Chennai</h5>
                                                        
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
//                                                     <li>
//                                                         <div class="hot-page2-hom-pre-item city">
//                                                             <i class="fa fa-map-marker big-icon" aria-hidden="true"></i>
                                                        
//                                                             <h5>Bangalore</h5>
//                                                         </div>
//                                                         <a href="#" class="fclick"></a>
//                                                     </li>
                                                
//                                                 </ul>
                                                

//                                                 <a href="#" className="cta-dark">
//                                                     <span>Read more</span>
//                                                 </a>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>


//                             </div>
//                         </div>
//                     </div>
//                 </section>








//             </Fragment>
//         </>
//     );
// };

// export default New;

