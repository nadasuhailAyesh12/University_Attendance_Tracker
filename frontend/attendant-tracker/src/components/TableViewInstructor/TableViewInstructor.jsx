import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import Popup from '../Popup/Popup';
import { Label } from '../../components/navBar/navBar.styles';

const TableViewInstructor=({TextString})=>{
    const arr=["id","name","dept_name","role"];
    const [Data,setData]=useState([]);
    const [isSelectedToEdit,setIsSelectedToEdit]=useState({id:"",name:"",dept_name:"",role:""});
    const [isOpenEdit,setIsOpenEdit]=useState(false);
    const [showingID,setShowingID]=useState("");
    const OnFirstLoad=async()=>{
        try{
        const response=await axios.get("http://localhost:5000/api/v1/instructor");
        setData(response.data.instructors);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        OnFirstLoad();
    },[]);
    useEffect(()=>{
        if(TextString===""){
            OnFirstLoad();
        }
        else{
            onSearch();
        }
    },[TextString])
    const onSearch=async()=>{
        try{
        const response=await axios.get(`http://localhost:5000/api/v1/instructor/${TextString}`);
        setData(response.data.instructor);
        }catch(error){
            console.log(error);
        }
    }
    const closeEditPopUp=()=>{
        setIsOpenEdit(false);
    }
    const onUpdate=async()=>{
        try{
            const {dept_name,role,name}=isSelectedToEdit;
            console.log(dept_name);
            const response=await axios.put(`http://localhost:5000/api/v1/instructor/${showingID}`,{ID:"320200629",name,dept_name,role});
            console.log(response.data);
            OnFirstLoad();
        }catch(error){
            console.log(error);
        }
    }
    const onDelete=async()=>{
        try{
            const response=await axios.delete(`http://localhost:5000/api/v1/instructor/${showingID}`);
            console.log(response);
            OnFirstLoad();
        }catch(error){
            console.log(error);
        }
    }
    return (
    <WrapperViewer style={{margin:'auto'}}>
        <ColumnBar>
                {arr.map((element, index) => (<ColumnTitle key={index}>{element}</ColumnTitle>))}
        </ColumnBar>
        
        
        {Data.map((element, index) => (<ColumnRecord>
        <ColumnTitle key={index}>{element.id}</ColumnTitle>
        <ColumnTitle key={index}>{element.name}</ColumnTitle>
        <ColumnTitle key={index}>{element.dept_name}</ColumnTitle>
        <ColumnTitle key={index} style={{width:"250px"}}>{element.role}</ColumnTitle>
        <UpdateBtn onClick={()=>{
            setIsSelectedToEdit(element);
            setShowingID(element.id);
            setIsOpenEdit(true);
        }}>Edit</UpdateBtn>
        <DelBtn onClick={()=>{
            setShowingID(element.id);
            onDelete()}}>Delete</DelBtn>
        </ColumnRecord>
        ))}
        <Popup isOpen={isOpenEdit} onClose={closeEditPopUp}>
            <Label>Instructor id</Label>
            <Input defaultValue={isSelectedToEdit.id}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.id=e.target.value;
                        return b;
                    })
                }} 
            />
            <Label>Instructor name</Label>
            <Input defaultValue={isSelectedToEdit.name}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.name=e.target.value;
                        return b;
                    })
                }} 
            />
            <Label>department name</Label>
            <Input defaultValue={isSelectedToEdit.dept_name}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.dept_name=e.target.value;
                        return b;
                    })
                }} 
            />
            <Label>role</Label>
            <Input defaultValue={isSelectedToEdit.role}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.role=e.target.value;
                        return b;
                    })
                }} 
            />
            <UpdateBtn onClick={()=>{
                onUpdate();
            }}>Update Instructor</UpdateBtn>
        </Popup>
    </WrapperViewer>);

}
export default TableViewInstructor;