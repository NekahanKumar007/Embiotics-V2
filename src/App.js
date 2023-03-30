import React, {useState} from 'react';
import Login from './components/login/login'
// import Sidebar from './components/detailing/Sidebar';
import Sidebar1 from './components/HomeScreen/Sidebar1';
import Home from './components/HomeScreen/Home';
import Dashboard from './components/HomeScreen/Dashboard';
import Detailing from './components/HomeScreen/Detailing';
import Quiz from './components/HomeScreen/Quiz';
import ProtectedRoutes from './ProtectedRoutes';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Sidebar from './components/detailing/Sidebar';
function App() {
  

    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    // if (!isLoggedIn) {
    //   return (
    //     <Login />
    //   )
    // }
    // function requireAuth(nextState, replace, next) {
    //   if (!true) {
    //     replace({
    //       pathname: "/login",
    //       state: {nextPathname: nextState.location.pathname}
    //     });
    //   }
    //   next();
    // }
    return (

      <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detailing" element={<Detailing />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Route>
    </Routes>

    )
   }

export default App;
