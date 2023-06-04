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
    const [course_id,setCourse_id]=useState("ECOM3422");
    const [firstPop,setFirstPop]=useState(true);
    const [searchParams,setSearchParams]=useState("");
    const [DummyState,setDummyState]=useState(0);
    const [courses,setCourses]=useState([]);
    const [departments,setDepartments]=useState([]);
    const [isSelectedAdd,setIsSelectedAdd]=useState(false);
    const [isYearMistake,setIsYearMistake]=useState(false);
    const [missingPop,setMissingPop]=useState(false);
    const [missedClc,setMissedClc]=useState(0);
    const [mostAttend,setMostAttend]=useState(0);
    const [isOpenMost,setIsOpenMost]=useState(false);
    const [sec_id,setSec_id]=useState("");
    const [ObjToAdd,setObjToAdd]=useState({lecture_id:"",sec_id:"",room_number:"",building:"",day:"",start_time:"",end_time:"",semester:"",year:""})
    const closeFirstPopUp=()=>{
        setFirstPop(false);
    }
    const closeAddPopUp=()=>{
        setIsSelectedAdd(false);
    }
    const closeMostPopUp=()=>{
        setIsOpenMost(false);
    }
    const getAllCourses=async()=>{
        try{
        const response=await axios.get("http://localhost:5000/api/v1/course");
        setCourses(response.data.courses);
        
        }catch(error){
        }
        
    }
    const getAllDepartments=async()=>{
        try{
        const response=await axios.get("http://localhost:5000/api/v1/department");
        setDepartments(response.data.departments);
        
        }catch(error){
        }
        
    }
    const closeMissingPop=()=>{
        setMissingPop(false);
    }
    const AddLectures=async()=>{
        try{
            
            if(isNaN(ObjToAdd.year)){
                setIsYearMistake(true);
            }
            else{
                const{lecture_id, year,sec_id,room_number,building,day,start_time,end_time,semester} =ObjToAdd;
                console.log({course_id:course_id,lecture_id,year,sec_id,building,day,start_time,end_time,semester,room_number})
            const response=await axios.post("http://localhost:5000/api/v1/lecture",{course_id:course_id,lecture_id:lecture_id,year:year,sec_id:sec_id,building:building,day:day,start_time:start_time,end_time:end_time,semester:semester,room_number:room_number});
            setDummyState((prev)=>prev+1)
            }
        }catch(error){
            setDummyState((prev)=>prev+1)
        }
    }
    useEffect(()=>{
        getAllCourses();
        getAllDepartments();
    },[]);
    
  return (
    <Wrapper>
        <NavBar/>
        <InternalWrapper>
            <SearchBar>
            <Label style={{fontSize:'16px'}}>Search For Lectures  when search enter sec_id building room_number lecture_id sperately by space</Label>
            <Input onBlur={(e)=>{setSearchParams(e.target.value)}}  styles={{width:'800px'}}/>
            <Button onClick={()=>{
                setDummyState((prev)=>prev+1)
            }}>Search for lectures</Button>
            <Button onClick={()=>{
                setIsSelectedAdd(true);
            }}>Add Lectures</Button>
            </SearchBar>
            <SearchBar>
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
            <Button style={{width:'250px'}} onClick={()=>{
                setIsOpenMost(true);
            }}>Get most attended lectures</Button>
            <Button style={{width:'300px'}} onClick={()=>{
                setMissingPop(true);
            }}>Get lectures have missing student more</Button>
            </SearchBar>
            <TableViewerlectures SearchParams={searchParams} CourseId={course_id} dept_name={dept_name_field}
                recordChanges={DummyState} missed={missedClc} sec_id={sec_id} mostAttend={mostAttend}
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
                AddLectures();
            }}>Add Lectures</UpdateBtn>
        </Popup>
        <Popup isOpen={missingPop} onClose={closeMissingPop}>
            <Label>Sec ID</Label>
            <Input onBlur={(e)=>{
                setSec_id(e.target.value);
            }}/>
            <UpdateBtn onClick={()=>{
                setMissedClc((prev)=>prev+1);
            }}>Get Missing</UpdateBtn>
        </Popup>
        <Popup isOpen={isOpenMost} onClose={closeMostPopUp}>
            <Label>Sec ID</Label>
            <Input onBlur={(e)=>{
                setSec_id(e.target.value);
            }}/>
            <UpdateBtn onClick={()=>{
                setMostAttend((prev)=>prev+1);
            }}>Get Most attended</UpdateBtn>
        </Popup>
    </Wrapper>
  )
}

export default LecturePage