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
              src='/logoprincipalBlanco.webp'
              alt='logo leposti'
              width={140}
              height={33}
            />
          </div>
          <div className={styles.redes}>
            <Link href='https://twitter.com/leposti_edictos'>
              <a className={styles.fa}>
                <FaTwitter />
              </a>
            </Link>
            <Link href='https://www.instagram.com/leposti_edictos/'>
              <a className={styles.fa}>
                <FaInstagram />
              </a>
            </Link>
            <Link href='https://www.facebook.com/Leposti/'>
              <a className={styles.fa}>
                {' '}
                <FaFacebook />
              </a>
            </Link>
            <Link href='https://www.linkedin.com/in/leposti-edictos-5b87581a9/'>
              <a className={styles.fa}>
                {' '}
                <FaLinkedin />
              </a>
            </Link>
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
              src='/logoSuperintendenciaIC.webp'
              alt='logo industria y comercio'
              width={200}
              height={45}
            />
          </div>
          <Image
            src='/LogoPayu.webp'
            alt='logo payu'
            width={250}
            height={140}
            title="Logo PaYu"
          />
        </Col>
      </Row>
    </Footer>
  </div>
);

export default MyFooter;
