const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const algo = await strapi.services.order.findOne({
      referencia: ctx.request.body.reference_sale,
    });
    const response = ctx.request.body.state_pol;

    const sendStatus = response === "1" ? "paid" : "unpaid";
    const idOrder = algo.id;

    await strapi.services.order.update({ id: idOrder }, { estado: sendStatus });

    let entity;
    entity = await strapi.services.transactions.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.transactions });
  },
};
