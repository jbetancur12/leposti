import { Row, Col, Divider } from "antd"
import Image from "next/image"

import MyLayout from "../../components/LayoutDash"

import styles from "../styles/User.module.css"

const DescriptionItem = ({ title, content }) => (
  <div className={styles.item}>
    <p className={styles.itemLabel}>{title}:</p>
    {content}
  </div>
);

const Home = () => {
  return (
    <MyLayout>
      <h1 style={{ fontSize: '28px', marginBottom: '2rem' }}>Perfil de Usuario</h1>
      <Row style={{ height: '100%' }}>
        <Col span={24} className={styles.userText}>
          <Row>
            <Col span={12}>
              <DescriptionItem title="ID" content="72" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Tipo usuario" content="Usuario" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Tipo documento" content="Cédula de ciudadanía" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Documentos" content="88243400" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Nombres" content="Alvaro" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Apellido 1" content="Cuesta" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Apellido 2" content="" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Teléfono celular" content="3176797588" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Correo electrónico" content="alvaroalcuesta@gmail.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Departamento" content="Bogotá DC" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Ciudad" content="BOGOTÁ, D.C." />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Dirección correspondencia" content="Cra 7d #127c-63" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Usuario" content="alvaroalcuesta@gmail.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Contraseña" content="********" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Fecha creación" content="01/22/2021" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Nivel de usuario" content="********" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Tipo persona" content="Natural" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Descuento" content="0.00" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title="Vendedor" content="" />
            </Col>
          </Row>
        </Col>
      </Row>
    </MyLayout>
  )
}

export default Home;
