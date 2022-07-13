import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import { Routes, Route } from 'react-router-dom';
import Unauth from './components/Unauth';
import Nav from './components/Nav';

function App() {

  return (
    <Routes>
    <Route path="/" element={<Register/>}>
    </Route>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="ResetPassword" element={<ResetPassword />} />
      <Route path="Unauth" element={<Unauth />} />
      {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

      {/* we want to protect these routes */}
      {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
        <Route path="editor" element={<Editor />} />
      </Route>


      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
        <Route path="lounge" element={<Lounge />} />
      </Route> */}

      {/* catch all */}
      {/* <Route path="*" element={<Missing />} /> */}
   
  </Routes>
  );
}

export default App;
