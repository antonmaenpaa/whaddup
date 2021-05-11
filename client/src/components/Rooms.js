import React, { useContext } from "react"
import { CommentOutlined, LockOutlined } from '@ant-design/icons';
import { socketContext } from "./context/SocketContext"

function Rooms(props) {

    const context = useContext(socketContext)

    return(
        <>
        {
            props.password ? (
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
            ) : (
                <div className="rooms-item" onClick={() => context.showRoom(props.roomName)}>
                        <CommentOutlined 
                            id={props.roomName} 
                            value={props.roomName}  
                            style={{fontSize: "2rem", color: "#927BCA",  margin: ".2rem"}}
                        />
                    <div className="rooms-div">
                        <span style={{color: "#927BCA", fontSize: "1rem"}}>{props.roomName} </span>
                    </div>
                    <div style={{width: "2em"}}></div>
                </div>
            )
        }
        </>
        
    )
}

export default Rooms;