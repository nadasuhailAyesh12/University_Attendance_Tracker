import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import Popup from '../Popup/Popup';
const arr=["id","name","dept_name","role"];
const TableViewInstructor=({TextString})=>{
    return (
    <WrapperViewer style={{margin:'auto'}}>
        <ColumnBar>
                {arr.map((element, index) => (<ColumnTitle key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
    </WrapperViewer>);

}
export default TableViewInstructor;
