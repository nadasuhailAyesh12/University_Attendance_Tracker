import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navBar/NavBar';
import { Wrapper, InternalWrapper, SearchBar, Input, Button } from './StudentPage.styles';
import { UpdateBtn,ColumnBar,ColumnTitle,ColumnRecord,WrapperViewer } from '../../components/TableViewer/TableViewer.styles';
import axios from 'axios';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewer from '../../components/TableViewer/TableViewer';
import Popup from '../../components/Popup/Popup';
import { Selector } from '../lecturePage/LecturePage.styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StudentPage = ({ role, setRole }) => {
  const [SearchParams, setSearchParams] = useState(0);
  const [TextString, setTextString] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpenToImport, setIsOpenToImport] = useState(false);
  const [lectureId, setLectureId] = useState('');
  const [dept_name_field, setDept_name_field] = useState("Engineering");
  const [course_id, setCourse_id] = useState("ECOM3422");
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sec_id, setSec_id] = useState("201");
  const [isFOpen, setIsFOpen] = useState(true);
  const [showingID, setShowingID] = useState("");
  const [AddOpen, setAddOpen] = useState(false);
  const [OpenSLect,setOpenSLect]=useState(false);
  const [lectMis,setLectMiss]=useState([]);
  const [mostComitted, setMostComitted] = useState(0);
  const [consecutive,setConsecutive]=useState(0);
  const [isSelectedToAdd, setIsSelectedToAdd] = useState({ id: "", first_name: "", middle_initial: "", middle_final: "", final_name: "", dept_name: "", location: "" });
  const [addition, setAddition] = useState(0);
  // ID, first_name, middle_initial, middle_final, final_name, dept_name, location
  const handleKeyPress = (event) => {
    // if (event.key === 'Enter') {
    //   // Perform some action when Enter key is pressed
    //   setSearchParams("");
    //   // Additional code here...
    // }
  };
  const closeAddPop = () => {
    setAddOpen(false);
  }
  const showingError = (str) => {
    toast(str);
  }
  const closePopup = () => {
    setIsOpenToImport(false);
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const closeFOpen = () => {
    setIsFOpen(false);
  }
  const closeOpenS=()=>{
    setOpenSLect(false);
  }
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post(`http://localhost:5000/api/v1/file/${course_id}/${sec_id}/${lectureId}`, formData)
        .then((response) => {
          // Handle the response from the backend
          // showingError(response.data.message);
        })
        .catch((error) => {
          // Handle any errors
          showingError(error.response.data.message);
        });
    }
  };
  const getAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/course");
      setCourses(response.data.courses);

    } catch (error) {
      showingError(error.response.data.message);
    }

  }
  const getAllDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/department");
      setDepartments(response.data.departments);

    } catch (error) {
      showingError(error.response.data.message);
    }

  }
  const exportStd = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/file/dropped/${course_id}/${sec_id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.xls');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      showingError(error.response.data.message);
    }
  }
  const addStd = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/student`, isSelectedToAdd);
      setAddition(prev => prev + 1);
      showingError(response.data.message);
    } catch (error) {
      showingError(error.response.data.message);
    }
  }
  const onGetMoreEighty=async()=>{
    try{
       const response=await axios.get(`http://localhost:5000/api/v1/lecture/studentAttend80/${course_id}/${sec_id}`);
       setLectMiss(response.data.lectures)
    }catch(error){
    }
}
  useEffect(() => {
    getAllDepartments();
    getAllCourses();
  }, [])
  return (
    <Wrapper styles={{ width: '95vw', overflowX: "hidden" }}>
      <NavBar role={role} />
      <InternalWrapper styles={{ width: '95vw', overflowX: "hidden" }}>
        <SearchBar>
          <Label>Search For Student</Label>
          <input type="file" onChange={handleFileChange} />
          <Button onClick={() => {
            setIsOpenToImport(true);
          }}>Import CSV File</Button>
          <Selector onChange={(e) => {
            setCourse_id(e.target.value);
          }}>
            {courses.map((el, index) =>
            (
              <option key={index}>{el.course_id}</option>
            ))}
          </Selector>
          <Selector onChange={(e) => {
            setDept_name_field(e.target.value);
          }}>
            {departments.map((el, index) =>
            (
              <option key={index}>{el.dept_name}</option>
            ))}
          </Selector>
          <Label>Sec id</Label>
          <Input onBlur={(e) => {
            setSec_id(e.target.value);
          }} />
        </SearchBar>
        <SearchBar>
          <Input onBlur={(e) => setTextString(e.target.value)} onKeyDown={handleKeyPress} />
          <Button onClick={() => setSearchParams((prev) => prev + 1)}>Search</Button>
          <Button style={{ width: '600px' }} onClick={() => {
            exportStd();
          }}>Export Excel Sheet for Students who attend less 25% of courses lectures</Button>
          <Button onClick={() => { setAddOpen(true) }}>Add Student</Button>
          <Button style={{ width: "300px" }} onClick={() => {
            setMostComitted((prev) => prev + 1);
          }}>View Most Commitment</Button>
        </SearchBar>
        <SearchBar>
          <Button style={{width:'430px'}} onClick={()=>{
            setConsecutive(prev=> prev+1);
          }}>get Student Who miss more than 3 consecutive lectures</Button>
          <Button style={{width:'450px'}} onClick={()=>{
            onGetMoreEighty();
            setOpenSLect(true);
          }}>Get missing lectures for student attend most of lectures</Button>
        </SearchBar>
        <TableViewer WhichSection="student" TextString={TextString} course_id={course_id} dept_name={dept_name_field} sec_id={sec_id} Addition={addition} mostCommit={mostComitted} SearchParams={SearchParams} Consecutive={consecutive} />
      </InternalWrapper>
      <Popup isOpen={isOpenToImport} onClose={closePopup}>
        <Label>Lecture ID</Label>
        <Input onBlur={(e) => {
          setLectureId(e.target.value);
        }} />
        <UpdateBtn onClick={() => {
          handleUpload();
        }}>send CSV FILE to DATABASE</UpdateBtn>
      </Popup>
      <Popup isOpen={isFOpen} onClose={closeFOpen}>
        <Label>Sec ID</Label>
        <Input />
        <UpdateBtn onClick={() => {
          setSec_id(sec_id);
        }}>Load</UpdateBtn>
      </Popup>
      {/* // ID, first_name, middle_initial, middle_final, final_name, dept_name, location */}
      <Popup isOpen={AddOpen} onClose={closeAddPop}>
        <Label>ID</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.id = e.target.value;
            return b;
          })
        }} />
        <Label>first name</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.first_name = e.target.value;
            return b;
          })
        }} />
        <Label>Middle initial</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.middle_initial = e.target.value;
            return b;
          })
        }} />
        <Label>Middle Final</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.middle_final = e.target.value;
            return b;
          })
        }} />
        <Label>Final Name</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.final_name = e.target.value;
            return b;
          })
        }} />
        <Label>dept_name</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.dept_name = e.target.value;
            return b;
          })
        }} />
        <Label>Location</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.location = e.target.value;
            return b;
          })
        }} />
        <Label>Gender</Label>
        <Input onBlur={(e) => {
          setIsSelectedToAdd((prev) => {
            const b = prev;
            b.gender = e.target.value;
            return b;
          })
        }} />
        <UpdateBtn onClick={() => {
          addStd();
        }}>Add Std</UpdateBtn>
      </Popup>
      <Popup isOpen={OpenSLect} onClose={closeOpenS}>
        <WrapperViewer/>
        <ColumnBar>
          <ColumnTitle>Std ID</ColumnTitle>
          <ColumnTitle>lecture ID</ColumnTitle>
        </ColumnBar>
          {lectMis.map((el,index)=>(
        <ColumnRecord>
            <ColumnTitle key={index}>{el.id}</ColumnTitle>
            <ColumnTitle key={index}>{el.lecture_id}</ColumnTitle>
        </ColumnRecord>
          ))}
      </Popup>
    </Wrapper>
  )
}

export default StudentPage
// just export