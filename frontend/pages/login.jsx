import React, { useEffect, useContext } from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Layout,
  Row,
  message,
  Col,
} from 'antd';
import { useRouter } from 'next/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import Cookie from "js-cookie";

import styles from '../styles/Login.module.css';

import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import { Content } from 'antd/lib/layout/layout';
import AppContext from "../context/AppContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NormalLoginForm = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['jwt', 'user']);
  const appContext = useContext(AppContext);
  const onFinish = async (values) => {
    const body = {
      identifier: values.email,
      password: values.password,
    };
    const resLogin = await fetch('https://api.leposti.ml/auth/local', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // body data type must match "Content-Type" header
    });

    const resLoginOk = await resLogin.json();
    if (resLogin.ok) {
      setCookie('jwt', resLoginOk.jwt);
      Cookie.set("token", resLoginOk.jwt)
      router.push('/');
      appContext.setUserLoged(resLoginOk)
    } else {
      if (resLoginOk.message[0].messages[0].id === 'Auth.form.error.invalid') {
        message.error('Email y/o contraseña invalidos');
      }
    }
  };

  if (appContext.isAuthenticated) {
    router.push("/"); // redirect if you're already logged in
  }

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
                  Log in
                </Button>
                Or <a href='/register'>register now!</a>
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
