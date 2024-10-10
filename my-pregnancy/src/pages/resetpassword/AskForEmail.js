import React, { useState } from 'react';
import { dotWave } from 'ldrs'

import { resetPassword } from '../../util/apireq';
import styles from './resetpasswordpage.module.css'

function AskForEmail(){
  dotWave.register();

  const [email, setEmail] = useState('');

  const [errorMsg, setErrorMsg] = useState('Error')
  const [errorMsgShown, setErrorMsgShown] = useState(false);

  const [successMsgShown, setSuccessMsgShown] = useState(false);

  const [loadingShown, setLoadingShown] = useState(false);



  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function resetBtn(){
    if(!isValidEmail(email)){
      setErrorMsg('Please enter a valid email')
      setErrorMsgShown(true)
      return
    }
    setErrorMsgShown(false)
    setLoadingShown(true)
    resetPassword(email, resetPasswordCallback)
  }

  function resetPasswordCallback(response){
    //TODO
    //this
    if(response.error){
        setErrorMsg(response.errorMsg)
        setErrorMsgShown(true)
        setLoadingShown(false)
        return
    }
    setSuccessMsgShown(true)

  }


  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
            </label>
            <div className="mt-2">
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
            </div>
          </div>

          <div className={`flex items-center justify-center ${errorMsgShown ? '' : 'hidden'}`}>
              <h3 className={`text-red-500`}>{errorMsg}</h3>
          </div>
          <div className={`flex items-center justify-center ${loadingShown ? '' : 'hidden'}`}>
              <l-dot-wave
                  size="47"
                  speed="1" 
                  color="#f06292" 
                  >
              </l-dot-wave>
          </div>

          <div className={`${loadingShown ? 'hidden' : ''}`}>
            <button
                onClick={resetBtn}
                className={styles.resetBtn}
            >
              Reset
            </button>
          </div>
          <div className={`flex items-center justify-center ${successMsgShown ? '' : 'hidden'}`}>
            <h3>Success! Please check your email.</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskForEmail;