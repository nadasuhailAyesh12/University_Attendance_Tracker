import React, { useState,useEffect } from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from './StudentPage.styles';
import { UpdateBtn } from '../../components/TableViewer/TableViewer.styles';
import axios from 'axios';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewer from '../../components/TableViewer/TableViewer';
import Popup from '../../components/Popup/Popup';
import {Selector} from '../lecturePage/LecturePage.styles';
const StudentPage = ({role,setRole}) => {
  const [SearchParams,setSearchParams]=useState('');
  const [TextString,setTextString]=useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpenToImport,setIsOpenToImport]=useState(false);
  const [lectureId,setLectureId] = useState(''); 
  const [dept_name_field,setDept_name_field]=useState("");
  const [course_id,setCourse_id]=useState("");
  const [courses,setCourses]=useState([]);
  const [departments,setDepartments]=useState([]);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Perform some action when Enter key is pressed
      setSearchParams("");
      // Additional code here...
    }
  };
  const closePopup=()=>{
    setIsOpenToImport(false);
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post(`http://localhost:5000/api/v1/file/${lectureId}`, formData)
        .then((response) => {
          // Handle the response from the backend
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };
  const getAllCourses=async()=>{
    try{
    const response=await axios.get("http://localhost:5000/api/v1/course");
    setCourses(response.data.courses);
    console.log(response.data);
    
    }catch(error){
        console.log(error);
    }
    
}
const getAllDepartments=async()=>{
    try{
    const response=await axios.get("http://localhost:5000/api/v1/department");
    setDepartments(response.data.departments);
    console.log(response.data);
    
    }catch(error){
        console.log(error);
    }
    
}
useEffect(()=>{
  getAllDepartments();
  getAllCourses();
})
  return (
    <Wrapper>
    <NavBar role={role}/>
    <InternalWrapper>
        <SearchBar>
        <Label>Search For Student</Label>
            <input type="file" onChange={handleFileChange}/>
            <Button onClick={()=>{
              setIsOpenToImport(true);
            }}>Import CSV File</Button>
            <Selector>
                {courses.map((el,index)=>
                (
                    <option key={index}>{el.course_id}</option>
                ))}
            </Selector>
            <Selector>
                {departments.map((el,index)=>
                (
                    <option key={index}>{el.dept_name}</option>
                ))}
            </Selector>
        </SearchBar>
        <SearchBar>
            <Input onBlur={(e)=>setTextString(e.target.value)} onKeyDown={handleKeyPress}/>
            <Button onClick={()=>setSearchParams("name")}>Search</Button>
        </SearchBar>
        <TableViewer WhichSection="student" SearchParams={SearchParams} TextString={TextString}/>
    </InternalWrapper>
    <Popup isOpen={isOpenToImport} onClose={closePopup}>
      <Label>Lecture ID</Label>
      <Input onBlur={(e)=>{
        setLectureId(e.target.value);
      }}/>
      <UpdateBtn onClick={()=>{
        handleUpload();
      }}>send CSV FILE to DATABASE</UpdateBtn>
    </Popup>
    </Wrapper>
  )
}

export default StudentPage