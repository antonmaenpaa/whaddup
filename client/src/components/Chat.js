import '../css/chat.css'
import React, { useEffect, useState } from "react"
import { SendOutlined, WechatOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import io from "socket.io-client";


const PORT = 'localhost:5000'
let socket = io()

function Chat(props) {
 const [message, setMessage] = useState("");


    useEffect(() => {
        let socket = io(PORT, {
          transports: ["websocket"],
        });
        socket.on('connect', () => {
          console.log('connected')
        })
    }, []);
    
    function inputMessage(e) {
        setMessage(e.target.value)
    }

    // Takes value from input and sends data to socket
    function sendMessage() {
        if(message === '') return
        const data = {
            name: props.userName,
            message: message,
        }
        
        socket.emit('message', data)
        addMessageToUI(data); // när man sänder ett meddelande
        setMessage("")
    }
    

    let element;
    function addMessageToUI(data) { // lägger till li dokument när man sänder ett meddelande, som anropas i sendMessag funktionen
        // clearFeedback();
        element = (
            
          ` <li className="message-right">
                <p className="message">
                    ${data.message}
                </p>
                <span>${data.name}</span> 
            </li>`
            
        )


    const ul = document.getElementById("ul");

    ul.innerHTML += element

    

    // ${moment(data.dateTime).fromNow()}</span> <-- från moment library

    // scrollToBottom();
}
  
    return(
        <div className="chat-div">
            <div className="header">
                <div className="header-left">
                    <h2>{props.userName}</h2>
                    <PlusOutlined style={{ color: "#927BCA", fontSize: "1.5rem", }} />
                </div>
                <div className="header-right">
                    <span style={{ fontSize: "1.5rem", fontWeight: 500}}>Group room 1</span>
                </div>
            </div>
            <div className="flex-div">
                <div className="rooms">
                    <div className="rooms-item">
                        <WechatOutlined style={{fontSize: "1.5rem", color: "#927BCA",  margin: ".2rem"}}/>
                        <div className="rooms-div">
                            <span style={{color: "#927BCA", marginBottom: ".3rem"}}>Group room 1</span>
                            <span style={{color: "white"}}>Name: Lorem ipsum</span>
                        </div>
                        <LockOutlined style={{fontSize: "1.5rem", color: " #927BCA", margin: ".2rem"}}/>
                    </div>
                </div>
                <div className="chat">
                    <ul id="ul" className="message-container">
                        {element}
                    </ul>
                    <form>
                        <input type="text" onChange={(e) => inputMessage(e)}></input><SendOutlined onClick={(e) => sendMessage(e)} style={{ fontSize: "1.5rem", margin: 0, padding: 0, color: " #927BCA", marginRight: ".5rem"}}/>
                    </form>
                </div>
            </div>
        </div>
    )
  }


export default Chat;