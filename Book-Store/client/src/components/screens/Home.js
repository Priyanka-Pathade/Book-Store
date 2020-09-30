import React,{useEffect,useState} from 'react'

var background = {backgroundSize : 'cover'};
var textStyle = {
    position: 'absolute', 
    top: '30%', 
    marginLeft: '50px',
    marginRight: '50px',
    color:'white',
    fontFamily: 'Montserrat',
    fontSize: '30px',
    // textAlign: 'center',
  };
  var textStyle1 = {
    position: 'absolute', 
    top: '70%', 
    marginLeft: '50px',
    marginRight: '50px',
    color:'white',
    fontFamily: 'Montserrat',
    fontSize: '30px',
    // textAlign: 'center',
  };

const Home = () =>{

    return(
        <div className="myPage" >
            <div style={{width:'auto'}}>
                <img 
                  style={background} responsive 
                  src="https://res.cloudinary.com/dnkitfzzp/image/upload/v1597851231/Front-Image3_i8dlin.jpg">
                </img>
                <h3 style={textStyle}>“A trip to the bookshop is the ultimate exercise in empathy. Within it you will find endless opportunities to see and understand the world from someone else’s point of view.” – Jamila Rizvi</h3>
                <h3 style={textStyle1}>“I just love the smell of an old book store and the feel of the crisp pages along my fingertips.” ― Leah Spiegel</h3> 
            </div>
            {/* <h4>Home</h4> */}
     </div>
    )
}


export default Home