module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("URL", "0.0.0.0"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "c19e82f11625a32f5dd9af23a072842b"),
    },
  },
});
