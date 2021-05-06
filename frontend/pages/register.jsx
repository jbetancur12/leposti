import React from 'react';
import Register from '@components/Register';
import MyHeader from '@components/MyHeader';
import MyFooter from '@components/MyFooter';
import { NextSeo } from 'next-seo';

const Registration = () => (
  <>
    <NextSeo nofollow={true} noindex={true} title='Registro | Leposti.com' />
    <MyHeader />
    <Register edit={false} />
    <MyFooter />
  </>
);

export default Registration;
