import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "assets/images/logo_shop_blue.svg"

const ForgotPassword: React.FC = (): JSX.Element => {

  return (
    <div className="p-4">
      <div className="mx-auto w-[540px] max-md:w-full mt-12">
        <div className="text-center">
        <img src={logo} alt="" className='w-12 mx-auto mb-3' />
        <h2 className='text-2xl mb-8' >Reset your password</h2>
        </div>
        <form action="">
          <div className="mb-6 text-start" data-te-input-wrapper-init>
            <label htmlFor="email">Enter your user account's verified email address and we will send you a password reset link.</label>
            <input
              name='email'
              className="e-input block w-full mt-2"
              id="email"
              placeholder="Enter your email address" />
          </div>
          <Link to={"/sms_code"}>
            <button
              type="button"
              // className="inline-block rounded bg-[#3B71CA] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              className="e-btn w-full py-1 text-lg bg-element"
              data-te-ripple-init
              data-te-ripple-color="light">
              Send password reset email
            </button>
          </Link>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;