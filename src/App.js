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
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Dashboard/Profile';
import CreateRequest from './Pages/Dashboard/CreateRequest';
import CreateLogistic from "./Pages/Dashboard/CreateLogistic";
import CreateProduct from './Pages/Dashboard/CreateProduct';
import RequestProduct from "./Pages/Dashboard/RequestProduct"
import ApproveRequest from "./Pages/Dashboard/ApproveRequest"
import Users from './Pages/Dashboard/Users';
import AllProducts from './Pages/Home/AllProducts';
import AllLogistics from './Pages/Home/AllLogistics';
import MyRequest from './Pages/Dashboard/MyRequest';
import NewCollection from './Pages/ProductAndLogistic/NewCollection';
import web3 from './Ethereum/web3';


function App() {
  
  return (
    <div className='max-w-7xl mx-auto'>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={
            <RequireAuth>
              <NewCollection></NewCollection>
            </RequireAuth>
          } />
          <Route path='/logistics' element={<AllLogistics />} />
          <Route path='/about' element={
            <RequireAuth>
              <About />
            </RequireAuth>
          } />

          <Route path='dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
            <Route index element={<Profile></Profile>}></Route>
            <Route path="createrequest" element={<CreateRequest></CreateRequest>}></Route>
            <Route path="createlogistic" element={<CreateLogistic></CreateLogistic>}></Route>
            <Route path="createproduct" element={<CreateProduct></CreateProduct>}></Route>
            <Route path="requestproduct" element={<RequestProduct></RequestProduct>}></Route>
            <Route path="users" element={<Users></Users>}></Route>
            <Route path="myrequests" element={<MyRequest></MyRequest>}></Route>
            <Route path="approverequest" element={<ApproveRequest></ApproveRequest>}></Route>
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
