import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import SignUp from './pages/signup/signUp';
import Login from './pages/login/Login';
import './App.css';
import UserProfile from './pages/userinfo/userProfile';
import Admin from './AdminPanel/Admin';
import News from './pages/navbar_links/News';
import Post from './pages/navbar_links/Post';
import EducationNews from './pages/navbar_links/edunews';
import Footer from './components/footer';
import UserPostForm from './pages/userinfo/createpost';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>
          <NavBar />
          <HomePage />
          <Footer />
        </>} />
        <Route path='/news' element={<>
        <NavBar />
        <News />
        <Footer />
        </>} />
        <Route path='/edunews' element={<>
        <NavBar />
        <EducationNews />
        <Footer />
        </>} />
        <Route path='/posts' element={<>
        <NavBar />
        <Post />
        <Footer />
        </>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/createpost' element={<UserPostForm />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
