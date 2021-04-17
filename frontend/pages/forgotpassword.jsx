import { Form, Input, Button, Radio, InputNumber, Layout, Row, Col } from 'antd';
import React, { useState } from 'react';

import styles from "../styles/Login.module.css";

import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import { Content } from "antd/lib/layout/layout";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ForgotPassword = () => {
  const [value, setValue] = React.useState('email');

  const onFinish = async (values) => {
    let email = { email: '' };
    if (values.way === 'id') {
      console.log(values);
      const resGet = await fetch(
        'https://api.leposti.ml/users?docId=' + values.cedula,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
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
      }
    } else {
      email = { ...email, email: values.username };
    }

    const resPost = await fetch('https://api.leposti.ml/auth/forgot-password', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
      },
      body: JSON.stringify(email), // body data type must match "Content-Type" header
    });

    if (resPost.ok) {
      message.success('Email enviado a: ' + email.email);
    } else {
      message.error('No encontrado');
    }
  };

  const WayToRecover = () => {
    if (value === 'email') {
      return (
        <Form.Item
          label='Username'
          name='username'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder="E-mail" />
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
            message: 'Please input your cedula!',
          },
        ]}
      >
        <InputNumber min={0} placeholder="Cedula" />
      </Form.Item>
    );
  };

  return (
    <>
      <Layout className={styles.layout}>
        <MyHeader/>
        <Content className={styles.content}>
          <Row justify="space-around" style={{  width: '100%' }}>
            <Col span={24} sm={12} lg={10} xl={6} className={ styles.formContainer }>
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
                  <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                    <Radio value={'email'}>Email</Radio>
                    <Radio value={'id'}>Cedula</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item {...tailLayout} wrapperCol={{ span: 12, offset: 6 }} className={ styles.btnContainer }>
                  <Button type='primary' htmlType='submit' className={styles.btn}>
                    Aceptar
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
        <MyFooter/>
      </Layout>
    </>
  );
};

export default ForgotPassword;
