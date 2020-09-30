import React,{useEffect, createContext,useReducer,useContext} from 'react';
import NavBar from './components/navbar'
import "./App.css"
import {BrowserRouter, Route,Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import FrontPage from './components/screens/frontPage'
import FreeBooks from './components/screens/FreeBooks'
import PaidBooks from './components/screens/PaidBooks'
import AddBooks from './components/screens/AddBook'
import {reducer,initialState} from './reducers/userReducer'
import 'bootstrap/dist/css/bootstrap.css';

export const UserContext = createContext()
const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }else{
      history.push('/')    //change here
    }
  },[])

  return(
    <Switch>   
      <Route exact path="/"><Home /></Route>
      <Route path="/frontpage"><FrontPage /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/freebooks"><FreeBooks /></Route>
      <Route path="/paidbooks"><PaidBooks /></Route>
      <Route path="/addbook"><AddBooks /></Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value ={{state,dispatch}}>
    <BrowserRouter>
      <NavBar /> 
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
        );
}

export default App;
