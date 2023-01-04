import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table
        .integer("state_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("states")
        .onDelete("CASCADE");
      table.boolean("active").notNullable().defaultTo(true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
