import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Establishment from "App/Models/Establishment";
import User from "App/Models/User";

export default class EstablishmentSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "estabelecimento@email.com",
      password: "123456",
      role: "estabelecimentos",
    });

    await Establishment.create({
      name: "Estabelecimento",
      logo: "https://webevolui.com.br/principal/images/web-evolui-logo.png",
      online: true,
      blocked: false,
      userId: user.id,
    });
  }
}
