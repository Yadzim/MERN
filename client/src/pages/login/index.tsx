import React from 'react';
import useForm from 'hook/useForm';
import axios from "axios";
import { URL } from 'config/utils';
import './style.scss';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';



const Login: React.FC = (): JSX.Element => {
  const form = useForm();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (form.getFieldsValue()) {
      try {
        const res = await axios.post(`${URL}/login`, JSON.stringify(form.getFieldsValue()), {
          headers: {
            // "Access-Control-Allow-Origin": "*"
          }
        });
        if (res.data?.status === 1) {
          form.resetFields();
          console.log("Created user");
        }
      } catch (arr) {
        console.log(arr);
      }
    } else {
      console.log("Please fill inpul");
    }
  }

  console.log("login");
  return (
    <>
      <Link to="/" className='absolute left-6 top-0' >
        <button className='hover:text-blue-400 mt-4 d-f mx-auto' > <FaArrowLeft className='me-2' />Back home</button>
      </Link>
      <div className="px-3 max-w-[1024px] mx-auto">
        <section className="h-screen">
          <div className="h-full">
            <div
              className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div
                className="max-md:hidden shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample image" />
              </div>

              <div className="mb-12 w-10/12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form>
                  <div
                    className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="mb-0 mr-4 text-lg">Sign in with</p>

                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mx-1 h-9 w-9 rounded-full bg-[#3B71CA] uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mx-1 h-9 w-9 rounded-full bg-[#3B71CA] uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mx-1 h-9 w-9 rounded-full bg-[#3B71CA] uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p
                      className="mx-4 mb-0 text-center font-semibold">
                      Or
                    </p>
                  </div>

                  <div className="mb-6 text-start" data-te-input-wrapper-init>
                    <label htmlFor="login">Email address</label>
                    <input
                      name='email'
                      className="e-input block w-full mt-1"
                      id="login"
                      placeholder="Email address" />
                  </div>
                  <div className="mb-6 text-start" data-te-input-wrapper-init>
                    <label htmlFor="password">Password</label>
                    <input
                      name='password'
                      className="e-input block w-full mt-1"
                      id="password"
                      placeholder="Password" />
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue checked:bg-[#3B71CA] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue dark:checked:bg-[#3B71CA] dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        value=""
                        id="exampleCheck2" />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="exampleCheck2">
                        Remember me
                      </label>
                    </div>

                    <Link to="/forgot_password" className='hover:text-blue-600' >Forgot password?</Link>
                  </div>

                  <div className="text-center lg:text-left">
                    <Link to={"/"}>
                      <button
                        type="button"
                        // className="inline-block rounded bg-[#3B71CA] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        className="e-btn w-full py-1 text-lg bg-element"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        Login
                      </button>
                    </Link>

                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                      Don't have an account?&nbsp;&nbsp;
                      <Link
                        to="/register"
                        className="text-[#E84441] transition duration-150 ease-in-out hover:text-red-400 focus:text-red-400 active:text-red-700"
                      >Register</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
    // <div className="login-wrapper">
    //   <div className="login-card e-card-shadow" >
    //     <img src="https://i.pinimg.com/564x/59/f0/23/59f02346788d54e19f01067785ee7f87.jpg" alt="" />
    //     {/* <img src="https://i.pinimg.com/564x/20/fc/f3/20fcf3c173392830e9100a9358a87366.jpg" alt="" /> */}
    //     {/* <img src="https://i.pinimg.com/564x/3c/98/58/3c9858e2f218d745100757704786b71a.jpg" alt="" /> */}
    //     {/* <img src="https://i.pinimg.com/564x/af/8d/3b/af8d3b8082c307f8adddc854cd8d2f7c.jpg" alt="" /> */}
    //     {/* <img src="https://i.pinimg.com/564x/48/81/1c/48811c6af1967e715c4fe3b374a8d253.jpg" alt="" /> */}
    //     {/* <img src="https://i.pinimg.com/564x/84/be/26/84be26da51afc377c3121ea82b2fc9af.jpg" alt="" /> */}
    //     <div className="login-card2">
    //       <form ref={form.ref} onSubmit={onSubmit} className='w-full'>
    //         <div className="form-item">
    //           <span className="label">Username</span>
    //           <input name="login" type="text" className="e-input w-full" placeholder="Input login ..." />
    //         </div>
    //         <div className="form-item mt-4">
    //           <span className="label">Password</span>
    //           <input name="password" type="password" className="e-input w-full" placeholder="Input password ..." />
    //         </div>
    //         {/* <div className="d-f justify-content-end"> */}
    //         <button className="e-btn d-block w-full mt-5 px-3 h_2-5" type="submit">Login</button>
    //         {/* </div> */}
    //       </form>
    //     </div>
    //   </div>
    // </div>




  )
}
export default Login