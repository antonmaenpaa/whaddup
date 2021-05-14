import { createContext, useEffect, useState } from 'react'
import io from "socket.io-client";
import { message } from 'antd';

export const socketContext = createContext()

function SocketConnection(props) {
    const ENDPOINT = 'http://127.0.0.1:5000/';
    const [socket] = useState(io(ENDPOINT, { transports: ['websocket', 'polling'] }));
    const [messages, setMessages] = useState([]);
    const [yourID, setYourID] = useState("");
    const [textMessage, setMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState("");
    const [password, setPassword] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [isJoinRoomModalVisible, setIsJoinRoomModalVisible] = useState(false);
    const [joinedRoom, setJoinedRoom] = useState([])
    const [leftRoom, setLeftRoom] = useState([])
    const [typingMsg, setIsTypingMsg] = useState("")

    // const socket = useRef();

    useEffect(() => {
      socket.on("connect", () => {
          console.log('conneceted')
      });
      // sets connected clients id to state
      socket.on("your id", id => {
        setYourID(id);
      })

      socket.on("joined room", room => {
        setCurrentRoom(room);
      })

      socket.on("updated-rooms-list", showAndUpdateAllRooms);

      socket.on("message", receivedMessage);

      socket.on("password feedback", data => {
          message.error(data);
      })

      socket.on("user joined room", userJoinedRoom)
      socket.on("user left room", userLeftRoom)
      socket.on("user-typing", (msg) => {
          setIsTypingMsg(msg)
      })


     
    },[socket]);
    


    function userJoinedRoom(data) {
        setJoinedRoom(oldUser => [...oldUser,data])
    }

    function userLeftRoom(data) {
        setLeftRoom(oldUserleft => [...oldUserleft,data])
    }

    function showAndUpdateAllRooms(rooms) {
        setRooms(rooms) 
    };


    function receivedMessage(text) {
        setMessages(oldMsgs => [...oldMsgs, text]);
      
    }

    // create room input from modal
    function handleRoomInput(e) {
        setRoom(e.target.value)

    }

    const emitTyping = (typing) => {
        const textMessage = userName + " is typing..";
        if (typing) socket.emit("user-typing", textMessage, currentRoom);
        else socket.emit("user-typing", "", currentRoom);
    };
    
    // send textMessage input    
    function inputMessage(e) {
        setMessage(e.target.value)
        if (e.target.value.length > 0) {
            emitTyping(true);
          } else {
            emitTyping(false);
          }
      
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
        socket.emit('join room', { roomName: room, password, roomPassword })
        setRooms([...rooms, room])
        setJoinedRoom([])
        setMessages([])
        setLeftRoom([])
    }
        
    // Takes value from input and sends data to socket
    function sendMessage(e) {
        e.preventDefault();

        
        // ul.scrollTop = ul.scrollHeight
        let ul = document.getElementById("ul")
        ul.scrollTo(0, ul.scrollHeight);


        const messageObject = {
            body: textMessage,
            id: yourID,
            sender: userName,
            currentRoom: currentRoom
        };
        emitTyping(false)
        setMessage("");
        socket.emit("message", messageObject);
    }

    // function when loggin in
    function enterChatRoom(e) {
        socket.emit("all rooms", rooms)
        e.preventDefault()
            if(userName === ""){
                return
            }
            setIsLoggedin(true)
        }

    // function that should make u join the room u press on the chat icon
    function showRoom(roomName) {
        socket.emit("join room", {roomName, password, currentRoom, roomPassword});
        setJoinedRoom([])
        setMessages([])
        setLeftRoom([])
    }
    
    return (
        <socketContext.Provider value= {{
            messages: messages,
            yourID: yourID,
            textMessage: textMessage,
            userName: userName,
            room:room,
            rooms: rooms,
            currentRoom: currentRoom,
            password: password,
            roomPassword: roomPassword,
            isLoggedin: isLoggedin,
            isJoinRoomModalVisible: isJoinRoomModalVisible,
            joinedRoom: joinedRoom,
            leftRoom: leftRoom,
            typingMsg: typingMsg,
            sendMessage: sendMessage,
            receivedMessage: receivedMessage,
            inputMessage: inputMessage,
            saveUserName: saveUserName,
            enterChatRoom: enterChatRoom,
            handleRoomInput: handleRoomInput,
            createNewRoom: createNewRoom,
            showRoom: showRoom,
            handlePasswordInput: handlePasswordInput,
            handleJoinRoomOk: handleJoinRoomOk,
            handleJoinRoomCancel: handleJoinRoomCancel,
            showJoinRoom: showJoinRoom,
            handleJoinPasswordInput: handleJoinPasswordInput,
            setRoom: setRoom,
            setPassword: setPassword,
            emitTyping: emitTyping

        }}>
            {props.children}
                    
        </socketContext.Provider>
    )
}

export default SocketConnection;
