import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
    const{state,dispatch} =useContext(UserContext)
    const history = useHistory()
    const renderList =()=>{
        if(state){
            return [
                <li><Link to="/frontpage">Home</Link></li>,
                <li><Link to="/freebooks">Free Books</Link></li>,
                <li><Link to="/addbook">Add Book</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li>
                <button className="btn #c62828 red darken-3"
                onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }}
                >Logout</button>
                </li>
            ]
        }else{
            return [
                // <li><Link to="/">Home</Link></li>,
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
    <div>
         <nav>
            <div className="nav-wrapper #ffeb3b yellow">
            <Link to="#" className="brand-logo left">Book-Exchange</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
         {renderList()}
               
            </ul>
            </div>

        </nav>

    </div>
        
    )
}

export default NavBar