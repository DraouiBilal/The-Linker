import styles from '../styles/Chat.module.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Socket } from "socket.io_client";
import SocketClient from "../socket/SocketClient";
import FriendsList from '../components/FriendsList';
import ChatHead from '../components/ChatHead';
import ChatBody from '../components/ChatBody';
import { getUser } from "../lib/profile-lib";
import { User } from "../DTO/profile-dto";
import { Socket } from 'socket.io-client';
import  Head  from 'next/head';

// let socket:Socket

let socket:Socket

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
      ...currentUser,
      avatar: "/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png"
    })

  useEffect(() => {"/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png"
      const callAPI = async () => {
          const accessToken: string | null =
              localStorage.getItem("accessToken");
          if (accessToken) {
              const user: User | null = await getUser(accessToken);
              if(user)
                user.avatar = "/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png"
              return user;
          } else {
              return null;
          }
      };

      callAPI().then((user) => {
          setLoadingUser(false)
          
          if (user) {
            setCurrentUser(user);
            socket = SocketClient.getSocket(user.id)
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
              <ChatBody socket={socket}   user={currentUser} friend={selectedFriend}/>
            </div>
          </div>
        </main>
    </>
        
    )
}

export default chat