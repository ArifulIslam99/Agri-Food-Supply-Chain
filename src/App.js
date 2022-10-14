import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Link, Routes } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Footer from './Pages/Shared/Footer';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';



function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={
            <RequireAuth>
              <About />
            </RequireAuth>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
