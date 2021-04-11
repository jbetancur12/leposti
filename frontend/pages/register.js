import React, { useState } from 'react';
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

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
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

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const [cities, setCities] = useState(null);

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
  }, []);

  const onFinish = async (values) => {
    const newValues = {
      ...values,
      city: values.city[1],
      departamento: values.city[0],
    };

    const resPost = await fetch('http://localhost:1337/auth/local/register', {
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
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
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
        autocomplete='off'
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
  );
};

export default RegistrationForm;
