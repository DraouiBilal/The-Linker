import Image from 'next/image'
import styles from '../styles/User.module.css'

interface propsType {
    user:{
        nom:string,
        prenom:string,
        avatar:string
    }
}

const User = (props:propsType) => {
    const {user} = props
    return (
        <div className={styles.m_info}>
            <div className={styles.avatar}>
                <Image src={user.avatar} height="50px" width="60px" alt="" />
            </div>
            <div className={styles.p_info}>
                <div className={styles.pname}>
                    <h2>{`${user.nom} ${user.prenom}`}</h2>
                    <span className={styles.p_disc}> Web Developer</span>
                </div>
                <div className={styles.icon}>
                    <i className={`${styles.fas} ${styles.fa_bars}`} />
                </div>
            </div>
        </div>
    )
}

export default User