import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { faker } from "@faker-js/faker";
import Category from 'App/Models/Category';
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
    for (let iEst = 1; iEst <= 20; iEst++) {
      let categoria = await Category.create({
        name: faker.commerce.department(),
        description: faker.lorem.word(),
        position: 1,
        establishment_id: iEst,
      });

      await Product.createMany([
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({ min: 5, max: 100, precision: 0.5 }),
          category_id: categoria.id,
          position: 1,
          unit: "KG",
        },
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({ min: 5, max: 100, precision: 0.5 }),
          category_id: categoria.id,
          position: 2,
          unit: "KG",
        },
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({ min: 5, max: 100, precision: 0.5 }),
          category_id: categoria.id,
          position: 3,
          unit: "UN",
        },
      ]);
    }
  }
}
