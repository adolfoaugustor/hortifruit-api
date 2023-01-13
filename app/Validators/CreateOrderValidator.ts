import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    establishment_id: schema.number([
      rules.exists({ table: "establishments", column: "id" }),
    ]),
    payment_method_id: schema.number([
      rules.exists({ table: "payment_methods", column: "id" }),
    ]),
    money_change: schema.number.nullableAndOptional(),
    note: schema.string.nullableAndOptional({ trim: true }),
    products: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        product_id: schema.number([
          rules.exists({ table: "products", column: "id" }),
        ]),
        quantity: schema.number(),
        note: schema.string.nullableAndOptional({ trim: true }),
      })
    ),
    address_id: schema.number([
      rules.exists({ table: "addresses", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
