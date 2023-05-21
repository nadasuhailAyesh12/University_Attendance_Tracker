import {useState} from 'react';

import {WrapperViewer,ColumnBar,ColumnTitle,ColumnRecord,UpdateBtn,DelBtn,AddAttendance,Input} from './TableViewer.styles';
import Popup from '../Popup/Popup';
const TableViewer = ({WhichSection}) => {
    const[WhichSectionSt,setWhichSectionSt]=useState(WhichSection);
    const [isOpenEdit,setIsOpenEdit]=useState(false);
    const [isSelectedToEdit,setIsSelectedToEdit]=useState(null);
    let arr=[];
    let arr1=[];
    if(WhichSectionSt==="student"){
        arr=["id","first_name","middle_first","middle_final","final_name","gender","location","dept_name"];
        arr1=["123040","Mohammed","Suhail","Khalil","Ayesh","male","Gaza","Engineering"];
    }
    const openPopup = () => {
        setIsOpenEdit(true);
      };
    
      const closePopup = () => {
        setIsOpenEdit(false);
      };

  return (
    <WrapperViewer>
    <ColumnBar>
        {arr.map((element,index)=>(<ColumnTitle key={index}>{element}</ColumnTitle>))}
    </ColumnBar>
    <ColumnRecord>
    {arr1.map((element,index)=>(<ColumnTitle key={index}>{element}</ColumnTitle>))}
    <UpdateBtn onClick={openPopup}>Edit</UpdateBtn>
    <Popup isOpen={isOpenEdit} onClose={closePopup}>
        <h2>First Name</h2>
        <Input/>
        <h2>Middle first Name</h2>
        <Input/>
        <h2>Middle second Name</h2>
        <Input/>
        <h2>Last Name</h2>
        <Input/>
        <h2>Gender</h2>
        <Input styles={{height:'300px'}}/>
        <h2>Location</h2>
        <Input/>
        <h2>Department name</h2>
        <Input/>
      </Popup>
    <DelBtn onClick={()=>alert("are you sure")}>Delete</DelBtn>
    <AddAttendance>Add Attendance</AddAttendance>
    </ColumnRecord>
    </WrapperViewer>
  )
}

export default TableViewer