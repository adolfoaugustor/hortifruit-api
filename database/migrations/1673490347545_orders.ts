import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("hash_id").unique().notNullable();
      table
        .integer("client_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clients");
      table
        .integer("establishment_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("establishments");
      table
        .integer("payment_method_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("payment_methods");
      table
        .integer("order_address_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("order_addresses");
      table.decimal("amount", 10, 2).notNullable();
      table.decimal("money_change", 10, 2).nullable();
      table.decimal("delivery_cost", 10, 2).notNullable().defaultTo(0);
      table.string("note").nullable();
      table.timestamp("created_at").notNullable();
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
