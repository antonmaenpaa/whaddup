import { createContext, useRef, useEffect, useState } from 'react'
import io from "socket.io-client";


export const socketContext = createContext()


function SocketConnection(props) {

    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const [userName, setUserName] = useState("");

    const [isLoggedin, setIsLoggedin] = useState(false)

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
            sender: userName
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
        
        }
        
    function inputMessage(e) {
        setMessage(e.target.value)
    }

    
    
    
    function saveUserName(e){
        setUserName(e.target.value)
    }
    
    function enterChatRoom(e) {

        console.log('jeu')
        e.preventDefault()
            if(userName === ""){
                return
            }
            setIsLoggedin(true)
            
            console.log(isLoggedin)

        }



    return (
        <socketContext.Provider value= {{
            sendMessage: sendMessage,
            receivedMessage: receivedMessage,
            inputMessage: inputMessage,
            saveUserName: saveUserName,
            enterChatRoom: enterChatRoom,
            messages: messages,
            yourID: yourID,
            message: message,
            userName: userName,
            isLoggedin: isLoggedin,
        }}>


            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
