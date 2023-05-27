import './App.css';
import { useState,useEffect } from 'react';
import Login from './pages/login/Login';
import NavBar from './components/navBar/NavBar';
import StudentPage from './pages/StudentPage/StudentPage';
import CoursePage from './pages/coursePage/CoursePage';
import InstructorPage from './pages/InstructorPage/InstructorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import { useNavigate } from 'react-router-dom';
import LecturePage from './pages/lecturePage/LecturePage';
function App() {
  const [role,setRole]=useState("");
  return (
    
   
      <Router>
        <div className="App">
          {/* <Login /> */}
          <Routes>
            <Route path="/student" element={<StudentPage role={role} setRole={setRole}/>} />
            <Route path="/" element={<Login role={role} setRole={setRole}/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/courses" element={<CoursePage/>} />
            <Route path="/instructor" element={<InstructorPage/>}/>
            <Route path="/lectures" element={<LecturePage/>}/>
          </Routes>
        </div>
      </Router>
      
  );
}

export default App;
