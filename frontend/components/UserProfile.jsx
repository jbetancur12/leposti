import { Row, Col, Divider } from 'antd';
import { useAuth } from '@context/auth';
import styles from '../styles/User.module.css';

const DescriptionItem = ({ title, content }) => (
  <div className={styles.item}>
    <p className={styles.itemLabel}>{title}:</p>
    {content}
  </div>
);

const UserProfile = () => {
  const auth = useAuth();

  return (
    <Row style={{ height: '100%' }}>
      <Col span={24} className={styles.userText}>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem
              title='Tipo documento'
              content='Cédula de ciudadanía'
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title='Documentos'
              content={'' || auth.user.docId}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem
              title='Nombres'
              content={'' || auth.user.firstname}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title='Apellidos'
              content={'' || auth.user.lastname}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem
              title='Correo electrónico'
              content={'' || auth.user.email}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title='Teléfono celular'
              content={'' || auth.user.phone}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem
              title='Departamento'
              content={'' || auth.user.departamento}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Ciudad' content={'' || auth.user.city} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem
              title='Dirección correspondencia'
              content={'' || auth.user.direccion}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Usuario' content={'' || auth.user.email} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title='Contraseña' content='********' />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title='Fecha creación'
              content={'' || auth.user.created_at}
            />
          </Col>
        </Row>
        <Divider />
      </Col>
    </Row>
  );
};

export default UserProfile;
