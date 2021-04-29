import React, { useEffect, useState } from 'react';
import { useAuth } from '@context/auth';
import fetch from 'isomorphic-fetch';
import dynamic from 'next/dynamic';
import { Table, Spin } from 'antd';
import { NextSeo } from 'next-seo';

import MyLayout from '@components/LayoutDash';

//import styles from "@styles/Publications.module.css"

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: function loading() {
    return <Spin />;
  },
});

const config = {
  theme: 'snow',
  modules: {
    toolbar: false,
    clipboard: {},
  },
};

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
  },
  {
    title: 'Monto',
    dataIndex: 'monto',
    key: 'monto',
  },
  {
    title: 'Referencia del Pago',
    dataIndex: 'referencia',
    key: 'referencia',
  },
  {
    title: 'Fecha de Pago',
    dataIndex: 'fechaPago',
    key: 'fechaPago',
  },
  {
    title: 'Fecha de Creación',
    dataIndex: 'fecha',
    key: 'fecha',
  },
];

const SucessBuys = () => {
  const auth = useAuth();
  const [paidOrders, setPaidOrders] = useState(null);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);

  const data =
    paidOrders &&
    paidOrders.map((paidOrder) => ({
      key: paidOrder.id,
      codigo: paidOrder.id,
      monto: paidOrder.total,
      referencia: paidOrder.referencia,
      fechaPago: paidOrder.fechaPublicacion,
      fecha: '22/03/2021',
    }));

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetch(`${process.env.API_URL}/users/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          const orders = await res.json();

          const paidOrders = orders.orders.filter(
            (order) => order.estado === 'paid',
          );
          setPaidOrders(paidOrders);
        }
      });
      fetch(`${process.env.API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          const _products = res.json();
          _products.then((r) => setProducts(r));
        }
      });
      fetch(`${process.env.API_URL}/providers`, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          const _providers = res.json();
          _providers.then((r) => setProviders(r));
        }
      });
    }
  }, [auth.isAuthenticated]);

  const infoRow = (id) => {
    if (useAuth().user && useAuth().user.orders) {
      const rowData = useAuth().user.orders.filter((order) => order.id === id);
      const _product = products.filter(
        (product) => product.id === rowData[0].product,
      );
      const _provider = providers.filter(
        (provider) => provider.id === rowData[0].provider,
      );
      return (
        <div>
          <p>
            <span>Producto:</span>
            {_product[0].nombre}
          </p>
          <p>
            <span>Medio:</span>
            {_provider[0].nombre}
          </p>
          <p>
            <span>Fecha Publicacion:</span>
            {rowData[0].fechaPublicacion}
          </p>
          <p>
            <span>Valor:</span>
            {rowData[0].total}
          </p>
          <p>
            <span>Publicado:</span>
            {rowData[0].sePublico}
          </p>
          <p>
            <span>contenido:</span>{' '}
            <>
              <QuillNoSSRWrapper
                theme='snow'
                modules={config.modules}
                value={rowData[0].contenido}
                readOnly={true}
                placeholder='Contenido'
              />
            </>
          </p>
        </div>
      );
    }
  };
  return (
    <>
      {auth.isAuthenticated ? (
        <MyLayout>
          <NextSeo
            nofollow={true}
            noindex={true}
            title='Compras Realizadas | Leposti.com'
          />
          <style>
            {
              '\
                .ant-table-thead > tr > th, .ant-table-tbody > tr > td {\
                    text-align: center;\
                }\
            '
            }
          </style>
          <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>
            Compras Realizadas
          </h1>
          <Table
            expandable={{
              expandedRowRender: (record) => infoRow(record.key),
            }}
            columns={columns}
            dataSource={data}
          />
        </MyLayout>
      ) : null}
    </>
  );
};

SucessBuys.requiresAuth = true;
SucessBuys.redirectUnauthenticated = '/login';

export default SucessBuys;
