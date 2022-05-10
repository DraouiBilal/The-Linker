import Image from 'next/image'
import styles from '../styles/Message.module.css'

interface propsType{
    message: string,
    avatar: string,
    sender: boolean
}

const Message = (props: propsType) => {
    return (
        <div className={props.sender?styles.message_sender:styles.message_recever}>
            <div className={styles.message_sender_avatar}>
                <Image src={props.avatar} height="50px" width="50px" alt="" />
            </div>
            <div className={styles.message_sender_message }>
            <p> {props.message} </p>
            </div>
            <div className={styles.message_sender_icon}><i /></div>
        </div>
    )
}

export default Message 