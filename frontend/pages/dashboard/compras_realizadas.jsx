import { Table } from "antd"

import MyLayout from "../../components/LayoutDash"

//import styles from "../styles/Publications.module.css"

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo'
  },
  {
    title: 'Monto',
    dataIndex: 'monto',
    key: 'monto'
  },
  {
    title: 'Referencia del Pago',
    dataIndex: 'referencia',
    key: 'referencia'
  },
  {
    title: 'Fecha de Pago',
    dataIndex: 'fechaPago',
    key: 'fechaPago'
  },
  {
    title: 'Fecha de Creación',
    dataIndex: 'fecha',
    key: 'fecha'
  }
]

const data = [
  {
    codigo: '981741',
    monto: '123000.00',
    referencia: '123987',
    fechaPago: '23/03/2021',
    fecha: '22/03/2021',
  },
  {
    codigo: '981741',
    monto: '123000.00',
    referencia: '123987',
    fechaPago: '23/03/2021',
    fecha: '22/03/2021',
  },
  {
    codigo: '981741',
    monto: '123000.00',
    referencia: '123987',
    fechaPago: '23/03/2021',
    fecha: '22/03/2021',
  }
]

const Home = () => {
  return (
    <MyLayout>
      <style>{"\
                .ant-table-thead > tr > th, .ant-table-tbody > tr > td {\
                    text-align: center;\
                }\
            "}</style>
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>Compras Realizadas</h1>
      <Table columns={columns} dataSource={data} />
    </MyLayout>
  )
}

export default Home;