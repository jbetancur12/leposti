const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const response = ctx.request.body.state_pol;
    const reference = ctx.request.body.reference_sale;
    const paymentMethod = ctx.request.body.payment_method_type;
    const paymentMethods = {
      2: "Tarjeta de Credito",
      4: "Transferencia Bancaria PSE",
      5: "Débitos ACH",
      6: "Tarjeta Debito",
      7: "Pago en Efectivo",
      8: "Pago referenciado",
      10: "Pago en Bancos",
    };
    const methodUsed = paymentMethods[paymentMethod];

    const algo = await strapi.services.order.findOne({
      referencia: reference,
    });

    const sendStatus = response === "4" ? "paid" : "unpaid";
    const idOrder = algo.id;

    const updateOrder = await strapi.services.order.update(
      { id: idOrder },
      { estado: sendStatus, metodoPago: methodUsed }
    );
    let entity;
    entity = await strapi.services.transactions.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.transactions });
  },
};
