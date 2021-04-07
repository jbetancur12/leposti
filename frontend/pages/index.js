import React from 'react'
import moment from 'moment';
import { Row, Col, Select, Form, DatePicker, Space } from 'antd';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const { Option } = Select;
const FormItem = Form.Item
const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

export default function Index({ products }) {
  const [product, setProduct] = React.useState('');
  const [provider, setProvider] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openProviders, setOpenProviders] = React.useState(false);
  const [productProvider, setProductProvider] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [readOnly, setReadOnly] = React.useState(true);


  async function onChange(value) {
    const res = await fetch(
      `https://api.leposti.ml/products/${value}`,
    );
    const resProduct = await res.json();
    const _product = { product: value };
    setProduct(value);
    setProvider('');
    setProductProvider({ ..._product });
    setProviders(resProduct.providers);
  }

  function onChangeProvider(value) {
    setProvider(value);
    const test = { ...productProvider, provider: value };
    setProductProvider(test);
  }

  function onChangeDate() {
    console.log('focus');
  }

  function disabledDate(current){
    return current && current < moment().endOf('day');
  }

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
        <Form layout="horizontal">
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
          >
            <Space direction="vertical">
              <DatePicker disabledDate={disabledDate} disabled={!productProvider.provider} defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={onChangeDate} />
            </Space>
          </FormItem>

        </Form>
      </Col>
    </Row>
  )
};
Index.getInitialProps = async (ctx) => {
  const res = await fetch(`https://api.leposti.ml/products`);
  const products = await res.json();
  return { products };
};