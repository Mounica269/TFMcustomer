import { useEffect, Fragment, useState } from "react";
import { connect, useSelector } from "react-redux";
import PreContainer from "./pre-container";
import PostContainer from "./post-container";
import HeaderBeforeLogin from "../common/header-before-login";
import HeaderAfterLogin from "../common/header-after-login";
import Footer from "../common/footer";
import { CONST, localStorage, utils } from "core/helper";
import {
    loginAction,
    logoutAction,
    commonDataAction,
    commonSettingsAction,
    tokenAction,
    reloadAction,
} from "core/redux/account/account.action";
import { commonService } from "core/services";
import { useRouter } from "next/router";

const Layout = (props) => {
    const { children, loginAction, commonDataAction, commonSettingsAction, tokenAction, reloadAction } = props;
    const isLoggedIn = useSelector((state) => state.account?.isLoggedIn);
    const token = useSelector((state) => state.account?.tokenAction);
    const reload = useSelector((state) => state.common?.relodaAction);
    const [authToken, setAuthToken] = useState("");

    const router = useRouter();
    const currentPath = router.pathname;

    const commonData = useSelector((state) => state?.common?.commonData);

    async function loadCommonData() {
        if (commonData.length === 0 || commonData.length === undefined) {
            const resp = await commonService.getAllCommonData();
            if (resp && resp.meta.code === 200) {
                const { masterData, settings } = resp.data;
                commonDataAction(masterData);
                commonSettingsAction(settings);
                reloadAction(!reload);
            }
        }
    }

    useEffect(() => {
        loadCommonData();
    }, [authToken]);

    useEffect(() => {
        const checkSessionLogin = () => {
            const token = localStorage.getAuthToken();
            if (!token) return;
            setAuthToken(token);
            tokenAction(token);
            const authUser = localStorage.getAuthUser();
            loginAction(authUser);
        };
        checkSessionLogin();
    }, [isLoggedIn]);

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    // Define routes that should use HeaderBeforeLogin and Footer
    const publicRoutes = ["/", "/about-us","/faq", "/contact-us","/privacy","/terms-and-use","/return-and-cancellation","/register","/blogs","/blogs/[uri]","/success-stories","/success-stories-detail","/plans","/plan-upgrade"];

    const isPublicRoute = publicRoutes.includes(currentPath);

    return (
        <Fragment>
            {isLoggedIn ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
            
           
            {token ? (
                <PostContainer>{children}</PostContainer>
            ) : (
                <PreContainer>{children}</PreContainer>
            )}

       
            {/* {isPublicRoute ? (
                <Footer />
            ) : isLoggedIn ? (
                <FooterAfterLogin />
            ) : ( */}
                <Footer />
            {/* )} */}
        </Fragment>
    );
};

const mapDispatchToProps = {
    loginAction,
    logoutAction,
    commonDataAction,
    commonSettingsAction,
    tokenAction,
    reloadAction,
};

export default connect(null, mapDispatchToProps)(Layout);
