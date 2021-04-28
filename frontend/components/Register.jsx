import React, { useState } from 'react';
import Cookie from 'js-cookie';
import md5 from 'md5';
import Link from 'next/link';
import { useAuth } from '@context/auth';

import styles from '@styles/Login.module.css';
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message,
  Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState({});
  const auth = useAuth();
  const [cities, setCities] = useState(null);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const getCities = async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
    );
    const resCities = await res.json();

    const returne = resCities.map((citie) => {
      const ccc = citie.ciudades.map((cc) => ({
        label: cc,
        value: cc,
      }));
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
    if (Cookie.get('email')) {
      form.setFieldsValue({
        email: Cookie.get('email'),
      });
      Cookie.remove('email');
    }
    if (props.edit) {
      const user = auth.user;
      form.setFieldsValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        docId: user.docId,
        phone: user.phone,
        direccion: user.direccion,
        password: '123456',
        confirm: '123456',
      });
    }
  }, []);

  const emailValidator = async (rule, value) => {
    const resPost = await fetch(`${process.env.API_URL}/users?email=${value}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
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
    if (auth.user && auth.user.docId === value) {
      return Promise.resolve();
    }
    const resPost = await fetch(`${process.env.API_URL}/users?docId=${value}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
      },
      // body data type must match "Content-Type" header
    });

    const resAskUser = await resPost.json();

    if (resAskUser.length > 0) {
      return Promise.reject(
        new Error('El numero de documento ya esta registrado'),
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    setLoading(true);
    if (props.edit) {
      let newValues = {};
      if (values.password !== '123456') {
        newValues = {
          ...values,
          city: values.city[1],
          departamento: values.city[0],
        };
      } else {
        newValues = {
          ...newValues,
          firstname: values.firstname,
          lastname: values.lastname,
          docId: values.docId,
          phone: values.phone,
          city: values.city[1],
          departamento: values.city[0],
        };
      }
      auth
        .editUser(auth.user.id, newValues)
        .then(() => {
          // set authed user in global context object
          message.success('Datos Actualizados!');
          setLoading(false);
        })
        .catch((error) => {
          message.error(
            'Hubo un error en la actualización , Porfavor intentelo de nuevo',
          );
          setError(error.response.data);
          setLoading(false);
        });
    } else {
      const newValues = {
        ...values,
        city: values.city[1],
        departamento: values.city[0],
        username: md5(Date.now()).slice(-8),
        orders: [Cookie.get('order')],
      };
      auth
        .registerUser(newValues)
        .then(() => {
          // set authed user in global context object
          message.success('Registro Exitoso!');
          Cookie.remove('order');
          setLoading(false);
        })
        .catch((error) => {
          message.error(
            'Hubo un error en el registro, Porfavor intentelo de nuevo',
          );
          setError(error.response.data);
          setLoading(false);
        });
    }
  };
  // function filter(inputValue, path) {
  //   return path.some(
  //     (option) =>
  //       option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  //   );
  // }

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

  const sm = props.edit ? 18 : 12;
  const lg = props.edit ? 18 : 10;
  const xl = props.edit ? 18 : 8;
  const background = props.edit ? '#fff' : '#eee';
  const title = props.edit ? 'Editar Información' : 'Registrate';
  // const cascaderDefault = props.edit ? [auth.user.departamento, auth.user.city] : []

  return (
    <Row
      justify='space-around'
      style={{ width: '100%', background: background }}
    >
      <Col span={24} sm={sm} lg={lg} xl={xl} className={styles.formContainer}>
        <h1 className={styles.title}>{title}</h1>
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

            <Col span={24}>
              {!props.edit ? (
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
                      message: 'El valor ingresado no es un E-mail valido!',
                    },
                    {
                      required: true,
                      message: 'Por favor ingrese su email!',
                    },
                    {
                      validator: emailValidator,
                    },
                  ]}
                >
                  <Input placeholder='E-mail' />
                </Form.Item>
              ) : null}
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                name='password'
                label='Contraseña'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className={styles.item}
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingrese su contraseña!',
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
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                name='confirm'
                label='Confirmar Contraseña'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className={styles.item}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Por favor confirme su contraseña!',
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
                  placeholder='Contraseña'
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
                    message: 'Por favor ingrese su numero de telefono!',
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
                    message: 'Por favor seleccione Ciudad!',
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
                    message: 'Por favor ingrese una dirección!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {!props.edit ? (
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
                              new Error('Debe aceptar terminos y condiciones'),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    He leido los{' '}
                    <Link href='/terminos'>
                      <a>terminos y condiciones</a>
                    </Link>
                  </Checkbox>
                </Form.Item>
              </Col>
            ) : null}
            <Col span={24}>
              <Form.Item
                {...tailFormItemLayout}
                wrapperCol={{ span: 12, offset: 6 }}
                className={styles.btnContainer}
              >
                {props.edit ? (
                  <Button
                    type='primary'
                    htmlType='submit'
                    className={styles.btn}
                  >
                    {loading ? <Spin indicator={antIcon} /> : 'Confirmar'}
                  </Button>
                ) : (
                  <Button
                    type='primary'
                    htmlType='submit'
                    className={styles.btn}
                  >
                    {loading ? <Spin indicator={antIcon} /> : 'Registrarse'}
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default RegistrationForm;
