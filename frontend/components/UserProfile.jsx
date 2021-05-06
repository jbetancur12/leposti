import { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { useAuth } from '@context/auth';
import styles from '@styles/User.module.css';
import Register from '@components/Register';
// import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const UserProfile = () => {
  const [modalEdit] = useState(false);
  const [info, setInfo] = useState({
    docId: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    departamente: '',
    city: '',
    direccion: '',
    created_at: '',
  });

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      setInfo(auth.user);
    }
  }, [auth.user]);

  // const showModal = () => {
  //   setEdit(true);
  // };

  const DescriptionItem = ({ title, content }) => (
    <div className={styles.item}>
      <p className={styles.itemLabel}>{title}:</p>
      {content}
    </div>
  );

  return (
    <Row style={{ height: '100%' }}>
      {modalEdit ? (
        <Register edit={true} />
      ) : (
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
              <DescriptionItem title='Documentos' content={'' || info.docId} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem title='Nombres' content={'' || info.firstname} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title='Apellidos'
                content={'' || info.lastname}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem
                title='Correo electrónico'
                content={'' || info.email}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title='Teléfono celular'
                content={'' || info.phone}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem
                title='Departamento'
                content={'' || info.departamento}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title='Ciudad' content={'' || info.city} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <DescriptionItem
                title='Dirección correspondencia'
                content={'' || info.direccion}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title='Usuario' content={'' || info.email} />
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
                content={moment(info.created_at).format('MMMM DD, h:mm A')}
              />
            </Col>
          </Row>
          <Divider />
          {/* <Row>
            <Button type='primary' icon={<EditOutlined />} onClick={showModal}>
              Editar Información
            </Button>
          </Row> */}
        </Col>
      )}
    </Row>
  );
};

export default UserProfile;
