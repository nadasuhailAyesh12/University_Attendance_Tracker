import React from 'react'
import { Stynav,Label } from './navBar.styles';
import { Link} from 'react-router-dom';
const NavBar = () => {
  return (
    <Stynav>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/">Student</Link></Label>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/lectures">Lectures</Link></Label>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/courses">Courses</Link></Label>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/attendantReport">Attendant-tracker</Link></Label>
    </Stynav>
  )
}

export default NavBar;