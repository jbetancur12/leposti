import styles from '../styles/New.module.css';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image';
import { Layout, Button, Drawer } from 'antd';

import MyMenu from './MyMenu';

const { Header } = Layout;

const MyHeader = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header className={styles.header} id='header'>
      <a href='/' className={styles.img}>
        <Image
          src='/logoprincipalBlanco.png'
          alt='Logo de Leposti'
          width={140}
          height={33}
        />
      </a>
      <div className={styles.myMenu}>
        <MyMenu type='horizontal' />
      </div>
      <Button className={styles.barsMenu} type='primary' onClick={showDrawer}>
        <FaBars />
      </Button>
      <Drawer
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <MyMenu type='vertical' />
      </Drawer>
    </Header>
  );
};

export default MyHeader;
