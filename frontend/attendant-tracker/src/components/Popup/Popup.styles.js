import styled from 'styled-components';
export const PopupOverlay=styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:599;
  `;

  export const PopUpContent=styled.div`
  background-color: white;
  padding: 20px;
  width:520px;
  height:520px;
  z-index: 999;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content:flex-start;
  gap:15px;
  overflow: scroll;
  `;
  export const CloseBtn=styled.button`
  position:sticky;
  top: 10px;
  right: 20px;
  padding:10px;
  margin:auto;
  margin-right:0;
  background-color:cyan;
  cursor:pointer;
  user-select: none;
  `;
  export const UpdateBtn=styled(CloseBtn)`
  background-color: aliceblue;
  color:#fff;
  `;

export const AddAttendance=styled(UpdateBtn)``;