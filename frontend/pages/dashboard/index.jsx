import React, { useEffect } from 'react'
import { useAuth, ProtectRoute } from "../../context/auth";
import MyLayout from "../../components/LayoutDash"
import ContentLoader from "react-content-loader";
import { Skeleton } from 'antd';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <MyLayout /> : (
        <ContentLoader uniqueKey="aUniqueKeyToMatchSSR">
          <rect y="10" rx="3" ry="3" width="1000" height="20" />
        </ContentLoader>
      )}
    </>)
}

Dashboard.requiresAuth = true;
Dashboard.redirectUnauthenticated = "/login";

export default Dashboard;
