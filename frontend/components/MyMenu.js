import {Menu} from 'antd'
import styles from '../styles/New.module.css'

const MyMenu = (props, {children}) => {
    return (
        <Menu className={styles.menu} mode={props.type}>
            <Menu.Item key="4" className={`${styles.item} ${styles.loginBtn} ${styles.loginBtnFirst}`}><a href="/login">Iniciar sesión</a></Menu.Item>
            <Menu.Item key="1" className={styles.item}><a href="#about">Quiénes somos</a></Menu.Item>
            <Menu.Item key="2" className={styles.item}><a href="#contact">Contáctenos</a></Menu.Item>
            <Menu.Item key="3" className={styles.item}><a href="#questions">Preguntas frecuentes</a></Menu.Item>
            <Menu.Item key="4" className={`${styles.item} ${styles.loginBtn} ${styles.loginBtnSecond}`}><a href="/login">Iniciar sesión</a></Menu.Item>
        </Menu>
    )
}

export default MyMenu;