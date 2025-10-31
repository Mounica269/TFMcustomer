import { Modal } from "react-bootstrap";

const ModalCommon = (props) => {
    const { show, size, handleClose, modalTitle, children, closeButton } = props;
    return (
        <Modal
            animation={true}
            centered
            size={size}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton={closeButton}>
                <Modal.Title>{modalTitle}</Modal.Title>
                {!closeButton && (
                    <button type="button" onClick={handleClose} className="close">
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button>
                )}
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default ModalCommon;
