import React from 'react'
import { Stynav,Label } from './navBar.styles'
const NavBar = () => {
  return (
    <Stynav>
        <Label>Student</Label>
        <Label>Lectures</Label>
        <Label>Courses</Label>
        <Label>Attendance Tracker</Label>
    </Stynav>
  )
}

export default NavBar;