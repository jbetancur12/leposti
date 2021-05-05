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

    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
