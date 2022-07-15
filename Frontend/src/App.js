import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import { Routes, Route } from 'react-router-dom';
import Unauth from './components/Unauth';
import RequireAuth from "./components/RequireAuth"
import Land from './components/Land';
import Verifi from './components/Verifi';
import State from "./components/State";

function App() {

  return (
    <Routes>
   
      {/* public routes */}
      <Route path="/" element={<Land />} />
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="Unauth" element={<Unauth />} />
      <Route path="ResetPassword" element={<ResetPassword />} ></Route>
      <Route path="verifi" element={<Verifi />} />
      <Route path="State" element={<State />} />
      {/* we want to protect these routes */}

   
  </Routes>
  );
}

export default App;
