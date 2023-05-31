import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage.jsx';
import ResetStyles from './styles/resetStyles.js';
import GlobalStyles from './styles/globalStyles.js';

function App() {
  return (
    <BrowserRouter>
      <ResetStyles />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
