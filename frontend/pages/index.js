import {
  Layout,
  Carousel,
  Select,
  Form,
  DatePicker,
  Space,
  Checkbox,
  Button,
  Input,
  Modal,
  Divider,
  BackTop,
  ConfigProvider,
} from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Cookie from 'js-cookie';
import { NextSeo, LogoJsonLd } from 'next-seo';
import md5 from 'md5';
import CookieConsent from 'react-cookie-consent';

import Link from 'next/link';
import colombianHolidays from 'colombian-holidays';
import 'moment/locale/es-mx';
import locale from 'antd/lib/locale/es_ES';
import styles from '@styles/New.module.css';

import About from '@components/About';
import Contact from '@components/Contact';
import Question from '@components/Question';
import MyHeader from '@components/MyHeader';
import MyFooter from '@components/MyFooter';
// import Chats from '@components/Chats';

const { Content } = Layout;

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const FormItem = Form.Item;

const API_URL = process.env.API_URL;

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
});

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: function loading() {
    return <p>Loading ...</p>;
  },
});

const Responsive = dynamic(import('@components/Responsive'), { ssr: false });
const getColombianHolidays = colombianHolidays().map((colombianHoliday) => {
  const splited = [...colombianHoliday.celebrationDate.split('-')];
  const formated = `${splited[2]}/${splited[1]}/${splited[0]}`;
  return formated;
});

const config = {
  theme: 'snow',
  modules: {
    toolbar: false,
    clipboard: {},
  },
};

const Home = () => {
  const myRef = React.useRef();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [provider, setProvider] = useState('');
  const [productProvider, setProductProvider] = useState([]);
  const [providers, setProviders] = useState([]);
  const [valueDate, setValueDate] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [valueEditor, setValueEditor] = useState('');
  const [valueEditorText, setValueEditorText] = useState('');
  const [dayWeek, setDayWeek] = useState('lunes');
  const [email, setEmail] = useState('');
  const [openQuote, setOpenQuote] = useState(false);
  const [editing, setEditing] = useState(false);
  const [orderReady, setOrder] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempEditor, setTempEditor] = useState('');
  const [tempEditorTxt, setTempEditorTxt] = useState('');
  const [, setQuotation] = useState([]);
  const [form] = Form.useForm();
  const [referencia, setReferencia] = useState();

  //Functions
  async function onChangeProduct(value) {
    const response = await fetch(`${API_URL}/products/${value}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
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
    setValueDate('');
    setProviders(responseProduct);
    setQuotation({ ..._quotation });
  }

  const showModal = () => {
    setTempEditor(valueEditor);
    setTempEditorTxt(valueEditorText);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setValueEditor(tempEditor);
    setValueEditorText(tempEditorTxt);
    setIsModalVisible(false);
  };

  function onChangeProvider(value) {
    setProvider(value);
    const test = { ...productProvider, provider: value };
    setProductProvider(test);
    setValueDate('');
  }

  function onChangeDate(date, dateString) {
    setReadOnly(false);
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
    const date = new Date();

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
    setValueEditor(editor.getHTML());
    setValueEditorText(editor.getText());
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onFinish = async () => {
    const res = await fetch(`${API_URL}/prices`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });
    const prices = await res.json();
    const price = prices.filter((price) => {
      if (price.provider && price.product) {
        return (
          price.product.id === productProvider.product &&
          price.provider.id === productProvider.provider &&
          price.dias.includes(dayWeek)
        );
      }
      return;
    });

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
    const userExist = await fetch(`${API_URL}/users?email=${email}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });

    if (userExist.ok) {
      const userExistJson = await userExist.json();
      let userBuyer = '';
      if (userExistJson.length > 0) {
        userBuyer = userExistJson[0].id;
      } else {
        userBuyer = 0;
      }
      setOrder({ ...order, user: { id: userBuyer } });

      orderUpdated = { ...order, user: { id: userBuyer } };
    }

    if (!editing) {
      const resPost = await fetch(`${API_URL}/orders`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip',
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
        const resul = await resPost.json();
        Cookie.set('order', resul.id, { expires: 1 });
        setReferencia(resul);
        setOpenQuote(true);
      }
    } else {
      const orderEdited = {
        total: totalIVA,
        // checkout_session: '122jjd',
        contenido: valueEditor,
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
        iva: finalPrice[0].iva,
      };
      await fetch(`${API_URL}/orders/${referencia.id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip',
        },
        body: JSON.stringify(orderEdited), // body data type must match "Content-Type" header
      });
      setValueEditor('');
      setValueDate('');
      setProvider('');
      setProduct('');
      setOpenQuote(true);
    }

    // openWindowWithPostRequest(order, finalPrice[0].iva, referenceCode);
  };

  function openWindowWithPostRequest(order) {
    const { iva } = order;
    const referenceCode = order.referencia;
    const winName = 'MyWindow';
    const provide = providers.providers.find(
      (pro) => pro.id === productProvider.provider,
    );
    const withoutIva =
      iva > 0 ? order.total - order.total * (iva / 100) : order.total;
    const ivaValue = iva > 0 ? order.total * (iva / 100) : 0;

    const signature = md5(
      `${process.env.PAYU_KEY}~${process.env.PAYU_MERCHANT_ID}~${referenceCode}~${order.total}~COP`,
    );

    const params = {
      accountId: process.env.PAYU_ACCOUNT_ID,
      merchantId: process.env.PAYU_MERCHANT_ID,
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
      confirmationUrl: `${API_URL}/responses`,
    };
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', process.env.PAYU_URL);
    form.setAttribute('target', winName);
    for (const i in params) {
      if (params.hasOwnProperty(i)) {
        const input = document.createElement('input');
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
    setOpenQuote(false);
  };

  const handleClean = () => {
    setValueEditorText('');
    setValueEditor('');
  };

  const onClickEditar = () => {
    setOpenQuote(false);
    setEditing(true);
    setValueEditor(referencia.contenido);
    setValueDate(moment(referencia.fechaPublicacion));
    setProvider(referencia.provider.id);
    setProduct(referencia.product.id);
    form.setFieldsValue({
      ['email']: email,
    });
  };

  const Quote = () => {
    let button;
    if (orderReady.user.id > 0) {
      button = (
        <Button type='primary' onClick={onClickBuy}>
          Comprar
        </Button>
      );
    } else {
      Cookie.set('email', email);
      button = (
        <div>
          <Link href='/register'>
            <Button>Registrate</Button>
          </Link>
        </div>
      );
    }

    const providerInOrder = providers.providers.find(
      (prov) => prov.id === productProvider.provider,
    );

    const quotation = (
      <div>
        <h1 className={styles.quotationTitle}>Detalles de la compra</h1>
        <Divider style={{ marginTop: '0' }} />
        <div className={styles.quotationDetails}>
          <span>Producto </span>
          {providers.nombre}
        </div>
        <div className={styles.quotationDetails}>
          <span>Medio </span>
          {providerInOrder.nombre}
        </div>
        <div className={styles.quotationDetails}>
          <span>Fecha de publicación </span>
          {orderReady.fechaPublicacion}
        </div>
        <Divider style={{ marginBottom: '10px' }} dashed />
        <div className={styles.quotationDetails}>
          <span style={{ fontWeight: '600' }}>Total </span>
          <div style={{ fontWeight: '600' }} className={styles.amount}>
            {formatter.format(orderReady.total)}
            <span style={{ fontSize: '12px' }}>
              <em>(Iva Incluido)</em>
            </span>
          </div>
        </div>
        {!orderReady.user.id > 0 ? (
          <p style={{ fontSize: '10px', fontStyle: 'italic' }}>
            El correo electronico no se encuntra registrado, por favor
            registrate para continuar con la compra
          </p>
        ) : null}
        <div className={styles.buttonsQuote}>
          {button}
          <Button onClick={onClickEditar}>Editar</Button>
        </div>
      </div>
    );

    return quotation;
  };

  React.useEffect(async () => {
    const res = await fetch(`${API_URL}/products?_sort=id:ASC`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });
    const _products = await res.json();
    setProducts(_products);
  }, []);

  const optionsProducts = products.map((product) => (
    <Option value={product.id} key={product.id}>
      {product.nombre}
    </Option>
  ));

  const optionsProviders =
    providers.providers &&
    providers.providers.map((provider) => (
      <Option value={provider.id} key={provider.id}>
        {provider.nombre}
      </Option>
    ));

  return (
    <Layout className={styles.layout}>
      <h1 className={styles.ppalTitle}>Edictos, Avisos de ley | leposti.com</h1>

      <NextSeo
        title='Edictos, Avisos de ley | Leposti.com'
        description='Pague y publique Edictos y Avisos de ley, en medios de comunicación nacionales y/o regionales, desde la comodidad de su casa u oficina de forma rápida y segura.'
        canonical={process.env.CANONICAL_URL}
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          url: process.env.CANONICAL_URL,
          title: 'Edictos, Avisos de ley | Leposti.com',
          description:
            'Pague y publique Edictos y Avisos de ley, en medios de comunicación nacionales y/o regionales, desde la comodidad de su casa u oficina de forma rápida y segura.',
          images: [
            {
              url: '/banner1.webp',
              width: '800',
              height: 600,
              alt: 'Banner 1 Leposti',
            },
          ],
        }}
        twitter={{
          handle: '@leposti_edictos',
          site: '@leposti_edictos',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.webp',
          },
        ]}
      />
      <LogoJsonLd logo='/logoprincipalBlanco' url='https://www.leposti.com' />
      <BackTop />
      <MyHeader />
      <Content className={styles.main}>
        <Carousel className={styles.carousel} autoplay>
          <img
            src='/banner1.webp'
            layout='fill'
            className={styles.imgContainer}
            alt='banner1'
            title='banner1'
            width={1200}
            height={700}
          ></img>
          <img
            src='/banner2.webp'
            layout='fill'
            className={styles.imgContainer}
            alt='banner2'
            title='banner2'
            width={1200}
            height={700}
          ></img>
          {/* <img src="/banner3.webp" layout="fill" className={styles.imgContainer}></img> */}
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
                    value={product}
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
                    <ConfigProvider locale={locale}>
                      <DatePicker
                        ref={myRef}
                        style={{ width: '100%' }}
                        // locale={locale}
                        disabledDate={disabledDate}
                        disabled={!productProvider.provider}
                        //defaultValue={defaultDate}
                        value={valueDate}
                        format={dateFormat}
                        onChange={onChangeDate}
                      />
                    </ConfigProvider>
                  </Space>
                </FormItem>
                <FormItem
                  label='Contenido aviso a publicar:'
                  labelCol={{ span: 14 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      validator: () =>
                        false
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error(
                              'Debe aceptar los terminos y condiciones',
                            ),
                          ),
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
                    {valueEditorText.length > 3000 ? (
                      <p style={{ color: 'red' }}>
                        Contenido supera los 3000 caracteres
                      </p>
                    ) : null}
                  </Responsive>
                  <Responsive displayIn={['Mobile']}>
                    <>
                      <QuillNoSSRWrapper
                        onChange={onChangeEditor}
                        theme='snow'
                        modules={config.modules}
                        value={valueEditor}
                        readOnly={readOnly}
                        placeholder='Contenido'
                      />
                      {valueEditorText.length > 3000 ? (
                        <p>supera los 3000 caracteres</p>
                      ) : null}
                    </>
                  </Responsive>
                  <Modal
                    title='Contenido aviso a publicar'
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText='Aceptar'
                    cancelText='Cancelar'
                    width='1000px'
                  >
                    <div className={styles.editButton}>
                      <Button onClick={handleClean}>Limpiar</Button>
                    </div>
                    <QuillNoSSRWrapper
                      onChange={onChangeEditor}
                      theme='snow'
                      modules={config.modules}
                      value={valueEditor}
                      readOnly={readOnly}
                      placeholder='Contenido'
                    />
                    {valueEditorText.length > 3000 ? (
                      <p style={{ color: 'red' }}>
                        Contenido supera los 3000 caracteres, Actualmente no
                        ofrecemos este producto. Contáctanos en
                        servicioalcliente@leposti.com o a través del chat
                      </p>
                    ) : null}
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
                    value={email}
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
                    disabled={valueEditorText.length > 3000}
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
      <CookieConsent
        buttonText='Entendido!'
        style={{
          background: '#002855',
          maxWidth: '600px',
          left: '50%',
          transform: 'translate(-50%,0)',
        }}
      >
        Al continuar navegando en este sitio web, aceptas la{' '}
        <Link href='/cookies'>
          <a title='Politica Cookies'>Politica de privacidad </a>
        </Link>{' '}
        y uso de Cookies.{' '}
      </CookieConsent>
      <MyFooter />
      {/* <Chats /> */}
    </Layout>
  );
};

export default Home;
