import MyLayout from '@components/LayoutDash';
import UserProfile from '@components/UserProfile';
import { NextSeo } from 'next-seo';

const Home = () => (
  <MyLayout>
    <NextSeo nofollow={true} noindex={true} title='Mi Cuenta | Leposti.com' />
    <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>
      Perfil de Usuario
    </h1>
    <UserProfile />
  </MyLayout>
);

Home.requiresAuth = true;
Home.redirectUnauthenticated = '/login';

export default Home;
