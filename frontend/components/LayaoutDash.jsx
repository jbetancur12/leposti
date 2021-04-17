import { Layout, Menu, Breadcrumb, Button, Drawer } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  BarsOutlined
} from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react"

import styles from "../styles/LayoutDash.module.css";
import antStyles from 'antd/dist/antd.css'

import MenuDash from "./MenuDash"

const { Header, Content, Sider } = Layout;

const LayoutDash = ({ children }) => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <Layout className={styles.layout}>
        <Header className={`${antStyles.header} ${styles.header}`}>
          <div className={styles.logo}>
            <Image
              src="/logoprincipalBlanco.png"
              alt="Logo de Leposti"
              width={140}
              height={33}
            />
          </div>
          <Button className={styles.barsMenu} type="primary" onClick={showDrawer}>
            <BarsOutlined />
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ padding: 0 }}
          >
            <MenuDash mode="vertical"/>
          </Drawer>
        </Header>
        <Layout>
          <Sider width={200} className={styles.sider}>
            <MenuDash mode="inline"/>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className={styles.content}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutDash;
