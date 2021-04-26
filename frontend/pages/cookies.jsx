import MyHeader from '../components/MyHeader';
import { Layout } from 'antd';
import MyFooter from '../components/MyFooter';
import styles from '../styles/Login.module.css';

export default function Politica_privacidad() {
  return (
    <Layout className={styles.layout}>
      <MyHeader />
      <div id="placeholders">
        <h2 styles={{ textAlign: 'center' }}>
          <strong>7. USO DE COOKIES Y WEB BEACONS</strong>
        </h2>

        <p styles={{ textAlign: 'justify' }}>
          Una cookie HTTP, que se denomina habitualmente “cookie” es un
          fragmento de texto que se envía y recibe entre el navegador web y el
          servidor al que accede. Su finalidad original es ofrecer un mecanismo
          de administración de estado entre un navegador web y un servidor. Si
          una cookie (o una solución similar), un servidor web no puede
          diferenciar entre los distintos CLIENTES ni determinar ninguna
          relación entre las visitas de páginas secuenciales efectuadas por el
          mismo CLIENTE.{' '}
        </p>

        <p styles={{ textAlign: 'justify' }}>
          Por este motivo, las Cookies se usan para diferenciar un CLIENTE de
          otro y para pasar información de una página a otra durante una sesión
          de sitio web de un único CLIENTE. Un servidor web usa las cookies para
          recopilar datos acerca de un determinado navegador, junto con la
          información solicitada y enviada por el operador (el visitante) del
          navegador. Las cookies no identifican a las personas, sino que se
          definen a sí mismas mediante una combinación de equipo, Cuenta de
          CLIENTE y navegador.{' '}
        </p>

        <p>
          <strong>7.1 COOKIES PRETORI S.A.S. </strong>
        </p>

        <p styles={{ textAlign: 'justify' }}>
          Cuando el CLIENTE visita la PLATAFORMA, la dirección IP usada para
          acceder al Sitio quedará almacenada junto con la fecha y hora del
          acceso. La información solamente es usada para analizar tendencias,
          administrar el Sitio, seguir la navegación del CLIENTE y recolectar
          información demográfica agregada para su uso interno. Lo más
          importante es que ninguna IP almacenada se encuentra ligada a
          información personal identificable.{' '}
        </p>

        <p>
          <strong>7.2 USO DE COOKIES EN PRETORI S.A.S. </strong>
        </p>

        <p styles={{ textAlign: 'justify' }}>
          PRETORI S.A.S podrá usar cookies cuando el CLIENTE ingrese al Sitio,
          al momento de generar una sesión. La cookie permite mantener el
          seguimiento, la navegación y la seguridad por el tiempo de uso de esta
          sesión. En esta cookie se incluyen algunos identificadores de sesión
          para asegurar que sólo el CLIENTE es quien realice cambios en su
          Cuenta. También se utilizan cookies para realizar seguimiento de la
          actividad de la Cuenta como un CLIENTE único. Toda esta información
          podrá ser almacenada en forma encriptado por motivos de seguridad, no
          almacenando ninguna información personal del CLIENTE en la cookie.{' '}
        </p>

        <p styles={{ textAlign: 'justify' }}>
          PRETORI S.A.S podrá usar una cookie como ID de sesión para hacer más
          fácil la navegación por la PLATAFORMA. La cookie de sesión expira
          cuando se cierra el navegador. PRETORI S.A.S podrá usar una cookie
          persistente que se mantiene en el disco duro del CLIENTE por más
          tiempo, de esta manera PRETORI S.A.S podrá reconocer cuando el CLIENTE
          regresa a navegar al Sitio. Todo CLIENTE podrá remover esta cookie
          persistente siguiendo las instrucciones provistas por su respectivo
          navegador de internet en la sección “Ayuda”; sin embargo, dado que
          PRETORI S.A.S podrá usar las cookies para la funcionalidad de
          Autenticación, si el CLIENTE escoge la opción de “deshabilitar las
          cookies”, podrá no ser posible que el CLIENTE ingrese al Sitio web de
          PRETORI S.A.S.{' '}
        </p>

        <p>
          <strong>7.3 GOOGLE ANALYTICS COOKIES. </strong>
        </p>

        <p styles={{ textAlign: 'justify' }}>
          PRETORI S.A.S usa Google como proveedor de servicios de analítica Web.
          Google usa las cookies para definir sesiones de CLIENTE, así como para
          proporcionar una serie de funciones clave en los informes de Google
          Analytics. Google Analytics establece o actualiza las cookies solo
          para recuperar los datos necesarios para los informes. Además Google
          Analytics usa únicamente cookies de origen. Esto significa que todas
          las Cookies establecidas por Google Analytics para el dominio del
          CLIENTE envían datos únicamente a los servidores del dominio del
          CLIENTE. De este modo las cookies de Google Analytics se convierten en
          propiedad personal del dominio del CLIENTE del Sitio web y los datos
          no los puede modificar ni recuperar ningún servicio en otro dominio.
          Para más información sobre las políticas de Google Analytics, visitar
          la página
          http://code.google.com/intl/ES/apis/analytics/docs/concepts/gaConceptsCookies.html.{' '}
        </p>
      </div>
      <MyFooter />
    </Layout>
  );
}
