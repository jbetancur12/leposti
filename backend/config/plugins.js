module.exports = ({ env }) => ({
  // ...
  email: {
    // provider: "sendgrid",
    // providerOptions: {
    //   apiKey: env("SENDGRID_API_KEY"),
    // },
    // settings: {
    //   defaultFrom: "jabetancur12@gmail.com",
    //   defaultReplyTo: "jabetancur12@gmail.com",
    //   testAddress: "jabetancur12@gmail.com",
    // },
    provider: env("EMAIL_PROVIDER"),
    providerOptions: {
      host: env("EMAIL_SMTP_HOST", "smtp.example.com"),
      port: env("EMAIL_SMTP_PORT", 587),
      auth: {
        user: env("EMAIL_SMTP_USER"),
        pass: env("EMAIL_SMTP_PASS"),
      },
    },
    settings: {
      defaultFrom: env("EMAIL_ADDRESS_FROM"),
      defaultReplyTo: env("EMAIL_ADDRESS_REPLY"),
    },
  },
  // ...
});
