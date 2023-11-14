import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {TbMessageCheck} from "react-icons/tb";
import { FaArrowLeft } from 'react-icons/fa';
import "../style.scss"

const SmsCode: React.FC = (): JSX.Element => {

  const ref1: any = useRef();
  const ref2: any = useRef();
  const ref3: any = useRef();
  const ref4: any = useRef();

  return (
    <>
      <div className='sms-code' >
        <form>
          {/* <img src={"img"} style={{ width: "5rem", marginBottom: "1rem" }} alt="massage" /> */}
          <TbMessageCheck className="text-6xl mx-auto text-blue-500" />
          <h1 style={{marginTop: "1.5rem", marginBottom: "1rem"}} >Check your email address</h1>
          <p className='text-xl' >We sent a verification link to olivia@untitledui.com</p>
          <div className='flex-center gap-4 my-6' >
            <input className='e-input' onChange={() => ref1.current.focus()} />
            <input className='e-input' ref={ref1} onChange={() => ref2.current.focus()} />
            <input className='e-input' ref={ref2} onChange={() => ref3.current.focus()} />
            <input className='e-input' ref={ref3} onChange={() => ref4.current.focus()} />
          </div>
          <Link to={"/"}>
            <button className='e-btn bg-element w-full' type="button" ref={ref4}>Verify email</button>
          </Link>

          <div className="text-start-">
            <p className='mt-6' >Didn’t receive the code?&nbsp;&nbsp;<Link to="#" className='text-blue-400' >Click to resend</Link></p>
            <Link to="/login">
              <button className='hover:text-blue-400 mt-4 d-f mx-auto' > <FaArrowLeft className='me-2' /> Back to log in</button>
            </Link>
          </div>

        </form>
      </div>
    </>
  );
};

export default SmsCode;

// https://fakestoreapi.com/