import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import User from "App/Models/User";
import CreateClientValidator from "App/Validators/CreateClientValidator";


export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      role: "clientes",
    });

    const cliente = await Client.create({
      name: payload.name,
      cellphone: payload.cellphone,
      userId: user.id,
    });

    return response.ok({
      id: cliente.id,
      name: cliente.name,
      email: user.email,
      cellphone: cliente.cellphone,
    });
  }
}
