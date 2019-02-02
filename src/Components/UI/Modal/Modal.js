import React from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <>
            <div
                className={classes.Modal}
                style={{
                    transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.showModal ? '1' : '0'
                }}>
                <span className={classes.closeButton} onClick={props.closeModal}>X</span>
                {props.children}
            </div>
            <Backdrop show={props.showModal} closeModal={props.closeModal} />
        </>
    )
}

export default Modal;