import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import {
  Form,
  Input,
  Button,
  Checkbox,

  Layout,
  Row,
  message,
  Col,
  Spin
} from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from '../styles/Login.module.css';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import { Content } from 'antd/lib/layout/layout';
import { login } from "../context/auth";
import AppContext from "../context/AppContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NormalLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    console.log(appContext);
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    login(values.email, values.password)
      .then((res) => {
        message.success('Ingreso Exitoso!');
        setLoading(false);
        // set authed User in global context to update header/app state
        appContext.setUserLoged(res.data.user);

      })
      .catch((error) => {
        console.log(error);
        message.error('Email y/o contraseña invalidos');
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <Layout className={styles.layout}>
      <MyHeader />
      <Content className={styles.content}>
        <Row justify='space-around' style={{ width: '100%' }}>
          <Col
            span={24}
            sm={12}
            lg={10}
            xl={6}
            className={styles.formContainer}
          >
            <h1 className={styles.title}>Iniciar Sesion</h1>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className='login-form-forgot' href='/forgotpassword'>
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  {loading ? (<Spin indicator={antIcon} />) : "Login"}
                </Button>
                O <a href='/register'>Registrate aca!</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <MyFooter />
    </Layout>
  );
};

export default NormalLoginForm;
