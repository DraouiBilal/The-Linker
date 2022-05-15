import styles from '../styles/FriendsList.module.css'
import Friend from './Friend'
import User from './User'
import { User as UserT} from "../DTO/profile-dto";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import SocketClient from '../socket/SocketClient';
import { Socket } from 'socket.io-client';

interface propsType {
    user:UserT,
    setSelectedFriend:Dispatch<SetStateAction<{
        id: string;
        lastname: string;
        firstname: string;
        username: string;
        email: string;
        password: string | undefined;
        avatar: string;
        connected:boolean
    }>>,
    socket:Socket
}

const FriendsList = (props:propsType) => {
    const {socket} = props 

    let friendsRef = useRef<UserT[]>([])
    const [friends, setFriends] = useState<UserT[]>(friendsRef.current)

    useEffect(()=>{
        
        
        socket.emit("getFriends")
        socket.on("getFriends",(data:{friends:UserT[]}) => {
            friendsRef.current = data.friends
            setFriends(friendsRef.current)
        })

        socket.on("friendConnected",(data:{id:string}) => {
            friendsRef.current =  friendsRef.current.map(friend => (
                friend.id===data.id?{...friend,connected:true}:friend
            ))
            setFriends(friendsRef.current)
        })

        socket.on("friendDisonnected",(data:{id:string}) => {
            friendsRef.current =  friendsRef.current.map(friend => (
                friend.id===data.id?{...friend,connected:false}:friend
            ))
            setFriends(friendsRef.current)
        })

    },[])

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        const filteredFriends = friendsRef.current.filter(friend => friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setFriends(filteredFriends)
    }

    return (
        <div className={styles.chate_liste}>
            <User user={props.user}/>
            <div className={styles.search_box}>
                <i className={`${styles.fas} ${styles.fa_search}`} />
                <input type="text" placeholder="Search for a friend" onChange={(e)=>handleOnChange(e)}/>
            </div>
            {friends.map((friend,index)=>{
                return (
                    <Friend  
                    setSelectedFriend={props.setSelectedFriend} 
                    user={friend} 
                    online={true} 
                    key={index}
                    />
                )
            })}
        </div>
    )
}

export default FriendsList