const { isDraft: draft } = require("strapi-utils").contentTypes;
const _ = require("lodash");
const dateFormat = require("dateformat");

module.exports = {
  async update(params, data, { files } = {}) {
    const existingEntry = await strapi.query("order").findOne(params);

    const isDraft = draft(existingEntry, strapi.models.order);
    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.order,
      data,
      { isDraft }
    );

    const entry = await strapi.query("order").update(params, validData);
    // Create our number formatter.
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    });

    if (data.estado === "paid") {
      try {
        await strapi.plugins["email-designer"].services.email.sendTemplatedEmail(
          {
            to: existingEntry.user.email, // required
            //from: "from@example.com", // optional if /config/plugins.js -> email.settings.defaultFrom is set
            //replyTo: "reply@example.com", // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
          },
          {
            templateId: 1, // required - you can get the template id from the admin panel
            //subject: `Welcome to My Project`, // If provided here will override the template's subject. Can include variables like `Welcome to <%= project_name %>`
          },
          {
            // this object must include all variables you're using in your email template
            dataUser: {
              username: existingEntry.user.username,
              email: existingEntry.user.email,
              referencia: existingEntry.referencia,
              fechaCompra: existingEntry.updated_at.toLocaleString("es-CO", {
                timeZone: "America/Bogota",
              }),
              producto: existingEntry.product.nombre,
              fechaPublicacion: dateFormat(
                existingEntry.fechaPublicacion,
                "dd/mm/yyyy"
              ),
              valor: formatter.format(existingEntry.total),
              medioPago: data.metodoPago,
            },
          }
        );


        await strapi.plugins["email-designer"].services.email.sendTemplatedEmail(
          {
            to: entry.provider.email, // required
            //from: "from@example.com", // optional if /config/plugins.js -> email.settings.defaultFrom is set
            //replyTo: "reply@example.com", // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
          },
          {
            templateId: 4, // required - you can get the template id from the admin panel
            //subject: `Welcome to My Project`, // If provided here will override the template's subject. Can include variables like `Welcome to <%= project_name %>`
          },
          {
            // this object must include all variables you're using in your email template
            medio: {
              nombre: entry.provider.nombre,
              consecutivo: entry.id,
              producto: entry.product.nombre,
              fechaPublicacion: dateFormat(
                entry.fechaPublicacion,
                "dd/mm/yyyy"
              ),
              contenido: entry.contenido
            },
          }
        );
      } catch (err) {
        strapi.log.debug("📺: 2=>", err);
      }
    }

    return entry;
  },
};
