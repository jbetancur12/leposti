const { isDraft: draft } = require("strapi-utils").contentTypes;
const _ = require("lodash");

module.exports = {
  async update(params, data, { files } = {}) {
    const existingEntry = await strapi.query("order").findOne(params);

    const isDraft = draft(existingEntry, strapi.models.order);
    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.order,
      data,
      { isDraft }
    );
    console.log(existingEntry);
    const entry = await strapi.query("order").update(params, validData);

    const emailTemplate = {
      subject: "DETALLES DE SU COMPRA>",
      text: `Welcome on mywebsite.fr!
    Your account is now linked with:`,
      html: `<p>Hola <%=dataUser.username%>,</p><p>aca estan los detalles de su compra.</p><p><br></p><p><strong style="color: rgb(51, 51, 51);">Referencia de Pedido:</strong><span style="color: rgb(119, 119, 119);">&nbsp;dkfndm&nbsp;</span></p><p><strong style="color: rgb(51, 51, 51);">Fecha compra:</strong><span style="color: rgb(119, 119, 119);">&nbsp;${existingEntry.update_at}&nbsp;</span></p><p><strong style="color: rgb(51, 51, 51);">Producto:</strong><span style="color: rgb(119, 119, 119);">&nbsp;${existingEntry.product.nombre}</span></p><p><strong style="color: rgb(51, 51, 51);">Fecha de Publicación:</strong><span style="color: rgb(119, 119, 119);">${existingEntry.fechaPublicacion}&nbsp;</span></p><p><strong style="color: rgb(51, 51, 51);">Valor $ ${existingEntry.total}&nbsp;</strong></p><p><strong style="color: rgb(51, 51, 51);">Medio de Pago :</strong><span style="color: rgb(119, 119, 119);">&nbsp;_______</span></p><p><span style="color: rgb(85, 84, 84);">&nbsp;</span></p><p><span style="color: rgb(85, 84, 84);">Usted puede revisar&nbsp;su Orden de publicación ingresando a su cuenta de cliente en&nbsp;</span><a href="http://www.leposti.com.co/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">www.leposti.com.co</a></p><p><span style="color: rgb(85, 84, 84);">Cualquier información adicional,&nbsp;&nbsp;comuníquese con servicio al cliente 3106503663, o travez del chat en el sitio</span></p>`,
    };

    // await strapi.plugins.email.services.email.sendTemplatedEmail(
    //   {
    //     to: "alejobetancur12@hotmail.com",
    //     from: "jabetancur12@gmail.com",
    //   },
    //   emailTemplate,
    //   {
    //     dataUser: {
    //       username: existingEntry.user.username,
    //       email: existingEntry.user.email,
    //       referencia: existingEntry.referencia,
    //       fechaCompra: existingEntry.updated_at,
    //       producto: existingEntry.product.nombre,
    //       fechaPublicacion: existingEntry.fechaPublicacion,
    //       valor: existingEntry.total,
    //       medioPago: "Online",
    //     },
    //   }
    // );

    try {
      await strapi.plugins["email-designer"].services.email.sendTemplatedEmail(
        {
          to: "alejobetancur12@hotmail.com", // required
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
            fechaCompra: existingEntry.updated_at,
            producto: existingEntry.product.nombre,
            fechaPublicacion: existingEntry.fechaPublicacion,
            valor: existingEntry.total,
            medioPago: "Online",
          },
        }
      );
    } catch (err) {
      strapi.log.debug("📺: ", err);
      return ctx.badRequest(null, err);
    }

    return entry;
  },
};
