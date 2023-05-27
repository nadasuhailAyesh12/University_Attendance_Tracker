import {useState,useEffect} from 'react'
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import axios from 'axios';
import Popup from '../Popup/Popup';
const TableViewerlectures = ({SearchParams,CourseId,dept_name,recordChanges}) => {
    const arr=["lecture_id","sec_id","room_number","building","day","start_time","end_time"];
    const [Data,setData]=useState([]);
    const [isSelectedToEdit,setIsSelectedToEdit]=useState({lecture_id:"",sec_id:"",room_number:"",building:"",day:"",start_time:"",end_time:""});
    const [isOpenEdit,setIsOpenEdit]=useState(false);
    useEffect(()=>{

    })
    const onFirstLoad=async()=>{
        try{
        const response=await axios.get(`http://localhost:5000/api/v1/lecture/${dept_name}/${CourseId}`);
        setData(response.data.lectures);
        console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }
    const onSearch=async()=>{
        try{
            const response=await axios.get(`http://localhost:5000/api/v1/lecture/search/${CourseId}/${dept_name}/${SearchParams}`);
            setData([response.data.lecture]);
            console.log(response.data);
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
    },[recordChanges])
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
                    setIsSelectedToEdit(el);
                    setIsOpenEdit(true);
                    console.log(isSelectedToEdit);
                }}>Edit</UpdateBtn>
                <DelBtn>Delete</DelBtn>
            </ColumnRecord>
        ))}
        <Popup isOpen={isOpenEdit} onClose={closePop}> 
            <h2>Lecture ID</h2>
            <Input defaultValue={isSelectedToEdit.lecture_id}/>
            <h2>Section ID</h2>
            <Input defaultValue={isSelectedToEdit.sec_id}/>
            <h2>Room Number</h2>
            <Input defaultValue={isSelectedToEdit.room_number}/>
            <h2>Building</h2>
            <Input defaultValue={isSelectedToEdit.building}/>
            <h2>Day</h2>
            <Input defaultValue={isSelectedToEdit.day}/>
            <h2>Start Time</h2>
            <Input defaultValue={isSelectedToEdit.start_time}/>
            <h2>End Time</h2>
            <Input defaultValue={isSelectedToEdit.end_time}/>
            <UpdateBtn>Update Record</UpdateBtn>
        </Popup>
    </WrapperViewer>
  )
}

export default TableViewerlectures