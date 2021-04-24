import { Table } from "antd"

import MyLayout from "../components/LayoutDash"

//import styles from "../styles/Publications.module.css"

const columns = [
    {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo'
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion'
    },
    {
        title: 'Valor Total',
        dataIndex: 'valor',
        key: 'valor'
    },
    {
        title: 'Pagado',
        dataIndex: 'pagado',
        key: 'pagado'
    },
    {
        title: 'Referencia Pago',
        dataIndex: 'referencia',
        key: 'referencia'
    },
    {
        title: 'Token',
        dataIndex: 'token',
        key: 'token'
    },
    {
        title: 'Referencia Pago Payu',
        dataIndex: 'refPayu',
        key: 'refPayu'
    },
    {
        title: 'Fecha Referencia Pago Payu',
        dataIndex: 'fechaRef',
        key: 'fechaRef'
    },
    {
        title: 'He leído y acepto los términos y condiciones de uso',
        dataIndex: 'terminos',
        key: 'terminos'
    },
    {
        title: 'Fecha de Creación',
        dataIndex: 'fecha',
        key: 'fecha'
    },
    {
        title: 'Login',
        dataIndex: 'login',
        key: 'login'
    },
    {
        title: 'Crédito',
        dataIndex: 'credito',
        key: 'credito'
    },
    {
        title: 'Factura',
        dataIndex: 'factura',
        key: 'factura'
    },
    {
        title: 'ID Vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor'
    }
]

const data = [
    {
        key: '1',
        codigo: '3288',
        descripcion: 'Resumen de compra, Cantidad de productos=1 ([Edicto:#1 unidades]), Valor Total = $137,453.00 IVA Incluido',
        valor: '137,453.00',
        pagado: 'No',
        referencia: '11638583',
        token: '86471894',
        refPayu: '7359573111638583',
        fechaRef: '01/22/2021',
        terminos: '✅',
        fecha: '01/22/2021',
        login: 'alvaroalcuesta@gmail.com',
        credito: 'NO',
        factura: '',
        vendedor: ''

    },
    {
        key: '1',
        codigo: '3288',
        descripcion: 'Resumen de compra, Cantidad de productos=1 ([Edicto:#1 unidades]), Valor Total = $137,453.00 IVA Incluido',
        valor: '137,453.00',
        pagado: 'No',
        referencia: '11638583',
        token: '86471894',
        refPayu: '7359573111638583',
        fechaRef: '01/22/2021',
        terminos: '✅',
        fecha: '01/22/2021',
        login: 'alvaroalcuesta@gmail.com',
        credito: 'NO',
        factura: '',
        vendedor: ''

    },
    {
        key: '1',
        codigo: '3288',
        descripcion: 'Resumen de compra, Cantidad de productos=1 ([Edicto:#1 unidades]), Valor Total = $137,453.00 IVA Incluido',
        valor: '137,453.00',
        pagado: 'No',
        referencia: '11638583',
        token: '86471894',
        refPayu: '7359573111638583',
        fechaRef: '01/22/2021',
        terminos: '✅',
        fecha: '01/22/2021',
        login: 'alvaroalcuesta@gmail.com',
        credito: 'NO',
        factura: '',
        vendedor: ''

    }
]

const Home = () => {
    return (
        <MyLayout>
            <style>{"\
                .ant-table-thead > tr > th:nth-child(2), .ant-table-tbody > tr > th:nth-child(2), .ant-table-thead > tr > th:nth-child(9), .ant-table-tbody > tr > th:nth-child(9) {\
                    min-width: 300px;\
                    padding: 0;\
                }\
                .ant-table-tbody > tr > th:nth-child(9) {\
                    text-align: center !important;\
                }\
                .ant-table-thead > tr > th:nth-child(8), .ant-table-tbody > tr > th:nth-child(8) {\
                    min-width: 200px;\
                }\
                .ant-table-content > table {\
                    width: auto !important;\
                }\
            "}</style>
            <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>Publicaciones</h1>
            <Table columns={columns} dataSource={data}/>
        </MyLayout>
    )
}

export default Home;