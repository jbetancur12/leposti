import { Form, Input, Button, message, Layout, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@styles/Login.module.css';

import MyHeader from '@components/MyHeader';
import MyFooter from '@components/MyFooter';
import { Content } from 'antd/lib/layout/layout';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RestorePassword = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    const body = {
      code: router.query.code,
      password: values.password,
      passwordConfirmation: values.confirm,
    };
    const resPost = await fetch(`${process.env.API_URL}/auth/reset-password`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });

    if (resPost.ok) {
      message.success('Cambio de contraseña exitoso');
      router.push('/');
    } else {
      message.error('Fallo el cambio de contraseña');
    }
  };

  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);

  return (
    <>
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
              <h1 className={styles.title}>Cambiar contraseña</h1>
              <Form
                {...layout}
                name='basic'
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name='password'
                  label='Contraseña'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu contraseña!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder='Contraseña'
                    className={focused ? 'focused' : ''}
                    onFocus={() => {
                      setFocused(true);
                    }}
                    onBlur={() => {
                      setFocused(false);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='confirm'
                  label='Confirmar contraseña'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Porfavor confirma tu contraseña!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error('Las contraseñas no coinciden!'),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder='Ingrese la contraseña nuevamente'
                    className={focused2 ? 'focused' : ''}
                    onFocus={() => {
                      setFocused2(true);
                    }}
                    onBlur={() => {
                      setFocused2(false);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  {...tailLayout}
                  wrapperCol={{ span: 12, offset: 6 }}
                  className={styles.btnContainer}
                >
                  <Button
                    type='primary'
                    htmlType='submit'
                    className={styles.btn}
                  >
                    Aceptar
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
        <MyFooter />
      </Layout>
    </>
  );
};

export default RestorePassword;
