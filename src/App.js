import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage.jsx';
import ResetStyles from './styles/resetStyles.js';
import GlobalStyles from './styles/globalStyles.js';
import SignInPage from './pages/SignInPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';
import { UserProvider } from './context/userContext.jsx';

function App() {
  return (
    <BrowserRouter>

      <ResetStyles />
      <GlobalStyles />

      <UserProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </UserProvider>

    </BrowserRouter>
  );
}

export default App;
