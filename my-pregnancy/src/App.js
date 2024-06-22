import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import useScrollToTop from './global-components/scrollToTop.js';

import StartupPage from './pages/startup/startuppage.js';

import AboutPage from './pages/about/aboutpage.js';
import AccountPage from './pages/account/accountpage.js';
import ChecklistPage from './pages/checklist/checklistpage.js';
import ConsultationPage from './pages/consultation/consultationpage.js';
import ContactPage from './pages/contact/contactpage.js';
import CreateaccountPage from './pages/createaccount/createaccountpage.js';
import DiscussionPage from './pages/discussion/discussionpage.js';
import EditaccountPage from './pages/editaccount/editaccountpage.js';
import FAQPage from './pages/faq/faqpage.js';
import FitnessPage from './pages/fitness/fitnesspage.js';
import FitnessarticlePage from './pages/fitnessarticle/fitnessarticlepage.js';
import ForumsPage from './pages/forums/forumspage.js';
import HomePage from './pages/home/homepage.js';
import JournalPage from './pages/journal/journalpage.js';
import LoginPage from './pages/login/loginpage.js';
import NotFoundPage from './pages/notfound/notfoundpage.js';
import PostPage from './pages/post/postpage.js';
import PrivacyPolicyPage from './pages/privacypolicy/privacypolicypage.js';
import ResetpasswordPage from './pages/resetpassword/resetpasswordpage.js';
import ResourcearticlePage from './pages/resourcearticle/resourcearticlepage.js';
import ResourcesPage from './pages/resources/resourcespage.js';

import './global.css'


function Wrapper() {
    //useScrollToTop();

    return (
        <Routes>
            <Route path="/" element={<StartupPage/>}/>

            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/account" element={<AccountPage/>}/>
            <Route path="/checklist" element={<ChecklistPage/>}/>
            <Route path="/consultation" element={<ConsultationPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/createaccount" element={<CreateaccountPage/>}/>
            <Route path="/discussion" element={<DiscussionPage/>}/>
            <Route path="/editaccount" element={<EditaccountPage/>}/>
            <Route path="/faq" element={<FAQPage/>}/>
            <Route path="/fitness" element={<FitnessPage/>}/>
            <Route path="/fitnessarticle" element={<FitnessarticlePage/>}/>
            <Route path="/forums" element={<ForumsPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/journal" element={<JournalPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/post" element={<PostPage/>}/>
            <Route path="/privacypolicy" element={<PrivacyPolicyPage/>}/>
            <Route path="/resetpassword" element={<ResetpasswordPage/>}/>
            <Route path="/resourcearticle" element={<ResourcearticlePage/>}/>
            <Route path="/resources" element={<ResourcesPage/>}/>
        
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
