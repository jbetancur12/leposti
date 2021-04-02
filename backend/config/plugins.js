module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: "SENDGRID_API_KEY",
    },
    settings: {
      defaultFrom: "jabetancur12@gmail.com",
      defaultReplyTo: "jabetancur12@gmail.com",
      testAddress: "jabetancur12@gmail.com",
    },
  },
  // ...
});
