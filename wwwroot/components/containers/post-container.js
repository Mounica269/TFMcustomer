import { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { profileAction, loginAction } from "core/redux/account/account.action";
import { profileService } from "core/services";
import { useRouter } from "next/router";
import { localStorage, utils } from "core";
import ChatBox from "components/chatbox/chat-list";

const PostContainer = ({ children, profileAction, loginAction }) => {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.account?.isLoggedIn);
    const profile = useSelector((state) => state.account?.profile);
    const reloadProfile = useSelector((state) => state.account?.reloadProfile);

    useEffect(() => {
        const { pathname } = router;
        if (pathname === "/profile-completion" && profile?.completedSteps === 30) {
            router.back();
        }
    }, [profile]);

    useEffect(() => {
        if (isLoggedIn) {
            loadProfile();
        }
    }, [isLoggedIn, reloadProfile]);

    async function loadProfile() {
        const resp = await profileService.getProfile();
        if (resp && resp?.meta?.code === 200) {
            profileAction(resp.data);
        }
    };

    return <Fragment>{children}</Fragment>;
};

const mapDispatchToProps = {
    profileAction,
};

export default connect(null, mapDispatchToProps)(PostContainer);
