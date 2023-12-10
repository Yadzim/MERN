import React, { useState, useEffect } from 'react';
import "./style.scss"

const NoLayout: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {

  return (
    <div className="bg-wrap">
      <div className="layout">
        {children}
      </div>
    </div>
  );
};

export default NoLayout;