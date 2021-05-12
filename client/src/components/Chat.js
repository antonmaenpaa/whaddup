import '../css/chat.css'
import React, { useContext, useState } from "react"
import { Modal } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { socketContext } from "./context/SocketContext"
import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'
import Rooms from './Rooms'



function Chat(props) {
    const context = useContext(socketContext)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [border, setBorder] = useState("");

    function handleOk() {
        if(context.room === ""){
            setBorder("border")
            
        } else {
            setBorder("")
            context.setRoom("")
            context.setPassword("")
            setIsModalVisible(false);
            context.createNewRoom()
        }
    };

    return(
        <div className="chat-div">
            <div className="header">
                <div className="header-left">
                    <h2>{context.userName}</h2>
                    <PlusOutlined 
                        onClick={() => setIsModalVisible(true)} 
                        style={{ color: "#927BCA", fontSize: "1.5rem", }} />
                        <Modal      
                            centered={true}
                            okType="ghost"
                            id="modal" 
                            title="New Room" 
                            visible={isModalVisible} 
                            onOk={handleOk} 
                            onCancel={() => setIsModalVisible(false)}>
                            <input 
                                type="text" 
                                maxLength="18" 
                                onChange={(e) => context.handleRoomInput(e)} 
                                placeholder="Room Name" required
                                className={border}
                                value={context.room}
                                >
                                
                                    
                            </input>
                            <input 
                                type="password" 
                                onChange={(e) => context.handlePasswordInput(e)} 
                                placeholder="Password not required"
                                value={context.password}>
                            </input>
                        </Modal>
                        <Modal 
                            centered={true}
                            okType="ghost"
                            id="modal" 
                            title="Enter Room Password" 
                            visible={context.isJoinRoomModalVisible} 
                            onOk={context.handleJoinRoomOk}
                            onCancel={context.handleJoinRoomCancel}
                            >
                            <input 
                                type="password" 
                                onChange={(e) => context.handleJoinPasswordInput(e)} 
                                placeholder="Password"
                                value={context.roomPassword} 
                            />
                        </Modal>
                </div>
                <div className="header-right">
                    <span style={{ fontSize: "1.5rem", fontWeight: 500}}>{context.currentRoom}</span>
                </div>
            </div>
            <div className="flex-div">
                <div className="rooms">
                    {context.rooms.map((room, index) => (
                        <Rooms key={index} roomName={room.name} password={room.checkedPassword}/>
                    ))}
                </div>
                <div className="chat">
                    <ul id="ul" className="message-container">
                       {context.messages.map((message, index) => {
                           if (message.id === context.yourID) {
                                return (
                                    <MessageRight 
                                        key={index} 
                                        body={message.body} 
                                        sender={message.sender} 
                                    />
                               )
                           }
                                return (
                                    <MessageLeft 
                                        key={index} 
                                        body={message.body} 
                                        sender={message.sender} 
                                    />
                           )
                       })}
                    </ul>
                    <form onSubmit={context.sendMessage}>
                        <input 
                            type="text" 
                            value={context.message} 
                            onChange={context.inputMessage} 
                            placeholder="What's on your mind?"
                        />
                        <SendOutlined 
                            onClick={context.sendMessage} 
                            style={{ fontSize: "1.5rem", margin: 0, padding: 0, color: " #927BCA", marginRight: ".5rem"}}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
  }


export default Chat;