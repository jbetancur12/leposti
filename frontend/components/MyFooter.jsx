import styles from '@styles/New.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { Layout, Row, Col } from 'antd';

import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const { Footer } = Layout;

const MyFooter = () => (
  <div>
    <Footer className={styles.footerContainer}>
      <Row className={styles.footer}>
        <Col span={24} sm={24} md={6} className={styles.footerCol}>
          <div className={`${styles.w100} ${styles.footerLogo}`}>
            <Image
              src='/logoprincipalBlanco.png'
              alt='logo leposti'
              width={140}
              height={33}
            />
          </div>
          <div className={styles.redes}>
            <FaTwitter />
            <FaInstagram />
            <FaFacebook />
            <FaLinkedin />
          </div>
        </Col>
        <Col
          span={24}
          sm={12}
          md={6}
          className={`${styles.footerCol} ${styles.footerDocs}`}
        >
          <h3>Documentos legales</h3>
          <Link href='/terminos'>
            <a>Términos y condiciones</a>
          </Link>
          <Link href='/politica_privacidad'>
            <a>Politica tratamiento de datos</a>
          </Link>
          <Link href='/cookies'>
            <a>Politica de Cookies</a>
          </Link>
          <Link href='/metodo_cobro'>
            <a>Método de cobro</a>
          </Link>
        </Col>
        <Col span={24} sm={12} md={6} className={styles.footerCol}>
          <h3>Contacto</h3>
          <a href='#'>email: servicioalcliente@leposti.com</a>
          <span>Tel: +57 310 6503663</span>
        </Col>
        <Col span={24} sm={24} md={6} className={styles.footerImg}>
          <div className={styles.footerSuper}>
            <Image
              src='/logoSuperintendenciaIC.png'
              alt='logo industria y comercio'
              width={200}
              height={45}
            />
          </div>
          <Image src='/LogoPayu.png' alt='logo payu' width={250} height={140} />
        </Col>
      </Row>
    </Footer>
  </div>
);

export default MyFooter;
