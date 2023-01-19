import Establishment from 'App/Models/Establishment';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaymentMethod from 'App/Models/PaymentMethod';
import PaymentMethodsEstablishment from 'App/Models/PaymentMethodsEstablishment';

export default class extends BaseSeeder {
  public async run () {
    await PaymentMethod.createMany([
      {
        name: "Dinheiro",
      },
      {
        name: "Cartão Crédito/Débito",
      },
      {
        name: "PIX",
      },
      {
        name: "Picpay",
      },
    ]);

    const estabelecimentos = await Establishment.all();
    for (const estabelecimento of estabelecimentos) {
      await PaymentMethodsEstablishment.createMany([
        {
          establishment_id: estabelecimento.id,
          payment_method_id: 1,
        },
        {
          establishment_id: estabelecimento.id,
          payment_method_id: 2,
        },
        {
          establishment_id: estabelecimento.id,
          payment_method_id: 3,
        },
        {
          establishment_id: estabelecimento.id,
          payment_method_id: 4,
        },
      ]);
    }
  }
}
