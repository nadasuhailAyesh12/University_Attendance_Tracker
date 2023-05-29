import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import Popup from '../../components/Popup/Popup';
import {Label} from '../../components/navBar/navBar.styles';
import { UpdateBtn } from '../../components/TableViewer/TableViewer.styles';
import {Selector} from '../lecturePage/LecturePage.styles';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import TableViewerlectures from '../../components/TableViewerlectures/TableViewerlectures';
const AttendantStatus = () => {
    const [dept_name_field,setDept_name_field]=useState("");
    const [course_id,setCourse_id]=useState("");
    const [courses,setCourses]=useState([]);
    const [departments,setDepartments]=useState([]);
    const [firstPop,setFirstPop]=useState(true);
    const closeFirstPopUp=()=>{
        setFirstPop(false);
    }
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
        getAllCourses();
        getAllDepartments();
    })
  return (
    <Wrapper>
        <NavBar/>
        <InternalWrapper>
            <SearchBar>
                <Button style={{width:'250px'}}>Get most attended student</Button>
                <Button style={{width:'300px'}}>Get lectures have missing student more</Button>
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
        </InternalWrapper>
    </Wrapper>
  )
}

export default AttendantStatus
