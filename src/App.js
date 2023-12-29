import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import SignIn from './pages/SignIn/SignIn';
import Error from './pages/Error/Error';
import SignOut from './pages/SignOut/SignOut';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
