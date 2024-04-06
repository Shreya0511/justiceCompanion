import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';



const VideoCallModal = () => {
    const navigate = useNavigate();

    const handleVideoCall = () => {
        navigate("/Video_Room");
      }

  return (
    <div style ={{display : "flex", alignItems: "center", justifyContent: "center", marginRight : "1rem", marginTop : "0px"}}>
         <OverlayTrigger
          key='bottom'
          placement='bottom'
          overlay={
            <Tooltip id='tooltip-bottom' style ={{marginTop : "1.7rem", borderRadius : "2rem"}}> 
              <div style ={{display : "flex", flexDirection: "column", padding: "1rem"}}>
                <span style ={{color : "orange", marginBottom : "1rem", fontWeight: "bold"}}>Start Video Conference.</span>
                <div>Copy the link in there and paste the same on this chat, so that everyone in this room can join you!!</div>
              </div>
            </Tooltip>
          }
        >
          <Button style ={{backgroundColor : "black"}}><FontAwesomeIcon icon={faVideo} onClick = {handleVideoCall}/>
</Button>
        </OverlayTrigger>
      
    </div>
  )
}
{/* <div style ={{display : "flex", alignItems : "center", justifyContent: "center", marginRight : "1rem", marginTop : "1rem"}}> 
<FontAwesomeIcon icon={faVideo} onClick = {handleVideoCall}/>
</div> */}


export default VideoCallModal
