const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'tom',
		password: '1234',
		database: 'point_of_sale_db'
	}
});

export async function GET(req, { params }) {
	const data = await knex('products')
		.join('stocks', 'stocks.product_id', '=', 'products.id')
		.where('stocks.amount', '>', 0)
		.where('stocks.store_id', params.id)
		.select('*')
	return Response.json({ data })
}
