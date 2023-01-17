import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client';
import OrderStatus from 'App/Models/OrderStatus';
import OrderProduct from 'App/Models/OrderProduct';
import Establishment from 'App/Models/Establishment';
import OrderAddress from './OrderAddress';
import PaymentMethod from './PaymentMethod';

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

  @hasOne(() => Establishment, {
    foreignKey: "id",
    localKey: "establishment_id",
  })
  public establishment: HasOne<typeof Establishment>;

  @hasMany(() => OrderProduct, {
    foreignKey: "order_id",
    localKey: "id",
  })
  public products: HasMany<typeof OrderProduct>;

  @hasOne(() => OrderAddress, {
    foreignKey: "id",
    localKey: "order_address_id",
  })
  public address: HasOne<typeof OrderAddress>;

  @hasOne(() => PaymentMethod, {
    foreignKey: "id",
    localKey: "payment_method_id",
  })
  public payment_method: HasOne<typeof PaymentMethod>;
}
