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

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    /* $2,500.00 */

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
            medioPago: existingEntry.metodoPago,
          },
        }
      );
    } catch (err) {
      strapi.log.debug("📺: =>", err);
    }

    return entry;
  },
};
