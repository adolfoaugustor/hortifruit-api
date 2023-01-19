import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("city_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cities");
      table.string("street").notNullable();
      table.string("number").nullable();
      table.string("district").notNullable();
      table.string("reference_point").nullable();
      table.string("complement").nullable();
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
