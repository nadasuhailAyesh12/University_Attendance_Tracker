import React, { useState } from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewerCourse from '../../components/TableViewerCourse/TableViewerCourse';
const CoursePage = () => {
  const[TextString,setTextString]=useState("");
  return (
    <Wrapper>
    <NavBar/>
    <InternalWrapper>
        <SearchBar>
        <Label>Search For Course</Label>
            <Input onBlur={(e)=>{setTextString(e.target.value);
            console.log(e.target.value);}}/>
        </SearchBar>
        <TableViewerCourse/>
    </InternalWrapper>
    </Wrapper>
  )
}
export default CoursePage;