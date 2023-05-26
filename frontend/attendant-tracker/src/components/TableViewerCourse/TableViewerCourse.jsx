import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import Popup from '../Popup/Popup';
const TableViewerCourse=()=>{
    const arr=["course_id","title","dept_name","book"];
    const arr1=[{course_id:"ECOM3422",title:"DBMS",dept_name:"Engineering",book:"DBMS7thedition"}];
    return(
        <WrapperViewer>
            <ColumnBar>
                {arr.map((element,index)=>(<ColumnTitle key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
            {arr1.map((el,index)=>(
                <ColumnRecord>
                    <ColumnTitle key={index}>{el.course_id}</ColumnTitle>
                    <ColumnTitle key={index}>{el.title}</ColumnTitle>
                    <ColumnTitle key={index}>{el.dept_name}</ColumnTitle>
                    <ColumnTitle key={index}>{el.book}</ColumnTitle>
                </ColumnRecord>
                
            ))}
        </WrapperViewer>


    );
};
export default TableViewerCourse;