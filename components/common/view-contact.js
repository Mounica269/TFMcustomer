import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { profileService } from "core/services";
import ImageFallback from "./image-fallback";
import { reloadAction, utils, viewContactAction } from "core";
import { connect, useSelector } from "react-redux";

const ViewContactIcon = (props) => {
    const { ProfileID, profile, reloadAction, viewContactAction } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);
    const reloadMatches = useSelector((state) => state?.account?.reloadMatches);
    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_PATH;

    const [isProfileInViteShow, setIsProfileInviteShow] = useState(false);
    const [partnerContact, setPartnerContact] = useState(null);

    const handleShowPartnerContact = () => setIsProfileInviteShow(true);
    const handleClosePartnerContact = () => setIsProfileInviteShow(false);

    const partnerViewContact = async () => {
        const resp = await profileService.partnerContactView(ProfileID);
        if (resp && resp.meta.code === 200) {
            handleShowPartnerContact();
            setPartnerContact(resp.data);
            viewContactAction(!reloadMatches);
        } else if (resp?.meta?.code === 1004) {
            //max-contacts-viewed
            utils.showErrMsg(resp.meta?.message);
        } else if (resp?.meta?.code === 1002) {
            //contact-blocked by opposite user
            utils.showErrMsg(resp.meta?.message);
        }
    };

    const handleReqContact = async () => {
        const resp = await profileService.requestContact(ProfileID);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp?.meta?.message);
            // reloadAction(!reload);
            viewContactAction(!reloadMatches);
        }
    };

    const handleAcceptPhoneReq = async () => {
        const resp = await profileService.requestContactAccept(ProfileID);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp?.meta?.message);
            // reloadAction(!reload);
            viewContactAction(!reloadMatches);
        }
    };

    const getPhoneReqSend = (profile) => {
        switch (profile?.phoneReqStatus) {
            case 0:
                return (
                    <button
                        className="btn btn-light request_contact_btn"
                        onClick={handleReqContact}
                    >
                        Request Contact
                    </button>
                );
            case 10:
                return (
                    <button className="btn btn-light request_contact_btn">
                        Request raised <i className="fa fa-check text-success"></i>
                    </button>
                );
            case 20:
                return (
                    <button
                        onClick={handleAcceptPhoneReq}
                        className="btn btn-light request_contact_btn"
                    >
                        Accept Request
                    </button>
                );
        }
    };

    return (
        <Fragment>
            {profile?.isContactViewed ? (
                <button className="btn  request_contact_btn" onClick={partnerViewContact}>
                    Viewed Contact
                </button>
            ) : (
                (profile?.isContactViewed || profile?.phoneReqStatus === 30) && (
                    <Fragment>
                        <button
                            className="btn request_contact_btn"
                            onClick={partnerViewContact}
                        >
                            View Contact
                        </button>
                        {/* {getPhoneReqSend(profile)} */}
                    </Fragment>
                )
            )}
            {/* for-who-can-contact-me-profile */}
            {!profile?.isContactViewed && !profile?.isContactView && getPhoneReqSend(profile)}
            <Modal
                show={isProfileInViteShow}
                onHide={handleClosePartnerContact}
                backdrop="static"
                keyboard={false}
                className="p-0"
            >
                <Modal.Header>
                    <Modal.Title>Contact</Modal.Title>
                    <button type="button" onClick={handleClosePartnerContact} className="close p-2">
                        <span aria-hidden="true">X</span>
                        <span className="sr-only">Close</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3} className="text-left">
                            <div className="photo-image-md-pop">
                                <ImageFallback
                                    width={125}
                                    height={125}
                                    gender={partnerContact?.gender}
                                    alt={
                                        partnerContact?.name && partnerContact?.partnerName
                                          ? `Profile photo of ${partnerContact.name} and ${partnerContact.partnerName}`
                                          : partnerContact?.name
                                          ? `Profile photo of ${partnerContact.name}`
                                          : "Profile photo"
                                      }
                                      
                                    src={
                                        partnerContact?.photos?.length > 0
                                            ? imageDomain +
                                              partnerContact?.photos[0]?.imagePath +
                                              partnerContact?.photos[0]?.images?.small
                                            : imageDomain
                                    }
                                />
                            </div>
                        </Col>
                        <Col md={9} className="text-left">
                            <Row className="form-group">
                                <Col md={12}>
                                    <p>Profile created by Sibling</p>
                                </Col>
                            </Row>
                            {/* <Row className="form-group">
                                <Col md={12}>
                                    <input type="checkbox" /> An invitation to connect has been sent
                                </Col>
                            </Row> */}
                            <Row className="form-group">
                                <Col md={1} className="text-center">
                                    <i className="fa fa-envelope"></i>
                                </Col>
                                <Col md={2} className="text-center">
                                    {partnerContact?.email}
                                </Col>
                            </Row>
                            <Row className="form-group border-bottom">
                                <Col md={1} className="text-center">
                                    <i className="fa fa-mobile"></i>
                                </Col>
                                <Col md={2} className="text-center">
                                    {partnerContact?.mobile}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>Report Phone Number</Col>
                                <Col md={12}>Remaining Contact: {partnerContact?.pendingCount}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <div className="modal-content text-left border-0">
                    <span onClick={handleClosePartnerContact} className="close">
                        &times;
                    </span>
                    
                </div> */}
            </Modal>
        </Fragment>
    );
};

const mapDispathcToProps = {
    reloadAction,
    viewContactAction,
};

export default connect(null, mapDispathcToProps)(ViewContactIcon);
