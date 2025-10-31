import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const InactiveAccount = ({ respMsg }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <Modal show={show} onHide={handleHide} backdrop="static" keyboard={false} className="p-0">
            <div className="modal-content text-left border-0">
                <span onClick={handleHide} className="close">
                    &times;
                </span>
                <Row>
                    <Col md={9}>
                        <div className="d-flex justify-content-center">
                            <p>Account not activated, Please activate from your e-mail</p>
                            <button
                                className="button btn-lg btn-theme full-rounded animated right-icn"
                                type="submit"
                            >
                                <span>
                                    Resend
                                    <i
                                        className="glyph-icon flaticon-hearts"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default InactiveAccount;
