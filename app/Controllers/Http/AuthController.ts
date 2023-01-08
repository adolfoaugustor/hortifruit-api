import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import Client from "App/Models/Client"
import Establishment from "App/Models/Establishment"
import User from "App/Models/User"

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const user = await User.findByOrFail("email", email);

      let expira;
      switch (user.role) {
        case "clients":
          expira = "30days";
          break;
        case "establishments":
          expira = "7days";
          break;
        case "admins":
          expira = "1days";
          break;
        default:
          expira = "30days";
          break;
      }

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: expira,
        name: user.serialize().email,
      });

      response.ok(token);
    } catch {
      return response.badRequest("Invalid credentials");
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
    } catch {
      return response.unauthorized("No authotization for it");
    }

    return response.ok({
      revoked: true,
    });
  }

  public async me({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();

    let data;

    switch (userAuth.role) {
      case "clientes":
        const cliente = await Client.findByOrFail("userId", userAuth.id);
        data = {
          id_cliente: cliente.id,
          nome: cliente.name,
          telefone: cliente.cellphone,
          email: userAuth.email,
        };
        break;
      case "estabelecimentos":
        const estabelecimento = await Establishment.findByOrFail(
          "userId",
          userAuth.id
        );
        data = {
          id_establishment: estabelecimento.id,
          name: estabelecimento.name,
          logo: estabelecimento.logo,
          online: estabelecimento.online,
          blocked: estabelecimento.blocked,
          email: userAuth.email,
        };
        break;
      case "admins":
        const admin = await Admin.findByOrFail("userId", userAuth.id);
        data = {
          id_admin: admin.id,
          nome: admin.name,
          email: userAuth.email,
        };
        break;
      default:
        return response.unauthorized("Unauthorized user - type not found");
    }

    return response.ok(data);
  }
}
