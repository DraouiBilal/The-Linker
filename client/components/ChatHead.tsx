import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { User } from "../DTO/profile-dto";
import styles from "../styles/ChatHead.module.css";

interface propsType {
    user: User;
    online: boolean;
}

const ChatHead = (props: propsType) => {
    const { user, online } = props;
    console.log(user);

    return (
        <div className={styles.chate_header}>
            <div className={styles.header_content}>
                <div className={styles.sender_avatar}>
                    <Image
                        src={user.avatar}
                        height="50px"
                        width="50px"
                        alt=""
                    />
                </div>
                <div className={styles.sender_action}>
                    <h3>{`${user.firstname} ${user.lastname}`}</h3>
                    <span>{online ? "online" : "offline"}</span>
                </div>
                <div className={styles.icons}>
                    <i className={`${styles.fas} ${styles.fa_user_plus}`} />
                    <i className={`${styles.fas} ${styles.fa_search}`} />
                    <i className={`${styles.fas} ${styles.fa_ellipsis_v}`} />
                </div>
            </div>
        </div>
    );
};

export default ChatHead;
