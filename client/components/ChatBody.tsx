import Message from "./Message"
import styles from '../styles/ChatBody.module.css'

interface propsType {

}

const ChatBody = (props:propsType) => {

    return(
        <div className={styles.chate_body}>
                
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={true} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            <Message avatar="/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png" sender={false} message="Lorem, ipsum dolor sit amet consectetur adipisicing elit" />
            
            <div className={styles.message_box}>
                <div className={styles.message_box_aria}>
                <input type="text" placeholder="Type a message.." />
                <i className={`${styles.far} ${styles.fa_smile}`} />
                </div>
            </div>
        </div>
    )
}

export default ChatBody