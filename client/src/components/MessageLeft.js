import '../css/chat.css'
import React from "react"

function MessageLeft(props) {

    return (
        <>
        <li className="message-left" >
            <p className="message">
                {props.body}
            </p>
        </li>
        <span className="sender-left">{props.sender}</span> 
        </>
    )
}

export default MessageLeft;