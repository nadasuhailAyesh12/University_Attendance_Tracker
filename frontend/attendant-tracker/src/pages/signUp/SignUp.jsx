import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Wrapper, LoginForm, Label, StyInput, InternalWrapper, DontHaveLabel, SignInBtn, SignUpLabel } from '../login/Login.styles';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const SignupForm = styled(LoginForm)`
  width:520px;
  height:620px;
  `;
const SignUp = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate=useNavigate();
  const onSubmit = (data) => {
    console.log(data, "this is data");
    axios.post("http://localhost:5000/api/v1/auth/signup", data)
      .then((res) => {
        console.log(res);
        console.log("i am here");
        navigate("/student");
      }).catch((err) => {
        console.error(err);
      })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };
  return (
    <Wrapper>
      <LoginForm onSubmit={handleFormSubmit} >
        <InternalWrapper>
          <Label htmlFor="ID">ID:</Label>
          <StyInput type="text" id="ID" {...register('ID', {
            required: true,
            pattern: /^\d+$/,
            message: 'ID must be a number',
          })} />
          {errors.id && <span>{errors.id.message}</span>}

          <Label htmlFor="name">Name:</Label>
          <StyInput type="text" id="name" {...register('name', {
            required: true,
            maxLength: 20,
          })} />
          {errors.name && <span>Name must not exceed 20 characters</span>}
          <Label htmlFor="password">Password:</Label>
          <StyInput type="password" id="password" {...register('password', {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[A-Z]).+$/,
            message: 'Password must contain at least 1 upppercase letter and be at least 8 characters'
          })} />
          {errors.password && <span>{errors.password.message}</span>}
          <SignInBtn type="submit">Sign Up</SignInBtn>
          <DontHaveLabel>Already Have an account?</DontHaveLabel>
          <SignUpLabel onClick={()=>{
            navigate("/");
          }}>Log in</SignUpLabel>
        </InternalWrapper>
      </LoginForm>
    </Wrapper>
  )
}

export default SignUp