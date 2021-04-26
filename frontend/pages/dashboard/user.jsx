import { Row, Col, Divider } from "antd"
import Image from "next/image"
import { useEffect } from "react";

import MyLayout from "../../components/LayoutDash"
import { useAuth } from "../../context/auth";

import styles from "../../styles/User.module.css"

const DescriptionItem = ({ title, content }) => (
  <div className={styles.item}>
    <p className={styles.itemLabel}>{title}:</p>
    {content}
  </div>
);


const Home = () => {
  const { user } = useAuth()

  useEffect(() => {
    console.log(user);
  }, [])

  return (
    <MyLayout>
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>Perfil de Usuario</h1>
      <Row style={{ height: '100%' }}>
        <Col span={24} className={styles.userText}>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Tipo documento" content="Cédula de ciudadanía" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Documentos" content={user.docId} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Nombres" content={user.firstname} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Apellido 1" content={user.lastname} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Apellido 2" content="" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Teléfono celular" content={user.phone} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Correo electrónico" content={user.email} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Departamento" content={user.departamento} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Ciudad" content={user.city} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Dirección correspondencia" content={user.direccion} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Usuario" content={user.email} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Contraseña" content="********" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Fecha creación" content={user.created_at} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Nivel de usuario" content="********" />
            </Col>
          </Row>
          <Divider />
        </Col>
      </Row>
    </MyLayout>
  )
}

Home.requiresAuth = true;
Home.redirectUnauthenticated = "/login";

export default Home;
