// Reference: https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
// https://stackabuse.com/how-to-scroll-to-top-in-react-with-a-button-component/
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUp } from "@fortawesome/free-solid-svg-icons";
// import { Button } from './ButtonStyles';
import { Button } from "react-bootstrap";

import dynamic from 'next/dynamic';

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
            /* you can also use 'auto' behaviour
                in place of 'smooth' */
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
    });

    return (
        <>

        <div id="backToTop"
        style={{
            position: "fixed",
            bottom: "30px", 
            right: "30px", 
            zIndex: 1000, 
            transition: "opacity 0.3s ease",
            opacity: visible ? 1 : 0, 
            display: visible ? "block" : "none", 
            background:"#9C295E",
            width:"50px",
            height:"50px",
            borderRadius:"50px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5C288A")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#9C295E")}
        >

            <div className="top arrow" style={{ display: visible ? "inline" : "none" }}>
                <FontAwesomeIcon
                    width={"45px"}
                    height={"25px"}
                   
                    icon={faLevelUp}
                    onClick={scrollToTop}
                    style={{ display: visible ? "inline" : "none", cursor: "pointer",color:"#fff",marginTop:"10px",marginLeft:"3px"}}
                    
                />
            </div>
        </div>
        </>
    );
};

export default ScrollButton;
// export default dynamic(() => Promise.resolve(ScrollButton), { ssr: false });

