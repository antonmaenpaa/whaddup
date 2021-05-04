import '../css/chat.css'
import React, { Component } from "react"
import { SendOutlined, WechatOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';





class Chat extends Component {
  
  render() {
    return(
        <div className="chat-div">
            <div className="header">
                <div className="header-left">
                    <h2>Anton</h2>
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
                    <ul className="message-container">
                        <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                        <li className="message-right">
                            <p className="message">
                                lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                                <span className="name">Anton - few seconds ago</span>
                            </p>
                        </li>
                        <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                         <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                         <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                         <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                         <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                         <li className="message-left"  id="margin-left">
                        <p className="message">
                            lorem ipsum
                            <span className="name">Anton - few seconds ago</span>
                        </p>
                         </li>
                    </ul>
                    <form>
                        <input type="text"></input><SendOutlined style={{ fontSize: "1.5rem", margin: 0, padding: 0, color: " #927BCA", marginRight: ".5rem"}}/>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

export default Chat;