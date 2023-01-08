import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string | null;

  @column()
  public position: number;

  @column()
  public active: boolean;

  @column()
  public image: string | null;

  @column()
  public price: number;

  @column()
  public unit: string;

  @column()
  public category_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime | null;
}
