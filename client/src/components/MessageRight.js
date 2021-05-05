import React from "react"
import '../css/chat.css'

function MessageRight(props) {

    return (
        <>
        <li className="message-right" >
            <p className="message">
                {props.body}
            </p>
        </li>
        <span className="sender-right">{props.sender}</span> 
     </>
    )
}

export default MessageRight;