import Document, { Html, Head, Main, NextScript } from 'next/document';
import Chat from '@components/Chats';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='es'>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://www.schema.org',
                '@type': 'Organization',
                name: 'LePosti.com',
                url: `${process.env.CANONICAL_URL}`,
                logo: '/logoprincipalBlanco.webp',
                description:
                  'Pague y publique Edictos y Avisos de ley, en medios de comunicación nacionales y/o regionales, desde la comodidad de su casa u oficina de forma rápida y segura.',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'Colombia',
                },
              }),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Chat />
        </body>
      </Html>
    );
  }
}
