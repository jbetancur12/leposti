import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import fetch from 'isomorphic-fetch';
import { Table, Space, Tooltip, Popconfirm, message } from 'antd';
import md5 from 'md5';
import { DollarCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import MyLayout from '@components/LayoutDash';

//import styles from "../styles/Publications.module.css"

const PendingBuys = () => {
  const auth = useAuth();
  const [reload, setReload] = useState(false);
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
    }
    if (reload) {
      setReload(false);
    }
  }, [auth.isAuthenticated, reload]);

  const confirm = (record) => () => {
    deleteOrder(record.key);
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
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>
        Compras Pendientes
      </h1>
      <Table columns={columns} dataSource={data} />
    </MyLayout>
  );
};

PendingBuys.requiresAuth = true;
PendingBuys.redirectUnauthenticated = '/login';

export default PendingBuys;
