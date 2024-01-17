import React, { useState, useEffect } from 'react';
import { TypeModalProps } from './type';
import { IoMdClose } from "react-icons/io";
import "./style.scss"

const EModal: React.FC<TypeModalProps> = ({ open, children, header, footer, className, style, onClose, onOk, onCancel, okText, cancelText, closeIcon }): JSX.Element => {

  if (open) return (
    <div className="e-modal-wrapper">
      <div className="e-modal shadow-xl">
        {header ? <div className="e-modal-header">
          {header}
          {closeIcon != null ? <button className="e-text-btn e-modal-close-btn" onClick={onClose} ><IoMdClose /></button> : null}
        </div> : null}
        <div className="e-modal-content">
          {children}
        </div>
        {footer != null ? <div className="e-modal-footer">
          {footer ??
            <div className='default-footer'>
              <button className="e-btn px-2 mr-2" onClick={onCancel} >{cancelText ?? "Cancel"}</button>
              <button className="e-btn px-2" onClick={onOk} >{okText ?? "Ok"}</button>
            </div>
          }
        </div> : null}
      </div>
    </div>
  );
  return <></>;
};

export default EModal;