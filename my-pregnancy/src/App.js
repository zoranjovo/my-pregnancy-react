import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import useScrollToTop from './global-components/scrollToTop.js';

import StartupPage from './pages/startup/startuppage.js';
import StartupPage2 from './pages/startup2/startuppage2.js';

import AboutPage from './pages/about/aboutpage.js';
import AccountPage from './pages/account/accountpage.js';
import ChecklistPage from './pages/checklist/checklistpage.js';
import ConsultationBookPage from './pages/consultation/book/consultationbookpage.js';
import ConsultationManagePage from './pages/consultation/manage/consultationmanagepage.js';
import ContactPage from './pages/contact/contactpage.js';
import DiscussionPage from './pages/discussion/discussionpage.js';
import FAQPage from './pages/faq/faqpage.js';
import FitnessPage from './pages/fitness/fitnesspage.js';
import FitnessarticlePage from './pages/fitnessarticle/fitnessarticlepage.js';
import ForumsPage from './pages/forums/forumspage.js';
import HomePageHandler from './pages/home/HomeHandler.js';
import JournalPage from './pages/journal/journalpage.js';
import JournalEntryPage from './pages/journalentry/journalentrypage.js';
import LoginPage from './pages/login/loginpage.js';
import NotFoundPage from './pages/notfound/notfoundpage.js';
import PostPage from './pages/post/postpage.js';
import PrivacyPolicyPage from './pages/privacypolicy/privacypolicypage.js';
import ResetpasswordPage from './pages/resetpassword/resetpasswordpage.js';
import ResourcearticlePage from './pages/resourcearticle/resourcearticlepage.js';
import ResourcesPage from './pages/resources/resourcespage.js';
import SignUpPage from './pages/signup/signuppage.js';


function Wrapper() {
  useScrollToTop();
  const [userCache, setUserCache] = useState(null);

  return (
    <Routes>
      <Route path="/startup2" element={<StartupPage/>}/>
      <Route path="/" element={<StartupPage2 userCache={userCache} setUserCache={setUserCache}/>}/>

      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/account" element={<AccountPage/>}/>
      <Route path="/checklist" element={<ChecklistPage/>}/>
      <Route path="/consultation/book" element={<ConsultationBookPage/>}/>
      <Route path="/consultation/manage" element={<ConsultationManagePage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/discussion" element={<DiscussionPage/>}/>
      <Route path="/faq" element={<FAQPage/>}/>
      <Route path="/fitness" element={<FitnessPage/>}/>
      <Route path="/fitnessarticle/:id" element={<FitnessarticlePage/>}/>
      <Route path="/forums" element={<ForumsPage/>}/>
      <Route path="/home" element={<HomePageHandler/>}/>
      <Route path="/journal" element={<JournalPage/>}/>
      <Route path="/journalentry/:id" element={<JournalEntryPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/post/:id" element={<PostPage/>}/>
      <Route path="/privacypolicy" element={<PrivacyPolicyPage/>}/>
      <Route path="/resetpassword" element={<ResetpasswordPage/>}/>
      <Route path="/resourcearticle" element={<ResourcearticlePage/>}/>
      <Route path="/resources" element={<ResourcesPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
  
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Wrapper/>
      <ToastContainer />
    </Router>
  );
}

export default App;
