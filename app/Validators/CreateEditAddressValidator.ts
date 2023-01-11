import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEditAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cityId: schema.number([
      rules.exists({ table: "cities", column: "id" }),
    ]),
    street: schema.string({ trim: true }, [rules.maxLength(255)]),
    number: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(20),
    ]),
    district: schema.string({ trim: true }, [rules.maxLength(255)]),
    referencePoint: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
    complement: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {};
}
