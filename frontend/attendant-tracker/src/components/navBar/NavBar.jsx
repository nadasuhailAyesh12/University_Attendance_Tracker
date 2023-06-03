import { useEffect, useState } from 'react'
import { Stynav, Label } from './navBar.styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
const NavBar = ({role}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // const callingRole = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/api/v1/auth/verify");
    //     console.log(response.status);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // callingRole();
    if(role==="Admin"){
      setIsAdmin(true);
    }
  })
  // const NavBar = ({ role }) => {
  //   const [isAdmin, setIsAdmin] = useState(false);
  //   const callingRole = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/v1/auth/verify");
  //       console.log(response);
  //       // if(response.user.role==="Admin"){
  //       //   setIsAdmin(true);
  //       // }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   // }
  //   // // const [rolo,setRolo]=useState(role);
  //   useEffect(() => {
  //     callingRole();

  //   }, [])
  return (
    <Stynav>
      <Label><Link style={{ textDecoration: "none", color: "black" }} to="/student">Student</Link></Label>
      <Label><Link style={{ textDecoration: "none", color: "black" }} to="/lectures">Lectures</Link></Label>
      {role === "Admin" && <> 
      <Label><Link style={{ textDecoration: "none", color: "black" }} to="/courses">Courses</Link></Label>
      <Label><Link style={{ textDecoration: "none", color: "black" }} to="/attendStatus">Attendant-Status</Link></Label>
      <Label><Link style={{ textDecoration: "none", color: "black" }} to="/inst">Instructor</Link></Label>
      </>
      }

    </Stynav>
  )
}

export default NavBar;