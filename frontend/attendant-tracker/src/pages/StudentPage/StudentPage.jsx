import React from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input} from './StudentPage.styles';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewer from '../../components/TableViewer/TableViewer';
const StudentPage = () => {
  return (
    <Wrapper>
    <NavBar/>
    <InternalWrapper>
        <SearchBar>
        <Label>Search For Student</Label>
            <Input/>
        </SearchBar>
        <TableViewer WhichSection="student"/>
    </InternalWrapper>
    </Wrapper>
  )
}

export default StudentPage