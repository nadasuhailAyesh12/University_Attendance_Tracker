import { useEffect, useState } from 'react'
import { Stynav, Label } from './navBar.styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
const NavBar = ({role}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  // const callingRole = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/v1/auth/verify");
  //     console.log(response);
  //     // if(response.user.role==="Admin"){
  //     //   setIsAdmin(true);
  //     // }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const [rolo,setRolo]=useState(role);
  useEffect(() => {
    
  
  },[])
  return (
    <Stynav>
      <Label><Link style={{ textDecoration: "none", color: "black" }} to="/">Student</Link></Label>
      {rolo==="Admin" && <>
        <Label><Link style={{ textDecoration: "none", color: "black" }} to="/lectures">Lectures</Link></Label>
        <Label><Link style={{ textDecoration: "none", color: "black" }} to="/courses">Courses</Link></Label>
        <Label><Link style={{ textDecoration: "none", color: "black" }} to="/attendantReport">Attendant-tracker</Link></Label>
      </>
      }
      
    </Stynav>
  )
}

export default NavBar;