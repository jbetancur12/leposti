import {
  Layout,
  Menu,
  Breadcrumb,
  Carousel,
  Row,
  Col,
  Select,
  Form,
  DatePicker,
  Space,
  Checkbox,
  Button,
  Input,
  Modal,
} from 'antd';
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import colombianHolidays from 'colombian-holidays';
import 'moment/locale/es-mx';
import locale from 'antd/lib/locale/es_ES';
import md5 from 'md5';
import styles from '../styles/New.module.css';

import Section from '../components/Section';
import Product from '../components/Product';

import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const { Header, Content, Footer } = Layout;

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

const FormItem = Form.Item;

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Responsive = dynamic(import('../components/Responsive'), { ssr: false });
const getColombianHolidays = colombianHolidays().map((colombianHoliday) => {
  let splited = [...colombianHoliday.celebrationDate.split('-')];
  let formated = `${splited[2]}/${splited[1]}/${splited[0]}`;
  return formated;
});

const config = {
  theme: 'snow',
  modules: {
    toolbar: false,
    clipboard: {},
  },
};

const Home = ({ products }) => {
  const myRef = React.useRef();
  const [product, setProduct] = React.useState('');
  const [provider, setProvider] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openProviders, setOpenProviders] = React.useState(false);
  const [productProvider, setProductProvider] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [valueDate, setValueDate] = React.useState('');
  const [readOnly, setReadOnly] = React.useState(true);
  const [valueEditor, setValueEditor] = React.useState('');
  const [valueEditorText, setValueEditorText] = React.useState('');
  const [terms, setTerms] = React.useState(false);
  const [dayWeek, setDayWeek] = React.useState('lunes');
  const [email, setEmail] = React.useState('');
  const [openQuote, setOpenQuote] = React.useState(false);
  const [orderReady, setOrder] = React.useState({});
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  //Functions
  async function onChangeProduct(value) {
    console.log('Token-webhoodk-8.12', process.env.NEXT_PUBLIC_JWT_TOKEN);
    const response = await fetch(`https://api.leposti.ml/products/${value}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
    });
    const responseProduct = await response.json();
    const _product = { product: value };
    setProduct(value);
    setProvider('');
    setProductProvider({ ..._product });

    setValueEditor(responseProduct.formato);
    setProviders(responseProduct);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChangeProvider(value) {
    setProvider(value);
    const test = { ...productProvider, provider: value };
    setProductProvider(test);
  }

  function onChangeDate(date, dateString) {
    setReadOnly(false);
    const isHoliday = getColombianHolidays.includes(dateString);
    const dayOfWeek = {
      0: 'domingo',
      1: 'lunes',
      2: 'martes',
      3: 'miercoles',
      4: 'jueves',
      5: 'viernes',
      6: 'sabado',
    };
    setDayWeek(dayOfWeek[moment(date).day()]);
    setProductProvider({ ...productProvider, fecha: dateString });
    setValueDate(date);
  }

  function disabledDate(current) {
    //let date = '2021-05-14 12:02';
    let date = new Date();

    const hoursDiff = moment(date)
      .startOf('day')
      .add(1, 'day')
      .diff(moment(date), 'minutes');

    if (
      moment(date).day() === 6 ||
      moment(date).day() === 0 ||
      getColombianHolidays.includes(moment(date).format(dateFormat))
    ) {
      if (moment(date).day() === 6) {
        return current && current < moment(date).startOf('day').add(3, 'day');
      } else if (moment(date).day() === 0) {
        return current && current < moment(date).startOf('day').add(2, 'day');
      } else {
        return current && current < moment(date).startOf('day').add(2, 'day');
      }
    } else if (hoursDiff < 720 && moment(date).day() === 5) {
      return current && current < moment(date).startOf('day').add(4, 'day');
    } else if (hoursDiff < 720) {
      const add2 = moment(date).startOf('day').add(2, 'day');
      if (add2.day() === 0) {
        const add3 = moment(date).startOf('day').add(3, 'day');
        const isHoliday = getColombianHolidays.includes(
          moment(add3).format(dateFormat),
        );
        if (isHoliday) {
          return current && current < moment(date).startOf('day').add(5, 'day');
        }
        return current && current < moment(date).startOf('day').add(3, 'day');
      }
      return current && current < moment(date).startOf('day').add(2, 'day');
    } else {
      return current && current < moment(date).startOf('day').add(1, 'day');
    }
  }

  function onChangeEditor(content, delta, source, editor) {
    //setProductProvider({...productProvider,contenido: editor.getHTML()});
    console.log(myRef);
    setValueEditor(editor.getHTML());
    setValueEditorText(editor.getText());
  }

  const onFinish = async (values) => {
    const res = await fetch(`https://api.leposti.ml/prices`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
    });
    const prices = await res.json();
    const price = prices.filter(
      (price) =>
        price.product.id === productProvider.product &&
        price.provider.id === productProvider.provider &&
        price.dias.includes(dayWeek),
    );

    let finalPrice = '';

    if (!providers.formato) {
      const l = valueEditorText.length;
      finalPrice = price.filter(
        (pric) => l - 1 <= pric.range.maximo && l - 1 >= pric.range.minimo,
      );
    } else {
      finalPrice = [...price];
    }
    const totalIVA =
      finalPrice[0].iva > 0
        ? (finalPrice[0].precio * finalPrice[0].iva) / 100 +
          finalPrice[0].precio
        : finalPrice[0].precio;
    const reformatDate = productProvider.fecha.split('/');
    const newDateFormated = `${reformatDate[2]}-${reformatDate[1]}-${reformatDate[0]}`;

    const askUser = await fetch(`https://api.leposti.ml/users?email=${email}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
    });

    const referenceCode = `${providers.nombre}-${Date.now()}`;

    const order = {
      total: totalIVA,
      estado: 'unpaid',
      // checkout_session: '122jjd',
      contenido: valueEditor,
      user: {
        id: 0,
      },
      provider: {
        id: productProvider.provider,
      },
      product: {
        id: productProvider.product,
      },
      terminos: productProvider.terminos,
      ejemplar: productProvider.ejemplar,
      fechaPublicacion: newDateFormated,
      sePublico: false,
      referencia: referenceCode,
      iva: finalPrice[0].iva,
    };

    let orderUpdated = {};
    if (askUser.ok) {
      const resAskUser = await askUser.json();
      let userBuyer = '';
      if (resAskUser.length > 0) {
        userBuyer = resAskUser[0].id;
      } else {
        userBuyer = 0;
      }
      setOrder({ ...order, user: { id: userBuyer } });
      setOpenQuote(true);
      orderUpdated = { ...order, user: { id: userBuyer } };
    }

    const resPost = await fetch(`https://api.leposti.ml/orders`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderUpdated), // body data type must match "Content-Type" header
    });
    if (!resPost.ok) {
      const message = `An error has occured: ${resPost.status}`;
      throw new Error(message);
    } else {
      form.resetFields();
      setValueEditor('');
      setValueDate('');
      setProvider('');
      setProduct('');
      console.log('Posteado', order);
    }

    // openWindowWithPostRequest(order, finalPrice[0].iva, referenceCode);
  };

  React.useEffect(() => {}, []);

  const optionsProducts = products.map((product) => {
    return (
      <Option value={product.id} key={product.id}>
        {product.nombre}
      </Option>
    );
  });

  const optionsProviders =
    providers.providers &&
    providers.providers.map((provider) => {
      return (
        <Option value={provider.id} key={provider.id}>
          {provider.nombre}
        </Option>
      );
    });

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.img}>
          <Image
            src='/logoprincipalBlanco.png'
            alt='Logo de Leposti'
            width={140}
            height={33}
          />
        </div>
        <Menu className={styles.menu} mode='horizontal'>
          <Menu.Item key='1' className={styles.item}>
            Quiénes somos
          </Menu.Item>
          <Menu.Item key='2' className={styles.item}>
            Productos
          </Menu.Item>
          <Menu.Item key='3' className={styles.item}>
            Publicaciones
          </Menu.Item>
          <Menu.Item key='4' className={styles.item}>
            Contáctenos
          </Menu.Item>
          <Menu.Item key='5' className={styles.item}>
            Preguntas frecuentes
          </Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.main}>
        <Carousel autoplay>
          <div className={styles.imgBanner1}></div>
          <div className={styles.imgBanner2}></div>
          <div className={styles.imgBanner3}></div>
        </Carousel>
        <div className={styles.formContainer}>
          <Form
            layout='vertical'
            className={styles.form}
            onFinish={onFinish}
            form={form}
          >
            <FormItem
              label='Producto:'
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              rules={[
                {
                  required: true,
                  message: 'Seleccione un producto!',
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 300, border: null }}
                placeholder='Seleccione un producto'
                value={product}
                optionFilterProp='children'
                onChange={onChangeProduct}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsProducts}
              </Select>
            </FormItem>

            <FormItem
              label='Medio:'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              rules={[
                {
                  required: true,
                  message: 'Seleccione un Medio',
                },
              ]}
            >
              <Select
                disabled={!productProvider.product}
                showSearch
                style={{ width: 300 }}
                placeholder='Seleccione un medio'
                optionFilterProp='children'
                value={provider}
                onChange={onChangeProvider}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsProviders}
              </Select>
            </FormItem>

            <FormItem
              label='Fecha:'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  type: 'date',
                  message: 'Date',
                },
              ]}
            >
              <Space direction='vertical' style={{ width: '100%' }}>
                <DatePicker
                  style={{ width: '100%' }}
                  locale={locale}
                  disabledDate={disabledDate}
                  disabled={!productProvider.provider}
                  //defaultValue={defaultDate}
                  value={valueDate}
                  format={dateFormat}
                  onChange={onChangeDate}
                />
              </Space>
            </FormItem>
            <FormItem
              label='Contenido:'
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Responsive displayIn={['Laptop', 'Tablet']}>
                <Button
                  onClick={showModal}
                  disabled={readOnly}
                  style={{ width: '100%' }}
                >
                  Agregar Contenido
                </Button>
              </Responsive>
              <Responsive displayIn={['Mobile']}>
                <>
                  <QuillNoSSRWrapper
                    ref={myRef}
                    onChange={onChangeEditor}
                    theme='snow'
                    modules={config.modules}
                    value={valueEditor}
                    readOnly={readOnly}
                    placeholder='Contenido'
                  />
                </>
              </Responsive>
              <Modal
                title='Contenido'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <QuillNoSSRWrapper
                  ref={myRef}
                  onChange={onChangeEditor}
                  theme='snow'
                  modules={config.modules}
                  value={valueEditor}
                  readOnly={readOnly}
                  placeholder='Contenido'
                />
              </Modal>
            </FormItem>
            <FormItem
              label='Email:'
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 24 }}
              name='email'
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Ingrese un Email valido!',
                },
              ]}
            >
              <Input
                disabled={!valueEditorText.length > 0}
                placeholder='Email'
              ></Input>
            </FormItem>
            <FormItem
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              name='agreement'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Debe aceptar los terminos y condiciones'),
                        ),
                },
              ]}
            >
              <Checkbox>Acepto Terminos y condiciones</Checkbox>
            </FormItem>
            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
              >
                Cotizar
              </Button>
            </FormItem>
          </Form>
        </div>
        <div>
          <Section title='Nuestros' titleW='productos'>
            <Row className={styles.container}>
              <Col span={6}>
                <Product
                  img='./Edicto-peq.png'
                  title='Edicto'
                  text='Aviso mediante el cual se cita a un ciudadano para dar cuenta de un proceso legal y/o administrativo que lo involucra, o para informarle del estado de un proceso del que forma parte.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./edicto-radio-peq.png'
                  title='Edicto + radio'
                  text='Aviso en prensa y radio mediante el cual se cita a un ciudadano para dar cuenta de una acción legal y/o administrativa que lo involucra, o para informarle del estado de un proceso legal del que forma parte.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./emplazatorio-peq.png'
                  title='Emplazatorio'
                  text='Publicación que se realiza en periódicos de alta circulación, para notificar una acción legal a los involucrados, así como para informar el estado de un proceso legal.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./aviso-de-ley.png'
                  title='Avisos de ley'
                  text='Publicación que realizan las entidades en medios impresos de alta circulación para informar sobre diversos procesos que involucren a terceros, así como para notificar un requerimiento de notabilidad jurídica.'
                />
              </Col>
            </Row>
          </Section>
          <Section title='Nuestros' titleW='productos'>
            <Row className={styles.container}>
              <Col span={6}>
                <Product
                  img='./Edicto-peq.png'
                  title='Edicto'
                  text='Aviso mediante el cual se cita a un ciudadano para dar cuenta de un proceso legal y/o administrativo que lo involucra, o para informarle del estado de un proceso del que forma parte.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./edicto-radio-peq.png'
                  title='Edicto + radio'
                  text='Aviso en prensa y radio mediante el cual se cita a un ciudadano para dar cuenta de una acción legal y/o administrativa que lo involucra, o para informarle del estado de un proceso legal del que forma parte.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./emplazatorio-peq.png'
                  title='Emplazatorio'
                  text='Publicación que se realiza en periódicos de alta circulación, para notificar una acción legal a los involucrados, así como para informar el estado de un proceso legal.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./aviso-de-ley.png'
                  title='Avisos de ley'
                  text='Publicación que realizan las entidades en medios impresos de alta circulación para informar sobre diversos procesos que involucren a terceros, así como para notificar un requerimiento de notabilidad jurídica.'
                />
              </Col>
            </Row>
          </Section>
          <Section title='Nuestros' titleW='productos'>
            <Row className={styles.container}>
              <Col span={6}>
                <Product
                  img='./Edicto-peq.png'
                  title='Edicto'
                  text='Aviso mediante el cual se cita a un ciudadano para dar cuenta de un proceso legal y/o administrativo que lo involucra, o para informarle del estado de un proceso del que forma parte.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./edicto-radio-peq.png'
                  title='Edicto + radio'
                  text='Aviso en prensa y radio mediante el cual se cita a un ciudadano para dar cuenta de una acción legal y/o administrativa que lo involucra, o para informarle del estado de un proceso legal del que forma parte.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./emplazatorio-peq.png'
                  title='Emplazatorio'
                  text='Publicación que se realiza en periódicos de alta circulación, para notificar una acción legal a los involucrados, así como para informar el estado de un proceso legal.'
                />
              </Col>
              <Col span={6}>
                <Product
                  img='./aviso-de-ley.png'
                  title='Avisos de ley'
                  text='Publicación que realizan las entidades en medios impresos de alta circulación para informar sobre diversos procesos que involucren a terceros, así como para notificar un requerimiento de notabilidad jurídica.'
                />
              </Col>
            </Row>
          </Section>
        </div>
      </Content>
      <Footer className={styles.footerContainer}>
        <Row className={styles.footer}>
          <Col span={6} className={styles.footerCol}>
            <div className={styles.w100}>
              <Image
                src='/logoprincipalBlanco.png'
                alt='logo leposti'
                width={140}
                height={33}
              />
            </div>
            <div className={styles.redes}>
              <FaTwitter />
              <FaInstagram />
              <FaFacebook />
              <FaLinkedin />
            </div>
          </Col>
          <Col span={6} className={styles.footerCol}>
            <h3>Documentos legales</h3>
            <a href='#'>Términos y condiciones</a>
            <a href='#'>Politica tratamiento de datos</a>
            <a href='#'>Politica de cookies</a>
            <a href='#'>Método de cobro</a>
          </Col>
          <Col span={6} className={styles.footerCol}>
            <h3>Contacto</h3>
            <a href='#'>email: servicioalcliente@leposti.com</a>
            <span>Tel: +57 310 6503663</span>
          </Col>
          <Col span={6} className={styles.footerImg}>
            <Image
              src='/logoSuperintendenciaIC.png'
              alt='logo industria y comercio'
              width={200}
              height={45}
            />
            <Image
              src='/LogoPayu.png'
              alt='logo payu'
              width={250}
              height={140}
            />
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default Home;

Home.getInitialProps = async () => {
  const res = await fetch(`https://api.leposti.ml/products`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
      'Content-Type': 'application/json',
    },
  });
  const products = await res.json();
  return { products };
};

/*.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}*/

/*import React from "react";
import moment from "moment";
import dynamic from "next/dynamic";

import colombianHolidays from "colombian-holidays";
import "moment/locale/es-mx";
import locale from "antd/lib/locale/es_ES";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import {
  Row,
  Col,
  Select,
  Form,
  DatePicker,
  Space,
  Checkbox,
  Button,
  Input,
} from "antd";



const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const getColombianHolidays = colombianHolidays().map((colombianHoliday) => {
  let splited = [...colombianHoliday.celebrationDate.split("-")];
  let formated = `${splited[2]}/${splited[1]}/${splited[0]}`;
  return formated;
});

export default function Index({ products }) {
  const myRef = React.useRef(null);
  const [product, setProduct] = React.useState("");
  const [provider, setProvider] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openProviders, setOpenProviders] = React.useState(false);
  const [productProvider, setProductProvider] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [readOnly, setReadOnly] = React.useState(true);
  const [valueEditor, setValueEditor] = React.useState("");
  const [valueEditorText, setValueEditorText] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [dayWeek, setDayWeek] = React.useState("lunes")
  const [email, setEmail] = React.useState("")

  const config = {
    theme: "snow",
    modules: {
      toolbar: false,
      clipboard: {},
    },
  };
  async function onChange(value) {
    console.log("Token",process.env.NEXT_PUBLIC_JWT_TOKEN)
    const res = await fetch(`https://api.leposti.ml/products/${value}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        "Content-Type": 'application/json'
      }
    });
    const resProduct = await res.json();
    const _product = { product: value };
    setProduct(value);
    setProvider("");
    setProductProvider({ ..._product });
    setValueEditor(resProduct.formato)
    setProviders(resProduct);
  }

  function onChangeProvider(value) {
    setProvider(value);
    const test = { ...productProvider, provider: value };
    setProductProvider(test);
  }

  function onChangeEditor(content, delta, source, editor) {
    //setProductProvider({...productProvider,contenido: editor.getHTML()});
    setValueEditor(editor.getHTML())
    setValueEditorText(editor.getText());
  }

  function onChangeDate(date, dateString) {
    setReadOnly(false);
    const isHoliday = getColombianHolidays.includes(dateString);
    const dayOfWeek = {
      0:"domingo",
      1:"lunes",
      2:"martes",
      3:"miercoles",
      4:"jueves",
      5:"viernes",
      6:"sabado"
    }
    setDayWeek(dayOfWeek[moment(date).day()])
    setProductProvider({ ...productProvider, fecha: dateString });
  }

  function onChangeTerms(e) {
    // setTerms(e.target.checked);
    setProductProvider({ ...productProvider, terminos: e.target.checked });
  }

  function onChangeEjemplar(e) {
    setProductProvider({ ...productProvider, ejemplar: e.target.checked });
  }

  function defaultDate() {
    const dayToPub = moment().endOf("day").add(2, "day")._d;
    const dayToPubFormated = moment(dayToPub).format(dateFormat);
    const isHoliday = getColombianHolidays.includes(dayToPubFormated);
    const isSunday = moment(dayToPub).day() === 0;
    if (isHoliday || isSunday) {
      return moment().endOf("day").add(3, "day");
    }
    return moment().endOf("day").add(2, "day");
  }

  function disabledDate(current) {
    const dayToPub = moment().endOf("day").add(2, "day")._d;
    const dayToPubFormated = moment(dayToPub).format(dateFormat);
    const isHoliday = getColombianHolidays.includes(dayToPubFormated);
    const isSunday = moment(dayToPub).day() === 0;

    if (isHoliday || isSunday) {
      return current && current < moment().endOf("day").add(3, "day");
    }

    return current && current < moment().endOf("day").add(2, "day");
  }

  const onChangeEmail = event =>{
    setEmail(event.target.value)
  }

  const onFinish = async (values) => {

    const res = await fetch(`https://api.leposti.ml/prices`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        "Content-Type": 'application/json'
      }
    });
    const prices = await res.json();
    const price = prices.filter(
      (price) =>  
        price.product.id === productProvider.product &&
        price.provider.id === productProvider.provider && price.dias.includes(dayWeek), 
    );
    
    let finalPrice = "" 
    
    if(!providers.formato){
      const l = valueEditorText.length
      finalPrice = price.filter(
        (pric) =>
        l-1 <= pric.range.maximo &&
        l-1 >= pric.range.minimo,
        );
      }else{
        finalPrice = [...price]
      }
      const totalIVA =
      finalPrice[0].iva > 0
      ? (finalPrice[0].precio * finalPrice[0].iva) / 100 +
      finalPrice[0].precio
    : finalPrice[0].precio;
     const reformatDate = productProvider.fecha.split("/")
     const newDateFormated = `${reformatDate[2]}-${reformatDate[1]}-${reformatDate[0]}`

     const askUser = await fetch(`https://api.leposti.ml/users?email=${email}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
    });
    const resAskUser= await askUser.json();
    let userBuyer = ""
    if(resAskUser.length>0){
      userBuyer = resAskUser[0].id
    }
    else{
      userBuyer = 0
    }
    
      const order = {
        total: totalIVA,
        estado: 'unpaid',
        // checkout_session: '122jjd',
        contenido: valueEditor,
        user: {
          id: userBuyer,
        },
        provider: {
          id: productProvider.provider,
        },
        product: {
          id: productProvider.product,
        },
        terminos: productProvider.terminos,
        ejemplar: productProvider.ejemplar,
        fechaPublicacion: newDateFormated,
        sePublico: false
      };
        const resPost = await fetch(`https://api.leposti.ml/orders`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order), // body data type must match "Content-Type" header
    });
    if (!resPost.ok) {
      const message = `An error has occured: ${resPost.status}`;
      throw new Error(message);
    } else {
      console.log('Posteado');
    }

    console.log(order)
    console.log("Received values of form: ", values);
  };

  const optionsProducts = products.map((product) => {
    return (
      <Option value={product.id} key={product.id}>
        {product.nombre}
      </Option>
    );
  });
  const optionsProviders =
    providers.providers &&
    providers.providers.map((provider) => {
      return (
        <Option value={provider.id} key={provider.id}>
          {provider.nombre}
        </Option>
      );
    });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.callbellSettings = {
    token: "YyHsMyjm9oSczzf9t5T3uvXQ"};`,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: ` (function(){var w=window;var ic=w.callbell;if(typeof ic==="function"){ic('reattach_activator');ic('update',callbellSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Callbell=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://dash.callbell.eu/include/'+window.callbellSettings.token+'.js';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
          }}
        ></script>
      </Head>

      <Row justify="space-around" style={{ marginTop: "50px" }}>
        <Col span={16}>
          {" HOLAAAA2.1"}
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <p className={styles.description}>
              Get started by editing{" "}
              <code className={styles.code}>pages/index.js</code>
            </p>

            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h3>Documentation &rarr;</h3>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h3>Learn &rarr;</h3>
                <p>
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className={styles.card}
              >
                <h3>Examples &rarr;</h3>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h3>Deploy &rarr;</h3>
                <p>
                  Instantly deploy your Next.js site to a public URL with
                  Vercel.
                </p>
              </a>
            </div>
          </main>
        </Col>
        <Col span={8}>
          <Form layout="vertical" onFinish={onFinish}>
            <FormItem
              label="Producto:"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Seleccione un producto"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsProducts}
              </Select>
            </FormItem>

            <FormItem
              label="Medio:"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Select
                disabled={!productProvider.product}
                showSearch
                style={{ width: 200 }}
                placeholder="Seleccione un medio"
                optionFilterProp="children"
                value={provider}
                onChange={onChangeProvider}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsProviders}
              </Select>
            </FormItem>

            <FormItem
              label="Fecha:"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              rules={[
                {
                  required: true,
                  type: "date",
                  message: "Date",
                },
              ]}
            >
              <Space direction="vertical">
                <DatePicker
                  locale={locale}
                  disabledDate={disabledDate}
                  disabled={!productProvider.provider}
                  defaultValue={defaultDate}
                  format={dateFormat}
                  onChange={onChangeDate}
                />
              </Space>
            </FormItem>
            <FormItem
              label="Contenido:"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <QuillNoSSRWrapper
                ref={myRef}
                onChange={onChangeEditor}
                theme="snow"
                modules={config.modules}
                value={valueEditor}
                readOnly={readOnly}
                placeholder="Contenido"
              />
            </FormItem>
            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
              <Checkbox onChange={onChangeEjemplar}>
                Ejemplar en Fisico
              </Checkbox>
            </FormItem>
            <FormItem
              label="Email:"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              name="email"
              onChange={onChangeEmail}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input placeholder="Email"></Input>
            </FormItem>
            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
              <Checkbox onChange={onChangeTerms}>
                Acepto Terminos y condiciones
              </Checkbox>
            </FormItem>
            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" disabled={!productProvider.terminos}>
                Cotizar
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>

      <div id="comm100-button-99d23bfd-f03f-4710-a185-0a95e15fdcb0"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          var Comm100API=Comm100API||{};(function(t){function e(e){var a=document.createElement("script"),c=document.getElementsByTagName("script")[0];a.type="text/javascript",a.async=!0,a.src=e+t.site_id,c.parentNode.insertBefore(a,c)}t.chat_buttons=t.chat_buttons||[],t.chat_buttons.push({code_plan:"99d23bfd-f03f-4710-a185-0a95e15fdcb0",div_id:"comm100-button-99d23bfd-f03f-4710-a185-0a95e15fdcb0"}),t.site_id=10004261,t.main_code_plan="99d23bfd-f03f-4710-a185-0a95e15fdcb0",e("https://vue.comm100.com/livechat.ashx?siteId="),setTimeout(function(){t.loaded||e("https://standby.comm100vue.com/livechat.ashx?siteId=")},5e3)})(Comm100API||{})`,
        }}
      ></script>
    </>
  );
}


Index.getInitialProps = async (ctx) => {
  
  const res = await fetch(`https://api.leposti.ml/products`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
      "Content-Type": 'application/json'
    }
  });
  const products = await res.json();
  return { products };
};*/
