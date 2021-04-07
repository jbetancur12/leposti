import React from "react";
import moment from "moment";
import dynamic from "next/dynamic";
import { Row, Col, Select, Form, DatePicker, Space, Checkbox, Button, Input } from "antd";
import ColumnGroup from "antd/lib/table/ColumnGroup";

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
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
  const [terms, setTerms] = React.useState(false)

 

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
    console.log(source);
    setValueEditor(editor.getHTML());
    setValueEditorText(editor.getText());
  }

  function onChangeDate() {
    setReadOnly(false);
  }

  function onChangeTerms(e) {
    setTerms(e.target.checked)
  }

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }



  const onFinish = values => {
    console.log('Received values of form: ', values);
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
    <Row justify="space-around" style={{ marginTop: "50px" }}>
      <Col span={16}>COntent</Col>
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {optionsProviders}
            </Select>
          </FormItem>

          <FormItem
            label="Fecha:"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            rules={[{
              required: true,
              type:"date",
              message:"Date"
            }]}
          >
            <Space direction="vertical">
              <DatePicker
                disabledDate={disabledDate}
                disabled={!productProvider.provider}
                defaultValue={moment(new Date(), dateFormat)}
                format={dateFormat}
                onChange={onChangeDate}
              />
            </Space>
          </FormItem>
          <FormItem
            label="Contenido:"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            rules={[{
              required: true,
            }]}
            
          >
            <QuillNoSSRWrapper
              ref={myRef}
              onChange={onChangeEditor}
              theme="snow"
              modules={config.modules}
              value={valueEditor}
              readOnly={readOnly}
              placeholder= "Contenido"
            />
          </FormItem>
  
        <FormItem label="Email:"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}name="email" rules={[{
              required: true,
              type: "email",
              message: "The input is not valid E-mail!"
            }]}>
        <Input placeholder="Email"></Input>
      </FormItem>
          <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
            <Checkbox onChange={onChangeTerms}>Acepto Terminos y condiciones</Checkbox>
          </FormItem>
          <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
          <Button type="primary"  htmlType="submit" disabled={!terms}>Cotizar</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  );
}
Index.getInitialProps = async (ctx) => {
  const res = await fetch(`https://api.leposti.ml/products`);
  const products = await res.json();
  return { products };
};
