import React, { useState, useEffect, useRef } from 'react';
import { TypeModalProps } from './type';
import { IoMdClose } from "react-icons/io";
import "./style.scss"

const EModal: React.FC<TypeModalProps> = ({ open, children, header, footer = undefined, className, style, onClose, onOk, onCancel, okText, cancelText, closeIcon }): JSX.Element => {
  const modalRef: any = useRef(null)

  useEffect(() => {
    if(open){

    } else{

    }

  }, [open]);


  return (
    <div className={`e-modal-wrapper ${open ? "e-modal-wrapper-open" : "e-modal-wrapper-close"}`} ref={modalRef} >
      <div className={`e-modal-bg ${open ? "e-modal-bg-open" : "e-modal-bg-close"}`}></div>
      <div className={`e-modal shadow-xl ${open ? "e-modal-open" : "e-modal-close"}`}>
        {header ? <div className="e-modal-header">
          {header}
          {closeIcon === null ? null : <button className="e-text-btn e-modal-close-btn" onClick={onClose} ><IoMdClose /></button>}
        </div> : null}
        <div className="e-modal-content">
          {children}
        </div>
        {footer === null ? null : <div className="e-modal-footer">
          {footer ??
            <div className='default-footer'>
              <button className="e-btn px-2 mr-2" onClick={onCancel ?? onClose} >{cancelText ?? "Cancel"}</button>
              <button className="e-btn px-2" onClick={onOk ?? onClose} >{okText ?? "Ok"}</button>
            </div>
          }
        </div>}
      </div>
    </div>
  );
  return <></>;
};

export default EModal;