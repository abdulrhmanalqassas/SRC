import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import { Routes, Route } from 'react-router-dom';
import Unauth from './components/Unauth';
import RequireAuth from "./components/RequireAuth"
import Land from './components/Land';
import Verifi from './components/Verifi';
import AddContract from "./components/AddContract";
import PersistLogin from './components/PersistLogin';
import {ForgotPass}  from "./components/ForgotPass";


function App() {

  return (
    <Routes>
   
      {/* public routes */}
      <Route path="/" element={<Land />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="Unauth" element={<Unauth />} />
      <Route path="/verify" element={<Verifi />} />
      <Route path="/forgotPass" element={<ForgotPass />} />
      
        <Route element={<RequireAuth />}>
              <Route path="/resetPassword" element={<ResetPassword />} /> 
              <Route path="/addContract" element={<AddContract />} />
        </Route>
      {/* we want to protect these routes */}

   
  </Routes>
  );
}

export default App;
