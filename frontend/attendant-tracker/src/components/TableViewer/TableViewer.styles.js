import styled from 'styled-components'
import "@fontsource/poppins";
export const WrapperViewer=styled.div`
width:100%;
/* background-color:black; */
height:76vh;
font-family: 'Poppins',sans-serif;
`;
export const ColumnBar=styled.div`
width:100%;
height:5vh;
background-color:yellow;
display: flex;
align-items: center;
justify-content: flex-start;
border-right:1px solid black;
`;
export const ColumnTitle=styled.div`
width:auto;
padding:0 1vw;
height:100%;
display:flex;
align-items: center;
justify-content: center;
border-left:1px solid black;
width:110px;
border-bottom:1px solid black;
`;
export const ColumnRecord=styled(ColumnBar)`
`;
export const UpdateBtn=styled.button`
padding:10px;
color:white;
background-color: #04AA6D;
border-radius: 8px;
border:none;
outline: none;
margin:0 10px;
`;
export const DelBtn=styled(UpdateBtn)`
background-color:red;
`;
export const AddAttendance=styled(UpdateBtn)`
background-color: lightblue;
`;
export const Input=styled.input`
width:300px;
outline: none;
border:none;
height:100px!important;
font-size: 24px;
padding:10px;
border-radius: 20px;
box-shadow: 0 0 15px rgba(0,0,0,0.4);
`;




