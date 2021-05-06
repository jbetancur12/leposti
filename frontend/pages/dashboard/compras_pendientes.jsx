import React, { useEffect, useState } from 'react';
import { useAuth } from '@context/auth';
import fetch from 'isomorphic-fetch';
import { Table, Space, Tooltip, Popconfirm, message, Spin } from 'antd';
import md5 from 'md5';
import { DollarCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import moment from 'moment';

import MyLayout from '@components/LayoutDash';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
});

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

const PendingBuys = () => {
  const auth = useAuth();
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [unpaidOrders, setUnpaidOrders] = useState([
    {
      codigo: '1',
      monto: '',
      referencia: '',
      fechaPago: '',
      fecha: '',
    },
  ]);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.codigo - b.codigo,
      // sortDirections: ['descend', 'ascend'],
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
      sorter: (a, b) => moment(a.fechaPago).unix() - moment(b.fechaPago).unix(),
    },
    {
      title: '',
      key: 'action',
      render: function eliminar(text, record) {
        return (
          <>
            <Space size='large'>
              <Tooltip title='Pagar'>
                <a style={{ color: 'inherit' }}>
                  <DollarCircleOutlined
                    onClick={onClickPay(record)}
                    style={{ fontSize: '20px' }}
                  />
                </a>
              </Tooltip>
              <Tooltip title='Eliminar'>
                <Popconfirm
                  placement='left'
                  title='Esta seguro de eliminar esta orden?'
                  onConfirm={confirm(record)}
                  okText='Si'
                  cancelText='No'
                >
                  <a style={{ color: 'inherit' }}>
                    <DeleteOutlined style={{ fontSize: '20px' }} />
                  </a>
                </Popconfirm>
              </Tooltip>
            </Space>
          </>
        );
      },
    },
  ];

  const data =
    unpaidOrders &&
    unpaidOrders.map((unpaidOrder) => ({
      key: unpaidOrder.id,
      codigo: unpaidOrder.id,
      monto: formatter.format(unpaidOrder.total),
      referencia: unpaidOrder.referencia,
      fechaPago: unpaidOrder.fechaPublicacion,
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
            (order) => order.estado === 'unpaid',
          );
          setUnpaidOrders(paidOrders);
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
    if (reload) {
      setReload(false);
    }
  }, [auth.isAuthenticated, reload]);

  const confirm = (record) => () => {
    deleteOrder(record.key);
  };
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
          <div>
            <p>
              <Space>
                <span style={{ fontWeight: 'bold' }}>Producto:</span>
                {_product[0].nombre}
              </Space>
            </p>
            <p>
              <Space>
                <span style={{ fontWeight: 'bold' }}>Medio:</span>
                {_provider[0].nombre}
              </Space>
            </p>
            <p>
              <Space>
                <span style={{ fontWeight: 'bold' }}>Fecha Publicacion:</span>
                {rowData[0].fechaPublicacion}
              </Space>
            </p>
            <p>
              <Space>
                <span style={{ fontWeight: 'bold' }}>Valor:</span>
                {formatter.format(rowData[0].total)}
              </Space>
            </p>
            <p>
              <Space>
                <span style={{ fontWeight: 'bold' }}>Publicado:</span>
                {rowData[0].sePublico}
              </Space>
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Aviso Publicado:</span>{' '}
            </p>
          </div>
          <>
            <QuillNoSSRWrapper
              theme='snow'
              modules={config.modules}
              value={rowData[0].contenido}
              readOnly={true}
              placeholder='Aviso Publicado'
            />
          </>
        </div>
      );
    }
  };

  const deleteOrder = async (id) => {
    const res = await fetch(`${process.env.API_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });

    if (!res.ok) {
      message.error('Hubo un error, intentelo de nuevo.');
      return null;
    }
    message.success(`Orden ${id} eliminada`);
    setReload(true);
    return null;
  };

  const getOrder = async (id) => {
    const res = await fetch(`${process.env.API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  };

  const onClickPay = (record) => () => {
    getOrder(record.key).then((res) => goToPayu(res));
  };

  const goToPayu = (order) => {
    const signature = md5(
      `${process.env.PAYU_KEY}~${process.env.PAYU_MERCHANT_ID}~${order.referencia}~${order.total}~COP`,
    );

    const params = {
      accountId: process.env.PAYU_ACCOUNT_ID,
      merchantId: process.env.PAYU_MERCHANT_ID,
      description: `${order.provider.nombre} - ${order.product.nombre} - ${order.fechaPublicacion}`,
      referenceCode: order.referencia,
      amount: order.total,
      tax: (order.total * 0.16).toFixed(2),
      taxReturnBase: (order.total / 1.16).toFixed(2),
      currency: 'COP',
      signature: signature,
      test: process.env.TEST_PAYU,
      buyerEmail: order.user.email,
      responseUrl: '',
      confirmationUrl: `${process.env.API_URL}/responses`,
    };

    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', process.env.PAYU_URL);
    const winName = 'MyWindow';
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
  };

  return (
    <MyLayout>
      <style>
        {
          '\
          .ant-table-thead > tr > th, .ant-table-tbody > tr > td {\
            text-align: center;\
          }\
          '
        }
      </style>
      <NextSeo
        nofollow={true}
        noindex={true}
        title='Compras Pendientes | Leposti.com'
      />
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>
        Compras Pendientes
      </h1>
      <Table
        locale={{
          emptyText: 'No hay compras pendientes',
          triggerDesc: 'Click para ordernar por descendentes',
          triggerAsc: 'Click para ordernar por ascendentes',
          cancelSort: 'Click para ordenar por default',
          expand: 'Mostras mas información',
        }}
        expandable={{
          expandedRowRender: (record) => infoRow(record.key),
        }}
        columns={columns}
        dataSource={data}
      />
    </MyLayout>
  );
};

PendingBuys.requiresAuth = true;
PendingBuys.redirectUnauthenticated = '/login';

export default PendingBuys;
