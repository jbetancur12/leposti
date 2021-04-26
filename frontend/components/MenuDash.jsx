import { Menu } from 'antd';

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuDash = () => (
  <Menu
    mode='inline'
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%', borderRight: 0 }}
  >
    <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
      <Menu.Item key='1' icon={<UserOutlined />}>
        option1
      </Menu.Item>
      <Menu.Item key='2' icon={<UserOutlined />}>
        option2
      </Menu.Item>
      <Menu.Item key='3' icon={<UserOutlined />}>
        option3
      </Menu.Item>
      <Menu.Item key='4' icon={<UserOutlined />}>
        option4
      </Menu.Item>
    </SubMenu>
    <SubMenu key='sub2' icon={<LaptopOutlined />} title='subnav 2'>
      <Menu.Item key='5' icon={<LaptopOutlined />}>
        option5
      </Menu.Item>
      <Menu.Item key='6' icon={<LaptopOutlined />}>
        option6
      </Menu.Item>
      <Menu.Item key='7' icon={<LaptopOutlined />}>
        option7
      </Menu.Item>
      <Menu.Item key='8' icon={<LaptopOutlined />}>
        option8
      </Menu.Item>
    </SubMenu>
    <SubMenu key='sub3' icon={<NotificationOutlined />} title='subnav 3'>
      <Menu.Item key='9' icon={<NotificationOutlined />}>
        option9
      </Menu.Item>
      <Menu.Item key='10' icon={<NotificationOutlined />}>
        option10
      </Menu.Item>
      <Menu.Item key='11' icon={<NotificationOutlined />}>
        option11
      </Menu.Item>
      <Menu.Item key='12' icon={<NotificationOutlined />}>
        option12
      </Menu.Item>
    </SubMenu>
  </Menu>
);

export default MenuDash;
