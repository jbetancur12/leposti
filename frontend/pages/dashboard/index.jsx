import React, { useContext, useEffect } from 'react'
import AppContext from "../../context/AppContext";
import { useRouter } from 'next/router';
import MyLayout from "../../components/LayoutDash"
import { Skeleton } from 'antd';

const Dashboard = () => {
  const { isAuthenticated } = useContext(AppContext);
  console.log("USER", isAuthenticated);
  const router = useRouter();
  useEffect(() => {

    if (!isAuthenticated) {
      //router.push("/"); // redirect if you're already logged in
    }

  }, [])
  return (
    <>
      {isAuthenticated ? <MyLayout /> : <Skeleton />}
    </>)
}

export default Dashboard;
