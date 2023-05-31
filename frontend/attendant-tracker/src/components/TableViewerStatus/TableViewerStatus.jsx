import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import Popup from '../Popup/Popup';
import { ToastContainer, toast } from 'react-toastify';
import { showingError } from '../../App';
const TableViewerStatus=({course_id,sec_id,recordChanges})=>{
    const arr=["lecture_id","no of attending students","attendance percentage"];
    const [data,setData]=useState([]);
    const LoadLectures=async()=>{
        console.log(recordChanges);
        console.log(`http://localhost:5000/api/v1/lecture/attendanceStatus/${course_id}/${sec_id}`,"what is this route")
        if(recordChanges!==0){
        try{
        const response=await axios.get(`http://localhost:5000/api/v1/lecture/attendanceStatus/${course_id}/${sec_id}`);
        setData(response.data.data);

        }catch(error){
            showingError(error.response.data.message);
            toast(error.message);
        }
    }
    }
    useEffect(()=>{LoadLectures()},
    [course_id,sec_id,recordChanges]);
    return(
        <WrapperViewer>
            <ColumnBar>
            {arr.map((element, index) => (<ColumnTitle style={{width:'200px'}} key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
            {data.map((element, index) =>(
                <ColumnRecord>
                    <ColumnTitle style={{width:'200px'}}>{element.lecture_id}</ColumnTitle>
                    <ColumnTitle style={{width:'200px'}}>{element.count}</ColumnTitle>
                    <ColumnTitle style={{width:'200px'}}>{element.attendanceRatio}</ColumnTitle>
                </ColumnRecord>
            ))}
        </WrapperViewer>
    )
}
export default TableViewerStatus;