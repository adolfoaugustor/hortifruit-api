import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description").nullable();
      table.string("image").nullable();
      table.decimal("price", 10, 2).notNullable();
      table.string("unit", 3).notNullable();
      table.string("position").notNullable();
      table.boolean("active").notNullable().defaultTo(true);
      table
        .integer("category_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("categories")
        .onDelete("RESTRICT");
      table.timestamps(true, true);
      table.timestamp("deleted_at").nullable();
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
