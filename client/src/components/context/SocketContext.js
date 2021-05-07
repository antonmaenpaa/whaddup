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
    const [currentRoom, setCurrentRoom] = useState("");
    const [password, setPassword] = useState("");
    const [roomPassword, setRoomPassword] = useState("")
    const [isLoggedin, setIsLoggedin] = useState(false)

    const [roomName, setRoomName] = useState("")

    const [isJoinRoomModalVisible, setIsJoinRoomModalVisible] = useState(false)

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

      socketRef.current.on("create room", data => {
          console.log("hej")
      })

      socketRef.current.on("updated-rooms-list", serverRooms => {
        setRooms(serverRooms)
        // setTestRooms([...testRooms, testRooms])
        console.log(serverRooms)
      })

      socketRef.current.on("message", receivedMessage);

      socketRef.current.on("join room", data => {
        //   showRoom(data)
      });

      socketRef.current.on("password feedback", data => {
          console.log(data)
      })
        
    }, []);

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
    }

    function showJoinRoom(roomName){
        setIsJoinRoomModalVisible(true)
        console.log(roomName)
        setRoomName(roomName)
    }

    function handleJoinRoomCancel() {
        setIsJoinRoomModalVisible(false)
    }

        // function when pressing + icon
    function createNewRoom() {
        //socketRef.current.emit("join room", room);
        socketRef.current.emit('create room', {room, password, currentRoom})
        setRooms([...rooms, room])
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


    
    // function when loggin in
    function enterChatRoom(e) {
        socketRef.current.emit("all rooms", rooms)
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
        socketRef.current.emit("join room", {roomName, password, currentRoom, roomPassword});

        
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
            handlePasswordInput: handlePasswordInput,
            handleJoinRoomOk: handleJoinRoomOk,
            isJoinRoomModalVisible: isJoinRoomModalVisible,
            handleJoinRoomCancel: handleJoinRoomCancel,
            showJoinRoom: showJoinRoom,
            handleJoinPasswordInput: handleJoinPasswordInput

        }}>


            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
