import '../css/join.css';
import { Redirect } from "react-router-dom";


function Join(props) {


    if(props.loggedIn ){
           
        return <Redirect to="/chat"/>
    }
    
    return(
        <div className="join-div">
            <h2 style={{ fontSize: "3rem", zIndex: 1, fontWeight: 700 }}>WELCOME TO WHADDUP</h2>
            <h2 style={{ fontSize: "3rem", marginTop: "-5.5rem", color: "#4d3f6f", fontWeight: 700 }}>WELCOME TO WHADDUP</h2>
            
            <form className="form">
                <div className="input-div">
                    <div>
                        <label style={{ fontSize: "1.5rem", fontWeight: 500, }}>Name</label>
                        <input onChange={(e) => props.userName(e)} type="text" className="name-input" required></input>
                    </div>
                    <button type="submit" onClick={(e) => props.enterChatRoom(e)} className="btn-link" to="/chat">
                        ENTER CHATROOMS
                    </button>
                </div>
            </form>
            
        </div>
    )
}

export default Join;