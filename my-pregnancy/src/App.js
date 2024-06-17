import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useScrollToTop from './global-components/scrollToTop.js';

import HomePage from './pages/home/homepage.js'

import CreateAccountPage from './pages/createaccount/createaccountpage.js'
import LoginPage from './pages/login/loginpage.js'

import NotFoundPage from './pages/notfound/notfoundpage.js'


function Wrapper() {
    useScrollToTop();

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>

            <Route path="/createaccount" element={<CreateAccountPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <Wrapper/>
        </Router>
    );
}

export default App;
