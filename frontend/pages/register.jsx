import React from 'react';
import Register from '@components/Register';
import MyHeader from '@components/MyHeader';
import MyFooter from '@components/MyFooter';

const Registration = () => (
  <>
    <MyHeader />
    <Register edit={false} />
    <MyFooter />
  </>
);

export default Registration;
