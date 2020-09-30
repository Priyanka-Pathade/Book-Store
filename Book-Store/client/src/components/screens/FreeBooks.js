import React,{useState,useContext,useEffect} from 'react'
import {Modal, Button, ButtonToolbar} from 'react-bootstrap';
import Contact from './ContactToBuy';
const FreeBooks = () =>{
    const [data,setData] = useState([])  
    useEffect(()=>{
        fetch('/allbooks',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
            console.log(result)
        })
    },[])
    return(
            <div className="gallery">
            {
                data.map(item=>{
                    if(item.checkFree=="Free"){
                    return(
                    <div className="card " style={{width:"30%"}}>
                        <div className="card-image" >
                            <img src={item.Book_photo} alt={item.title} />
                            <a className="btn-floating halfway-fab waves-effect waves"><i className="material-icons" style={{color:"white"}}>favorite</i></a>
                        </div>
                        <div className="card-content">
                            <p><b>Added by: </b>{item.postedBy.name}</p>
                            {/* <p><b>Year: </b>{item.year}</p> */}
                            <p><b>Publication/Edition:</b>{item.publication}</p>
                            {/* <p><b>Email:</b>{item.postedBy._id}</p> */}
                            <Contact obID={item.postedBy._id} />
                            <p><b>Price: RS.</b>{item.price}</p>
                            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                             style={{marginTop:"20px"}}>Contact to buy</button>
                            <button className="btn waves-effect waves-light #388e3c green darken-2" style={{marginTop:"20px", marginLeft:"20px"}}>Book Details</button>
                        </div>
                    {/* </div> */}

                    
                    </div>
                    )
                    }                    
                })

                }
            </div>
)
}
export default FreeBooks