import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../util/auth';
import { serverErrorNotif, customSuccessNotif } from '../../global-components/notify';

import { login } from '../../util/apireq';
import buttons from '../../css/buttons.module.css';
import styles from './loginpage.module.css';

function LoginPane(){
  const navigate = useNavigate();
  function handleSignUp(){ navigate('/signup'); }
  function handleForgotPassword(){ navigate('/resetpassword'); }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('Error')
  const [errorMsgShown, setErrorMsgShown] = useState(false);
  const [loadingShown, setLoadingShown] = useState(false);


  // click login btn
  const handleLoginClicked = async () => {
    if(!email){ return displayErr('Please enter your email'); }
    if(!password){ return displayErr('Please enter your password'); }
    

    setErrorMsgShown(false);
    setLoadingShown(true);
    const response = await login(email, password);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      setLoadingShown(false);
      saveToken(response.data.token);
      customSuccessNotif("Successfully logged in");
      return navigate('/home');
    }

    if(response.status === 500 || response.status === 404 || response.status === 401){
      setErrorMsg(response.data);
      setErrorMsgShown(true);
      setLoadingShown(false);
    }
  }

  function displayErr(txt){
    setLoadingShown(false);
    setErrorMsg(txt);
    setErrorMsgShown(true);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue">
        Sign in to your account
      </h2>
    </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6" action="#">
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
                required
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
              <button
                  onClick={handleForgotPassword}
                  className={`${styles.pinkyText} ${styles.pinkyTextHover} font-semibold leading-6`}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Forgot password?
              </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.txtbox} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
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
              onClick={handleLoginClicked}
              className={`${buttons.stylisedBtn} ${styles.loginBtn}`}
            >
              Sign in
            </button>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <button
          onClick={handleSignUp}
          className={`${styles.pinkyText} ${styles.pinkyTextHover} font-semibold leading-6`}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPane;
