import styles from '../styles/Contact.module.css';

import Title from './Title';

import { Form, Input, Button, message } from 'antd';

const Contact = () => {
  const [form] = Form.useForm();
  const onFinishHandler = async (values) => {
    const body = { email: values.email, content: values.message };

    const postMessage = await fetch(`${process.env.API_URL}/messages`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });

    if (postMessage.ok) {
      message.success('Mensaje enviado');
      form.resetFields();
    } else {
      message.warn('Mensaje no enviado');
    }
  };
  return (
    <div className={styles.container} id="contact">
      <Title title="" titleW="Contáctenos" />
      <div className={styles.content}>
        <Form form={form} layout="vertical" onFinish={onFinishHandler}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Ingrese un Email valido!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Mensaje"
            name="message"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su mensaje!',
              },
            ]}
          >
            <Input.TextArea placeholder="Mensaje" style={{ minHeight: 75 }} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
