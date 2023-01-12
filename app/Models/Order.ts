import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public hash_id: string;

  @column()
  public client_id: number;

  @column()
  public estabelecimento_id: number;

  @column()
  public payment_method_id: number;

  @column()
  public order_address_id: number;

  @column()
  public amount: number;

  @column()
  public money_change: number | null;

  @column()
  public delivery_cost: number;

  @column()
  public note: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
