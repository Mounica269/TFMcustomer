import Link from "next/link";
import { connect } from "react-redux";
import { CONST } from "core/helper";
import { Fragment } from "react";
import ProfileSearch from "components/common/profile-search";

const MyAccMatchLinks = (props) => {
    const { token, authUser, commonData, authProfile } = props;

    return (
        <>
             
        <div className="db-nav-list" style={{textAlign:"left"}}>
        <h5>Quick Links</h5>
            <ul>
                <li>
                    <Link href={CONST.MATCH_NEW_PATH}>
                    <a >
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>New Matches
                    </a>
                    </Link>
                </li>
                <li>
                <Link href={CONST.MATCH_MY_PATH} >
                    <a >
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>My Matches
                    </a>
                    </Link>
                </li>
                <li>
                <Link href={CONST.MATCH_NEARBY_PATH}>
                    <a href={CONST.MATCH_NEARBY_PATH}>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>Near Me
                    </a>
                    </Link>
                </li>
                <li>
                <Link href={CONST.SEARCH_BASIC_PATH}>
                    <a >
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>Saved Searches
                    </a>
                    </Link>
                </li>
            </ul>
        </div>
   
        </>
  
    );
};

const mapStateToProps = (state) => {
    return {
        commonData: state?.common?.commonData,
        token: state.account?.token,
        authUser: state.account?.authUser,
        authProfile: state.account?.profile,
    };
};

export default connect(mapStateToProps, null)(MyAccMatchLinks);
