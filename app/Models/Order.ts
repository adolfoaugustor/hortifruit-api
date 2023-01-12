import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client';
import OrderStatus from 'App/Models/OrderStatus';

export default class Order extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public hash_id: string;

  @column()
  public client_id: number;

  @column()
  public establishment_id: number;

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

  @hasOne(() => Client, {
    foreignKey: "id",
    localKey: "client_id",
  })
  public client: HasOne<typeof Client>;

  @hasMany(() => OrderStatus, {
    foreignKey: "order_id",
    localKey: "id",
  })
  public order_status: HasMany<typeof OrderStatus>;
}
