import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from './TableViewer.styles';
import Popup from '../Popup/Popup';
const TableViewer = ({ WhichSection,SearchParams,TextString }) => {
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
        setIsOpenEdit(false);
    };
    const onFetchUpdate = async () => {
        const { ID, first_name, middle_initial, middle_final, final_name, dept_name, location } = isSelectedToEdit;
        const ChoosenId = oldId;
        const res = await axios.put(`http://localhost:5000/api/v1/student/${ChoosenId}`, { ID, first_name, middle_initial, middle_final, final_name, dept_name, location });
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
                const response = await axios.get('http://localhost:5000/api/v1/student');
                setData(response.data.students);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the fetchData function
    }
    useEffect(onFirstLoad, []);
    const onDeleteRecord=async(id)=>{
        try{
            console.log(id);
        const res=await axios.delete(`http://localhost:5000/api/v1/student/${id}`);
        console.log(res.data);
        onFirstLoad();
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        const fetch = async () => {
            console.log(SearchParams);
            if(SearchParams==="" && TextString===""){
                onFirstLoad();
            }
            if(SearchParams==="name"){
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student/name/${TextString}`);
                console.log(response.data);
                setData([response.data.student])
            } catch (error) {
                console.log(error);
            }
        }
        else if(SearchParams==="id"){
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student/id/${TextString}`);
                console.log(response.data,"hiiiiiiii",+Math.random()*10);
                setData([response.data.student])
            } catch (error) {
                console.log(error);
            }
        }
        else if(SearchParams==="id"){
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student/id/${TextString}`);
                console.log(response.data,"hiiiiiiii",+Math.random()*10);
                setData([response.data.student])
            } catch (error) {
                console.log(error);
            }
        }
        else if(SearchParams==="phone"){
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/student/phone/${TextString}`);
                console.log(response.data,"hiiiiiiii",+Math.random()*10);
                setData([response.data.student])
            } catch (error) {
                console.log(error);
            }
        }
        };

        fetch();

    },[SearchParams,TextString]);
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