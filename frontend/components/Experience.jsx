import styles from '@styles/Experience.module.css';
import Title from './Title';
import { Row, Col } from 'antd';
import {
  FaRegNewspaper,
  FaMousePointer,
  FaMapMarkerAlt,
  FaHandshake,
} from 'react-icons/fa';

const Experience = () => (
  <div className={styles.container} id='about'>
    <Title title='Nuestra' titleW='Experiencia' />
    <div className={styles.content}>
      <Row justify='space-around'>
        <Col span={24} lg={6}>
          <div className={styles.icon}>
            <FaRegNewspaper />
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>Edicto y avisos de ley</h3>
            <p>Realice sus publicaciones legales desde su casa y/o oficina.</p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className={styles.icon}>
            <FaMousePointer />
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>En un click</h3>
            <p>Transforme su texto documento en una publicación digital.</p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className={styles.icon}>
            <FaMapMarkerAlt />
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>Confianza y seguridad</h3>
            <p>
              Guiamos a nuestros clientes para que obtengan el mejor producto.
            </p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className={styles.icon}>
            <FaHandshake />
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>Medios nacionales y regionales</h3>
            <p>Publique en más de un medio de manera simultanea.</p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default Experience;
