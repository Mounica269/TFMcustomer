import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

const BottomBanner = () => {
    return (
        <>
         <style>{`
        .fot-ban-inn .lhs::before {
          content: "";
          position: absolute;
          background: url('/frontend/images/login-bg.png');
          width: 100%;
          height: 62px;
          bottom: 0;
          left: 0;
          right: 0;
          background-size: 325px;
          animation: 4000s linear 0s infinite normal both movehor;
        }
      `}</style>
        <section>
        <div className="str count">
            <div className="container">
                <div className="row">
                    <div className="fot-ban-inn">
                        <div className="lhs">
                            <h2>Find your Perfect Match now</h2>
                            <p>Find Your Desired Match by Religion, Community, Language, Location, or Nearby.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
       );
};

export default BottomBanner;
