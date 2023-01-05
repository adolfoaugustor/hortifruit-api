
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Client from "App/Models/Client";
import User from "App/Models/User";

export default class ClientSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "cliente@email.com",
      password: "123456",
      role: "clients",
    });

    await Client.create({
      name: "Client",
      cellphone: "11 99999-9999",
      userId: user.id,
    });
  }
}
