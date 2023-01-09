import { BaseModel, column, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Establishment from 'App/Models/Establishment';
import State from 'App/Models/State';

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public state_id: number;

  @column()
  public active: boolean;

  @hasOne(() => State, {
    foreignKey: "id",
    localKey: "state_id",
  })
  public state: HasOne<typeof State>;

  @manyToMany(() => Establishment, {
    pivotTable: "cities_establishments",
    localKey: "id",
    pivotForeignKey: "city_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "establishment_id",
  })
  public establishments: ManyToMany<typeof Establishment>;
}
