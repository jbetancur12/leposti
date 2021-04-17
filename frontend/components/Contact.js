import styles from "../styles/Contact.module.css"

import Title from "./Title"

import { Form, Input, Button } from "antd"

const Contact = () => {
    const [form] = Form.useForm()

    return (
        <div className={styles.container} id="contact">
            <Title title="" titleW="Contáctenos" />
            <div className={styles.content}>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item label="Email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Mensaje">
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
    )
}

export default Contact;