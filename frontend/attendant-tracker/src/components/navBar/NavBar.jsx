import {useEffect,useState} from 'react'
import { Stynav,Label } from './navBar.styles';
import { Link} from 'react-router-dom';
import axios from 'axios';
const NavBar = () => {
  const [isAdmin,setIsAdmin]=useState(false);
  useEffect(()=>{
    const callingRole=async()=>{
      try{
      const response=await axios.get("http://localhost:5000/api/v1/auth/verify");
      if(response.user.role==="Admin"){
        setIsAdmin(true);
      }
      }catch(err){
        console.log(err);
      }
    }
    callingRole();
})
  return (
    <Stynav>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/">Student</Link></Label>
        {isAdmin && <>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/lectures">Lectures</Link></Label>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/courses">Courses</Link></Label>
        <Label><Link style={{textDecoration:"none",color:"black"}} to="/attendantReport">Attendant-tracker</Link></Label>
        </>
        }
    </Stynav>
  )
}

export default NavBar;