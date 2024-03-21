import knex from '@/app/database'

export async function GET(req, { params }) {
	const data = await knex('products')
		.join('stocks', 'stocks.product_id', '=', 'products.id')
		.where('stocks.amount', '>', 0)
		.where('stocks.store_id', params.id)
		.select('*')
	return Response.json({ data })
}
