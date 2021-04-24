import { Table, Space, Modal, Button } from "antd"

import MyLayout from "../../components/LayoutDash"

//import styles from "../styles/Publications.module.css"

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo'
  },
  {
    title: 'Producto',
    dataIndex: 'producto',
    key: 'producto'
  },
  {
    title: 'Monto',
    dataIndex: 'monto',
    key: 'monto'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Eliminar</a>
      </Space>
    ),
  },
]

const data = [
  {
    codigo: '981741',
    producto: 'Producto 1',
    monto: '123000.00'
  },
  {
    codigo: '29837',
    producto: 'Producto 2',
    monto: '121000.00'
  },
  {
    codigo: '98741',
    producto: 'Producto 3',
    monto: '54000.00'
  },
]

const Home = () => {
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: '¿Deseas realizar la compra?',
      okText: 'Si',
      cancelText: 'No',
      onOk() {
        console.log('Si');
      },
      onCancel() {
        console.log('No');
      },
    });
  }

  return (
    <MyLayout>
      <style>{"\
                .ant-table-thead > tr > th, .ant-table-tbody > tr > td {\
                    text-align: center;\
                }\
            "}</style>
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>Carrito</h1>
      <Table columns={columns} dataSource={data} />
      <Button type="primary" shape="round" onClick={showConfirm} style={{ marginRight: '.5rem' }}>Comprar</Button>
      <Button shape="round">Limpiar Carrito</Button>
    </MyLayout>
  )
}

export default Home;