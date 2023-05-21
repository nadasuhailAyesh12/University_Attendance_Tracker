import styled from 'styled-components';
export const Wrapper=styled.div`
width:100vw;
height:100vh;
background-color: #D9E3ED;
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
color:black;
`;
export const InternalWrapper=styled.div`
width:80vw;
height:85vh;
background: red;
position: relative;
`;
export const SearchBar=styled.div`
width:76vw;
height:8vh;
display:flex;
padding:0 2vw;
align-items: center;
justify-content: flex-start;
`;
export const Input=styled.input`
width:250px;
height:60px;
border-radius: 10px;
outline: none;
border:1px solid black;
font-size: 24px;
`;

