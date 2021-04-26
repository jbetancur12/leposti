

import MyLayout from "../../components/LayoutDash"
import UserProfile from "../../components/UserProfile"

const Home = () => {

  return (
    <MyLayout>
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>Perfil de Usuario</h1>
    </MyLayout>
  )
}

Home.requiresAuth = true;
Home.redirectUnauthenticated = "/login";

export default Home;
