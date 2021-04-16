const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    entity = await strapi.services.order.update({ id }, ctx.request.body);
    // send an email by using the email plugin
    // await strapi.plugins["email"].services.email.send({
    //   to: "alejobetancur12@hotmail.com",
    //   from: "jabetancur12@gmail.com",
    //   subject: "Comment posted that contains a bad words",
    //   text: `
    //       The comment #${entity.id} contain a bad words.

    //       Comment:
    //       ${entity.content}
    //     `,
    // });

    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
