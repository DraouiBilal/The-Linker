import styles from '../styles/ChatList.module.css'
import Friend from './Friend'
import User from './User'

interface propsType {

}

const ChatList = (props:propsType) => {
    return (
        <div className={styles.chate_liste}>
            <User user={{avatar:'/images/iconfinder_anime_spirited_away_no_face_nobody_4043233.png',nom:'Draoui',prenom:'Bilal'}}/>
            <div className={styles.search_box}>
                <i className={`${styles.fas} ${styles.fa_search}`} />
                <input type="text" placeholder="Search for chate or gorupe chate" />
            </div>
            <Friend active={true} name="DraouiBilal" online={true} lastText="Hello from here" avatar="/images/iconfinder_batman_hero_avatar_comics_4043232.png"/>
            <Friend active={false} name="FaresAkram" online={true} lastText="Hello from here" avatar="/images/iconfinder_batman_hero_avatar_comics_4043232.png"/>
        </div>
    )
}

export default ChatList