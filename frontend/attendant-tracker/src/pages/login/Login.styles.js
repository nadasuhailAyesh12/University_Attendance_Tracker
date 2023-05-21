import styled from 'styled-components';
import "@fontsource/poppins";
export const Wrapper=styled.div`
width:100vw;
height:100vh;
display: flex;
align-items: center;
justify-content: center;
font-family:'Poppins',sans-serif;
`;
export const LoginForm=styled.form`
width:520px;
height:520px;
background-color: #576273;
/* padding:2vh 1.5vw;
display: flex;
flex-direction: column;
align-items: flex-start;
gap:15px;
justify-content: flex-start; */
position: relative;
`;
export const InternalWrapper=styled.div`
width:89%;
height:93%;
padding:2vh 1.5vw;
display: flex;
flex-direction: column;
align-items: flex-start;
gap:15px;
justify-content: flex-start;
`;
export const Label=styled.label`
font-weight: bold;
font-size: 24px;
color:#fff;
`;
export const StyInput=styled.input`
width:458px;
height:67px;
background-color: transparent;
border:1px solid #ffffffbe;
border-radius:20px;
padding-left:10px;
color:#fff;
font-size: 24px;
StyInput::placeholder{
    opacity: 0.6;
    font-weight: light;
}
outline:none;
`;
export const SignInBtn=styled.button`
width:460px;
height:66.68px;
background-color:rgba(188,192,46);
color:#fff;
border:none;
outline: none;
border-radius: 10px;
font-size: 24px;
font-weight: bold;
`;
export const DontHaveLabel=styled.label`
color:#fff;
font-weight: normal;
font-size: 24px;
margin:10px auto;
`;
export const SignUpLabel=styled.label`
color:#ffff00;
font-weight: bold;
font-size: 24px;
margin:10px auto;
`;



