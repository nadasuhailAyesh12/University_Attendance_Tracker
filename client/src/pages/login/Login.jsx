import { useState, useEffect } from 'react'
import axios from 'axios';
import { Wrapper, LoginForm, Label, StyInput, InternalWrapper, DontHaveLabel, SignInBtn, SignUpLabel } from './Login.styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { showingError } from '../../App';
const expiresTime = 7;
const Login = ({role,setRole}) => {

  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [LoginError, setLogicError] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = { ID, password };

    // Send the form data to the backend using Axio
    axios.post('http://localhost:5000/api/v1/auth/login', { ID, password })
      .then(function (response) {
        // Handle the response from the backend
        Cookies.set('token', response.data.token);

        setRole(response.data.user.role);
       
        // Cookies.set('token', response.data.token);
        // setRole(response.user.role);
        navigate("/student");
      })
      .catch((error) => {
        setLogicError(true);
        // Handle any errors
        showingError(error.response.data.message);
      });
  };

  return (
    <Wrapper>
      <LoginForm onSubmit={handleFormSubmit}>
        <InternalWrapper>
          <Label>Sign in</Label>
          <Label htmlFor="id">University ID</Label>
          <StyInput placeholder="Enter your ID"
            type="text"
            id="name"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <StyInput placeholder="Enter your password"
            type="password"
            id="name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          {LoginError && <Label style={{ color: "#8b0000" }}>Password or Id not correct</Label>}
          <SignInBtn type='submit'>Log in</SignInBtn>
          <DontHaveLabel>Dont have an account?</DontHaveLabel>
          <SignUpLabel onClick={()=>{
            navigate('/signup');
          }}>Sign Up</SignUpLabel>
        </InternalWrapper>
      </LoginForm>
    </Wrapper>
  )
}

export default Login