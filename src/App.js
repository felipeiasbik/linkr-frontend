import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import SignUpPage from './pages/SignUpPage.jsx';
import ResetStyles from './styles/resetStyles.js';
import GlobalStyles from './styles/globalStyles.js';
import SignInPage from './pages/SignInPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';
import Header from './components/Header.jsx';
import { UserContext } from './context/userContext.jsx';
import { MainContainer } from './styles/appStyles.js';
import SideLogo from './components/SideLogo.jsx';

function App() {
  const { userData } = useContext(UserContext);

  return (
    <BrowserRouter>

      <ResetStyles />
      <GlobalStyles />
      {userData ? <Header /> : <SideLogo />}
      <MainContainer logged={userData}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
