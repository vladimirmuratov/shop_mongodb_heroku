import React from "react";
import Modal from 'react-modal';
import {CloseIcon} from "../icons/close-icon/close-icon";
import styles from "./modal-component.module.css";
import {TProduct} from "../../types";
import {EditForm} from "../edit-form/edit-form";

type TProps = {
    modalIsOpen: boolean;
    onClose: () => void;
    product?: TProduct;
    isAdd?: boolean;
}

Modal.setAppElement('#root');
export const ModalComponent: React.FC<TProps> = ({modalIsOpen, onClose, product, isAdd}): JSX.Element => {

    return (
        <Modal
            isOpen={modalIsOpen}
        >
            <CloseIcon onClick={onClose} position={styles.closeIcon_position} size={26}/>
            <EditForm product={product} onClose={onClose} isAdd={isAdd}/>
        </Modal>
    )
}