import Image from "next/image"
import styles from "../styles/Friend.module.css"

interface propsType {
    active:boolean,
    name:string,
    avatar:string,
    online:boolean,
    lastText: string
}

const Friend = (props:propsType) =>{

    return (
        <div className={`${styles.ms_a} ${props.active && styles.chat_active}`}>
            <div className={styles.avatar}>
                <Image src={props.avatar} height="50px" width="50px" alt="" />
            </div>
            <div className={styles.mesg_info }>
                <div className={styles.ms_info}>
                    <span className={styles.sender_name}>{props.name}</span>
                    <span className={styles.time}>{props.online?"Online":"Offline"}<span className={`${styles.msge_num} ${styles.ms_active}`}>2</span></span>
                </div>
                <div className={styles.action}>
                    <span>{props.lastText}</span>
                </div>
            </div>
        </div>
    )
}

export default Friend