import React, { useState } from 'react'
import NavBar from '../../components/navBar/NavBar';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import { Label } from '../../components/navBar/navBar.styles';
import TableViewer from '../../components/TableViewer/TableViewer';
const CoursePage = () => {

  return (
    <Wrapper>
    <NavBar/>
    <InternalWrapper>
        <SearchBar>
        <Label>Search For Student</Label>
            <Input />
            <Button >Search by name</Button>
            <Button>Search by id</Button>
            <Button >Search by phone</Button>
        </SearchBar>
        <TableViewer/>
    </InternalWrapper>
    </Wrapper>
  )
}
export default CoursePage;