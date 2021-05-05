import { createContext, useRef, useEffect, useState } from 'react'
import io from "socket.io-client";


export const socketContext = createContext()

// export let allRooms = ["General"];

function SocketConnection(props) {
    const [messages, setMessages] = useState([]);
    
    const [yourID, setYourID] = useState("");
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("")
    const [rooms, setRooms] = useState(["General"])


    const [isLoggedin, setIsLoggedin] = useState(false)

    const socketRef = useRef();
    useEffect(() => {
      socketRef.current = io.connect('/');
  
      socketRef.current.on("your id", id => {
        setYourID(id);
      })
  
      socketRef.current.on("message", receivedMessage);

      socketRef.current.on("join room", showRoom);
        
    }, []);

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    function showRoom(roomName) {
        console.log("LOGLOLGOGLGOLGO")
    }

        
    // Takes value from input and sends data to socket
    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID,
            sender: userName
        };
        setMessage("");;
        socketRef.current.emit("message", messageObject);
        
    }
        
    function inputMessage(e) {
        setMessage(e.target.value)
    }

    function saveUserName(e) {
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
            socketRef.current.emit("join room", rooms);
        }

    function handleRoomInput(e) {
        setRoom(e.target.value)
    }


    function createNewRoom() {
        // allRooms.push(room)
        setRooms([...rooms, room])
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
            rooms: rooms,
            handleRoomInput: handleRoomInput,
            createNewRoom: createNewRoom,
            showRoom: showRoom,

        }}>


            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
