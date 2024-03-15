/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable('bills', (table) => {
		table.integer('store_id').unsigned().references('stores.id').notNullable();
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable('bills', (table) => {
		table.dropColumn('store_id');
	})
};
