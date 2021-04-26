import MyLayout from '@components/LayoutDash';
import UserProfile from '@components/UserProfile';

const Home = () => (
  <MyLayout>
    <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>
      Perfil de Usuario
    </h1>
    <UserProfile />
  </MyLayout>
);

Home.requiresAuth = true;
Home.redirectUnauthenticated = '/login';

export default Home;
