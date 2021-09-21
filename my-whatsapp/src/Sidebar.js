import React, {useState, useEffect } from 'react'
import "./Sidebar.css"
import {Avatar, IconButton} from "@material-ui/core"
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat"
import DoneAllIcon from '@material-ui/icons/DoneAll';
import firebase from "./firebase"
import db from "./firebase"
import { useStateValue } from './StateProvider';
function Sidebar() {
    const [{user},dispatch]=useStateValue()
    const[chats,setChats]=useState([])
    
    useEffect(()=>{
     const unsubscribe= db.collection("chats").onSnapshot((snapshot)=>{
            setChats(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            )
            return()=>{
                unsubscribe();
            }
        })
    },[]);
    return (
        <div className="sidebar">
           <div className="sidebar__header">
<Avatar src={user?.photoURL}/>
<div className="sidebar__headerRight">
    <IconButton>
    <DonutLargeRoundedIcon/>
    </IconButton>
    <IconButton>
    <ChatRoundedIcon/>
    </IconButton>
   <IconButton>
   <MoreVertRoundedIcon/>
   </IconButton>
   
   
</div>
           </div>
           <div className="sidebar__search">
               <div className="sidebar__searchContainer">
               <SearchOutlinedIcon className="search__icon"/>
                <input type="text"placeholder="Search"/>
               </div>
              
           </div>
           <div className="sidebar__chats">
               <div className="message">
                   <SidebarChat
                   addNewChat/>

           {chats.map(chat=>(
               <SidebarChat key={chat.id} id={chat.id}
               name={chat.data.name}
               
               />
               
           ))}
                {/* <SidebarChat
               
                img="https://images.unsplash.com/photo-1567878673942-be055fed5d30?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80"
                name="Amma"
                message="Hello"
               
                
                />
                <DoneAllIcon className="doubletick"/>
                 <SidebarChat 
                 
                img ="https://scontent.fmaa1-4.fna.fbcdn.net/v/t1.0-9/154083263_1137038520077049_7165987142544711433_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=AG43-GlD3FoAX85HB6y&_nc_ht=scontent.fmaa1-4.fna&oh=7da7273d4bfd6c1f7549edd20128a6d7&oe=6085A482"
                name="chinni"
                message="Hi how r u"
                />
                 <DoneAllIcon className="doubletick"/>
                <SidebarChat
                img="https://scontent.fmaa1-3.fna.fbcdn.net/v/t1.0-1/s320x320/87010789_2242835602686728_8849773245755293696_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=7206a8&_nc_ohc=b0nkrmkCAOEAX-FgwBC&_nc_ht=scontent.fmaa1-3.fna&tp=7&oh=b4788f133c84f4bbb26366b9167070d6&oe=608725A8"
                name="cherry"
                message="Hi cherry"
                />
                 <DoneAllIcon className="doubletick"/>
                <SidebarChat
                img =""
                name="Happy Family"
                message="Gud mrng"
                /> */}
                 
               </div>
           </div>
        </div>
    )
}

export default Sidebar
