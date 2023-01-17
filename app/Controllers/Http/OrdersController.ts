import Order from 'App/Models/Order';
import Client from 'App/Models/Client';
import Product from 'App/Models/Product';
import Address from 'App/Models/Address';
import OrderStatus from 'App/Models/OrderStatus';
import OrderAddress from 'App/Models/OrderAddress';
import OrderProduct from 'App/Models/OrderProduct';
import CitiesEstablishment from 'App/Models/CitiesEstablishment';
import CreateOrderValidator from 'App/Validators/CreateOrderValidator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

var randomstring = require("randomstring");

export default class OrdersController {
  public async store({ auth, response, request }: HttpContextContract) {
    const payload = await request.validate(CreateOrderValidator);
    const userAuth = await auth.use("api").authenticate();
    const client = await Client.findByOrFail("user_id", userAuth.id);

    let hash_ok: boolean = false;
    let hash_id: string = "";
    while (hash_ok == false) {
      hash_id = randomstring.generate({
        length: 6,
        charset: "alphanumeric",
        capitalization: "uppercase",
      });

      const hash = await Order.findBy("hash_id", hash_id);

      if (hash == null) {
        hash_ok = true;
      }
    }

    // Transaction criando
    const trx = await Database.transaction();

    const address = await Address.findByOrFail("id", payload.address_id);

    try {
      const end = await OrderAddress.create({
        cityId: address.cityId,
        street: address.street,
        number: address.number,
        district: address.district,
        referencePoint: address.referencePoint,
        complement: address.complement,
      });

      // Busca do custo de entrega e calcular valor total do pedido
      const stateCity = await CitiesEstablishment.query()
        .where("establishment_id", payload.establishment_id)
        .where("city_id", address.cityId)
        .first();

      let totalValue = 0;
      for await (const product of payload.products) {
        const prod = await Product.findByOrFail("id", product.product_id);
        totalValue += product.quantity * prod.price;
      }

      totalValue = stateCity
        ? totalValue + stateCity.delivery_cost
        : totalValue;

      totalValue = parseFloat(totalValue.toFixed(2));

      if (payload.money_change != null && payload.money_change < totalValue) {
        trx.rollback();
        return response.badRequest(
          "O valor do troco não pode ser menor que o valor total do pedido."
        );
      }

      const order = await Order.create({
        hash_id: hash_id,
        client_id: client.id,
        establishment_id: payload.establishment_id,
        payment_method_id: payload.payment_method_id,
        order_address_id: end.id,
        amount: totalValue,
        money_change: payload.money_change,
        delivery_cost: stateCity ? stateCity.delivery_cost : 0,
        note: payload.note,
      });

      payload.products.forEach(async (product) => {
        let getProduct = await Product.findByOrFail("id", product.product_id);

        await OrderProduct.create({
          order_id: order.id,
          product_id: product.product_id,
          amount: getProduct.price,
          quantity: product.quantity,
          note: product.note,
        });
      });

      await OrderStatus.create({
        order_id: order.id,
        status_id: 1,
      });

      // Confirma a transação
      await trx.commit();

      return response.ok(order);

    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something in the request is wrong");
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const client = await Client.findByOrFail("user_id", userAuth.id);

    const orders = await Order.query()
      .where("client_id", client.id)
      .preload("establishment")
      .preload("order_status", (statusQuery) => {
        statusQuery.preload("status");
      })
      .orderBy("order_id", "desc");

    return response.ok(orders);
  }

  public async show({ params, response }: HttpContextContract) {
    const idPedido = params.hash_id;

    const pedido = await Order.query()
      .where("hash_id", idPedido)
      .preload("products", (produtoQuery) => {
        produtoQuery.preload("product");
      })
      .preload("client")
      .preload("address")
      .preload("establishment")
      .preload("payment_method")
      .preload("order_status", (statusQuery) => {
        statusQuery.preload("status");
      })
      .first();

    if (pedido == null) {
      return response.notFound("Pedido não encontrado");
    }

    return response.ok(pedido);
  }
}
