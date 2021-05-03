import '../css/join.css';
import { Link } from "react-router-dom";


function Join() {

    return(
        <div className="join-div">
            <h2 style={{ fontSize: "3rem" }}>WELCOME TO WHADDUP</h2>
            
            <form className="form">
                <div className="input-div">
                    <div>
        
                        <label style={{ fontSize: "1.5rem" }}>Name</label>
                        <input type="text" class="name-input"></input>

                    </div>
                    <Link className="btn-link" to="/chat">
                        ENTER CHATROOMS
                    </Link>
                </div>
            </form>
            
        </div>
    )
}

export default Join;