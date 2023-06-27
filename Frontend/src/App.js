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

function App() {

  return (
    <Routes>
   
      {/* public routes */}
      <Route path="/" element={<Land />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Unauth" element={<Unauth />} />
      
      <Route path="/verifi" element={<Verifi />} />
      
      {/* PROTECTED routes */}
      <Route element={<RequireAuth />}>
          <Route path="/addContract" element={<AddContract />} />
          <Route path="/ResetPassword" element={<ResetPassword />} ></Route>
      </Route>
      
      

   
  </Routes>
  );
}

export default App;
