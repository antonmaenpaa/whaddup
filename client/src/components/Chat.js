import '../css/chat.css'
import React, { useEffect, useState, useRef } from "react"
import { SendOutlined, WechatOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import io from "socket.io-client";


function Chat(props) {

    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
  
    const socketRef = useRef();
  
    useEffect(() => {
      socketRef.current = io.connect('/');
  
      socketRef.current.on("your id", id => {
        setYourID(id);
      })
  
      socketRef.current.on("message", (message) => {
        console.log("here");
        receivedMessage(message);
      })
    }, []);

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
      }

    
    // Takes value from input and sends data to socket
    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID,
            sender: props.userName
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
        
        }
        
        function inputMessage(e) {
            setMessage(e.target.value)
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
                     
                       {messages.map((message, index) => {
                           if (message.id === yourID) {
                                return (
                                    <>
                                    <li className="message-right" key={index}>
                                        <p className="message">
                                            {message.body}
                                        </p>
                                     </li>
                                    <span className="sender-right">{message.sender}</span> 
                                     </>
                               )
                           }
                                return (
                                    <>
                                    <li className="message-left" key={index}>
                                        <p className="message">
                                            {message.body}
                                        </p>
                                    </li>
                                    <span className="sender-left">{message.sender}</span> 
                                    </>
                           )
                       })}
                    </ul>
                    <form>
                        <input type="text" value={message} onChange={inputMessage} />
                        <SendOutlined onClick={sendMessage} style={{ fontSize: "1.5rem", margin: 0, padding: 0, color: " #927BCA", marginRight: ".5rem"}}/>
                    </form>
                </div>
            </div>
        </div>
    )
  }


export default Chat;