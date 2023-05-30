import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from './TableViewer.styles';
import Popup from '../Popup/Popup';
import { ToastContainer, toast } from 'react-toastify';
const TableViewer = ({ WhichSection,SearchParams,TextString,course_id,dept_name,sec_id,Addition}) => {
    const [WhichSectionSt, setWhichSectionSt] = useState(WhichSection);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [IdtoAdd, setIdtoAdd] = useState(0);
    const [LectureId, setLectureId] = useState(0);
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
        const res = await axios.put(`http://localhost:5000/api/v1/student/${ChoosenId}`, {ID:id, first_name, middle_initial, middle_final, final_name, dept_name, location });
        console.log(oldId);
        console.log(isSelectedToEdit);
        console.log(res.data);
    }
    console.log(LectureId);
    const onAddAttendance = async () => {
        const res = await axios.post(`http://localhost:5000/api/v1/student/attend/${IdtoAdd}`, { lecture_id: LectureId });
        console.log(res);
    }
    const onFirstLoad=() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student/${dept_name}/${course_id}/${sec_id}`);
                console.log("First Load is Here")
                setData(response.data.students);
                console.log(sec_id);
            } catch (error) {
                showingError(error.message);
                console.log(error);
            }
        };

        fetchData(); // Call the fetchData function
    }
    const onSearch=async()=>{
        try{
        const response=await axios.get(`http://localhost:5000/api/v1/student/search/${TextString}`);
        setData([response.data.student])
        }catch(error){
            showingError(error.message);
            console.log(error);
        }
    }
    useEffect(onFirstLoad, [sec_id,course_id,dept_name]);
    const onDeleteRecord=async(id)=>{
        try{
            console.log(id);
        const res=await axios.delete(`http://localhost:5000/api/v1/student/${id}`);
        console.log(res.data);
        onFirstLoad();
        }catch(error){
            showingError(error.message);
            console.log(error);
        }
    }
    useEffect(()=>{
        const fetch = async () => {
            console.log(SearchParams);
            if(TextString===""){
                onFirstLoad();
            }
            else{
                onSearch();
            }
        };

        fetch();

    },[SearchParams,TextString,Addition]);
    return (
        <WrapperViewer>
            <ColumnBar>
                {arr.map((element, index) => (<ColumnTitle key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
            {data && data.map((el, index) => (<ColumnRecord>
                <ColumnTitle key={index}>{el.id}</ColumnTitle>
                <ColumnTitle key={index}>{el.first_name}</ColumnTitle>
                <ColumnTitle key={index}>{el.middle_initial}</ColumnTitle>
                <ColumnTitle key={index}>{el.middle_final}</ColumnTitle>
                <ColumnTitle key={index}>{el.final_name}</ColumnTitle>
                <ColumnTitle key={index}>{el.gender}</ColumnTitle>
                <ColumnTitle key={index}>{el.location}</ColumnTitle>
                <ColumnTitle key={index}>{el.dept_name}</ColumnTitle>
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
        </WrapperViewer>
    )
}

export default TableViewer