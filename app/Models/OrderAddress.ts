import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import City from 'App/Models/City';

export default class OrderAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cityId: number;

  @column()
  public street: string;

  @column()
  public number: string | null;

  @column()
  public district: string;

  @column()
  public referencePoint: string | null;

  @column()
  public complement: string | null;

  @hasOne(() => City, {
    localKey: "cityId",
    foreignKey: "id",
  })
  public city: HasOne<typeof City>;
}
