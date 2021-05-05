const dateFormat = require("dateformat");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterUpdate(result, params, data) {

      if (data.publicado) {
        console.log("ENTRO", result.user.email)
        try {
          await strapi.plugins["email-designer"].services.email.sendTemplatedEmail(
            {
              to: result.user.email, // required
            },
            {
              templateId: 5, // required - you can get the template id from the admin panel
              //subject: `Welcome to My Project`, // If provided here will override the template's subject. Can include variables like `Welcome to <%= project_name %>`
            },
            {
              // this object must include all variables you're using in your email template
              dataUser: {
                username: `${result.user.firstname} ${result.user.lastname}`,
                id: data.referencia,
                medio: result.provider.nombre,
                producto: result.product.nombre,
                fecha: dateFormat(
                  data.fechaPublicacion,
                  "dd/mm/yyyy"
                ),
              },
            }
          );

        } catch (err) {
          strapi.log.debug("📺: 2=>", err);
        }
      }
    },
  },
};
