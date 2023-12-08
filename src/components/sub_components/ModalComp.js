import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../css/modal.css';

function ModalComp(props) {
    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        setShow(false);
        if (props.toggleModal) {
            props.toggleModal(); // Call the toggleModal function from the parent component
        }
    };

    return (
        <div>
            <Modal
            className='warning-modal' 
            show={show} 
            onHide={handleClose}>
                <Modal.Header closeButton>
                    {props.heading && <Modal.Title>{props.heading}</Modal.Title>}
                </Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalComp;
