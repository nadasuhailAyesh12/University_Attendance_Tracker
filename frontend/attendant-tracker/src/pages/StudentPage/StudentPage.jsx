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
  const [dept_name_field,setDept_name_field]=useState("Engineering");
  const [course_id,setCourse_id]=useState("ECOM3422");
  const [courses,setCourses]=useState([]);
  const [departments,setDepartments]=useState([]);
  const [sec_id,setSec_id]=useState("201");
  const [isFOpen,setIsFOpen]=useState(true);
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
  const closeFOpen=()=>{
    setIsFOpen(false);
  }
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
},[])
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
            <Selector onChange={(e)=>{
              setCourse_id(e.target.value);
            }}>
                {courses.map((el,index)=>
                (
                    <option key={index}>{el.course_id}</option>
                ))}
            </Selector>
            <Selector onChange={(e)=>{
              setDept_name_field(e.target.value);
            }}>
                {departments.map((el,index)=>
                (
                    <option key={index}>{el.dept_name}</option>
                ))}
            </Selector>
            <Label>Sec id</Label>
            <Input onBlur={(e)=>{
              setSec_id(e.target.value);
            }}/>
        </SearchBar>
        <SearchBar>
            <Input onBlur={(e)=>setTextString(e.target.value)} onKeyDown={handleKeyPress}/>
            <Button onClick={()=>setSearchParams("name")}>Search</Button>
        </SearchBar>
        <TableViewer WhichSection="student" SearchParams={SearchParams} TextString={TextString} course_id={course_id} dept_name={dept_name_field} sec_id={sec_id}/>
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
    <Popup isOpen={isFOpen} onClose={closeFOpen}>
      <Label>Sec ID</Label>
      <Input/>
      <UpdateBtn onClick={()=>{
        console.log("i am clicked");
        setSec_id(sec_id);
        console.log(sec_id);
      }}>Load</UpdateBtn>
    </Popup>
    </Wrapper>
  )
}

export default StudentPage