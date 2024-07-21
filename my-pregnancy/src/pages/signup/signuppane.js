import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { dotWave } from 'ldrs'

import { signUp } from '../../util/apireq';
import buttons from '../../css/buttons.module.css';
import styles from './signuppage.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SignUpPane(){
  const navigate = useNavigate();
  dotWave.register()

  const query = useQuery();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [boxChecked, setBoxChecked] = useState(false);

  const [errorMsg, setErrorMsg] = useState('Error')
  const [errorMsgShown, setErrorMsgShown] = useState(false);

  const [loadingShown, setLoadingShown] = useState(false);

  const [emailPrefil, setEmailPrefil] = useState('');
  useEffect(() => {
    const emailParam = query.get('email');
    if (emailParam) {
      setEmailPrefil(emailParam);
      setEmail(emailParam)
    }
  }, [query]);


  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function displayErr(txt){
    setLoadingShown(false)
    setErrorMsg(txt)
    setErrorMsgShown(true)
  }

  function signupBtn(){
    if(!fullname){return displayErr('Please enter your full name')}
    if(!email){return displayErr('Please enter your email')}
    if(!isValidEmail(email)){return displayErr('Please enter a valid email')}
    if(!password){return displayErr('Please enter a password')}
    if(!passwordConfirm){return displayErr('Please confirm your password')}

    if(password !== passwordConfirm){
      displayErr('Passwords do not match')
      return
    }

    if(!boxChecked){
      displayErr('Please agree to the terms and conditions')
      return
    }
    
    console.log('sending sign up request')
    setErrorMsgShown(false)
    setLoadingShown(true)
    signUp(fullname, email, password, signupCallback)
  }

  function signupCallback(response){
    if(response.error){
      setErrorMsg(response.errorMsg)
      setErrorMsgShown(true)
      setLoadingShown(false)
      return
    }

    if(response.status === 200){
      setLoadingShown(false)
      alert('sign up success, user added to database') //temporary msg

      //TODO
      //display the checkmark
      //shortly after redirect to account screen to enter additonal info
    }
    
    //TODO account for other http statuses and consider other error scenarios
  }


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                name="fullname"
                onChange={(e) => setFullname(e.target.value)}
                required
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

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
                defaultValue={emailPrefil}
                required
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="passwordconfirm" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="passwordconfirm"
                name="passwordconfirm"
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
                id="link-checkbox"
                type="checkbox"
                onChange={(e) => setBoxChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                defaultValue={false}
            />
            <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium">
                I agree with the{' '}
                <button
                    onClick={() => navigate('/privacypolicy')}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                    terms and conditions
                </button>
                .
            </label>
          </div>

          <div className={`flex items-center justify-center ${errorMsgShown ? '' : 'hidden'}`}>
              <h3 className="text-red-500">{errorMsg}</h3>
          </div>
          <div className={`flex items-center justify-center ${loadingShown ? '' : 'hidden'}`}>
              <l-dot-wave
                  size="47"
                  speed="1" 
                  color="#f06292" 
                  data-testid="loading-indicator">
              </l-dot-wave>
          </div>

          <div className={`${loadingShown ? 'hidden' : ''}`}>
            <button
              onClick={signupBtn}
              className={`${buttons.stylisedBtn} ${styles.signupBtn}`}
            >
              Sign up
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button
          onClick={() => navigate('/login')}
          className={`${styles.pinkyText} ${styles.pinkyTextHover} font-semibold leading-6`}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
          >
              Log in
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignUpPane;