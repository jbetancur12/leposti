import styles from '@styles/Products.module.css';
import Title from './Title';
import { Row, Col } from 'antd';
import Image from 'next/image'

const Products = () => (
  <div className={styles.container} id='about'>
    <Title title='Nuestros' titleW='Productos' />
    <div className={styles.content}>
      <Row justify='space-around'>
        <Col span={24} lg={6}>
          <div className={styles.imgContainer}>
            <Image
              src='/Edicto-peq.webp'
              alt='hero 2'
              title='hero 2'
              width={500}
              height={350}
              className={styles.img}
            ></Image>
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>Edicto</h3>
            <p>
              Aviso mediante el cual se cita a un ciudadano para dar cuenta de
              un proceso legal y/o administrativo que lo involucra, o para
              informarle del estado de un proceso del que forma parte.
            </p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className={styles.imgContainer}>
            <Image
              src='/edicto-radio-peq.webp'
              alt='hero 2'
              title='hero 2'
              width={500}
              height={350}
              className={styles.img}
            ></Image>
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>Edicto + radio</h3>
            <p>
              Aviso en prensa y radio mediante el cual se cita a un ciudadano
              para dar cuenta de una acción legal y/o administrativa que lo
              involucra, o para informarle del estado de un proceso legal del
              que forma parte.
            </p>
          </div>
        </Col>
        <Col span={24} lg={6}>
          <div className={styles.imgContainer}>
            <Image
              src='/aviso-de-ley.webp'
              alt='hero 2'
              title='hero 2'
              width={500}
              height={350}
              className={styles.img}
            ></Image>
          </div>
          <div className={styles.text}>
            <h3 className={styles.subTitle}>Avisos de ley</h3>
            <p>
              Publicación que realizan las entidades en medios impresos de alta
              circulación para informar sobre diversos procesos que involucren a
              terceros, así como para notificar un requerimiento de notabilidad
              jurídica.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default Products;
