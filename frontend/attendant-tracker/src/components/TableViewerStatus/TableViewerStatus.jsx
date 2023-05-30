import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import Popup from '../Popup/Popup';
import { ToastContainer, toast } from 'react-toastify';
const TableViewerStatus=()=>{
    const arr=["lecture_id","attendance percentage","no of attending students"];
    return(
        <WrapperViewer>
            <ColumnBar>
            {arr.map((element, index) => (<ColumnTitle style={{width:'200px'}} key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
        </WrapperViewer>
    )
}
export default TableViewerStatus;