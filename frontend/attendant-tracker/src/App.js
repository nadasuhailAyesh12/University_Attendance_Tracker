import './App.css';
import { useState,useEffect } from 'react';
import Login from './pages/login/Login';
import NavBar from './components/navBar/NavBar';
import StudentPage from './pages/StudentPage/StudentPage';
import CoursePage from './pages/coursePage/CoursePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import { useNavigate } from 'react-router-dom';

function App() {
 
  return (
    
   
      <Router>
        <div className="App">
          {/* <Login /> */}
          <Routes>
            <Route path="/student" element={<StudentPage/>} />
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/courses" element={<CoursePage/>} />
          </Routes>
        </div>
      </Router>
      
  );
}

export default App;
