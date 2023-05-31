import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from './TableViewer.styles';
import Popup from '../Popup/Popup';
import { ToastContainer, toast } from 'react-toastify';
import { Label } from '../navBar/navBar.styles';
import { showingError } from '../../App';
import { handleDelete } from '../../App';
const TableViewer = ({ mostCommit,WhichSection,TextString,course_id,dept_name,sec_id,Addition,SearchParams,Consecutive}) => {
    const [WhichSectionSt, setWhichSectionSt] = useState(WhichSection);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenUpdateAdd, setIsUpdateAdd] = useState(false);
    const [IdtoAdd, setIdtoAdd] = useState(0);
    const [LectureId, setLectureId] = useState(0);
    const [lectureUpdateId,setLectureUpdateId]=useState(0);
    const [UpdateAttend,setUpdateAttend]=useState(0);
    const [isSelectedToEdit, setIsSelectedToEdit] = useState({ ID: 123, first_name: 'jo', middle_initial: "josd", middle_final: "sadas", final_name: "asdas", gender: "male", dept_name: "" });
    const [oldId, setOldId] = useState(0);
    const [data, setData] = useState(null);
    let arr = [];
    let arr1 = [];

    if (WhichSectionSt === "student") {
        arr = ["id", "first_name", "middle_first", "middle_final", "final_name", "gender", "location", "dept_name"];
        arr1 = ["123040", "Mohammed", "Suhail", "Khalil", "Ayesh", "male", "Gaza", "Engineering"];
    }
    const openPopup = () => {
        setIsOpenEdit(true);
    };

    const closePopup = () => {
         if(isOpenEdit){
        setIsOpenEdit(false);
         }
         else if(isOpenAdd){
            setIsOpenAdd(false);
         }
    };
    const showingError = (str) => {
        toast(str.message);
    }
    const onFetchUpdate = async () => {
        const { id, first_name, middle_initial, middle_final, final_name, dept_name, location } = isSelectedToEdit;
        const ChoosenId = oldId;
        console.log(ChoosenId);
        console.log("FIRST_NAME:",first_name);
        try{
        const res = await axios.put(`http://localhost:5000/api/v1/student/${ChoosenId}`, {ID:id, first_name, middle_initial, middle_final, final_name, dept_name, location });
        console.log(oldId);
        console.log(isSelectedToEdit);
        console.log(res.data);
        }catch(err){
            showingError(err.response.data.message);
        }
    }
    console.log(LectureId);
    const onAddAttendance = async () => {
        try{
        const res = await axios.post(`http://localhost:5000/api/v1/student/attend/${course_id}/${sec_id}/${IdtoAdd}`, { lecture_id: LectureId });
        console.log(res);
        }catch(err){
            showingError(err.response.data.message);
        }
    }
    const bringMostCommit=async()=>{
        console.log(`http://localhost:5000/api/v1/student/attend/${course_id}/${sec_id}`);
        try{
        const res=await axios.get(`http://localhost:5000/api/v1/student/attend/${course_id}/${sec_id}`);;
        console.log(res.data);
        setData(res.data.commitedStudents);
        }catch(err){
            showingError(err.response.data.message);
        }
    }
    const onFirstLoad=() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student/${dept_name}/${course_id}/${sec_id}`);
                console.log("First Load is Here")
                setData(response.data.students);
                console.log(sec_id);
            } catch (error) {
                showingError(error.response.data.message);
                console.log(error);
            }
        };

        fetchData(); // Call the fetchData function
    }
    const onFirstLoading=()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student`);
                console.log("First Load is Here")
                setData(response.data.students);
                console.log(sec_id);
            } catch (error) {
                showingError(error.response.data.message);
                console.log(error);
            }
        };

        fetchData();
    }
    const onSearch=async()=>{
        try{
        const response=await axios.get(`http://localhost:5000/api/v1/student/search/${TextString}`);
        setData([response.data.student])
        }catch(error){
            showingError(error.response.data.message);
            console.log(error);
        }
    }
    // const getAllStd=async()=>{
    //     try{
    //         const response=await axios.get('')
    //     }
    // }
    const onGetConsecutive=async()=>{
        try{
            const response=await axios.get(`http://localhost:5000/api/v1/student/misthreeconsecutive`);
            setData(response.data.uncommitedStudents);
        }catch(error){
            showingError(error.response.data.message);
            console.log(error);
        }
    }
    const closeUpdateAdd=()=>{
        setIsUpdateAdd(false);
    }
    useEffect(()=>{
        if(Consecutive!==0){
            onGetConsecutive();
        }
    },[Consecutive])
    useEffect(()=>{
        if(mostCommit!=0){
        bringMostCommit();
        }
    },[mostCommit])
    useEffect(()=>{
        if(SearchParams!==0){
            onFirstLoad();
        }
    } ,[sec_id,course_id,dept_name]);
    const onDeleteRecord=async(id)=>{
        try{
            if(window.confirm('Are you sure to delete this')){
            console.log(id);
        const res=await axios.delete(`http://localhost:5000/api/v1/student/${id}`);
        console.log(res.data);
        if(SearchParams===0){
            onFirstLoading();
        }else{
        onFirstLoad();
        }
        console.log(data);
        }
        }catch(error){
            showingError(error.response.data.message);
            console.log(error);
        }
    }
    useEffect(()=>{
        const fetch = async () => {
            console.log(SearchParams);
            if(TextString==="" && SearchParams===0){
                onFirstLoading();
            }
            else if(TextString==="" && SearchParams!==0){
                onFirstLoad();
            }
            else{
                onSearch();
            }
        };

        fetch();

    },[SearchParams,TextString,Addition]);
    return (
        <WrapperViewer style={{width:'110%'}}>
            <ColumnBar>
                {arr.map((element, index) => (<ColumnTitle  style={{width:'100px'}} key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
            {data && data.map((el, index) => (<ColumnRecord>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.id}</ColumnTitle>
                <ColumnTitle  style={{width:'100px'}} key={index}>{el.first_name}</ColumnTitle>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.middle_initial}</ColumnTitle>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.middle_final}</ColumnTitle>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.final_name}</ColumnTitle>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.gender}</ColumnTitle>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.location}</ColumnTitle>
                <ColumnTitle style={{width:'100px'}} key={index}>{el.dept_name}</ColumnTitle>
                <UpdateBtn onClick={() => {
                    openPopup();
                    setOldId(el.id);
                    setIsSelectedToEdit(el);
                    console.log(el);

                }}>Edit</UpdateBtn>
                <DelBtn onClick={() =>{//alert("are you sure");
                    onDeleteRecord(el.id);
                }}>Delete</DelBtn>
                <AddAttendance onClick={() => {
                    setIdtoAdd(el.id);
                    setIsOpenAdd(true);
                }}>Add Attendance</AddAttendance>
                <UpdateBtn onClick={async()=>{
                    try{
                    const response=await axios.get(`http://localhost:5000/api/v1/file/studentReport/${el.id}`,{responseType:'blob'});
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
                }}>Export Report</UpdateBtn>
                <UpdateBtn onClick={()=>{
                    setUpdateAttend(el.id);
                    setIsUpdateAdd(true);
                }}>Update Attendance</UpdateBtn>
            </ColumnRecord>))}
            {/* <ColumnRecord>
    {arr1.map((element,index)=>(<ColumnTitle key={index}>{element}</ColumnTitle>))}
    <UpdateBtn onClick={openPopup}>Edit</UpdateBtn>
    <DelBtn onClick={()=>alert("are you sure")}>Delete</DelBtn>
    <AddAttendance>Add Attendance</AddAttendance>
    </ColumnRecord> */}
            <Popup isOpen={isOpenEdit} onClose={closePopup} onUpdate={onFetchUpdate}>
                <h2>ID</h2>
                <Input defaultValue={isSelectedToEdit.id} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.ID = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
                <h2>First Name</h2>
                <Input defaultValue={isSelectedToEdit.first_name}
                    onChange={(e) => {
                        setIsSelectedToEdit((prev) => {
                            const p = prev;
                            p.first_name = e.target.value;
                            console.log(p);
                            return p;
                        });
                    }}
                />
                <h2>Middle first Name</h2>
                <Input defaultValue={isSelectedToEdit.middle_initial} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.middle_initial = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
                <h2>Middle second Name</h2>
                <Input defaultValue={isSelectedToEdit.middle_final} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.middle_final = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
                <h2>Last Name</h2>
                <Input defaultValue={isSelectedToEdit.final_name} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.final_name = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
                <h2>Gender</h2>
                <Input defaultValue={isSelectedToEdit.gender} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.gender = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
                <h2>Location</h2>
                <Input defaultValue={isSelectedToEdit.location} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.location = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
                <h2>Department name</h2>
                <Input defaultValue={isSelectedToEdit.dept_name} onChange={(e) => {
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.dept_name = e.target.value;
                        console.log(p);
                        return p;
                    });
                }} />
            </Popup>
            <Popup isOpen={isOpenAdd} onClose={closePopup} onAddAttendance={onAddAttendance}>
                <h2>Enter Lecture ID</h2>
                <Input onChange={(e) => {
                    setLectureId(e.target.value);
                }} />
            </Popup>
            <Popup isOpen={isOpenUpdateAdd} onClose={closeUpdateAdd}>
                <Label>Lecture ID</Label>
                <Input onBlur={(e)=>{
                    setLectureUpdateId(e.target.value);
                }}/>
                <UpdateBtn  onClick={async()=>{
                    try{
                        console.log({course_id,sec_id,UpdateAttend,lectureUpdateId})
                        const response=await axios.get(`http://localhost:5000/api/v1/file/updateStudentReport/${course_id}/${sec_id}/${UpdateAttend}/${lectureUpdateId}`,{responseType:'blob'});
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'file.xls');
                        document.body.appendChild(link);
                        link.click();
                        console.log(response);
                        // showingError(response.data.message)
                    }catch(error){
                        showingError(error.response.data.message);
                        // showingError(error.data.message)
                    }
                }}>Update Attendance</UpdateBtn>
            </Popup>
        </WrapperViewer>
    )
}

export default TableViewer
// just export