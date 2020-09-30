import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText,Col, Row } from 'reactstrap';

const AddBook = () =>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")
    const [publication,setPublication] = useState("")
    const [price,setPrice] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] =useState("")
    const [checkfree,setCheckfree] = useState("")
    // console.log(checkFree,category);
    console.log(checkfree)
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
                checkfree
                
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
    const alterCheckfree=(val)=>{
        setCheckfree(val);
    }
    const alterCategory=(val)=>{
        setCategory(val);
    }
    return(
            <div className="card input-filed"
            style={{
                margin:"30px auto",
                maxWidth:"500px",
                padding:"20px",
                textAlign:"center"
            }}>
        <Input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}  />
        <Input type="text"  placeholder="Publication" value={publication} onChange={(e)=>setPublication(e.target.value)}/>
       {/* <Label for="exampleSelect" >Select the selling option</Label> */}
        {/* <Input type="select" name="checkfree" value={checkfree} onChange={(e)=>alterCheckfree(e.target.value)}>
                            <option>Paid</option>
                            <option>Free</option>
        </Input> */}
        <Input type="select" name="category" value={checkfree} onChange={(e)=>setCheckfree(e.target.value)}>
                            <option >select</option>
                            <option>Free</option>
                            <option>Paid</option>

        </Input>
        <Label for="exampleSelect" style={{color:"black"}}>Add price only if above selected option is sell</Label>
        <Input type="number" placeholder="Price eg. 500,1000,867,etc" value={price} onChange={(e)=>setPrice(e.target.value)} />
        {/* <Label for="exampleSelect" >Select books category</Label>
        <Input type="select" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option>Acedemic</option>
                            <option>Other</option>
        </Input> */}
   
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
            onClick={()=>postDetails()}>Add Book</button>

        </div>
    )
}


export default AddBook