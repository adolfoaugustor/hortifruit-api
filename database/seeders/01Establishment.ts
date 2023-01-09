import { faker } from "@faker-js/faker";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import City from "App/Models/City";
import CitiesEstablishment from "App/Models/CitiesEstablishment";
import Establishment from "App/Models/Establishment";
import State from "App/Models/State";
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

    for (let i = 2; i <= 20; i++) {
      await User.create({
        email: `estabelecimento${i}@email.com`,
        password: "12345678",
        role: "estabelecimentos",
      });
    }

    for (let i = 2; i <= 20; i++) {
      await Establishment.create({
        name: `Estabelecimento ${i}`,
        logo: `https://picsum.photos/id/${i}/200/200`,
        online: true,
        blocked: false,
        userId: i,
      });
    }

    await State.createMany([
      {
        name: "Minas Gerais",
        uf: "MG",
      },
      {
        name: "Espírito Santo",
        uf: "ES",
      },
    ]);

    await City.createMany([
      {
        name: "Aimorés",
        state_id: 1,
      },
      {
        name: "Colatina",
        state_id: 2,
      },
    ]);

    for (let i = 1; i <= 20; i++) {
      await CitiesEstablishment.create({
        city_id: faker.datatype.number({ min: 1, max: 2 }),
        establishment_id: i,
        delivery_cost: faker.datatype.float({
          min: 0,
          max: 3,
          precision: 0.5,
        }),
      });
    }
  }
}
