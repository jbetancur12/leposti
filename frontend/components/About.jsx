import styles from '@styles/About.module.css';
import Image from 'next/image';
import Title from './Title';
import { Row, Col } from 'antd';

const About = () => (
  <div className={styles.container} id='about'>
    <Title title='Quiénes' titleW='somos' />
    <div className={styles.content}>
      <Row>
        <Col span={24} lg={12}>
          <div className={styles.text}>
            <p>
              A lo largo de la historia, la <b>comunicación</b> ha sido uno de
              los pilares en la evolución de la <b>sociedad</b>. Y es entonces,
              en la antigua Roma que a través de la <b>lectura pública</b> que
              los pretorianos se convirtieron en los primeros emisores de{' '}
              <b>edictos</b>.
              <br />
              <br />
              En la actualidad, <b>los medios de comunicación</b> masiva se han
              convertido en el canal idóneo para divulgar documentos de{' '}
              <b>orden legal</b>. Entendiendo esta{' '}
              <b>responsabilidad social, LEPOSTI</b> ofrece el servicio de{' '}
              <b>publicación</b> de edictos y avisos de ley a través de una
              plataforma que le permite a los usuarios realizar dicho proceso de
              una manera <b>ágil y segura</b> desde <b>cualquier dispositivo</b>{' '}
              conectado a Internet.
            </p>
          </div>
        </Col>
        <Col span={24} lg={12}>
          <div className={styles.imgContainer}>
            <Image
              src='/hero_2.jpg'
              alt='hero 2'
              width={500}
              height={350}
              className={styles.img}
            />
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default About;
