import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CitiesEstablishment from 'App/Models/CitiesEstablishment';
import City from 'App/Models/City';
import Establishment from 'App/Models/Establishment';
import Order from 'App/Models/Order';

export default class EstablishmentsController {
  public async orders({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const establishment = await Establishment.findByOrFail(
      "user_id",
      userAuth.id
    );

    const orders = await Order.query()
      .where("establishment_id", establishment.id)
      .preload("client")
      .preload("order_status", (statusQuery) => {
        statusQuery.preload("status");
      })
      .orderBy("order_id", "desc");

    return response.ok(orders);
  }

  public async show({ params, response }: HttpContextContract) {
    const idEst: number = params.id;

    let arrayCities: any = [];
    const cities = await CitiesEstablishment.query().where(
      "establishment_id",
      idEst
    );

    for await (const city of cities) {
      const city_ = await City.findByOrFail("id", city.city_id);
      arrayCities.push({
        id: city_.id,
        city: city_.name,
        delivery_cost: city.delivery_cost,
      });
    }

    const establishment = await Establishment.query()
      .where("id", idEst)
      .preload("categories", (categoriasQuery) => {
        categoriasQuery.preload("products");
      })
      .preload("payment_method")
      .firstOrFail();

    return response.ok({
      id: establishment.id,
      name: establishment.name,
      logo: establishment.logo,
      blocked: establishment.blocked,
      online: establishment.online,
      cities: arrayCities,
      payment_methods: establishment.payment_method,
      categories: establishment.categories,
    });
  }
}
