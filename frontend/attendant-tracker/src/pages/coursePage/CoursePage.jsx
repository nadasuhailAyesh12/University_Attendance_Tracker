import React, { useState } from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewerCourse from '../../components/TableViewerCourse/TableViewerCourse';
import Popup from '../../components/Popup/Popup';
import axios from 'axios';
import { showingError } from '../../App';
const CoursePage = () => {
  const [isOpenToAdd,setIsOpenToAdd]=useState(false);
  const[TextString,setTextString]=useState("");
  const [id,setId]=useState("");
  const [title,setTitle]=useState("");
  const [dept_name,setDept_name]=useState("");
  const [book,setBook]=useState("");
  const [dummyState,setDummyState]=useState(0);
  const openPopup=()=>{
    setIsOpenToAdd(true);
  }
  const closePopup=()=>{
    if(isOpenToAdd){
      setIsOpenToAdd(false);
    }
  }
  const updateCourse=async()=>{
    try{
      const response=await axios.post("http://localhost:5000/api/v1/course",
      {id,title,dept_name,book}
      );
      console.log(response.data.success);
      setDummyState((prev)=>prev+1);
      console.log(dummyState);
    }catch(err){
      console.log(err);
      console.log({id,title,dept_name,book});
      showingError(err.response.data.message);
    }
  }
  return (
    <Wrapper>
    <NavBar/>
    <InternalWrapper>
        <SearchBar>
        <Label>Search For Course</Label>
            <Input onKeyDown={(e)=>{setTextString(e.target.value)}}/>
            <Button onClick={()=>openPopup()}>Add Course</Button>
        </SearchBar>
        <TableViewerCourse recordChanges={dummyState} TextString={TextString}/>
        <Popup isOpen={isOpenToAdd} onClose={closePopup} onAddAttendance={updateCourse}>
                <h2>Course ID</h2>
                <Input onChange={(e)=>{
                  setId(e.target.value);
                }}/>
                <h2>title</h2>
                <Input onChange={(e)=>setTitle(e.target.value)}/>
                <h2>Department name</h2>
                <Input onChange={(e)=>setDept_name(e.target.value)}/>
                <h2>book</h2>
                <Input onChange={(e)=>setBook(e.target.value)}/>
            </Popup>
    </InternalWrapper>
    </Wrapper>
  )
}
export default CoursePage;