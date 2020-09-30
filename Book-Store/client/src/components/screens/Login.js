import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
// import background from '../../../src/xyz.module.css';


const Login = () =>{
    const{state,dispatch} =useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email,
                password,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data)
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "signedin success",classes:"#43a047 green darken-1"})
                history.push('/frontpage')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        // <div className="xyz"  style={background}>
        <div className="mycard">
            <div className="card auth-card input-field">
                <h5><b>Login</b></h5>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>Login</button>
                <p><Link to="/signup">Don't have an account ?</Link></p>
            </div>
        </div>
        // </div>
    )
}


export default Login