import {useState,useEffect} from 'react'
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import axios from 'axios';
import Popup from '../Popup/Popup';
const TableViewerlectures = ({missed,SearchParams,CourseId,dept_name,recordChanges,sec_id}) => {
    const arr=["lecture_id","sec_id","room_number","building","day","start_time","end_time"];
    const [Data,setData]=useState([]);
    const [isSelectedToEdit,setIsSelectedToEdit]=useState({lecture_id:"",sec_id:"",room_number:"",building:"",day:"",start_time:"",end_time:""});
    const [isOpenEdit,setIsOpenEdit]=useState(false);
    const [oldID,setOldID]=useState(0);
    const [oldSec,setOldSec]=useState(0);
    const onFirstLoad=async()=>{
        try{
        console.log(dept_name," ",CourseId);
        console.log(`http://localhost:5000/api/v1/lecture/${dept_name}/${CourseId}`);
        const response=await axios.get(`http://localhost:5000/api/v1/lecture/${dept_name}/${CourseId}`);
        setData(response.data.lectures);
        console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }
    const bringMissing=async()=>{
        try{
        const response=await axios.get(`http://localhost:5000/api/v1/lecture/missed/${CourseId}/${sec_id}`);
        setData(response.data.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(missed!==0){
            bringMissing();
        }
    },[missed])
    const onSearch=async()=>{
        try{
            const response=await axios.get(`http://localhost:5000/api/v1/lecture/search/${CourseId}/${dept_name}/${SearchParams}`);
            setData([response.data.lecture]);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }
    const UpdateRecord=async()=>{
        try{
            console.log('Course ID: ',CourseId);
            const {lecture_id,sec_id,room_number,building,day,start_time,end_time} =isSelectedToEdit;
            const response=await axios.put(`http://localhost:5000/api/v1/lecture/${oldID}/${CourseId}/${oldSec}`,{lecture_id,sec_id,room_number,building,day,start_time,end_time,course_id:CourseId});
            console.log("old id: ",oldID);
            console.log(response.data);
            onFirstLoad();
        }catch(error){
            console.log(error);
        }
    }
    const closePop=()=>{
        setIsOpenEdit(false);
    }
    useEffect(()=>{
        if(SearchParams===""){
        onFirstLoad();
        }else{
            onSearch();
        }
    },[recordChanges,CourseId,dept_name]);
    const DeleteRecord=async()=>{
        try{
            console.log("section id: ",oldSec);
            console.log("url is: ",`http://localhost:5000/api/v1/lecture/${oldID}/${CourseId}/${oldSec}`);
            const response=await axios.delete(`http://localhost:5000/api/v1/lecture/${oldID}/${CourseId}/${oldSec}`,isSelectedToEdit);
            console.log(response);
            onFirstLoad();
        }catch(error){
            console.log(error);
            // onFirstLoad();
        }
    }
  return (
    <WrapperViewer>
        <ColumnBar>
            {arr.map((el,index)=>(
                <ColumnTitle key={index}>{el}</ColumnTitle>
            ))}
        </ColumnBar>
        {Data.map((el,index)=>(
            <ColumnRecord key={index}>
                <ColumnTitle key={index}>{el.lecture_id}</ColumnTitle>
                <ColumnTitle key={index}>{el.sec_id}</ColumnTitle>
                <ColumnTitle key={index}>{el.room_number}</ColumnTitle>
                <ColumnTitle key={index}>{el.building}</ColumnTitle>
                <ColumnTitle key={index}>{el.day}</ColumnTitle>
                <ColumnTitle key={index}>{el.start_time}</ColumnTitle>
                <ColumnTitle key={index}>{el.end_time}</ColumnTitle>
                <UpdateBtn onClick={()=>{
                    console.log(el);
                    setIsSelectedToEdit(el);
                    setOldID(el.lecture_id);
                    setOldSec(el.sec_id);
                    setIsOpenEdit(true);
                    console.log(isSelectedToEdit);
                }}>Edit</UpdateBtn>
                <DelBtn onClick={()=>{
                    setIsSelectedToEdit(el);
                    setOldID(el.lecture_id);
                    setOldSec(el.sec_id);
                    DeleteRecord();
                }}>Delete</DelBtn>
            </ColumnRecord>
        ))}
        <Popup isOpen={isOpenEdit} onClose={closePop}> 
            <h2>Lecture ID</h2>
            <Input defaultValue={isSelectedToEdit.lecture_id}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.lecture_id = e.target.value;
                        console.log(p);
                        return p;
                    });
                }}
            />
            <h2>Section ID</h2>
            <Input defaultValue={isSelectedToEdit.sec_id}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.sec_id = e.target.value;
                        console.log(p);
                        return p;
                    });
                }}
            />
            <h2>Room Number</h2>
            <Input defaultValue={isSelectedToEdit.room_number}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.room_number= e.target.value;
                        console.log(p);
                        return p;
                    });
                }}
            />
            <h2>Building</h2>
            <Input defaultValue={isSelectedToEdit.building}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.building = e.target.value;
                        console.log(p);
                        return p;
                    });
                }}
            />
            <h2>Day</h2>
            <Input defaultValue={isSelectedToEdit.day}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.day= e.target.value;
                        console.log(p);
                        return p;
                    });
                }}
            />
            <h2>Start Time</h2>
            <Input defaultValue={isSelectedToEdit.start_time}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.start_time= e.target.value;
                        console.log(p);
                        return p;
                    });
                }}
            />
            <h2>End Time</h2>
            <Input defaultValue={isSelectedToEdit.end_time} onBlur={(e)=>{
                    setIsSelectedToEdit((prev) => {
                        const p = prev;
                        p.end_time= e.target.value;
                        console.log(p);
                        return p;
                    });
                }}

                />
            <UpdateBtn onClick={()=>UpdateRecord()}>Update Record</UpdateBtn>
        </Popup>
    </WrapperViewer>
  )
}

export default TableViewerlectures