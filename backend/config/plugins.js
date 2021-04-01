module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey:
        "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",
    },
    settings: {
      defaultFrom: "jabetancur12@gmail.com",
      defaultReplyTo: "jabetancur12@gmail.com",
      testAddress: "jabetancur12@gmail.com",
    },
  },
  // ...
});
