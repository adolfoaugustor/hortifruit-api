import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PaymentMethodsEstablishment extends BaseModel {
  @column({ isPrimary: true })
  public establishment_id: number;

  @column({ isPrimary: true })
  public payment_method_id: number;
}
