import '../css/chat.css'
import React, { useContext } from "react"
import { SendOutlined, WechatOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import { socketContext } from "./context/SocketContext"
import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'


function Chat(props) {
    const context = useContext(socketContext)

    return(
        <div className="chat-div">
            <div className="header">
                <div className="header-left">
                    <h2>{context.userName}</h2>
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
                     
                       {context.messages.map((message, index) => {
                           if (message.id === context.yourID) {
                                return (
                                    <MessageRight key={index} body={message.body} sender={message.sender} />
                               )
                           }
                                return (
                                    <MessageLeft key={index} body={message.body} sender={message.sender} />
                           )
                       })}
                    </ul>
                    <form>
                        <input type="text" value={context.message} onChange={context.inputMessage} />
                        <SendOutlined onClick={context.sendMessage} style={{ fontSize: "1.5rem", margin: 0, padding: 0, color: " #927BCA", marginRight: ".5rem"}}/>
                    </form>
                </div>
            </div>
        </div>
    )
  }


export default Chat;