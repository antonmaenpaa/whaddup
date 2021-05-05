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

    function showModal() {
      setIsModalVisible(true);
    };
  
    function handleOk() {
      setIsModalVisible(false);
      context.createNewRoom()
    };
  
    function handleCancel() {
      setIsModalVisible(false);
    };

    return(
        <div className="chat-div">
            <div className="header">
                <div className="header-left">
                    <h2>{context.userName}</h2>
                    <PlusOutlined onClick={showModal} style={{ color: "#927BCA", fontSize: "1.5rem", }} />
                        <Modal id="modal" style={{ backgroundColor: "#363636" }}title="New Room" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <input type="text" onChange={(e) => context.handleRoomInput(e)}placeholder="Room Name"></input>
                        </Modal>
                </div>
                <div className="header-right">
                    <span style={{ fontSize: "1.5rem", fontWeight: 500}}>Group room 1</span>
                </div>
            </div>
            <div className="flex-div">
                <div className="rooms">

                        {context.rooms.map((room, index) => (
                    
                            <Rooms showRoom={context.showRoom} key={index} roomName={room}/>
                   
                        ))}
                        
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