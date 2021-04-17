import { Layout } from 'antd';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
import styles from '../styles/New.module.css';

const login = () => {
  return (
    <Layout className={styles.layout}>
      <MyHeader></MyHeader>
      HOLAAA
      <MyFooter></MyFooter>
    </Layout>
  );
};

export default login;
