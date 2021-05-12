import { createContext, useRef, useEffect, useState } from 'react'
import io from "socket.io-client";


export const socketContext = createContext()

function SocketConnection(props) {
    const [messages, setMessages] = useState([]);
    const [yourID, setYourID] = useState("");
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");
    const [password, setPassword] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [isJoinRoomModalVisible, setIsJoinRoomModalVisible] = useState(false);

    const socketRef = useRef();

    useEffect(() => {
      socketRef.current = io.connect('/');
      // sets connected clients id to state
      socketRef.current.on("your id", id => {
        setYourID(id);
      })

      socketRef.current.on("joined room", room => {
        setCurrentRoom(room);
      })

      socketRef.current.on("updated-rooms-list", showAndUpdateAllRooms);

      socketRef.current.on("message", receivedMessage);

      socketRef.current.on("password feedback", data => {
          alert(data)
      })
        
    },[]);

    function showAndUpdateAllRooms(rooms) {
        setRooms(rooms)
    };


    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    // create room input from modal
    function handleRoomInput(e) {
        setRoom(e.target.value)

    }

    // send message input    
    function inputMessage(e) {
        setMessage(e.target.value)
    }

    // login input
    function saveUserName(e) {
        setUserName(e.target.value)
    }

    // password when creating new room
    function handlePasswordInput(e) {
        setPassword(e.target.value)
    }
    
    // password for join room modal
    function handleJoinPasswordInput(e) {
        setRoomPassword(e.target.value)
    }

    function handleJoinRoomOk() {
        setIsJoinRoomModalVisible(false)
        showRoom(roomName)
        setRoomPassword("")
    }

    function showJoinRoom(roomName){
        setIsJoinRoomModalVisible(true)
        setRoomName(roomName)
    }

    function handleJoinRoomCancel() {
        setIsJoinRoomModalVisible(false)
    }

        // function when pressing + icon
    function createNewRoom() {
        socketRef.current.emit('join room', { roomName: room, password, roomPassword })
        setRooms([...rooms, room])
        setMessages([])
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
        
        setMessage("");
        socketRef.current.emit("message", messageObject);
    }

    // function when loggin in
    function enterChatRoom(e) {
        socketRef.current.emit("all rooms", rooms)
        e.preventDefault()
            if(userName === ""){
                return
            }
            setIsLoggedin(true)
        }

    // function that should make u join the room u press on the chat icon
    function showRoom(roomName) {
        socketRef.current.emit("join room", {roomName, password, currentRoom, roomPassword});

        // sets messages to 0 when changing room
        setMessages([])
    }

    console.log(rooms)
    return (

        // console.log(ifPassword),
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
            handleJoinRoomOk: handleJoinRoomOk,
            isJoinRoomModalVisible: isJoinRoomModalVisible,
            handleJoinRoomCancel: handleJoinRoomCancel,
            showJoinRoom: showJoinRoom,
            handleJoinPasswordInput: handleJoinPasswordInput,
            room:room,
            setRoom: setRoom,
            password: password,
            setPassword: setPassword,
            roomPassword: roomPassword

        }}>
            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
