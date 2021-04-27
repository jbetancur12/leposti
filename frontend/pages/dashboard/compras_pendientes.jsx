import React, { useEffect, useState } from 'react';
import { useAuth } from '@context/auth';
import fetch from 'isomorphic-fetch';
import { Table, Space, Tooltip, Popconfirm, message, Spin } from 'antd';
import md5 from 'md5';
import { DollarCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

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
      monto: unpaidOrder.total,
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

  const deleteOrder = async (id) => {
    const res = await fetch(`${process.env.API_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
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
      `4Vj8eK4rloUd272L48hsrarnUA~508029~${order.referencia}~${order.total}~COP`,
    );

    const params = {
      accountId: '512321',
      merchantId: '508029',
      description: `${order.provider.nombre} - ${order.product.nombre} - ${order.fechaPublicacion}`,
      referenceCode: order.referencia,
      amount: order.total,
      tax: (order.total * 0.16).toFixed(2),
      taxReturnBase: (order.total / 1.16).toFixed(2),
      currency: 'COP',
      signature: signature,
      test: '1',
      buyerEmail: order.user.email,
      responseUrl: '',
      confirmationUrl: `${process.env.API_URL}/responses`,
    };

    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute(
      'action',
      'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/',
    );
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
        title='Edictos y avisos de ley en Leposti.com'
      />
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>
        Compras Pendientes
      </h1>
      <Table
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
