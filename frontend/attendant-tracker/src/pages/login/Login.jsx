import { useState } from 'react'
import axios from 'axios';
import { Wrapper, LoginForm, Label, StyInput, InternalWrapper, DontHaveLabel, SignInBtn, SignUpLabel } from './Login.styles';
const Login = () => {
  
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [LoginError,setLogicError]= useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = { ID, password };

    // Send the form data to the backend using Axio
    console.log("ID:", ID, "password", password);
    axios.post('http://localhost:5000/api/v1/auth/login', { ID,password})
      .then(function (response) {
        // Handle the response from the backend
        console.log(response.data);
      })
      .catch((error) => {
        setLogicError(true);
        // Handle any errors
        console.error(error.message);
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
            type="text"
            id="name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          {LoginError && <Label style={{color:"#8b0000"}}>Password or Id not correct</Label>}
          <SignInBtn type='submit'>Log in</SignInBtn>
          <DontHaveLabel>Dont have an account?</DontHaveLabel>
          <SignUpLabel>Sign Up</SignUpLabel>
        </InternalWrapper>
      </LoginForm>
    </Wrapper>
  )
}

export default Login