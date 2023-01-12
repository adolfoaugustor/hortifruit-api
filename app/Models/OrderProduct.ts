import Product from 'App/Models/Product';
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public pedido_id: number;

  @column()
  public product_id: number;

  @column()
  public quantity: number;

  @column()
  public amount: number;

  @column()
  public note: string | null;

  @hasOne(() => Product, {
    localKey: "product_id",
    foreignKey: "id",
  })
  public product: HasOne<typeof Product>;
}
