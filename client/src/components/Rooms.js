import React, { useContext } from "react"
import { WechatOutlined, LockOutlined } from '@ant-design/icons';
import { socketContext } from "./context/SocketContext"

function Rooms(props) {

    const context = useContext(socketContext)

    return(
        <div className="rooms-item" onClick={() => context.showRoom(props.roomName)}>
            <WechatOutlined id={props.roomName} value={props.roomName}  style={{fontSize: "1.5rem", color: "#927BCA",  margin: ".2rem"}}/>
            <div className="rooms-div">
                <span style={{color: "#927BCA", marginBottom: ".3rem"}}>{props.roomName}</span>
            </div>
            <LockOutlined style={{fontSize: "1.5rem", color: " #927BCA", margin: ".2rem"}}/>
    </div>
    )
}

export default Rooms;