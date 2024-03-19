/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('orders', (table) => {
		table.increments()
		table.integer('product_id').unsigned().references('products.id').notNullable()
		table.integer('store_id').unsigned().references('stores.id').notNullable()
		table.integer('amount').notNullable()
		table.dateTime('submitted_at').notNullable()
		table.dateTime('fulfilled_at')
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('orders')
};
