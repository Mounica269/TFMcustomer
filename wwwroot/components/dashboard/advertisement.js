import { Col } from "react-bootstrap";
import { connect } from "react-redux";

const Advertisement = (props) => {
    const { token, authUser, authProfile, commonData } = props;

    return <Col lg={2} md={12} className="mb-5"></Col>;
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.authProfile,
    };
};

export default connect(mapStateToProps, null)(Advertisement);
