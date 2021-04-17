import { Form, Input, Button, Radio, InputNumber } from 'antd';
import React, { useState } from 'react';

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
        console.log('No Usuario con esa cedula');
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
      console.log('email enviado a: ' + email.email);
    } else {
      console.log('No se encontro');
    }
  };

  const WayToRecover = () => {
    if (value === 'email') {
      return (
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }
    return (
      <Form.Item
        label='Cedula'
        name='cedula'
        rules={[
          {
            required: true,
            message: 'Please input your cedula!',
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>
    );
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <WayToRecover />

      <Form.Item {...tailLayout} name='way'>
        <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
          <Radio value={'email'}>Email</Radio>
          <Radio value={'id'}>Cedula</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
