import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Address from 'App/Models/Address';
import Client from 'App/Models/Client';
import Order from 'App/Models/Order';
import OrderAddress from 'App/Models/OrderAddress';
import CreateOrderValidator from 'App/Validators/CreateOrderValidator';
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


    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something in the request is wrong");
    }
  }

  
}
