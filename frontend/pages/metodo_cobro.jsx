import MyHeader from '../components/MyHeader';
import { Layout } from 'antd';
import MyFooter from '../components/MyFooter';
import styles from '../styles/Login.module.css';

export default function Politica_privacidad() {
  return (
    <Layout className={styles.layout}>
      <MyHeader />
      <div>
        <h2 styles={{ textAlign: 'center' }}>
          <strong>11. PAGO, MEDIOS DE PAGO Y MÉTODO DE COBRO. </strong>
        </h2>
        <p styles={{ textAlign: 'justify' }}>
          El CLIENTE y/o Usuario realizará el pago directamente a PRETORI S.A.S
          a través de la pasarela virtual de pagos contratada por PRETORI S.A.S
          para este fin. La orden se entiende finalizada y por lo tanto
          realizada, una vez se efectúe la publicación.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          El CLIENTE y/o Usuario debe seleccionar el medio de pago electrónico a
          través de la pasarela de pagos denominada PAY YOU LATAM, disponible en
          la PLATAFORMA LEPOSTI. No obstante, estará a discreción del CLIENTE
          y/o Usuario aceptar los términos y condiciones que regulan la
          operación desarrollada por la pasarela pagos, términos que han sido
          creados y dispuestos por PAY YOU LATAM, sobre los cuales PRETORI
          S.A.S., no tiene facultad y/o control alguno.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          Para el efecto de realizar el pago, el CLIENTE y/o Usuario tendrá la
          obligación de verificar cada tarjeta de crédito/débito que registre en
          su cuenta en la plataforma virtual, conforme al procedimiento
          estipulado y disponible en esta, para lo cual, el CLIENTE y/o Usuario
          debe crear su cuenta personal en la cual se requerirán los datos
          personales que permitan su identificación, más no su
          individualización, además de los datos para la realización del pago a
          través de PAY YOU LATAM.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          Una vez completados los pasos anteriores se le muestra a través de una
          ventana emergente al CLIENTE y/o Usuario un resumen detallado de la
          transacción. Dicho resumen será enviado por correo electrónico al
          CLIENTE y/o Usuario con ésta información de forma detallada.{' '}
        </p>
        <p>
          <strong>11.1 MÉTODO DE COBRO</strong>
        </p>
        <p styles={{ textAlign: 'justify' }}>
          PRETORI S.A.S. realiza el cálculo del valor a cobrar por publicación,
          dependiendo del número de caracteres; es decir, para los productos
          “Edicto”, “Edicto + Radio” y “Emplazatorios”, se considera que un (1)
          producto corresponde a 1500 caracteres. De esta manera, si una
          publicación consta de 1501 caracteres, se cobrarán dos (2) productos.
        </p>
        <p styles={{ textAlign: 'justify' }}>
          En tratándose de “Avisos de Ley”, el valor a cobrar también se calcula
          con base en el número de caracteres, de conformidad con la siguiente
          parametrización:
        </p>
        <img src='images/tabla.png' styles={{ width: '60%' }} />
        <br />
        Una vez se sobrepasen los 2110 caracteres, por cada 220 caracteres
        adicionales, se incrementa el costo.
        <br />
        <p></p>
        <p>
          <strong>11.2 DERECHO DE RETRACTO. </strong>
        </p>
        <p styles={{ textAlign: 'justify' }}>
          En caso que el CLIENTE y/o Usuario tenga la intención de retractarse
          el pago del pago realizado a través de la pasarela de pagos, deberá
          presentar su solicitud en el correo electrónico:
          servicioalcliente@leposti.com, anexando la factura de venta de los
          servicios, en un término no superior a los cinco (5) días hábiles
          posteriores a la fecha de la transacción; de conformidad con lo
          establecido en el artículo 47 de la Ley 1480 de 2011.{' '}
        </p>
        <p>
          <strong>12.1 REVERSIÓN DEL PAGO. </strong>
        </p>
        <p styles={{ textAlign: 'justify' }}>
          En caso de solicitar la reversión del pago, esta se realizará a través
          del mismo método de pago utilizado para realizar la compra de los
          servicios. Eventualmente y a discreción PRETORI S.A.S. se podrá
          realizar el pago a través de un método diferente, siempre y cuando
          resulte posible. En caso de que el pago se haya realizado con tarjeta
          de crédito, el reverso del pago podrá verse reflejado hasta treinta
          (30) días después de haber solicitado la reversión. Esto depende de la
          entidad bancaria de la que sea cliente el CLIENTE y/o Usuario. Para
          los pagos realizados en dinero en efectivo, el pago se realizará a la
          cuenta de ahorros o corriente indicada por el CLIENTE y/o Usuario, en
          un plazo de treinta (30) días.{' '}
        </p>
        <p>
          <strong>12.2. COMERCIO ELECTRÓNICO. </strong>
        </p>
        <p styles={{ textAlign: 'justify' }}>
          En cumplimiento de las disposiciones colombianas sobre mensajes de
          datos según la ley 527 de 1999, se comunica que la legislación
          nacional reconoce validez a los mensajes de datos y por tanto ellos
          adquieren carácter y entidad probatoria. En consecuencia, el CLIENTE
          y/o Usuario entiende que mediante el cruce de mensajes de datos los
          intervinientes pueden dar lugar al nacimiento, modificación y
          extinción de obligaciones, siendo de su resorte exclusivo el
          contenido, consecuencias, responsabilidades y efectos de la
          información generada.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          La transacción comercial que nace por este medio entre Usuarios o
          Clientes y PRETORI S.A.S es un contrato de prestación de servicios, el
          cual se describe en la ventana emergente que acepta el CLIENTE y/o
          Usuario al momento de la celebración del negocio jurídico.{' '}
        </p>
        <p>
          <strong>12. LEY APLICABLE Y JURISDICCIÓN COMPETENTE</strong>
        </p>
        <p styles={{ textAlign: 'justify' }}>
          El presente Contrato de Uso del Sitio y los Acuerdos Específicos se
          encuentran sujetos y regidos por las leyes vigentes en la República de
          Colombia.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          Cualquier conflicto o controversia surgida en relación con y/o a
          partir del presente Contrato de Uso del Sitio, y/o sus Acuerdos
          Específicos, será inicialmente sometida al mecanismo de conciliación
          en (cualquiera o señalamos alguno especifico) la República de
          Colombia, y en caso de declararse fallida la misma será sometida al
          conocimiento de la justicia ordinaria colombiana. Para estos efectos,
          y en caso de ser procedente, se entiende que tanto el CLIENTE como
          PRETORI S.A.S, renuncian en este acto y expresamente a cualquier otro
          mecanismo alternativo de solución de conflictos, sometiéndose a los
          Juzgados y Tribunales de la República de Colombia.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          Todos los procedimientos legales surgidos a partir de los conflictos o
          controversias se llevarán a cabo en idioma castellano y de conformidad
          con las leyes de la República de Colombia.{' '}
        </p>
        <p styles={{ textAlign: 'justify' }}>
          El CLIENTE acepta notificar a PRETORI S.A.S de manera escrita ante
          cualquier reclamo o queja concerniente o relativa a este Sitio y a los
          Contenidos y servicios provistos en el mismo, antes de comenzar
          cualquier acción legal contra PRETORI S.A.S.{' '}
        </p>
      </div>
      <MyFooter />
    </Layout>
  );
}
