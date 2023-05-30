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
    const [isSelectedAdd,setIsSelectedAdd]=useState(false);
    const [isYearMistake,setIsYearMistake]=useState(false);
    const [ObjToAdd,setObjToAdd]=useState({lecture_id:"",sec_id:"",room_number:"",building:"",day:"",start_time:"",end_time:"",semester:"",year:""})
    const closeFirstPopUp=()=>{
        setFirstPop(false);
    }
    const closeAddPopUp=()=>{
        setIsSelectedAdd(false);
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
    const AddLectures=async()=>{
        console.log("added");
        try{
            
            if(isNaN(ObjToAdd.year)){
                setIsYearMistake(true);
            }
            else{
             const{lecture_id, year,sec_id,room_number,building,day,start_time,end_time,semester} =ObjToAdd;
            const response=await axios.post("http://localhost:5000/api/v1/lecture",{course_id:course_id,lecture_id,year,sec_id,building,day,start_time,end_time,semester,room_number});
            setDummyState((prev)=>prev+1)
            console.log(response);
            }
        }catch(error){
            setDummyState((prev)=>prev+1)
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
            <Button onClick={()=>{
                setIsSelectedAdd(true);
            }}>Add Lectures</Button>
            <Label>Select course_id</Label>
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
        <Popup onClose={closeAddPopUp} isOpen={isSelectedAdd}>
            <Label>Lecture ID</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.lecture_id=e.target.value;
                    return p;
                })
            }}/>
            <Label>Section ID</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.sec_id=e.target.value;
                    return p;
                })
            }}/>
            <Label>Room Number</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.room_number=e.target.value;
                    return p;
                })
            }}/>
            <Label>Building</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.building=e.target.value;
                    return p;
                })
            }}/>
            <Label>day</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.day=e.target.value;
                    return p;
                })
            }}/>
            <Label>Start Time</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.start_time=e.target.value;
                    return p;
                })
            }}/>
            <Label>End Time</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.end_time=e.target.value;
                    return p;
                })
            }}/>
            <Label>Semester</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.semester=e.target.value;
                    return p;
                })
            }}/>
            <Label>Year</Label>
            <Input onBlur={(e)=>{
                setObjToAdd((prev)=>{
                    const p=prev;
                    p.year=e.target.value;
                    return p;
                })
            }}/>
            { isYearMistake && <Label style={{color:'red'}}>Year should be a number</Label> }
            <UpdateBtn onClick={()=>{
                console.log("fuck");
                AddLectures();
            }}>Add Lectures</UpdateBtn>
        </Popup>

    </Wrapper>
  )
}

export default LecturePage