import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import Popup from '../../components/Popup/Popup';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import {Label} from '../../components/navBar/navBar.styles';
import TableViewInstructor from '../../components/TableViewInstructor/TableViewInstructor';
import {UpdateBtn} from '../../components/TableViewer/TableViewer.styles';
import { showingError } from '../../App';
const InstructorPage = () => {
    const [TextString,setTextString]=useState("");
    const [isOpenToAdd,setIsOpenToAdd]=useState(false);
    const [ID,setID]=useState("");
    const [name,setName]=useState("");
    const [dept_name,setDept_name]=useState("");
    const [role,setRole]=useState("");
    const [recordChanges,setRecordChanges]=useState(0);
    const closeAddPopup = () =>{
        setIsOpenToAdd(false);
    }
    const onAddInst=async()=>{
      try{
        const response=await axios.post("http://localhost:5000/api/v1/instructor",{id:ID,name,dept_name,role});
        setRecordChanges(prev=> prev+1);
      }catch(err){
        showingError(err.response.data.message);
      }
    }
  return (
    <Wrapper>
      <NavBar/>
      <SearchBar>
      <Label>Search for Instructor</Label>
      <Input onBlur={(e)=>{setTextString(e.target.value)}}
      />
      <Button onClick={()=>{setIsOpenToAdd(true)}}>Add Instructor</Button>
      </SearchBar>
      <TableViewInstructor TextString={TextString} recordChanges={recordChanges}/>
      <Popup isOpen={isOpenToAdd} onClose={closeAddPopup}>
        <h2>Instructor ID</h2>
        <Input onChange={(e)=>setID(e.target.value)}/>
        <h2>Name</h2>
        <Input onChange={(e)=>setName(e.target.value)}/>
        <h2>Department name</h2>
        <Input onChange={(e)=>setDept_name(e.target.value)}/>
        <h2>Role</h2>
        <Input onChange={(e)=>setRole(e.target.value)}/>
        <UpdateBtn onClick={()=>{
          setRecordChanges();
          onAddInst();
        }}>Add Instrcutor</UpdateBtn>
      </Popup>
    </Wrapper>
  )
}

export default InstructorPage