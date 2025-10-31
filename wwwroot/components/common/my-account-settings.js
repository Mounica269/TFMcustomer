import Link from "next/link";
import { CONST } from "core/helper";
import { Fragment } from "react";
import ProfileSearch from "components/common/profile-search";
import { useRouter } from "next/router";

const MyAccSettings = () => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <Fragment>
                <h5>Settings</h5>
                <ul className="list2 list-unstyled2 account_setting_wrapper">
                  <i></i>  <li className={pathname === CONST.MATRI_ACCOUNT_PATH && "account_setting_active_li"}>
                        <Link href={CONST.MATRI_ACCOUNT_PATH}>
                            <a href="#" className={pathname === CONST.MATRI_ACCOUNT_PATH && "account_setting_active"}>
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>  Account Settings
                            </a>
                        </Link>
                    </li>
                    <li className={pathname === CONST.MATRI_ACC_CONTACT_PATH && "account_setting_active_li"}>
                        <Link href={CONST.MATRI_ACC_CONTACT_PATH}>
                            <a href="#" className={pathname === CONST.MATRI_ACC_CONTACT_PATH && "account_setting_active"}>
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>   Contact Filters
                            </a>
                        </Link>
                    </li>
                    <li className={pathname === CONST.MATRI_ACC_EMAIL_ALERT_PATH && "account_setting_active_li"}>
                        <Link href={CONST.MATRI_ACC_EMAIL_ALERT_PATH}>
                            <a href="#" className={pathname === CONST.MATRI_ACC_EMAIL_ALERT_PATH && "account_setting_active"}>
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>  Email / SMS Alerts
                            </a>
                        </Link>
                    </li>
                    <li className={pathname === CONST.MATRI_ACC_PRIVACY_PATH && "account_setting_active_li"}>
                        <Link href={CONST.MATRI_ACC_PRIVACY_PATH}>
                            <a href="#" className={pathname === CONST.MATRI_ACC_PRIVACY_PATH && "account_setting_active"}>
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>    Privacy Options
                            </a>
                        </Link>
                    </li>
                    <li className={pathname === CONST.MATRI_ACC_HIDE_DELETE_PATH && "account_setting_active_li"}>
                        <Link href={CONST.MATRI_ACC_HIDE_DELETE_PATH}>
                            <a href="#" className={pathname === CONST.MATRI_ACC_HIDE_DELETE_PATH && "account_setting_active"}>
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>    Hide / Delete Profile
                            </a>
                        </Link>
                    </li>
                </ul>
           
        </Fragment>
    );
};

export default MyAccSettings;
