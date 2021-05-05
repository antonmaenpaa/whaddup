import React from "react"

import { WechatOutlined, LockOutlined } from '@ant-design/icons';

function Rooms(props) {

    return(
        <div className="rooms-item">
            <WechatOutlined onClick={props.showRoom} style={{fontSize: "1.5rem", color: "#927BCA",  margin: ".2rem"}}/>
            <div className="rooms-div">
                <span style={{color: "#927BCA", marginBottom: ".3rem"}}>{props.roomName}</span>
            </div>
            <LockOutlined style={{fontSize: "1.5rem", color: " #927BCA", margin: ".2rem"}}/>
    </div>
    )
}

export default Rooms;