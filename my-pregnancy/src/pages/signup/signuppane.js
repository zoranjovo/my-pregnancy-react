import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { dotWave } from 'ldrs';
import { customWarningNotif, serverErrorNotif } from '../../global-components/notify';
import { saveToken } from '../../util/auth';


import { registerReq } from '../../util/apireq';
import buttons from '../../css/buttons.module.css';
import styles from './signuppage.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SignUpPane(){
  const navigate = useNavigate();
  dotWave.register();

  const query = useQuery();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [boxChecked, setBoxChecked] = useState(false);
  
  const [role, setRole] = useState('');

  const [errorMsg, setErrorMsg] = useState('Error')
  const [errorMsgShown, setErrorMsgShown] = useState(false);

  const [loadingShown, setLoadingShown] = useState(false);

  const [checkmarkShown, setCheckmarkShown] = useState(false);

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
    customWarningNotif(txt);
    setLoadingShown(false);
    setErrorMsg(txt);
    setErrorMsgShown(true);
  }

  const signupBtn = async() => {
    // validations
    if(!role){ return displayErr('Please select a role'); }
    if(!firstname){ return displayErr('Please enter your first name'); }
    if(!lastname){ return displayErr('Please enter your last name'); }
    if(!email){ return displayErr('Please enter your email'); }
    if(!isValidEmail(email)){ return displayErr('Please enter a valid email'); }
    if(!password){ return displayErr('Please enter a password'); }
    if(password.length < 8){ return displayErr('Password needs to have 8 or more characters'); }
    if(!passwordConfirm){ return displayErr('Please confirm your password'); }
    if(password !== passwordConfirm){ return displayErr('Passwords do not match'); }
    if(!boxChecked){ return displayErr('Please agree to the terms and conditions'); }
    
    console.log('sending sign up request');
    setErrorMsgShown(false);
    setLoadingShown(true);
    const response = await registerReq(role, firstname, lastname, email, password);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      setLoadingShown(false);
      setCheckmarkShown(true);
      saveToken(response.data.token);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
      return
    } else if(response.response.status === 409){
      return displayErr("Email already in use");
      
    } else if(response.response.status === 500){
      return displayErr("Email already in use");
    }
  }


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue">
          Create an account
        </h2>
      </div>

      {checkmarkShown ? (
        <div className={styles.checkmarkDiv}>
          <div>
            <img src='/assets/checkmark.png' alt='checkmark symbol'></img>
          </div>
          <h2>Success! Redirecting to home page...</h2>
        </div>
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              >
                <option value="">Select a role</option>
                <option value="pregnant">Pregnant Woman</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
      
          <div>
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  onChange={(e) => setLastname(e.target.value)}
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
      )}
    </div>
  )
}

export default SignUpPane;
