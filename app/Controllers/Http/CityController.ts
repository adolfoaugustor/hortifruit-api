import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import City from 'App/Models/City';

export default class CityController {
  public async index({ response }: HttpContextContract) {
    const cities = await City.query()
      .whereHas("establishments", (query) => {
        query.where("blocked", false);
      })
      .preload("state");

    return response.ok(cities);
  }

  public async Establishments({ params, response }: HttpContextContract) {
    const city = await City.query()
      .where("id", params.id)
      .preload("establishments")
      .firstOrFail();

    return response.ok(city.establishments);
  }
}
