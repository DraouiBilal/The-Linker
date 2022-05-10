import styles from '../styles/Chat.module.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Socket } from "socket.io_client";
import SocketClient from "../socket/SocketClient";
import ChatList from '../components/FriendsList';
import ChatHead from '../components/ChatHead';
import ChatBody from '../components/ChatBody';
// let socket:Socket

const chat = ( ) => {

    const router = useRouter()
    
    // useEffect(()=> {
    //     socket = SocketClient.getSocket("")
        
    //     socket.on('connect',() => {
    //         console.log(`Connected to Web socket on localhost:5001`);
    //         socket.emit("userConnected")
    //     })

    //     socket.on('disconnect',() => {
    //         console.log(socket);
    //         socket.emit("userDisonnected")
    //     })

    //     socket.on("message",(data:any) => {
    //         console.log(data)
    //     })

    //     socket.on("getMessages",(data:any) => {
    //         console.log(data)
    //     })

    //     socket.on("getFriends",(data:any) => {
    //         console.log(data)
    //     })
    // },[])

    return (
    <>
        <main className={styles.main}>
          <div className={styles.container}>
            <ChatList />
            <div className={styles.chate}>
              <ChatHead user={{nom:"Draoui" ,prenom:"Bilal" ,avatar:"/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png",online:true}} />
              <ChatBody />
            </div>
          </div>
        </main>
    </>
    )
}

export default chat