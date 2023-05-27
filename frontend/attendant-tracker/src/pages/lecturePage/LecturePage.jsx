import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import Popup from '../../components/Popup/Popup';
import {Label} from '../../components/navBar/navBar.styles';import { UpdateBtn } from '../../components/TableViewer/TableViewer.styles';
import {Selector} from './LecturePage.styles';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import TableViewerlectures from '../../components/TableViewerlectures/TableViewerlectures';
const LecturePage = () => {
    const [dept_name_field,setDept_name_field]=useState("");
    const [course_id,setCourse_id]=useState("");
    const [firstPop,setFirstPop]=useState(true);
    const [searchParams,setSearchParams]=useState("");
    const [DummyState,setDummyState]=useState(0);
    const [courses,setCourses]=useState([]);
    const [departments,setDepartments]=useState([]);
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
    },[])
  return (
    <Wrapper>
        <NavBar/>
        <InternalWrapper>
            <SearchBar>
            <Label>Search For Lectures</Label>
            <Input onBlur={(e)=>{setSearchParams(e.target.value)}}/>
            <Button onClick={()=>{
                setDummyState((prev)=>prev+1)
            }}>Search for lectures</Button>
            <Label>Select course_id</Label>
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
            <TableViewerlectures SearchParams={searchParams} CourseId={course_id} dept_name={dept_name_field}
                recordChanges={DummyState}
            />
        </InternalWrapper>
        <Popup isOpen={firstPop} onClose={closeFirstPopUp}>
            <Label>Department name</Label>
            <Input onBlur={(e)=>{
                setDept_name_field(e.target.value);
            }}/>
            <Label>Course id</Label>
            <Input onBlur={(e)=>{
                setCourse_id(e.target.value);
            }}/>
            <UpdateBtn onClick={()=>{
                setDummyState((prev)=>prev+1)
            }}>Load lectures</UpdateBtn>
        </Popup>
    </Wrapper>
  )
}

export default LecturePage