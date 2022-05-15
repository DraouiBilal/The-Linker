import styles from '../styles/Chat.module.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SocketClient from "../socket/SocketClient";
import FriendsList from '../components/FriendsList';
import ChatHead from '../components/ChatHead';
import ChatBody from '../components/ChatBody';
import { getUser } from "../lib/profile-lib";
import { User } from "../DTO/profile-dto";
import { Socket } from 'socket.io-client';
import Head  from 'next/head';
import { generateAesSecret } from '../lib/chat-lib';
import * as cryptico from "cryptico"
import { encryption } from '../DTO/chat-dto';

let socket:Socket
let aesSecret:string

const chat = ( ) => {

    const router = useRouter()

    const [currentUser, setCurrentUser] = useState<User>({
      id: "",
      lastname: "",
      firstname: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
      connected:false
  });

  const [loadingUser,setLoadingUser] = useState<boolean>(true)
  const [selectedFriend,setSelectedFriend] = useState({
      ...currentUser
    })

  useEffect(() => {
      const callAPI = async () => {
          const accessToken: string | null =
              localStorage.getItem("accessToken");
          if (accessToken) {
              const user: User | null = await getUser(accessToken);
              return user;
          } else {
              router.push('/')
              return null;
          }
      };

      callAPI().then((user) => {
          setLoadingUser(false)
          
          if (user) {
            setCurrentUser(user);
            socket = SocketClient.getSocket(user.id)
            if(!localStorage.getItem("aesSecret"))
              localStorage.setItem("aesSecret",generateAesSecret())
              
            aesSecret = localStorage.getItem("aesSecret")!

            socket.on("getPublicKey",(data:{publicKey:string})=> {
                const encryptedAesSecret:encryption = cryptico.encrypt(aesSecret, data.publicKey);
                socket.emit("getAesSecret",{secret:encryptedAesSecret.cipher})   
            })

            socket.emit("getPublicKey")

          } else {
              router.push("/");
          }
      });
  }, []);

    return (
     !loadingUser &&
     <>
        <Head>
          <title>The-Linker | Chat</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.container}>
            <FriendsList socket={socket} setSelectedFriend={setSelectedFriend} user={currentUser}/>
            <div className={styles.chate}>
              <ChatHead user={selectedFriend} online={selectedFriend.connected} />
              <ChatBody secret={aesSecret} socket={socket}   user={currentUser} friend={selectedFriend}/>
            </div>
          </div>
        </main>
    </>
        
    )
}

export default chat