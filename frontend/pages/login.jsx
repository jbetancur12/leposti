import React, { useState } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Image from 'next/image';

import colombianHolidays from 'colombian-holidays';
import 'moment/locale/es-mx';
import locale from 'antd/lib/locale/es_ES';
import Head from 'next/head';
import styles from '../styles/Login.module.css';
import md5 from 'md5';

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
  Layout,
} from 'antd';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import { Content } from 'antd/lib/layout/layout';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const getColombianHolidays = colombianHolidays().map((colombianHoliday) => {
  let splited = [...colombianHoliday.celebrationDate.split('-')];
  let formated = `${splited[2]}/${splited[1]}/${splited[0]}`;
  return formated;
});

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

export default function Index({ products }) {
  const myRef = React.useRef(null);
  const [product, setProduct] = React.useState('');
  const [provider, setProvider] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openProviders, setOpenProviders] = React.useState(false);
  const [productProvider, setProductProvider] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [readOnly, setReadOnly] = React.useState(true);
  const [valueEditor, setValueEditor] = React.useState('');
  const [valueEditorText, setValueEditorText] = React.useState('');
  const [terms, setTerms] = React.useState(false);
  const [dayWeek, setDayWeek] = React.useState('lunes');
  const [email, setEmail] = React.useState('');
  const [openQuote, setOpenQuote] = React.useState(false);
  const [orderReady, setOrder] = React.useState({});

  const [cookie, setCookie] = useCookies(['email']);

  const config = {
    theme: 'snow',
    modules: {
      toolbar: false,
      clipboard: {},
    },
  };
  async function onChange(value) {
    console.log('Token-webhoodk-8.12', process.env.NEXT_PUBLIC_JWT_TOKEN);
    const res = await fetch(`https://api.leposti.ml/products/${value}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
    });
    const resProduct = await res.json();
    const _product = { product: value };
    setProduct(value);
    setProvider('');
    setProductProvider({ ..._product });

    setValueEditor(resProduct.formato);
    setProviders(resProduct);
  }

  function onChangeProvider(value) {
    setProvider(value);
    const test = { ...productProvider, provider: value };
    setProductProvider(test);
  }

  const Quote = () => {
    let button;
    if (orderReady.user.id > 0) {
      button = <Button onClick={onClickBuy}>Comprar</Button>;
    } else {
      button = (
        <Link href='/register'>
          <a>Registrate</a>
        </Link>
      );
      setCookie('email', email);
    }

    const quotation = (
      <div>
        <div>{orderReady.total}</div>
        <div>{button}</div>
      </div>
    );

    return quotation;
  };

  function onChangeEditor(content, delta, source, editor) {
    //setProductProvider({...productProvider,contenido: editor.getHTML()});
    setValueEditor(editor.getHTML());
    setValueEditorText(editor.getText());
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
  }

  function onChangeTerms(e) {
    // setTerms(e.target.checked);
    setProductProvider({ ...productProvider, terminos: e.target.checked });
  }

  function onChangeEjemplar(e) {
    setProductProvider({ ...productProvider, ejemplar: e.target.checked });
  }

  function defaultDate() {
    const dayToPub = moment().endOf('day').add(2, 'day')._d;
    const dayToPubFormated = moment(dayToPub).format(dateFormat);
    const isHoliday = getColombianHolidays.includes(dayToPubFormated);
    const isSunday = moment(dayToPub).day() === 0;
    if (isHoliday || isSunday) {
      return moment().endOf('day').add(3, 'day');
    }
    return moment().endOf('day').add(2, 'day');
  }

  function disabledDate(current) {
    const dayToPub = moment().endOf('day').add(2, 'day')._d;
    const dayToPubFormated = moment(dayToPub).format(dateFormat);
    const isHoliday = getColombianHolidays.includes(dayToPubFormated);
    const isSunday = moment(dayToPub).day() === 0;

    if (isHoliday || isSunday) {
      return current && current < moment().endOf('day').add(3, 'day');
    }

    return current && current < moment().endOf('day').add(2, 'day');
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onClickBuy = async () => {
    openWindowWithPostRequest(orderReady);
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

    const askUser = await fetch(`https://api.leposti.ml/users?email=${email}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        'Content-Type': 'application/json',
      },
    });
    console.log(askUser);

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

    console.log(JSON.stringify(orderUpdated));
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
      console.log('Posteado', order);
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
    const provide = providers.providers.find((pro) => pro.id === provider);
    const withEjemplar = order.ejemplar ? 'con ' : 'sin ';
    const withoutIva =
      iva > 0 ? order.total - order.total * (iva / 100) : order.total;
    const ivaValue = iva > 0 ? order.total * (iva / 100) : 0;

    const signature = md5(
      `4Vj8eK4rloUd272L48hsrarnUA~508029~${referenceCode}~${order.total}~COP`,
    );
    let params = {
      accountId: '512321',
      merchantId: '508029',
      description: `${providers.nombre} - ${provide.nombre} - ${order.fechaPublicacion} ${withEjemplar} ejemplar fisico`,
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

  const [focused, setFocused] = useState(false);

  return (
    <>
      <Layout className={styles.layout}>
        <MyHeader />
        <Content className={styles.content}>
          <Row justify='space-around' style={{ width: '100%' }}>
            <Col
              span={24}
              sm={12}
              lg={10}
              xl={6}
              className={styles.formContainer}
            >
              <h1 className={styles.title}>Iniciar sesión</h1>
              {!openQuote ? (
                <Form layout='vertical' onFinish={onFinish}>
                  <FormItem
                    label='Correo:'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    name='email'
                    onChange={onChangeEmail}
                    className={styles.item}
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                    ]}
                  >
                    <Input placeholder='Correo' />
                  </FormItem>
                  <FormItem
                    label='Contraseña:'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    name='password'
                    onChange={onChangeEmail}
                    className={styles.item}
                    rules={[
                      {
                        required: true,
                        type: 'password',
                        message: 'The input is not valid E-mail!',
                      },
                    ]}
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
                  </FormItem>
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
                  {/* <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
                  <Checkbox onChange={onChangeTerms}>
                    Acepto Terminos y condiciones
                  </Checkbox>
                </FormItem> */}
                  {/* <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={!productProvider.terminos}
                  >
                    Cotizar
                  </Button>
                </FormItem> */}
                </Form>
              ) : (
                <Quote />
              )}
            </Col>
          </Row>
        </Content>
        <MyFooter />
      </Layout>
    </>
  );
}

export default login;
