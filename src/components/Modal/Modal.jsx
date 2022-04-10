import React from "react";
import ReactDOM from "react-dom";
import "../../styles/Modal.css";

const Modal = props => {
    return ReactDOM.createPortal(
        <div className={props.show ? "modal enter-done" : "modal"} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header line-wrapper">
                    <h4 className="modal-title">{props.title}</h4>
                    <button onClick={props.onClose} className="btn-modal-close">
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <div className="modal-body">{props.children}</div>
                {/* <div className="modal-footer">
                    <button onClick={props.onClose} className="button">
                        Close
                    </button>
                </div> */}
            </div>
        </div>
        ,
        document.getElementById("root")
    );
};

export default Modal;