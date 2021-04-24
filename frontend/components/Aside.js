import styles from "../styles/New.module.css"
import MyHeader from './MyHeader'
import { Layout, Menu } from 'antd';
import MyFooter from "./MyFooter";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout

const AsideDash = () => {
  return (
    <Layout>
      <MyHeader />
      <Layout>
        <Sider
          style={{ height: "100vh" }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Cuenta
        </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Compras
        </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Content>COntent</Content>

        </Layout>
      </Layout>
      <MyFooter></MyFooter>
    </Layout>
  )
}

export default AsideDash