import { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperViewer, ColumnBar, ColumnTitle, ColumnRecord, UpdateBtn, DelBtn, AddAttendance, Input } from '../TableViewer/TableViewer.styles';
import Popup from '../Popup/Popup';
import { showingError } from '../../App';
const TableViewerCourse=({recordChanges,TextString})=>{
    const [Data,setData]=useState([]);
    const arr=["course_id","title","dept_name","book"];
    const sectionTitles=["sec_id","course_id","building","room_number","day","start_time","end_time"];
    const [isOpenEdit,setIsOpenEdit]=useState(false);
    const [isSelectedToEdit,setIsSelectedToEdit]=useState({course_id:"",title:"",dept_name:"",book:""});
    const [isAddedRecord,setIsAddRecord]=useState(recordChanges);
    const [isOpenShowing,setIsOpenShowing]=useState(false);
    const [IDShowing,setIDShowing]=useState("");
    const [IDShowSection,setIDShowSection]=useState("");
    const [sectionRelated,setSectionRelated]=useState([]);
    const [isOpenAddSec,setIsOpenAddSec]=useState(false);
    const [AddedSection,setAddedSection]=useState({sec_id:"",semester:"",year:"",room_number:"",building:"",start_time:"",end_time:"",day:"",ID:""});
    // sec_id, semester, year, room_number, building, start_time, end_time, day, ID

    const onFirstLoad=async()=>{
        try{
        console.log(recordChanges);
        const response=await axios.get("http://localhost:5000/api/v1/course");
        setData(response.data.courses);
        console.log(response);
        }catch(error){
            showingError(error.response.data.message);
            console.log(error);
        }

    }
    useEffect(()=>{
        if(IDShowSection!==""){
            onShowSection();
        }
    },[IDShowSection])
    const closePopup = () => {
        if(isOpenEdit){
       setIsOpenEdit(false);
        }
        
   };
   const Search=async()=>{
    const response=await axios.get(`http://localhost:5000/api/v1/course/${TextString}`);
    setData(response.data.course);
   }
   const closeShowing=()=>{
    setSectionRelated([]);
    setIsOpenShowing(false);
   }
   const openPopup = () => {
    setIsOpenEdit(true);
};
const closeAddSectionPop=()=>{
    setIsOpenAddSec(false);
}
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
const onUpdateCourse=async()=>{
    try{
        console.log(isSelectedToEdit);
        console.log(IDShowing);
        const response=await axios.put(`http://localhost:5000/api/v1/course/${IDShowing}`,isSelectedToEdit);
        console.log(response.data);
        onFirstLoad();
    }catch(error){
        showingError(error.response.data.message);
        console.log(error);
    }
}
const onAddSection=async()=>{
 try{
    console.log(AddedSection);
    const response=await axios.post(`http://localhost:5000/api/v1/section/${IDShowing}`,AddedSection);
    console.log(response.data);


 }catch(error){
    showingError(error.response.data.message);
    console.log(error);
 }
}
const onShowSection=async()=>{
    try{
        console.log(IDShowSection);
        const response = await axios.get(`http://localhost:5000/api/v1/section/${IDShowSection}`);
        setSectionRelated(response.data.sections);
    }catch(err){
        showingError(err.response.data.message);
        console.log(err);
    }
}
const onDeleteCourse=async()=>{
    try{
        if(window.confirm('Are you sure to delete this')){
        const response=await axios.delete(`http://localhost:5000/api/v1/course/${IDShowing}`);
        console.log(IDShowing," ",response.data);
        onFirstLoad();
        }
    }catch(err){
        showingError(err.response.data.message);
        console.log(err);
    }
}
    useEffect(()=>{
        onFirstLoad();
    },[recordChanges])
    useEffect(()=>{
        if(TextString===""){
            onFirstLoad();
        }else{
            Search();
        }
    },[TextString]);
    return(
        <WrapperViewer>
            <ColumnBar>
                {arr.map((element,index)=>(<ColumnTitle key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
            {Data.map((el,index)=>(
                <ColumnRecord>
                    <ColumnTitle key={index}>{el.course_id}</ColumnTitle>
                    <ColumnTitle key={index}>{el.title}</ColumnTitle>
                    <ColumnTitle key={index}>{el.dept_name}</ColumnTitle>
                    <ColumnTitle key={index}>{el.book}</ColumnTitle>
                    <UpdateBtn onClick={()=>{
                        openPopup();
                        setIsSelectedToEdit(el);
                        setIDShowing(el.course_id);
                    }}>Edit</UpdateBtn>
                    <DelBtn onClick={()=>{
                        setIDShowing(el.course_id);
                        onDeleteCourse();
                    }}>Delete</DelBtn>
                    <UpdateBtn onClick={()=>{
                       setIDShowSection(el.course_id);
                       setIsOpenShowing(true);
                        // console.log("click: ",IDShowSection);
                        // wait(2000);
                        // onShowSection();
                        // console.log(IDShowSection,"id after");
                        // setIsOpenShowing(true);
                        // console.log("open showing...",IDShowSection);
                        
                    }}>Show Section</UpdateBtn>
                    <UpdateBtn onClick={()=>{
                        setIDShowing(el.course_id);
                        setIsOpenAddSec(true);
                    }}>Add Section</UpdateBtn>
                </ColumnRecord>
            ))}
            <Popup isOpen={isOpenEdit} onClose={closePopup}>
                <h2>Course ID</h2>
                <Input defaultValue={isSelectedToEdit.course_id}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.course_id=e.target.value;
                        return b;
                    })
                }} />
                <h2>title</h2>
                <Input defaultValue={isSelectedToEdit.title}
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.title=e.target.value;
                        return b;
                    })
                }} 
                />
                <h2>Department name</h2>
                <Input defaultValue={isSelectedToEdit.dept_name} 
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.dept_name=e.target.value;
                        return b;
                    })
                }} 
                />
                <h2>book</h2>
                <Input defaultValue={isSelectedToEdit.book} 
                onBlur={(e)=>{
                    setIsSelectedToEdit((prev)=>{
                        const b=prev;
                        b.book=e.target.value;
                        return b;
                    })
                }}/>
                 <UpdateBtn onClick={()=>onUpdateCourse()}>Update course</UpdateBtn>
            </Popup>
            <Popup style={{width:'850px'}} isOpen={isOpenShowing} onClose={closeShowing}>
            <WrapperViewer>
            <ColumnBar>
                {sectionTitles.map((element,index)=>(<ColumnTitle key={index}>{element}</ColumnTitle>))}
            </ColumnBar>
                {sectionRelated.map((el,index)=>(
                    <ColumnRecord >
                        <ColumnTitle key={index}>{el.sec_id}</ColumnTitle>
                        <ColumnTitle key={index}>{el.course_id}</ColumnTitle>
                        <ColumnTitle key={index}>{el.building}</ColumnTitle>
                        <ColumnTitle key={index}>{el.room_number}</ColumnTitle>
                        <ColumnTitle key={index}>{el.day}</ColumnTitle>
                        <ColumnTitle key={index}>{el.start_time}</ColumnTitle>
                        <ColumnTitle key={index}>{el.end_time}</ColumnTitle>
                    </ColumnRecord>
                ))}
                </WrapperViewer>
            </Popup>
            <Popup isOpen={isOpenAddSec} onClose={closeAddSectionPop}>
            <h2>section ID</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.sec_id=e.target.value;
                        return b;
                    })
                }}/>
                <h2>semester</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.semester=e.target.value;
                        return b;
                    })
                }}/>
                <h2>year</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.year=e.target.value;
                        return b;
                    })
                }}/>
                <h2>room number</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.room_number=e.target.value;
                        return b;
                    })
                }}/>
                <h2>building</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.building=e.target.value;
                        return b;
                    })
                }}/>
                <h2>start time</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.start_time=e.target.value;
                        return b;
                    })
                }}/>
                <h2>end time</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.end_time=e.target.value;
                        return b;
                    })
                }}/>
                <h2>day</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.day=e.target.value;
                        return b;
                    })
                }}/>
                <h2>Instructor ID</h2>
                <Input onBlur={(e)=>{
                    setAddedSection((prev)=>{
                        const b=prev;
                        b.ID=e.target.value;
                        return b;
                    })
                }}/>
                <UpdateBtn onClick={onAddSection}>Add</UpdateBtn>
                </Popup>
        </WrapperViewer>


    );
};
export default TableViewerCourse;