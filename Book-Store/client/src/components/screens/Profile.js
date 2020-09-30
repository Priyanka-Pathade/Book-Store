import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () =>{
    const [mypics,setpics] = useState([])
    const {} = useContext(UserContext)
    const {state,dispatch} =useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        fetch('/mybooks',{
            headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setpics(result.mybooks)
            // console.log(result)
        })
    },[])

    const deletePost =(postid)=>{
        fetch(`/deletebook/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = mypics.filter(item=>{
                return item._id !== result._id
            })
            setpics(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
            <div>
                <div style={{
                  display:"flex",
                  justifyContent:"space-around",
                  margin:"18px 0px",
                  borderBottom:"1px solid grey" 
                }}>
                    {/* <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/flagged/photo-1536475280412-92f55a99824e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                    </div> */}
                    <div>
                        <h5><b>Name: </b>{state?state.name:"Loading..."}</h5>
                        {/* <h5>{state.name}</h5> */}
                        <h5>You have added {mypics.length} Books</h5>
                    </div>
               
                </div>

            <div className="gallery">
                {
                    mypics.map(item=>{
                        
                        return(
                            // <img key={item._id} className="item" src={item.Book_photo} alt={item.title}/>
                            <div className="card" style={{width:"30%"}}>
                            <div className="card-image" >
                                <img src={item.Book_photo} alt={item.title} />
                                {/* <p>{item.postedBy._id}</p> */}
                            </div>
                            <div className="card-content" style={{margin:"0%"}}>
                                <button className="btn waves-effect waves-light #4caf50 green"
                                style={{marginLeft:"50px"}}
                                onClick={()=>deletePost(item._id)}
                                >Delete Book</button>
                            </div>
                        </div>
                        )
                    
                    })
                 
                }
               
            </div>
            </div>

    )
}
export default Profile