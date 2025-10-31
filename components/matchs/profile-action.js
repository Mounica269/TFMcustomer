import React, { Fragment, useState } from "react";
import { Form, Dropdown, Modal } from "react-bootstrap";
import { utils } from "core/helper";
import { profileService } from "core/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { reloadAction } from "core";
import { connect, useSelector } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons

const validationSchema = Yup.object().shape({
    message: Yup.string(),
});

const ProfileAction = (props) => {
    const { partnerProfileId, reloadAction, dontShow = true, blockProfile = true, profile } = props;
    const reload = useSelector((state) => state?.common?.reloadAction);

    const { handleSubmit, register } = useForm({ resolver: yupResolver(validationSchema) });

    const [modalShow, setModalShow] = useState(false);
    const [blockProfileId, setBlockProfileId] = useState("");

    const handleShowModal = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    const handleDonotShow = async (partnerProfileId) => {
        const resp = await profileService.dontShow(partnerProfileId);
        if (resp && resp.meta.code === 200) {
            reloadAction(!reload);
            utils.showSuccessMsg(resp.meta.message);
        }
    };

    const handleBlockProfile = (partnerProfileId) => {
        handleShowModal();
        setBlockProfileId(partnerProfileId);
    };

    const blockProfileSubmit = async (values) => {
        const resp = await profileService.blockProfile(blockProfileId, values);
        if (resp && resp.meta.code === 200) {
            utils.showSuccessMsg(resp.meta.message);
            handleModalClose();
            reloadAction(!reload);
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <i
            ref={ref}
            onClick={onClick}
            style={{ cursor: "pointer", color: "black" }}
            className="bi bi-list"
        >
            {children}
        </i>
    ));

    return (
        <Fragment>
            {blockProfile && (
                <Dropdown className="m-0 block_dropdown_wrap">
                    <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                    <Dropdown.Menu>
                        {!profile?.isBlocked && (
                            <Dropdown.Item
                                className="px-2 py-2"
                                onClick={() => handleBlockProfile(partnerProfileId)}
                            >
                                Block Profile
                            </Dropdown.Item>
                        )}
                        {dontShow && (
                            <Dropdown.Item
                                className="px-2 py-2"
                                onClick={() => handleDonotShow(partnerProfileId)}
                            >
                                Hide
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                    <Modal show={modalShow} onHide={handleModalClose} size="sm" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>
                               <h6>Block Profile</h6> 
                                </Modal.Title>
                        </Modal.Header>
                        {blockProfileId && (
                            <Form onSubmit={handleSubmit(blockProfileSubmit)} style={{padding:"10px"}}>
                                <h6>Block Reason</h6>
                                <Form.Control as="textarea" {...register("message")} />
                                <div className="connect_now_pop_up mt-2 p-2">
                                    <button type="submit" className="remind cta-dark" style={{padding:"7px"}}>Submit</button>
                                    <button type="button" onClick={handleModalClose} className="cancel cta-dark" style={{padding:"7px",marginLeft:"10px"}}>Cancel</button>
                                </div>
                            </Form>
                        )}
                    </Modal>
                </Dropdown>
            )}
        </Fragment>
    );
};

const mapDispatchToProps = {
    reloadAction,
};

export default connect(null, mapDispatchToProps)(ProfileAction);
