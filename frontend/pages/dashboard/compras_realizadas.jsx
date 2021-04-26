import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';
import { Table } from 'antd';

import MyLayout from '../../components/LayoutDash';

//import styles from "../styles/Publications.module.css"

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

const SucessBuys = () => {
  const auth = useAuth();
  const [paidOrders, setPaidOrders] = useState(null);

  const data =
    paidOrders &&
    paidOrders.map((paidOrder) => {
      return {
        codigo: paidOrder.id,
        monto: paidOrder.total,
        referencia: paidOrder.referencia,
        fechaPago: paidOrder.fechaPublicacion,
        fecha: '22/03/2021',
      };
    });

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetch(`${process.env.API_URL}/users/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        },
      }).then(async (res) => {
        if (res.ok) {
          const orders = await res.json();

          const paidOrders = orders.orders.filter(
            (order) => order.estado === 'paid',
          );
          console.log(paidOrders);
          setPaidOrders(paidOrders);
        }
      });
    }
  }, [auth.isAuthenticated]);
  return (
    <>
      {auth.isAuthenticated ? (
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
            Compras Realizadas
          </h1>
          <Table columns={columns} dataSource={data} />
        </MyLayout>
      ) : null}
    </>
  );
};

SucessBuys.requiresAuth = true;
SucessBuys.redirectUnauthenticated = '/login';

export default SucessBuys;
