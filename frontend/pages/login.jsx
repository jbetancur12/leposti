import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Layout, Row, message, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from '@styles/Login.module.css';
import MyHeader from '@components/MyHeader';
import MyFooter from '@components/MyFooter';
import { Content } from 'antd/lib/layout/layout';
import { useAuth } from '@context/auth';
import { NextSeo } from 'next-seo';

const NormalLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);
  const router = useRouter();
  // const appContext = useContext(AppContext);
  const auth = useAuth();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push('/'); // redirect if you're already logged in
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    auth
      .login(values.email, values.password)
      .then(() => {
        message.success('Ingreso Exitoso!');
        setLoading(false);
        router.push(router.query.next || '/');
        // set authed User in global context to update header/app state
        //appContext.setUserLoged(res.data.user);
      })
      .catch((error) => {
        message.error('Email y/o contraseña invalidos');
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <Layout className={styles.layout}>
      <NextSeo
        nofollow={true}
        noindex={true}
        title='Login | Leposti.com'
      />
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
                className={styles.item}
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
                className={styles.item}
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
                {/* <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Recuerd</Checkbox>
                </Form.Item> */}

                <a className='login-form-forgot' href='/forgotpassword'>
                  Olvido Contraseña
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  {loading ? <Spin indicator={antIcon} /> : 'Login'}
                </Button>{' '}
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
