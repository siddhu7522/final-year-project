import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom"
import "./SidebarChat.css"
import {Avatar} from "@material-ui/core"
import DoneAllIcon from '@material-ui/icons/DoneAll';
import db from "./firebase"
function SidebarChat({id,addNewChat,name,img}) {
    const [messages,setMessages]=useState("")
    useEffect(()=>{
        db.collection("chats").doc(id).collection("messages")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>
        setMessages(snapshot.docs.map((doc)=>doc.data()))
        )
    },[])
    const createChat=()=>{
            const chatName=prompt("please enter the name of the chat");
            if(chatName){
                db.collection("chats").add({
                    name:chatName,
                })
            }
    }
    return !addNewChat?(
        <Link className="link" to={`/chats/${id}`}>

       
      
        <div className="sidebarChat">
            
             <div className="Sidebarchat__avatar">
                
            <Avatar src= {img}/>
           </div>
           <div className="sidebarChat__info">
               
           <h3>{name}</h3>
           <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Create a new Chat</h2>
        </div>
    )
    
    
}

export default SidebarChat
