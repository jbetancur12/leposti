import React from 'react';
import { Menu } from 'antd';
import styles from '@styles/New.module.css';
import { useAuth } from '@context/auth';
import Link from 'next/link';

const MyMenu = (props) => {
  const { isAuthenticated } = useAuth();
  return (
    <Menu className={styles.menu} mode={props.type} forceSubMenuRender={true}>
      <Menu.Item key='1' className={styles.item}>
        <Link href='/#about'>
          <a>Quiénes somos</a>
        </Link>
      </Menu.Item>
      <Menu.Item key='2' className={styles.item}>
        <Link href='/#contact'>
          <a>Contáctenos</a>
        </Link>
      </Menu.Item>
      <Menu.Item key='3' className={styles.item}>
        <Link href='/#questions'>
          <a>Preguntas frecuentes</a>
        </Link>
      </Menu.Item>
      {isAuthenticated ? (
        <Menu.Item key='4' className={`${styles.item} ${styles.loginBtn}`}>
          <Link href='/dashboard/user'>
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key='4' className={`${styles.item} ${styles.loginBtn}`}>
            <Link href='/login'>
              <a>Iniciar sesión</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='5' className={`${styles.item} ${styles.registerBtn}`}>
            <Link href='/register'>
              <a>Registrate</a>
            </Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default MyMenu;
