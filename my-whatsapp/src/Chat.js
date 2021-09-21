import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom" 
import {Avatar, IconButton} from "@material-ui/core"
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import db from "./firebase"
import firebase from "firebase"
import { useStateValue } from './StateProvider';
import "./Chat.css"
function Chat() {
    const[input,setInput]=useState("");
    const[chatName,setChatName]=useState("")
    const[messages,setMessages]=useState([])
    const [{user},dispatch]=useStateValue()
    const {chatId}=useParams();
    useEffect(()=>{
        if(chatId){

        
            db.collection("chats").doc(chatId).onSnapshot(snapshot=>{
                setChatName(snapshot.data().name);
            });
            
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc=>doc.data()))
            
        })
        }
            
    },[chatId])
    const sendMessage=(e)=>{
            e.preventDefault();
            db.collection("chats").doc(chatId).collection("messages").add({
                message:input,
                name: user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            })
            setInput("")

    }
    return (
        <div className="chat">
            <div className="chat__header">
        <Avatar/>
        <div className="chatheader__info">
        <h3>{chatName}</h3>
        <p>Last seen {" "}
        {new Date(
            messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
        
        </p>
        </div>
        <div className="chatHeader__right">
            <IconButton>
            <VideocamOutlinedIcon/>
            </IconButton>
           <IconButton>
           <CallOutlinedIcon/>
           </IconButton>
           <IconButton>
           <SearchOutlinedIcon/>
               </IconButton>
           <IconButton>
           <MoreHorizOutlinedIcon/>
           </IconButton>
            
        </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                    <>
                   
                    <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}

                    <span className="message__timestamp">

                        {new Date(message.timestamp?.toDate()).toUTCString()}


                    </span>
                    </p>
</>
                ))}
           




            </div>
            <div className="chat__footer">
                <IconButton>
    <InsertEmoticonIcon/>
    </IconButton>
    <IconButton>
    <AttachFileIcon/>
    </IconButton>

<form>
    <input value={input}onChange={(e)=>setInput(e.target.value)} type="text"placeholder="Type a messsage..."/>
   


    <button onClick={sendMessage} type="submit" className="send__button">send</button>
    </form>

<IconButton>
<MicIcon/>
</IconButton>

            </div>
           
        </div>
    )
}

export default Chat
