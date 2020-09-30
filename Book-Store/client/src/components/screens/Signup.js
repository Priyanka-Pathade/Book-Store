import React,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [college,setCollege] = useState("")
    const [dept,setDept] = useState("")
    const [year,setYear] = useState("")
    const [password,setPassword] = useState("")
    const [roll,setRoll] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] =useState("")
    useEffect(()=>{
            if(url){
                PostData()
            }
    },[url])

    const postPic =()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Book-Exchange")
        data.append("cloud_name","dnkitfzzp")
        fetch("	https://api.cloudinary.com/v1_1/dnkitfzzp/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
            return
        }
        // console.log(url)

        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },

            body:JSON.stringify({
                name,
                email,
                phone,
                college,
                dept,
                year,
                password,
                roll,
                photo:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message,classes:"#43a047 green darken-1"})
                history.push('/login')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h5><b>Signup</b></h5>
                <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="tel" placeholder="Mobile Number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                <input type="text" placeholder="College" value={college} onChange={(e)=>setCollege(e.target.value)}/>
                <input type="text" placeholder="Department" value={dept} onChange={(e)=>setDept(e.target.value)}/>
                <input type="text" placeholder="Year of study" value={year} onChange={(e)=>setYear(e.target.value)}/>
                <input type="text" placeholder="Roll Number" value={roll} onChange={(e)=>setRoll(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Add Confirmation/College ID"/>
                </div>
            </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postPic()}>Signup</button>
                <p><Link to="/signup">Already have an account?</Link></p>
            </div>
        </div>
        

    )
}



export default Signup