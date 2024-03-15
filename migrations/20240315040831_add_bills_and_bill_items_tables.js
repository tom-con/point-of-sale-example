/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('bills', (table) => {
		table.increments();
		table.string('payment_method', 32).notNullable();
		table.decimal('subtotal').notNullable();
		table.decimal('total').notNullable();
		table.decimal('tax').notNullable();
		table.dateTime('paid_at').notNullable();
	})
		.createTable('bill_items', (table) => {
			table.increments();
			table.integer('amount').notNullable();
			table.integer('price_id').unsigned().references('prices.id').notNullable();
			table.integer('bill_id').unsigned().references('bills.id').notNullable();
			table.integer('product_id').unsigned().references('products.id').notNullable();
		})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable("bill_items")
		.dropTable("bills")
};
