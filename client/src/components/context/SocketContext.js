import { createContext, useRef, useEffect, useState } from 'react'
import io from "socket.io-client";


export const socketContext = createContext()

// export let allRooms = ["General"];

function SocketConnection(props) {
    const [messages, setMessages] = useState([]);
    
    const [yourID, setYourID] = useState("");
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");
    const [password, setPassword] = useState("");
    const [roomPassword, setRoomPassword] = useState("")
    
    const [visible, setVisible] = useState(false);
    
    // const [testRooms, setTestRooms] = useState([])

    const [isLoggedin, setIsLoggedin] = useState(false)

    const socketRef = useRef();

    useEffect(() => {
      socketRef.current = io.connect('/');
      // sets connected clients id to state
      socketRef.current.on("your id", id => {
        setYourID(id);
      })

    socketRef.current.on('passwordFeedback', (data) => {
        console.log("passwordFeedback: ",data);
    })

      socketRef.current.on("joined room", roomName => {
          setCurrentRoom(roomName);
          console.log(roomName)
      })

      socketRef.current.on("updated-rooms-list", serverRooms => {
        setRooms(serverRooms)
        // setTestRooms([...testRooms, testRooms])
      })

      socketRef.current.on("message", receivedMessage);

      socketRef.current.on("join room", joinRoomServer);
        
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
    
    // create new room password input
    function handlePasswordInput(e) {
        setPassword(e.target.value)
    }

    function joinRoomServer(roomName) {
        setVisible(false)
        socketRef.current.emit('join room', { username: userName, room: roomName, password: password, joinRoomPassword: roomPassword });

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
        setVisible(true);
 
        // socketRef.current.emit('join room', { username: userName, room: roomName, password: password, joinRoomPassword: roomPassword });


        // 1. klicka på rummet så öppnas modalen, setVisible(true)
        // 2. spara lösen i modalen i ett state
        // 3. på modal Ok anropa sockerRet emit rad 120. 
        // 4. 

        // sets messages to 0 when changing room
        setMessages([])
    }
    
    // join room password input
    function joinRoomPasswordInput(e) {
        setRoomPassword(e.target.value)
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
            handlePasswordInput: handlePasswordInput,
            visible: visible,
            joinRoomPasswordInput: joinRoomPasswordInput,
            setVisible: setVisible,
            joinRoomServer: joinRoomServer

        }}>


            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
