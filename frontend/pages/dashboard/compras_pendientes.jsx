import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import fetch from 'isomorphic-fetch';
import { Table } from 'antd';

import MyLayout from '@components/LayoutDash';

//import styles from "../styles/Publications.module.css"

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    id: 'codigo',
  },
  {
    title: 'Monto',
    dataIndex: 'monto',
    id: 'monto',
  },
  {
    title: 'Referencia del Pago',
    dataIndex: 'referencia',
    id: 'referencia',
  },
  {
    title: 'Fecha de Pago',
    dataIndex: 'fechaPago',
    id: 'fechaPago',
  },
  {
    title: 'Fecha de Creación',
    dataIndex: 'fecha',
    id: 'fecha',
  },
];

// const data = [
//   {
//     codigo: '981741',
//     monto: '123000.00',
//     referencia: '123987',
//     fechaPago: '23/03/2021',
//     fecha: '22/03/2021',
//   },
//   {
//     codigo: '981741',
//     monto: '123000.00',
//     referencia: '123987',
//     fechaPago: '23/03/2021',
//     fecha: '22/03/2021',
//   },
//   {
//     codigo: '981741',
//     monto: '123000.00',
//     referencia: '123987',
//     fechaPago: '23/03/2021',
//     fecha: '22/03/2021',
//   }
// ]

const PendingBuys = () => {
  const auth = useAuth();
  const [unpaidOrders, setUnpaidOrders] = useState([
    {
      codigo: '1',
      monto: '',
      referencia: '',
      fechaPago: '',
      fecha: '',
    },
  ]);

  const data =
    unpaidOrders &&
    unpaidOrders.map((unpaidOrder) => ({
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
  }, [auth.isAuthenticated]);
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
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.codigo}
      />
    </MyLayout>
  );
};

PendingBuys.requiresAuth = true;
PendingBuys.redirectUnauthenticated = '/login';

export default PendingBuys;
