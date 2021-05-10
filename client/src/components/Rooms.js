import React, { useContext } from "react"
import { CommentOutlined, LockOutlined } from '@ant-design/icons';
import { socketContext } from "./context/SocketContext"

function Rooms(props) {

    const context = useContext(socketContext)

    return(
        <div className="rooms-item" onClick={() => context.showJoinRoom(props.roomName)}>
            <CommentOutlined 
                id={props.roomName} 
                value={props.roomName}  
                style={{fontSize: "2rem", color: "#927BCA",  margin: ".2rem"}}
            />
            <div className="rooms-div">
                <span style={{color: "#927BCA", fontSize: "1rem"}}>{props.roomName} </span>
            </div>
            <LockOutlined 
                style={{fontSize: "1.5rem", color: " #927BCA", margin: ".2rem"}}
            />
        </div>
    )
}

export default Rooms;