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
  Drawer,
} from 'antd';
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useCookies } from 'react-cookie';

import Link from 'next/link';
import colombianHolidays from 'colombian-holidays';
import 'moment/locale/es-mx';
import locale from 'antd/lib/locale/es_ES';
import md5 from 'md5';
import styles from '../styles/New.module.css';

import Section from '../components/Section';
import Product from '../components/Product';
import MyMenu from '../components/MyMenu';
import About from '../components/About';
import Contact from '../components/Contact';
import Question from '../components/Question';
import UpBtn from '../components/UpBtn';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import Chats from '../components/Chats';

import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaBars,
  FaAngleUp,
} from 'react-icons/fa';

import { useState } from 'react';

const { Header, Content, Footer } = Layout;

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const FormItem = Form.Item;

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
  const [product, setProduct] = useState('');
  const [provider, setProvider] = useState('');
  const [open, setOpen] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);
  const [productProvider, setProductProvider] = useState([]);
  const [providers, setProviders] = useState([]);
  const [valueDate, setValueDate] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [valueEditor, setValueEditor] = useState('');
  const [valueEditorText, setValueEditorText] = useState('');
  const [terms, setTerms] = useState(false);
  const [dayWeek, setDayWeek] = useState('lunes');
  const [email, setEmail] = useState('');
  const [openQuote, setOpenQuote] = useState(false);
  const [orderReady, setOrder] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quotation, setQuotation] = useState([]);
  const [form] = Form.useForm();
  const [cookie, setCookie] = useCookies(['email']);

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
    const _quotation = { product: responseProduct.nombre };
    setProduct(value);
    setProvider('');
    setProductProvider({ ..._product });
    // console.log('Provider', responseProduct);
    setValueEditor(responseProduct.formato);
    setProviders(responseProduct);
    setQuotation({ ..._quotation });
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
    console.log('Vlauye', value);
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

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

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
    const userExist = await fetch(
      `https://api.leposti.ml/users?email=${email}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (userExist.ok) {
      let userExistJson = await userExist.json();
      let userBuyer = '';
      if (userExistJson.length > 0) {
        userBuyer = userExistJson[0].id;
      } else {
        userBuyer = 0;
      }
      setOrder({ ...order, user: { id: userBuyer } });

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
      setOpenQuote(true);
    }

    // openWindowWithPostRequest(order, finalPrice[0].iva, referenceCode);
  };

  function openWindowWithPostRequest(order) {
    const { iva } = order;
    console.log('==>', order.total, iva);
    const referenceCode = order.referencia;
    let winName = 'MyWindow';
    let windowoption =
      'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
    const provide = providers.providers.find(
      (pro) => pro.id === productProvider.provider,
    );
    const withEjemplar = order.ejemplar ? 'con ' : 'sin ';
    const withoutIva =
      iva > 0 ? order.total - order.total * (iva / 100) : order.total;
    const ivaValue = iva > 0 ? order.total * (iva / 100) : 0;

    const signature = md5(
      `4Vj8eK4rloUd272L48hsrarnUA~508029~${referenceCode}~${order.total}~COP`,
    );
    console.log('provideres', providers);
    console.log('provi', provide);
    let params = {
      accountId: '512321',
      merchantId: '508029',
      description: `${providers.nombre} - ${provide.nombre} - ${order.fechaPublicacion}`,
      referenceCode: referenceCode,
      amount: order.total,
      tax: ivaValue,
      taxReturnBase: withoutIva,
      currency: 'COP',
      signature: signature,
      test: '1',
      buyerEmail: email,
      responseUrl: '',
      confirmationUrl: 'https://api.leposti.ml/transactions',
    };
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute(
      'action',
      'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/',
    );
    form.setAttribute('target', winName);
    for (let i in params) {
      if (params.hasOwnProperty(i)) {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = params[i];
        form.appendChild(input);
      }
    }
    document.body.appendChild(form);
    // window.open('', winName, windowoption);
    // form.target = winName;
    form.submit();
    document.body.removeChild(form);
  }

  const onClickBuy = async () => {
    openWindowWithPostRequest(orderReady);
  };

  const Quote = () => {
    let button;
    if (orderReady.user.id > 0) {
      button = <Button onClick={onClickBuy}>Comprar</Button>;
    } else {
      setCookie('email', email);
      button = (
        <div>
          <p>
            El correo electronico no se encuntra registrado, por favor
            registrate para continuar con la compra
          </p>
          <Link href='/register'>
            <a>Registrate</a>
          </Link>
        </div>
      );
    }

    const providerInOrder = providers.providers.find(
      (prov) => prov.id === productProvider.provider,
    );

    const quotation = (
      <div>
        <div>
          <span>Producto: </span>
          {providers.nombre}
        </div>
        <div>
          <span>Medio: </span>
          {providerInOrder.nombre}
        </div>
        <div>
          <span>Valor: </span>
          {formatter.format(orderReady.total)}
        </div>
        <div>{button}</div>
      </div>
    );

    return quotation;
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
      <MyHeader />
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
            {!openQuote ? (
              <>
                <FormItem
                  label='Producto:'
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    showSearch
                    style={{ width: '100%', border: null }}
                    placeholder='Seleccione un producto'
                    onChange={onChangeProduct}
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {optionsProducts}
                  </Select>
                </FormItem>
                <FormItem
                  label='Medio:'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    disabled={!productProvider.product}
                    showSearch
                    style={{ width: '100%', border: null }}
                    placeholder='Seleccione un medio'
                    optionFilterProp='children'
                    value={provider}
                    onChange={onChangeProvider}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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
                  onChange={onChangeEmail}
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
                              new Error(
                                'Debe aceptar los terminos y condiciones',
                              ),
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
              </>
            ) : (
              <Quote />
            )}
          </Form>
        </div>
        <div>
          <About></About>
          <Contact></Contact>
          <Question></Question>
        </div>
      </Content>
      <MyFooter />
      <Chats />
    </Layout>
  );
};

Home.getInitialProps = async (ctx) => {
  const res = await fetch(`https://api.leposti.ml/products`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
      'Content-Type': 'application/json',
    },
  });
  const products = await res.json();
  return { products };
};

export default Home;
