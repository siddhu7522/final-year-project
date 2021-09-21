import React from 'react'
import {Button} from "@material-ui/core"
import "./Login.css"
import { auth,provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import reducer from "./reducer"
 
function Login() {
    const [{},dispatch]=useStateValue()
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
           dispatch({
               type:actionTypes.SET_USER,
               user:result.user,
           })
        })
        .catch((error)=>alert(error.message))

    }
    return (
        <center>
        <div className="login">
           <div className="login__logo">
               <img src="https://i.pinimg.com/originals/e5/89/38/e589388eb222889b1771b439a51510bb.png"/>
              
           </div>
           <Button onClick={signIn}>Sign In with Google</Button>
        </div>
        </center>
    )
}

export default Login
