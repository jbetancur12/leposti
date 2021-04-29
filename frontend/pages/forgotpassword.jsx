import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  Layout,
  Row,
  Col,
  message,
} from 'antd';
import React from 'react';

import styles from '@styles/Login.module.css';

import MyHeader from '@components/MyHeader';
import MyFooter from '@components/MyFooter';
import { Content } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ForgotPassword = () => {
  const [value, setValue] = React.useState('email');
  const router = useRouter();

  const onFinish = async (values) => {
    let email = { email: '' };
    if (values.way === 'id') {
      const resGet = await fetch(
        `${process.env.API_URL}/users?docId=${values.cedula}`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json',
          },
          // body data type must match "Content-Type" header
        },
      );

      const resAskUser = await resGet.json();
      if (resAskUser.length > 0) {
        email = { ...email, email: resAskUser[0].email };
      } else {
        message.error('No hay un usuario con esta cedula');
        return;
      }
    } else {
      email = { ...email, email: values.email };
    }

    const resPost = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify(email), // body data type must match "Content-Type" header
    });

    if (resPost.ok) {
      message.success(`Email enviado a: ${email.email}`);
      router.push('/');
    } else {
      message.error('No se encontro el email');
    }
  };

  const WayToRecover = () => {
    if (value === 'email') {
      return (
        <Form.Item
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su email!',
            },
          ]}
        >
          <Input placeholder='E-mail' />
        </Form.Item>
      );
    }
    return (
      <Form.Item
        label='Cedula'
        name='cedula'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className={styles.item}
        rules={[
          {
            required: true,
            message: 'Por favor ingrese su cedula!',
          },
        ]}
      >
        <InputNumber min={0} placeholder='Cedula' />
      </Form.Item>
    );
  };

  return (
    <>
      <Layout className={styles.layout}>
        <NextSeo
          nofollow={true}
          noindex={true}
          title='Olvido Contraseña | Leposti.com'
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
              <h1 className={styles.title}>Recuperar contraseña</h1>
              <Form
                {...layout}
                name='basic'
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <WayToRecover />

                <Form.Item name='way'>
                  <Radio.Group
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  >
                    <Radio value={'email'}>Email</Radio>
                    <Radio value={'id'}>Cedula</Radio>
                  </Radio.Group>
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

export default ForgotPassword;
