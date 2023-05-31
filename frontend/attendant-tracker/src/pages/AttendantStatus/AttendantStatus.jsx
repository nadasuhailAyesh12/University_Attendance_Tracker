import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import Popup from '../../components/Popup/Popup';
import {Label} from '../../components/navBar/navBar.styles';
import { UpdateBtn } from '../../components/TableViewer/TableViewer.styles';
import {Selector} from '../lecturePage/LecturePage.styles';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import TableViewerStatus from '../../components/TableViewerStatus/TableViewerStatus';
import { showingError } from '../../App';
const AttendantStatus = () => {
    const [course_id,setCourse_id]=useState("ECOM3422");
    const [courses,setCourses]=useState([]);
    const [firstPop,setFirstPop]=useState(true);
    const [sec_id,setSec_id]=useState("");
    const [recordChange,setRecordChange]=useState(0);
    const closeFirstPopUp=()=>{
        setFirstPop(false);
    }
    const getAllCourses=async()=>{
        try{
        const response=await axios.get("http://localhost:5000/api/v1/course");
        setCourses(response.data.courses);
        console.log("first Pop",firstPop);
        console.log(response.data);
        
        }catch(error){
            showingError(error.response.data.message);
        }
        
    }
    // const getAllDepartments=async()=>{
    //     try{
    //     const response=await axios.get("http://localhost:5000/api/v1/department");
    //     setDepartments(response.data.departments);
    //     console.log(response.data);
        
    //     }catch(error){
    //         console.log(error);
    //     }
        
    // }
    useEffect(()=>{
        getAllCourses();
        // getAllDepartments();
    },[]);
  return (
    <Wrapper>
        <NavBar/>
        <InternalWrapper>
            <SearchBar>
                <Selector onChange={(e)=>{
                    setCourse_id(e.target.value);
                }}>
                {courses.map((el,index)=>
                (
                    <option key={index}>{el.course_id}</option>
                ))}
            </Selector>
            {/* <Selector>
                {departments.map((el,index)=>
                (
                    <option key={index}>{el.dept_name}</option>
                ))}
            </Selector> */}
            <Label>Sec ID</Label>
            <Input onBlur={(e)=>{
                setSec_id(e.target.value);
            }}/>
            </SearchBar>
            {/* course_id,sec_id,recordChanges */}
            <TableViewerStatus course_id={course_id} sec_id={sec_id} recordChanges={recordChange}/>
            <Popup isOpen={firstPop} onClose={closeFirstPopUp}>
                <Label>Sec ID</Label>
                <Input onBlur={(e)=>{
                    setSec_id(e.target.value);
                }}/>
                <UpdateBtn onClick={()=>{setRecordChange((prev)=>prev+1)}}>Load</UpdateBtn>
            </Popup>
        </InternalWrapper>
        
    </Wrapper>
  )
}

export default AttendantStatus
