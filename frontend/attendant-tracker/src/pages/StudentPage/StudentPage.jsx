import React, { useState,useEffect } from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from './StudentPage.styles';
import { UpdateBtn } from '../../components/TableViewer/TableViewer.styles';
import axios from 'axios';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewer from '../../components/TableViewer/TableViewer';
import Popup from '../../components/Popup/Popup';
import {Selector} from '../lecturePage/LecturePage.styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StudentPage = ({role,setRole}) => {
  const [SearchParams,setSearchParams]=useState(0);
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
  const [showingID,setShowingID]=useState("");
  const [AddOpen,setAddOpen]=useState(false);
  const [isSelectedToAdd,setIsSelectedToAdd]=useState({id:"",first_name:"",middle_initial:"",middle_final:"",final_name:"",dept_name:"",location:""});
  const [addition,setAddition]=useState(0);
  // ID, first_name, middle_initial, middle_final, final_name, dept_name, location
  const handleKeyPress = (event) => {
    // if (event.key === 'Enter') {
    //   // Perform some action when Enter key is pressed
    //   setSearchParams("");
    //   // Additional code here...
    // }
  };
  const closeAddPop=()=>{
    setAddOpen(false);
  }
  const showingError=(str)=>{
    toast(str);
  }
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

      axios.post(`http://localhost:5000/api/v1/file/${course_id}/${sec_id}/${lectureId}`, formData)
        .then((response) => {
          // Handle the response from the backend
          // showingError(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
          showingError(error.response.data.message);
        });
    }
  };
  const getAllCourses=async()=>{
    try{
    const response=await axios.get("http://localhost:5000/api/v1/course");
    setCourses(response.data.courses);
    console.log(response.data);
    
    }catch(error){
      showingError(error.message);
    }
    
}
const getAllDepartments=async()=>{
    try{
    const response=await axios.get("http://localhost:5000/api/v1/department");
    setDepartments(response.data.departments);
    console.log(response.data);
    
    }catch(error){
      showingError(error.message);
        console.log(error);
    }
    
}
const exportStd=async()=>{
  try{
    console.log(`http://localhost:5000/api/v1/file/${course_id}/${sec_id}`);
    const response=await axios.get(`http://localhost:5000/api/v1/file/${course_id}/${sec_id}`,{responseType:'blob'});
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.xls');
    document.body.appendChild(link);
    link.click();
    console.log(response);
  }catch(error){
    showingError(error.message);
    console.log(error);
  }
}
const addStd=async()=>{
  try{
    console.log(isSelectedToAdd);
    const response=await axios.post(`http://localhost:5000/api/v1/student`,isSelectedToAdd);
    console.log(response.data);
    setAddition(prev=>prev+1);
    showingError(response.data.message);
  }catch(error){
    console.log(error);
    showingError(error.message);
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
            <Button onClick={()=>setSearchParams((prev)=>prev+1)}>Search</Button>
            <Button style={{width:'600px'}} onClick={()=>{
              exportStd();
            }}>Export Excel Sheet for Students who attend less 25% of courses lectures</Button>
            <Button onClick={()=>{setAddOpen(true)}}>Add Student</Button>
        </SearchBar>
        <TableViewer WhichSection="student"  TextString={TextString} course_id={course_id} dept_name={dept_name_field} sec_id={sec_id} Addition={addition}/>
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
    {/* // ID, first_name, middle_initial, middle_final, final_name, dept_name, location */}
    <Popup isOpen={AddOpen} onClose={closeAddPop}>
      <Label>ID</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.id=e.target.value;
          return b;
        })
      }}/>
      <Label>first name</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.first_name=e.target.value;
          return b;
        })
      }}/>
      <Label>Middle initial</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.middle_initial=e.target.value;
          return b;
        })
      }}/>
      <Label>Middle Final</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.middle_final=e.target.value;
          return b;
        })
      }}/>
      <Label>Final Name</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.final_name=e.target.value;
          return b;
        })
      }}/>
      <Label>dept_name</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.dept_name=e.target.value;
          return b;
        })
      }}/>
      <Label>Location</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.location=e.target.value;
          return b;
        })
      }}/>
      <Label>Gender</Label>
      <Input onBlur={(e)=>{
        setIsSelectedToAdd((prev)=>{
          const b=prev;
          b.gender=e.target.value;
          return b;
        })
      }}/>
      <UpdateBtn onClick={()=>{
        addStd();
      }}>Add Std</UpdateBtn>
    </Popup>
    </Wrapper>
  )
}

export default StudentPage