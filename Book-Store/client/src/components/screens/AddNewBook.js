import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom';

const AddBook = () =>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")
    const [publication,setPublication] = useState("")
    const [price,setPrice] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] =useState("")
    console.log(url)
    useEffect(()=>{
        if(url){
        fetch("/addbook",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                category,
                publication,
                pic:url,
                price,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                // console.log(data)
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Book added Successfully",classes:"#43a047 green darken-1"})
                history.push('/frontpage')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    },[url])

    //postDetails is for uploding image 
    const postDetails =()=>{
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

    return(
<div className="card input-filed"
style={{
    margin:"30px auto",
    maxWidth:"500px",
    padding:"20px",
    textAlign:"center"
}}>
        <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}  />
        <input type="text" placeholder="Books category eg. Acedemic books, other books" value={category} onChange={(e)=>setCategory(e.target.value)} />
        <input type="text" placeholder="Publication" value={publication} onChange={(e)=>setPublication(e.target.value)}/>
       <input type="number" placeholder="Price eg. 500,1000,867,etc" value={price} onChange={(e)=>setPrice(e.target.value)} />

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder=""/>
                </div>
            </div>

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >Add Book</button>

</div>
    )
}


export default AddBook