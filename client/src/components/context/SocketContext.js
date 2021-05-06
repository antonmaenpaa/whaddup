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
    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState("")
    
    // const [testRooms, setTestRooms] = useState([])

    const [isLoggedin, setIsLoggedin] = useState(false)

    const socketRef = useRef();

    useEffect(() => {
      socketRef.current = io.connect('/');
      // sets connected clients id to state
      socketRef.current.on("your id", id => {
        setYourID(id);
      })

      socketRef.current.on("joined room", roomName => {
          setCurrentRoom(roomName);
      })

      socketRef.current.on("updated-rooms-list", serverRooms => {
        setRooms(serverRooms)
        // setTestRooms([...testRooms, testRooms])

        console.log(serverRooms)
      })

      socketRef.current.on("message", receivedMessage);

      socketRef.current.on("join room", showRoom);
        
    }, []);

    // function when pressing + icon
    function createNewRoom() {
        socketRef.current.emit("join room", room);
        setRooms([...rooms, room])
    }

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

        // create room input from modal
    function handleRoomInput(e) {
        setRoom(e.target.value)
    }

        
    // Takes value from input and sends data to socket
    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID,
            sender: userName,
            currentRoom: currentRoom
        };
        setMessage("");;
        socketRef.current.emit("message", messageObject);
        
    }

    // send message input    
    function inputMessage(e) {
        setMessage(e.target.value)
    }

    // login input
    function saveUserName(e) {
        setUserName(e.target.value)
    }


    
    // function when loggin in
    function enterChatRoom(e) {
        socketRef.current.emit("all rooms", rooms)
        console.log('jeu')
        e.preventDefault()
            if(userName === ""){
                return
            }
            setIsLoggedin(true)
            
            // console.log(isLoggedin)
            // socketRef.current.emit("join room", rooms);
        }

    // function that should make u join the room u press on the chat icon
    function showRoom(roomName) {
        socketRef.current.emit("join room", roomName);
        console.log(roomName)
        // sets messages to 0 when changing room
        setMessages([])
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
            currentRoom: currentRoom,

        }}>


            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
