import React from "react";
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

  const config = {
    theme: "snow",
    modules: {
      toolbar: false,
      clipboard: {},
    },
  };
  async function onChange(value) {
    const res = await fetch(`https://api.leposti.ml/products/${value}`);
    const resProduct = await res.json();
    const _product = { product: value };
    setProduct(value);
    setProvider("");
    setProductProvider({ ..._product });
    setProviders(resProduct.providers);
  }

  function onChangeProvider(value) {
    setProvider(value);
    const test = { ...productProvider, provider: value };
    setProductProvider(test);
  }

  function onChangeEditor(content, delta, source, editor) {
    setValueEditor(editor.getHTML());
    setValueEditorText(editor.getText());
  }

  function onChangeDate(date, dateString) {
    setReadOnly(false);
    const isHoliday = getColombianHolidays.includes(dateString);
  }

  function onChangeTerms(e) {
    setTerms(e.target.checked);
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

  const onFinish = (values) => {
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
    providers &&
    providers.map((provider) => {
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
          {" "}
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

            <FormItem
              label="Email:"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              name="email"
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
              <Button type="primary" htmlType="submit" disabled={!terms}>
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
  const res = await fetch(`https://api.leposti.ml/products`);
  const products = await res.json();
  return { products };
};
