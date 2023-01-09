import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Category from "App/Models/Category";
import Env from '@ioc:Adonis/Core/Env';

export default class Establishment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @column({
    consume: (value) => (value == null ? value : Env.get("API_URL") + value),
  })
  public logo: string | null;

  @column()
  public blocked: boolean;

  @column()
  public online: boolean;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Category, {
    foreignKey: "establishment_id",
    localKey: "id",
  })
  public categories: HasMany<typeof Category>;


}
