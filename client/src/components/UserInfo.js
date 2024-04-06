import React from 'react';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { AuthData } from '../services/AuthService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import "./../styles/UserInfo.css";


const UserInfo = () => {
    const {user} = AuthData();
    const [showPassword,setShowPassword] = useState(false);
    
    const handleShowPassword = () => {
       showPassword ? setShowPassword(false): setShowPassword(true);
    }
  return (
    <Card style ={{marginTop : "3rem", backgroundColor : "#5b5653", paddingRight : "0rem"}}>
    <Card.Body style ={{paddingRight : "4rem"}}>
      <div style ={{paddingLeft : "0.5rem", color : "#dbbda5", fontSize : "1.3rem", fontWeight : "medium", marginBottom : "0.8rem"}}>Account Details</div>  
      <Stack gap={3}>
      <div className="p-2" style ={{display : "flex", flexDirection: "column"}}><div style={{paddingBottom : "0.2rem", color : "white", fontSize : "1rem"}}>Full Name</div>
      <div className = "user">{JSON.parse(user.user).name}</div>
      <div style ={{border:"0.01rem solid gray", marginRight : "1rem"}}></div>
      </div>


      <div className="p-2" style ={{display : "flex", flexDirection: "column"}}><div style={{paddingBottom : "0.2rem", color : "white", fontSize : "1rem"}}>Email</div>
      <div className = "user">{JSON.parse(user.user).email}</div>
      <div style ={{border:"0.01rem solid gray", marginRight : "1rem"}}></div>
      </div>

      <div className="p-2" style ={{display : "flex", flexDirection: "column"}}><div style={{paddingBottom : "0.2rem", color : "white", fontSize : "1rem"}}>Username</div>
      <div className = "user">{JSON.parse(user.user).username}</div>
      <div style ={{border:"0.01rem solid gray", marginRight : "1rem"}}></div>
      </div>

      <div className="p-2" style ={{display : "flex", flexDirection: "column"}}><div style={{paddingBottom : "0.2rem", color : "white", fontSize : "1rem"}}>Password</div>
      <div className = "user"style ={{display : "flex", flexDirection: "row"}}><div style ={{color: "whitesmoke", fontSize : "1rem", flex: "9"}}>{showPassword ? JSON.parse(user.user).passwordConfirm : "********"}</div><div style ={{flex: "1"}}><FontAwesomeIcon onMouseOver ={handleShowPassword}icon={faEye} /></div></div>
      <div style ={{border:"0.01rem solid gray", marginRight : "1rem"}}></div>
      </div>


    </Stack></Card.Body>
  </Card>
  )
}

export default UserInfo
