import Image from 'next/image'
import styles from '../styles/User.module.css'
import { User } from "../DTO/profile-dto";
import Link from 'next/link';

interface propsType {
    user:User
}

const User = (props:propsType) => {
    const {user} = props
    
    return (
        <div className={styles.m_info}>
            <Link href="/profile">
                <div className={styles.avatar}>
                    <Image src={user.avatar} height="50px" width="60px" alt="" />
                </div>
            </Link>
            <div className={styles.p_info}>
                <div className={styles.pname}>
                    <h2>{`${user.firstname} ${user.lastname}`}</h2>
                    <span className={styles.p_disc}>{user.email}</span>
                </div>
                <div className={styles.icon}>
                    <i className={`${styles.fas} ${styles.fa_bars}`} />
                </div>
            </div>
        </div>
    )
}

export default User