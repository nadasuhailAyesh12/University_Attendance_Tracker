import React, { useState } from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from './StudentPage.styles';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewer from '../../components/TableViewer/TableViewer';
const StudentPage = () => {
  const [SearchParams,setSearchParams]=useState('');
  const [TextString,setTextString]=useState('');
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Perform some action when Enter key is pressed
      setSearchParams("");
      // Additional code here...
    }
  };
  return (
    <Wrapper>
    <NavBar/>
    <InternalWrapper>
        <SearchBar>
        <Label>Search For Student</Label>
            <Input onBlur={(e)=>setTextString(e.target.value)} onKeyDown={handleKeyPress}/>
            <Button onClick={()=>setSearchParams("name")}>Search by name</Button>
            <Button onClick={()=>setSearchParams("id")}>Search by id</Button>
            <Button onClick={()=>setSearchParams("phone")}>Search by phone</Button>
        </SearchBar>
        <TableViewer WhichSection="student" SearchParams={SearchParams} TextString={TextString}/>
    </InternalWrapper>
    </Wrapper>
  )
}

export default StudentPage