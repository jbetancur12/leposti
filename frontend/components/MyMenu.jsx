import React, { useContext } from "react";
import { Menu } from 'antd'
import styles from '../styles/New.module.css'
import AppContext from '../context/AppContext'

const MyMenu = (props, { children }) => {
  const { user } = useContext(AppContext);

  return (
    <Menu className={styles.menu} mode={props.type}>
      <Menu.Item key="1" className={styles.item}><a href="#about">Quiénes somos</a></Menu.Item>
      <Menu.Item key="2" className={styles.item}><a href="#contact">Contáctenos</a></Menu.Item>
      <Menu.Item key="3" className={styles.item}><a href="#questions">Preguntas frecuentes</a></Menu.Item>{user ? (<Menu.Item key="4" className={`${styles.item} ${styles.loginBtn}`}><a href="/dashboard">Dashboard</a></Menu.Item>) :
        (<><Menu.Item key="4" className={`${styles.item} ${styles.loginBtn}`}><a href="/login">Iniciar sesión</a></Menu.Item>
          <Menu.Item key="5" className={`${styles.item} ${styles.registerBtn}`}><a href="/register">Registrate</a></Menu.Item></>)}
    </Menu>
  )
}

export default MyMenu;