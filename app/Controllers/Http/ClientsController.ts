import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Client from "App/Models/Client";
import User from "App/Models/User";
import CreateClientValidator from "App/Validators/CreateClientValidator";
import EditClienteValidator from "App/Validators/EditClienteValidator";


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

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(EditClienteValidator);
    const userAuth = await auth.use("api").authenticate();

    // Criando uma transação
    const trx = await Database.transaction();

    try {
      const user = await User.findByOrFail("id", userAuth.id);
      const cliente = await Client.findByOrFail("user_id", userAuth.id);

      if (payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password,
        });
      } else {
        user.merge({
          email: payload.email,
        });
      }

      await user.save();

      cliente.merge({
        name: payload.name,
        cellphone: payload.cellphone,
      });
      await cliente.save();

      // confirma no banco de dados as alterações
      await trx.commit();

      return response.ok({
        id: cliente.id,
        name: cliente.name,
        email: user.email,
        cellphone: cliente.cellphone,
      });
    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something in the request is wrong");
    }
  }
}
