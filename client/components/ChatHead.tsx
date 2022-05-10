import Image from 'next/image'
import styles from '../styles/ChatHead.module.css'

interface propsType {
    user:{
        nom:string,
        prenom:string,
        online:boolean,
        avatar:string
    }
}


const ChatHead = (props:propsType) => {

    const {user} = props
    return (
        <div className={styles.chate_header}>
            <div className={styles.header_content}>
                <div className={styles.sender_avatar}>
                    <Image src={user.avatar} height="50px" width="50px" alt="" />
                </div>
                <div className={styles.sender_action}>
                    <h3>{`${user.nom} ${user.prenom}`}</h3>
                    <span>{user.online?"online":"offline"}</span>
                </div>
                <div className={styles.icons}>
                    <i className={`${styles.fas} ${styles.fa_user_plus}`} />
                    <i className={`${styles.fas} ${styles.fa_search}`} />
                    <i className={`${styles.fas} ${styles.fa_ellipsis_v}`} />
                </div>
            </div>
        </div>
    )
}

export default ChatHead