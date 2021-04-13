import React, { useState } from 'react';
import { parseCookies } from "../helpers/"
import { useCookies } from "react-cookie"
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
} from 'antd';
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

const RegistrationForm = ({data}) => {

  console.log(data)
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

    if(data.email){
      form.setFieldsValue({
        email: data.email,
      });
      removeCookie("email")
    }
  }, []);

  const onBlurHandler = async (values) => {
    if (values.target.value.length > 0) {
      const resPost = await fetch('https://api.leposti.ml/users?username=' + values.target.value, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
          'Content-Type': 'application/json',
        },
        // body data type must match "Content-Type" header
      });

      const resAskUser = await resPost.json();


      if (resAskUser.length > 0) {
        form.setFields([
          {
            name: 'username',
            errors: ['Usuario ya existe'],
          },
        ]);
      }
    }else{
    form.setFields([
      {
        name: 'username',
        errors: ['Ingresa un usuario'],
      },
    ]);}
  }

  const onBlurEmail = async (values) => {
    if (values.target.value.length > 0) {
      const resPost = await fetch('https://api.leposti.ml/users?email=' + values.target.value, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
          'Content-Type': 'application/json',
        },
        // body data type must match "Content-Type" header
      });

      const resAskUser = await resPost.json();
      console.log(resAskUser)

      if (resAskUser.length > 0) {
        form.setFields([
          {
            name: 'email',
            errors: ['Email ya existe'],
          },
        ]);
      }
    }else{
    form.setFields([
      {
        name: 'email',
        errors: ['Ingresa un email'],
      },
    ]);}
  }

  const onFinish = async (values) => {
    const newValues = {
      ...values,
      city: values.city[1],
      departamento: values.city[0],
    };
    console.log(newValues)
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
      console.log('Rewgistrado', JSON.stringify(newValues));
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

  return (
    <Col span={8} offset={8}>
      <Row type="flex">
        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>

          <h2>Registrate</h2>
        </div>

      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{
          prefix: '57',
        }}
        scrollToFirstError
      >
        <Form.Item
          name='firstname'
          label='Nombre'
          rules={[
            {
              required: true,
              message: 'Ingresa tu nombre!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastname'
          label='Apellido'
          rules={[
            {
              required: true,
              message: 'Ingresa tu apellido!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='docId'
          label='Numero de cedula'
          rules={[
            {
              required: true,
              message: 'Ingresa tu cedula!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='username'
          label='Nickname'
          onBlur={onBlurHandler}
          rules={[
            {
              required: true,
                // message: 'Porfavor ingresa un usuario',
                // whitespace: true,

            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='E-mail'
          onBlur={onBlurEmail}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
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
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
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
        <Form.Item
          name='city'
          label='Ciudad'
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

        <Form.Item
          name='direccion'
          label='Direccion'
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

        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href=''>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
        </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default RegistrationForm;

RegistrationForm.getInitialProps = async ({ req ,res }) => {
  const data = parseCookies(req)

if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }

  return {
    data: data && data,
  }
}
