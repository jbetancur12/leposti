import { useAuth } from '../context/auth';
import { Layout, Menu, Breadcrumb, Button, Popover, Tooltip } from 'antd';
import {
  UserOutlined,
  ToolOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import styles from '../styles/LayoutDash.module.css';

import Image from 'next/image';
import Link from 'next/link';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MyLayout = ({ children }) => {
  const auth = useAuth();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <a href='/' className={styles.img}>
            <Image
              src='/logoPrincipalBlanco.png'
              alt='leposti logo'
              width={149}
              height={33}
            />
          </a>
        </div>
        <div>
          <Tooltip title='Carrito'>
            <Link href='/dashboard/carrito'>
              <Button
                shape='circle'
                style={{ marginRight: '.5rem' }}
                icon={<ShoppingCartOutlined />}
              />
            </Link>
          </Tooltip>
          <Popover
            content={
              <a
                onClick={() => auth.logout({ redirectLocation: '/' })}
                href='#'
              >
                Cerrar Sesión
              </a>
            }
          >
            <Button type='primary' shape='round' icon={<UserOutlined />}>
              Jorge
            </Button>
          </Popover>
        </div>
      </Header>
      <Layout className={styles.content}>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key='1' icon={<UserOutlined />}>
              <Link href='/dashboard/user'>
                <a>Perfil</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<UserOutlined />}>
              <Link href='/dashboard/publications'>
                <a>Publicaciones</a>
              </Link>
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='Compras'>
              <Menu.Item key='3' icon={<UserOutlined />}>
                <Link href='/dashboard/compras_realizadas'>
                  <a>Realizadas</a>
                </Link>
              </Menu.Item>
              <Menu.Item key='4' icon={<UserOutlined />}>
                <Link href='/dashboard/compras_pendientes'>
                  <a>Pendientes</a>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<ToolOutlined />} title='Configuración'>
              <Menu.Item key='5' icon={<UserOutlined />}>
                <a href='/dashboard/edit'>Editar Perfil</a>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='6' icon={<ShoppingCartOutlined />}>
              <a href='/dashboard/carrito'>Carrito</a>
            </Menu.Item>
            <Menu.Item key='7' icon={<UserOutlined />}>
              <a href='#'>Salir</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>MyLayout</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={styles.container}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
