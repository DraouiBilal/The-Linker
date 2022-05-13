import Image from "next/image"
import styles from "../styles/Friend.module.css"
import { User } from "../DTO/profile-dto";
import { Dispatch, SetStateAction, useState } from "react";
interface propsType {
    user:User,
    online:boolean,
    setSelectedFriend:Dispatch<SetStateAction<{
        id: string;
        lastname: string;
        firstname: string;
        username: string;
        email: string;
        password: string | undefined;
        avatar: string;
        connected: boolean;
    }>>
}

const Friend = (props:propsType) =>{
    const [active, setActive] = useState<boolean>(false)
    
    return (
        <div 
        onMouseOver={()=>setActive(true)} 
        onMouseOut={()=>setActive(false)} 
        onClick={()=>props.setSelectedFriend(props.user)}
        className={`${styles.ms_a} ${active && styles.chat_active}`}>
            <div className={styles.avatar}>
                <Image src={props.user.avatar} height="50px" width="50px" alt="" />
            </div>
            <div className={styles.mesg_info }>
                <div className={styles.ms_info}>
                    <span className={styles.sender_name}>{props.user.username}</span>
                    <span className={styles.time}>{props.user.connected?"Online":"Offline"}<span className={props.user.connected? styles.ms_online:styles.ms_offline}>2</span></span>
                </div>
                <div className={styles.action}>
                    <span>{props.user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Friend