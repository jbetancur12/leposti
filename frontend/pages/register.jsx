import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from '../helpers/';
import { useCookies } from 'react-cookie';
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  message,
} from 'antd';

import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';

import styles from '../styles/Login.module.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [cities, setCities] = useState(null);
  const [validateUser, setValidateUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['email']);

  const getCities = async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
    );
    const resCities = await res.json();

    const returne = resCities.map((citie) => {
      const ccc = citie.ciudades.map((cc) => {
        return {
          label: cc,
          value: cc,
        };
      });
      const temp = {
        id: citie.id,
        value: citie.departamento,
        label: citie.departamento,
        children: ccc,
      };
      return temp;
    });

    setCities(returne);
  };

  React.useEffect(() => {
    getCities();

    if (data.email) {
      form.setFieldsValue({
        email: data.email,
      });
      removeCookie('email');
    }
  }, []);

  const onBlurHandler = async (values) => {
    if (values.target.value.length > 0) {
      const resPost = await fetch(
        'https://api.leposti.ml/users?username=' + values.target.value,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
            'Content-Type': 'application/json',
          },
          // body data type must match "Content-Type" header
        },
      );

      const resAskUser = await resPost.json();

      if (resAskUser.length > 0) {
        form.setFields([
          {
            name: 'username',
            errors: ['Usuario ya existe'],
          },
        ]);
      }
    } else {
      form.setFields([
        {
          name: 'username',
          errors: ['Ingresa un usuario'],
        },
      ]);
    }
  };

  const onBlurEmail = async (values) => {
    if (values.target.value.length > 0) {
      const resPost = await fetch(
        'https://api.leposti.ml/users?email=' + values.target.value,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
            'Content-Type': 'application/json',
          },
          // body data type must match "Content-Type" header
        },
      );

      const resAskUser = await resPost.json();
      console.log(resAskUser);

      if (resAskUser.length > 0) {
        form.setFields([
          {
            name: 'email',
            errors: ['Email ya existe'],
          },
        ]);
      }
    } else {
      form.setFields([
        {
          name: 'email',
          errors: ['Ingresa un email'],
        },
      ]);
    }
  };

  const emailValidator = async (rule, value) => {
    const resPost = await fetch('https://api.leposti.ml/users?email=' + value, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
      // body data type must match "Content-Type" header
    });

    const resAskUser = await resPost.json();

    if (resAskUser.length > 0) {
      return Promise.reject(new Error('repetido'));
    }
    return Promise.resolve();
  };

  const docIdValidator = async (rule, value) => {
    const resPost = await fetch('https://api.leposti.ml/users?docId=' + value, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
      // body data type must match "Content-Type" header
    });

    const resAskUser = await resPost.json();

    if (resAskUser.length > 0) {
      return Promise.reject(new Error('Cedula ya existe'));
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const newValues = {
      ...values,
      city: values.city[1],
      departamento: values.city[0],
    };
    console.log(newValues);
    const resPost = await fetch('https://api.leposti.ml/auth/local/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValues), // body data type must match "Content-Type" header
    });

    if (!resPost.ok) {
      const message = `An error has occured: ${resPost.status}`;
      throw new Error(message);
    } else {
      router.push('/');
      message.success('Registrado!');
    }
  };
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value='57'>+57</Option>
        <Option value='1'>+1</Option>
      </Select>
    </Form.Item>
  );

  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);

  return (
    <>
      <MyHeader />
      <Row justify='space-around' style={{ width: '100%', background: '#eee' }}>
        <Col span={24} sm={12} lg={10} xl={8} className={styles.formContainer}>
          <h1 className={styles.title}>Registrate</h1>
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            validateTrigger='onBlur'
            initialValues={{
              prefix: '57',
            }}
            scrollToFirstError
          >
            <Row>
              <Col span={24} md={12}>
                <Form.Item
                  name='firstname'
                  label='Nombre'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu nombre!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder='Nombre' />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='lastname'
                  label='Apellido'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu apellido!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder='Apellido' />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='docId'
                  label='Numero de cedula'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu cedula!',
                    },
                    {
                      validator: docIdValidator,
                    },
                  ]}
                >
                  <Input placeholder='Cedula' />
                  {/* <Input /> */}
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='username'
                  label='Nickname'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  onBlur={onBlurHandler}
                  rules={[
                    {
                      required: true,
                      // message: 'Porfavor ingresa un usuario',
                      // whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder='Nickname' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='email'
                  label='E-mail'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  hasFeedback
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                    {
                      validator: emailValidator,
                    },
                  ]}
                >
                  <Input placeholder='E-mail' />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='password'
                  label='Password'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder='Password'
                    className={focused ? 'focused' : ''}
                    onFocus={() => {
                      setFocused(true);
                    }}
                    onBlur={() => {
                      setFocused(false);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='confirm'
                  label='Confirm Password'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!',
                          ),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder='Password'
                    className={focused2 ? 'focused' : ''}
                    onFocus={() => {
                      setFocused2(true);
                    }}
                    onBlur={() => {
                      setFocused2(false);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='phone'
                  label='Phone Number'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name='city'
                  label='Ciudad'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  autoComplete='off'
                  rules={[
                    {
                      type: 'array',
                      required: true,
                      message: 'Please select your habitual residence!',
                    },
                  ]}
                >
                  <Cascader options={cities} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='direccion'
                  label='Direccion'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className={styles.item}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Direccion!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='agreement'
                  className={styles.item}
                  valuePropName='checked'
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Should accept agreement'),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read the <a href=''>agreement</a>
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...tailFormItemLayout}
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
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <MyFooter />
    </>
  );
};

export default RegistrationForm;

RegistrationForm.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: '/' });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
