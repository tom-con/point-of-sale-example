/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('businesses', (table) => {
		table.increments();
		table.string('name', 128).notNullable();
		table.string('phone', 11).notNullable();
		table.string('email', 128).notNullable();
		table.string('tpn', 32).notNullable();
	})
		.createTable('stores', (table) => {
			table.increments();
			table.string('address', 256).notNullable();
			table.string('phone', 11).notNullable();
			table.string('email', 128).notNullable();
			table.integer('business_id').unsigned().references('businesses.id');
		})
		.createTable('users', (table) => {
			table.increments();
			table.string('firstname', 32).notNullable();
			table.string('lastname', 32).notNullable();
			table.integer('salary').notNullable();
			table.integer('store_id').unsigned().references('stores.id');
		})
		.createTable('products', (table) => {
			table.increments();
			table.string('name', 256).notNullable();
			table.string('barcode', 10).notNullable();
			table.boolean('is_perishable').defaultTo(false);
			table.integer('days_to_perish');
		})
		.createTable('stocks', (table) => {
			table.increments();
			table.dateTime('received_datetime').notNullable();
			table.date('manufacture_date').notNullable();
			table.integer('amount').defaultTo(0);
			table.integer('product_id').unsigned().references('products.id');
			table.integer('store_id').unsigned().references('stores.id');
		})
		.createTable('prices', (table) => {
			table.increments();
			table.date('valid_from_date').notNullable();
			table.decimal('price').notNullable();
			table.integer('product_id').unsigned().references('products.id');
			table.integer('store_id').unsigned().references('stores.id');
		})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable("prices")
		.dropTable("stocks")
		.dropTable("products")
		.dropTable("users")
		.dropTable("stores")
		.dropTable("businesses")
};