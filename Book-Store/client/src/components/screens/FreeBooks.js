import React, { useState, useContext, useEffect, Component } from 'react'
import { Modal, ModalBody, ModalHeader, Col, Button, ButtonToolbar } from 'reactstrap';
import Contact from './ContactToBuy';
const FreeBooks = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/allbooks', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res => res.json())
            .then(result => {
                setData(result.posts)
                console.log(result)
            })
    }, [])
    return ( 
        <div className = "gallery" > {
            data.map(item => {
                if (item.checkFree == "Free") {
                    return ( 
                        <div className = "card "
                        style = {
                            { width: "30%" }
                        } >
                        <div className = "card-image" >
                        <img src = { item.Book_photo }
                        alt = { item.title }
                        /> 
                        <a className = "btn-floating halfway-fab waves-effect waves" > < i className = "material-icons"
                        style = {
                            { color: "white" }
                        } > favorite </i></a >
                        </div> 
                        <div className = "card-content" >
                        <p > < b > Added by: </b>{item.postedBy.name}</p > { /* <p><b>Year: </b>{item.year}</p> */ } 
                        <p > < b > Publication / Edition: </b>{item.publication}</p > { /* <p><b>Email:</b>{item.postedBy._id}</p> */ } <
                        Contact obID = { item.postedBy._id }
                        /> 
                        <p > < b > Price: RS. </b>{item.price}</p >
                        <Contact_details_free ObjectID = { item.postedBy } > </Contact_details_free> 
                        <button className = "btn waves-effect waves-light #388e3c green darken-2"
                        style = {
                            { marginTop: "20px", marginLeft: "20px" }
                        } > Book Details </button> </
                        div > { /* </div> */ }


                        </div>
                    )
                }
            })

        } 
        </div>
    )
}

class Contact_details_free extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return ( <div >
            <Button outline onClick = { this.toggleModal } > < span className = "fa fa-contact fa-lg" > </span>Contact To Buy</Button >
            <Modal isOpen = { this.state.isModalOpen }
            toggle = { this.toggleModal } >
            <ModalHeader toggle = { this.toggleModal } > Contact To Buy </ModalHeader> <
            ModalBody >

            <div >
            <Col md = { 12 } >
            <h3 > Owner Name: { this.props.ObjectID.name } </h3> 
            <h3 > Email ID: { this.props.ObjectID.email } </h3>   
            <h3 > Mobile Number: { this.props.ObjectID.phone } </h3>  
            </Col > 
            </div > 
            </ModalBody> 
            </Modal >
            </div>
        );
    }
}

export default FreeBooks