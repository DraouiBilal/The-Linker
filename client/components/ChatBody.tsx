import Message from "./Message"
import styles from '../styles/ChatBody.module.css'
import { User } from '../DTO/profile-dto'
import { FormEvent, useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import {Message as MessageT} from "../DTO/chat-dto"
import CryptoJS from 'crypto-js'


interface propsType {
    user:User,
    friend: User,
    socket:Socket,
    secret:string
}

const ChatBody = (props:propsType) => {
    
    const [id,setId] = useState<number>(0)
    const [message, setMessage] = useState<string>("")
    const messagesRef = useRef<MessageT[]>([])
    const [messages, setMessages] = useState<MessageT[]>(messagesRef.current)

    const lastMessage = useRef<HTMLDivElement>(null)

    

    const onSubmitHandler = (e:FormEvent) => {
        e.preventDefault()
        if(message.length > 0){
            
            const aesMessage = CryptoJS.AES.encrypt(message,props.secret).toString();
            props.socket.emit("message",{
                to:props.friend.id,
                message:aesMessage,
                id
            })
            setId(id+1)
            setMessage("")
            messagesRef.current = [...messagesRef.current,{from:props.user.id,to:props.friend.id,message,id:id}]
            setMessages(messagesRef.current)
        }
    }

    useEffect(()=>{
        
        props.socket.on("message",(data:MessageT) => {
            const plaintext = CryptoJS.AES.decrypt(data.message, props.secret).toString(CryptoJS.enc.Utf8)
        
            if(messagesRef.current.length>0 && messagesRef.current[messagesRef.current.length-1].id !== data.id)
                messagesRef.current = [...messagesRef.current,{...data,message:plaintext}]
            setMessages(messagesRef.current);
        })
        
        props.socket.on("getMessages",(data:{messages:MessageT[]})=>{  
                      
            messagesRef.current = data.messages.map(message=>{
                const plaintext = CryptoJS.AES.decrypt(message.message,props.secret).toString(CryptoJS.enc.Utf8)                
                return {
                    ...message,
                    message: plaintext
                }
            })            
            setMessages(messagesRef.current)
        })
    },[])

    useEffect(()=> {
        props.socket.emit("getMessages",{to:props.friend.id})

    },[props.friend])

    useEffect(()=>{
        if(lastMessage.current)
            lastMessage.current.scrollIntoView({behavior:"smooth"})
    },[messages])
    return(
        <div className={styles.chate_body}>
            {
                messages.map((message,index) => (
                    <Message user={props.user} 
                    sender={message.from===props.user.id} 
                    message={message.message} 
                    key={index}
                    />
                ))
            }
            <div id="endOfMessages" ref={lastMessage}/>
            <form className={styles.message_box} onSubmit={(e)=>onSubmitHandler(e)}>
                <div className={styles.message_box_aria}>
                <input type="text"
                 placeholder="Type a message.." 
                 value={message} 
                 onChange={(e)=>setMessage(e.target.value)}
                />
                <i className={`${styles.far} ${styles.fa_smile}`} />
                </div>
            </form>
        </div>
    )
}

export default ChatBody