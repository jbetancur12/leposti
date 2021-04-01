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
