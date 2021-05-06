const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const body = ctx.request.body;
    const emailTemplate = {
      subject: 'Mensaje Formulario de Contacto',
      text: `Mesaje de <%=data.email%>:  Mensaje: <%=data.message%>`,
      html: `<p>Mesaje de <%=data.email %>:</p><p> Mensaje: <%=data.message %></p>`,
    };
    try {
      await strapi.plugins["email"].services.email.sendTemplatedEmail({
        to: 'servicioalcliente@leposti.com',

      },
        emailTemplate,
        {
          data: {
            email: body.email,
            message: body.content
          }
        }

      );
    } catch (err) {
      strapi.log.debug("📺: =>", err);
    }
    let entity;
    entity = await strapi.services.message.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.message });
  }
};
