import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/NavBar';
import Popup from '../../components/Popup/Popup';
import {Wrapper,InternalWrapper,SearchBar,Input,Button} from '../StudentPage/StudentPage.styles';
import {Label} from '../../components/navBar/navBar.styles';
import TableViewInstructor from '../../components/TableViewInstructor/TableViewInstructor';
const InstructorPage = () => {
  return (
    <Wrapper>
      <NavBar/>
      <SearchBar>
      <Label>Search for Instructor</Label>
      <Input/>
      </SearchBar>
      <TableViewInstructor/>
    </Wrapper>
  )
}

export default InstructorPage